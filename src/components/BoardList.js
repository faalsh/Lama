import React from 'react';
import CreateBoard from './CreateBoard'

class BoardList extends React.Component {

  handleClick(boardId){
      this.props.actions.selectBoard(boardId)
  }
  handleDelete(boardId) {
    this.props.actions.deleteBoard(boardId)
  }
    render() {

      const panelStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin:'10px',
        width: '150px',
        backgroundColor: 'rgb(65, 89, 125)',
        padding: '20px',
        position: 'absolute',
        top: '30px',
        left: '0px', 
        zIndex: '1'

      }
      const itemStyle = {
        position: 'relative',
    		padding: '5px',
        width: '150px',
        margin: '5px',
        borderRadius: '3px',
    		backgroundColor: 'rgb(144, 185, 210)',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        cursor: 'pointer',
        padding: '10px'
    	}

      const selectedItemStyle = {
        position: 'relative',
        fontWeight:'bold',
        padding: '5px',
        width: '150px',
        borderRadius: '3px',
    		backgroundColor: 'rgb(144, 185, 210)',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        cursor: 'pointer',
        padding: '10px'
      }
      const deleteStyle = {
        position: 'absolute',
        top: '11px',
        right: '5px',
        width: '15px',

      }
      const {boards, selectedBoard} = this.props
        return (
        	<div style={panelStyle}>
            {
              boards.map((board) => {
                const style = board.boardId ===  selectedBoard ? selectedItemStyle:itemStyle
                return <div key={board.boardId} style={style} onClick={this.handleClick.bind(this,board.boardId)}>
                {board.boardTitle}
                  <div style={deleteStyle} onClick={this.handleDelete.bind(this, board.boardId)}>×</div>
                </div>

              })
            }
            <CreateBoard />
          </div>
        )
    }
}

export default BoardList;
