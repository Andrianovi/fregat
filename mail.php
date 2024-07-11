<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
//* По сути $name - это данные, заполненные пользователем, из input c id="name"
// $tel и $msg аналогично
$name = $data['name'];
$tel = $data['tel'];
$msg = $data['msg'];
$file = $data['file'];

// Контент письма
$title = 'Заявка с сайта beget'; // Название письма
//* В php соединение строк идёт через ".", именно поэтому строки 21 и 22 кончаются ей
$body = '<p>Имя: <strong style="color:green;">'.$name.'</strong></p>'.
        '<p>Телефон: <strong>'.$tel.'</strong></p>'.
        '<p>Сообщение: <strong>'.$msg.'</strong></p>'.
		  '<div>'.$file.'</div>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.yandex.com'; // SMTP сервера вашей почты
  $mail->Username   = 'andrei43046721@yandex.ru'; // Логин на почте
  $mail->Password   = 'nteikybhpbqzkjtl'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('andrei43046721@yandex.ru', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  //* Товарищ говорит можно отправлять несколько, пробну потом :))))
  $mail->addAddress('andrei43046721@yandex.ru');
  $mail->addAddress('andrei.prog@bk.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение отправлено успешно!');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено! Причина ошибки: {$mail->ErrorInfo}');
}