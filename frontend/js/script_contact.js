document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMsg = document.getElementById("formMsg");

    if (!name || !email || !message) {
        formMsg.style.color = "red";
        formMsg.innerText = "Please fill all required fields!";
        return;
    }

    // Simulate API call
    setTimeout(() => {
        formMsg.style.color = "green";
        formMsg.innerText = "✅ Message sent successfully!";

        document.getElementById("contactForm").reset();
    }, 1000);
});