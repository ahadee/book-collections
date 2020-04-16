const dataAPI = "https://5e8f1a42fe7f2a00165eee1d.mockapi.io/book-details";
const getDiv = document.getElementById('card-show')

// console.log(getDiv);
const activeUser = JSON.parse(localStorage.getItem('loginUser'))

const getDataAPI = () => {
    getDiv.innerHTML = "";

    fetch(dataAPI)
        .then(response => response.json())
        .then(result => {
            const users = result.filter(result => {
                return result.userId === activeUser.id
            })
            users.forEach(element => {
                const newDiv = document.createElement('div')
                newDiv.setAttribute('class', 'col-md-4')

                newDiv.innerHTML = `<div class="card mb-3" style="max-width: 540px;"><div class="row no-gutters">
            <div class="col-md-4">
                <img src="${element.image}"
                    class="card-img" alt="${element.title}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.description}</p>
                    <button id="delete-${element.id}" class="delete-button">Delete</button>
                    <button id="edit-${element.id}" class="edit-button">Edit</button>
                    <p class="card-text"><small class="text-muted">by ${element.author}</small></p>
                </div>
            </div>
        </div>
    </div>`
                getDiv.appendChild(newDiv)
            });
        })
        .catch(error => console.log(error))
}


const formDetailBooks = document.getElementById('form-detail-books');

const addNewDetail = async (event) => {
    event.preventDefault();

    let title = document.getElementById('title').value
    let image = document.getElementById('img').value
    let description = document.getElementById('description').value
    let author = document.getElementById('author').value

    if (title && image && description && author) {

        const bookDetail = {
            title,
            image,
            description,
            author,
            userId: activeUser.id
        }

        const fetchData = await fetch(dataAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookDetail),
        })
        await fetchData.json();
        getDataAPI()

        formDetailBooks.reset()
    }
    else if (!title || !image || !description || !author) {
        alert("All input need to be filled")
    }
    else {
        alert("The input cannot be empty")
    }

};

const deleteDetail = async (event) => {
    if (event.target.matches(".delete-button")) {
        const id = event.target.id.replace("delete-", "")
        const fetchData = await fetch(`${dataAPI}/${id}`, {
            method: "DELETE",
        })
        await fetchData.json()

        location.reload()
    }
}

const editDetail = async (event) => {
    if (event.target.matches(".edit-button")) {
        const titleEdit = prompt("insert your new Title")
        const id = event.target.id.replace("edit-", "")

        if (titleEdit) {
            const fetchData = await fetch(`${dataAPI}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(itemsEdit),
                body: JSON.stringify({ title: titleEdit })
            })

            await fetchData.json()
        }
        else {
            const imageEdit = prompt("insert your new image link")
            // const id = event.target.id.replace("edit-", "")
            if (!imageEdit) {
                const descriptionEdit = prompt("insert your new description")
                // const id = event.target.id.replace("edit-", "")
                if (!descriptionEdit) {
                    const authorEdit = prompt("insert your new author")
                    if (!authorEdit) {
                        alert("No update has been made")
                    }
                    else {
                        const fetchDataAuth = await fetch(`${dataAPI}/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            // body: JSON.stringify(itemsEdit),
                            body: JSON.stringify({ author: authorEdit })
                        })

                        await fetchDataAuth.json()
                    }
                }
                else {
                    const fetchDataDesc = await fetch(`${dataAPI}/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        // body: JSON.stringify(itemsEdit),
                        body: JSON.stringify({ description: descriptionEdit })
                    })

                    await fetchDataDesc.json()
                }
            }
            else {
                const fetchDataImg = await fetch(`${dataAPI}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // body: JSON.stringify(itemsEdit),
                    body: JSON.stringify({ image: imageEdit })
                })

                await fetchDataImg.json()
            }
        }
        location.reload()
    }
}

const logout = () => {
    window.location.href = 'index.html'
}

getDataAPI();

formDetailBooks.addEventListener("submit", addNewDetail)
getDiv.addEventListener("click", deleteDetail)
getDiv.addEventListener("click", editDetail)
