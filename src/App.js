import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }
  setProgress = (progress) =>{
    this.setState({ progress: progress })
  }

  render() {
    return (
      <BrowserRouter>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={20} category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={20} category="entertainment" />}></Route>
            <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={20} category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={20} category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={20} category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={20} category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={20} category="technology" />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default App

