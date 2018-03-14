import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/iron-image/iron-image.js';
import '../../../../@polymer/paper-material/paper-material.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
/**
@license
Copyright (c) 2015 The LANcie commission of W.I.S.V `Christiaan Huygens`. All rights reserved.
This code may only be used under the BSD style license found at https://github.com/WISVCH/LANcie/blob/master/LICENSE
*/
'use strict';
Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
      :host {
        display: block;
        cursor: pointer;
      }
      paper-material {
        display: inline-block;
        position: relative;
        width: 100%;
      }
      paper-material:after {
        content: '';
        display: block;
        padding-top: 100%;
      }
      paper-material.footer .container .header {
        height: 75%;
      }
      .container, .overlay, .header, iron-image {
        position: absolute;
        height: 100%;
        width: 100%;
      }
      .overlay {
        overflow: hidden;
        background-color: rgba(26, 42, 67, 0.4);
      }
      .header {
        text-align: center;
        color: #ffffff;
        font-size: 52px;
      }
      .header h1, .header h2 {
        line-height: 1.3em;
        margin: 0 auto;
      }
      .header h1 {
        font-weight: 500;
        font-size: 100%;
      }
      @media (max-width: 1000px) {
        .header h1 {
          font-size: 60%;
        }
      }
      .header h2 {
        font-weight: 100;
        font-size: 60%;
      }
    </style>
    <paper-material elevation="1" class\$="{{_computeClass(data.footer)}}">
      <div class="container">
        <iron-image sizing="cover" preload="" src="{{data.backgroundImagePath}}"></iron-image>

        <div class="overlay"></div>
        <div id="header" class="header layout vertical center-center">
          <h1>{{data.title}}</h1>
          <h2>{{data.subtitle}}</h2>
        </div>
      </div>
    </paper-material>
`,

  is: 'lancie-activity-button',

  properties: {
    data: {
      type: Object,
      value: {},
      notify:true
    }
  },

  ready: function() {
    if (this.clientWidth !== 0) {
      this.$.header.style.fontSize = (this.clientWidth / 6) + 'px';
    }
  },

  _computeClass: function(footer) {
    return (footer) ? 'footer' : 'no-footer';
  }
});
