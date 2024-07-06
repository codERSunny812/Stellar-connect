
import { Outlet, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'

function App() {


  return (
  <>
  <Header/>
  <Outlet/>
  </>
  )
}

export default App




export const Router = createBrowserRouter([
  {
    path:'/',
    element:<App/>, 
    children:[
      {
       path:'/',
       element:<Home/>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path:'/register',
        element:<Register/>
      }
    ]
  },
]);
