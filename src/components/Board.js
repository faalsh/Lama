import React, { Component } from 'react';
import List from './List'
import CreateList from './CreateList'
import _ from 'lodash'

export default class Board extends Component {

  render() {
  	const {lists,boardId,boardTitle} = this.props.board
    const sortedLists = _.sortBy(lists,'listIndex').map(list =>
        <List key={list.listId} items={_.sortBy(list.items, 'itemIndex')} title={list.listTitle} listId={list.listId} boardId={boardId}/>)
  	const style = {
  		display: 'flex',
      marginTop: '10px'
  	}
    const titleStyle = {
      marginTop: '10px',
      marginLeft: '5px',
      fontWeight: 'bold',
      color: 'rgb(65, 89, 125)'
    }
    return (
      <div>
        <div style={titleStyle}>{boardTitle}</div>
    		<div style={style}>
    			{sortedLists}
          <CreateList  boardId={boardId}/>
    		</div>
      </div>
    );
  }
}
