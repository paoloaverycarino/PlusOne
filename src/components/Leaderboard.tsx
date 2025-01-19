import React from "react";

const Leaderboard: React.FC = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-lg bg-white">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>1</th>
              <td>Andy Tran</td>
              <td>69</td>
            </tr>

            <tr>
              <th>2</th>
              <td>Paolo Carino</td>
              <td>420</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
