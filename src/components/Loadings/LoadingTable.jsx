import React from "react";

const LoadingTable = ({ rows = 3 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra border border-gray-200/80">
        <thead>
          <tr>
            <th>Sl.</th>
            <th>Parcel Info</th>
            <th>Payment Time</th>
            <th>Tracking Id</th>
            <th>Transaction Id</th>
            <th>Payment Info</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              <td>
                <div className="skeleton h-4 w-6"></div>
              </td>

              <td>
                <div className="skeleton h-4 w-32"></div>
              </td>

              <td>
                <div className="skeleton h-4 w-40"></div>
              </td>

              <td>
                <div className="skeleton h-4 w-28"></div>
              </td>

              <td>
                <div className="skeleton h-4 w-52"></div>
              </td>

              <td>
                <div className="space-y-2">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-16"></div>
                </div>
              </td>

              <td>
                <div className="skeleton h-10 w-10 rounded-lg"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingTable;
