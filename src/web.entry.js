import Vue from 'vue';
import store from './store';
import './style.scss';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {get(){ return this.$root.moment }});

import App from './components/App.vue';

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store
  
});
