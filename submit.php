<?php

header('Content-Type: application/json');

$servername = "localhost"; // Replace with your server name
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "psycal"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
        exit();
    }

	if (!isset($_POST['Student_ID']) || !isset($_POST['name']) || !isset($_POST['Email'])) {
		echo json_encode(['status' => 'error', 'message' => 'Required fields are missing']);
		exit();
	}

	// Sanitize and retrieve POST data
	$student_id = $conn->real_escape_string($_POST['Student_ID']);
	$name = $conn->real_escape_string($_POST['name']);
	$email = $conn->real_escape_string($_POST['Email']);
	$result = $conn->real_escape_string($_POST['result']);
    $q1 = $_POST['q1'];
    $q2 = $_POST['q2'];
    $q3 = $_POST['q3'];
    $q4 = $_POST['q4'];
    $q5 = $_POST['q5'];
    $q6 = $_POST['q6'];
    $q7 = $_POST['q7'];
    $q8 = $_POST['q8'];
    $q9 = $_POST['q9'];
    $q10 = $_POST['q10'];
    $q11 = $_POST['q11'];
    $q12 = $_POST['q12'];
    $q13 = $_POST['q13'];
    $q14 = $_POST['q14'];
    $total = $q1 + $q2 + $q3 + $q4 + $q5 + $q6 + $q7+ $q8 + $q9 + $q10 + $q11 + $q12 + $q13 + $q14;

        if ($total <= 0) {
            $result = "Not Present.";
        } else if ($total < 17) {
            $result = "Mild Severity";
        } else if ($total >= 18 && $total <= 24) {
            $result = "Mild to Moderate Severity";
        } else {
            $result = "Moderate to Severe.";
        }

    $sql = "INSERT INTO responses (student_id, name, email, result, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, total) 
            VALUES ('$student_id', '$name', '$email', '$result', '$q1', '$q2', '$q3', '$q4', '$q5', '$q6', '$q7', '$q8', '$q9', '$q10', '$q11', '$q12', '$q13', '$q14', '$total')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success', 'message' => 'Data submitted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>
