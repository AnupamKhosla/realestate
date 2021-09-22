"use strict";
// import Swiper JS
import Swiper from '../node_modules/swiper/swiper-bundle.esm.browser.js'


(function($){
  $(function(){





    //check if hoverable device  
    const isHoverAvailable = window.matchMedia("(any-hover: hover)").matches;    

    $('.sidenav').sidenav();

    $('.parallax').parallax();
    $("#index-banner").css("min-height", ($(window).height() + "px") ); 
    //make sure hero image doesn't flicker/jump in mobile browsers due to top url bar changing



    $('.tabs').tabs({      
      onShow: function(){   
        $(this.$el).closest(".dropdown-content").addClass("o-y-hidden");
        var this2 = this.$el;
        setTimeout(function(){
          $(this2).closest(".dropdown-content").prev(".dropdown-trigger").dropdown("recalculateDimensions");
          $(this2).closest(".dropdown-content").removeClass("o-y-hidden")
        },0);  //bug fix in recalculateDimensions
      }      
    });

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


    $('select').formSelect();

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
  const swiper = new Swiper('.swiper', {  
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1.25,
    lazy: true,
    spaceBetween: 15,
    breakpoints: {
          640: {
            slidesPerView: 2.25,
            spaceBetween: 25,
          },
          992: {
            slidesPerView: 3.25,
            spaceBetween: 35,
          },
          1200: {
            slidesPerView: 4.25,
            spaceBetween: 50,
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


  }); // end of document ready
})(jQuery); // end of jQuery name space

