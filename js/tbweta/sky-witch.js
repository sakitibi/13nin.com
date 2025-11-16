export default function skyWitch(){
  etaMessageRandom = Math.floor(Math.random() * 8);
  message1.innerHTML = '<img src="../enemys/witch/skyswitch.png" width="400" height="400" onselect="return false" onmousedown="return false">';
  if(etaMessageRandom === 0){
    message2.innerHTML = (`
      <p>魔法で空を飛行するわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else if(etaMessageRandom === 1){
    message2.innerHTML = (`
      <p>あなたから魔法でHPを奪い取ったわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else if(etaMessageRandom === 2){
    message2.innerHTML = (`
      <p>姿暗呪術で透明になって姿を消しましたわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else if(etaMessageRandom === 3){
    message2.innerHTML = (`
      <p>あなたを魔法で空に飛ばしたわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else if(etaMessageRandom === 4){
    message2.innerHTML = (`
      <p>あなたを呪術で眠らして操りますわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else if(etaMessageRandom === 5){
    message2.innerHTML = (`
      <p>あなたの視界を呪術で奪いますわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else if(etaMessageRandom === 6){
    message2.innerHTML = (`
      <p>あなたを眠操呪術で操ったわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else {
    message2.innerHTML = "<p>あなたを空から見つけたわよ、ヒェーッヒェッヒェッヒェッ、</p>";
  }
}
