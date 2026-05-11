export default function dirtWitch(){
  let     message1 = document.getElementById("message1");
  let     message2 = document.getElementById("message2");
  let     message3 = document.getElementById("message3");
  let etaMessageRandom;
  etaMessageRandom = Math.floor(Math.random() * 13);
  message1.innerHTML = '<img src="../enemys/witch/dirtwitch.png" width="400" height="500" onselect="return false" onmousedown="return false">';
  if(etaMessageRandom === 0){
    message2.innerHTML = (`
        <p>ばぁ!</p>
        <p>ヒッヒッヒーッ、</p>
        <p>どう?びっくりした?</p>
        <p>私は土の魔女</p>
        <p>水の魔女の実の姉ですわ</p>
        <p>土を操る魔法と</p>
        <p>魔法で姿を消すのと</p>
        <p>妹と連携するのが得意ですわ</p>
        <p>あなたの命を奪いますわ</p>
        <p>ヒッヒッヒッ、</p>
    `);
  } else if(etaMessageRandom === 1){
    message2.innerHTML = (`
        <p>いっけー!土砂魔法!</p>
        <p>ヒッヒッヒーッ、</p>
    `);
  } else if(etaMessageRandom === 2){
    message2.innerHTML = (`
        <p>いっけー!土砂魔法!</p>
        <p>ヒッヒッヒーッ、</p>
        <p>あなたは女子だから土砂魔法耐性が無いわね〜</p>
        <p>ヒーッヒッヒッヒーッ、</p>
    `);
  } else if(etaMessageRandom === 3){
    message2.innerHTML = (`
        <p>ヒッヒッヒーッ、</p>
        <p>私の体力を回復してやりましたわ</p>
    `);
  } else if(etaMessageRandom === 4){
    message2.innerHTML = (`
        <p>ヒッヒッヒッ、</p>
        <p>土の魔女の杖を強化したわ</p>
    `);
  } else if(etaMessageRandom === 5){
    message2.innerHTML = (`
        <p>ヒッヒッヒッ、</p>
        <p>妹の水の魔女を呼んだわ</p>
    `);
  } else if(etaMessageRandom === 6){
    message2.innerHTML = (`
        <p>え、</p>
        <p>妹が倒れてる..</p>
    `);
  } else if(etaMessageRandom === 7){
    message2.innerHTML = (`
        <p>ヒッヒッヒッ、</p>
        <p>魔法で透明人間になりましたわ</p>
    `);
  } else if(etaMessageRandom === 8){
    message2.innerHTML = (`
        <p>いっけー!凍結魔法!</p>
        <p>ヒッヒッヒーッ、</p>
    `);
  } else if(etaMessageRandom === 9){
    message2.innerHTML = (`
        <p>いっけー!凍結魔法!</p>
        <p>ヒッヒッヒーッ、</p>
        <p>あなたは女子だから凍結魔法耐性が無いわね〜</p>
        <p>ヒーッヒッヒッヒーッ、</p>
        <p>これであなたは永遠に凍るわね〜</p>
    `);
  } else if(etaMessageRandom === 10){
    message2.innerHTML = (`
        <p>水の魔女&土の魔女『</p>
        <p>もうすぐ二人であの恐怖の魔法をかけてやりますわ〜</p>
        <p>ヒーッヒッヒッヒーッ、』</p>
    `);
  } else if(etaMessageRandom === 11){
    message2.innerHTML = (`
        <p>土の魔女「</p>
        <p>妹、準備はいい?</p>
        <p>それじゃー妹、いくわよ〜</p>
        <p>せーの!」<br/>土の魔女&水の魔女
            <span style="font-size: 30px; color: #640dd5">
                『必殺! <span style="color: #07cefa">熱水</span><span style="color: #875607">土</span>魔法!』
            </span>
        </p>
    `);
  } else if(etaMessageRandom === 12){
    message2.innerHTML = (`
        <p>水の魔女&土の魔女</p>
        <p>『あなたは女子だから熱水土耐性が無いわね〜</p>
        <p>ヒーッヒッヒッヒーッ、』</p>
    `);
  }
}
