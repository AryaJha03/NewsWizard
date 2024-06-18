import './App.css';
import React, { useState,useEffect } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App= ()=>{
  const apikey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

  
    return (
      <BrowserRouter>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={20} category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={20} category="entertainment" />}></Route>
            <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={20} category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={20} category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={20} category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={20} category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={20} category="technology" />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
}

export default App

