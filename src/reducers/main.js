import _ from 'lodash'


export default function reducer(state ={}, action){
	switch(action.type){
    case 'FETCH_DATA': {
      return {...action.payload}
      break
    }

		default:
			return state;
	}
}
