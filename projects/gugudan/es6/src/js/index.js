// @flow
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import '../css/index.css';
import { init, reset, template } from './module/index';
import element from './element';

init();

$('body').on('click', 'button[type=reset]', (): void => {
    reset();
});

$('body').on('submit', 'form', e => {
    e.preventDefault();
    const temp: string = template(element.$input().val());
    element.$template().html(temp);
});
