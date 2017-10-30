"use strict";

function InspireMail(i, t) {
    function _init() {
        if (!a.attach(i)) throw IMError("The given CSS selector does not match any DOM element.");
        a.init();
    }
    if (!i) throw IMError("InspireMail must be instanciated with a CSS selector as first argument.");
    var a = new IM_DOMHandler();
    _init();
}

function IM_DOMHandler() {
    var i, t = "im-editor-container", a = {
        toolbar: {
            html: '<div class="im-toolbar"><div class="im-settings im-settings-email"><p class="im-settings-title">Email container</p><div class="im-param im-param-email-bg"><label for="im-input-email-bg">Background</label><input type="text" id="im-input-email-bg" class="im-colorpicker" maxlength="7" /></div></div><div class="im-settings im-settings-body"><p class="im-settings-title">Email body</p><div class="im-param im-param-body-bg"><label for="im-input-body-bg">Background</label><input type="text" id="im-input-body-bg" class="im-colorpicker" maxlength="7" /></div><div class="im-param im-param-body-width"><label for="im-input-body-width">Width</label><input type="text" id="im-input-body-width" placeholder="100%" /></div></div></div>'
        },
        visual_editor: {
            html: '<div class="im-editor"><div class="im-editor-frame"></div></div>'
        }
    }, e = {
        email_bg: {},
        body_bg: {},
        body_width: {}
    };
    IM_DOMHandler.prototype.init = function() {
        i.addClass(t), i.append(a.toolbar.html), i.append(a.visual_editor.html);
        var r = i.find(".im-toolbar");
        e.email_bg = r.find(".im-param-email-bg input"), e.body_bg = r.find(".im-param-body-bg input"), 
        e.body_width = r.find(".im-param-body-width input");
    }, IM_DOMHandler.prototype.attach = function(t) {
        return !!$(t).length && (i = $(t), !0);
    };
}

function IMError(i, t) {
    t = t || Error;
    var a = "[IMError] " + i;
    return new t(a);
}

function IM_Nodes() {}