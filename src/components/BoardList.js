import React from 'react';

class BoardList extends React.Component {

  handleClick(boardId){
      this.props.selectBoard(boardId)
  }
    render() {

      const panelStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin:'10px',
        width: '200px',
        backgroundColor: 'rgb(144, 185, 210)',
        padding: '20px'
      }
      const itemStyle = {
    		padding: '5px',
        width: '200px',
        margin: '5px',
        borderRadius: '3px',
    		backgroundColor: 'rgb(221, 221, 221)',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        cursor: 'pointer',
        padding: '10px'
    	}

      const selectedItemStyle = {
        fontWeight:'bold',
        padding: '5px',
        width: '200px',
        borderRadius: '3px',
    		backgroundColor: 'rgb(221, 221, 221)',
    		boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        cursor: 'pointer',
        padding: '10px'
      }
      const {boards, selectedBoard} = this.props
        return (
        	<div style={panelStyle}>
            {
              boards.map((board) => {
                const style = board.boardId ===  selectedBoard ? selectedItemStyle:itemStyle
                return <div key={board.boardId} style={style} onClick={this.handleClick.bind(this,board.boardId)}>
                {board.boardTitle}
                </div>

              })
            }
          </div>
        )
    }
}

export default BoardList;
