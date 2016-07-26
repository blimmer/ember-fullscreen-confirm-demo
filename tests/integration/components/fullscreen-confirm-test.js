/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import { assert } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'ember-fullscreen-confirm-demo/tests/helpers/ember-test-selectors';

describeComponent(
  'fullscreen-confirm',
  'Integration: FullscreenConfirmComponent',
  {
    integration: true
  },
  function() {
    it('yields to block content', function() {
      this.render(hbs`
        {{#fullscreen-confirm}}
          <button id='find-me'></button>
        {{/fullscreen-confirm}}
      `);

      expect(this.$('button#find-me').length).to.equal(1);
    });

    it('resolves the yielded action\'s promise on confirm', function(done) {
      this.on('resolve', () => { done(); });

      this.render(hbs`
        <div id='fullscreen-modal-container'></div>
        {{#fullscreen-confirm
            as |showModal|}}
            <button
              {{action (pipe showModal (action 'resolve'))}}
              id='trigger'></button>
        {{/fullscreen-confirm}}
      `);

      this.$('button#trigger').click();
      this.$(testSelector('confirm-button')).click();
      expect(this.$(testSelector('modal-contents')).length).to.equal(0);
    });

    it('rejects the yielded action\'s promise on reject', function() {
      this.on('resolve', () => { assert.fail('resolve should not have been called.'); });

      this.render(hbs`
        <div id='fullscreen-modal-container'></div>
        {{#fullscreen-confirm
            as |showModal|}}
            <button
              {{action (pipe showModal (action 'resolve'))}}
              id='trigger'></button>
        {{/fullscreen-confirm}}
      `);

      this.$('button#trigger').click();
      this.$(testSelector('cancel-button')).click();
      expect(this.$(testSelector('modal-contents')).length).to.equal(0);
    });
  }
);
