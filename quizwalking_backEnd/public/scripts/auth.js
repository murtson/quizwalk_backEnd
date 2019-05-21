// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("user logged in: ", user);
    setupUI(user);

    // get firebase data
    db.collection("scores")
      .get()
      .then(snapshot => {
        console.log(snapshot.docs);
      });
  } else {
    setupUI();
    console.log("user logged out");
  }
});

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log("signig up!");

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //signup the user!
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          scores: {
            history: 0,
            science: 0,
            sports: 0
          }
        });
    })
    .then(() => {
      signupForm.reset();
    });
});

//logout
const logout = document.getElementById("logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  console.log(email, password);

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    loginForm.reset();
  });
});
