const canvas = document.querySelector('#canvas')
const fscreenButton = document.querySelector('#fullScreen')

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
  ),
  () => {
    console.log('Yo')
  }  
)

emulator.start();
fscreenButton.onclick = () => {
  canvas.requestFullscreen()
  // emulator.requestFullScreen()
  // console.log('Howdy')
  canvas.style.width = "50%"
  // canvas.style.height = "100%"
}

console.log("Howdy")






function locateAdditionalFiles(filename) {
  if (filename === "dosbox.html.mem") {
    return "emulators/em-dosbox/dosbox-sync.mem";
  }
  return "emulators/em-dosbox/"+ filename;
}