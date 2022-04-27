import axios from "axios";
import { useEffect, useState } from "react";
import Search from './Search'
function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      
      setCountries(response.data)
    })
  }, [])
  
  return <div className="App">
   <Search countries={countries} />
  </div>;
}

export default App;
