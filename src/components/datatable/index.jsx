import React from "react";
import './style.css';
import  { capitalize }  from '../../utils/index'

export default function Datatable({ data }) {

  const columns =
    data[0] &&
    Object.keys(data[0]).filter(
      key =>
        key === "name" ||
        key === "city" ||
        key === "state" ||
        key === "telephone" ||
        key === "genre"
    );

  
  return (
    <table className='__data_table' cellPadding={15} cellSpacing={1}>
      <thead>
        <tr>{ data[0] && columns.map(heading => <th key= {heading}>{capitalize(heading)}</th>)}</tr>
      </thead>
      {data.length > 0 
        ? <tbody>
        {data.map(row => (
          <tr>
            {columns.map(column => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      : <tbody>
        <tr>
          <td>No Results Were Found</td>
        </tr>
      </tbody>
      }
    </table>
  );
}