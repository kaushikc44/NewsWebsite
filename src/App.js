import React, { Component } from 'react'

import './App.css';
import { Navbar } from './components/navbar';
import News from './components/news';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from 'react-router-dom';

console.log(process.env.REACT_APP_API_KEY);

export default class App extends Component {
  apikey = process.env.REACT_APP_API_KEY
  
  state = {
    progress:0,
    
  }
  setProgress = (progress) => {
    this.setState({progress:progress});
  }
  

  render(){
    return (
      <div>
        <Router>
         
          <LoadingBar
          height={3}
            color='#FF0000'
            progress={this.progress}
          />
          <Navbar />
          
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={5} category={"general"} country={"us"} />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={5} category={"business"} country={"us"} />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={5} category={"entertainment"} country={"us"} />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={5} category={"health"} country={"us"} />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress}  apikey={this.apikey} key="science" pageSize={5} category={"science"} country={"us"} />} ></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={5} category={"sports"} country={"us"} />} ></Route>
          </Routes>
        </Router>
      
      </div>
  )}
   

}


