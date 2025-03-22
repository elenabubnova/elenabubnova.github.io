function toggleImage() {
    const image = document.getElementById("bw-image-switch");
    const toggle = document.getElementById("imageToggle");
    image.src = toggle.checked ? "assets/img/helix_portal/02_helix_portal_dark.jpg" : "assets/img/helix_portal/02_helix_portal_light.jpg";
}