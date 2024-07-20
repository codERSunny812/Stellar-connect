import React from "react";
import Noerror from "./animation/NoRoute.json";
import Lottie from "lottie-react";

const Error = () => {
  return (
    <React.Fragment style={{ height: "100%", width: "100%" }}>
      <Lottie
        animationData={Noerror}
        loop={true}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "500px",
        }}
      />
    </React.Fragment>
  );
};

export default Error;
