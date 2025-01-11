const Hero: React.FC = () => {
  return (
    <body className="bg-[#525252]">
      <div className="flex items-center justify-center min-h-screen">
        <div className="card bg-gradient-to-b from-[#FF6422] to-[#99147C] w-96 shadow-xl border-4 border-whi">
          <div className="card-body">
            <h1 className="font-neue font-bold text-4xl text-white">PlusOne</h1>
            <h3 className="font-neue font-light text-sm text-white">
              Username
            </h3>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <h3 className="font-neue font-light text-sm text-white">
              Password
            </h3>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />

            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Hero;
