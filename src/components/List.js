import React from 'react';
import Item from './Item'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'
import CreateItem from './CreateItem'
import {DragSource, DropTarget} from 'react-dnd'

class List extends React.Component {

    handleDelete(){
        const {actions, listId, boardId} = this.props
        actions.deleteList(boardId, listId)
    }

    render() {
    	const {items,title, boardId, listId, actions, connectDragSource, isDragging, connectDropTarget} = this.props
      const opacity = isDragging? 0:1
    	const style = {
        position: 'relative',
    		display: 'flex',
    		flexDirection: 'column',
    		padding: '5px',
    		margin: '5px',
    		width: '200px',
    		height: '100%',
        borderRadius: '3px',
    		backgroundColor: 'lightgrey',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
    	}
    	const titleStyle = {
    		fontWeight: 'bold',
    		fontSize: '14px',
    		marginBottom: '10px',
    		textAlign: 'center'
    	}
        const deleteStyle = {
          position: 'absolute',
          top:'5px',
          right: '5px',
          cursor: 'pointer'

        }

        return connectDragSource( connectDropTarget(
	        <div style={{...style, opacity}}>
                <div style={deleteStyle} onClick={this.handleDelete.bind(this)}>×</div>
		        <div style={titleStyle}>{title}</div>
		        {items.map((item) => <Item key={item.itemId} details={item} boardId={boardId} listId={listId} deleteItem={actions.deleteItem}/>)}
            <CreateItem boardId={boardId} listId={listId}/>
	        </div>
        ))

    }
}

const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

const listSource = {
  beginDrag(props){
    return {
      boardId: props.boardId,
      listId: props.listId
    }
  }
}

const listTarget = {
  hover(props, monitor, component) {
    const boardId = monitor.getItem().boardId
    const dragListId = monitor.getItem().listId
    const hoverListId = props.listId
    if(dragListId !== hoverListId) {
      props.actions.swapLists(boardId, dragListId, hoverListId)
    }
  }
}

function collect(connecter, monitor) {
  return {
    connectDragSource: connecter.dragSource(),
    isDragging: monitor.isDragging()
  }
}

List = DragSource('List', listSource, collect)(List)
List = DropTarget('List', listTarget, connect => ({connectDropTarget: connect.dropTarget()}))(List)
export default connect(null, mapDispatchToProps)(List);
