import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-ajax/iron-ajax.js';
import '../../../../@polymer/marked-element/marked-element.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

Polymer({
  _template: `
  <style>
    :host {
      display: block;
    }

    marked-element a {
      color: var(--secondary-color);
    }
  </style>

  <iron-ajax auto="" url="[[markdown]]" handle-as="text" on-response="onResponse" on-error="onError"></iron-ajax>

  <marked-element markdown="[[text]]">
    <div slot="markdown-html"></div>
  </marked-element>
`,

  is: 'lancie-faq',

  properties: {
    text: String,
    markdown: String
  },

  onResponse: function (e, request) {
    if (request.succeeded) {
      this.text = request.response;
    }
  },

  onError: function () {
    this.text = 'There are no frequently asked questions yet. If you have a question, feel free to [ask us](/contact)!';
  }
});
