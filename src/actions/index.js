export const addItem = (boardId, listId, itemText) => ({type:'ADD_ITEM', payload:{boardId,listId,itemText}})
export const deleteItem = (boardId, listId, itemId) => ({type:'DELETE_ITEM', payload:{boardId,listId,itemId}})
export const createList = (boardId,listTitle) => ({type:'CREATE_LIST', payload:{boardId,listTitle}})
export const selectBoard = (boardId) => ({type:'SELECT_BOARD', payload:{boardId}})
export const createBoard = (boardTitle) => ({type:'CREATE_BOARD', payload:{boardTitle}})
