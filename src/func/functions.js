export const saveLocal = (key) => {
  let isKeyExist = localStorage.getItem(`${key}`)
  if (isKeyExist) {
    return JSON.parse(localStorage.getItem(`${key}`))
  } else {
    return ''
  }
}
