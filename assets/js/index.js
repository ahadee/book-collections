const loginForm = document.getElementById("loginForm");

const userLogin = (event)=>{
    event.preventDefault();
    let userData = JSON.parse(localStorage.getItem('userData'))
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;
    count = 0;
    if(emailInput === "" && passwordInput ===""){
        alert("form cannot be empty")
    }
    else {

        for(let i = 0 ; i<userData.length ; i++){
            if(emailInput === userData[i].email && passwordInput === userData[i].password){
                count += 1;
                alert("Your Login is Success");
                window.location.href = `${window.origin}/dashboard.html`;
                // break;
            }
            else if (emailInput === userData[i].email && passwordInput !== userData[i].password) {
                alert("Wrong Password")
                // break;
            }
            else if (emailInput !== userData[i].email && passwordInput === userData[i].password) {
                alert("Wrong Email")
                // break;
            }
            else {
                alert("You don't have account yet! Please sign up")
            }
        }
    }
}
loginForm.addEventListener("submit", userLogin);