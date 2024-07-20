import SideBar from "./SideBar";
import Feed from "./Feed";
import Widget from "./Widget";
import "./Home.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserInfo";
import { addUser } from "../Collections/User";
import { Breathing } from "react-shimmer";

const Home = () => {
  // context api for the data of all the user
  const { userData } = useContext(UserContext);
  console.log("the data of the loggedin user:"+userData);

  const [userId, setUserId] = useState(null);

  // console.log(userId); //both are same
  // console.log(userData?.id); //both are same

  // adding the data of the user to the DB
  useEffect(() => {
    const addUserToDb = async () => {
      if (userData && userData?.id) {
        try {
          const userId = await addUser(userData);
          setUserId(userId);
        } catch (error) {
          console.log(`Error adding user to DB: ${error.message}`);
        }
      }
    };
    addUserToDb();
  }, [userData]);

  // Conditional rendering to wait for userData to be populated
  if (!userData || userData == null) {
    return (
      <div className="shimmer-container">
        <Breathing width={300} height={500} />
        <Breathing width={300} height={500} />
        <Breathing width={300} height={500} />
      </div>
    );
  }

  return (
    <>
      <div className="App_body">
        <SideBar />
        <Feed userId={userId} />
        <Widget />
      </div>
    </>
  );
};

export default Home;
