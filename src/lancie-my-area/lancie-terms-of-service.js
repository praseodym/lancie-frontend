import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/neon-animation/neon-animations.js';
import '../../../../lancie-dialog/lancie-dialog.js';
import '../lancie-ticket-page/lancie-terms-of-service-text.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
'use strict';

Polymer({
  _template: `
    <style>
      lancie-dialog {
        --lancie-actual-dialog: {
          height: 90%;
          width: 80%;
        }
      }

      .dialog-content {
        flex: 1;
        height: 0%; /* Ayy Lmao */
        overflow-y: auto;
      }

      @media (max-width: 600px) {
        lancie-dialog {
          --lancie-actual-dialog: {
            height: 100%;
            width: 100%;
          }
        }
      }
    </style>

    <lancie-dialog id="termsOfService">
      <h2>Terms and conditions</h2>
      <div class="dialog-content">
        <lancie-terms-of-service-text></lancie-terms-of-service-text>
      </div>
      <div class="dialog-actions">
        <slot></slot>
      </div>
    </lancie-dialog>
`,

  is: 'lancie-terms-of-service',

  open: function() {
    this.$.termsOfService.open();
  },

  close: function() {
    this.$.termsOfService.close();
  }
});
