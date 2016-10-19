import _ from 'lodash'

const initialState = {
	boardListOpen: false,
	selectedBoard: null,
	loggedIn: false,
	uid: null,
	error: null,
	emailVerified: false
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
			return action.payload.loggedIn?{...state, loggedIn: action.payload.loggedIn, uid: action.payload.user.uid, emailVerified: action.payload.user.emailVerified}:{...state, loggedIn: action.payload.loggedIn}
		}
		case 'LOGIN_ERROR': {
			return {...state, error: action.payload.errorMessage}
		}

		case 'REGISTER_ERROR': {
			return {...state, error: action.payload.errorMessage}
		}
		case 'DISMISS_ERROR': {
			return {...state, error:null}
		}
		case 'PASSWORD_RESET_ERROR': {
			return {...state, error: action.payload.errorMessage}
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
