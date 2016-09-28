import React from 'react';

class Header extends React.Component {

    render() {
    	const style={
    		backgroundColor: 'rgb(144, 185, 210)',
        height: '50px',
        width: '100%',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    	}
      const logoStyle = {
        marginLeft: '10px',
        fontSize: '24px',
        fontWeight: 'bold'
      }
        return (
        	<div style={style}>
            <div style={logoStyle}>Lama</div>
        	</div>
        )
    }
}

export default Header;
