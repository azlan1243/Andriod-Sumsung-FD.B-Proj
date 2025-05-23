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
$reviewUserId = $conn->real_escape_string($_POST['reviewUserId']);
$rating       = $conn->real_escape_string($_POST['rating']);
$comment      = $conn->real_escape_string($_POST['comment']);

// Insert data into reviews table
$sql = "INSERT INTO reviews (reviewUserid, rating, comment) VALUES ('$reviewUserId', '$rating', '$comment')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Review submitted successfully.'); window.location.href='index.html';</script>";
} else {
    echo "<script>alert('Error: " . $conn->error . "'); window.history.back();</script>";
}

$conn->close();
?>
