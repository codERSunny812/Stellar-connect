import { createContext } from "react";
import PropTypes from "prop-types";
import { useUser } from "@clerk/clerk-react";

export const UserContext = createContext(null);

// console.log(UserContext);

export const UserContextProvider = ({ children }) => {
  const { user } = useUser();
  // console.log(user)

  const userData = {
    // defining the user data into object
    id: user?.id,
    fullName: user?.fullName,
    firstName: user?.firstName,
    avtar: user?.imageUrl,
  };

  // console.log(userData);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
