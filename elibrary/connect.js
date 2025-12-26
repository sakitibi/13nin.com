setInterval(()=>{
  localStorage.getItem("counter");
},50);

let copyright = document.getElementById("copyright")
let osusume = document.getElementsByClassName("osusume")
let date = new Date().getFullYear()
let osusumerandom = Math.floor(Math.random() * 7);

copyright.innerHTML=`${date}`

setInterval(()=>{
  date=new Date().getFullYear()
  copyright.innerHTML=`${date}`
},1e3);

for(let i=0; i < osusume.length; i++){
  switch (osusumerandom){
    default: osusume[i].innerHTML="人狼"; break;
    case 1: osusume[i].innerHTML="アサシン"; break;
    case 2: osusume[i].innerHTML="リモコン"; break;
    case 3: osusume[i].innerHTML="ダブルキラー"; break;
    case 4: osusume[i].innerHTML="イビルゲッサー"; break;
    case 5: osusume[i].innerHTML="イビルシーア"; break;
    case 6: osusume[i].innerHTML="コミュナー"; break;
    case 7: osusume[i].innerHTML="ポイゾナー"; break;
  }
}
