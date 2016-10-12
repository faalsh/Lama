import React from 'react';
import CreateBoard from './CreateBoard'
import _ from 'lodash'

class BoardList extends React.Component {

  handleSelectBoard(key){
      this.props.actions.selectBoard(key)
  }
  handleDelete(key) {
     this.props.actions.deleteBoard(key)
  }
  handleCloseList(){
    this.props.actions.toggleBoardList()
  }

    render() {

      const panelStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin:'10px',
        width: '150px',
        backgroundColor: '#4c94be',
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
    		backgroundColor: '#026AA7',
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
    		backgroundColor: '#026AA7',
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

      const closerStyle = {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
         zIndex: 1,
         backgroundColor: 'black',
         opacity: '0.5'
      }

      const {boards, selectedBoard} = this.props
        return (
          <div>
            <div style={closerStyle} onClick={this.handleCloseList.bind(this)}></div>
          	<div style={panelStyle}>

              {
                  _.map(boards,(board,key) => {
                  const style = key===selectedBoard ? selectedItemStyle:itemStyle
                  return (
                    <div key={key} style={style} onClick={this.handleSelectBoard.bind(this,key)}>
                      {board.boardTitle}
                      <div style={deleteStyle} onClick={this.handleDelete.bind(this,key)}>×</div>
                    </div>
                  )
                })
              }
              <CreateBoard />
            </div>
          </div>
        )
    }
}

export default BoardList;
