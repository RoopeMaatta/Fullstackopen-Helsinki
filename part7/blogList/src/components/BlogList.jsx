import React, { useState, useEffect, useContext, useImperativeHandle } from 'react'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import Blog from './Blog'
import { useNotificationContext } from '../NotificationContext'
import { useResources } from '../hooks/useResources'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const BlogList = () => {
  const { user, loading } = useContext(UserAuthenticationContext)

  const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/blogs'
  //const { user, blogUpdate } = useContext(UserAuthenticationContext)
  const { showNotification } = useNotificationContext()
  const { resources: blogs, isLoading, isError, error } = useResources(baseUrl, user?.token)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching blogs: {error.message}</div>

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> <b>Title</b></TableCell>
              <TableCell align='right'> <b>Likes</b></TableCell>{' '}
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs &&
              blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell align='right'>{blog.likes}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
