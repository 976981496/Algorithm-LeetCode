<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Web Audio API examples: MediaStreamAudioDestination()</title>
  </head>
  <body>
    <h1>Web Audio API examples: MediaStreamAudioDestination()</h1>

    <p>Encoding a pure sine wave to an Opus file</p>
    <p><button>Make sine wave</button></p>

    <audio controls></audio>
    <script>
      const b = document.querySelector('button')
      let clicked = false
      let chunks = []
      let ac
      let osc
      let dest
      let mediaRecorder

      function init() {
        ac = new AudioContext()
        osc = new OscillatorNode(ac)
        dest = new MediaStreamAudioDestinationNode(ac)
        mediaRecorder = new MediaRecorder(dest.stream)
        osc.connect(dest)

        mediaRecorder.ondataavailable = (evt) => {
          // push each chunk (blobs) in an array
          chunks.push(evt.data)
        }

        mediaRecorder.onstop = (evt) => {
          // Make blob out of our blobs, and open it.
          const blob = new Blob(chunks, {
            type: 'audio/wav'
          })
          document.querySelector('audio').src = URL.createObjectURL(blob)
        }
      }

      b.addEventListener('click', (e) => {
        if (!ac) {
          init()
        }

        if (!clicked) {
          mediaRecorder.start()
          osc.start(0)
          e.target.textContent = 'Stop recording'
          clicked = true
        } else {
          mediaRecorder.requestData()
          mediaRecorder.stop()
          osc.stop(0)
          e.target.disabled = true
        }
      })
    </script>
  </body>
</html>
