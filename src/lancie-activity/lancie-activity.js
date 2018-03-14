import '../../../../@polymer/polymer/polymer.js';
import './lancie-activity-button.js';
import './lancie-activity-dialog.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
/**
@license
Copyright (c) 2015 The LANcie commission of W.I.S.V `Christiaan Huygens`. All rights reserved.
This code may only be used under the BSD style license found at https://github.com/WISVCH/LANcie/blob/master/LICENSE
*/
Polymer({
  _template: `
    <style>
      :host {
          display: block;
      }
    </style>

    <lancie-activity-dialog data="{{data}}">
      <lancie-activity-button data="{{data}}"></lancie-activity-button>
    </lancie-activity-dialog>
`,

  is: 'lancie-activity',

  properties: {
    data: {
      type: Object,
      value: {},
      notify: true
    }
  }
});
