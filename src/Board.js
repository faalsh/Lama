import React, { Component } from 'react';
import List from './List'

export default class Board extends Component {
	constructor(props){
		super(props)
		this.state = {

			lists: [
			{
				id: 1,
				title: 'To Do',
				items: [
					{
						id: 1,
						text: 'text 1'
					},
					{
						id: 2,
						text: 'text 2'
					},
					{
						id: 3,
						text: 'text 3'
					}
				]
			},
			{
				id: 2,
				title: 'Doing',
				items: [
					{
						id: 1,
						text: 'text 11'
					},
					{
						id: 2,
						text: 'text 22'
					},
					{
						id: 3,
						text: 'text 33'
					}
				]
			},
			{
				id: 3,
				title: 'Done',
				items: [
					{
						id: 1,
						text: 'text 111'
					},
					{
						id: 3,
						text: 'text 333'
					}
				]
			},

			]

		}
	}

  render() {
  	const {lists} = this.state
  	const style = {
  		display: 'flex',
  		fontFamily: 'Helvetica, Arial, sans-serif',
      marginTop: '10px'
  	}
    return (
		<div style={style}>
			{lists.map((list) => <List key={list.id} items={list.items} title={list.title}/>)}
		</div>
    );
  }
}
