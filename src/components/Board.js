import React, { Component } from 'react';
import List from './List'
import _ from 'lodash'

export default class Board extends Component {

  render() {
  	const {lists} = this.props
    const sortedLists = _.sortBy(lists,'listIndex')


  	const style = {
  		display: 'flex',
      marginTop: '10px'
  	}
    return (
		<div style={style}>
			{sortedLists.map((list) => <List key={list.listId} items={_.sortBy(list.items, 'itemIndex')} title={list.listTitle}/>)}
		</div>
    );
  }
}
