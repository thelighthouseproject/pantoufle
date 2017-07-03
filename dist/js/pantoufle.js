console.log("Hello o O O O !");

// Events
document.onkeypress = function (oPEvt) {
  var oEvent = oPEvt || window.event;
  switch (String.fromCharCode(oEvent.charCode)) {
    case 'w':
      oEvent.preventDefault();
      document.getElementsByTagName('body').item(0).classList.toggle("preview");
      break;
  }
};
