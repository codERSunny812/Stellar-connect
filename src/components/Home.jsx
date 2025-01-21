import SideBar from "./SideBar";
import Feed from "./Feed";
import Widget from "./Widget";
import "./Home.scss";
import { useEffect} from "react";
import { addUser } from "../Collections/user.collection.js";
import { Breathing } from "react-shimmer";
import useStore from "../store/Store.js";

const Home = () => {
  const userData = useStore((state) => state.userData);

  // console.log("user data in the home component:", userData);

  // adding the data of the user to the firebase DB
  useEffect(() => {
    const addUserToDb = async () => {
      if (userData && userData?.id) {
        try {
        await addUser(userData);
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
        <Feed />
        <Widget />
      </div>
    </>
  );
};

export default Home;
