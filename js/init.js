(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.tabs').tabs();
    



    // dropdown initialization with hover
    $('.dropdown-trigger').dropdown({
      coverTrigger: false,
      hover: true,
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
       start: [20, 80],
       connect: true,
       step: 1,
       orientation: 'horizontal', // 'horizontal' or 'vertical'
       range: {
         'min': 0,
         'max': 100
       },
       format: wNumb({
         decimals: 0
       })
     });
    }();


  }); // end of document ready
})(jQuery); // end of jQuery name space
