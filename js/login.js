function startLogin() {
    fetch("http://127.0.0.1:5000/login")
        .then(response => response.json())
        .then(data => {
            window.open(data.auth_url, "_blank", "width=500,height=600");
        });
}