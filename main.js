const canvas = document.querySelector('#canvas')
const fullScreenButton = document.querySelector('#fullScreen')
const startButton = document.querySelector('#start')

// navigator.getGamepads_ = navigator.getGamepads;
// navigator.getGamepads = function() {
//   var gamepadlist = navigator.getGamepads_();
//   var pads = [];
//   for (var i = 0; i < gamepadlist.length; i++) {
//     pads[i] = (gamepadlist[i] !== null ? gamepadlist[i] : undefined);
//   }
//   return pads;
// }
var emulator = new Emulator(
  document.querySelector("#canvas"),
  null,
  new DosBoxLoader(
    DosBoxLoader.emulatorJS("emulators/em-dosbox/dosbox-sync.js"),
    DosBoxLoader.locateAdditionalEmulatorJS(locateAdditionalFiles),
    // DosBoxLoader.nativeResolution(640, 480),
    DosBoxLoader.mountZip("c", DosBoxLoader.fetchFile("Game File","kq4.zip")),
    DosBoxLoader.startExe("sierra.exe"),
  )  
)

startButton.onclick = () => {
  emulator.start();
}

fullScreenButton.onclick = () => {
  canvas.requestFullscreen()
  // document.body.requestFullscreen()
  // canvas.style.margin="100px"
  // canvas.style.width="75%"
  // canvas.style.height="100%"
  
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