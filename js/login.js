window.addEventListener("DOMContentLoaded", () => {
    startLogin();
});

function startLogin() {
    fetch("http://127.0.0.1:5000/login")
        .then(response => response.json())
        .then(data => {
            // Open popup window for Google login
            const loginWindow = window.open(data.auth_url, "_blank", "width=500,height=600");

            // Poll to detect if the login window is closed
            const loginInterval = setInterval(() => {
                if (loginWindow.closed) {
                    clearInterval(loginInterval);
                    console.log("Login completed");
                    // Optionally, you can enable the upload UI here if needed
                }
            }, 1000);
        });
}
