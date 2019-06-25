import router from '@/router';
import store from '@/store/';

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || '';
  let hasToken;
  try {
    await store.dispatch('getUserInfo');
    hasToken = true;
  } catch (error) {
    hasToken = false;
  }

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
