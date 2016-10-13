import React from 'react'
import {DragSource, DropTarget} from 'react-dnd'

class BoardListItem extends React.Component {

  handleSelectBoard(key){
      this.props.actions.selectBoard(key)
  }
  handleDelete(key,e) {
     this.props.actions.deleteBoard(key)
     console.log(e)
     e.preventDefault()
  }

  render(){

    const itemStyle = {
      position: 'relative',
      padding: '5px',
      width: '150px',
      margin: '4px',
      borderRadius: '3px',
      backgroundColor: '#026AA7',
      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
      cursor: 'pointer',
      padding: '10px'
    }

    const selectedItemStyle = {
      position: 'relative',
      fontWeight:'bold',
      padding: '5px',
      width: '150px',
      margin: '4px',
      borderRadius: '3px',
      backgroundColor: '#026AA7',
      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
      cursor: 'pointer',
      padding: '10px'
    }

    const styleDragging = {
      position: 'relative',
      padding: '5px',
      width: '150px',
      margin: '5px',
      borderRadius: '3px',
      backgroundColor: 'black',
      color: 'black',
      opacity: '0.5',
      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
      cursor: 'pointer',
      padding: '10px'
    }

    const deleteStyle = {
      position: 'absolute',
      top: '11px',
      right: '5px',
      width: '15px',
    }

    const {selectedBoard, boardId, boardTitle,
        isDragging, connectDragSource, connectDropTarget} = this.props

    const style = boardId===selectedBoard ? selectedItemStyle:itemStyle
    const finalStyle = isDragging ? styleDragging:style
    return connectDragSource(connectDropTarget(
      <div  style={finalStyle} onClick={this.handleSelectBoard.bind(this,boardId)}>
        {boardTitle}
        <div style={deleteStyle} onClick={this.handleDelete.bind(this,boardId)}>×</div>
      </div>
    ))
  }
}

const boardListItemSource = {
  beginDrag(props){
    return {
      boardId: props.boardId
    }
  }
}

const boardListItemTarget = {
  hover(props, monitor, component) {
    const dragBoardId = monitor.getItem().boardId
    const hoverBoardId = props.boardId

    if(dragBoardId !== hoverBoardId) {
      props.actions.swapBoards(dragBoardId, hoverBoardId)
    }
  }
}

function collect(connecter, monitor) {
  return {
    connectDragSource: connecter.dragSource(),
    isDragging: monitor.isDragging()
  }
}

BoardListItem = DragSource('BoardListItem', boardListItemSource, collect)(BoardListItem)
BoardListItem = DropTarget('BoardListItem', boardListItemTarget, connect => ({connectDropTarget: connect.dropTarget()}))(BoardListItem)

export default BoardListItem
