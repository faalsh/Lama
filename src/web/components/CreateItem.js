import React from 'react';
import { connect } from 'react-redux'
import * as LamaActions from '../../common/actions'
import { bindActionCreators } from 'redux'
import Radium from 'radium'

class CreateItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	title: '',
          panelOpen: false
        }
    }
    handleClick(){
    	const {boardId, listId, actions} = this.props
    	const {title} = this.state
        if(title !== '') {
            actions.createItem(boardId, listId, title)
            this.setState({
              title: '',
              panelOpen: false
            })

        }
    }
    handleKeyDown(e){
        if(e.key === 'Enter') {
            const {boardId, listId, actions} = this.props
            const {title} = this.state
            if(title !== '') {
                actions.createItem(boardId, listId, title)
                this.setState({
                  title: '',
                  panelOpen: false
                })

            }
        } else if (e.key === 'Escape') {
            this.setState({
                title: '',
                panelOpen: false
            })
        }
    }
    handleClose(){
      this.setState({
        panelOpen: false
      })
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
    		padding: '5px',
    		margin: '5px',
    	}
    	const inputStyle = {
        width: '170px'
    	}
    	const buttonStyle = {
    		padding: '5px',
    		width: '70px',
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
        cursor: 'pointer'
      }
      const addItemButtonStyle = {
        marginTop: '10px',
        padding: '5px',
        textDecoration: 'underline',
        color: 'grey',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#f7f5f5',
            opacity: '0.5'
        }
      }
        return this.state.panelOpen?(
        	<div style={panelStyle}>
        		<div>
        			<textarea autoFocus rows='3' onChange={this.handleChange.bind(this)} style={inputStyle} onKeyDown={this.handleKeyDown.bind(this)}
                value={this.state.title} />
        		</div>

            <div style={panelBottomStyle}>
            <div onClick={this.handleClick.bind(this)} style={buttonStyle}>
              Save
            </div>
            <div onClick={this.handleClose.bind(this)} style={closeButtonStyle}>×</div>
            </div>
        	</div>
        ):(
          <div onClick={this.handleOpen.bind(this)} style={addItemButtonStyle}>
            Add item
          </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

CreateItem = Radium(CreateItem)
export default connect(null, mapDispatchToProps)(CreateItem);
