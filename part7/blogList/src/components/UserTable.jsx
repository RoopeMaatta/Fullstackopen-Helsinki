import React, { useState, useEffect, useContext, useImperativeHandle } from 'react'
import { UserAuthenticationContext } from '../hooks/useAuthentication'
import { useNotificationContext } from '../NotificationContext'
import { useResources } from '../hooks/useResources'

const UserTable = () => {
  const { user } = useContext(UserAuthenticationContext)

  const baseUrl = 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3003.app.github.dev/api/users'
  //const { user, blogUpdate } = useContext(UserAuthenticationContext)
  const { showNotification } = useNotificationContext()
  const { resources: users, isLoading, isError, error } = useResources(baseUrl, user?.token)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching users: {error.message}</div>

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Number of Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users
              .sort((a, b) => a.username.localeCompare(b.username))
              .map((user) => (
                <tr key={user.id} >
                  <td>{user.username}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
