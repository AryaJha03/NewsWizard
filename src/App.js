import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/business" element={<News key="business" pageSize={20} category="business" />}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={20} category="entertainment" />}></Route>
            <Route exact path="/" element={<News key="general" pageSize={20} category="general" />}></Route>
            <Route exact path="/health" element={<News key="health" pageSize={20} category="health" />}></Route>
            <Route exact path="/science" element={<News key="science" pageSize={20} category="science" />}></Route>
            <Route exact path="/sports" element={<News key="sports" pageSize={20} category="sports" />}></Route>
            <Route exact path="/technology" element={<News key="technology" pageSize={20} category="technology" />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default App

