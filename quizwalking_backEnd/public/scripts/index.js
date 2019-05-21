const loginPage = document.getElementById("login-page");
const contentPage = document.getElementById("content-page");
const userName = document.getElementById("user-name");
const score = document.getElementById("user-score");

const setupUI = user => {
  if (user) {
    //display account info
    const html = `
        <span>Logged in as: ${user.email}</span>
    `;
    userName.innerHTML = html;

    //display the users score
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const scoreHtml = `<li>history: ${doc.data().scores.history}</li>
        <li>science: ${doc.data().scores.science}</li>
        <li>sports: ${doc.data().scores.sports}</li>`;
        score.innerHTML = scoreHtml;
      });

    loginPage.style.display = "none";
    contentPage.style.display = "block";
  } else {
    //hide account info
    userName.innerHTML = "";

    // toggle login page
    loginPage.style.display = "block";
    contentPage.style.display = "none";
  }
};
