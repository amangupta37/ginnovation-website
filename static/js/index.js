// ------Ginnovation effect----------
const spans = document.querySelectorAll('.word span');

spans.forEach((span, idx) => {
  span.addEventListener('click', (e) => {
    e.target.classList.add('active');
  });
  span.addEventListener('animationend', (e) => {
    e.target.classList.remove('active');
  });

  // Initial animation
  setTimeout(() => {
    span.classList.add('active');
  }, 750 * (idx + 1));
});

//for nav bar
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    $('.bottom-navbar-cf').css({
      padding: '0',
    });
    $('#bottom-navbar-logo').css({
      height: '50',
      width: '130',
    });
    $('.navbar').removeClass('custom-tranparent');
    $('.navbar').addClass('bg-light');
    //sticky join us button
    $('.fixed-join-div').css({
      opacity: '1',
      animation: 'fixed-join-animation-out 1s forwards 0s ease-in-out',
    });
  } else {
    $('.bottom-navbar').css('height', '100px');
    $('#bottom-navbar-logo').css({
      height: '80',
      width: '200',
    });
    $('.navbar').removeClass('bg-light');
    $('.navbar').addClass('custom-tranparent');
    //sticky join us button
    $('.fixed-join-div').css({
      opacity: '0',
      animation: 'none',
    });
  }
}

//for the sticky join us button
$('.fixed-join-div').mouseenter(function (event) {
  $('.fixed-join-div').css(
    'animation',
    'fixed-join-animation 1s forwards 0s ease-in-out'
  );
});
$('.fixed-join-div').mouseleave(function (event) {
  $('.fixed-join-div').css(
    'animation',
    'fixed-join-animation-out 1s forwards 0s ease-in-out'
  );
});
//for the filter gallery
$(document).ready(function () {
  let $btns = $('.gallery-cf .button-group button');

  $btns.click(function (e) {
    $('.gallery-cf .button-group button').removeClass('active');
    e.target.classList.add('active');

    let selector = $(e.target).attr('data-filter');
    $('.gallery-cf .grid').isotope({
      filter: selector,
    });

    return false;
  });
});

// -----for the blog-------------
let images = [
  {
    url: 'images/blog1.png',
  },
  {
    url: 'images/blog2.png',
  },
  {
    url: 'images/blog3.png',
  },
  {
    url: 'images/blog4.png',
  },
  {
    url: 'images/blog5.png',
  },
  {
    url: 'images/blog6.png',
  },
  {
    url: 'images/blog7.png',
  },
  {
    url: 'images/blog8.png',
  },
];
const mainView = document.getElementById('main-view');
const info = document.getElementById('info');

const thumbnails = document.getElementById('thumbnails');

for (let i = 0; i < images.length; i++) {
  let image = images[i];
  let img = document.createElement('img');
  img.src = images[i].url;
  img.setAttribute('width', 170);
  img.setAttribute('data-index', i);
  img.addEventListener('click', changeImage);
  thumbnails.appendChild(img);
}

function initGallery() {
  loadImage(0);
}

function slideImage() {
  let currentIndex = parseInt(mainView.getAttribute('data-index'));
  currentIndex = currentIndex + 1 == images.length ? 1 : currentIndex + 1;
  loadImage(currentIndex);
  setTimeout(slideImage, 5000);
}

function changeImage(event) {
  let target = event.currentTarget;
  let index = target.getAttribute('data-index');
  loadImage(index);
}

function loadImage(index) {
  let image = images[index];
  if (index == 0) {
    $('.main-view,.blog-btn').wrap(
      '<a href="https://disruptorleague.com/2020/05/04/strategies-to-grow-during-a-slowdown-post-covid-19-era/"></a>'
    );
  }
  if (index == 1) {
    $('.main-view,.blog-btn').wrap(
      '<a href="https://disruptorleague.com/2020/05/04/heres-how-you-can-come-up-with-outside-the-box-innovations/"></a>'
    );
  }
  if (index == 2) {
    $('.main-view,.blog-btn').wrap(
      '<a href="https://disruptorleague.com/2020/02/29/forget-your-business-plan-create-a-strategy-map/"></a>'
    );
  }
  if (index == 3) {
    $('.main-view,.blog-btn').wrap(
      '<a href="https://disruptorleague.com/2020/04/14/the-evolution-of-educational-technology/"></a>'
    );
  }
  if (index == 4) {
    $('.main-view,.blog-btn').wrap(
      '<a href="https://disruptorleague.com/2020/03/30/7-strategies-for-online-learning-during-the-coronavirus-outbreak/"></a>'
    );
  }
  if (index == 5) {
    $('.main-view,.blog-btn').wrap(
      '<a href="https://disruptorleague.com/2020/03/07/enablers-aggregators-interfaces-making-sense-of-the-technology-that-powers-big-data-in-healthcare/"></a>'
    );
  }
  if (index == 6) {
    $('.main-view,.blog-btn').wrap(
      '<a href="https://disruptorleague.com/2020/03/05/10-rules-of-digital-transformation/"></a>'
    );
  }
  if (index == 7) {
    $('.main-view,.blog-btn').wrap(
      '<a href="https://disruptorleague.com/2020/02/19/innovation-and-its-effect-on-world-of-photography/"></a>'
    );
  }
  mainView.src = image.url;
  mainView.setAttribute('data-index', index);
  mainView.setAttribute('id', 'image-' + index);
  mainView.style.opacity = 1;
}
initGallery();
setTimeout(slideImage, 5000);
