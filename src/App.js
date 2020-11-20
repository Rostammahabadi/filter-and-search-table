import React, { useState, useEffect } from 'react';
import { sort, filter, filterGenres, filterState, pageData, filterStateandGenres } from './utils/index.js'
import Datatable from './components/datatable/index'
import Filter from "./components/filter";
import Pagination from "./components/pagination/index";
import Axios from 'axios';

function App() {
  const [ state, setState ] = useState({
    data: [],
    pageData: [],
    searchResults: [],
    page: 1,
  });

  const [ query, setQuery ] = useState("");
  const [ stateFilter, setStateFilter ] = useState("");
  const [ genreFilter, setGenreFilter ] = useState("");
  const filteredState = Array.from(new Set(state.data.map(row => row.state).sort()));
  const filteredGenre = filter(state.data).sort();
  
  const searchColumns = ["name", "city", "genre"];

  useEffect(() => {
    async function getData(){
      const response = await Axios("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY
        }
      });
      setState(prev => ({
        ...prev, 
        data: sort(response.data),
        pageData: pageData(response.data)
      }));
    };
    getData();
  }, []);

  useEffect(() => {
    results()
  }, [stateFilter, genreFilter, query]);

  function results(){
    let stateResults = filterState(state.data, stateFilter);
    let genreResults = filterGenres(state.data, genreFilter);
    if (genreFilter && stateFilter) {
      setResultsState(filterStateandGenres(state.data, genreFilter, stateFilter))
    } else if (genreFilter && stateFilter && query){
      setResultsState(search(filterStateandGenres(state.data, genreFilter, stateFilter)))
    } else if (query && stateFilter) {
      setResultsState(search(stateResults))
    } else if (query && genreFilter) {
      setResultsState(search(genreResults))
    } else if (stateFilter) {
      setResultsState(stateResults)
    } else if (genreFilter) {
      setResultsState(genreResults)
    } else if(query) {
      setResultsState(search(state.data))
    } else {
      setState(prev => ({
        ...prev,
        searchResults: [],
        pageData: pageData(state.data, 10, 1),
        page: 1,
      }))
    }
  };

  function setResultsState(result) {
    setState(prev => ({
      ...prev, 
      searchResults: result,
      pageData: pageData(result, 10, 1),
      page: 1,
    }))
  };

  function search(rows) {
    if(genreFilter){
      return filterGenres(state.data, genreFilter).filter( row =>
          searchColumns.some(column =>
          row[column]
          .toString()
          .toLowerCase()
          .indexOf(query.toLowerCase()) > -1
      ))
    } else if(stateFilter){
      return filterState(state.data, stateFilter).filter( row =>
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
  };

  function handleClick(callback) {
    if(state.searchResults.length > 0){
      setState(prev => ({
        ...prev,
        pageData: pageData(state.searchResults, 10, callback),
        page: callback
      }))
    } else {
      setState(prev => ({
        ...prev,
        pageData: pageData(state.data, 10, callback),
        page: callback
      }))
    }
  };

  function totalPages() { 
    if((query || stateFilter || genreFilter ) && state.searchResults.length > 0) {
      return Math.ceil(state.searchResults.length/10);
    } else if ((query || stateFilter|| genreFilter) && state.searchResults.length == 0) {
      return 0
    } else {
      return Math.ceil(state.data.length/10);
    }
  };
  
  return (
    <div>
      <div style={{display: 'table-row'}}>
        <input
          style={{width: 400}}
          className="text-field"
          placeholder="Search Results"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
          <label style={{margin: 10}}>Filter by state:</label>
          <Filter data={filteredState} onChange={val => setStateFilter(val)} />
          <label style={{margin: 10}}>Filter by Genre:</label>
          <Filter data={filteredGenre} onChange={val => setGenreFilter(val)} />
      </div>
      <div>
        <Datatable
        query= { query }
        genreFilter = { genreFilter }
        stateFilter = { stateFilter }
        data = { state.pageData }
        />
      </div>
      <Pagination
      totalPages={ totalPages() }
      page={ state.page }
      handleClick={ handleClick }
      />
    </div>
  );
}

export default App;
