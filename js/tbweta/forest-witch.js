export default function forestWitch(){
  let     message1 = document.getElementById("message1");
let     message2 = document.getElementById("message2");
let     message3 = document.getElementById("message3");
let etaMessageRandom;
export default function waterWitch(){
  etaMessageRandom = Math.floor(Math.random() * 7);
  message1.innerHTML = '<img src="../enemys/witch/forestwitch.png" width="400" height="400" onselect="return false" onmousedown="return false">';
  if(etaMessageRandom === 0){
    message2.innerHTML = (`
      <p>森の魔女「クックックッ、魔法でバリアを張り、進路を妨害したり、<br/>
      悪魔の呪いで他の村人を殺したりしたのもこの私ですわ〜」</p>
      <p>あなたと女魔法使いも悪魔の呪いで殺してやりますわ〜</p>
      <p>クーックックックックッ、</p>
    `);
  } else if(etaMessageRandom === 1){
    message2.innerHTML = (`
      <p>森の魔女「クックックッ、魔法でバリアを張り、進路を妨害したり、<br/>
      悪魔の呪いで他の村人を殺したりしたのもこの私ですわ〜」</p>
      <p>どうやって気付かれないように悪魔の呪いをかけたって?</p>
      <p>それは夜になったら隠れて透明になってこっそりと</p>
      <p>後から近ずいて悪魔の呪いをかけたわ〜</p>
      <p>私の巧妙な嘘は誰も気付けなかったから</p>
      <p>私から名乗り出てやりましたわ〜</p>
      <p>あなたと女魔法使いも悪魔の呪いで殺してやりますわ〜</p>
      <p>クーックックックックッ、</p>
    `);
  } else if(etaMessageRandom === 2){
    message2.innerHTML = (`
        <p>クックックッ、魔法で体を透明にしましたわ〜</p>
    `);
  } else if(etaMessageRandom === 3){
    message2.innerHTML = (`
        <p>クックックッ、</p>
        <p>あなたの体に樹木を生やしたわ〜</p>
    `);
  } else if(etaMessageRandom === 4){
    message2.innerHTML = (`
        <p>クックックッ、</p>
        <p>森の魔女の杖を強化したわ</p>
    `);
  } else if(etaMessageRandom === 5){
    message3.innerHTML = (`
        <p>クックックッ、</p>
        <p>あなたに体が腐る悪魔の病をかけたわ〜</p>
    `);
  } else if(etaMessageRandom === 6){
    message3.innerHTML = (`
        <p>クックックッ、</p>
        <p>あなたに強力な催眠術をかけたわ〜</p>
    `);
  }
}
