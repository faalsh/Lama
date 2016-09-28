import React, { Component } from 'react';
import Board from '../components/Board'
import Header from '../components/Header'
import { connect } from 'react-redux'

class App extends Component {

  render() {
		const {lists} = this.props
    return (
			<div style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
				<Header />
				<Board lists={lists}/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.board.lists
})

export default connect(mapStateToProps)(App)
