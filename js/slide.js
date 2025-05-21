var slide = document.getElementById('slider');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var list1 = document.getElementById('list1');
var list2 = document.getElementById('list2');
var list3 = document.getElementById('list3');
var list4 = document.getElementById('list4');
var list5 = document.getElementById('list5');

// クリックイベント

next.addEventListener('click', nextClick);
prev.addEventListener('click', prevClick);

function nextClick() {
  if (slide.classList.contains('slider1') === true) {
    slide.classList.remove('slider1');
    slide.classList.add('slider2');
    list1.style.backgroundColor = 'transparent';
    list2.style.backgroundColor = '#000';
    count = 0;
  } else if (slide.classList.contains('slider2') === true) {
    slide.classList.remove('slider2');
    slide.classList.add('slider3');
    list2.style.backgroundColor = 'transparent';
    list3.style.backgroundColor = '#000';
    count = 0;
  } else if (slide.classList.contains('slider3') === true) {
    slide.classList.remove('slider3');
    slide.classList.add('slider4');
    list3.style.backgroundColor = 'transparent';
    list4.style.backgroundColor = '#000';
    count = 0;
  } else if (slide.classList.contains('slider4') === true) {
    slide.classList.remove('slider4');
    slide.classList.add('slider5');
    list4.style.backgroundColor = 'transparent';
    list5.style.backgroundColor = '#000';
    count = 0;
  } else {
    slide.classList.remove('slider5');
    slide.classList.add('slider1');
    list5.style.backgroundColor = 'transparent';
    list1.style.backgroundColor = '#000';
    count = 0;
  }
};

function prevClick() {
  if (slide.classList.contains('slider5') === true) {
    slide.classList.remove('slider5');
    slide.classList.add('slider4');
    list1.style.backgroundColor = 'transparent';
    list4.style.backgroundColor = '#000';
    count = 0;
  } else if (slide.classList.contains('slider1') === true) {
    slide.classList.remove('slider1');
    slide.classList.add('slider5');
    list2.style.backgroundColor = 'transparent';
    list1.style.backgroundColor = '#000';
    count = 0;
  } else if (slide.classList.contains('slider2') === true) {
    slide.classList.remove('slider2');
    slide.classList.add('slider1');
    list2.style.backgroundColor = 'transparent';
    list1.style.backgroundColor = '#000';
    count = 0;
  } else if (slide.classList.contains('slider3') === true) {
    slide.classList.remove('slider3');
    slide.classList.add('slider2');
    list3.style.backgroundColor = 'transparent';
    list2.style.backgroundColor = '#000';
    count = 0;
  } else {
    slide.classList.remove('slider4');
    slide.classList.add('slider3');
    list4.style.backgroundColor = 'transparent';
    list3.style.backgroundColor = '#000';
    count = 0;
  }
};

// インジケーター

list1.addEventListener('click', click1);
list2.addEventListener('click', click2);
list3.addEventListener('click', click3);
list4.addEventListener('click', click4);
list5.addEventListener('click', click5);

function click1() {
  slide.classList.add('slider1');
  slide.classList.remove('slider2');
  slide.classList.remove('slider3');
  slide.classList.remove('slider4');
  list1.style.backgroundColor = '#000';
  list2.style.backgroundColor = 'transparent';
  list3.style.backgroundColor = 'transparent';
  list4.style.backgroundColor = 'transparent';
}

function click2() {
  slide.classList.remove('slider1');
  slide.classList.add('slider2');
  slide.classList.remove('slider3');
  slide.classList.remove('slider4');
  list1.style.backgroundColor = 'transparent';
  list2.style.backgroundColor = '#000';
  list3.style.backgroundColor = 'transparent';
  list4.style.backgroundColor = 'transparent';
}

function click3() {
  slide.classList.remove('slider1');
  slide.classList.remove('slider2');
  slide.classList.add('slider3');
  slide.classList.remove('slider4');
  list1.style.backgroundColor = 'transparent';
  list2.style.backgroundColor = 'transparent';
  list3.style.backgroundColor = '#000';
  list4.style.backgroundColor = 'transparent';
}

function click4() {
  slide.classList.remove('slider1');
  slide.classList.remove('slider2');
  slide.classList.remove('slider3');
  slide.classList.add('slider4');
  list1.style.backgroundColor = 'transparent';
  list2.style.backgroundColor = 'transparent';
  list3.style.backgroundColor = 'transparent';
  list4.style.backgroundColor = '#000';
}
