import React, { Component } from 'react';
import './App.css';


var foursquare = require('react-foursquare')({
  clientID: 'JVLGDP141U3ZFYDMUSHSGKCIERHMNMDL3BTXIL4U1KVF1HO1',
  clientSecret: 'F53TQ4YNJPPJP0I4MU1XIPUP4JBDMJ4D2R54UCDPOC1KCRK2'  
});

var params = {
  "ll": "37.7749,-122.4194",
  "query": 'Blue Bottle'
};

class Foursquare extends Component {

	state = {
	  items: []
  }

  getFoursquareResults= () => {    
		foursquare.venues.getVenues(params)
			.then(res=> {
			this.setState({ items: res.response.venues });
		});
  }
}

export default Foursquare;