const signUpButton = document.getElementById("signupbutton");

if (signUpButton) {

    signUpButton.addEventListener("click", async function () {

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("message");

        if (password != confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        if (
            name === "" ||
            email === "" ||
            username === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            message.textContent = "Please fill in all fields.";
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8000/api/auth/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            message.textContent = data.message;

        } catch (error) {

            console.log(error);

            message.textContent = "Unable to connect to server.";
        }

    });
}


// const signInButton = document.getElementById("signinbutton");

const signInButton = document.getElementById("signinbutton");

if (signInButton) {

    signInButton.addEventListener("click", async function () {

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        if (username === "" || password === "") {

            message.textContent = "Please fill in all fields.";
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8000/api/auth/signin",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            message.textContent = data.message;

        } catch (error) {

            console.log(error);

            message.textContent = "Unable to connect to server.";
        }
    });
}