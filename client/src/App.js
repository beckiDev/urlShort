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
  const changeHandleUrl = (e) => {
    const url = e.target.value;

    if(!isValidUrl(url)){
      setErrorMsg('Error, Url is not valid')
    } else {
        if(url.includes(baseHost)){
          setShortURl(url);
          setMethod('GET')
        } else {
          setOriginalUrl(url);
          setMethod('POST')
        }
        console.error("Error");
    }
  }
  const clearAll = () => {
    setErrorMsg('');
    setShortURl('');
    setOriginalUrl('');
    setrealLink({linktext: '',
    redirect: ''})

  }
  const getOriginalUrlServer = () =>{
    let body;
    if (shortUrl.includes('localhost:3000/')) {
        body = shortUrl.replace('localhost:3000/','localhost:5000/urls/');
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
    if(realLink|| realLink.redirect.length > 1){
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
        <p className="url_title">URL</p>
        <input className="input_url" type="url" onChange={(e)=>changeHandleUrl(e)} placeholder="Type URL"/>
        <br />
        <button onClick={getURL} className="success_button">Get URl</button>

      </div>

    </div>
  );
}
export default App;
