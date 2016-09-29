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
		const {boardId, listId} = this.state
		this.props.actions.addItem(parseInt(boardId), parseInt(listId), {itemId:_.random(1000), itemText:'test '+_.random(100)})
	}

    render() {
        return(
        	<div>
        		<div>Add Item: 
        		boardId<input onChange={this.handleChange.bind(this,'boardId')} />
        		listId<input onChange={this.handleChange.bind(this,'listId')}/>
        		<button onClick={this.addItem.bind(this)}>Add Item</button>
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
