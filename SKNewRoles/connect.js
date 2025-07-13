	document.getElementById("download").addEventListener("click", function() {
	    location.href = "./download";
	});
	
  let SKNewRolesAnalytics = document.getElementsByClassName("elibanalytics");
	let Counter = localStorage.getItem("counter");
	if (Counter === undefined){
	    Counter = 0;
	    localStorage.setItem("counter", Counter);
	    document.cookie = `counter=${Counter}`;
	}
	for (let i = 0; i < SKNewRolesAnalytics.length; i++) {
	    SKNewRolesAnalytics[i].addEventListener("click", function() {
		Counter+=1;
		localStorage.setItem("counter", Counter);
		document.cookie = `counter=${Counter}`;
	    });
	}
