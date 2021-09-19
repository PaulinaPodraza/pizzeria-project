/* global Flickity */
import { templates, select } from '../settings.js';
import {app} from '../app.js';

class Home {
  constructor(element) {
    const thisHome = this;
    thisHome.render(element);
    thisHome.initWidgets();
    thisHome.goToPage();
  }

  render(element) {
    const thisHome = this;
    const generatedHTML = templates.homePage();
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    thisHome.dom.order = thisHome.dom.wrapper.querySelector(select.widgets.home.order);
    thisHome.dom.book = thisHome.dom.wrapper.querySelector(select.widgets.home.book);
  }

  initWidgets() {
    const thisHome = this;
    setTimeout(() => {
      thisHome.element = document.querySelector('.main-carousel');
      thisHome.flickity = new Flickity(thisHome.element, {
        prevNextButtons: false,
        wrapAround: true,
        autoPlay: 3000,
        cellAlign: 'left',
        contain: true,
      });
    }, 2000);
  }

  goToPage() {
    const thisHome = this;
    thisHome.dom.order.addEventListener('click', function(){
      app.activatePage('order');
    });
    thisHome.dom.book.addEventListener('click', function(){
      app.activatePage('booking');
    });
  }
}

export default Home;