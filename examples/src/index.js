import './mobile.init';
import '../../src';
import './style.css';
import './controllers.css';
import './assets/fonts/helvetica-neue.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();


const spinner = document.getElementById('spinner');
const wrapper = document.getElementById('main');

wrapper.classList.add('active');
spinner.style.display = 'none';
document.body.classList.remove('on-load');