import React, { Component } from 'react';
import List from './List'
import CreateList from './CreateList'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Board extends Component {

  render() {
  	const {boardTitle} = this.props.board
    const {boardId, lists} = this.props
// items={_.sortBy(list.items, 'itemIndex')}
    const sortedLists = _.sortBy(lists,'listIndex').map((list,listId) =>
        <List key={listId}  title={list.listTitle} listId={listId} boardId={boardId}/>)
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
              {sortedLists}
              </div>
          </ReactCSSTransitionGroup>
          <CreateList  boardId={boardId}/>


    		</div>
      </div>
    );
  }
}
