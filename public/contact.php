<?php

declare(strict_types=1);

const RECIPIENT = 'hello@clemlatz.dev';
const REDIRECT_URL = '/merci.html';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    exit('Missing required fields');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Invalid email address');
}

$mailSubject = '[Formulaire de contact] ' . $subject;
$mailBody = "Nom : $name\nE-mail : $email\n\n$message";
$headers = [
    'From: ' . RECIPIENT,
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

mail(RECIPIENT, $mailSubject, $mailBody, implode("\r\n", $headers));

header('Location: ' . REDIRECT_URL, true, 303);
