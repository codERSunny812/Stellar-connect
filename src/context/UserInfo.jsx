import { createContext } from "react";
import PropTypes from 'prop-types';
import { useUser } from "@clerk/clerk-react";

export const UserContext = createContext(null);

console.log(UserContext);

export const UserContextProvider = ({ children }) => {
  const {user} = useUser();
 
  const userData = {
    // Define any user-related data here
    id:user?.id,
    fullName:user?.fullName,
    firstName:user?.firstName,
  };

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
