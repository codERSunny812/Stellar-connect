
import { Outlet, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Base from './components/Base'
import SignUpPage from './components/SignUpPage'
import SignInPage from './components/SignInPage';

function App() {


  return (
  <>
  <header>
        <SignedOut>
          <Base/>
        </SignedOut>
        <SignedIn>
          <Header />
          <Outlet />
        </SignedIn>
  </header>

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
      },{
      path:'/sign-up',
      element:<SignUpPage/>
      },{
        path: '/sign-in',
        element: <SignInPage />
      }
    ]
  },
]);
