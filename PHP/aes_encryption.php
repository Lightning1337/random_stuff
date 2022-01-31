<?php


function Decrypt($Encrypted, $Password) {
	$Data = explode(":", $Encrypted);
    $Salt = base64_decode($Data[0]);
    $IV = base64_decode($Data[1]);
    $DecryptionKey = hex2bin(hash_pbkdf2("sha256", $Password, $Salt, 15000, 64));
    return openssl_decrypt($Data[2], "AES-256-CBC", $DecryptionKey, 0, $IV);
}

function Encrypt($Text, $Password) {
    $Salt = openssl_random_pseudo_bytes(32);
    $IV = openssl_random_pseudo_bytes(openssl_cipher_iv_length("AES-256-CBC"));
    $EncryptionKey = hex2bin(hash_pbkdf2("sha256", $Password, $Salt, 15000, 64));
    $Encrypted = openssl_encrypt($Text, "AES-256-CBC", $EncryptionKey, 0, $IV);
    return base64_encode($Salt) . ":" . base64_encode($IV) . ":" . $Encrypted;
}

$a = Encrypt("T", "TEST");
echo Decrypt($a, "TEST");