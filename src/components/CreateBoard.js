import React from 'react';
import { connect } from 'react-redux'
import * as LamaActions from '../actions'
import { bindActionCreators } from 'redux'


class CreateBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	title: '',
          panelOpen: false
        }
    }
    handleClick(){
    	const {title} = this.state
        if(title !== '') {
            this.props.actions.createBoard(title)
            this.setState({
              title: '',
              panelOpen: false
            })

        }
    }
    handleOpen(){
      this.setState({
        panelOpen: true
      })
    }
    handleChange(e) {
    	this.setState({
    		title: e.target.value
    	})
    }
    render() {
    	const panelStyle = {
        width: '160px',
    		padding: '5px',
    		borderRadius: '3px',
        backgroundColor: 'rgb(144, 185, 210)',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        marginTop: '10px'
    	}
    	const inputStyle = {
        width: '150px',
        height:'20px',
        fontWeight: 'bold'
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
    		cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5px',
        marginBottom:'10px',
        marginTop: '10px'
    	}
      const createBoardButtonStyle = {
        marginTop: '10px',
        padding: '5px',
        textDecoration: 'underline',
        color: 'white',
        opacity: '0.5',
        cursor: 'pointer',
      }
        return this.state.panelOpen?(
        	<div style={panelStyle}>
        		<div>
        			<input onChange={this.handleChange.bind(this)} style={inputStyle}
                placeholder="Board title" style={inputStyle} value={this.state.title}/>
        		</div>
        		<div onClick={this.handleClick.bind(this)} style={buttonStyle}>
        			<span style={{verticalAlign: 'middle'}}>Save</span>
        		</div>
        	</div>
        ):(
          <div onClick={this.handleOpen.bind(this)} style={createBoardButtonStyle}>
            Create board
          </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

export default connect(null, mapDispatchToProps)(CreateBoard);
