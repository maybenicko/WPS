document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("upload-btn");
    const statusText = document.getElementById("status");
    const errorSection = document.getElementById("error-section");
    const submitLinkBtn = document.getElementById("submit-link");
    const linkInput = document.getElementById("link-input");
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

        const path = window.location.pathname;
        const source = path.split("/").pop().replace(".html", "");

        formData.append("source", source);

        try {
            let response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData
            });

            let result = await response.text();
            
            if (!response.ok || result.includes("error")) {
                throw new Error("Upload failed.");
            }

            statusText.textContent = result;
            console.log(result);
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

function startDrag(e) {
    isDragging = true;
    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX - offsetX;
    startY = touch.clientY - offsetY;
    tartan.style.cursor = "grabbing";
}

function dragMove(e) {
    if (!isDragging) return;

    const touch = e.touches ? e.touches[0] : e;
    offsetX = touch.clientX - startX;
    offsetY = touch.clientY - startY;
    
    tartan.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
}

function stopDrag() {
    isDragging = false;
    tartan.style.cursor = "grab";
}

tartan.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", dragMove);
window.addEventListener("mouseup", stopDrag);
tartan.addEventListener("touchstart", startDrag);
window.addEventListener("touchmove", dragMove);
window.addEventListener("touchend", stopDrag);
