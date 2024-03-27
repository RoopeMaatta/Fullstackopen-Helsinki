/*
// hooks/useBlogs.js
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'

// Function to set the token for axios requests
const getAxiosConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
})

export const useBlogs = (token) => {
  const queryClient = useQueryClient()

  const fetchBlogs = async () => {
    const config = getAxiosConfig(token)
    const response = await axios.get(baseUrl, config)
    return response.data
  }

  const { data: blogs, ...queryInfo } = useQuery('blogs', fetchBlogs, {
    // Optional: React Query configurations such as staleTime, cacheTime, etc.
  })

  // Mutations: Create, Update, Delete
  const createBlog = useMutation(
    async (newBlog) => {
      const config = getAxiosConfig(token)
      const response = await axios.post(baseUrl, newBlog, config)
      return response.data
    },
    {
      onSuccess: () => queryClient.invalidateQueries('blogs'),
    }
  )

  const updateBlog = useMutation(
    async ({ id, ...updateData }) => {
      const config = getAxiosConfig(token)
      const response = await axios.put(`${baseUrl}/${id}`, updateData, config)
      return response.data
    },
    {
      onSuccess: () => queryClient.invalidateQueries('blogs'),
    }
  )

  const deleteBlog = useMutation(
    async (id) => {
      const config = getAxiosConfig(token)
      await axios.delete(`${baseUrl}/${id}`, config)
    },
    {
      onSuccess: () => queryClient.invalidateQueries('blogs'),
    }
  )

  return {
    blogs,
    ...queryInfo, // Exposes isLoading, error, etc.
    createBlog: createBlog.mutate,
    updateBlog: updateBlog.mutate,
    deleteBlog: deleteBlog.mutate,
  }
}

//use:
// const { blogs, createBlog, updateBlog, deleteBlog, isLoading, error } = useBlogs(userToken);
*/