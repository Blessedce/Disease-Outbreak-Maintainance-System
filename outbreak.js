document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([20, 0], 2); // World view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Outbreak data with detailed info
    const outbreaks = [
        {
            lat: 6.5244,
            lng: 3.3792,
            info: 'Lagos, Nigeria: Malaria outbreak',
            disease: 'Malaria',
            severity: 'High'
        },
        {
            lat: 34.0522,
            lng: -118.2437,
            info: 'Los Angeles, USA: COVID-19 spike',
            disease: 'COVID-19',
            severity: 'Moderate'
        },
        {
            lat: 28.6139,
            lng: 77.2090,
            info: 'Delhi, India: Dengue cases rising',
            disease: 'Dengue',
            severity: 'High'
        }
    ];

    // Place markers on the map
    outbreaks.forEach(outbreak => {
        L.marker([outbreak.lat, outbreak.lng]).addTo(map)
            .bindPopup(`<b>${outbreak.disease}</b><br>${outbreak.info}<br>Severity: ${outbreak.severity}`);
    });

    // Function to calculate distance between two coordinates
    function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Handle map click to detect nearby outbreaks
    map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        let found = false;

        outbreaks.forEach(outbreak => {
            const distance = haversineDistance(lat, lng, outbreak.lat, outbreak.lng);
            if (distance < 50) { // within 50 km
                found = true;
                L.popup()
                    .setLatLng([lat, lng])
                    .setContent(`<b>${outbreak.disease}</b><br>${outbreak.info}<br>Severity: ${outbreak.severity}`)
                    .openOn(map);
            }
        });

        if (!found) {
            L.popup()
                .setLatLng([lat, lng])
                .setContent("✅ No known outbreak reported in this area.")
                .openOn(map);
        }
    });
});
