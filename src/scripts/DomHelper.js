const DomHelper = (function returnDOMEle() {
  let DomEle = '';
  return {
    setEle: function getDomEle(selectorString, parentEle = document) {
      DomEle = parentEle.querySelector(selectorString);
      return DomEle;
    },
  };
}());

export default DomHelper;
