
import { Outlet, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import { SignedIn, SignedOut , UserButton} from "@clerk/clerk-react";
import Base from './components/Base'
import SignUpPage from './components/SignUpPage'
import SignInPage from './components/SignInPage';

function App() {


  return (
  <>
  <header>
        <SignedOut>
          {/* Children of this component can only be seen while signed out. */}
          <Base/>
        </SignedOut>
        <SignedIn> 
          {/* Children of this component can only be seen while signed in. */}
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
      },
      {
      path:'/sign-up',
      element:<SignUpPage/>
      },
      {
        path: '/sign-in',
        element: <SignInPage />
      }
    ]
  },
]);
