import React from 'react'
import ReactDOM from 'react-dom/client'
import AppUser from './routes/mainUser'
import AppAdmin from './routes/mainAdmin'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppUser/>,
  },
  {
    path: "/admin",
    element: <AppAdmin/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
