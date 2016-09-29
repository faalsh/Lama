export const addItem = (boardId, listId, item) => ({type:'ADD_ITEM', payload:{boardId,listId,item}})
export const createList = (boardId,listTitle) => ({type:'CREATE_LIST', payload:{boardId,listTitle}})

