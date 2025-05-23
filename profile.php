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
$userId    = $conn->real_escape_string($_POST['userId']);
$fullName  = $conn->real_escape_string($_POST['fullName']);
$firstName = $conn->real_escape_string($_POST['firstName']);
$lastName  = $conn->real_escape_string($_POST['lastName']);
$phone     = $conn->real_escape_string($_POST['phone']);
$email     = $conn->real_escape_string($_POST['email']);
$dob       = $conn->real_escape_string($_POST['dob']);
$address   = $conn->real_escape_string($_POST['address']);
$age       = $conn->real_escape_string($_POST['age']);

// Insert data into profile table
$sql = "INSERT INTO profiles (userId, fullName, firstName, lastName, phone, email, dob, address, age) VALUES ('$userId', '$fullName', '$firstName', '$lastName', '$phone', '$email', '$dob', '$address', '$age')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Profile saved successfully.'); window.location.href='index.html';</script>";
} else {
    echo "<script>alert('Error: " . $conn->error . "'); window.history.back();</script>";
}

$conn->close();
?>
