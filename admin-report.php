<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "diseaseoutbreak";

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Retrieve POST data safely
$hospitalName = isset($_POST['hospitalName']) ? trim($_POST['hospitalName']) : '';
$location = isset($_POST['location']) ? trim($_POST['location']) : '';
$diseaseName = isset($_POST['diseaseName']) ? trim($_POST['diseaseName']) : '';

// Check for empty fields
if ($hospitalName === '' || $location === '' || $diseaseName === '') {
    echo json_encode(["message" => "All fields are required."]);
    exit();
}

// Insert into database
$stmt = $conn->prepare("INSERT INTO adminreports (hospitalName, location, diseaseName) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $hospitalName, $location, $diseaseName);

if ($stmt->execute()) {
    $result = $conn->query("SELECT COUNT(*) as total FROM adminreports");
    $row = $result->fetch_assoc();
    echo json_encode([
        "message" => "Thank you for reporting the outbreak.",
        "total_entries" => $row["total"]
    ]);
} else {
    echo json_encode(["message" => "Failed to submit report."]);
}

$stmt->close();
$conn->close();
?>
