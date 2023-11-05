import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import App from '../src/App'
import Home from '../src/pages/Home'
import News from '../src/pages/News'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/news',
        element: <News />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
)
