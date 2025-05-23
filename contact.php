<?php
// Database connection credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbproj";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize and collect POST data
$name    = $conn->real_escape_string($_POST['name']);
$email   = $conn->real_escape_string($_POST['email']);
$message = $conn->real_escape_string($_POST['message']);

// Insert data into contact table
$sql = "INSERT INTO contact(name, email, message) VALUES ('$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Message sent successfully.'); window.location.href='index.html';</script>";
} else {
    echo "<script>alert('Error: " . $conn->error . "'); window.history.back();</script>";
}

$conn->close();
?>
