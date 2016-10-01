import React from 'react';
import BoardList from './BoardList'

class Header extends React.Component {

  handleBoardsClick(){
    const {toggleBoardsPanel} = this.props.actions
    toggleBoardsPanel()
  }

    render() {
      const {main, actions} = this.props
    	const style={
    		backgroundColor: 'rgb(144, 185, 210)',
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
        textAlign: 'right',
        marginRight: '10px',
        width: '100%',
      }
      const boardsButtonStyle = {
        cursor: 'pointer',
        backgroundColor: 'rgb(65, 89, 125)',
        marginLeft: '10px',
        width: '100px',
        height: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitUserSelect:'none'
      }
        return (
        	<div style={style}>
          <div style={boardsButtonStyle} onClick={this.handleBoardsClick.bind(this)}>
            Boards
          </div>
          {
            main.boardsPanelOpen? <BoardList boards={main.boards} selectedBoard={main.selectedBoard} actions={actions}/>:null
          }

            <div style={logoStyle}>Lama</div>
        	</div>
        )
    }
}

export default Header;
