function preInit() {
    setupDom(), Enabler.isInitialized() ? init() : Enabler.addEventListener(studio.events.StudioEvent.INIT, init)
}

function setupDom() {
    creative.dom = {}, creative.dom.mainContainer = document.getElementById("main-container"), creative.dom.exit = document.getElementById("exit")
}

function init() {
    addListeners(), Enabler.isPageLoaded() ? show() : Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, show)
}

function addListeners() {
    creative.dom.exit.addEventListener("click", exitClickHandler)
}

function show() {
    creative.dom.exit.style.display = "block"
}

function stopAnimation() {
    mainMc.seek(15)
}

// -------------------------------------------------------------------------------
var creative = {};
window.addEventListener("load", preInit);
var mainMc = new TimelineLite;

mainMc
  .add("intro")
  .to("#lollies", 2.1, { x: "-115px", ease: Quart.easeOut}, "intro")
  .to("#car", 2.4, { x: "218px", ease: Back.easeOut}, "intro")
  .to("#wheel-left", 2.4, { rotation: 1080, ease: Back.easeOut}, "intro")
  .to("#wheel-right", 2.4, { rotation: 1080, ease: Back.easeOut}, "intro")
  .to("#car-body", .2, { rotation: 0.5, ease: Quart.easeOut}, "-=3.2")
  .to("#car-body", .2, { rotation: 0, ease: Quart.easeOut}, "-=0.95")

  .to("#text1", .3, { opacity: 1, ease: Sine.easeOut}, "-=0.7")

  .to("#text1", .2, { autoAlpha: 0, ease: Sine.easeOut}, "+=3.4")
  .to("#cta", .3, { opacity: 1, ease: Sine.easeOut}, "+=.2")


function exitClickHandler() {
  stopAnimation(), Enabler.exit("BackgroundExit")
}
