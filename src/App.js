import React, {useState, useEffect} from 'react';
import './App.css';

const link = "https://restcountries.com/v3.1/all";

function App() {

    const [countries, setCountry] = useState([]);

    const getData = async () => {
        const res = await fetch(link)
        const data = await res.json()
        setCountry(data)
        console.log(data)
    }

    useEffect(() => {
      getData();
    }, [])


  return (

      <div className='main'>
        {
            countries.map((data, index) => {
                return <div className='card'>
                  <img src={data.flags.png} alt="" />
                  <h1 key={index}>Official name : {data.name.official}</h1>
                  <p>cca2 : {data.cca2}</p>
                  <p>cca3 : {data.cca3}</p>
                  <p>root : {data.idd.root}</p>
                </div>
            })
        }
      </div>
  );
}

export default App;
