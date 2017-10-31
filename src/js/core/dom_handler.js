/**
 * IM_DOMHandler
 * @author mknx
 *
 * The DOM handler manages relations between code logic and DOM events.
 * It creates/updates/deletes nodes & values to reflect logic state.
 *
 * ---
 * Note: All terms like 'HTML element', 'DOM element' or 'node' terms used here
 * in comments here are considered to reference to jQuery node arrays
 * (eg. jQ-element).
 */

function IM_DOMHandler () {

    var _container_css_class = 'im-editor-container';
    var _el_editor;
    var _components = {
            toolbar: {
                el: null,
                html: '<div class="im-toolbar">' +
                        '<div class="im-settings im-settings-tools">' +
                        '</div>' +
                      '</div>'
            },
            visual_editor: {
                el: null,
                html: '<div class="im-veditor-wrapper">' +
                        '<div class="im-veditor-settings">' +
                          '<div class="im-settings im-settings-email">' +
                            '<p class="im-settings-title">Email</p>' +
                            '<div class="im-param im-param-email-bg">' +
                              '<label for="im-input-email-bg">' +
                                '{ svg:icn_bg_color }' +
                              '</label>' +
                              '<input type="text" id="im-input-email-bg" class="im-colorpicker" maxlength="7" />' +
                            '</div>' +
                          '</div>' +
                          '<div class="im-settings im-settings-body">' +
                            '<p class="im-settings-title">Email body</p>' +
                            '<div class="im-param im-param-body-bg">' +
                              '<label for="im-input-body-bg">' +
                                '{ svg:icn_bg_color }' +
                              '</label>' +
                              '<input type="text" id="im-input-body-bg" class="im-colorpicker" maxlength="7" />' +
                            '</div>' +
                            '<div class="im-param im-param-body-width">' +
                              '<label for="im-input-body-width">' +
                                '{ svg:icn_width }' +
                              '</label>' +
                              '<input type="text" id="im-input-body-width" placeholder="100%" />' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                        '<div class="im-veditor">' +
                          '<div class="im-veditor-frame"></div>' +
                        '</div>' +
                      '</div>'
            }
        };
    var _svgs = {
        icn_bg_color: '<?xml version="1.0" encoding="UTF-8"?><svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><path d="M45.1260175,42 L45,42 L45,43 C45,45.209139 46.790861,47 49,47 C51.209139,47 53,45.209139 53,43 L53,42 L52.8739825,42 C52.8739825,42 52.8739825,42 52.8739825,42 L53,42 L49,33 L45,42 L45.1260175,42 C45.1260175,42 45.1260175,42 45.1260175,42 Z" fill="#000000"></path><g id="Bucket" transform="translate(7.000000, 9.000000)"><polygon fill="#FFFFFF" points="20 3 37 20 3 20"></polygon><path d="M18,39 L1,22 L35,22 L18,39 Z M3,20 L35,20 L35,22 L3,22 L3,20 Z" fill="#000000"></path><path d="M19.9644661,3.06497116 L10.0649712,12.9644661 L10.0710678,12.9705627 L4.01040764,19.0312229 C1.86252404,21.1791065 1.86252404,24.6615139 4.01040764,26.8093975 L13.2027958,36.0017857 C15.3506794,38.1496693 18.8330868,38.1496693 20.9809704,36.0017857 L33.0814755,23.9012806 C33.1469223,23.8358338 33.2105245,23.7690172 33.3232137,23.647349 L36.9350288,20.0355339 L33.5949803,16.6954854 L33.4861995,16.5741908 C33.3603771,16.4175511 33.2253948,16.2670254 33.0814755,16.123106 L23.8890873,6.93071786 C23.7451679,6.78679846 23.5946422,6.65181625 23.4380025,6.52599384 L23.3167079,6.41721296 L19.9644661,3.06497116 Z" stroke="#000000" stroke-width="3"></path></g></g></g></svg>',
        icn_width: '<?xml version="1.0" encoding="UTF-8"?><svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="#000000"><g transform="translate(7.000000, 19.000000)"><rect x="5" y="7" width="36" height="8"></rect><polygon transform="translate(41.000000, 11.000000) rotate(90.000000) translate(-41.000000, -11.000000) " points="41 6 52 16 30 16"></polygon><polygon transform="translate(5.000000, 11.000000) rotate(-90.000000) translate(-5.000000, -11.000000) " points="5 6 16 16 -6 16"></polygon></g></g></g></svg>'
    };
    var _editor_tools = {
        email_bg: {},
        body_bg: {},
        body_width: {}
    };

    /**
     * Initialize the editor by adding required components and attaching to them
     * event handlers.
     */
    IM_DOMHandler.prototype.init = function() {
        // Perform DOM updates for initialization
        _el_editor.addClass(_container_css_class);
        compileSVGTags();
        _el_editor.append(_components.toolbar.html);
        _el_editor.append(_components.visual_editor.html);

        // Initialize jQuery elements
        var toolbar = _el_editor.find('.im-toolbar');
        _components.toolbar.el = toolbar;
        _components.visual_editor.el = _el_editor.find('.im-editor');
        handleInputAction('email_bg', toolbar.find('.im-param-email-bg input'));
        handleInputAction('body_bg', toolbar.find('.im-param-body-bg input'));
        handleInputAction('body_width', toolbar.find('.im-param-body-width input'));
    };

    /**
     * Mainly used at initialization to compile SVG tags to right places
     * in the DOM.
     */
    function compileSVGTags () {
        var rgx_svg_pattern = /(\{ *)(svg *: *)([a-zA-Z0-9_\-]+)( *\})/g;
        for (var i in _components) {
            var matches = _components[i].html.match(rgx_svg_pattern);
            if (matches) {
                for (var j in matches) {
                    for (var k in _svgs) {
                        if (matches[j].indexOf(k) !== -1) {
                            var esc_rgx_match = matches[j].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                            var compiled_html = _components[i].html.replace(
                                                    (new RegExp(esc_rgx_match, 'g')),
                                                    _svgs[k]
                                                );
                            _components[i].html = compiled_html;
                        }
                    }
                }
            }
        }
    }

    /**
     * Register a new tool with given name and given DOM element.
     * This method attaches event listeners to the given element, so they can
     * be further used to handle user actions.
     *
     * @param  {string} type [tool type to register: user_input, button]
     * @param  {string} name [tool name]
     * @param  {jQ-element} el [jQ-element to handle]
     * @param  {object} custom_evts [object of custom events to add to the element]
     */
    function handleAction (type, name, el, custom_evts) {
        var tool = {
            _el: el
        };

        // Attach default events
        switch (type) {

            case 'user_input':
                tool.focused = function (callback) {
                    this._el.on('focus', callback);
                }
                break;

            case 'button':
                tool.clicked = function (callback) {
                    this._el.on('click', callback);
                }
                break;

        }

        // Attach custom events to the tool
        if (custom_evts) {
            for (var i in custom_evts)
                tool[i] = custom_evts[i];
        }

        _editor_tools[name] = tool;
    }

    /**
     * Alias of handleAction() for: user input
     *
     * @param  {string} name [tool name]
     * @param  {jQ-element} el [jQ-element to handle]
     */
    function handleInputAction (name, el, custom_evts) {
        handleAction('user_input', name, el);
    }

    /**
     * Alias of handleAction() for: button
     *
     * @param  {string} name [tool name]
     * @param  {jQ-element} el [jQ-element to handle]
     */
    function handleButtonAction (name, el, custom_evts) {
        handleAction('button', name, el);
    }

    /**
     * Link the given HTML element to the DOM handler, so the latter will be
     * able to manage its internal components.
     *
     * @param  {string} css_selector [selector of the element to link]
     *
     * @return {boolean} [true if attaching succeeds]
     */
    IM_DOMHandler.prototype.attach = function(css_selector) {
        if (!$(css_selector).length)
            return false;

        _el_editor = $(css_selector);
        return true;
    };

}
