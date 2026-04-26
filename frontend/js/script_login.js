
// Toggle Login/Signup
function toggleAuth() {
    let l = document.getElementById("loginBox");
    let s = document.getElementById("signupBox");
    l.style.display = (l.style.display === "none") ? "block" : "none";
    s.style.display = (s.style.display === "none") ? "block" : "none";
}

// Password toggle
function togglePassword(id, el) {
    let input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        el.innerText = "Hide";
    } else {
        input.type = "password";
        el.innerText = "Show";
    }
}


async function loginUser(event) {
    event.preventDefault();

    let res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value
        })
    });

    let data = await res.json();

    if (res.ok && data.user) {

        console.log("LOGIN RESPONSE:", data);

        localStorage.setItem("role", data.user.role);

        alert("Welcome " + data.user.name);

        // ✅ ROLE BASED REDIRECT
        if (data.user.role == "admin") {
            window.location.href = "/adminPanel";
        } else {
            window.location.href = "/";
        }

    } else {
        alert(data.message || "Login failed");
    }
}
// Dummy DB
let users = JSON.parse(localStorage.getItem("users")) || [];

// Signup
document.getElementById("signupForm").addEventListener("submit", async e => {
    e.preventDefault();

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    let res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    let data = await res.json();
    alert(data.message);

    if (res.ok) toggleAuth();
});
// Social buttons (demo)
function googleLogin() {
    alert("Google login integration coming soon!");
}
function facebookLogin() {
    alert("Facebook login integration coming soon!");
}
