import { helper } from '@ember/component/helper';

export default Ember.Helper.helper(function(params) {
  let [valueA, valueB] = params;

  return valueA === valueB;
});
