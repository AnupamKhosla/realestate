"use strict";
// import Swiper JS
import Swiper from   '../js/swiper-bundle.esm.browser.js'

(function($){
  $(function(){

    $("html").removeClass("no-js");
    // chrome bug https://stackoverflow.com/a/42969608/3429430

    $("a[data-href]").each(function(){
      $(this).attr("href", $(this).attr("data-href"));
    });
    //avoiding unintentional anchor tag clicks before tabs are activated

    //check if hoverable device  
    const isHoverAvailable = window.matchMedia("(any-hover: hover)").matches;    
    //detects mobile/tablet android/safari browsers

    $('.sidenav').sidenav();
    $('.parallax').parallax(); 

    $('nav .tabs').tabs({      
      onShow: function(){   
        $(this.$el).closest(".dropdown-content").addClass("o-y-hidden");
        var this2 = this.$el;
        setTimeout(function(){
          $(this2).closest(".dropdown-content").prev(".dropdown-trigger").dropdown("recalculateDimensions");
          $(this2).closest(".dropdown-content").removeClass("o-y-hidden")
        },0);  //bug fix in recalculateDimensions
      }      
    });

    $("#form1 .tabs").tabs();
    $("#form1 .tab a").click(function(){
      $(this).blur();      
    });

    $('.collapsible').collapsible();

    // dropdown initialization with hover
    $('.dropdown-trigger').dropdown({
      coverTrigger: false,
      hover: isHoverAvailable,
      alignment: 'left',
      constrainWidth: false,
      closeOnClick: false,
      autoTrigger: true,
      onOpenStart: function(){
        $(this.el).addClass("open");        
      },
      onCloseEnd: function(){    
        $(this.el).blur();       
        $(this.el).removeClass("open");
      }      
    });
    // dropdown finishes

    $('select').formSelect({
      dropdownOptions: {
      }
    });

    !function(){ //module for range slider
      var slider1 = document.getElementById('price1');
      var slider2 = document.getElementById('price2');
      var slider3 = document.getElementById('price3');
      var $sliders = $(".price_range");

      noUiSlider.create(slider1, {
       start: [0, 100],
       step: 0.5,
       connect: true,       
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
         'min': 0,
         'max': 100
       },
       format: wNumb({
         decimals: 0         
       }),
     });

      noUiSlider.create(slider2, {
       start: [0, 100],
       step: 0.5,
       connect: true,       
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
         'min': 0,
         'max': 100
       },
       format: wNumb({
         decimals: 0         
       }),
     });

      noUiSlider.create(slider3, {
       start: [0, 100],
       step: 0.5,
       connect: true,       
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
         'min': 0,
         'max': 200
       },
       format: wNumb({
         decimals: 0         
       }),
     });

      $sliders.each(function(){
        var this2 = this;
        this.noUiSlider.on('update', function (values, handle) {

          var marginMin = $(this2).prev(".dynamic-price").children(".min")[0];
          var marginMax = $(this2).prev(".dynamic-price").children(".max")[0];
          if (handle) {
            marginMax.innerHTML = values[handle];
          } else {
            marginMin.innerHTML = values[handle];
          }
        });
      });      
    }();

    //carousel using swiper plugin
    const swiper = new Swiper('.outer-swiper', {  
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1.1,
      lazy: true,
      spaceBetween: 15,
      breakpoints: {
        601: {
          slidesPerView: 2.1,
          spaceBetween: 15,
        },
        993: {
          slidesPerView: 3.1,
          spaceBetween: 25,
        },
        1201: {
          slidesPerView: 4.1,
          spaceBetween: 35,
        },
      },
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });
    $(".swiper .bookmark").click(function(){
      console.log(this);
      $(this).toggleClass("fill");
    });

    const nestedSwiper = new Swiper(".nested-swiper", {
      allowTouchMove: false,
      lazy: {
        elementClass: "nested-lazy"
      },
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });


    $(".swiper-button-next.two, .swiper-button-prev.two").removeClass("hide2");
    //making sure user doesn't keep clicking before js loads on slow connections

    const propSwiper = new Swiper(".explore .swiper", {
      loop: false,
      slidesPerView: 1,
      lazy: true,
      spaceBetween: 15,
      navigation: {
        nextEl: ".swiper-button-next.two",
        prevEl: ".swiper-button-prev.two",
      },
      breakpoints: {
        601: {
          slidesPerView: 2,        
        },
        993: {
          slidesPerView: 3,        
        },
        1201: {
          slidesPerView: 5,        
        },
      }
    });
    $(".explore .toggle").click(function(){
      $(this).closest(".card").toggleClass("open");
    });

    const thumbsSwiper = new Swiper(".review .thumbs", {
      loop: false,
      spaceBetween: 10,
      slidesPerView: 3,         
      centeredSlides: true,
      initialSlide: 2,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        // when window width is >= 320px
        993: {
          slidesPerView: 5,
        }
      }
    });

    const reviewSwiper = new Swiper(".review .content", {
      loop: false,
      spaceBetween: 100,
      slidesPerView: 1,  
      noSwiping: true,                  
      initialSlide: 2,
      speed: 1000,        
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: ".swiper-button-next.three",
        prevEl: ".swiper-button-prev.three",
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    })    

    reviewSwiper.on("slideChange", function(){      
      thumbsSwiper.slideTo($(".swiper-slide.swiper-slide-thumb-active").index());
    });




    /*
    !function(){

      var phone = ($(window).innerWidth() < 601);

      const cardSwiper = new Swiper(".card-swiper", {

      effect: phone ? "cards":"slide", 
      //on small screens use playing cards behaviour

      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 15,
      breakpoints: {
        601: {
          slidesPerView: phone ? 1:2.1,
        },
        768: {
          slidesPerView: phone ? 1:3.1,
        },
        993: {
          slidesPerView: phone ? 1:4.1,
        },
        1201: {
          slidesPerView: phone ? 1:5,
        },
      }
    });
    }();
    */


  }); // end of document ready
})(jQuery); // end of jQuery name space

