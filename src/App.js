import React, { useState, useEffect } from 'react';
import { sort, filter, filterGenres, filterState } from './utils/index.js'
import Datatable from './datatable/index.jsx';

function App() {
  const [state, setState] = useState({
    data: [],
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
      })))
    
  }, []);
  return (
    <div>
      <div>
        <Datatable
        query= { query }
        filterGenreColumns = { filterGenreColumns }
        stateFilter = { stateFilter }
        data = { state.data }
        />
      </div>
    </div>
  );
}

export default App;
