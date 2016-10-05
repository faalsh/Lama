import React, { Component } from 'react';
import Board from '../components/Board'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'
// import Tester from '../components/Tester'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import _ from 'lodash'

class App extends Component {

  componentDidMount() {
    this.props.actions.fetchData()
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
    return (
			<div style={style}>
				<Header main={main} actions={actions}/>
				<div style={{display:'flex', flexDirection:'row'}}>
          <div>
             {_.map(main.boards,(board,boardId) => main.selectedBoard === boardId ? <Board key={boardId} boardId={boardId} board={board}/>:null)} 
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
