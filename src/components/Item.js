import React from 'react';

class Item extends React.Component {
  handleDelete(){
    const {boardId, listId, details, deleteItem} = this.props
    deleteItem(boardId, listId, details.itemId)
  }

    render() {
    	const {details} = this.props
    	const style={
        position: 'relative',
    		backgroundColor: 'white',
    		margin: '2px',
    		padding: '4px',
    		fontSize: '12px',
        borderRadius: '3px'
    	}
      const deleteStyle = {
        position:'absolute',
        right: '5px',
        cursor: 'pointer'
      }
        return (
        	<div style={style}>
            <div style={deleteStyle} onClick={this.handleDelete.bind(this)}>x</div>
        		{details.itemText}
        	</div>
        )
    }
}

export default Item;
