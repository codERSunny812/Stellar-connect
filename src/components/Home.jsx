import SideBar from "./SideBar";
import Feed from "./Feed";
import Widget from "./Widget";
import "./home.css";
import { Breathing } from "react-shimmer";
import useStore from "../store/Store.js";

const Home = () => {
  console.log("home component rendered")
  const userData = useStore((state) => state.userData);

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
