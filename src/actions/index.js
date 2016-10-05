import firebase from 'firebase'
var config = {
    apiKey: 'AIzaSyDJlntfXZ4b7KA17L94arhgcikRqd4WmNE',
    authDomain: 'lama-205e8.firebaseapp.com',
    databaseURL: 'https://lama-205e8.firebaseio.com',
    storageBucket: 'lama-205e8.appspot.com',
    messagingSenderId: '982449576403'
  };
  firebase.initializeApp(config);
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

export const createItem = (boardId, listId, itemText) => ({type:'CREATE_ITEM', payload:{boardId,listId,itemText}})
export const deleteItem = (boardId, listId, itemId) => ({type:'DELETE_ITEM', payload:{boardId,listId,itemId}})
export const createList = (boardId,listTitle) => ({type:'CREATE_LIST', payload:{boardId,listTitle}})
export const deleteList = (boardId, listId) => ({type:'DELETE_LIST', payload:{boardId,listId}})
export const selectBoard = (key) => {
  return dispatch => {
    ref.update({'selectedBoard':key}).then(snapshot => dispatch({type: 'default'}))
  }
}
export const createBoard = (boardTitle) => {
  
  return dispatch => {
    ref.child('boards').once('value').then(snapshot => {
      let count=snapshot.numChildren()
      const key = ref.child('boards').push().key
      let updates = {}
      updates['/boards/'+key] = {boardIndex: count, boardTitle}
      updates['/selectedBoard'] = key
      return ref.update(updates)
    }).then(snapshot => dispatch({type: 'default'}))

  } 
}
export const deleteBoard = (key) => {
  return dispatch => {
    ref.child('boards/'+key).remove().then(snapshot => dispatch({type:'default'}))
  }
}
export const swapLists = (boardId, dragListId, hoverListId) => ({type:'SWAP_LISTS', payload:{boardId, dragListId, hoverListId}})
export const moveItemToList = (boardId, dragListId, hoverListId, dragItemId) => ({type:'MOVE_ITEM_TO_LIST', payload:{boardId, dragListId, hoverListId, dragItemId}})
export const swapItems = (boardId, dragListId, dragItemId, hoverItemId) => ({type:'SWAP_ITEMS', payload:{boardId, dragListId, dragItemId, hoverItemId}})


// export const createItem = (boardId, listId, itemText) => ({type:'CREATE_ITEM', payload:{boardId,listId,itemText}})
// export const deleteItem = (boardId, listId, itemId) => ({type:'DELETE_ITEM', payload:{boardId,listId,itemId}})
// export const createList = (boardId,listTitle) => ({type:'CREATE_LIST', payload:{boardId,listTitle}})
// export const deleteList = (boardId, listId) => ({type:'DELETE_LIST', payload:{boardId,listId}})
// export const selectBoard = (boardId) => ({type:'SELECT_BOARD', payload:{boardId}})
// export const createBoard = (boardTitle) => ({type:'CREATE_BOARD', payload:{boardTitle}})
// export const deleteBoard = (boardId) => ({type:'DELETE_BOARD', payload:{boardId}})
// export const toggleBoardsPanel = () => ({type:'TOGGLE_BOARDS_PANEL'})
// export const swapLists = (boardId, dragListId, hoverListId) => ({type:'SWAP_LISTS', payload:{boardId, dragListId, hoverListId}})
// export const moveItemToList = (boardId, dragListId, hoverListId, dragItemId) => ({type:'MOVE_ITEM_TO_LIST', payload:{boardId, dragListId, hoverListId, dragItemId}})
// export const swapItems = (boardId, dragListId, dragItemId, hoverItemId) => ({type:'SWAP_ITEMS', payload:{boardId, dragListId, dragItemId, hoverItemId}})
