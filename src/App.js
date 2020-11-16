import React from 'react';
import { sort } from './utils/index.js'
import "./style.css";

function App() {
  const [state, setState] = useState({
    data: [],
  });

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

    </div>
  );
}

export default App;
