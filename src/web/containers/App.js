import React, { Component } from 'react';
import Board from '../components/Board'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as LamaActions from '../../common/actions'
import { bindActionCreators } from 'redux'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import _ from 'lodash'
import ConnectionStatus from '../components/ConnectionStatus'
import {sort} from '../../common/utils'
import Login from '../components/Login'

class App extends Component {
// TODO authentication
  componentDidMount() {
    const {fetchData, getConnectionStatus, checkLoginStatus} = this.props.actions
    // fetchData()
    getConnectionStatus()
    checkLoginStatus()
  }

  render() {
    const style = {
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: 'rgb(0, 121, 191)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: 'scroll',
      overflowX: 'scroll'
    }
		const {main, actions} = this.props
    const sortedBoards = sort(main.boards, 'boardIndex')
    const mainApp = <div><Header main={main} actions={actions}/>
    <div style={{display:'flex', flexDirection:'row'}}>
      <div>
         {_.map(sortedBoards, board  => main.selectedBoard === board.id ? <Board key={board.id} boardId={board.id} board={board}/>:null)}
      </div>
    </div></div>
    return (
			<div style={style}>
        {main.connected?null:<ConnectionStatus />}
        {main.loggedIn? mainApp:<Login actions={actions} />}
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
