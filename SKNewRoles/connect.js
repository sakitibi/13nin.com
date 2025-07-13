	document.getElementById("download").addEventListener("click", function() {
	    location.href = "./download";
	});

	document.getElementById("langages").addEventListener("click", function() {
	    location.href = "./開発言語";
	});

	document.getElementById("credit").addEventListener("click", function() {
	    location.href = "./CREDIT";
	});
	
  let SKNewRolesAnalytics = document.getElementsByClassName("elibanalytics");
	let Counter = localStorage.getItem("counter");
	if (typeof Counter !== 'number'){
	    Counter = 0;
	    localStorage.setItem("counter", Counter);
	    document.cookie = `counter=${Counter} max-age=2147483647`;
	}
	for (let i = 0; i < SKNewRolesAnalytics.length; i++) {
	    SKNewRolesAnalytics[i].addEventListener("click", function() {
		Counter+=1;
		localStorage.setItem("counter", Counter);
		document.cookie = `counter=${Counter} max-age=2147483647`;
	    });
	}
