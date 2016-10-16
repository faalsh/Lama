import React from 'react';
import BoardList from './BoardList'

class Header extends React.Component {


  handleBoardsClick(){
    this.props.actions.toggleBoardList()
  }

    render() {
      const {main, actions} = this.props
    	const style={
    		backgroundColor: '#026AA7',
        height: '50px',
        width: '100%',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    	}
      const logoStyle = {
        marginLeft: '10px',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: '10px',
        width: '100%',
        fontFamily: '"Indie Flower",cursive'
      }
      const boardsButtonStyle = {
        cursor: 'pointer',
        backgroundColor: '#4c94be',
        marginLeft: '10px',
        width: '100px',
        height: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitUserSelect:'none',
        fontWeight: 'bold',
        zIndex:2
      }
      const signOutStyle = {
        display: 'flex',
        width: '100px',
        backgroundColor: 'black',
        cursor: 'pointer',
        padding: '5px',
        justifyContent: 'center',
        marginRight: '10px',

      }


        return (

        	<div style={style}>

          <div style={boardsButtonStyle} onClick={this.handleBoardsClick.bind(this)}>
            Boards
          </div>
          {
            main.boardListOpen? <BoardList boards={main.boards} selectedBoard={main.selectedBoard} actions={actions}/>:null
          }

            <div style={logoStyle}>Lama</div>
            <div onClick={()=> actions.signOut()} style={signOutStyle}>Sign Out</div>
        	</div>
        )
    }
}

export default Header;
