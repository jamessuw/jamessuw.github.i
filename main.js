$(document) .ready(function () {
  $('.menu-toggler').on('click', function () {
    $(this).toggleClass('open');
    $('.top-nav'). toggleClass('open');
  });

    $('.top-nav .nav-link').on('click', function() {
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    $('nav a[href*="#"]').on('click', function() {
        $('html, body').animate(keyframes = {
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, options = 2000);
    });
    $('#up').on('click', function() {
        $('html, body').animate(keyframes = {
            scrollTop: 0
        }, options = 2000);


    });
    AOS.init({
        easing: 'ease',
        duration: 1800,
        
    }); 
      $('.skill-per').each(function(){
        var $this = $(this);
        var per = $this.attr('per');
        $this.css("width",per+'%');
        $({animatedValue: 0}).animate({animatedValue: per},{
          duration: 5000,
          step: function(){
            $this.attr('per', Math.floor(this.animatedValue) + '%');
          },
          complete: function(){
            $this.attr('per', Math.floor(this.animatedValue) + '%');
          }
         
  
        });

    });

  });
const checkpoint = 0;
 
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint;
  } else {
    opacity = 0;
  }
  document.querySelector(".welcome-heading").style.opacity = opacity;
});

var cursor = document.getElementById('cursor')
document.addEventListener('mousemove', function(event){
  var x = event.clientX;
  var y = event.clientY;
  cursor.style.left = x + "px"
  cursor.style.top = y + "px"
})



const rc = chars => chars[Math.floor(Math.random() * chars.length)];
const defaultOptions = {
  time: 5000,
  cycle: true,
  characters: "!@#$%^&*-_=+\\/",
  chance: 0.5,
  fpsCounter: null
};

class Scrambler {
  constructor(text, element, options = {}) {
    // Reverse the string array so that text is displayed the order it was provided
    this.text = text;
    this.element = element;
    this.options = Object.assign({}, defaultOptions, options);
    
    this.updateFrame = this.updateFrame.bind(this);
  }
  
  start(stopAfter = 0) {
    // Keep track of the words displayed already
    this.history = [];
    this.stopped = false;
    let totalCycles = 0;
    
    const iterate = (iteration = 0) => {
      if (stopAfter && stopAfter > 0 && totalCycles >= stopAfter) {
        this.stop();
      }

      return setTimeout(() => {
        this.queuePhrase(this.text[iteration], iteration);
        this.history.push(this.text[iteration]);
        totalCycles++;

        if (!this.stopped)
          iterate((iteration + 1) % this.text.length);
      }, this.options.time);
    };
    
    // Start recursing
    this.timeout = iterate();
    
    return () => {
      this.stop();
    };
  }
  
  stop() {
    this.stopped = true;
    
    if (this.timeout)
      clearTimeout(this.timeout);
  }
  
  queuePhrase(phrase, iteration) {
    this.queue = [];
    this.frame = 0;
    
    const lastPhrase = this.history.pop() || "";
    let longer = lastPhrase.length > phrase.length ? lastPhrase.length : phrase.length;
    
    for (let i = 0; i < longer; i++) {
      const oldCharacter = lastPhrase[i] || "";
      const newCharacter = phrase[i] || "";
      
      // Start transforming chars within the first 50 frames and
      // end somewhere within 50 frames after starting transforms.
      const startTransformation = Math.floor(Math.random() * 30);
      const endTransformation = Math.floor(Math.random() * 30) + startTransformation;
      
      this.queue.push({
        oldCharacter, newCharacter, startTransformation, endTransformation
      });
    }
    
    cancelAnimationFrame(this.nextFrame);
    this.updateFrame();
  }
  
  updateFrame() {
    let display = "";
    let char;
    let charactersProcessed = 0;
    
    this.queue = this.queue.map(process => {
      const { oldCharacter, newCharacter, startTransformation, endTransformation, character } = process;
      
      if (this.frame < startTransformation) {
        display += oldCharacter;
        
        return process;
      }
      
      if (this.frame > endTransformation) {
        display += newCharacter;
        charactersProcessed++;
        
        return process;
      }

      // If there is a character just display it.
      if (character) {
        char = character;
        display += `<span style="color: Black;">${character}</span>`;
        return process;
      }
 
      if (Math.random() <= this.options.chance) {
        char = rc(this.options.characters);
      }

      display += `${oldCharacter}`;
      
      return Object.assign({}, process, { character: char });
    });
    
    this.updateElement(display);
    
    if (charactersProcessed !== this.queue.length) {
      this.nextFrame = requestAnimationFrame(this.updateFrame);
      this.frame++;
    }
  }
  
  updateElement(text) {
    this.element.innerHTML = text;
  }
}

const text = [
 "-HELLO!-",
  "WELCOME",
  "MY NAME IS JAMES",
  "CHILL",
  "HAVE A LOOK AT \n MY WEBSITE."
];

const scrambler = new Scrambler(
  text,
  document.querySelector(".text"),
  {
    characters: "/黄锦華|*>$?!*"
  }
);

// start() returns the function to stop()
const stop = scrambler.start();



//Clock
function displayTime() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var dark;

  if (h > 12) {
    h = h - 12;
    dark = "PM";
  } else if (h === 0) {
    h = 12;
    dark = "AM";
  } else if (h < 12) {
    dark = "AM";
  } else if (h === 12) {
    dark = "PM";
  }



  function underTwelve(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  m = underTwelve(m);
  s = underTwelve(s);

  document.getElementById('time').innerHTML = h + ":" + m + ":" + s + " " + dark;

  setTimeout(function() {
    displayTime()
  }, 1000);
}

var clock = document.getElementById('time');
clock.onload = displayTime();

window.addEventListener('resize', function()
{
  jsCanvasSnow.resize(window.innerWidth, window.innerHeight);
    jsCanvasSnow.init();
}, false);

window.addEventListener('load', function()
{
  jsCanvasSnow.init();
  jsCanvasSnow.start();
}, false);

function jsParticle(origin, velocity, size, amplitude)
{
  this.origin = origin;
  this.position = new Vector2(origin.x, origin.y);
  this.velocity = velocity || new Vector2(0, 0);
  this.size = size;
  this.amplitude = amplitude;
  
  // randomize start values a bit
  this.dx = Math.random() * 100;
  
  this.update = function(delta_time)
  {
    this.position.y += this.velocity.y * delta_time;
    
    // oscilate the x value between -amplitude and +amplitude
    this.dx += this.velocity.x*delta_time;    
    this.position.x = this.origin.x + (this.amplitude * Math.sin(this.dx));
  };
}

( function($) {
  
  $(document).ready(function() {
    
    var s           = $('.slider'),
        sWrapper    = s.find('.slider-wrapper'),
        sItem       = s.find('.slide'),
        btn         = s.find('.slider-link'),
        sWidth      = sItem.width(),
        sCount      = sItem.length,
        slide_date  = s.find('.slide-date'),
        slide_title = s.find('.slide-title'),
        slide_text  = s.find('.slide-text'),
        slide_more  = s.find('.slide-more'),
        slide_image = s.find('.slide-image img'),
        sTotalWidth = sCount * sWidth;
    
    sWrapper.css('width', sTotalWidth);
    sWrapper.css('width', sTotalWidth);
    
    var clickCount  = 0;
    
    btn.on('click', function(e) {
      e.preventDefault();

      if( $(this).hasClass('next') ) {
        
        ( clickCount < ( sCount - 1 ) ) ? clickCount++ : clickCount = 0;
      } else if ( $(this).hasClass('prev') ) {
      
        ( clickCount > 0 ) ? clickCount-- : ( clickCount = sCount - 1 );
      }
      TweenMax.to(sWrapper, 0.8, {x: '-' + ( sWidth * clickCount ) })


      //CONTENT ANIMATIONS

      var fromProperties = {autoAlpha:0, x:'-50', y:'-10'};
      var toProperties = {autoAlpha:0.8, x:'0', y:'0'};

      TweenLite.fromTo(slide_image, 1, {autoAlpha:0, y:'40'}, {autoAlpha:1, y:'0'});
      TweenLite.fromTo(slide_date, 0.4, fromProperties, toProperties);
      TweenLite.fromTo(slide_title, 0.6, fromProperties, toProperties);
      TweenLite.fromTo(slide_text, 0.8, fromProperties, toProperties);
      TweenLite.fromTo(slide_more, 1, fromProperties, toProperties);

    });
          
  });
})(jQuery);

$('.overlay').addClass('overlay-blue');


$(window).scroll(function(){

    // Add parallax scrolling to all images in .paralax-image container
      $('.Landing').each(function(){
        // only put top value if the window scroll has gone beyond the top of the image
            if ($(this).offset().top < $(window).scrollTop()) {
            // Get ammount of pixels the image is above the top of the window
            var difference = $(window).scrollTop() - $(this).offset().top;
            // Top value of image is set to half the amount scrolled
            // (this gives the illusion of the image scrolling slower than the rest of the page)
            var half = (difference / 2) + 'px',
                transform = 'translate3d( 0, ' + half + ',0)';

            $(this).find('img').css('transform', transform);
        } else {
            // if image is below the top of the window set top to 0
            $(this).find('img').css('transform', 'translate3d(0,0,0)');
        }
      });
});

$(window).scroll(function(){

    // Add parallax scrolling to all images in .paralax-image container
      $('.cover').each(function(){
        // only put top value if the window scroll has gone beyond the top of the image
            if ($(this).offset().top < $(window).scrollTop()) {
            // Get ammount of pixels the image is above the top of the window
            var difference = $(window).scrollTop() - $(this).offset().top;
            // Top value of image is set to half the amount scrolled
            // (this gives the illusion of the image scrolling slower than the rest of the page)
            var half = (difference / 2) + 'px',
                transform = 'translate3d( 0, ' + half + ',0)';

            $(this).find('img').css('transform', transform);
        } else {
            // if image is below the top of the window set top to 0
            $(this).find('img').css('transform', 'translate3d(0,0,0)');
        }
      });
});



function bgChanger() {
  if (this.scrollY > this.innerHeight / 2) {
    document.body.classList.add("bg-active");
  }          else {
    document.body.classList.remove("bg-active");
  }
}

window.addEventListener("scroll", bgChanger);



class StickyNavigation {
  
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    let self = this;
    $('.et-hero-tab').click(function() { 
      self.onTabClick(event, $(this)); 
    });
    $(window).scroll(() => { this.onScroll(); });
    $(window).resize(() => { this.onResize(); });
  }
  
  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
    $('html, body').animate({ scrollTop: scrollTop }, 600);
  }
  
  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }
  
  onResize() {
    if(this.currentId) {
      this.setSliderCss();
    }
  }
  
  checkTabContainerPosition() {
    let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
    if($(window).scrollTop() > offset) {
      $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
    } 
    else {
      $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
    }
  }
  
  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $('.et-hero-tab').each(function() {
      let id = $(this).attr('href');
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if(this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }
  
  setSliderCss() {
    let width = 0;
    let left = 0;
    if(this.currentTab) {
      width = this.currentTab.css('width');
      left = this.currentTab.offset().left;
    }
    $('.et-hero-tab-slider').css('width', width);
    $('.et-hero-tab-slider').css('left', left);
  }
  
}

new StickyNavigation();

var colors = ["#E2DCCD", "#303030", "#FFE600","#E6D9C8"];
var numberOfSquares = 50;
var squares = [];
    for (var i = 0; i < numberOfSquares; i++) {
var square = document.createElement("div");
    square.classList.add("float-square");
    square.style.background =    colors[Math.floor(Math.random() * colors.length)];
    square.style.left = `${Math.floor(Math.random() * 100)}vw`;
    square.style.top = `${Math.floor(Math.random() * 100)}vh`;
    square.style.transform = `scale(${Math.random()})`;
                square.style.width = `${Math.random()}em`;
    square.style.height = square.style.width;

      squares.push(square);
      document.body.append(square);
  }

      squares.forEach((el, i, ra) => {
      var to = {
          x: Math.random() * (i % 2 === 0 ? -11 : 11),
          y: Math.random() * 12
               };

      var anim = el.animate(
                   [
       { transform: "translate(0, 0)" },
                        { transform: `translate(${to.x}rem, ${to.y}rem)` }
                    ],
                    {
                        duration: (Math.random() + 2) * 3000, // random duration
                        direction: "alternate",
                        fill: "both",
                        iterations: Infinity,
                        easing: "ease-in-out"
                    }
                );
            });


$(window).scroll(function(){
    $(".email").css("opacity", 1 - $(window).scrollTop() / 250);
  });

$(document).ready(function() {
        var ctx = $("#chart-line");
        var myLineChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['HTML5', 'CSS', 'Javascript', 'Digital Marketing', 'Graphic design', 'Problem Solving', 'Creative thinking'],
                datasets: [{

                }, {
                    data: [85, 75, 40, 85, 70, 100, 90],
                    label: "James Surya Wijaya",
                    borderColor: "lightgrey",
                    fill: true,
                    backgroundColor: 'white;'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'My skills'
                }
            }
        });
    });
