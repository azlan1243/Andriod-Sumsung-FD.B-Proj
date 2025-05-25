<?php include 'db_connect.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard - Orders & Reviews</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">

        <h2 class="mb-4">📦 Order Details</h2>
        <table class="table table-bordered table-hover shadow">
            <thead class="table-dark">
                <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Order Date</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql_orders = "SELECT * FROM Orders ORDER BY orderDate DESC";
                $result_orders = $conn->query($sql_orders);

                if ($result_orders->num_rows > 0) {
                    while($row = $result_orders->fetch_assoc()) {
                        echo "<tr>
                                <td>{$row['order_id']}</td>
                                <td>{$row['orderUserId']}</td>
                                <td>{$row['orderDate']}</td>
                                <td>$" . number_format($row['totalAmount'], 2) . "</td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='4' class='text-center'>No orders found.</td></tr>";
                }
                ?>
            </tbody>
        </table>

        <h2 class="mt-5 mb-4">⭐ Customer Reviews</h2>
        <table class="table table-bordered table-hover shadow">
            <thead class="table-dark">
                <tr>
                    <th>Review ID</th>
                    <th>User ID</th>
                    <th>Rating</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql_reviews = "SELECT * FROM Reviews ORDER BY review_id DESC";
                $result_reviews = $conn->query($sql_reviews);

                if ($result_reviews->num_rows > 0) {
                    while($row = $result_reviews->fetch_assoc()) {
                        $badgeClass = $row['rating'] === 'good' ? 'success' : 'danger';
                        echo "<tr>
                                <td>{$row['review_id']}</td>
                                <td>{$row['reviewUserId']}</td>
                                <td><span class='badge bg-{$badgeClass}'>" . ucfirst($row['rating']) . "</span></td>
                                <td>" . htmlspecialchars($row['comment']) . "</td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='4' class='text-center'>No reviews found.</td></tr>";
                }

                $conn->close();
                ?>
            </tbody>
        </table>

    </div>
</body>
</html>
