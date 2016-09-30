import React, { Component } from 'react';
import Board from '../components/Board'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'
import Tester from '../components/Tester'
import BoardList from '../components/BoardList'


class App extends Component {

  render() {
    const style = {
      fontFamily: 'Helvetica, Arial, sans-serif'
    }

		const {main, actions} = this.props
    return (
			<div style={style}>
				<Header />
				<div style={{display:'flex', flexDirection:'row'}}>
          <BoardList boards={main.boards} selectedBoard={main.selectedBoard} selectBoard={actions.selectBoard}/>
          <div>
            {main.boards.map((board) => main.selectedBoard === board.boardId ? <Board key={board.boardId} board={board}/>:null)}
          </div>
        </div>
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
