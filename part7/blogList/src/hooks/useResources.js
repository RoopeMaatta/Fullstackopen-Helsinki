import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const useResources = (baseUrl, token) => {
  const queryClient = useQueryClient()

  // Insert the token into headers of each request
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${token}` },
  })

  // Fetching resources
  const fetchResources = async () => {
    const response = await axiosInstance.get('')
    return response.data
  }

  const resourcesQuery = useQuery(['resources', baseUrl], fetchResources)

  // Creating a resource
  const createMutation = useMutation(
    (newResource) => axiosInstance.post('', newResource).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['resources', baseUrl]),
    }
  )

  // // Updating a resource
  // const updateMutation = useMutation(
  //   ({ id, ...updateData }) => axiosInstance.put(`/${id}`, updateData).then((res) => res.data),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(['resources', baseUrl]),
  //   }
  // )

  // const updateMutation = useMutation(
  //   ({ id, ...updateData }) => {
  //     console.log('Sending update for:', id, 'with data:', updateData) // Log data being sent
  //     return axiosInstance.put(`/${id}`, updateData).then((res) => {
  //       console.log('Received update response:', res.data) // Log response received
  //       return res.data
  //     })
  //   },
  //   {
  //     onSuccess: () => {
  //       console.log('Invalidating queries for:', baseUrl)
  //       queryClient.invalidateQueries(['resources', baseUrl])
  //     },
  //   }
  // )

  const updateMutation = useMutation(
    async ({ id, data }) => {
      // Directly use axiosInstance which already includes the Authorization header
      return axiosInstance.put(`/${id}`, data).then((res) => res.data)
    },
    {
      onSuccess: () => {
        // Ensure to invalidate queries that match the fetch queries
        queryClient.invalidateQueries(['resources', baseUrl])
      },
    }
  )

  // Deleting a resource
  const deleteMutation = useMutation(
    (id) => axiosInstance.delete(`/${id}`).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['resources', baseUrl]),
    }
  )

  return {
    resources: resourcesQuery.data,
    isLoading: resourcesQuery.isLoading,
    isError: resourcesQuery.isError,
    error: resourcesQuery.error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreateLoading: createMutation.isLoading,
    isUpdateLoading: updateMutation.isLoading,
    isDeleteLoading: deleteMutation.isLoading,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  }
}

export { useResources }
