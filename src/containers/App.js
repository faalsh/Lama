import React, { Component } from 'react';
import Board from '../components/Board'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'
// import Tester from '../components/Tester'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';


class App extends Component {

  render() {
    const style = {
      fontFamily: 'Helvetica, Arial, sans-serif'
    }

		const {main, actions} = this.props
    return (
			<div style={style}>
				<Header main={main} actions={actions}/>
				<div style={{display:'flex', flexDirection:'row'}}>
          <div>
            {main.boards.map((board) => main.selectedBoard === board.boardId ? <Board key={board.boardId} board={board}/>:null)}
          </div>
        </div>

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

App = DragDropContext(HTML5Backend)(App)
export default connect(mapStateToProps,mapDispatchToProps)(App)
