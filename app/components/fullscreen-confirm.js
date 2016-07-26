import Ember from 'ember';

export default Ember.Component.extend({
  showModal:      false,
  confirmPromise: null,

  actions: {
    showModal() {
      if (this.get('skipConfirm')) {
        return Ember.RSVP.resolve();
      }

      const deferredPromise = Ember.RSVP.defer();
      this.setProperties({
        'showModal': true,
        'confirmPromise': deferredPromise,
      });

      return deferredPromise.promise;
    },

    confirm() {
      const deferredPromise = this.get('confirmPromise');
      if (deferredPromise) {
        deferredPromise.resolve();
      }

      this.setProperties({
        'showModal': false,
        'confirmPromise': null,
      });
    },

    cancel() {
      const deferredPromise = this.get('confirmPromise');
      if (deferredPromise) {
        deferredPromise.reject();
      }

      this.setProperties({
        'showModal': false,
        'confirmPromise': null,
      });
    },
  },
});
