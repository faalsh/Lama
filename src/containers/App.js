import React, { Component } from 'react';
import Board from '../components/Board'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'
import Tester from '../components/Tester'


class App extends Component {

  componentDidMount() { 
    this.props.actions.addItem(1,1,{itemId:2, itemIndex:2, itemText:'test 2'})
    this.props.actions.addItem(1,1,{itemId:3, itemIndex:3, itemText:'test 3'})
    this.props.actions.createList(1,'new list')
  }

  render() {
		const {main, actions} = this.props
    return (
			<div style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
				<Header />
				{main.boards.map((board) => <Board key={board.boardId} lists={board.lists}/>)}
        <Tester />
			</div>
    );
  }
}

const mapStateToProps = state => ({
  main: state.main
})
const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
