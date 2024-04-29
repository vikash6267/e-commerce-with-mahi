import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

function AdminRoute() {
  const { user } = useSelector((state) => state.profile)

  if (user.role !== "admin") {
    return children
  } else {
    return <Navigate to="/admin/dashboard" />
  }
}

export default AdminRoute