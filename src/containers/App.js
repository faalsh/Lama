import React, { Component } from 'react';
import Board from '../components/Board'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'


class App extends Component {

  componentDidMount() { 
    this.props.actions.addItem()
  }

  render() {
		const {lists, actions} = this.props
    return (
			<div style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
				<Header />
				<Board lists={lists}/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.board
})
const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
