<?php 
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$adress = $_POST['adress'];
$social = $_POST['social'];
$view = $_POST['view'];
$productname = $_POST['productname'];

$to  = "<sendtopepper@gmail.com>, " ; 
// $to .= "<sendtopepper@gmail.com>"; 

$subject = "Заявка с сайта"; 
$message = '

<p><strong>Имя:</strong> '.$name.';</p>
<p><strong>E-mail:</strong> '.$email.';</p>
<p><strong>Телефон:</strong> '.$phone.';</p>
<p><strong>Адрес:</strong> '.$adress.';<p>
<p><strong>Соцсети:</strong> '.$social.';<p>
<p><strong>Отзыв:</strong> '.$view.';<p>
<p><strong>Товары:</strong>
 <div>'.$productname.';</div>
<p/>

';

$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: От кого письмо <kanken@gmail.com>\r\n"; 
$headers .= "Reply-To: reply-kanekn@gmail.com\r\n"; 

mail($to, $subject, $message, $headers); 
?>


<script>
window.location.replace('/');
</script>
