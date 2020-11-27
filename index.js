var loginForm = document.getElementById("loginForm");
var regForm = document.getElementById("regForm");
var loginDiv = document.getElementById("loginDiv");
var regDiv = document.getElementById("regDiv");
var newUser = document.getElementById("newUser");
var oldUser = document.getElementById("oldUser");
var loginCredentials = JSON.parse(localStorage.getItem("credentials")) || [];
if (loginCredentials.length != 0) {
  regDiv.style.display = "none";
  loginDiv.style.display = "block";
} else {
  regDiv.style.display = "block";
  loginDiv.style.display = "none";
}
regForm.onsubmit = function (e) {
  e.preventDefault();
  if (this.newPassword.value == this.confPassword.value) {
    credentialCreation(this.username.value, this.confPassword.value);
  } else {
    alert("please enter confirm password correctly!!");
  }
};
loginForm.onsubmit = function (e) {
  e.preventDefault();
  if (loginCredentials == 0) {
    alert("U didn't have account please register..");
  } else {
    for (var i = 0; i < loginCredentials.length; i++) {
      if (
        loginCredentials[i].uname == this.username.value &&
        loginCredentials[i].password == this.password.value
      ) {
        window.location.assign("./vidGrid.html");
      } else {
        alert("please enter correct credentials!!");
      }
    }
  }
};
newUser.onclick = () => {
  regDiv.style.display = "block";
  loginDiv.style.display = "none";
};
oldUser.onclick = () => {
  regDiv.style.display = "none";
  loginDiv.style.display = "block";
};
credentialCreation = function (uname, password) {
  const msgObj = {
    uname: uname,
    password: password,
  };
  var status = "red";
  if (loginCredentials.length != 0) {
    for (var i = 0; i < loginCredentials.length; i++) {
      if (loginCredentials[i].uname == msgObj.uname) {
        status = "red";
        alert("User already exists!!");
      } else {
        status = "green";
      }
    }
    if (status != "red") {
      window.location.assign("./vidGrid.html");
      loginCredentials.push(msgObj);
      window.localStorage.setItem(
        "credentials",
        JSON.stringify(loginCredentials)
      );
    }
  } else {
    window.location.assign("./vidGrid.html");
    loginCredentials.push(msgObj);
    window.localStorage.setItem(
      "credentials",
      JSON.stringify(loginCredentials)
    );
  }
};
