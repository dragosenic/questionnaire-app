import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return Ember.$.getJSON("questionnaire.json");
    },
    actions: {
      navigateTo(routeName) {
        this.transitionTo(routeName);
      }
    }
});
