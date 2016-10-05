import _ from 'lodash'

const initialState = {
  boards: {

  }
}


export default function reducer(state =initialState, action){
	switch(action.type){
    case 'FETCH_DATA': {
      return {...action.payload}
      break
    }
    // case 'TOGGLE_BOARDS_PANEL': {
    //   console.log(state,action)
    //   return {...state, boardsPanelOpen:!state.boardsPanelOpen}
    //   break
    // }
    // case 'CREATE_ITEM':{
    //   let {boardId, listId, itemText} = action.payload
    //   let newState = _.cloneDeep(state)
    //   let board = _.find(newState.boards, (board) => board.boardId === boardId)
    //   let items = _.find(board.lists, (list) => list.listId === listId).items
    //   items.push({itemText,itemId: _.random(10000), itemIndex: items.length+1})
    //   return newState
    //   break
    // }
    // case 'DELETE_ITEM': {
    //   let {boardId, listId, itemId} = action.payload
    //   let newState = _.cloneDeep(state)
    //   let board = _.find(newState.boards, (board) => board.boardId === boardId)
    //   let items = _.find(board.lists, (list) => list.listId === listId).items
    //   let index = _.findIndex(items, (item) => item.itemId === itemId)
    //   items.splice(index,1)
    //   return newState
    //   break

    // }
    // case 'CREATE_LIST':{
    //   let {boardId, listTitle} = action.payload
    //   let newState = _.cloneDeep(state)
    //   const lists = _.find(newState.boards, (board) => board.boardId === boardId).lists
    //   lists.push({listId: _.random(100000), listIndex:lists.length+1,listTitle, items:[]})
    //   return newState
    //   break
    // }
    // case 'DELETE_LIST': {
    //   let {boardId, listId} = action.payload
    //   let newState = _.cloneDeep(state)
    //   const lists = _.find(newState.boards, (board) => board.boardId === boardId).lists
    //   let index = _.findIndex(lists, (list) => list.listId === listId)
    //   lists.splice(index,1)
    //   return newState
    //   break

    // }
    // case 'SELECT_BOARD': {
    //   return {...state, selectedBoard: action.payload.boardId, boardsPanelOpen:false}
    // }
    // case 'CREATE_BOARD': {
    //   let {boardTitle} = action.payload
    //   let newState = _.cloneDeep(state)
    //   const boardId = _.random(1000)
    //   newState.boards.push({boardId:boardId , boardIndex:newState.boards.length+1, boardTitle, lists:[]})
    //   newState.selectedBoard = boardId
    //   newState.boardsPanelOpen = false
    //   return newState
    // }
    // case 'DELETE_BOARD': {
    //   let {boardId} = action.payload
    //   let newState = _.cloneDeep(state)
    //   let index = _.findIndex(newState.boards, (board) => board.boardId === boardId)
    //   newState.boards.splice(index,1)
    //   return newState
    // }
    // case 'SWAP_LISTS': {
    //   let {boardId, dragListId, hoverListId} = action.payload
    //   let newState = _.cloneDeep(state)
    //   let board = _.find(newState.boards, (o) => o.boardId === boardId)
    //   let dragList = _.find(board.lists, (o) => o.listId === dragListId)
    //   let hoverList = _.find(board.lists, (o) => o.listId === hoverListId)
    //   let dragIndex = dragList.listIndex
    //   let hoverIndex = hoverList.listIndex
    //   dragList.listIndex = hoverIndex
    //   hoverList.listIndex = dragIndex
    //   return newState
    // }
    // case 'SWAP_ITEMS': {
    //   let {boardId, dragListId, dragItemId, hoverItemId} = action.payload
    //   let newState = _.cloneDeep(state)
    //   let board = _.find(newState.boards, (o) => o.boardId === boardId)
    //   let dragList = _.find(board.lists, (o) => o.listId === dragListId)
    //   let dragItem = _.find(dragList.items, (o) => o.itemId === dragItemId)
    //   let hoverItem = _.find(dragList.items, (o) => o.itemId === hoverItemId)
    //   let dragIndex = dragItem.itemIndex
    //   let hoverIndex = hoverItem.itemIndex
    //   dragItem.itemIndex = hoverIndex
    //   hoverItem.itemIndex = dragIndex
    //   return newState
    // }

    // case 'MOVE_ITEM_TO_LIST': {
    //   let {boardId, dragListId, hoverListId, dragItemId} = action.payload
    //   let newState = _.cloneDeep(state)
    //   let board = _.find(newState.boards, (o) => o.boardId === boardId)
    //   let dragList = _.find(board.lists, (o) => o.listId === dragListId)
    //   let hoverList = _.find(board.lists, (o) => o.listId === hoverListId)
    //   let dragItem = _.find(dragList.items, (o) => o.itemId === dragItemId)
    //   if(dragItem) {
    //     dragItem.itemIndex = hoverList.items.length+1
    //     hoverList.items.push(dragItem)
    //     dragList.items = dragList.items.filter((o) => o.itemId !== dragItemId)
    //     return newState
    //   }
    // }

		default:
			return state;
	}
}
