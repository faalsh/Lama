import React, { Component } from 'react';
import List from './List'
import CreateList from './CreateList'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Board extends Component {

  render() {
  	const {lists,boardId,boardTitle} = this.props.board
    const sortedLists = _.sortBy(lists,'listIndex').map(list =>
        <List key={list.listId} items={_.sortBy(list.items, 'itemIndex')} title={list.listTitle} listId={list.listId} boardId={boardId}/>)
  	const style = {
  		display: 'flex',
      flexDirection: 'row',
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
