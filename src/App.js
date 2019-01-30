/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import MyMapComponent from './MyMapComponent'
import escapeRegExp from 'escape-string-regexp'
import fetchJsonp from 'fetch-jsonp';//to use wiki API
import './App.css';

class App extends Component {
  state = {
    Locations: [
      {id: 1, title: 'The Pyramids Of Giza', location: {lat: 29.9792345, lng: 31.1320132}, Info: ''},
      {id: 2, title: 'Sphinx', location: {lat: 29.9752687, lng: 31.1353787}, Info: ''},
      {id: 3, title: 'The Grand Egyptian Museum', location: {lat: 29.9942315, lng: 31.1165584}, Info: ''},
      {id: 4, title: 'Khufu Ship', location: {lat: 29.9779985, lng: 31.1338049}, Info: ''},
      {id: 5, title: 'Funerary Temple of Khafre', location: {lat: 29.9759343, lng: 31.1317141}, Info: ''}
    ],
    searchQuery: '',
    clickedID: 0,
    isMarkerShown: false
  }

  /* update search query */
  updateQuery = (query) => {
    this.setState({searchQuery: query.trim()})
  }
  
  /* get location id when click on its marker or name */
  onMarkerClick = (loc) => {
    this.setState({clickedID: loc.id})
  }

  componentDidMount() {
    this.setState({ 
      isMarkerShown: true,
    })

    //get information about all locations using wikipedia API
    this.state.Locations.map((Location) => {
      const query = Location.title
      if(navigator.onLine){       
        const api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        fetchJsonp(api + query)
          .then((response) => {
            if(response.status >= 400) {
              alert(new Error("Bad response from server"))
              throw new Error("Bad response from server");
            }
            return response.json()
          })
          .then((data) => {
            for (var page in data.query.pages) {
              if(data.query.pages[page].index === 1)
              Location.Info = data.query.pages[page].extract
            }
          }).catch(function() {
            Location.Info = 'An error occurred'
          });
      } else {
        Location.Info = 'Sorry You are offline'
      }
    })
  }

  render() {
    /* make list that has only filtered locations */
    let searchList
    if(this.state.searchQuery) {
      const match = new RegExp(escapeRegExp(this.state.searchQuery), 'i')
      searchList=this.state.Locations.filter((Location) => match.test(Location.title))
    } else {
      searchList = this.state.Locations
    }

    return (
      <div className="App container">
        <div className='row'>
          <div className='searchPart col-lg-4 col-md-12 col-12'>          
            <nav className="navbar navbar-expand-lg navbar-dark" role='navigation'>
              <button role='button' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" role='icon'></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav" role='nav-body'>
                <h2>Bart Locations</h2>
                <form className="form-inline my-2 my-lg-0" role='search-form'>
                  <input 
                    className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search" 
                    value={this.state.searchQuery}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    aria-label="Search"
                    role='searchbox'
                    tabIndex='1'
                  />
                  <button disabled className="btn btn-dark my-2 my-sm-0" role='search' type="submit">Search</button>
                </form>
                <div className='locations'>
                  <ul role='list'>
                    {searchList.map((Location) => (
                      <li 
                        tabIndex={Location.id+1} 
                        aria-label={Location.title} 
                        role='Location-Name' key={Location.id} 
                        onClick={() => {this.onMarkerClick(Location)}}
                        onFocus={(event) => {this.onMarkerClick(Location)}}
                      >{Location.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className='col-lg-8 col-12'>
          {navigator.onLine && 
            <Route path='/' render={() => (
              /* call the map */
              <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.onMarkerClick}
                Locations={this.state.Locations}
                searchList={searchList}
                clickedID={this.state.clickedID}
              />
              
            )}>
            </Route>
          }
          {!navigator.onLine && (
            <div className='NoInternet'>
              Sorry map will not load because you are offline
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
