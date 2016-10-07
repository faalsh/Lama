import _ from 'lodash'

const initialState = {
	boardListOpen: false
}
export default function reducer(state =initialState, action){
	switch(action.type){
    case 'FETCH_DATA': {
      return {...state, ...action.payload}
      break
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
