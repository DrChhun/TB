import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

const link = "https://restcountries.com/v3.1/all";

function App() {
  const [show, setShow] = useState(false);
  const [countries, setCountry] = useState([]);
  const [pageNumber, setPageNumber] = useState(0)

  const usersPerPage = 25
  const pagesVisited = pageNumber * usersPerPage

  const displayUsers = countries
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(countries => {
      return (
        <div onClick={() => setShow(true)} className='card'>
          <img src={countries.flags.png} alt="" />
          <div className='detail'>
            <h1>Official name : {countries.name.official}</h1>
            <p>cca2 : {countries.cca2}</p>
            <p>cca3 : {countries.cca3}</p>
            <p>root : {countries.idd.root}</p>
          </div>
        </div>
      )
    })

  const pageCount = Math.ceil(countries.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  };

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
    <>
      <Search />
      <div className='main'>
        {displayUsers}
        {/* {
            countries.map((data, index) => {
                return <div className='card'>
                  <img src={data.flags.png} alt="" />
                  <div className='detail'>
                    <h1 key={index}>Official name : {data.name.official}</h1>
                    <p>cca2 : {data.cca2}</p>
                    <p>cca3 : {data.cca3}</p>
                    <p>root : {data.idd.root}</p>
                  </div>
                </div>
            })
        } */}

      </div>


      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttns"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      ></ReactPaginate>
    </>
  );
}

export default App;
