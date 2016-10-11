import firebase from 'firebase'
const config = {
    apiKey: 'AIzaSyDJlntfXZ4b7KA17L94arhgcikRqd4WmNE',
    authDomain: 'lama-205e8.firebaseapp.com',
    databaseURL: 'https://lama-205e8.firebaseio.com',
    storageBucket: 'lama-205e8.appspot.com',
    messagingSenderId: '982449576403'
  };
  if(firebase.apps.length === 0){
    firebase.initializeApp(config);
  }
  const ref = firebase.database().ref('/')


export function fetchData() {
  return dispatch => {
    ref.on('value', (snapshot) => {
      dispatch({
        type:'FETCH_DATA',
        payload: snapshot.val()
      })
    })
  }
}

export const getConnectionStatus = () => {
  return dispatch => {
    ref.child('.info/connected').on('value', function(connectedSnap) {
      if (connectedSnap.val() === true) {
        dispatch({type: 'CONNECTION_STATUS', payload: true})
      } else {
        dispatch({type: 'CONNECTION_STATUS', payload: false})
      }
    })
  }
}

export const createBoard = (boardTitle) => {

  return dispatch => {
    ref.child('boards').once('value').then(snapshot => {
      const count=snapshot.numChildren()
      const key = ref.child('boards').push().key
      let updates = {}
      updates['/boards/'+key] = {boardIndex: count, boardTitle}
      updates['/selectedBoard'] = key
      return ref.update(updates)
    }).then(snapshot => dispatch({type: 'TOGGLE_BOARD_LIST'}))

  }
}

export const createList = (boardId,listTitle) => {
  return dispatch => {
    ref.child('boards').child(boardId).child('lists').once('value').then(snapshot => {
      const count = snapshot.numChildren()
      const list = {listIndex: count, listTitle}
      return ref.child('boards').child(boardId).child('lists').push(list)
    }).then(snapshot => dispatch({type:'default'}))
  }
}

export const createItem = (boardId,listId, itemText) => {
  return dispatch => {
    ref.child('boards').child(boardId).child('lists').child(listId).child('items').once('value').then(snapshot => {
      const count = snapshot.numChildren()
      return ref.child('boards').child(boardId)
        .child('lists').child(listId).child('items').push({itemIndex: count, itemText})
    }).then(snapshot => dispatch({type: 'default'}))
  }
}

export const deleteBoard = (boardId) => {
  return dispatch => {
    ref.child('boards/'+boardId).remove().then(snapshot => dispatch({type:'default'}))
  }
}

export const deleteList = (boardId, listId) => {
  return dispatch => {
    ref.child('boards').child(boardId).child('lists').child(listId).remove()
    updateListIndexes(boardId)
    dispatch({type: 'DELETE_LIST'})
  }
}
export const deleteItem = (boardId, listId, itemId) => {
  return dispatch => {
    ref.child('boards').child(boardId).child('lists')
      .child(listId).child('items').child(itemId).remove()
      .then(() => {
        updateItemIndexes(boardId, listId)
      })
      .then(snapshot => ({type: 'default'}))
  }
}

export const toggleBoardList = () => {
  return {type: 'TOGGLE_BOARD_LIST'}
}

export const selectBoard = (boardId) => {
  return ({type:'SELECT_BOARD', payload: boardId})
}

export const swapLists = (boardId, dragListId, hoverListId) => {
  return dispatch => {

     ref.child('boards').child(boardId).child('lists').once('value').then(snapshot => {
      const lists = snapshot.val()
      const dragListIndex = lists[dragListId].listIndex
      const hoverListIndex = lists[hoverListId].listIndex
      let updates = {}
      updates['boards/'+boardId+'/lists/'+dragListId+'/listIndex'] = hoverListIndex
      updates['boards/'+boardId+'/lists/'+hoverListId+'/listIndex'] = dragListIndex
      ref.update(updates)
      dispatch({type: 'SWAP_LISTS'})
     })
  }
}

export const moveItemToList = (boardId, dragListId, hoverListId, dragItemId) => {
  return dispatch => {
      ref.child('boards').child(boardId).child('lists').child(dragListId).child('items').child(dragItemId).once('value').then(snapshot => {
      let item = snapshot.val()
      if(item) {
        ref.child('boards').child(boardId).child('lists').child(dragListId).child('items').child(dragItemId).remove()
        item.itemIndex = 1000
        ref.child('boards').child(boardId).child('lists').child(hoverListId).child('items').child(dragItemId).set(item)
        updateItemIndexes(boardId, dragListId)
        updateItemIndexes(boardId, hoverListId)
      }
      dispatch({type: 'MOVE_ITEM_TO_LIST'})
    })
  }
}


export const swapItems = (boardId, hoverListId, dragItemId, hoverItemId) => {
  return dispatch => {
    ref.child('boards').child(boardId).child('lists').child(hoverListId).child('items')
      .once('value').then(snapshot => {
        const items = snapshot.val()
        const dragItemIndex = items[dragItemId].itemIndex
        const hoverItemIndex = items[hoverItemId].itemIndex
        let updates = {}
        updates['boards/'+boardId+'/lists/'+hoverListId+'/items/'+dragItemId+'/itemIndex'] = hoverItemIndex
        updates['boards/'+boardId+'/lists/'+hoverListId+'/items/'+hoverItemId+'/itemIndex'] = dragItemIndex
        ref.update(updates)
        dispatch({type:'SWAP_ITEMS'})
    })
  }
}

const updateItemIndexes = (boardId, listId) => {
  ref.child('boards').child(boardId).child('lists')
    .child(listId).child('items').once('value').then(snapshot => {
      let items = snapshot.val()
      const sortedItems = _.sortBy(_.map(items,(item,itemId) => {
        return {itemId, ...item}
      }), 'itemIndex')
      for(var i=0; i<sortedItems.length; i++) {
        items[sortedItems[i].itemId].itemIndex = i
      }
      if(items){
        ref.child('boards').child(boardId).child('lists')
          .child(listId).child('items').update(items)
      }
    })
}

const updateListIndexes = (boardId) => {
  ref.child('boards').child(boardId).child('lists').once('value')
    .then(snapshot => {
      let lists = snapshot.val()
      let i = 0;
      for(const listId in lists){
        lists[listId].listIndex = i
        i++
      }
      if(lists){
        ref.child('boards').child(boardId).child('lists').update(lists)
      }
    })
}
