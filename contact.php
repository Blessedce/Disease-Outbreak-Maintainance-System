<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "diseaseoutbreak";

// Connect to DB
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Sanitize & validate input
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if ($name === '' || $email === '' || $message === '') {
    echo json_encode(["message" => "Please fill in all fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["message" => "Invalid email format."]);
    exit();
}

// Insert into DB
$stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    $result = $conn->query("SELECT COUNT(*) as total FROM contacts");
    $row = $result->fetch_assoc();

    echo json_encode([
        "message" => "Thank you for contacting emergency support.",
        "total_entries" => $row["total"]
    ]);
} else {
    echo json_encode(["message" => "Failed to submit your message."]);
}

$stmt->close();
$conn->close();
?>
