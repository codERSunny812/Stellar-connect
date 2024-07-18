import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "@clerk/clerk-react";

export const UserContext = createContext(null);

// console.log(UserContext);

export const UserContextProvider = ({ children }) => {

  const { user } = useUser();
  console.log(user)


   const [userData ,setUserData] = useState(null); //to store the data of the user


   useEffect(()=>{
     if (user) {
       setUserData({
         id: user?.id,
         fullName: user?.fullName,
         imageUrl: user?.imageUrl,
         firstName:user?.firstName
       })
      }
   },[user])

  console.log(userData);

  return (
    <UserContext.Provider value={{ userData: userData }}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
