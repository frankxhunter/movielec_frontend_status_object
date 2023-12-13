import React from 'react'
import ReactDOM from 'react-dom/client'
import AppUser from './routes/mainUser'
import AppAdmin from './routes/mainAdmin'
import ModificateData from './routes/modificateData' 
import CreateData from './routes/createData' 

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import {loader as loaderToModificate} from "./routes/modificateData"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppUser/>,
  },
  {
    path: "/admin",
    element: <AppAdmin/>
  },
  {
    path: "/editAdmin/:id",
    element: <ModificateData/>,
    loader: loaderToModificate,
  },
  {
    path: "/createAdmin",
    element: <CreateData/>,
    loader: loaderToModificate,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
