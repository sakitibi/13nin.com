let     message1 = document.getElementById("message1");
let     message2 = document.getElementById("message2");
let     message3 = document.getElementById("message3");
let etaMessageRandom;
export default function monster(){
  etaMessageRandom = Math.floor(Math.random() * 4);
    message1.innerHTML = "";
  if(etaMessageRandom === 0){
    message2.innerHTML = '<p>自分がモンスターの中一番弱いんだってよ</p>';
  } else if(etaMessageRandom === 1){
    message2.innerHTML = '<p>うわ、プレイヤー強そう、</p>';
  } else if(etaMessageRandom === 2){
    message2.innerHTML = '<p>プレイヤー逃げてくれ、</p>';
  } else {
    message2.innerHTML = '<p>てかなんで自分らだけ画像が1つしか無いん</p>';
  }
}
