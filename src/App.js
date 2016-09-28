import React, { Component } from 'react';
import Board from './Board'
import Header from './Header'

export default class App extends Component {

  render() {
    return (
			<div>
				<Header />
				<Board />
			</div>
    );
  }
}
