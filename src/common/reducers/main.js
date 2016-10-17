import _ from 'lodash'

const initialState = {
	boardListOpen: false,
	selectedBoard: null,
	loggedIn: false,
	uid: null,
	loginError: null
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
		case 'LOGIN_STATUS': {
			return action.payload.loggedIn?{...state, loggedIn: action.payload.loggedIn, uid: action.payload.user.uid}:{...state, loggedIn: action.payload.loggedIn}
		}
		case 'LOGIN_ERROR': {
			return {...state, loginError: action.payload.errorMessage}
		}
		case 'LOGIN_SUCCESS':{
			return {...state, loginError: null}
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
    case 'CREATE_BOARD': {
    	return {...state, boardListOpen: false, selectedBoard: action.payload}
    }

		default:
			return state;
	}
}
