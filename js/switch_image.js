function toggleImage(dark, light, imageSwitch, imageToggle) {
    const image = document.getElementById(imageSwitch);
    const toggle = document.getElementById(imageToggle);
    image.src = toggle.checked ? dark : light;
}