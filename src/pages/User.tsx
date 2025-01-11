import React from "react";
import CounterButton from "../components/CounterButton";

const User: React.FC = () => {
    return (
       <body className="bg-[#525252] ">
            
            
            <div className="flex items-center justify-center h-screen">
                    <div className="card glass w-200">
                        <h1 className="font-neue font-bold text-4xl text-white">Andy</h1>
                        <figure>
                            <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="car!" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Life hack</h2>

                            <p>How to park your car at your garage?</p>
                            <div className="card-actions justify-center">
                            <CounterButton />
                            </div>
                        </div>
                    </div>
            </div>


      </body>

    );
  };
  
  export default User;