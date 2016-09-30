import React from 'react';
import Item from './Item'
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'
import CreateItem from './CreateItem'

class List extends React.Component {

    handleDelete(){
        const {actions, listId, boardId} = this.props
        actions.deleteList(boardId, listId)
    }

    render() {
    	const {items,title, boardId, listId} = this.props
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

        return(
	        <div style={style}>
                <div style={deleteStyle} onClick={this.handleDelete.bind(this)}>x</div>
		        <div style={titleStyle}>{title}</div>
		        {items.map((item) => <Item key={item.itemId} details={item} />)}
            <CreateItem boardId={boardId} listId={listId}/>
	        </div>
        )

    }
}

const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

export default connect(null, mapDispatchToProps)(List);
