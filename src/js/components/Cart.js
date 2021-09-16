import { select, classNames, templates, settings} from '../settings.js';
import CartProduct from './CartProduct.js';
import utils from '../utils.js';


class Cart {
  constructor(element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();
  }
  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = element.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = element.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = element.querySelector(select.cart.deliveryFee);
    thisCart.dom.subTotalPrice = element.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = element.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = element.querySelector(select.cart.totalNumber);
    thisCart.dom.form = element.querySelector(select.cart.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.adress = thisCart.dom.wrapper.querySelector(select.cart.adress);
  }
  initActions(){
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function(){
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function(event){
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }
  add(menuProduct){
    const thisCart = this;
    /* generate HTML based on template */
    const generatedHTML = templates.cartProduct(menuProduct);
    /* create element using utils.createElementFromHTML */
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    /* add element to menu */
    thisCart.dom.productList.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    thisCart.update();
  }
  update(){
    const thisCart = this;
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.totalNumber = 0;
    thisCart.subTotalPrice = 0;
    for(let product of thisCart.products){
      thisCart.totalNumber += product.amount;
      thisCart.subTotalPrice += product.price;
    }
    if (thisCart.totalNumber === 0) {
      thisCart.totalPrice = 0;
      thisCart.deliveryFee = 0;
      for(let price of thisCart.dom.totalPrice){
        price.innerHTML = thisCart.totalPrice;
      }
    }  else {
      thisCart.totalPrice = thisCart.subTotalPrice + thisCart.deliveryFee;
      for(let price of thisCart.dom.totalPrice){
        price.innerHTML = thisCart.totalPrice;
      }
    }
    thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
    thisCart.dom.subTotalPrice.innerHTML = thisCart.subTotalPrice;
    thisCart.dom.deliveryFee.innerHTML = thisCart.deliveryFee;
  }
  remove(cartProduct){
    const thisCart = this;
    // Usunięcie reprezentacji produktu z HTML-a
    const indexOfCartProduct = thisCart.products.indexOf(cartProduct);
    // Usunięcie informacji o danym produkcie z tablicy thisCart.products
    thisCart.products.splice(indexOfCartProduct, 1);
    // Wywołać metodę update w celu przeliczenia sum po usunięciu produktu
    cartProduct.dom.wrapper.remove();
    thisCart.update();
  }
  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.order;
    const payload = {
      adress: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      form: thisCart.form,
      deliveryFree: thisCart.deliveryFee,
      subTotalPrice: thisCart.subTotalPrice,
      totalPrice: thisCart.totalPrice,
      totalNumber: thisCart.totalNumber,
      Product: [],
    };
    for(let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then(function(response){
        return response.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });
  }
}
export default Cart;