import _ from 'lodash'

const initialState = {
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
        }
      ]
    }


export default function reducer(state =initialState, action){
      
      
	switch(action.type){
    case 'ADD_ITEM':{
      let {boardId, listId, item} = action.payload
      let newState = _.cloneDeep(state)
      let items = newState.boards.find(board => {return board.boardId === boardId}).lists.find(list => {return list.listId === listId}).items
      items.push({...item,itemIndex: items.length+1})
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
		default:
			return state;
	}
}
