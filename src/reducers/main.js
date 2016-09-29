import _ from 'lodash'

const initialState = {
      selectedBoard: 1,
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
    case 'ADD_ITEM':{
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
      let index = items.find(item => item.itemId === itemId)
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
    case 'SELECT_BOARD': {
      return {...state, selectedBoard: action.payload.boardId}
    }
    case 'CREATE_BOARD': {
      let {boardTitle} = action.payload
      let newState = _.cloneDeep(state)
      newState.boards.push({boardId: _.random(1000), boardIndex:newState.boards.length+1, boardTitle, lists:[]})
      return newState
    }
		default:
			return state;
	}
}
