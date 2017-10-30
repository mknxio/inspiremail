/**
 * IM_DOMHandler
 * @author mknx
 *
 * The DOM handler manages relations between code logic and DOM events.
 * It creates/updates/deletes nodes & values to reflect logic state.
 */

function IM_DOMHandler () {

    var _container_css_class = 'im-editor-container';
    var _el_editor;
    var _components = {
            toolbar: {
                html: '<div class="im-toolbar">' +
                        '<div class="im-settings im-settings-email">' +
                          '<p class="im-settings-title">Email container</p>' +
                          '<div class="im-param im-param-email-bg">' +
                            '<label for="im-input-email-bg">Background</label>' +
                            '<input type="text" id="im-input-email-bg" class="im-colorpicker" maxlength="7" />' +
                          '</div>' +
                        '</div>' +
                        '<div class="im-settings im-settings-body">' +
                          '<p class="im-settings-title">Email body</p>' +
                          '<div class="im-param im-param-body-bg">' +
                            '<label for="im-input-body-bg">Background</label>' +
                            '<input type="text" id="im-input-body-bg" class="im-colorpicker" maxlength="7" />' +
                          '</div>' +
                          '<div class="im-param im-param-body-width">' +
                            '<label for="im-input-body-width">Width</label>' +
                            '<input type="text" id="im-input-body-width" placeholder="100%" />' +
                          '</div>' +
                        '</div>' +
                      '</div>'
            },
            visual_editor: {
                html: '<div class="im-editor">' +
                        '<div class="im-editor-frame"></div>' +
                      '</div>'
            }
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
        _el_editor.append(_components.toolbar.html);
        _el_editor.append(_components.visual_editor.html);

        // Initialize jQuery node objects
        var toolbar = _el_editor.find('.im-toolbar');
        _editor_tools.email_bg = toolbar.find('.im-param-email-bg input');
        _editor_tools.body_bg = toolbar.find('.im-param-body-bg input');
        _editor_tools.body_width = toolbar.find('.im-param-body-width input');
    };

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
