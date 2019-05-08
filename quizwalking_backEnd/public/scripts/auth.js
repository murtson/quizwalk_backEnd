const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log("signig up!");

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  console.log(email, password);

  //signup the user!
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    signupForm.reset();
  });
});
