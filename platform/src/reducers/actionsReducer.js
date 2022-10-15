export default function actionsReducers (state = [], action) {
  switch (action.type) {
    case 'ADD_ACTION':
      return [...state, action.payload]

    case 'DELETE_ACTION':
      return state.filter(({ id }) => id !== action.payload)

    case 'UPDATE_ACTION':
      return state.map(action => {
        if (action.id === action.payload.id) {
          return action.payload
        } else {
          return action
        }
      })

    default:
      return state
  }
}
