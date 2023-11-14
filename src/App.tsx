import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '@/pages/home'
import DetailPage from '@/pages/detail'
import LoginPage from '@/pages/loginPage/LoginPage'
import {useToken} from '@/utils/token'

function App() {
  const {getToken} = useToken()

  if(!getToken()){
    return <div className="bg-[url('/images/list_bg.jpg')] min-h-[100vh]">
      <LoginPage/>
    </div>   
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/detail/:name',
      element: <DetailPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ])

  return (
    <div className="bg-[url('/images/list_bg.jpg')] min-h-[100vh]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
