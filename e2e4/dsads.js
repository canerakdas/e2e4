  //Basket Add
  if(jQuery('.add-to-cart-button').length){
  jQuery('.add-to-cart-button').click(function(){
    try{
      var productId = jQuery(".gallery .picture img").attr("src").split("_")[0].split("/").slice(-1)[0];
      var productTemplate = jQuery('.overview');
      var productPrice = productTemplate.find(".product-price span").text().trim().split(" ")[0].replace(",", ".");
      var productQuantity =$("input[id*='addtocart']").attr('value');
      var basketConst = false;

      var basketControl = setInterval(function(){
        if(jQuery('.productAddedToCartWindowTitle').length || jQuery('.bar-notification.success').length){
          if(!basketConst){
            basketConst=true;
            Segmentify('basket:add', {'productId': productId,'quantity': productQuantity,'price': productPrice});
            clearInterval(basketControl);
          }
        }
      },1000);
    }catch(e){}
  });
  }