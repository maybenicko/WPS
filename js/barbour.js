document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("upload-btn");
    const statusText = document.getElementById("status");
    const errorSection = document.getElementById("error-section");
    const submitLinkBtn = document.getElementById("submit-link");
    const linkInput = document.getElementById("link-input");
    const themeToggle = document.getElementById("theme-toggle");
    const fileInput = document.getElementById("file-input");
    const dropArea = document.getElementById("drop-area");
    const browseBtn = document.getElementById("browse-btn");
    const uploadSection = document.getElementById("upload-section");

    browseBtn.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            document.getElementById("file-name").textContent = file.name;
            uploadBtn.disabled = false;
        }
    });

    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active"); 
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
    });

    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.classList.remove("active");

        const file = event.dataTransfer.files[0];
        if (file) {
            document.getElementById("file-name").textContent = file.name;
            uploadBtn.disabled = false;
        }
    });

    async function uploadFile(file) {
        let formData = new FormData();
        formData.append("pdf", file);

        try {
            let response = await fetch("/upload", {
                method: "POST",
                body: formData
            });

            let result = await response.text();
            
            if (!response.ok || result.includes("error")) {
                throw new Error("Upload failed.");
            }

            statusText.textContent = result;
        } catch (error) {
            statusText.textContent = "Upload failed. Please try again.";
            uploadSection.classList.add("hidden");
            errorSection.style.display = "block";
        }
    }

    submitLinkBtn.addEventListener("click", () => {
        const link = linkInput.value.trim();
        if (link) {
            statusText.textContent = "Link submitted: " + link;
            errorSection.style.display = "none";
        }
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    uploadBtn.addEventListener("click", () => {
        const file = fileInput.files[0];
        if (file) {
            uploadFile(file);
        }
    });
});

let tartan = document.querySelector(".tartan-pattern");
let isDragging = false;
let startX, startY, offsetX = 0, offsetY = 0;

tartan.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    tartan.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    
    tartan.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    tartan.style.cursor = "grab";
});
