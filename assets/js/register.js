const registerForm = document.getElementById("registerForm")


const userRegistration = (event) => {
    event.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }

    if (userData.name === "") {
        alert("Name cannot be empty")
    }
    else if (userData.email === "") {
        alert("Email cannot be empty")
    }
    else if (userData.password === "") {
        alert("Password cannot be empty")
    }
    else {
        const dataAPI = "https://5e8f1a42fe7f2a00165eee1d.mockapi.io/users"
        const fetchData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }

        fetch(dataAPI,fetchData).then(response => response.json()).then(result => {
            alert('Registration is successful')
            location.replace('./index.html')
        })
        .catch(error => console.log(error))
    }
}

registerForm.addEventListener("submit", userRegistration)