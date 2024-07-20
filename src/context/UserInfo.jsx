import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "@clerk/clerk-react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const { user } = useUser();
  // console.log(user);

  const [userData, setUserData] = useState(null); //to store the data of the user

  useEffect(() => {
    if (user) {
      setUserData({
        id: user?.id,
        fullName: user?.fullName,
        imageUrl: user?.imageUrl,
        firstName: user?.firstName,
      });
    }
  }, [user]);

  console.log("UserData in UserContext:",JSON.stringify(userData));

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
