"use strict";

function InspireMail(t, i) {
    function _init() {
        r.addClass("im-container"), r.append(n.html), r.append(o.html);
    }
    if (!t) throw IMError("InspireMail must be instanciated with a CSS selector as first argument.");
    if (!$(t).length) throw IMError("The given CSS selector does not match any DOM element.");
    var r = $(t), n = new IM_Toolbar(), o = new IM_Editor();
    _init();
}

function IMError(t, i) {
    i = i || Error;
    var r = "[IMError] " + t;
    return new i(r);
}

function IM_Nodes() {}

function IM_Editor() {
    this.html = '<div class="im-editor">EDITOR</div>';
}

function IM_Toolbar() {
    this.html = '<div class="im-toolbar">TOOLBAR</div>';
}