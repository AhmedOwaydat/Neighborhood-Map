import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
	  super(props);
	  this.state = { hasError: false };
	}
  
	componentDidCatch(error, info) {
	  // Display fallback UI
	  this.setState({ hasError: true });
	  // You can also log the error to an error reporting service
	  console.log('this is error', error, info);
	}
  
	render() {
	  console.log('errrrrrrrrrrr', this.state.hasError)
	  return (<p>{this.state.hasError}</p>)
	}
  }

  export default ErrorBoundary;