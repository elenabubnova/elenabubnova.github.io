function switchImage() {
    const image = document.getElementById("bw-image-switch");
    const mode = document.getElementById("imageMode").value;
    image.src = mode;
}
