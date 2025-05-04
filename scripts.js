document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("adminform");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("admin-report.php", {
            method: "POST",
            body: formData,
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

            if (data.total_entries >= 10) {
                Swal.fire({
                    icon: 'warning',
                    title: '🚨 Outbreak Alert',
                    text: 'More than 10 outbreaks have been reported. There is a potential outbreak!',
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
                text: 'An error occurred. Please try again later.',
                confirmButtonColor: '#e74c3c'
            });
        });
    });
});
