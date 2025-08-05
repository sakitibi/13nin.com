			// eta関連テキスト表示
            let     message1 = document.getElementById("message1");
            let     message2 = document.getElementById("message2");
            let     message3 = document.getElementById("message3");
            let etaMessageRandom;

				document.getElementById("witch").addEventListener("click", function(){
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
                });
				document.getElementById("red-witch").addEventListener("click", function(){
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
                });
				document.getElementById("enemy").addEventListener("click", function(){
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
                });
				document.getElementById("boss").addEventListener("click", function(){
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
                });
                document.getElementById("dominates-witch").addEventListener("click", function(){
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
                });
                document.getElementById("skys-witch").addEventListener("click", function(){
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
                });
