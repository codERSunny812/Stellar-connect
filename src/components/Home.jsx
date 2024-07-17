import SideBar from "./SideBar"
import Feed from "./Feed"
import Widget from "./Widget"
import './home.scss';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserInfo";
import {addUser , getUser} from '../Collections/User'

const Home = () => {

  const data = useContext(UserContext);

  const[userData , setUserData]=useState(null);

  // adding the data of the user to the DB
  useEffect(() => {
    const addUserToDb = async () => {
      if (data) {
        // if will return a unique id
        const userId = await addUser(data);

        if(userId){
          // fetch the data of the user from the firebase store
          const userDoc = await getUser(userId);
          setUserData(userDoc);
        }

         
      }
    };
    addUserToDb();
  }, [data]);

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