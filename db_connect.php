<?php
$servername = "localhost";
$username = "root";
$password = ""; // change if needed
$database = "dbproj";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
