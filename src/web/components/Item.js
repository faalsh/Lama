import React from 'react';
import {DragSource, DropTarget} from 'react-dnd'
import ContextMenu from './ContextMenu'
import ContextMenuItem from './ContextMenuItem'
import { StyleSheet, css } from 'aphrodite'

class Item extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: this.props.item.itemText,
      edit: false
    }

    this.handleDelete = this.handleDelete.bind(this)
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
  handleKeyDown(e){
    if(e.key === 'Enter'){
      const {boardId, listId, itemId, actions} = this.props
      actions.updateItem(boardId, listId, itemId, this.state.text)
      this.setState({
        edit: false
      })
    } else if (e.key === 'Escape') {
      this.setState({
        edit: false
      })
    }
  }
  handleOnBlur(){

      this.setState({
        edit: false
      })
    }

  handleDelete(){
    const {boardId, listId, itemId, actions} = this.props
    actions.deleteItem(boardId, listId, itemId)
  }

    render() {
    	const {item, connectDragSource, connectDropTarget, isDragging} = this.props

      const styles = StyleSheet.create({
        base: {
          position: 'relative',
          backgroundColor: 'white',
          margin: '2px',
          padding: '4px 10px 4px 4px',
          fontSize: '12px',
          borderRadius: '3px',
          minHeight: '30px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          order: item.itemIndex
        },
        dragging: {
          backgroundColor: 'grey',
          color: 'grey',
        },
        tag: {
          fontSize:'10px',
          padding: '5px',
          color:'white',
          border: '1px solid',
          borderRadius: '10px',
          backgroundColor: '#4875af',
        },
        itemText: {
          display:'flex',
          flexDirection: 'column'
        },
        assignees: {
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }
    	})

      const textEdit = <textarea rows="3" autoFocus onChange={this.onChange.bind(this)} style={{width:'90%'}}
                      onKeyDown={this.handleKeyDown.bind(this)} onBlur={this.handleOnBlur.bind(this)} value={this.state.text} />
      const textDisplay =
          <div onClick={this.toggleMode.bind(this)} className={css(styles.itemText)}>
              {item.itemText}
              <div className={css(styles.assignees)}>
                <div className={css(styles.tag)}>Fahad</div>
                <div className={css(styles.tag)}>Khalid</div>
                <div className={css(styles.tag)}>Mohammed</div>
                <div className={css(styles.tag)}>Saleh</div>
              </div>

          </div>
        return connectDragSource(connectDropTarget(
        	<div className={css(styles.base, isDragging && styles.dragging)}>
        		{this.state.edit? textEdit:textDisplay}
            <ContextMenu title="Item Actions">
              <ContextMenuItem onClick={this.handleDelete} itemText="Delete"/>
            </ContextMenu>
        	</div>
        ))
    }
}

const itemSource = {
  beginDrag(props){
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
