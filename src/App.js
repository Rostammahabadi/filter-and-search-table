import React, { useState, useEffect } from 'react';
import { sort, filter, filterGenres, filterState } from './utils/index.js'
import Datatable from './components/datatable/index'
import Filter from "./components/filter";
import Pagination from "./components/pagination/index"
function App() {
  const [state, setState] = useState({
    data: [],
    pageData: [],
    searchResults: [],
    page: 1
  });

  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [filterGenreColumns, setGenreFilter] = useState("");
  const filteredState = Array.from(new Set(state.data.map(row => row.state).sort()));
  const filteredGenre = filter(state.data).sort();

  useEffect(() => {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
    .then(response => response.json())
    .then(json => 
      setState(prev => ({
        ...prev,
        data: sort(json),
        pageData: pageData(json),
      }))
      );
  }, []);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      searchResults: filterState(state.data, stateFilter)
    }));
  }, [stateFilter]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      searchResults: filterGenres(state.data, filterGenreColumns)
    }));
  }, [filterGenreColumns]);

  function pageData(data, per = 10, page = 1) {
    return data.slice(per * (page - 1), per * page);
  };

  function handleClick(callback) {
    setState(prev => ({
      ...prev,
      pageData: pageData(state.data, 10, callback)
    }))
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
        filterGenreColumns = { filterGenreColumns }
        stateFilter = { stateFilter }
        data = { state.pageData }
        />
      </div>
      <Pagination
      totalPages={3}
      page={state.page}
      handleClick={ handleClick }
      />
    </div>
  );
}

export default App;
