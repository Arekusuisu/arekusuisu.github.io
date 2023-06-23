<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$question = $_POST['question'];

if (empty($question)) {
    http_response_code(400);
    echo json_encode(array("error" => "La pregunta está vacía"));
    exit;
}

$api_key = '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'; // Reemplaza con tu clave de API válida

$url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
$data = array(
    "prompt" => "Pregunta: " . $question . "\nRespuesta:",
    "max_tokens" => 100
);
$options = array(
    'http' => array(
        'header' => "Content-Type: application/json\r\n" .
                    "Authorization: Bearer " . $api_key,
        'method' => 'POST',
        'content' => json_encode($data)
    )
);
$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === false) {
    http_response_code(500);
    echo json_encode(array("error" => "Error al comunicarse con la API de OpenAI"));
    exit;
}

$response_data = json_decode($response, true);

if (isset($response_data['choices'][0]['text'])) {
    $answer = $response_data['choices'][0]['text'];
    echo json_encode(array("answer" => $answer));
} else {
    http_response_code(500);
    echo json_encode(array("error" => "No se pudo obtener una respuesta del chatbot"));
}
