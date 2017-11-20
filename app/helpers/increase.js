import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let [intValue, intIncrease] = params;

  return intValue + intIncrease;
});
