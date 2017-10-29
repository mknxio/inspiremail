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
    if (!$(css_selector).length)
        throw IMError('The given CSS selector does not match any DOM element.');

    /**
     * Private attributes
     */
    var _el_editor = $(css_selector);
    // --> editor components
    var comp_toolbar = new IM_Toolbar(),
        comp_editor = new IM_Editor();

    /**
     * Initialization
     */

    function _init () {
        _el_editor.addClass('im-container');
        _el_editor.append(comp_toolbar.html);
        _el_editor.append(comp_editor.html);
    }

    _init();
}
