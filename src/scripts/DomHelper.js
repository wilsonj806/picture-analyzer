const DomHelper = (function returnDOmEle() {
  let DomEle = '';
  return {
    setEle: function getDomEle(selectorString) {
      DomEle = document.querySelector(selectorString);
      return DomEle;
    },
  };
}());

export default DomHelper;
