
import React from 'react';

const Hero: React.FC = () => {
    return (
       <body className="bg-[#525252]">
        <div className="flex items-center justify-center min-h-screen">


            <div className="card bg-gradient-to-b from-[#FF6422] to-[#99147C] w-96 shadow-xl border-4 border-whi">

                <div className="card-body">
                    <h1 className="font-neue text-4xl text-white">PlusOne</h1>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                </div>
            </div>
        </div>
      </body>

    );
  };
  
  export default Hero;

