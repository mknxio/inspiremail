"use strict";

function InspireMail(r, t) {
    if (!r) throw IMError("InspireMail must be instanciated with a CSS selector as first argument.");
    var i = r;
}

function IMError(r, t) {
    t = t || Error;
    var i = "[IMError] " + r;
    return new t(i);
}