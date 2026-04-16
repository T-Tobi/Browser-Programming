const output = document.getElementById("output")
const list = document.getElementById("userList")

function log(text) {
    output.textContent += text + "\n"
}

function clearOutput() {
    output.textContent = ""
    list.innerHTML = ""
}

document.getElementById("btnLoadUsers").onclick = loadUsers

async function loadUsers() {

    clearOutput()

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        )

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status)
        }

        const users = await response.json()

        users.forEach(function (user) {

            const name = user.name
            const email = user.email
            const city = user.address.city

            log(name + " - " + email + " - " + city)

            // Part E: Display in webpage
            const li = document.createElement("li")
            li.textContent = name + " - " + email + " - " + city
            list.appendChild(li)

        })

    } catch (error) {
        log("Error: " + error.message)
    }

}
