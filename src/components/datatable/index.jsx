import React from "react";
import './style.css';
import  { filterState, filterGenres, capitalize }  from '../../utils/index'

export default function Datatable({ data, query, stateFilter, filterGenreColumns }) {

  const searchColumns = ["name", "city", "genre"];

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

  function search(rows) {
    if(filterGenreColumns){
      return filterGenres(data, filterGenreColumns).filter( row =>
          searchColumns.some(column =>
          row[column]
          .toString()
          .toLowerCase()
          .indexOf(query.toLowerCase()) > -1
      ))
    } else if(stateFilter){
      return filterState(data, stateFilter).filter( row =>
        searchColumns.some(column =>
        row[column]
        .toString()
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1
    ))
    }
    else { 
      return rows.filter(row =>
        searchColumns.some(
          column =>
            row[column]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
        )
      );
    }
  }

  
  return (
    <table className='__data_table' cellPadding={15} cellSpacing={1}>
      <thead>
        <tr>{ data[0] && columns.map(heading => <th>{capitalize(heading)}</th>)}</tr>
      </thead>
      <tbody>
        {search(data).map(row => (
          <tr>
            {columns.map(column => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}