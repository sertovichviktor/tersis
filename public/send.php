<?php
// 1. Разрешаем запросы с твоего сайта (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Обработка предварительного запроса браузера (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No data provided"]);
        exit;
    }

    // КУДА ПРИДЕТ ПИСЬМО
    $to = "info@tersis.lt"; 
    
    $subject = "NEW QUOTE: " . ($data['from'] ?? '?') . " -> " . ($data['to'] ?? '?');
    
    // Формируем текст письма
    $message = "
    TERSIS WEBSITE MESSAGE:
    -----------------------
    ROUTE:   " . ($data['from'] ?? '-') . " -> " . ($data['to'] ?? '-') . "
    CARGO:   " . ($data['cargoType'] ?? '-') . "
    SPECS:   " . ($data['weight'] ?? '-') . " kg | " . ($data['volume'] ?? '-') . " m3
    DATE:    " . ($data['deadline'] ?? 'Not specified') . "
    
    CLIENT INFO:
    ------------
    Name:    " . ($data['name'] ?? '-') . "
    Email:   " . ($data['email'] ?? '-') . "
    Phone:   " . ($data['phone'] ?? '-') . "
    
    COMMENTS:
    " . ($data['message'] ?? 'No comments') . "
    -----------------------
    Sent from: " . $_SERVER['HTTP_HOST'] . "
    ";

    // ПРАВИЛЬНЫЕ ЗАГОЛОВКИ (используем твой fornex@tersis.lt)
    $from = "fornex@tersis.lt"; 
    $headers = "From: TERSIS Website <" . $from . ">\r\n";
    $headers .= "Reply-To: " . ($data['email'] ?? $from) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Отправка
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "ok"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Server failed to send email"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>
