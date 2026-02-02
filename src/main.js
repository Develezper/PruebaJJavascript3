import './styles/main.css';
import { initRouter } from './router/router.js';

function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter);
  } else {
    initRouter();
  }
}

init();