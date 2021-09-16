(function($){
  $(function(){



    //check if hoverable device  
    const isHoverAvailable = window.matchMedia("(any-hover: hover)").matches;
    console.log(isHoverAvailable)


    $('.sidenav').sidenav();
    $('.parallax').parallax();

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
      var slider = document.getElementById('price_range');
      noUiSlider.create(slider, {
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

      var marginMin = document.getElementById('slider-margin-value-min');
      var marginMax = document.getElementById('slider-margin-value-max');

      slider.noUiSlider.on('update', function (values, handle) {
        if (handle) {
          marginMax.innerHTML = values[handle];
        } else {
          marginMin.innerHTML = values[handle];
        }
      });



    }();


  }); // end of document ready
})(jQuery); // end of jQuery name space
