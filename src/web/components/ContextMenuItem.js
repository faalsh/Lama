import React from 'react';

class ContextMenuItem extends React.Component {

    render() {
    	const itemStyle = {
    		fontSize: '16px',
    		fontWeight: 'bold',
    		margin: '10px'
    	}
        return(
        	<div style={itemStyle} onClick={this.props.onClick}>{this.props.itemText}</div>
        )
    }
}

export default ContextMenuItem;
