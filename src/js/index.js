require('viewport-units-buggyfill').init();
import WebFont from 'webfontloader';
import App from './app';

WebFont.load({
  google: {
    families: ['Alegreya:400,400i,700']
  },
  custom: {
    families: ['Wigrum']
  }
});

const app = new App();
