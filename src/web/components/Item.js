import React from 'react';
import {DragSource, DropTarget} from 'react-dnd'

class Item extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: this.props.details.itemText,
      edit: false
    }
  }

  onChange(e){
    this.setState({
      text: e.target.value
    })
  }

  toggleMode(){
    this.setState({
      edit: !this.state.edit
    })
  }
  handleKeyPress(e){
    if(e.key === 'Enter'){
      const {boardId, listId, itemId, actions} = this.props
      actions.updateItem(boardId, listId, itemId, this.state.text)
      this.setState({
        edit: false
      })
    }
  }

  handleDelete(){
    const {boardId, listId, itemId, actions} = this.props
    actions.deleteItem(boardId, listId, itemId)
  }

    render() {
    	const {details, connectDragSource, connectDropTarget, isDragging} = this.props
      const styleNotDragging={
        position: 'relative',
    		backgroundColor: 'white',
    		margin: '2px',
    		padding: '4px 10px 4px 4px',
    		fontSize: '12px',
        borderRadius: '3px',
        minHeight: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: '14px'
    	}
      const styleDragging = {
        position: 'relative',
        backgroundColor: 'grey',
        color: 'grey',
        margin: '2px',
        padding: '4px 10px 4px 4px',
        borderRadius: '3px',
        minHeight: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

      }
      const style = isDragging? styleDragging:styleNotDragging
      const deleteStyle = {
        position:'absolute',
        color:'grey',
        right: '5px',
        cursor: 'pointer'
      }

      const textEdit = <input autoFocus onChange={this.onChange.bind(this)}
                      onKeyPress={this.handleKeyPress.bind(this)} value={this.state.text} />
      const textDisplay = <div onClick={this.toggleMode.bind(this)}>{details.itemText}</div>
        return connectDragSource(connectDropTarget(
        	<div style={style}>
            <div style={deleteStyle} onClick={this.handleDelete.bind(this)}>×</div>
        		{this.state.edit? textEdit:textDisplay}
        	</div>
        ))
    }
}

const itemSource = {
  beginDrag(props){
    console.log(props)
    return {
      listId: props.listId,
      itemId: props.itemId
    }
  }
}

const itemTarget = {
  hover(props, monitor, component) {
    const boardId = props.boardId
    const dragListId = monitor.getItem().listId
    const dragItemId = monitor.getItem().itemId
    const hoverItemId = props.itemId
    const hoverListId = props.listId

    if(dragItemId !== hoverItemId) {
      props.actions.swapItems(boardId, hoverListId, dragItemId, hoverItemId)
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
