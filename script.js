document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactform");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("contact.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                    confirmButtonColor: '#3498db'
                });
            }

            if (data.total_entries && data.total_entries >= 10) {
                Swal.fire({
                    icon: 'warning',
                    title: '🚨 Alert',
                    text: 'More than 10 reports have been entered. Please notify local health authorities!',
                    confirmButtonColor: '#e74c3c'
                });
            }

            form.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later.',
                confirmButtonColor: '#e74c3c'
            });
        });
    });
});
