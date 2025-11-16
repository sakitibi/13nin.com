import monster from '../js/tbweta/monster';
import boss from '../js/tbweta/boss';
import witch from '../js/tbweta/witch';
import redWitch from '../js/tbweta/red-witch';
import dominateWitch from '../js/tbweta/dominate-witch';
import skyWitch from '../js/tbweta/sky-witch';
import waterWitch from '../js/tbweta/water-witch';

// eta関連テキスト表示
let     message1 = document.getElementById("message1");
let     message2 = document.getElementById("message2");
let     message3 = document.getElementById("message3");
let etaMessageRandom;

document.getElementById("witch").addEventListener("click", witch);
document.getElementById("red-witch").addEventListener("click", redWitch);
document.getElementById("enemy").addEventListener("click", monster);
document.getElementById("boss").addEventListener("click", boss);
document.getElementById("dominates-witch").addEventListener("click", dominateWitch);
document.getElementById("skys-witch").addEventListener("click", skyWitch);
document.getElementById("water-witch").addEventListener("click", waterWitch);
