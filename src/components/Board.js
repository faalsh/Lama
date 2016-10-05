import React, { Component } from 'react';
import List from './List'
import CreateList from './CreateList'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Board extends Component {

  render() {
  	const {boardTitle} = this.props.board
    const {boardId} = this.props

    console.log(boardId)
    //const sortedLists = _.sortBy(lists,'listIndex').map(list =>
    //    <List key={list.listId} items={_.sortBy(list.items, 'itemIndex')} title={list.listTitle} listId={list.listId} boardId={boardId}/>)
  	const style = {
  		display: 'flex',
      flexDirection: 'row',
      marginTop: '10px'
  	}
    const titleStyle = {
      marginTop: '10px',
      marginLeft: '5px',
      fontWeight: 'bold',
      color: 'white'
    }

    return (

      <div>
        <div style={titleStyle}>{boardTitle}</div>
    		<div style={style}>

          <ReactCSSTransitionGroup
              transitionName="createList"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              transitionAppear={true}
              transitionAppearTimeout={500}>
              <div style ={{display: 'flex'}}>
              sorted list here
              </div>
          </ReactCSSTransitionGroup>
          <CreateList  boardId={boardId}/>


    		</div>
      </div>
    );
  }
}
