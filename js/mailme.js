// Mail form popup with form clear on exit
function toggleMailPopup() {
    const popup = document.getElementById("mailPopup");
    clearFormError("#formInfo");

    // Check if it's being closed
    const isClosing = popup.style.display === "block";

    if (isClosing) {
        clearFormError("#formError");

        // Reset form inputs
        const form = document.getElementById("mailForm");
        if (form) {
            document.querySelector("#formError").classList.add("hidden");
            document.querySelector("#formInfo").classList.add("hidden");
            form.querySelectorAll("input, textarea, select, label, button").forEach(el => {
                el.classList.remove("hidden");
            });

            form.reset();
            const chatContact = document.querySelector("#chatContact");
            chatContact.classList.remove("hidden");

            const element = document.querySelector("#mailPopup"); // replace with your actual element selector
            if (element) {
                element.classList.remove("bg-green-600");
            element.classList.add("bg-white");
            }

            // Also remove red styles (if added during validation)
            form.querySelectorAll("input, textarea").forEach(input => {
                input.classList.remove("border-red-500", "ring-red-500", "ring-1");
            });
        }
    }
    popup.style.display = isClosing ? "none" : "block";
}


document.getElementById("mailForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const formData = new FormData(form);

    let hasError = false;

    document.querySelector("#formError").classList.remove("hidden");
    document.querySelector("#formInfo").classList.add("hidden");
    clearFormError("#formError");
    

    // Manual validation
    for (let [key, value] of formData.entries()) {
        if (!value || value.trim() === "") {
            hasError = true;
            // alert(`Please fill in the "${key}" field.`);
            addFormError(`Please fill in the "${key}" field.`, "#formError");
            // break;
        }

        // Email format check
        if (key === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                hasError = true;
                //   alert("Please enter a valid email address.");
                addFormError("Please enter a valid email address.", "#formError");
                //   break;
            }
        }
    }

    if (hasError) return;


    fetch("https://formsubmit.co/ajax/elenabubnova.ca@gmail.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                // alert("Message sent!");
                form.reset();
                document.querySelector("#formInfo").classList.remove("hidden");
                form.querySelectorAll("input, textarea, select, label, button").forEach(el => {
                    el.classList.add("hidden");
                  });
                thankYou("#formInfo");
                const chatContact = document.querySelector("#chatContact");
                chatContact.classList.add("hidden");
                

                const element = document.querySelector("#mailPopup"); // replace with your actual element selector
                if (element) {
                element.classList.remove("bg-white");
                element.classList.add("bg-green-600");
                }
                // document.getElementById("mailPopup").style.display = "none"; // Close popup
            } else {
                alert("Submission failed. Try again.");
            }
        })
        .catch(error => {
            // console.error("Error:", error);
            // alert("There was an error. Please try again.");
            addFormError("There was an error. Please try again", "#formError");

        });
});

document.getElementById("mailForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Stop normal submission

    const inputs = this.querySelectorAll("input, textarea");
    let formValid = true;

    inputs.forEach(input => {
        // Reset styles first
        input.classList.remove("border-red-500", "ring-red-500", "ring-1");

        if (!input.checkValidity()) {
            formValid = false;
            input.classList.add("border-red-500", "ring-red-500", "ring-1");
        }
    });

    if (formValid) {
        document.querySelector("#formError").classList.add("hidden");
        // alert("Form is valid and ready to submit!");
        // You can call fetch() or your own submission logic here
    }
});


function addFormError(e, formId) {
    const formEl = document.querySelector(formId);
    const errorEl = document.createElement('div')
    console.log(e)
    errorEl.innerHTML = e
    formEl.append(errorEl)
}


function clearFormError(formId) {
    const formEl = document.querySelector(formId);
    formEl.innerHTML = '';
}


function formSent(formId) {
    const formEl = document.querySelector(formId);

}


function thankYou(formId) {
    const formEl = document.querySelector(formId);
    const infoEl = document.createElement('div')
    infoEl.innerHTML = '<p>Thank you!</p> <p>Message Sent.</p>';
    formEl.append(infoEl)
}