import _ from 'lodash'

const initialState = {
	boardListOpen: false,
	selectedBoard: null
}
export default function reducer(state =initialState, action){
	switch(action.type){
    case 'FETCH_DATA': {
			let selectedBoard = state.selectedBoard
			if(!selectedBoard) {
				for(var boardId in action.payload.boards) break;
				selectedBoard = boardId
			}
      return {...state, ...action.payload, selectedBoard}
    }
		case 'SELECT_BOARD': {
			return {...state, selectedBoard: action.payload, boardListOpen: false}
		}
    case 'CONNECTION_STATUS': {
    	return {...state, connected:action.payload}
    }
    case 'TOGGLE_BOARD_LIST': {
    	return {...state, boardListOpen: !state.boardListOpen}
    }

		default:
			return state;
	}
}