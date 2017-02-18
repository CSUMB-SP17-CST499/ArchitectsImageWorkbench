import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './NavigationBar'
import SortDropdownButton from './SortDropdownButton'
import Gallery from './Gallery'
import FilterButton from './FilterButton'
import SearchBar from './SearchBar'

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavigationBar/>
                <SortDropdownButton/>
                
                <div className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<h2>Welcome to React</h2>*/}
                    <br/>
                    <br/>
                    <SearchBar/>
                    <FilterButton/>
                </div>
		        <Gallery/>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>

        );
    }
}

export default App;
