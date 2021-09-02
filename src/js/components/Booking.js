import { templates, select } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(element) {
    const thisBooking = this;
    thisBooking.rander(element);
    thisBooking.initWidget();
  }
  rander(element) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.DatePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.HourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
  }
  initWidget() {
    const thisBooking = this;
    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.DatePicker = new DatePicker(thisBooking.dom.DatePicker);
    thisBooking.HourPicker = new HourPicker(thisBooking.dom.HourPicker);
    thisBooking.dom.peopleAmount.addEventListener('updated', function () {});
    thisBooking.dom.hoursAmount.addEventListener('updated', function () {});
    thisBooking.dom.DatePicker.addEventListener('updated', function () {});
    thisBooking.dom.HourPicker.addEventListener('updated', function () {});
  }
}
export default Booking;