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


export const createBoard = (boardTitle) => {

  return dispatch => {
    ref.child('boards').once('value').then(snapshot => {
      const count=snapshot.numChildren()
      const key = ref.child('boards').push().key
      let updates = {}
      updates['/boards/'+key] = {boardIndex: count, boardTitle}
      updates['/selectedBoard'] = key
      return ref.update(updates)
    }).then(snapshot => dispatch({type: 'default'}))

  }
}

export const createList = (boardId,listTitle) => {
  return dispatch => {
    ref.child('lists').child(boardId).once('value').then(snapshot => {
      const count = snapshot.numChildren()
      const key = ref.child('lists').child(boardId).push().key
      let updates = {}
      updates['/lists/'+boardId+'/'+key] = {listIndex: count, listTitle}
      return ref.update(updates)
    }).then(snapshot => dispatch({type:'default'}))
  }
}

export const createItem = (listId, itemText) => {
  return dispatch => {
    ref.child('items').child(listId).once('value').then(snapshot => {
      const count = snapshot.numChildren()
      return ref.child('items').child(listId).push({itemIndex: count, itemText})
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
    ref.child('lists/'+boardId+'/'+listId).remove().then(snapshot => ({type: 'default'}))
  }
}
export const deleteItem = (listId, itemId) => {
  return dispatch => {
    ref.child('items/'+listId+'/'+itemId).remove().then(snapshot => ({type: 'default'}))
  }
}

export const selectBoard = (key) => {
  return dispatch => {
    ref.update({'selectedBoard':key}).then(snapshot => dispatch({type: 'default'}))
  }
}

export const swapLists = (boardId, dragListId, hoverListId, dragListIndex, hoverListIndex) => {
// console.log(hoverListId);
  return dispatch => {

    //  ref.child('lists/'+boardId+'/'+dragListId).once('value').then(snapshot =>{
    //    let newList = snapshot.val()
    //     newList.listIndex = hoverListIndex
    //     ref.child('lists/'+boardId+'/'+dragListId).update(newList)
    //  })
     //
    //  ref.child('lists/'+boardId+'/'+hoverListId).once('value').then(snapshot =>{
    //    let newList = snapshot.val()
    //    newList.listIndex = dragListIndex
    //     ref.child('lists/'+boardId+'/'+hoverListId).update(newList)
    //  })
    let updates = {}
    updates['lists/'+boardId+'/'+dragListId+'/listIndex'] = hoverListIndex
    updates['lists/'+boardId+'/'+hoverListId+'/listIndex'] = dragListIndex
    ref.update(updates)
    // console.log(updates);
     dispatch({type: 'default'})

  }
}
export const moveItemToList = (boardId, dragListId, hoverListId, dragItemId) => ({type:'MOVE_ITEM_TO_LIST', payload:{boardId, dragListId, hoverListId, dragItemId}})
export const swapItems = (boardId, dragListId, dragItemId, hoverItemId) => ({type:'SWAP_ITEMS', payload:{boardId, dragListId, dragItemId, hoverItemId}})
