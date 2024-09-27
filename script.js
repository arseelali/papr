// Connection Log
console.log('File "script.js" connected');
const style = "color: green; font-size: 26px;";
const style2 = "color: green; font-size: 16px;";
console.log("%c\n\nMade by Arseel Ali! 🤓", style);
console.log(
  "%c\nContact me at info@arseelali.com with any reports or concerns!",
  style2
);

// Dates
const usernameText = document.getElementById("username");
const writeArea = document.getElementById("writeArea");
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const today_trimmed = `${year}-${month}-${day}`;
const day_tomorrow = String(today.getDate() + 1).padStart(2, "0");
const tomorrow = `${year}-${month}-${day_tomorrow}`;

// Buttons
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const voidButton = document.getElementById("voidButton");

// Change Username on page
const nameCookie = getCookie("local.name");
if (nameCookie) {
  let username = nameCookie;
  usernameText.innerHTML = username;
} else {
  let username = prompt("First-Time Prompt\nEnter your name:");
  if (username != null) {
    setCookie("local.name", username);
    usernameText.innerHTML = username;
  }
}

// Cookie Functions
function setCookie(name, value, days) {
  let expires = "";
  if (days !== undefined) {
    // Check if days is specified
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  } else {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 100);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function setCookieWithExpiryAtEndOfDay(name, value) {
  const expires = new Date();
  expires.setHours(23, 59, 59, 999);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Button Actions
saveButton.addEventListener("click", function (event) {
  saveText();
});

clearButton.addEventListener("click", function (event) {
  clearText();
});

voidButton.addEventListener("click", function (event) {
  voidText();
});

function saveText() {
  const encodedText = writeArea.value.replace(/\n/g, "<br>");
  if (getCookie("storedText") == "") {
    console.warn("Empty");
    deleteCookie("storedText");
    console.log("Deleted Cookie");
  } else {
    deleteCookie("storedText");
    setCookieWithExpiryAtEndOfDay("storedText", encodedText);
    console.log("Saved After Deleting Old Cookie");
  }
  Swal.fire({
    title: "Saved",
    text: "You can come back to edit any time today!",
    icon: "success",
    showCancelButton: false,
    confirmButtonText: "Okay",
    cancelButtonText: "No",
    reverseButtons: false,
    customClass: {
      popup: "custom-swal-popup",
      confirmButton: "custom-confirm-button",
    },
  });
}

function clearText() {
  Swal.fire({
    title: "Woah!",
    text: "That's a dangerous action. Are you sure you want to clear the text box?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    reverseButtons: false,
    customClass: {
      popup: "custom-swal-popup",
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      writeArea.value = null;
    }
  });
}

function voidText() {
  Swal.fire({
    title: "Woah!",
    text: "That's a dangerous action. If you continue, you will be sending this papr to the void. Are you sure you want to proceed?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    reverseButtons: false,
    customClass: {
      popup: "custom-swal-popup",
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Done",
        text: "That was a good write. Off to the void!",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Okay",
        reverseButtons: false,
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-confirm-button",
        },
      });
      writeArea.value = null;
    }
  });
}

// Loading text on window load

window.onload = function () {
  const savedText = getCookie("storedText");
  if (savedText) {
    writeArea.value = savedText.replace(/<br>/g, "\n");
  }

  Swal.fire({
    title: "Just a quick disclamer!",
    text: "This app is currently in Alpha. This means that a lot of things might not work like they are supposed to. Always click save 2-3 times before exiting the site. Contact me at info@arseelali.com with any reports. That's all for now, see ya! 👋",
    icon: "info",
    showCancelButton: false,
    confirmButtonText: "Sounds Good",
    reverseButtons: false,
    customClass: {
      popup: "custom-swal-popup",
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
    },
  });
};
