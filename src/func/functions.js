export const getQuery = () => {
  let query = localStorage.getItem('query')
  if (query) {
    return JSON.parse(localStorage.getItem('query'))
  } else {
    return ''
  }
}
export const getPage = () => {
  let page = localStorage.getItem('page')
  if (page) {
    return JSON.parse(localStorage.getItem('page'))
  } else {
    return ''
  }
}
