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


export function checkLoginStatus(){
  return dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        dispatch({type:'LOGIN_STATUS', payload:{loggedIn: true, user:user}})
      } else {
        dispatch({type:'LOGIN_STATUS', payload:{loggedIn: false}})      }
    })
  }
}


export function signIn() {
  var provider = new firebase.auth.GithubAuthProvider()
  return dispatch => {
    firebase.auth().signInWithPopup(provider).then(result => {
      const token = result.credential.accessToken
      const user = result.user
      dispatch({type: 'LOGIN_SUCCESS', payload: user.displayName})
    }).catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      // const email = error.email
      // const credential = error.credential
      // console.log(errorMessage);
      dispatch({type: 'LOGIN_ERROR', payload: {errorCode, errorMessage}})

    })
  }

}

export function signOut(){
  return dispatch => {
    firebase.auth().signOut().then(() => {
     dispatch({type: 'SIGNOUT_SUCCESS'})
   }, () => {
     dispatch({type: 'SIGNOUT_ERROR'})
   })
  }
}
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
      // updates['/selectedBoard'] = key
      ref.update(updates)
      dispatch({type: 'CREATE_BOARD', payload: key})
    })

  }
}

export const createList = (boardId,listTitle) => {
  return dispatch => {
    ref.child('boards').child(boardId).child('lists').once('value').then(snapshot => {
      const count = snapshot.numChildren()
      const list = {listIndex: count, listTitle}
      return ref.child('boards').child(boardId).child('lists').push(list)
    }).then(snapshot => dispatch({type:'CREATE_LIST'}))
  }
}

export const createItem = (boardId,listId, itemText) => {
  return dispatch => {
    ref.child('boards').child(boardId).child('lists').child(listId).child('items').once('value').then(snapshot => {
      const count = snapshot.numChildren()
      return ref.child('boards').child(boardId)
        .child('lists').child(listId).child('items').push({itemIndex: count, itemText})
    }).then(snapshot => dispatch({type: 'CREATE_ITEM'}))
  }
}

export const deleteBoard = (boardId) => {
  return dispatch => {
    ref.child('boards/'+boardId).remove().then(snapshot => dispatch({type:'DELETE_BOARD'}))
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
      .then(snapshot => ({type: 'DELETE_ITEM'}))
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

export function updateList(boardId, listId, listTitle){
  ref.child('boards').child(boardId).child('lists').child(listId).child('listTitle').set(listTitle)
  return {type:'UPDATE_LIST'}
}

export function updateItem(boardId, listId, itemId, itemText) {
  ref.child('boards').child(boardId).child('lists').child(listId).child('items')
    .child(itemId).child('itemText').set(itemText)
    return {type: 'UPDATE_ITEM'}
}

export function swapBoards(dragBoardId, hoverBoardId) {

  ref.child('boards').once('value').then(snapshot => {
    const boards = snapshot.val()
    const dragIndex = boards[dragBoardId].boardIndex
    const hoverIndex = boards[hoverBoardId].boardIndex

    let updates = {}
    updates['boards/'+dragBoardId+'/boardIndex'] = hoverIndex
    updates['boards/'+hoverBoardId+'/boardIndex'] = dragIndex
    ref.update(updates)

  })
  return {type:'SWAP_BOARDS'}
}

// TODO ......

export function updateBoard(boardId, boardTitle) {
  ref.child('boards').child(boardId).child('boardTitle').set(boardTitle)
  return {type: 'UPDATE_BOARD'}
}

export function moveListToBoard(fromBoardId, toBoardId, listId) {

}
