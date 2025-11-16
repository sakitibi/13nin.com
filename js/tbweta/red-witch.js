export default function redWitch(){
  etaMessageRandom = Math.floor(Math.random() * 4);
  message1.innerHTML = '<img src="https://th.bing.com/th/id/OIP.1l2CqH940epVbfy04Op1tgHaLH?pid=ImgDet&w=202&h=303&c=7&dpr=2" width="400" height="400" onselect="return false" onmousedown="return false">';
  if(etaMessageRandom === 0){
    message2.innerHTML = '<p>あなたには呪文をかけてあげましょう</p>';
  } else if(etaMessageRandom === 1){
    message2.innerHTML = '<button id="redwitch-eta-1" disabled>あなたには最大HPが2倍になる魔法をかけましょう</button>';
  } else if(etaMessageRandom === 2){
    message2.innerHTML = '<p>左から2番目のボタンは私が魔法で使えなくしましたわよ</p>';
  } else {
    message2.innerHTML = '<p>私は夜の時の魔法が強力ですよ</p>';
  }
}
