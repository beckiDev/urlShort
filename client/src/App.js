import React, { useState } from 'react';
import shorthash from 'shortid';
import './App.css';


function App() {
  let baseHost = 'localhost'
  const requestUrl = `http://${baseHost}:5000/urls`;
  const [ shortUrl, setShortURl ] = useState('');
  const [ originalUrl, setOriginalUrl ] = useState('');
  const [ method, setMethod ] = useState('GET');
  const [ error, setErrorMsg ] = useState('');
  const [ realLink, setrealLink] =  useState({
    linktext: '',
    redirect: ''
  });

  const isValidUrl = url => {
    try {
      new URL(url)
      return true
    } catch( err ) {
      return false
    }
  }
  const changeHandleUrl = (e, type) => {
    const url = e.target.value;
    if(!isValidUrl(url)){
      setErrorMsg('Error, Url is not valid')
    } else {
        if(type!=='origin'){
          setShortURl(url);
          setMethod('GET')
        } else if(type==='origin'){
          setOriginalUrl(url);
          setMethod('POST')
        } else {
          console.error("Error");
        }
    }
  }
  const clearAll = () => {
    setErrorMsg('');
    setShortURl('');
    setOriginalUrl('');


  }
  const getOriginalUrlServer = () =>{
    let body;
    if (shortUrl.includes('localhost:3000/')) {
        body = shortUrl.replace('localhost:3000/','localhost:5000/');
    } else {
      setErrorMsg("Error")
    }
    fetch(body, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( response =>response.json())
    .then( response => {
      const { shortHash, realUrl } = response;
      setrealLink({ linktext: realUrl, redirect: realUrl})
    });
  }
  const setShortURlServer = () =>{
    const shortUrl = shorthash.generate();
    const body = JSON.stringify({realUrl: originalUrl, shortHash: shortUrl, id: shortUrl})
    fetch(requestUrl, {
      method: "POST", // POST, PUT, DELETE, etc.
      headers: {
        "origin": requestUrl,
        'Content-Type': 'application/json'
      },
      body
    })
    .then((resp) => resp.json())
    .then(response => {
        const { shortHash, realUrl } = response;
        setrealLink({ linktext: `http://localhost:3000/${shortUrl}`, redirect: realUrl})

    });
    setOriginalUrl('');
    setShortURl('');
  }

  const getURL = (e) => {
    e.preventDefault();
    if(method === 'GET'){
      getOriginalUrlServer()
    } else {
      setShortURlServer()
    }
  }
  const Link = () =>{
    if(realLink.redirect.length > 1){
      return <p>Your Url Here: <a rel="noopener noreferrer" target="_blank" href={realLink.redirect}>{realLink.linktext}</a></p>
    } else {
      return <p>No Link was submited</p>
    }
  }
  return (
    <div className="main_page_container">
      <h3>CUSTOM URL SHORTNER FOR TractionCo</h3>
      <div className="Orig_URL_container">
        <p><Link onClick={clearAll}/></p>
        <p className="url_title">Original URL</p>
        <input className="input_url" type="url" onChange={(e)=>changeHandleUrl(e, 'origin')} placeholder="Original URL"/>
        <p className="url_title">Short URL</p>
        <input className="input_url" type="url" onChange={(e)=>changeHandleUrl(e, 'short')} placeholder="Original URL"/>
        <br />
        <button onClick={getURL} className="success_button">Get URl</button>
      </div>
    </div>
  );
}

export default App;


// <div className="App">
// <header className="App-header">
//   <h3>URL shortner for TractionCo</h3>
//     <div className="Input">
//       <input type="text" className="Btn" placeholder="Enter Url" onChange={changeHandleUrl}/>
//       <Link onClick={clearAll}/>
//     </div>
//     <button onClick={getURL} className="Btn success">Get URl</button>
// </header>
// </div>