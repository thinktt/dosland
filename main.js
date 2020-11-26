const canvas = document.querySelector('#canvas')
const fullScreenButton = document.querySelector('#fullScreen')
const startButton = document.querySelector('#start')
const screenTitle = document.querySelector('#title')
const soundOn = document.querySelector('#sound-on')
const soundOff = document.querySelector('#sound-off')
const screen = document.querySelector('.screen')
const everything =  document.querySelector('body')

var emulator = new Emulator(
  document.querySelector("#canvas"),
  null,
  new DosBoxLoader(
    DosBoxLoader.emulatorJS("emulators/em-dosbox/dosbox-sync.js"),
    DosBoxLoader.locateAdditionalEmulatorJS(locateAdditionalFiles),
    DosBoxLoader.nativeResolution(640, 480),
    DosBoxLoader.mountZip("c", DosBoxLoader.fetchFile("Game File","kq4a.zip")),
    DosBoxLoader.startExe("sierra.exe"),
  )  
)

soundOff.onclick = () => {
  console.log('Trying to mute')
  everything.muted = true; 
}

soundOn.onclick = () => {
  console.log('Trying to unmute')
  everything.muted = false; 
}


startButton.onclick = () => {
  screenTitle.classList.add('fade-out')
  screen.classList.remove('border')

  emulator.start({ hasCustomCSS: true })
}

fullScreenButton.onclick = () => {
  canvas.requestFullscreen()
}



canvas.addEventListener("keydown",function(e){
  console.log('esc was pressed over canvas')
  var charCode = e.charCode || e.keyCode || e.which
  if (charCode == 27){
      e.preventDefault()
      return false
  }
})


function locateAdditionalFiles(filename) {
  if (filename === "dosbox.html.mem") {
    return "emulators/em-dosbox/dosbox-sync.mem"
  }
  return "emulators/em-dosbox/"+ filename
}