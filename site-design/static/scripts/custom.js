$(document).ready(function () {
    $(".navbar-burger").click(function () {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
});

$(document).ready(function () {
    $('.accordtab').on('click', function () {
        var customAttr = $(this).attr('data-toggle');
        $('#' + customAttr).slideToggle();
        if ($(this).hasClass('current')) {
            $(this).removeClass('current');
        } else {
            $(this).addClass('current');
        }
    });
    
});

$(document).ready(function() {
    $('#tabs li').on('click', function() {
      var tab = $(this).data('tab');
  
      $('#tabs li').removeClass('is-active');
      $(this).addClass('is-active');
  
      $('#tab-content div.tabCus').removeClass('is-active');
      $('div.tabCus[data-content="' + tab + '"]').addClass('is-active');
    });
  });
  $(document).ready(function() {
    $('#tabs2 li').on('click', function() {
      var tab = $(this).data('tab');
  
      $('#tabs2 li').removeClass('is-active');
      $(this).addClass('is-active');
  
      $('#tab-content2 div.tabCus').removeClass('is-active');
      $('div.tabCus[data-content="' + tab + '"]').addClass('is-active');
    });
  });
  $(document).ready(function() {
    $('#tabs3 li').on('click', function() {
      var tab = $(this).data('tab');
  
      $('#tabs3 li').removeClass('is-active');
      $(this).addClass('is-active');
  
      $('#tab-content3 div.tabCus').removeClass('is-active');
      $('div.tabCus[data-content="' + tab + '"]').addClass('is-active');
    });
  });
  $(document).ready(function() {
    $('#tabs4 li').on('click', function() {
      var tab = $(this).data('tab');
  
      $('#tabs4 li').removeClass('is-active');
      $(this).addClass('is-active');
  
      $('#tab-content4 div.tabCus').removeClass('is-active');
      $('div.tabCus[data-content="' + tab + '"]').addClass('is-active');
    });
  });
  $(document).ready(function() {
    $('#tabs5 li').on('click', function() {
      var tab = $(this).data('tab');
  
      $('#tabs5 li').removeClass('is-active');
      $(this).addClass('is-active');
  
      $('#tab-content5 div.tabCus').removeClass('is-active');
      $('div.tabCus[data-content="' + tab + '"]').addClass('is-active');
    });
  });
$("input[name='l_comm']").TouchSpin({
    verticalbuttons: true,
    verticalbuttons: true,
    min: 0,
    max: 5,
    step: 0.05,
    decimals: 2,
    boostat: 5,
    //maxboostedstep: 10,
});
$("input[name='s_exchange']").TouchSpin({
    verticalbuttons: true,
    verticalbuttons: true,
    min: 0,
    max: 5,
    step: 0.05,
    decimals: 2,
    boostat: 5,
    //maxboostedstep: 10,
});
document.querySelectorAll('.modal-button').forEach(function(el) {
    el.addEventListener('click', function() {
      var target = document.querySelector(el.getAttribute('data-target'));
      
      target.classList.add('is-active');
      
      target.querySelector('.modal-close').addEventListener('click',   function() {
          target.classList.remove('is-active');
       });
    });
  });

  $(window).load(function() {
    $(".se-pre-con").fadeOut("slow");;
});
