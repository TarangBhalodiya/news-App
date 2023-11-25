import './App.css';
import React, { Component } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
  // mode = "dark"
constructor(){
  super()
  this.state = {
    mode: "light"
}

}
  toggleMode =()=>{
    console.log("Working")
    
    if(this.state.mode === "light"){
      this.setState({mode:"dark"})
      console.log(this.state.mode)
    }
    else{
      this.setState({mode:"light"})
      console.log(this.state.mode) 
    }
  }
  render() {
    return (
      <Router>
        <Navbar title="News Dose | Get your daily dose of news" toggleMode={this.toggleMode} mode={this.state.mode}/>
        <Routes>
          <Route path="/" element={<News mode={this.state.mode} category="general"/>}></Route>
        </Routes>
        <Routes>
          <Route path="/business" element={<News mode={this.state.mode} category="business"/>}></Route>
        </Routes>
        <Routes>
          <Route path="/entertainment" element={<News mode={this.state.mode}  category="entertainment"/>}></Route>
        </Routes>
        <Routes>
          <Route path="/health" element={<News mode={this.state.mode} category="health"/>}></Route>
        </Routes>
        <Routes>
          <Route path="/science" element={<News mode={this.state.mode} category="science"/>}></Route>
        </Routes>
        <Routes>
          <Route path="/sports" element={<News mode={this.state.mode} category="sports"/>}></Route>
        </Routes>
        <Routes>
          <Route path="/technology" element={<News mode={this.state.mode} category="technology"/>}></Route>
        </Routes>
        
      </Router>
    )
  }
}