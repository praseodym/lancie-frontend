import '../../../../@polymer/polymer/polymer.js';
import '../lazy-load.js';
import { Element } from '../../../../@polymer/polymer/polymer-element.js';

const iframeUrl = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fareafiftylan%2F&tabs=timeline&width=292&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId';

class LancieFacebook extends Lancie.lazyLoad(Element) {
  static get template() {
    return `
    <style>
      :host {
        display: block;
        margin: 16px auto 0;
      }
      iframe {
        border: none;
        overflow: hidden;
        height: 500px;
        width: 292px;
      }
    </style>

    <iframe id="frame" scrolling="no" frameborder="0" allowtransparency="true">
    </iframe>
`;
  }

  static get is() { return 'lancie-facebook'; }
  lazyCallback() {
    if (!this.$.frame.src) {
      this.$.frame.src = iframeUrl;
    }
  }
}
customElements.define(LancieFacebook.is, LancieFacebook);
