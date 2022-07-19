const Peer = require("simple-peer")
const pear = new Peer({
    initiator: location.hash === '#init',
    trickle: false
}
)

pear.on('signal', function (data) {
  document.getElementById('yourId').value = JSON.stringify(data)
})

document.getElementById('connect').addEventListener('click', function () {
  const otherId = JSON.parse(document.getElementById('otherId').value)
  pear.signal(otherId)
})


document.getElementById('send').addEventListener('click', function () {
  const yourMessage = document.getElementById('yourMessage').value
  pear.send(yourMessage)
})

pear.on('data', function (data) {
  document.getElementById('message').textContent += data + '\n'
})
