import SideBar from "./SideBar"
import Feed from "./Feed"
import Widget from "./Widget"
import './home.scss';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserInfo";
import {addUser} from '../Collections/User'

const Home = () => {

  const data = useContext(UserContext);

  console.log(data);

  const[userData , setUserData]=useState(null);

  useEffect(() => {
    const addUserToDb = async () => {
      if (data && data.id) {
        const userInfo = await addUser(data);
        setUserData(userInfo);
      }
    };
    addUserToDb();
  }, [data]);

  console.log(userData);
  return (
    <>

    <div className="App_body">
      <SideBar userData={userData}/>
      <Feed userData={userData}/>
      <Widget/>
    </div>
    
   
    </>
  )
}

export default Home