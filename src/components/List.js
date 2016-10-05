import React from 'react';
import Item from './Item'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'
import CreateItem from './CreateItem'
import {DragSource, DropTarget} from 'react-dnd'
import _ from 'lodash'

class List extends React.Component {

    handleDelete(){
        const {actions, listId, boardId} = this.props
        actions.deleteList(boardId, listId)
    }

    render() {
    	const {title, items, boardId, listId, actions, connectDragSource, isDragging, connectDropTarget} = this.props
      const opacity = isDragging? 0.3:1
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
            cursor: 'pointer'
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
          color: 'grey',
          cursor: 'pointer'

        }
        // TODO sort item by index
        return connectDragSource( connectDropTarget (
	        <div style={{...style, opacity}}>
                <div style={deleteStyle} onClick={this.handleDelete.bind(this)}>×</div>
		        <div style={titleStyle}>{title}</div>
            {_.map(items[listId],(item,itemId) => <Item key={itemId} details={item} itemId={itemId} boardId={boardId} listId={listId} actions={actions}/>)}
            <CreateItem boardId={boardId} listId={listId}/>
	        </div>
        ))
    }
}

const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

const mapStateToProps = state => ({
  items: state.main.items,
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
    if(monitor.getItemType() === 'List') {
      const boardId = monitor.getItem().boardId
      const dragListId = monitor.getItem().listId
      const hoverListId = props.listId
      if(dragListId !== hoverListId) {
        props.actions.swapLists(boardId, dragListId, hoverListId)
      }

      } else if(monitor.getItemType() === 'Item'){
        const boardId = monitor.getItem().boardId
        const dragListId = monitor.getItem().listId
        const hoverListId = props.listId
        const dragItemId = monitor.getItem().itemId
        if(dragListId !== hoverListId) {
          props.actions.moveItemToList(boardId, dragListId, hoverListId, dragItemId)
        }
    }
  },
  // drop(props, monitor, component){
  //    if (monitor.getItemType() === 'Item') {
  //     const boardId = monitor.getItem().boardId
  //     const dragListId = monitor.getItem().listId
  //     const hoverListId = props.listId
  //     const dragItemId = monitor.getItem().itemId
  //     if(dragListId != hoverListId) {
  //       props.actions.moveItemToList(boardId, dragListId, hoverListId, dragItemId)
  //     }
  //   }
  // }
}


function collect(connecter, monitor) {
  return {
    connectDragSource: connecter.dragSource(),
    isDragging: monitor.isDragging()
  }
}

List = DragSource('List', listSource, collect)(List)
List = DropTarget(['List', 'Item'], listTarget, connect => ({connectDropTarget: connect.dropTarget()}))(List)
// List = DropTarget('Item', itemTarget, connect => ({connectDropTarget: connect.dropTarget()}))(List)

export default connect(mapStateToProps, mapDispatchToProps)(List);
