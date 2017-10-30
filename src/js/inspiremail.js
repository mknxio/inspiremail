'use strict';

/**
 * InspireMail handler
 * @author mknx
 *
 * Main entry point for the InspireMail library.
 *
 * @param {string} css_selector [selector of the element to attach the editor to]
 * @param {object} init_options [a proper set of options to configure the editor]
 *
 * @return {InspireMail instance}
 */

function InspireMail (css_selector, init_options) {
    // Arguments checking
    if (!css_selector)
        throw IMError('InspireMail must be instanciated with a CSS selector as first argument.');

    /**
     * Private attributes
     */
    var _dom_handler = new IM_DOMHandler();

    /**
     * Initialization
     */

    function _init () {
        if (!_dom_handler.attach(css_selector))
            throw IMError('The given CSS selector does not match any DOM element.');
        _dom_handler.init();
    }

    _init();
}
