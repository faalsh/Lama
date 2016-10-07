import _ from 'lodash'

export default function reducer(state ={}, action){
	switch(action.type){
    case 'FETCH_DATA': {
      return {...state, ...action.payload}
      break
    }
    case 'CONNECTION_STATUS': {
    	return {...state, connected:action.payload}
    }

		default:
			return state;
	}
}
