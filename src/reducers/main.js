import _ from 'lodash'

const initialState = {
	boards: {
		"boardId1": {
			boardIndex: 0,
			boardTitle: 'board 1',
			lists: {
				"listid1": {
					listIndex: 0,
					listTitle: 'list 1',
					items: {
						"itemid1": {
							itemIndex: 0,
							itemText: 'item 1'
						},
						"itemid2": {
							itemIndex: 1,
							itemText: 'item 2'
						}
					}
				},
				"listid2": {
					listIndex: 1,
					listTitle: 'list 2'
				}
			}
		}
	},
	selectedBoard: 'boardId1'
}
export default function reducer(state =initialState, action){
	switch(action.type){
    case 'FETCH_DATA': {
      return {...action.payload}
      break
    }

		default:
			return state;
	}
}
