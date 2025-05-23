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
$orderId     = $conn->real_escape_string($_POST['orderId']);
$orderUserId = $conn->real_escape_string($_POST['orderUserId']);
$orderDate   = $conn->real_escape_string($_POST['orderDate']);
$totalAmount = $conn->real_escape_string($_POST['totalAmount']);

// Insert data into orders table
$sql = "INSERT INTO orders (order_Id, orderUserId, orderDate, totalAmount) VALUES ('$orderId', '$orderUserId', '$orderDate', '$totalAmount')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Order placed successfully.'); window.location.href='index.html';</script>";
} else {
    echo "<script>alert('Error: " . $conn->error . "'); window.history.back();</script>";
}

$conn->close();
?>
