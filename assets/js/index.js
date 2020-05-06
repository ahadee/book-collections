const loginForm = document.getElementById("loginForm");

const userLogin = (event) => {
    event.preventDefault()

    let userData = {
        email: document.getElementById('email').value, 
        password: document.getElementById('password').value
    }

    if (userData.email === "") {
        alert("Email cannot be empty")
    }
    else if (userData.password === "") {
        alert("Password cannot be empty")
    }
    else {
        const dataAPIUser = "https://5e8f1a42fe7f2a00165eee1d.mockapi.io/users";

        fetch(dataAPIUser).then(response => response.json()).then(result => {
            const loginUser = result.find(result => result.email === userData.email)

            if (loginUser === undefined) {
                alert('Your email is not registered yet. Please sign up')
            }
            else if (loginUser.email === userData.email && loginUser.password === userData.password) {
                alert('You have successfully login')
                localStorage.setItem('loginUser',JSON.stringify(loginUser))
                location.href = `${window.origin}/dashboard.html`
            }
            else {
                alert('Email or password is incorrect')
            }
        })
    }
}

loginForm.addEventListener("submit", userLogin);