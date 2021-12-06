 let carts = document.querySelectorAll('.add-cart'); 

 let products = [
    {
       name: 'Nike Mini Just Do It backpack in pink',
       tag: 'nike pink bag',
       price: 19,
       inCart: 0
    },
    {
      name: 'adidas Originals trefoil mini backpack in black',
      tag: 'adidas black bag',
      price: 24,
      inCart: 0
   },
   {
      name: 'Vans Old Skool H20 backpack in animal spot',
      tag: 'vans animal spot bag',
      price: 32,
      inCart: 0
   },
   {
      name: 'Love Moschino all over logo backpack in multi',
      tag: 'moschino logo print bag',
      price: 143,
      inCart: 0
   },
   {
      name: "Levi's square logo backpack in light blue",
      tag: 'levis light blue bag',
      price: 37,
      inCart: 0
   },
   {
      name: 'New Balance core logo backpack in grey',
      tag: 'grey new balance bag',
      price: 25,
      inCart: 0
   }
 ]

 for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost (products[i]);
    })
 }

 function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
      document.querySelector('.cart span').textContent = productNumbers; 
    }
 }

 function cartNumbers(product) {  
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
      localStorage.setItem ('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
      localStorage.setItem ('cartNumbers', 1);
      document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
 }

 function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

      if (cartItems[product.tag] == undefined) {
         cartItems = {
            ...cartItems,
            [product.tag]: product
         }
      }

       cartItems[product.tag].inCart += 1;
    } else {
      product.inCart = 1;
      cartItems = {
         [product.tag]: product
      }
    }
    localStorage.setItem('productsInCart', JSON.stringify (cartItems)); 
 }

 function totalCost(product) {
   let cartCost = localStorage.getItem('totalCost');
   
   if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem('totalCost', cartCost + product.price);
   } else {
      localStorage.setItem('totalCost', product.price);
   } 
 }

 function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
     
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems  && productContainer) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map(item => {
         productContainer.innerHTML += `
         <div class= "product">
            <ion-icon class="deletebtn" name="close-circle"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
         </div>
         <div class="price">$${item.price},00</div>
         <div class="quantity">
            <ion-icon class="minusbtn" name="remove-circle"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="addbtn" name="add-circle"></ion-icon>
         </div>
         <div class="total">
            $${item.inCart * item.price},00
         </div>
         `
      });

      productContainer.innerHTML += `
         <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">$${cartCost},00</h4>
         </div>
      ` 
    }
 }

   // let btnAdd = document.querySelector ('.addbtn');
   // let btnMinus = document.querySelector ('.minusbtn');
   // let btnDelete = document.querySelector ('.deletebtn')

   // btnAdd.addEventListener ('click', () => {

   // })

   let btnMinus = document.getElementsByClassName('minusbtn');
   console.log (btnMinus);

 onLoadCartNumbers();
 displayCart()