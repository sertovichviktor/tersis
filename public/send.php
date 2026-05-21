<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data"]);
    exit;
}

$to = "info@tersis.lt"; // КУДА ПРИДЕТ ПИСЬМО
$subject = "New Request: " . ($data['from'] ?? 'Website');

$message = "New Quote Request from Tersis.lt\n\n";
$message .= "FROM: " . ($data['from'] ?? '-') . "\n";
$message .= "TO: " . ($data['to'] ?? '-') . "\n";
$message .= "CARGO: " . ($data['cargo'] ?? '-') . "\n";
$message .= "WEIGHT: " . ($data['weight'] ?? '-') . "\n";
$message .= "EMAIL: " . ($data['email'] ?? '-') . "\n\n";
$message .= "MESSAGE: " . ($data['message'] ?? 'No additional notes');

$headers = "From: fornex@tersis.lt\r\n"; // Отправитель (должен быть на твоем домене)
$headers .= "Reply-To: " . $data['email'] . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "ok"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error"]);
}
