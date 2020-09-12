window.addEventListener('load', (event) => {
  alert('This page has been archived. All of the elements of this page are very unstable. Continue at your own risk.')
});

let confimMode = null;
let number = 0;
let body = document.getElementById("body");
let encoded = null;
let decoded = null;
let link = "nowhere";

function isEnter(event) {
  let x = event.keyCode;
  if (x == 13) { // 13 is the Enter key
    commands();
  }
}

function commands() {
  let command = terminal.innerHTML;
  if (command.startsWith("http") === true) {
    let secure = "";
    if (command.startsWith("http://") === true) {
      secure = "http://";
    } else if (command.startsWith("https://") === true) {
      secure = "https://";
    } 
    link = command.slice(secure.length);// Slices the http(s) of so it can give a clean link
    document.getElementById("terminal").innerHTML = command +
      "<br>Redirecting you to " + link;
    document.getElementById("terminal").removeAttribute("contenteditable");
    location.assign(command);
  } else {
    switch (command) {
      case "ping":
          document.getElementById("terminal").innerHTML = command + "<br>Pong";
          terminalOutput();
        break;
      case "help":
          document.getElementById("terminal").innerHTML = command +
            "<br>Ping: Say pong if server is alive<br>Exit: Exits the terminal and redirects to Google<br>Clear: Clears the terminal<br>Search: Gives search engine options";
          terminalOutput();
        break;
      case "exit":
          document.getElementById("terminal").innerHTML = command +
            "<br>Are you sure? [Yes] [No]";
          confirmMode = "exit";
          terminalOutput();
        break;
      case "search":
          document.getElementById("terminal").innerHTML = command +
            '<br><a href="https://www.google.com">[Google]</a>&nbsp;<a href="https://www.ecosia.org">[Ecosia]</a>&nbsp;<a href="https://www.bing.com">[Bing]</a>';
          document.getElementById("terminal").removeAttribute("contenteditable");
          terminalOutput();
        break;
      case "clear":
          document.getElementById("body").innerHTML =
            '<p>HTML Terminal</p><span>>>>&nbsp;</span><span contenteditable id="terminal" onkeypress="isEnter(event)"></span><br><script src="TerminalJS.js"></script>';
        break;
      case "yes":
        switch (confirmMode) {
          case "exit":
              document.getElementById("terminal").innerHTML = command +
                "<br>Redirecting...";
              document.getElementById("terminal").removeAttribute(
                "contenteditable");
              setTimeout(function() {
                location.assign("../../");
              }, 500);
            break;
        }
        break;
      case "no":
          confirmMode = null;
          terminalOutput();
        break;
      case "code":
          document.getElementById("terminal").innerHTML = command +
            '<br><a href="view-source:cookiegamer733.repl.co/archives/HTML Terminal/index.html">[HTML]</a>&nbsp;<a href="script.js">[JavaScript]</a>&nbsp;<a href="style.css">[CSS]</a>';
          document.getElementById("terminal").removeAttribute("contenteditable");
          terminalOutput();
        break;
      default:
          document.getElementById("terminal").innerHTML = command +
            "<br>Command not recognized";
          terminalOutput();
        break;
    }
  }
}

function terminalOutput() {
  document.getElementById("terminal").removeAttribute("contenteditable");
  document.getElementById("terminal").id = number;
  document.getElementById("terminalContainer").innerHTML +=
    '<span>>>>&nbsp;</span><span contenteditable id="terminal" onkeypress="isEnter(event)"></span><br>';
  number += 1;  
}
