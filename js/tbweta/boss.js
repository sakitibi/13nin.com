let     message1 = document.getElementById("message1");
let     message2 = document.getElementById("message2");
let     message3 = document.getElementById("message3");
let etaMessageRandom;
export default function boss(){
  etaMessageRandom = Math.floor(Math.random() * 4);
  message1.innerHTML = '<img src="../enemys/boss.png" width="400" height="400" onselect="return false" onmousedown="return false">';
  if(etaMessageRandom === 0){
    message2.innerHTML = '<p>ボスキャラで一番弱いんだけど..</p>';
  } else if(etaMessageRandom === 1){
    message2.innerHTML = '<p>なんでボスなのに魔法が使えないんだよ</p>';
  } else if(etaMessageRandom === 2){
    message2.innerHTML = '<p>サイズ一番大きいし、人じゃないし、</p>';
  } else {
    message2.innerHTML = '<p>自分ただHPが若干高いだけ..</p>';
  }
}
