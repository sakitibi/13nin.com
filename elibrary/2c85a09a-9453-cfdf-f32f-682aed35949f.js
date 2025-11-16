import monster from '../js/tbweta/monster.js';
import boss from '../js/tbweta/boss.js';
import witch from '../js/tbweta/witch.js';
import redWitch from '../js/tbweta/red-witch.js';
import dominateWitch from '../js/tbweta/dominate-witch.js';
import skyWitch from '../js/tbweta/sky-witch.js';
import waterWitch from '../js/tbweta/water-witch.js';

// eta関連テキスト表示
document.getElementById("witch").addEventListener("click", witch);
document.getElementById("red-witch").addEventListener("click", redWitch);
document.getElementById("enemy").addEventListener("click", monster);
document.getElementById("boss").addEventListener("click", boss);
document.getElementById("dominates-witch").addEventListener("click", dominateWitch);
document.getElementById("skys-witch").addEventListener("click", skyWitch);
document.getElementById("water-witch").addEventListener("click", waterWitch);
