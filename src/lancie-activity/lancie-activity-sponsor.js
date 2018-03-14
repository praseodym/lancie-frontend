import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-image/iron-image.js';
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
      iron-image {
        display: block;
        width: 100%;
        margin-bottom: 20px;
      }
      iron-image:after {
        content: '';
        display: block;
        padding-bottom: 61.8%;
      }
      .prizes-block .prizes-header {
        background-color: var(--primary-color);
        padding: 3px 10px;
        color: var(--secondary-color);
      }
      .prizes-block ol {
        margin: 0;
        padding-right: 30px;
        background-color: #eeecec;
      }
      .prizes-block ol li {
        padding: 3px 0;
      }
    </style>

    <div class="sponsor">
      <a href="{{sponsor.website}}" target="_blank">
        <iron-image src="{{sponsor.imagePath}}" sizing="contain"></iron-image>
      </a>
      <div class="prizes-block">
        <div class="prizes-header">Prizes</div>
        <ol>
          <template is="dom-repeat" items="{{prizes}}">
            <li>{{item}}</li>
          </template>
        </ol>
      </div>
    </div>
`,

  is: 'lancie-activity-sponsor',

  properties: {
    sponsor: {
      type: Object,
      notify: true
    },
    prizes: {
      type: Object,
      value: [
        'First prize',
        'Second prize',
        'Third prize'
      ],
      notify: true
    }
  }
});
