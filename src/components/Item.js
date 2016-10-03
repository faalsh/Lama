import React from 'react';
import {DragSource, DropTarget} from 'react-dnd'

class Item extends React.Component {
  handleDelete(){
    const {boardId, listId, details, actions} = this.props
    actions.deleteItem(boardId, listId, details.itemId)
  }

    render() {
    	const {details, connectDragSource, connectDropTarget, isDragging} = this.props
      const opacity = isDragging? 0:1
      const style={
        position: 'relative',
    		backgroundColor: 'white',
    		margin: '2px',
    		padding: '4px',
    		fontSize: '12px',
        borderRadius: '3px',
        height: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: '14px'
    	}
      const deleteStyle = {
        position:'absolute',
        right: '5px',
        cursor: 'pointer'
      }
        return connectDragSource(connectDropTarget(
        	<div style={{...style, opacity}}>
            <div style={deleteStyle} onClick={this.handleDelete.bind(this)}>×</div>
        		{details.itemText}
        	</div>
        ))
    }
}

const itemSource = {
  beginDrag(props){
    return {
      boardId: props.boardId,
      listId: props.listId,
      itemId: props.details.itemId
    }
  }
}

const itemTarget = {
  hover(props, monitor, component) {
    const boardId = monitor.getItem().boardId
    const dragListId = monitor.getItem().listId
    const dragItemId = monitor.getItem().itemId
    const hoverItemId = props.details.itemId
    if(dragItemId !== hoverItemId) {
      props.actions.swapItems(boardId, dragListId, dragItemId, hoverItemId)
    }
  }
}

function collect(connecter, monitor) {
  return {
    connectDragSource: connecter.dragSource(),
    isDragging: monitor.isDragging()
  }
}

Item = DragSource('Item', itemSource, collect)(Item)
Item = DropTarget('Item', itemTarget, connect => ({connectDropTarget: connect.dropTarget()}))(Item)


export default Item;
