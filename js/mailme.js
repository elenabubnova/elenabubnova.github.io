function toggleMailPopup() {
    const popup = document.getElementById("mailPopup");
    console.log(popup)
    popup.style.display = popup.style.display === "block" ? "none" : "block";
}


document.getElementById('mailForm').addEventListener('submit', function (e) {
    if (!this.checkValidity()) {
        e.preventDefault();
        alert('Please fill out the form correctly.');
    }
});


document.getElementById("mailForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/dmitrybubnov.ca@gmail.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                // alert("Message sent!");
                form.reset();
                sayThankyou();
                // document.getElementById("mailPopup").style.display = "none"; // Close popup
            } else {
                alert("Submission failed. Try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error. Please try again.");
        });
});


function sayThankyou() {
    const formData = document.querySelector('#mailForm')
    console.log(formData)
}