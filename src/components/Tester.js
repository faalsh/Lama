import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LamaActions from '../actions'
import _ from 'lodash'

class Tester extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	handleChange(field, e) {
    var nextState = {}
    nextState[field] = e.target.value
    this.setState(nextState)

  }

	addItem(){
		const {boardId, listId, itemText} = this.state
		this.props.actions.addItem(parseInt(boardId), parseInt(listId), itemText)
	}
	deleteItem(){
		const {boardId, listId, itemId} = this.state
		this.props.actions.deleteItem(parseInt(boardId), parseInt(listId), parseInt(itemId))
	}
	createList(){
		const {title,boardId} = this.state
		this.props.actions.createList(parseInt(boardId), title)
	}
	deleteList(){
		const {boardId, listId} = this.state
		this.props.actions.deleteList(parseInt(boardId), parseInt(listId))
	}
	createBoard() {
		this.props.actions.createBoard(this.state.title);
	}

    render() {
        return(
        	<div>
						<div>
							title<input onChange={this.handleChange.bind(this,'title')} />
							<button onClick={this.createBoard.bind(this)}>Create Board</button>
						</div>
        		<div>Create list:
	        		boardId<input onChange={this.handleChange.bind(this,'boardId')} />
	        		title<input onChange={this.handleChange.bind(this,'title')}/>
	        		<button onClick={this.createList.bind(this)}>Create List</button>
        		</div>
						<div>Delete list:
							boardId<input onChange={this.handleChange.bind(this,'boardId')} />
							listId<input onChange={this.handleChange.bind(this,'listId')}/>
							<button onClick={this.deleteList.bind(this)}>Delete List</button>
						</div>

						<div>Add Item:
							boardId<input onChange={this.handleChange.bind(this,'boardId')} />
							listId<input onChange={this.handleChange.bind(this,'listId')}/>
							itemText<input onChange={this.handleChange.bind(this,'itemText')}/>
							<button onClick={this.addItem.bind(this)}>Add Item</button>
						</div>
						<div>Delete Item:
							boardId<input onChange={this.handleChange.bind(this,'boardId')} />
							listId<input onChange={this.handleChange.bind(this,'listId')}/>
							itemId<input onChange={this.handleChange.bind(this,'itemId')}/>
							<button onClick={this.deleteItem.bind(this)}>Delete Item</button>
						</div>

        	</div>
        )
    }
}

const mapStateToProps = state => ({
  main: state.main
})
const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Tester)
