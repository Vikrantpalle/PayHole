reloadAndKillJS = function () {
  document.documentElement.innerHTML = "Reloading Page...";

  var xhr = new XMLHttpRequest();

  xhr.open("GET", window.location.href, true);

  xhr.onerror = function () {
    document.documentElement.innerHTML = "Error getting Page";
  };

  xhr.onload = function () {
    var page = document.implementation.createHTMLDocument("");
    page.documentElement.innerHTML = this.responseText;

    var newPage = document.importNode(page.documentElement, true);

    var nodeList = newPage.querySelectorAll("iframe");
    var re = new RegExp("^https://www.nytimes.com/vi-assets/");
    for (var i = 0; i < nodeList.length; ++i) {
      var node = nodeList[i];
      if (node.src && !re.test(node.src)) {
        node.setAttribute("original-src", node.src);
        node.removeAttribute("src");
      }
      node.innerText = "";
    }

    document.replaceChild(newPage, document.documentElement);
    delete page;

    // Do your thing here
  };

  xhr.send();
};

window.stop();
reloadAndKillJS();
