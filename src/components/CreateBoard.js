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
    handleClose(){
      this.setState({
        panelOpen: false
      })
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
    handleKeyPress(e){
      if(e.key === 'Enter'){
        const {title} = this.state
          if(title !== '') {
              this.props.actions.createBoard(title)
              this.setState({
                title: '',
                panelOpen: false
              })
          }
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
        backgroundColor: '#026AA7',
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
    		width: '100px',
    		height: '20px',
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
      const panelBottomStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }

      const closeButtonStyle = {
        marginLeft: '15px',
        fontSize: '20px',
        cursor: 'pointer',
        color: 'white'
      }

      const createBoardButtonStyle = {
        marginTop: '10px',
        padding: '5px',
        textDecoration: 'underline',
        color: 'white',
        opacity: '0.8',
        cursor: 'pointer',
      }
        return this.state.panelOpen?(
        	<div style={panelStyle}>
        		<div>
        			<input autoFocus onChange={this.handleChange.bind(this)} style={inputStyle}
                placeholder="Board title" style={inputStyle} value={this.state.title}
                onKeyPress={this.handleKeyPress.bind(this)}/>
        		</div>
            <div style={panelBottomStyle}>
              <div onClick={this.handleClick.bind(this)} style={buttonStyle}>
                Create Board
              </div>
              <div onClick={this.handleClose.bind(this)} style={closeButtonStyle}>×</div>

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
