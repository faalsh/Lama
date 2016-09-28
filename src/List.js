import React from 'react';
import Item from './Item'

class List extends React.Component {


    render() {
    	const {items,title} = this.props
    	const style = {
    		display: 'flex',
    		flexDirection: 'column',
    		padding: '5px',
    		margin: '5px',
    		width: '200px',
    		height: '100%',
    		backgroundColor: 'lightgrey',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
    	}
    	const titleStyle = {
    		fontWeight: 'bold',
    		fontSize: '14px',
    		marginBottom: '10px',
    		textAlign: 'center'
    	}

        return(
	        <div style={style}>
		        <div style={titleStyle}>{title}</div>
		        {items.map((item) => <Item key={item.id} details={item} />)}
	        </div>
        )

    }
}

export default List;
