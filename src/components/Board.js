import React, { Component } from 'react';
import List from './List'
import CreateList from './CreateList'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {sort} from '../utils'

export default class Board extends Component {

  render() {
  	const {boardTitle, lists} = this.props.board
    const {boardId} = this.props

    const sortedLists = sort(lists, 'listIndex')
    const renderedList =_.map(sortedLists, (list) =>
        <List key={list.id}  list={list} boardId={boardId}/>)

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

    const boardStyle = {
      margin: '15px'
    }

    return (

      <div style={boardStyle}>
        <div style={titleStyle}>{boardTitle}</div>
    		<div style={style}>

          <ReactCSSTransitionGroup
              transitionName="createList"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              transitionAppear={true}
              transitionAppearTimeout={500}>
              <div style ={{display: 'flex'}}>
              {renderedList}
              </div>
          </ReactCSSTransitionGroup>
          <CreateList  boardId={boardId}/>


    		</div>
      </div>
    );
  }
}
