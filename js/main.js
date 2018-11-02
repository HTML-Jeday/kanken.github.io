// slider
$(document).ready(function(){
   
 
    getColors();
    getBgColors();

    if($("section").is(".section-cart")){
        initCart();
    }
   

  
 
    if($('div').is('.section-rotate')){
        setTimeout (function(){
            $('.tab-active').find('.picker-palette .color-palette').find('label')[0].click()
        }, 200);
        getImg(); 
        initMainPage();
    }
    


$( "#rangebar" ).slider({
    animate: "slow",
    range: "min",  
    min: 0,
    max: 24,  
    value: 0,
    
});

var swiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
 
    },
    slidesPerView: 1,
    loop: true
  });


  $('.grid-slider').slick({
	slide: '.grid-slide',
  slidesToShow: 1,
  prevArrow: '<img class="slick-prev" src="images/arrow-prev.png" />',
  nextArrow: '<img class="slick-next" src="images/arrow-next.png" />',

 
});


//modal

$('#open-modal-call a').on('click', function(e){
    e.preventDefault();
    
    $(".modal-popup #call, .modal-popup").fadeIn();

})

$('.add-to-cart').on('click', function(){
    var title = $(this).parent().parent().find('.picker-title').html();
    var color = $(this).parent().parent().find('#pickedColorName').html();
    var price = $(this).parent().parent().find('.picker-price span').html();
    var priceNumber = price.replace(/[^-0-9]/gim,'');
    var priceFinal = priceNumber.replace('--', '');
    var img = $(this).parent().parent().parent().find('.img-container img').attr('src');

    let LScart = getCoursesFromStorage();


    let counter = LScart.length || 0;
    
    var cartItem = {
        title,
        color,
        img,
        price: parseInt(priceFinal),
        id: counter++,
        count: 1
    }
   
    addCourseToLocalStorage(cartItem);

    
 
    $('.basket-counter').fadeIn().html(++LScart.length);
    $('.basket-counter').parent().parent().attr('href', 'cart.html');
 
    

    
});

function initMainPage(){

    let arrayLS = getCoursesFromStorage();

    if(arrayLS.length !== 0){
        $('.basket-counter').fadeIn();
        $('.basket-counter').html(arrayLS.length);
        $('.basket').parent().attr('href', 'cart.html');
    }
    
  
 
}


// button choise

$("a.button-choise ").on('click', function(e){
       
    $(".picker-top__tabs-container li").removeClass('active');
    $(".tab-content").removeClass('active tab-active');
    $(".picker-top__tabs-container li").eq($(this).parent().parent().index()).addClass('active');
    $(".tab-content").eq($(this).parent().parent().index()).addClass('active');
 
    
})



$('.order-button').on('click', function(e){
         

    let item = JSON.parse(localStorage.getItem('products'))

    
    let row;

    for(let i = 0; i < item.length; i++){

        row+= `Продукт № ${i}- Название: ${item[i].title}; Цвет: ${item[i].color}; Цена: ${item[i].price} руб;  `
    }

    let Str = row.replace('undefined', '');
   
    
    $('.hidden-input').val(Str);
    let arr = [];

    localStorage.clear();
    
})










$('.order-buy-one-click').on('click', function(e){
  
    var title = $('.tab-active .picker-title').html();
    var color = $('.tab-active #pickedColorName').html();
    var price = $('.tab-active .picker-price span').html();
    var priceNumber = price.replace(/[^-0-9]/gim,'');
    var priceFinal = priceNumber.replace('--', '');

    row = `Название: ${title}; Цена: ${priceFinal} руб; Цвет: ${color}`;
    

    $('.hidden-input').val(row);

})


$('body').on('click', '#open-modal-buy', function(e){
  
    $(".modal-popup #buy-by-one, .modal-popup").fadeIn();

})

$('#open-modal-view a').on('click', function(e){
    e.preventDefault();
  
    $(".modal-popup #view, .modal-popup").fadeIn();

})

$('.modal-popup .overlay').on('click', function(){
    $(".modal-popup, .popup").fadeOut();
})

// mMenu 

$('.mMenu').on('click', function(){
    $('.mobile-container-menu').fadeToggle();
})



// fixed menu


$(window).on("scroll", function() {
    if ($(window).scrollTop() != 0 ) {
       $('.header').addClass('fixed-nav');
       $('.hiden-mobile-nav').fadeIn();
    
    }else{
        $('.header').removeClass('fixed-nav');
        $('.hiden-mobile-nav').css('display', 'none');
       
    }

    if ($(window).scrollTop() > 100 ) {
    
        $('.scrollTop').css('display', 'flex');
     }else{
       
         $('.scrollTop').fadeOut();
        
     }

   
    });

    $('.scrollTop').on('click', function(){
        $('body, html').animate({
			scrollTop: 0
		}, 1000 )
    })







// tabs
  
$('.picker-top__tabs-container').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active ').siblings().removeClass('active')
      .closest('.section-picker').find('.tab-content').removeClass('active tab-active').eq($(this).index()).addClass('active tab-active');
});

$('.picker-top__tabs-container li').on('click', function(){
    setTimeout (function(){
        $('.tab-active').find('.picker-palette .color-palette').find('label')[0].click()
    }, 200); 
   
})


})

// pick color
$(".color-palette label .radio-custom").on('click', function(){
    var colorName = $(this).parent().data('name');
    $(this).parent().parent().parent().siblings('.picker-color').find('#pickedColorName').html(colorName)
})

//pick img
$('.color-palette label').on('click', function(){
    var dataNumber = $(this).data('number');
 
    var categoryBackpack = $(this).parent().parent().siblings('.picker-title').html();
    var urlName = categoryBackpack.replace('Kanken ', '');


    $('.color-palette label .radio-custom').removeClass('rotateImg');
    $(this).find('.radio-custom').addClass('rotateImg');
    $(this).parent().parent().parent().parent().find('.img-container img').attr('src', `images/tabs/picker-color/${urlName}/${dataNumber}.jpg`);

    if ($(window).width() <= 992){
      
         $('.tab-active').find('.picker-container .picker-palette').after($('.tab-active').find('.backpack-wrapper .backpack-container'))
        
      } 

})






function getColors(){
    
    $('[data-color]').each(function(){ 
      
        $(this).find('.radio-custom').css('backgroundColor', `${$(this).data('color')}`)
    }); 
}

function getBgColors(){
    $('[data-bg]').each(function(){ 
      
        $(this).find('.radio-custom').css('background', `url(images/color/${$(this).data('bg')}) center`)
    }); 

}

function getImg(){
    setInterval(function(){
        imgFun();
        $('#rangebar .ui-slider-handle').addClass('slider-range');
        var imgVal = $( "#rangebar" ).slider( "value" );
        var degrees = 15 * imgVal
        $('#rangebar .ui-slider-handle').html(`${degrees}°`);
    }, 100);
}
function imgFun(){
    var imgVal = $( "#rangebar" ).slider( "value" );
    document.getElementById("imgg").src= `images/slides/slide_${imgVal}.jpg`;
   
}

$('.cart-delete .delete-all').on('click', function(e){
    e.preventDefault();

    $("#cart-form").html('Ваша корзина пуста');



    localStorage.clear();
})



$('body').on('click', '.delete-product', function(e){
    e.preventDefault();
    
    let CurrentId = $(this).data('id');
    let CurrentPrice = $(this).parent().parent().find('.product-price').html();
    let CurrentParse = parseInt(CurrentPrice);
    let finalPrise = $('.final-price').html();
    let sumPrice =  parseInt(finalPrise) - parseInt(CurrentPrice);
    

    $('.final-price').html(sumPrice);
    
    
    $(this).parent().parent().remove();

    let LScart = JSON.parse(localStorage.getItem('products'))

  
    $('.counter-cart').html(--LScart.length);
    $('.basket-counter').html(LScart.length);
  
   
    if(LScart.length == 0){
        $("#cart-form").html('Ваша корзина пуста');
        $('.basket-counter').fadeOut();
    }

    removeProductFromStorage(CurrentId);
 

})


function removeProductFromStorage(id) {

let products = getCoursesFromStorage();
let CurrentId = id;
products.forEach( (product, index ) => {

        if(product.id == CurrentId){
            products.splice(index, 1);

        }

    })


    localStorage.setItem('products', JSON.stringify(products));

  
}

function initCart(){

    

    let LScart = getCoursesFromStorage();

    if(LScart.length == 0){
       
        $("#cart-form").html('Ваша корзина пуста');
        
    }else{
        let row;
        let counter = LScart.length;
        let fullPrice = 0;
    
        
        
        for(i=0; i < LScart.length; i++){
           console.log(LScart[i].img)
    
            row+= `<div class="cart-content">
            <li><img src="${LScart[i].img}" alt=""></li>
            <li>
              <div class="product-name">${LScart[i].title}</div>
              <div class="product-color">Цвет: <span>${LScart[i].color}</span></div>
            </li>
            <li><span class="product-price">${LScart[i].price} </span>руб.</li>
            <li><span>1</span></li>
            <li><span>${LScart[i].price}</span>руб. <a href="#" class="delete-product" data-id="${LScart[i].id}">удалить</a></li>
          </div>
            `
            fullPrice+= parseInt(LScart[i].price)
    
           
    
        }
       
      
        $('.final-price').html(fullPrice);
        $('.counter-cart').html(counter);
        
        let Str = row.replace('undefined', '');
    
       
        $('.cart-wrapper .cart-top').after(Str);
    }
       
   

}

function getCoursesFromStorage(){

 let arrayLS = JSON.parse(localStorage.getItem('products')) || [];

    return arrayLS;
}




function addCourseToLocalStorage(product) {

    var arrayLS = getCoursesFromStorage();
   
     arrayLS.push(product);

   


     localStorage.setItem('products', JSON.stringify(arrayLS));


}

