import React from 'react';

class ContextMenuPanel extends React.Component {
	constructor(props) {
		super(props)
		this.onEscape = this.onEscape.bind(this)
	}

	componentDidMount() {
		window.addEventListener('keydown', this.onEscape);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.onEscape);
	}
	onEscape(e){

		if(e.key === 'Escape') {
			this.props.onEscape()
		}
	}

	render(){
		const panelStyle = {
			position: 'absolute',
			backgroundColor: 'white',
			width: '200px',
			boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
			zIndex: 3,
			padding: '10px'
		}

		const titleStyle = {
			display: 'flex',
			justifyContent: 'center',
			fontSize: '16px',
			color: 'grey',
			fontWeight: 'bold'
		}

		return(
			<div style={panelStyle}>
				<div style={titleStyle} >{this.props.title}</div>
				<hr />
				{this.props.children}
			</div>
		)
	}
}

class ContextMenu extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        	open: false
        }

        this.togglePanel = this.togglePanel.bind(this)
        this.onEscape = this.onEscape.bind(this)
    }

	

	onEscape(){
		this.setState({
			open: false
		})
	}


    togglePanel(){
    	this.setState({
    		open: !this.state.open
    	})
    }

    render() {
    	const menuButtonStyle = {
    		cursor: 'pointer',
    		fontWeight: 'bold'
    	}

        return(
        	<div>
        		<div style={menuButtonStyle} onClick={this.togglePanel}>...</div>
        		{this.state.open ? <ContextMenuPanel title={this.props.title} onEscape={this.onEscape}>{this.props.children}</ContextMenuPanel>:null}
        	</div>

        )
    }
}

export default ContextMenu;
