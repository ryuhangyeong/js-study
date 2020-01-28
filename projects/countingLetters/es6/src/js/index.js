import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';
import { countingView } from './utils';

const $input = $('#input');

$input.keyup(() => countingView($input.val()));