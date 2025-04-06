window.setInterval(Alert, 5000);

let count = 5;
alert("名前は長い方が有利戦争の応戦にご協力をお願い致します。").addEventListener('click', function(){
    window.setInterval(function(){
        console.log(count + '秒経過');
        alert("名前は長い方が有利戦争の応戦にご協力をお願い致します。");
        count += 5;
    }, 5000);
});
