import React from 'react';

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
        backgroundColor: 'rgb(144, 185, 210)',
        padding: '20px'
      }
      const itemStyle = {
        position: 'relative',
    		padding: '5px',
        width: '150px',
        margin: '5px',
        borderRadius: '3px',
    		backgroundColor: 'rgb(221, 221, 221)',
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
    		backgroundColor: 'rgb(221, 221, 221)',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        cursor: 'pointer',
        padding: '10px'
      }
      const deleteStyle = {
        position: 'absolute',
        top: '7.5px',
        left: '155px'

      }
      const {boards, selectedBoard} = this.props
        return (
        	<div style={panelStyle}>
            {
              boards.map((board) => {
                const style = board.boardId ===  selectedBoard ? selectedItemStyle:itemStyle
                return <div key={board.boardId} style={style} onClick={this.handleClick.bind(this,board.boardId)}>
                {board.boardTitle}
                  <div style={deleteStyle} onClick={this.handleDelete.bind(this, board.boardId)}>x</div>
                </div>

              })
            }
          </div>
        )
    }
}

export default BoardList;
