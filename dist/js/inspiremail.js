"use strict";

function InspireMail(i, t) {
    function init() {
        if (!n.attach(i)) throw IMError("The given CSS selector does not match any DOM element.");
        n.init();
    }
    if (!i) throw IMError("InspireMail must be instanciated with a CSS selector as first argument.");
    var n = new IM_DOMHandler();
    init();
}

function IM_DOMHandler() {
    function compileSVGTags() {
        var i = /(\{ *)(svg *: *)([a-zA-Z0-9_\-]+)( *\})/g;
        for (var t in n) {
            var o = n[t].html.match(i);
            if (o) for (var l in o) for (var a in e) if (o[l].indexOf(a) !== -1) {
                var r = o[l].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), s = n[t].html.replace(new RegExp(r, "g"), e[a]);
                n[t].html = s;
            }
        }
    }
    function handleAction(i, t, n, e) {
        var l = {
            _el: n
        };
        switch (i) {
          case "user_input":
            l.focused = function(i) {
                this._el.on("focus", i);
            };
            break;

          case "button":
            l.clicked = function(i) {
                this._el.on("click", i);
            };
        }
        if (e) for (var a in e) l[a] = e[a];
        o[t] = l;
    }
    function handleInputAction(i, t, n) {
        handleAction("user_input", i, t);
    }
    var i, t = "im-editor-container", n = {
        toolbar: {
            el: null,
            html: '<div class="im-toolbar"><div class="im-settings im-settings-tools"></div></div>'
        },
        visual_editor: {
            el: null,
            html: '<div class="im-veditor-wrapper"><div class="im-veditor-settings"><div class="im-settings im-settings-email"><p class="im-settings-title">Email</p><div class="im-param im-param-email-bg"><label for="im-input-email-bg">{ svg:icn_bg_color }</label><input type="text" id="im-input-email-bg" class="im-colorpicker" maxlength="7" /></div></div><div class="im-settings im-settings-body"><p class="im-settings-title">Email body</p><div class="im-param im-param-body-bg"><label for="im-input-body-bg">{ svg:icn_bg_color }</label><input type="text" id="im-input-body-bg" class="im-colorpicker" maxlength="7" /></div><div class="im-param im-param-body-width"><label for="im-input-body-width">{ svg:icn_width }</label><input type="text" id="im-input-body-width" placeholder="100%" /></div></div></div><div class="im-veditor"><div class="im-veditor-frame"></div></div></div>'
        }
    }, e = {
        icn_bg_color: '<?xml version="1.0" encoding="UTF-8"?><svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><path d="M45.1260175,42 L45,42 L45,43 C45,45.209139 46.790861,47 49,47 C51.209139,47 53,45.209139 53,43 L53,42 L52.8739825,42 C52.8739825,42 52.8739825,42 52.8739825,42 L53,42 L49,33 L45,42 L45.1260175,42 C45.1260175,42 45.1260175,42 45.1260175,42 Z" fill="#000000"></path><g id="Bucket" transform="translate(7.000000, 9.000000)"><polygon fill="#FFFFFF" points="20 3 37 20 3 20"></polygon><path d="M18,39 L1,22 L35,22 L18,39 Z M3,20 L35,20 L35,22 L3,22 L3,20 Z" fill="#000000"></path><path d="M19.9644661,3.06497116 L10.0649712,12.9644661 L10.0710678,12.9705627 L4.01040764,19.0312229 C1.86252404,21.1791065 1.86252404,24.6615139 4.01040764,26.8093975 L13.2027958,36.0017857 C15.3506794,38.1496693 18.8330868,38.1496693 20.9809704,36.0017857 L33.0814755,23.9012806 C33.1469223,23.8358338 33.2105245,23.7690172 33.3232137,23.647349 L36.9350288,20.0355339 L33.5949803,16.6954854 L33.4861995,16.5741908 C33.3603771,16.4175511 33.2253948,16.2670254 33.0814755,16.123106 L23.8890873,6.93071786 C23.7451679,6.78679846 23.5946422,6.65181625 23.4380025,6.52599384 L23.3167079,6.41721296 L19.9644661,3.06497116 Z" stroke="#000000" stroke-width="3"></path></g></g></g></svg>',
        icn_width: '<?xml version="1.0" encoding="UTF-8"?><svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="#000000"><g transform="translate(7.000000, 19.000000)"><rect x="5" y="7" width="36" height="8"></rect><polygon transform="translate(41.000000, 11.000000) rotate(90.000000) translate(-41.000000, -11.000000) " points="41 6 52 16 30 16"></polygon><polygon transform="translate(5.000000, 11.000000) rotate(-90.000000) translate(-5.000000, -11.000000) " points="5 6 16 16 -6 16"></polygon></g></g></g></svg>'
    }, o = {
        email_bg: {},
        body_bg: {},
        body_width: {}
    };
    IM_DOMHandler.prototype.init = function() {
        i.addClass(t), compileSVGTags(), i.append(n.toolbar.html), i.append(n.visual_editor.html);
        var e = i.find(".im-toolbar");
        n.toolbar.el = e, n.visual_editor.el = i.find(".im-editor"), handleInputAction("email_bg", e.find(".im-param-email-bg input")), 
        handleInputAction("body_bg", e.find(".im-param-body-bg input")), handleInputAction("body_width", e.find(".im-param-body-width input"));
    }, IM_DOMHandler.prototype.attach = function(t) {
        return !!$(t).length && (i = $(t), !0);
    };
}

function IMError(i, t) {
    t = t || Error;
    var n = "[IMError] " + i;
    return new t(n);
}

function IM_TemplateNodes() {}