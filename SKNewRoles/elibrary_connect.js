	// ページとゲームの変数をeライブラリに保存
	import * as ElibraryAPI from "https://sakitibi.github.io/12nin.com/elibrary/connect.min.js";

	let SKNewRolesAnalytics = document.getElementsByClassName("elibanalytics");
	let Counter = localStorage.getItem("counter");
	if (Counter === undefined){
	    Counter = 0;
	    localStorage.setItem("counter", Counter);
	}
	for (let i = 0; i < SKNewRolesAnalytics.length; i++) {
	    SKNewRolesAnalytics[i].addEventListener("click", function() {
		Counter+=1;
		localStorage.setItem("counter", Counter);
	    });
	}
	export { SKNewRolesAnalytics }
