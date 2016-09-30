import React from 'react';
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'


class CreateBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	title: ''
        }
    }
    handleClick(){
    	const {title} = this.state
    	this.props.actions.createBoard(title)
        this.setState = {
            title: ''
        }
    }
    handleChange(e) {
    	this.setState({
    		title: e.target.value
    	})
    }
    render() {
    	const panelStyle = {
            width: '150px',
    		padding: '5px',
    		margin: '5px',
    		borderRadius: '3px', 
    		backgroundColor: 'lightgrey',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)'
    	}
    	const inputStyle = {
            width: '145px'
    	}
    	const buttonStyle = {
    		margin: '3px',
    		padding: '5px',
    		textAlign: 'center',

    		width: '50px',
    		height: '10px',
    		fontSize: '12px',
    		background: 'linear-gradient(to bottom,#61BD4F 0,#5AAC44 100%)',
    		color: 'white',
    		boxShadow: '0 1px 0 #3F6F21',
    		cursor: 'pointer'
    	}
        return(
        	<div style={panelStyle}>
        		<div>
        			<input onChange={this.handleChange.bind(this)} placeholder="Add a board" style={inputStyle}/>
        		</div>
        		<div onClick={this.handleClick.bind(this)} style={buttonStyle}>
        			<span style={{verticalAlign: 'middle'}}>Save</span>
        		</div>
        	</div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

export default connect(null, mapDispatchToProps)(CreateBoard);
