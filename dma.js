const canvas = document.querySelector('#canvas')
const fullScreenButton = document.querySelector('#fullScreen')
const startButton = document.querySelector('#start')

var emulator = new Emulator(
  document.querySelector("#canvas"),
  null,
  new DosBoxLoader(
    DosBoxLoader.emulatorJS("emulators/em-dosbox/dosbox-sync.js"),
    DosBoxLoader.locateAdditionalEmulatorJS(locateAdditionalFiles),
    DosBoxLoader.nativeResolution(640, 420),
    DosBoxLoader.mountZip("c", DosBoxLoader.fetchFile("Game File","qb.zip")),
    DosBoxLoader.startExe("dma.exe"),
  )  
)

startButton.onclick = () => {
  emulator.start({ hasCustomCSS: true });
}

fullScreenButton.onclick = () => {
  canvas.requestFullscreen()
}

canvas.addEventListener("keydown",function(e){
  console.log('esc was pressed over canvas')
  var charCode = e.charCode || e.keyCode || e.which;
  if (charCode == 27){
      e.preventDefault()
      return false;
  }
});


function locateAdditionalFiles(filename) {
  if (filename === "dosbox.html.mem") {
    return "emulators/em-dosbox/dosbox-sync.mem";
  }
  return "emulators/em-dosbox/"+ filename;
}