import React, { Component } from 'react';

class Home extends Component {
  render() {
    console.log('Home中的props', this.props)
    return (
      <div>
        Home
      </div>
    );
  }
}

export default Home;
