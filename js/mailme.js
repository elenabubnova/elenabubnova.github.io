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

            const element = document.querySelector("#mailPopup");
            if (element) {
                element.classList.remove("bg-green-600");
                element.classList.add("bg-white");
            }

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
    const inputs = form.querySelectorAll("input, textarea");
    let hasError = false;

    document.querySelector("#formError").classList.remove("hidden");
    document.querySelector("#formInfo").classList.add("hidden");
    clearFormError("#formError");

    inputs.forEach(input => {
        input.classList.remove("border-red-500", "ring-red-500", "ring-1");
        if (!input.checkValidity()) {
            hasError = true;
            input.classList.add("border-red-500", "ring-red-500", "ring-1");
        }
    });

    for (let [key, value] of formData.entries()) {
        if (!value || value.trim() === "") {
            hasError = true;
            addFormError(`Please fill in the "${key}" field.`, "#formError");
        }

        if (key === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                hasError = true;
                addFormError("Please enter a valid email address.", "#formError");
            }
        }
    }

    if (hasError) return;

    document.querySelector("#formError").classList.add("hidden");

    fetch("https://formsubmit.co/ajax/elenabubnova.ca@gmail.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                form.reset();
                document.querySelector("#formInfo").classList.remove("hidden");
                form.querySelectorAll("input, textarea, select, label, button").forEach(el => {
                    el.classList.add("hidden");
                });
                thankYou("#formInfo");
                const chatContact = document.querySelector("#chatContact");
                chatContact.classList.add("hidden");

                const element = document.querySelector("#mailPopup");
                if (element) {
                    element.classList.remove("bg-white");
                    element.classList.add("bg-green-600");
                }
            } else {
                alert("Submission failed. Try again.");
            }
        })
        .catch(() => {
            addFormError("There was an error. Please try again", "#formError");
        });
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


function thankYou(formId) {
    const formEl = document.querySelector(formId);
    const infoEl = document.createElement('div')
    infoEl.innerHTML = '<p>Thank you!</p> <p>Message Sent.</p>';
    formEl.append(infoEl)
}
