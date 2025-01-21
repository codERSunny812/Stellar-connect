// import { useContext, useEffect, useState } from 'react';
// import './MyNetwork.scss';
// import { allUserData } from '../Collections/User';
// import { Shimmer } from 'react-shimmer';
// import { UserAddOutlined } from '@ant-design/icons';
// import { avtar, banner } from '../constants/constant';
// import { getFriends, getUsersByIds, addFriend } from '../Collections/Friends';
// import { UserContext } from '../context/UserInfo';

// const MyNetwork = () => {
//   const { userData } = useContext(UserContext);
//   const { id } = userData;
//   const [allUser, setAllUser] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [friendDetails, setFriendDetails] = useState([]);

//   // console.log(allUser);
//   // console.log(friends);
//   // console.log(id);
//   // console.log(userData);

//   useEffect(() => {
//     if (!id) return; // Exit early if id is not defined

//     const allUsersData = async () => {
//       const data = await allUserData();
//       setAllUser(data);
//     };

//     const fetchFriends = async () => {
//       const friendData = await getFriends(id);
//       setFriends(friendData);

//       // Fetch user data for friends
//       if (friendData.length > 0) {
//         const friendsInfo = await getUsersByIds(friendData);
//         setFriendDetails(friendsInfo);
//       }
//     };

//     allUsersData();
//     fetchFriends();
//   }, [id]);

//   // Early return if user not found
//   if (!allUser || allUser.length === 0) {
//     return (
//       <div className="">
//         <Shimmer height={200} width={200} />
//       </div>
//     );
//   }

//   const handleAddFriend = async (friendId) => {
//     await addFriend(id, friendId);
//     setFriends([...friends, friendId]);
//     const newFriend = allUser.find(user => user.id === friendId);
//     setFriendDetails([...friendDetails, newFriend]);
//   };

//   return (
//     <div className="my-network">
//       <div className="left">
//         <h1>My Connections</h1>
//         {friendDetails.length > 0 ? (
//           friendDetails.map(friend => (
//             <div className="friend-card" key={friend.id}>
//               <img src={friend.avatar || avtar} alt="friend_image" className="friend-avatar" />
//               <p>{friend.fullName}</p>
//             </div>
//           ))
//         ) : (
//           <p>No connections found</p>
//         )}
//       </div>

//       <div className="mid">
//         <h1>Grow Your Network Faster</h1>
//         <div className="user-card-main-box">
//           {allUser.map((user) => {
//             const isFriend = friends.includes(user.id);
//             return (
//               <div className="user-card" key={user.id}>
//                 <div className="image-section">
//                   <img src={banner} alt="linkedln banner" className='user-card-user-banner' />
//                   <img src={user.avatar} alt="user_image" className='user-card-user-avatar' />
//                 </div>
//                 <div className="name-section">
//                   <p>{user.fullName}</p>
//                 </div>
//                 <>
//                   {!isFriend && (
//                     <div className='user-card-end' onClick={() => handleAddFriend(user.id)} >
//                       <UserAddOutlined />
//                       <p>add friend</p>
//                     </div>
//                   )}
//                   {isFriend && <p>Friend Added</p>}
//                 </>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className="right">
//         {/* Add any additional content here */}
//       </div>
//     </div>
//   );
// };

// export default MyNetwork;


const MyNetwork = () => {
  return (
    <div>MyNetwork</div>
  )
}

export default MyNetwork
