import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    navigateTo(routeName) {
      this.transitionTo(routeName);
    }
  }
});
