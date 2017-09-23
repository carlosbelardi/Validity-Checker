var smut_warning = "Warning! This news source is known for being VERY unreliable. " +
  "Stories may be twisted or given without context to fit an agenda. " +
  "Facts may be also be incorrect or completely made up.";

var very_reliable = "This news source is known for being very reliable. " +
  "Stories are almost always well-reaserched and provided with the appropriate context";

var reliable = "This news source is fairly reliable. " +
  "They may occasionally publish an incorrect or biased story but for the most part they are safe to use.";

  // When the extension is installed or upgraded ...
  chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      // With a new rule ...
      chrome.declarativeContent.onPageChanged.addRules([
        {
          // That fires when a page's on a specific URL
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: 'nytimes.com' },
            }),
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: 'infowars.com' }
            }),
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: 'cnn.com' }
            })
          ],
          // And shows the extension's page action.
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
    });
  });


chrome.tabs.query({
  currentWindow: true,
  active: true
}, function(tabs) {
  console.log(tabs[0].url);
  var currUrl = tabs[0].url;

  function URLContainsName(my_url, name) {
    if (my_url.indexOf(name) > 0) {
      return true;
    }
  }
  if (URLContainsName(currUrl, "nytimes.com") == true) {
    document.getElementById("reliability").innerHTML = "Very Reliable";
    document.getElementById("blurb").innerHTML = very_reliable;
    document.getElementById('wiki').href = "https://en.wikipedia.org/wiki/The_New_York_Times";
  }
  if (URLContainsName(currUrl, "infowars.com")== true){
    document.getElementById("reliability").innerHTML = "Extremely Unreliable";
    document.getElementById("smut_warning").innerHTML = smut_warning;
    document.getElementById('wiki').href = "https://en.wikipedia.org/wiki/Alex_Jones_(radio_host)#Infowars";
  }
  if (URLContainsName(currUrl, "cnn.com")== true){
    document.getElementById("reliability").innerHTML = "Reliable";
    document.getElementById("blurb").innerHTML = reliable;
    document.getElementById('wiki').href = "https://en.wikipedia.org/wiki/CNN";
  }

  //document.getElementById("url").innerHTML = currUrl;
});
