import React from 'react';
import BoardList from './BoardList'
import MemberList from './MemberList'

class Header extends React.Component {


  handleBoardsClick(){
    this.props.actions.toggleBoardList()
  }
  handleMembersClick(){
    this.props.actions.toggleMemberList()
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
      const headerButtonStyle = {
        cursor: 'pointer',
        backgroundColor: '#4c94be',
        marginLeft: '10px',
        width: '100px',
        height: '30px',
        paddingLeft: '5px',
        paddingRight: '5px',
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

      const BoardsButton = () => {
        return (
          <div style={headerButtonStyle} onClick={this.handleBoardsClick.bind(this)}>
            Boards
          </div>
        )
      }

      const MembersButton = () => {
        return (
          <div style={headerButtonStyle} onClick={this.handleMembersClick.bind(this)}>
            Members
          </div>
        )
      }


      const Logo = () => {
        return (
          <div style={logoStyle}>Lama</div>
        )
      }

      const SignOut = () => {
        return (
          <div onClick={()=> actions.signOut()} style={signOutStyle}>Sign Out</div>
        )
      }
        return (

        	<div style={style}>
            <BoardsButton />
            <MembersButton />
            {
              main.boardListOpen? <BoardList boards={main.boards}
                selectedBoard={main.selectedBoard}
                actions={actions}/>:null
            }
            {
              main.memberListOpen? <MemberList members={main.boards[main.selectedBoard].members}
                actions={actions}
                boardId={main.selectedBoard}/>:null
            }
            <Logo />
            <SignOut />
        	</div>
        )
    }
}

export default Header;
