export default function reducer(state =

  [{
    id: 2,
    index: 2,
    title: 'To Do',
    items: [
      {
        id: 2,
        index:2,
        text: 'text 1'
      },
      {
        id: 1,
        index:2,
        text: 'text 2'
      },
      {
        id: 3,
        index:3,
        text: 'text 3'
      }
    ]
  },
  {
    id: 1,
    index:1,
    title: 'Doing',
    items: [
      {
        id: 1,
        index:1,
        text: 'text 11'
      },
      {
        id: 2,
        index:2,
        text: 'text 22'
      },
      {
        id: 3,
        index:3,
        text: 'text 33'
      }
    ]
  },
  {
    id: 3,
    index:3,
    title: 'Done',
    items: [
      {
        id: 1,
        index:1,
        text: 'text 111'
      },
      {
        id: 3,
        index:3,
        text: 'text 333'
      }
    ]
  },

  ]

, action){

	switch(action.type){
    case 'ADD_ITEM':
    return state.map(list => {
      console.log(list)
      if(list.id===2) {
        return list.items.map(item => {
          return {}
        })

      } else {
        return list
      }
    })
		default:
			return state;
	}
}
