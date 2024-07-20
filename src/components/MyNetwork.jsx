import { useEffect, useState } from 'react';
import './MyNetwork.scss';
import { allUserData } from '../Collections/User';
import { Shimmer } from 'react-shimmer';
import {UserAddOutlined} from '@ant-design/icons'
import {avtar,banner} from '../constants/constant'


const MyNetwork = () => {
  
  const [allUser , setAllUser] = useState(null);

  useEffect(()=>{ 
    const allUsersData = async() =>{
     const data = await allUserData();
      setAllUser(data);
    }

    allUsersData();
  },[])


  // getting all the users
  console.log(allUser);


  // early return if user not found 
  if(!allUser || allUser.length == 0){
    return(
      <div className="">
        <Shimmer height={200} width={200}/>
      </div>
    )
  }

   
  return (
    <div className="my-network">
      
     <div className="left">
      <h1>my  network</h1>

     </div>

     <div className="mid">
       <h1>grow your network faster</h1>
       <div className="user-card-main-box">
          {
            allUser.map((user) => {
              return (
                <div className="user-card" key={user.id}>

                  <div className="image-section">
                  <img src={banner} alt="linkedln banner"
                  className='user-card-user-banner'
                  />
                  <img src={user.avatar} alt="user_image"
                  className='user-card-user-avatar'
                  />


                  </div>

                  <div className="name-section">
                    <p>{user.fullName}</p>
                  </div>
                  
                  <div className="user-card-end">
                    <UserAddOutlined />
                    <p>add friend</p>
                  </div>
                  
                </div>
              )
            })
          }
       </div>
       
     </div>

     <div className="right">

     </div>
    </div>
  )
}

export default MyNetwork