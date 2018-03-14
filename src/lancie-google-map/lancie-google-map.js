import '../../../../@polymer/polymer/polymer.js';
import '../../../../google-map/google-map.js';
import '../../../../google-map/google-map-marker.js';
import '../lazy-load.js';
import { Element } from '../../../../@polymer/polymer/polymer-element.js';
'use strict';
class LancieGoogleMap extends Lancie.lazyLoad(Element) {
  static get template() {
    return `
    <template is="dom-if" if="[[lazyLoaded]]">
      <google-map latitude="51.995168" longitude="4.377186" zoom="14" disable-zoom="" fit-to-markers="" draggable="false" api-key="{{googleMapsToken.message}}">
        <google-map-marker slot="markers" latitude="51.995168" longitude="4.377186" draggable="true" title="Area FiftyLAN"></google-map-marker>
      </google-map>
    </template>
`;
  }

  static get is() { return 'lancie-google-map'; }
  static get properties() {
    return {
      googleMapsToken: Object,
      lazyLoaded: {
        type: Boolean,
        value: false
      }
    };
  }
  lazyCallback() {
    this.lazyLoaded = true;
  }
}
customElements.define(LancieGoogleMap.is, LancieGoogleMap);
