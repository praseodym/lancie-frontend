import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-ajax/iron-ajax.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/iron-media-query/iron-media-query.js';
import './lancie-activity.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
/**
@license
Copyright (c) 2015 The LANcie commission of W.I.S.V `Christiaan Huygens`. All rights reserved.
This code may only be used under the BSD style license found at https://github.com/WISVCH/LANcie/blob/master/LICENSE
*/
Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
      :host {
        display: block;
      }

      lancie-activity {
        padding: 20px 10px;
        box-sizing: border-box;
        width: 25%;
      }

      @media (max-width: 750px) {
        lancie-activity {
          width: 50%;
        }
      }
    </style>

    <iron-ajax auto="" url="{{json}}" handle-as="json" last-response="{{activities}}" debounce-duration="300"></iron-ajax>

    <div id="container" class="layout horizontal wrap start-justified">
      <template is="dom-repeat" items="[[activities]]" as="activity">
        <lancie-activity class="lancie-block" data="{{activity}}"></lancie-activity>
      </template>
    </div>
`,

  is: 'lancie-activities',

  properties: {
    data: {
      type: Array,
      value: []
    },
    activities: {
      type: Array,
      value: [],
      notify: true
    },
    json: {
      notify: true
    }
  }
});
