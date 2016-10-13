import React from 'react';
import CreateBoard from './CreateBoard'
import _ from 'lodash'
import BoardListItem from './BoardListItem'
import {sort} from '../../common/utils'

class BoardList extends React.Component {

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

      const {boards, selectedBoard, actions} = this.props

      const sortedBoards = sort(boards,'boardIndex')

        return (
          <div>
            <div style={closerStyle} onClick={this.handleCloseList.bind(this)}></div>
          	<div style={panelStyle}>

              {
                  _.map(sortedBoards, board => {
                  return (
                    <BoardListItem key={board.id} selectedBoard={selectedBoard}
                        boardId={board.id} boardTitle={board.boardTitle}  actions={actions}/>
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
