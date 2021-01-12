import './styles.css';
import './views/todo-view';
import { Router } from '@vaadin/router';

window.addEventListener('load', () => {
  initRouter();
  registerSW();
});

function initRouter() {
  const router = new Router(document.querySelector('main'));
  router.setRoutes([
    {
      path: '/',
      component: 'todo-view'
    },
    {
      path: '/demo',
      component: 'demo-view',
      action: () =>
        import(/* webpackChunkName: "demo" */ './views/demo-view') //
    },
    {
      path: '(.*)',
      component: 'not-found-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/not-found-view')
    }
  ]);
}
