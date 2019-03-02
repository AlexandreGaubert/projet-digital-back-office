export function update(arr, updated) {
  return arr.map(item => {
    if (item._id === updated._id) {
      return {...item, ...updated};
    }
    return item
  })
}
