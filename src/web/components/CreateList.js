import React from 'react';
import { connect } from 'react-redux'
import * as LamaActions from '../../common/actions'
import { bindActionCreators } from 'redux'


class CreateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	title: '',
          panelOpen: false
        }
    }
    handleClick(){
    	const {boardId, actions} = this.props
    	const {title} = this.state
        if(title !== '') {
            actions.createList(boardId,title)
            this.setState({
              title: '',
              panelOpen: false
            })
        }
    }
    handleClose(){
      this.setState({
        title: '',
        panelOpen: false
      })
    }
    handleChange(e) {
    	this.setState({
    		title: e.target.value
    	})
    }
    openPanel(){
      this.setState({
        panelOpen: true
      })
    }
    handleKeyPress(e){
      if(e.key === 'Enter'){
        const {boardId, actions} = this.props
        const {title} = this.state
          if(title !== '') {
              actions.createList(boardId,title)
              this.setState({
                title: '',
                panelOpen: false
              })
          }

      }
    }
    render() {
    	const panelStyle = {
    		padding: '5px',
    		margin: '5px',
    		borderRadius: '3px',
    		backgroundColor: 'lightgrey',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        height: '100%',
        width: '200px',
    	}
    	const inputStyle = {
        width: '185px',
        height: '20px',
        fontWeight: 'bold',
        marginTop: '10px',
        marginLeft: '5px',
        marginBottom:'10px'

    	}
    	const panelButtonStyle = {
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
        marginBottom:'10px'
    	}
      const panelBottomStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }
      const closeButtonStyle = {
        marginLeft: '15px',
        marginBottom: '10px',
        fontSize: '25px',
        cursor: 'pointer'
      }
      const addButtonStyle = {
        margin: '3px',
        backgroundColor: '#006ba9',
        color:'white',
        height:'20px',
        width: '200px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        cursor: 'pointer',
        opacity: '.7'

      }
        return this.state.panelOpen? (

        	<div style={panelStyle}>
        		<div>
        			<input autoFocus onChange={this.handleChange.bind(this)} style={inputStyle}
                value={this.state.title} placeholder="List title" onKeyPress={this.handleKeyPress.bind(this)}/>
        		</div>
            <div style={panelBottomStyle}>
              <div onClick={this.handleClick.bind(this)} style={panelButtonStyle}>
                Save
              </div>
              <div onClick={this.handleClose.bind(this)} style={closeButtonStyle}>×</div>
            </div>
        	</div>
        ):(
          <div >
            <div style={addButtonStyle}onClick={this.openPanel.bind(this)}>Add list</div>
          </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(LamaActions,dispatch)
})

export default connect(null, mapDispatchToProps)(CreateList);
