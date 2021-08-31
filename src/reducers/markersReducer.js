const initialState = {
  markers: []
}
const markersReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return {
        ...state,
        markers: [...state.markers, action.marker]
      }
    default:
      return state
  }
}

export default markersReducers
