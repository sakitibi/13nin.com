let     message1 = document.getElementById("message1");
let     message2 = document.getElementById("message2");
let     message3 = document.getElementById("message3");
let etaMessageRandom;
export default function dominateWitch(){
  etaMessageRandom = Math.floor(Math.random() * 24);
  message1.innerHTML = '<img src="../enemys/witch/dominateswitch.png" width="400" height="400" onselect="return false" onmousedown="return false">';
  if(etaMessageRandom === 0){
    message2.innerHTML = '<p>あなたを魔法で凍らせたわ</p>';
  } else if(etaMessageRandom === 1){
    message2.innerHTML = '<p>あなたから魔法でHPを奪い取ったわ</p>';
  } else if(etaMessageRandom === 2){
    message2.innerHTML = '<p>普通の女に服従の呪文をかけてやりましたわ</p>';
  } else if(etaMessageRandom === 3){
    message2.innerHTML = '<p>魔法で昼から夜にしたわ</p>';
  } else if(etaMessageRandom === 4){
    message2.innerHTML = '<p>あなたを女の子にしてやりましたわ</p>';
  } else if(etaMessageRandom === 5){
    message2.innerHTML = '<p>プレイヤーから通貨を2倍取れましたわ!</p>';
  } else if(etaMessageRandom === 6){
    message2.innerHTML = (`
      <p>プレイヤーから通貨を2倍取って</p>
      <p>HPを減らしましたわ!</p>
    `);
  } else if(etaMessageRandom === 7){
    message2.innerHTML = (`
      <p>服従の魔女「ヒェーッヒェッヒェッヒェッ、</p>
      <p>服従の魔法で普通の女を服従してましたわ</p>
      <p>あなたにも服従の魔法をかけちゃうよ</p>
      <p>私は服従の魔女、</p>
      <p>こっそり人に近ずいて悪魔の呪文をかけて</p>
      <p>気付かれないように体をじわじわ弱らせて</p>
      <p>苦しませて最終的に命を奪うのと</p>
      <p>人を服従させて心を操る魔法が得意ですわ</p>
      <p>さあ、プレイヤーよ、かかってこい！」</p>
    `);
  } else if(etaMessageRandom === 8){
    message2.innerHTML = (`
      <p>プレイヤーにはもう魔の呪文を</p>
      <p>かけていたみたいですわ!</p>
    `);
  } else if(etaMessageRandom === 9){
    message2.innerHTML = (`
      <p>プレイヤーにはすでに</p>
      <p>効果を与えても気付か無い</p>
      <p>悪魔の呪文をかけていましたわ</p>
    `);
  } else if(etaMessageRandom === 10){
    message2.innerHTML = (`
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>プレイヤーに見つからないように</p>
      <p>魔の呪文をかけましたわ!</p>
    `);
  } else if(etaMessageRandom === 11){
    message2.innerHTML = (`
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>効果を与えても絶対に気付か無い</p>
      <p>悪魔の呪文の効果を強めるぜ!</p>
    `);
  } else if(etaMessageRandom === 12){
    message2.innerHTML = (`
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>プレイヤーに見つからないように</p>
      <p>効果を与えても気付か無い</p>
      <p>悪魔の呪文をかけるぜ!</p>
    `);
  } else if(etaMessageRandom === 13){
    message2.innerHTML = (`
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else if(etaMessageRandom === 14){
    message2.innerHTML = (`
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>プレイヤーに見つからないように</p>
      <p>プレイヤーに効果を与えても気付か無い</p>
      <p>悪魔の呪文をかけたぜ</p>
      <p>これでプレイヤーは呪われたな</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
    message3.innerHTML = (`
      <p>どうする?解除しないと私に操つられますわよ</p>
      <p>あと画面表示が昼の時も実は夜だったのも気付いたかな?</p>
      <p>ヒェーッヒェッヒェッヒェッ、」</p>
    `);
    setTimeout(() => {
      message3.innerHTML = "";
    }, 10000);
  } else if(etaMessageRandom === 15){
    message2.innerHTML = (`
      <p>服従の魔女「ヒェーッヒェッヒェッヒェッ、</p>
      <p>あなたは悪魔の呪文にかかっている事に</p>
      <p>気付いたかな?</p>
      <p>だってもうどんどんHPとMPが減っているんですもの</p>
      <p>解除したいならこのボタンを押したらどうですか</p>
      <p>やられても解除出来ませんよ</p>
      <button id="devilcurseremoved" disabled aria-disabled>悪魔の呪文を解除する</button>
    `);
  } else if(etaMessageRandom === 16){
    message2.innerHTML = '<p>悪魔の呪文を解除しましたわよ</p>';
    message3.innerHTML = '<p>でもまたあなたが知らないうちに悪魔の呪文をまたかけてますけどね</p>';
    setTimeout(() => {
      message3.innerHTML = "";
    }, 10000);
  } else if(etaMessageRandom === 17){
    message2.innerHTML = '<p>あなたを私の魔の呪文で完全に服従させましたわ</p>';
  } else if(etaMessageRandom === 18){
    message2.innerHTML = '<p>やられちゃった</p>';
  } else if(etaMessageRandom === 19){
    message2.innerHTML = (`
      <p>ヒェッヒェッヒェッ、</p>
      <p>プレイヤーを魔の心死呪術で呪いましたわ</p>
    `);
  } else if(etaMessageRandom === 20){
    message2.innerHTML = (`
      <p>ヒェッヒェッヒェッ、</p>
      <p>プレイヤーを魔の命死呪術で呪いましたわ</p>
    `);
  } else if(etaMessageRandom === 21){
    message2.innerHTML = (`
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>見つからないように</p>
      <p>プレイヤーに悪魔の眼妨呪術をかけましたわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else if(etaMessageRandom === 22){
    message2.innerHTML = (`
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>プレイヤーを悪魔の心眠呪術で呪いましたわ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  } else {
    message2.innerHTML = (`
      <p>ヒェーッヒェッヒェッヒェッ、</p>
      <p>見つからないように</p>
      <p>プレイヤーを悪魔の命奪呪術で呪いましたわ</p>
      <p>最大でも見つかりませんよ</p>
      <p>ヒェーッヒェッヒェッヒェッ、</p>
    `);
  }
}
