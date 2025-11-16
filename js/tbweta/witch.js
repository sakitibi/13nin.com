export default function witch(){
  etaMessageRandom = Math.floor(Math.random() * 4);
  message1.innerHTML = '<img src="https://th.bing.com/th/id/OIP.gbnHaG_CL6V9g_ZNVkn7aAHaJ4?pid=ImgDet&w=202&h=269&c=7&dpr=2" width="400" height="400" onselect="return false" onmousedown="return false">';
  if(etaMessageRandom === 0){
    message2.innerHTML = '<p>あなたを呪いましょうか</p>';
  } else if (etaMessageRandom === 1){
    message2.innerHTML = '<p>あなたを凍らせましょうか</p>';
  } else if (etaMessageRandom === 2){
    message2.innerHTML = '<p>あなたにはこんな魔法をかけましょう</p>';
  } else {
    message2.innerHTML = '<button id="witch-eta-3" disabled>あなたにはレベルが4倍になる魔法をかけましょう</button>';
  }
}
