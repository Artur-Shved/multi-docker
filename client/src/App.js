import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";
import { Component } from "react";

class  App extends Component {
  render(){
    return (
        <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Link to="/">Home</Link>
            <Link to="/otherpage">OtherPage</Link>
          </header>
            <div>
              <Route exact path="/" component={Fib}/>
              <Route path="/otherpage" component={OtherPage}/>
            </div>
        </div>
        </Router>
    );
  };

}

export default App;
