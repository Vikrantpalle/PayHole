var s = document.createElement("script");

s.src = chrome.runtime.getURL("noJS.js");

(document.head || document.documentElement).prepend(s);
