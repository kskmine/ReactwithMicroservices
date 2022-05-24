import './App.css';
import React, { Component } from 'react';
import Languages from './Languages';
import User from './User';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Word from './Word';

class App extends Component {

  constructor() {
    super();
    this.state = {
      languages: [
        { id: 1, code: 'tr', name: 'türkçe' }
        
      ]
    }
  }
  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    fetch("http://localhost:3118/api/Langs")
      .then((res) => { return res.json() })
      .then((result) => {
        console.log(result);
        this.setState({ languages: result });
      });
  }


  setEkelencek = (event) => {
    let existingState = this.state.eklenecekLng;
    existingState[event.target.name] = event.target.value;
    this.setState({ eklenecekLng: existingState });
  }


  render() {
    console.log("app");
    return (
      <Router>
         <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/langs">Languages</Link>
            </li>
            <li>
              <Link to="/words">Words</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
        </nav>
        <div className='container'>
        <Routes>
          <Route path="/langs" element={<Languages refreshData={this.refreshData} languages={this.state.languages} />} />
          <Route path="/words" element={<Word languages={this.state.languages}  />} />
          <Route path="/user" element={<User />} />
        </Routes>
          
        </div>
      </Router>
    );
  }
}

export default App;
