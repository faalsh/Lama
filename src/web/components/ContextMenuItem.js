import React from 'react';
import Radium from 'radium'

class ContextMenuItem extends React.Component {

    render() {
    	const itemStyle = {
    		fontSize: '16px',
    		fontWeight: 'bold',
    		padding: '10px',
            ':hover': {
                backgroundColor: '#dadada'
            }
    	}
        return(
        	<div style={itemStyle} onClick={this.props.onClick}>{this.props.itemText}</div>
        )
    }
}

export default Radium(ContextMenuItem);
