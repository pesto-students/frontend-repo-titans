/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import TableComponentSkeleton from "../Skeletons/TableComponentSkeleton";

/*pass any number of headers , it will turn into that no. of headers
eg : 
<TableComponent
columns={headers.length}
headers={headers}
data={data}
/> */

const TableComponent = ({ columns, data, headers }) => {

  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate 4 seconds network delay
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
    {loading ? (<TableComponentSkeleton columns={headers.length} rows={data.length}/>) : ( <div className="overflow-auto bg-wwpopdiv">
      <table className="min-w-full divide-y divide-red-700">
        <thead className="bg-wwbg">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-wwtext"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-700">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns} className="px-6 py-4 text-center ">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 text-sm font-medium text-wwtext whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>)}
   
    </>
    
  );
};

export default TableComponent;
