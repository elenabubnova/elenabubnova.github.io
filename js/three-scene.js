const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 1, 30);

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 20;

const container = document.getElementById("animated-bg");
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Optional: make responsive
window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

const material1 = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
    transparent: true,
    opacity: 0.2
});

const material2 = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7
});

const material3 = new THREE.MeshBasicMaterial({
    color: 0x0A0078,
    wireframe: false,
    transparent: true,
    opacity: 0.6
});

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(15, 1.2, 50, 16),
    material1
);
const icosahedron = new THREE.Mesh(
    new THREE.IcosahedronGeometry(8, 1),
    material2
);
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(17, 0.8, 16, 100),
    material3
);

icosahedron.position.set(7, 0, 0);
scene.add(icosahedron);

function animate() {
    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.0001;
    torusKnot.rotation.y += 0.0002;

    icosahedron.rotation.x -= 0.00035;
    icosahedron.rotation.y -= 0.00045;

    torus.rotation.x += 0.00005;
    torus.rotation.y += 0.00015;

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 