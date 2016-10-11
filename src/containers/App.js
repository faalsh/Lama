import React, { Component } from 'react';
import Board from '../components/Board'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import _ from 'lodash'
import ConnectionStatus from '../components/ConnectionStatus'
import {sort} from '../utils'

class App extends Component {
// TODO authentication
  componentDidMount() {
    const {fetchData, getConnectionStatus} = this.props.actions
    fetchData()
    getConnectionStatus()
  }

  render() {
    const style = {
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: 'rgb(0, 121, 191)',
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0
    }
		const {main, actions} = this.props
    const sortedBoards = sort(main.boards, 'boardIndex')
    return (
			<div style={style}>
        {main.connected?null:<ConnectionStatus />}
				<Header main={main} actions={actions}/>
				<div style={{display:'flex', flexDirection:'row'}}>
          <div>
             {_.map(sortedBoards, board  => main.selectedBoard === board.id ? <Board key={board.id} boardId={board.id} board={board}/>:null)}
          </div>
        </div>

			</div>

    );

  }
}

const mapStateToProps = state => ({
  main: state.main,
})
const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

App = DragDropContext(HTML5Backend)(App)
export default connect(mapStateToProps,mapDispatchToProps)(App)
