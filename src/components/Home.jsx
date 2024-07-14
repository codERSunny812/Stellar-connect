import SideBar from "./SideBar"
import Feed from "./Feed"
import Widget from "./Widget"
import './home.scss';

const Home = () => {
  return (
    <>

    <div className="App_body">
      <SideBar/>
      <Feed/>
      <Widget/>
    </div>
    
   
    </>
  )
}

export default Home