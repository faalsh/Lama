import _ from 'lodash'

const initialState = {
      selectedBoard: 1,
      boardsPanelOpen: false,
      boards: [
        {
          boardId: 1,
          boardIndex: 1,
          boardTitle: 'my board',
          lists: [
            {
              listId: 1,
              listIndex: 1,
              listTitle: 'To Do',
              items: [
                {
                  itemId: 1,
                  itemIndex: 1,
                  itemText: 'test'
                }
              ]
            }
          ]
        },
        {
          boardId: 2,
          boardIndex: 3,
          boardTitle: 'my board 2',
          lists: [
            {
              listId: 1,
              listIndex: 1,
              listTitle: 'To Do 2',
              items: [
                {
                  itemId: 1,
                  itemIndex: 1,
                  itemText: 'test 2'
                }
              ]
            }
          ]
        }
      ]
    }


export default function reducer(state =initialState, action){


	switch(action.type){
    case 'TOGGLE_BOARDS_PANEL': {
      console.log(state.boardsPanelOpen)
      console.log(!state.boardsPanelOpen)

      return {...state, boardsPanelOpen:!state.boardsPanelOpen}
      break
    }
    case 'CREATE_ITEM':{
      let {boardId, listId, itemText} = action.payload
      let newState = _.cloneDeep(state)
      let items = newState.boards.find(board => {return board.boardId === boardId}).lists.find(list => {return list.listId === listId}).items
      items.push({itemText,itemId: _.random(10000), itemIndex: items.length+1})
      return newState
      break
    }
    case 'DELETE_ITEM': {
      let {boardId, listId, itemId} = action.payload
      let newState = _.cloneDeep(state)
      let items = newState.boards.find(board => {return board.boardId === boardId}).lists.find(list => {return list.listId === listId}).items
      let index = items.findIndex(item => item.itemId === itemId)
      items.splice(index,1)
      return newState
      break

    }
    case 'CREATE_LIST':{
      let {boardId, listTitle} = action.payload
      let newState = _.cloneDeep(state)
      const lists = newState.boards.find(board => {return board.boardId === boardId}).lists
      lists.push({listId: _.random(100000), listIndex:lists.length+1,listTitle, items:[]})
      return newState
      break
    }
    case 'DELETE_LIST': {
      let {boardId, listId} = action.payload
      let newState = _.cloneDeep(state)
      const lists = newState.boards.find(board => {return board.boardId === boardId}).lists
      let index = lists.findIndex(list => list.listId === listId)
      lists.splice(index,1)
      return newState
      break

    }
    case 'SELECT_BOARD': {
      return {...state, selectedBoard: action.payload.boardId, boardsPanelOpen:false}
    }
    case 'CREATE_BOARD': {
      let {boardTitle} = action.payload
      let newState = _.cloneDeep(state)
      const boardId = _.random(1000)
      newState.boards.push({boardId:boardId , boardIndex:newState.boards.length+1, boardTitle, lists:[]})
      newState.selectedBoard = boardId
      newState.boardsPanelOpen = false
      return newState
    }
    case 'DELETE_BOARD': {
      let {boardId} = action.payload
      let newState = _.cloneDeep(state)
      let index = newState.boards.findIndex(board => board.boardId === boardId)
      newState.boards.splice(index,1)
      return newState
    }
    case 'SWAP_LISTS': {
      let {boardId, dragListId, hoverListId} = action.payload
      let newState = _.cloneDeep(state)
      let board = _.find(newState.boards, (o) => o.boardId === boardId)
      let dragList = _.find(board.lists, (o) => o.listId === dragListId)
      let hoverList = _.find(board.lists, (o) => o.listId === hoverListId)
      let dragIndex = dragList.listIndex
      let hoverIndex = hoverList.listIndex
      dragList.listIndex = hoverIndex
      hoverList.listIndex = dragIndex
      return newState
    }
    case 'SWAP_ITEMS': {
      let {boardId, dragListId, dragItemId, hoverItemId} = action.payload
      let newState = _.cloneDeep(state)
      let board = _.find(newState.boards, (o) => o.boardId === boardId)
      let dragList = _.find(board.lists, (o) => o.listId === dragListId)
      let dragItem = _.find(dragList.items, (o) => o.itemId === dragItemId)
      let hoverItem = _.find(dragList.items, (o) => o.itemId === hoverItemId)
      let dragIndex = dragItem.itemIndex
      let hoverIndex = hoverItem.itemIndex
      dragItem.itemIndex = hoverIndex
      hoverItem.itemIndex = dragIndex
      // let hoverList = _.find(board.lists, (o) => o.listId === hoverListId)
      // let dragIndex = dragList.listIndex
      // let hoverIndex = hoverList.listIndex
      // dragList.listIndex = hoverIndex
      // hoverList.listIndex = dragIndex
      return newState
    }

    case 'MOVE_ITEM_TO_LIST': {
      let {boardId, dragListId, hoverListId, dragItemId} = action.payload
      let newState = _.cloneDeep(state)
      let board = _.find(newState.boards, (o) => o.boardId === boardId)
      let dragList = _.find(board.lists, (o) => o.listId === dragListId)
      let hoverList = _.find(board.lists, (o) => o.listId === hoverListId)
      let dragItem = _.find(dragList.items, (o) => o.itemId === dragItemId)
      dragItem.itemIndex = hoverList.lenth+1
      hoverList.items.push(dragItem)
      dragList.items = dragList.items.filter((o) => o.itemId !== dragItemId)

      return newState
    }

		default:
			return state;
	}
}
