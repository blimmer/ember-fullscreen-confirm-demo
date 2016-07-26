import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['scary-button-component'],

  shouldShowScary: false,
  doSomethingScary() {
    this.set('shouldShowScary', true);
  },
});
