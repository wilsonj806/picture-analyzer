const DomHelper = (function returnDOmEle() {
  let DomEle = '';
  return {
    setEle: function getDomEle(selectorString) {
      DomEle = document.querySelector(selectorString);
      console.log(this);
      return DomEle;
    },
    // below might not work, since iife gets dumped after it finishes
    // or it might since EventTarget.addEventListener is saved in a different object tree(according to speedy research and the way the spec describes it)
    getListener: function makeEventListener(element, eventString, callbackFn) {
      element.addEventListener(eventString, callbackFn);
      console.log(this);
      return this;
    },
  };
}());

export default DomHelper;
