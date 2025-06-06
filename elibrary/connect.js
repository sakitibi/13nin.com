setInterval(()=>{
  localStorage.getItem("counter");
},50);

let copyright = document.getElementById("copyright")
let osusume = document.getElementsByClassName("osusume")
let date = new Date().getFullYear()
let osusumerandom = Math.floor(Math.random() * 6);

copyright.innerHTML=`${date}`

setInterval(()=>{
  date=new Date().getFullYear()
  copyright.innerHTML=`${date}`
},1e3);

for(let i=0; i < osusume.length; i++){
  switch (osusumerandom){
    default: osusume[i].innerHTML="人狼";
    case 1: osusume[i].innerHTML="アサシン";
    case 2: osusume[i].innerHTML="リモコン";
    case 3: osusume[i].innerHTML="ダブルキラー";
    case 4: osusume[i].innerHTML="イビルゲッサー";
    case 5: osusume[i].innerHTML="イビルシーア";
  }
}
