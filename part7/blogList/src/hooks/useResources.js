import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const useResources = (baseUrl, token, resourceId = null) => {
  const queryClient = useQueryClient()

  // Insert the token into headers of each request
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${token}` },
  })

  // Fetching all resources
  const fetchResources = async () => {
    const response = await axiosInstance.get('')
    return response.data
  }

  const resourcesQuery = useQuery(['resources', baseUrl], fetchResources, {
    enabled: !resourceId,
  })

  // Fetching a single resource
  const fetchResource = async () => {
    if (!resourceId) return null // Guard clause to ensure an ID is provided
    const response = await axiosInstance.get(`/${resourceId}`)
    return response.data
  }

  const resourceQuery = useQuery(['resource', baseUrl, resourceId], fetchResource, {
    enabled: !!resourceId, // Only fetch this resource if an ID is provided
  })

  // Creating a resource
  const createMutation = useMutation(
    (newResource) => axiosInstance.post('', newResource).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['resources', baseUrl]),
    }
  )

  const updateMutation = useMutation(
    async ({ id, data }) => {
      // Directly use axiosInstance which already includes the Authorization header
      return axiosInstance.put(`/${id}`, data).then((res) => res.data)
    },
    {
      onSuccess: (data, variables) => {
        // Ensure to invalidate queries that match the fetch queries
        queryClient.invalidateQueries(['resource', baseUrl, variables.id])
        //queryClient.invalidateQueries(['resources', baseUrl])
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
    resources: resourceId ? resourceQuery.data : resourcesQuery.data, // Decide what to return based on if an ID is provided
    isLoading: resourceId ? resourceQuery.isLoading : resourcesQuery.isLoading,
    isError: resourceId ? resourceQuery.isError : resourcesQuery.isError,
    error: resourceId ? resourceQuery.error : resourcesQuery.error,
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
