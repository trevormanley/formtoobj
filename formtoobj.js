/*
Form to Object
- A library for creating objects from form data

Copyright (c) 2015 Trevor Manley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var formToObject = formToObject || {
    parseForm : function (element, baseObj) {
        'use strict';
        baseObj = baseObj || {};
        var children, cn = 0, child;
        children = element.children;
        for (cn = 0; cn < children.length; cn += 1) {
            child = children[cn];
            if (child.name !== undefined) {
                if (child.tagName === "INPUT") {
                    if (child.type === "checkbox") {
                        if (child.checked) {
                            if (!baseObj.hasOwnProperty(child.name)) {
                                baseObj[child.name] = [];
                            }
                            baseObj[child.name].push(child.value);
                        }
                    } else if (child.type === "radio") {
                        if (child.checked) {
                            baseObj[child.name] = child.value;
                        }
                    } else {
                        baseObj[child.name] = child.value;
                    }
                } else {
                    baseObj[child.name] = child.value;
                }
            }
            baseObj = this.parseForm(child, baseObj);
        }
        return baseObj;
    }
};