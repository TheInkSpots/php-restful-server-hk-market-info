<?php
$server = 'localhost';
$dbuser = 'root';
$dbpassword = 'new_password';
$dbname = 'marketInfoDB_v1';

$conn = new mysqli($server, $dbuser, $dbpassword, $dbname);
if ($conn->connect_error) {
    die ('Database connection failed');
}