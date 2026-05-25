<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    $to = "info@tersis.lt";
    $subject = "NEW QUOTE: " . ($data['from'] ?? '?') . " -> " . ($data['to'] ?? '?');

    // Собираем текст письма так, чтобы ничего не пропало
    $message = "New Request from Tersis.lt\n";
    $message .= "---------------------------\n";
    $message .= "FROM: " . ($data['from'] ?? '-') . "\n";
    $message .= "TO: " . ($data['to'] ?? '-') . "\n";
    $message .= "CARGO: " . ($data['cargoType'] ?? '-') . "\n";
    $message .= "WEIGHT: " . ($data['weight'] ?? '-') . "\n";
    $message .= "VOLUME: " . ($data['volume'] ?? '-') . "\n";
    $message .= "NAME: " . ($data['name'] ?? '-') . "\n";
    $message .= "EMAIL: " . ($data['email'] ?? '-') . "\n";
    $message .= "PHONE: " . ($data['phone'] ?? '-') . "\n";
    $message .= "MESSAGE: " . ($data['message'] ?? '-') . "\n";

    $headers = "From: fornex@tersis.lt\r\n";
    $headers .= "Reply-To: " . ($data['email'] ?? 'info@tersis.lt') . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "ok"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error"]);
    }
}
