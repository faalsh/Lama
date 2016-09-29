import React from 'react';

class Item extends React.Component {

    render() {
    	const {details} = this.props
    	const style={
    		backgroundColor: 'white',
    		margin: '2px',
    		padding: '4px',
    		fontSize: '12px',
        borderRadius: '3px'
    	}
        return (
        	<div style={style}>
        		{details.itemText}
        	</div>
        )
    }
}

export default Item;
