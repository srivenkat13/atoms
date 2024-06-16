/* Copy to clipBoard */
function copyQuote() {
    let quote = document.getElementById("quote");
    let copiedText = quote.innerText;
    navigator.clipboard.writeText(copiedText);
  
    showToast("Copied to Clipboard ✅");
  }
  
  /* show Toast */
  function showToast(text) {
    let toast = document.getElementById("toast");
    toast.className = "show";
    if (text) {
      toast.innerText = text;
    }
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }
  
  // Attaching showToast function to window Object
  /*  As the script is changed to 'module' type,  functions ES6 modules are not 
  directly attached to window object. which makes showToast() inacessible in 
  global scope*/
  window.showToast = showToast
  window.copyQuote = copyQuote

  export {showToast, copyQuote}