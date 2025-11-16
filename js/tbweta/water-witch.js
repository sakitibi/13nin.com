let     message1 = document.getElementById("message1");
let     message2 = document.getElementById("message2");
let     message3 = document.getElementById("message3");
let etaMessageRandom;
export default function waterWitch(){
  etaMessageRandom = Math.floor(Math.random() * 13);
  message1.innerHTML = '<img src="../enemys/witch/water-witch.png" width="400" height="400" onselect="return false" onmousedown="return false">';
  if(etaMessageRandom === 0){
  	message2.innerHTML = (`
  		<p>ヒッヒッヒーッ、</p>
  		<p>私は水の魔女</p>
  		<p>土の魔女の実の妹ですわ</p>
  		<p>水を操る魔法と</p>
  		<p>少女に化けるのと</p>
  		<p>姉と連携するのが得意ですわ</p>
  		<p>あなたをを水や毒で命を奪いますわ</p>
  		<p>ヒッヒッヒッ、</p>
  	`);
  } else if(etaMessageRandom === 1){
  	message2.innerHTML = (`
  		<p>いっけー!波魔法!</p>
  		<p>ヒッヒッヒーッ、</p>
  	`);
  } else if(etaMessageRandom === 2){
  	message2.innerHTML = (`
  		<p>いっけー!波魔法!</p>
  		<p>ヒッヒッヒーッ、</p>
  		<p>あなたは女子だから波魔法耐性が無いわね〜</p>
  		<p>ヒーッヒッヒッヒーッ、</p>
  	`);
  } else if(etaMessageRandom === 3){
  	message2.innerHTML = (`
  		<p>渦よ!あなたを包めー!</p>
  		<p>ヒッヒッヒーッ、</p>
  	`);
  } else if(etaMessageRandom === 4){
  	message2.innerHTML = (`
  		<p>渦よ!${username}を包めー!</p>
  		<p>ヒッヒッヒーッ、</p>
  		<p>あなたは女子だから渦魔法耐性が無いわね〜</p>
  		<p>ヒーッヒッヒッヒーッ、</p>
  	`);
  } else if(etaMessageRandom === 5){
  	message2.innerHTML = (`
  		<p>ヒッヒッヒッ、</p>
  		<p>水の魔女の杖を強化したわ</p>
  	`);
  } else if(etaMessageRandom === 6){
  	message2.innerHTML = (`
  		<p>毒よ!あなたを蝕めー!</p>
  		<p>ヒッヒッヒーッ、</p>
  	`);
  } else if(etaMessageRandom === 7){
  	message2.innerHTML = (`
  		<p>毒よ!あなたを腐らせー!</p>
  		<p>ヒッヒッヒーッ、</p>
  		<p>あなたは女子だから腐食耐性が無いわね〜</p>
  		<p>これであなたを腐らせ放題</p>
  		<p>ヒーッヒッヒッヒーッ、</p>
  	`);
  } else if(etaMessageRandom === 8){
  	message2.innerHTML = (`
  		<p>いっけー!熱水魔法!</p>
  		<p>ヒッヒッヒッ、</p>
  	`);
  } else if(etaMessageRandom === 9){
  	message2.innerHTML = (`
  		<p>いっけー!熱水魔法!</p>
  		<p>ヒッヒッヒッ、</p>
  		<p>あなたは女子だから熱水耐性が無いわね〜</p>
  		<p>ヒーッヒッヒッヒーッ、</p>
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
