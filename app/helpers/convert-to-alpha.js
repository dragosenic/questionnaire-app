import Ember from 'ember';

export default Ember.Helper.helper(function(intValue) {
  let alphas = ['A','B','C','D','E','F','G','H','I','J','K'];
  return alphas[intValue];
  //return String.fromCharCode(42 + intValue);
});
