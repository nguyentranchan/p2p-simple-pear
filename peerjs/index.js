const { Peer } = require("peerjs")
const peer = new Peer()

console.log(peer)
var client = undefined

peer.on('open', (id) => {
  console.log(`My id: ${id}`)
  document.getElementById('yourId').value = id
})

peer.on("connection",  (conn) => {
  document.getElementById('otherId').value = conn.peer
  if (client !== undefined) {
    client.close()
  }
  client = conn
  client.on('data', (data) => {
    document.getElementById('message').textContent += data + '\n'
  })
})

document.getElementById('connect').addEventListener('click', function () {
  if (client !== undefined) {
    client.close()
  }
  client = peer.connect(document.getElementById('otherId').value)
  client.on('data', (data) => {
    document.getElementById('message').textContent += data + '\n'
  })
})




document.getElementById('send').addEventListener('click', function () {
  if (client !== undefined) {
    const msg = document.getElementById('yourMessage').value
    if(msg.length > 0) {
       client.send(msg)
       document.getElementById('yourMessage').value = ''
     }
  }
})




