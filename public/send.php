<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// 1. Читаем входящий JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "PHP received empty data",
        "raw_input" => $input
    ]);
    exit;
}

// 2. Просто возвращаем данные назад сайту для проверки
echo json_encode([
    "status" => "ok_debug",
    "received_data" => $data,
    "server_time" => date('Y-m-d H:i:s')
]);
