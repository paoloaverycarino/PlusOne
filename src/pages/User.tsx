import React from "react";
import CounterButton from "../components/CounterButton";

const User: React.FC = () => {
    return (
       <body className="flex items-center justify-center min-h-screen bg-[#525252] ">
            
            <div className="card glass shadow-xl w-96 p-6">
                <div className="card-body grid grid-cols-2 gap-4">
                
                    <div className="bg-gray-200 p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg">Section 1</h3>
                    <p>Data or content for section 1</p>
                    </div>


                    <div className="bg-gray-200 p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg">Section 2</h3>
                    <p>Data or content for section 2</p>
                    </div>

                
                    <div className="bg-gray-200 p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg">Section 3</h3>
                    <p>Data or content for section 3</p>
                    </div>


                    <div className="bg-gray-200 p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg">Section 4</h3>
                    <CounterButton />
                    <p>Data or content for section 4</p>
                    </div>
                </div>
            </div>


      </body>

    );
  };
  
  export default User;