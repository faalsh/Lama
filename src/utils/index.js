import _ from 'lodash'

export function sort(list, key) {
	return _.sortBy(_.map(list,(item,itemId) => {
	  return {id:itemId, ...item}
	}), key)	
} 