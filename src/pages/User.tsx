import React from "react";
import CounterButton from "../components/CounterButton";

const User: React.FC = () => {
    return (
       <body className="bg-[#525252] ">
            <div className="flex items-center justify-center min-h-screen">
            <CounterButton />
            </div>
      </body>

    );
  };
  
  export default User;