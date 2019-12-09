import Vue from 'vue';
import Bootstrap from 'bootstrap-vue';

import Router from 'vue-router';
import Films from '@/components/Films';
import Film from '@/components/FilmDetail';
import Char from '@/components/Characters';

Vue.use(Router);
Vue.use(Bootstrap);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Films',
      component: Films,
    },
    {
      path: '/detail/:film',
      name: 'Film_detail',
      component: Film,
    },
    {
      path: '/characters',
      name: 'characters',
      component: Char,
    },
  ],
});
