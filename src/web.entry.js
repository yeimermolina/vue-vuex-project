import Vue from 'vue';
import store from './store';
import './style.scss';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {get(){ return this.$root.moment }});

import App from './components/App.vue';

// let events = [
//   {description: 'Random', date: moment('2017-09-12', 'YYYY-MM-DD')},
//   {description: 'Random', date: moment()},
//   {description: 'Random', date: moment()},
// ]

let events = window.__INITIAL_STATE__.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  };
})

console.log(events)

let initialState = Object.assign({}, store.state, { events: events });

store.replaceState(initialState);

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
