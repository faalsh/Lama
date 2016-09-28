import React from 'react';

class Item extends React.Component {

    render() {
    	const {details} = this.props
    	const style={
    		backgroundColor: 'white',
    		margin: '2px',
    		padding: '4px',
    		fontSize: '12px'
    	}
        return (
        	<div style={style}>
        		{details.text}
        	</div>
        )
    }
}

export default Item;
