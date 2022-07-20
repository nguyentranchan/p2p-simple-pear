const Peer = require("simple-peer")
const wrtc = require("wrtc")
;
const peer = new Peer({
    initiator: location.hash === '#init',
    wrtc: wrtc,
    trickle: false,
    objectMode: true
})

peer.on('signal', function (data) {
  console.log('signal new peer', data)
  document.getElementById('yourId').value = JSON.stringify(data)
})

document.getElementById('connect').addEventListener('click', function () {
  const otherId = JSON.parse(document.getElementById('otherId').value)
  peer.signal(otherId)
})


document.getElementById('send').addEventListener('click', function () {
  const yourMessage = document.getElementById('yourMessage').value
  peer.send(yourMessage)
})

peer.on('data', function (data) {
  console.log('data')
  document.getElementById('message').textContent += data + '\n'
})
