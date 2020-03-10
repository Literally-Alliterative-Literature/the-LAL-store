const defaultPages = 100

export default function(state = defaultPages, action) {
  switch (action.type) {
    case 'GET_COUNT':
      return Math.ceil(action.bookNumber / action.limit)
    default:
      return state
  }
}
