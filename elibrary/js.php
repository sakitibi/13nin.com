<?php
header('Content-Type: application/x-javascript; charset=utf-8');
$date = date('Y/m/d H:i:s');

$script = <<< EOF
function displayServerDatetime(){
    alert('{$date}');
}
EOF;

echo $script;
