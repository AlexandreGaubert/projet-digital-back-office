export function APICall(name, socket, data = null) {
  console.log(data);
  return new Promise((resolve, reject) => {
    socket.emit(name, data);
    socket.on(name + "_RESPONSE", (response) => {
      if (response.code === 200)
        return resolve(response)
      else return reject(response)
      socket.removeListener(name + '_RESPONSE')
    })
  })
}
