/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import {
  beforeEach,
} from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'ember-fullscreen-confirm-demo/tests/helpers/ember-test-selectors';

describeComponent(
  'scary-button',
  'Integration: ScaryButtonComponent',
  {
    integration: true
  },
  function() {
    beforeEach(function() {
      this.render(hbs`
        <div id='fullscreen-modal-container'></div>
        {{scary-button}}
      `);
    });

    it('has a confirmable button', function() {
      expect(this.$(testSelector('show-confirm')).length).to.equal(1);
    });

    it('shows the scary image if you click confirm on the dialog', function() {
      this.$(testSelector('show-confirm')).click();
      this.$(testSelector('confirm-button')).click();
      expect(this.$(testSelector('scary-image')).length).to.equal(1);
    });

    it('does not show the scary image if you click cancel on the dialog', function() {
      this.$(testSelector('show-confirm')).click();
      this.$(testSelector('cancel-button')).click();
      expect(this.$(testSelector('scary-image')).length).to.equal(0);
    });
  }
);
