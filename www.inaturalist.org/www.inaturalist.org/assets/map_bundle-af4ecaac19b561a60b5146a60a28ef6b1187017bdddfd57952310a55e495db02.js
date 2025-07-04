function markerObscuredRectangle(marker, shapeOptions) {
    var cell_size = .2,
        position = marker.getPosition(),
        coords = [position.lat(), position.lng()],
        ll = [coords[0] - coords[0] % cell_size, coords[1] - coords[1] % cell_size],
        uu = [ll[0], ll[1]];
    return _.each(coords, (function(value, key) {
        value < uu[key] ? uu[key] -= cell_size : uu[key] += cell_size
    })), new google.maps.Rectangle(_.extend(shapeOptions, {
        bounds: new google.maps.LatLngBounds(new google.maps.LatLng(Math.min(uu[0], ll[0]), Math.min(uu[1], ll[1])), new google.maps.LatLng(Math.max(uu[0], ll[0]), Math.max(uu[1], ll[1])))
    }))
}! function(name, context, definition) {
    "undefined" != typeof module ? module.exports = definition(name, context) : "function" == typeof define && "object" == typeof define.amd ? define(definition) : context[name] = definition(name, context)
}("bean", this, (function(name, context) {
    var map, forAll, commonProps, mouseProps, mouseWheelProps, keyProps, textProps, touchProps, preventDefault, createPreventDefault, stopPropagation, createStopPropagation, createStop, copyProps, win = window,
        old = context[name],
        overOut = /over|out/,
        namespaceRegex = /[^\.]*(?=\..*)\.|.*/,
        nameRegex = /\..*/,
        addEvent = "addEventListener",
        attachEvent = "attachEvent",
        removeEvent = "removeEventListener",
        detachEvent = "detachEvent",
        doc = document || {},
        root = doc.documentElement || {},
        W3C_MODEL = root[addEvent],
        eventSupport = W3C_MODEL ? addEvent : attachEvent,
        slice = Array.prototype.slice,
        mouseTypeRegex = /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,
        mouseWheelTypeRegex = /mouse.*(wheel|scroll)/i,
        textTypeRegex = /^text/i,
        touchTypeRegex = /^touch|^gesture/i,
        ONE = {
            one: 1
        },
        nativeEvents = function(hash, events, i) {
            for (i = 0; i < events.length; i++) hash[events[i]] = 1;
            return hash
        }({}, ("click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange error abort scroll " + (W3C_MODEL ? "show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend message readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete " : "")).split(" ")),
        customEvents = function() {
            function isDescendant(parent, node) {
                for (; null !== (node = node.parentNode);)
                    if (node === parent) return !0;
                return !1
            }

            function check(event) {
                var related = event.relatedTarget;
                return related ? related !== this && "xul" !== related.prefix && !/document/.test(this.toString()) && !isDescendant(this, related) : null === related
            }
            return {
                mouseenter: {
                    base: "mouseover",
                    condition: check
                },
                mouseleave: {
                    base: "mouseout",
                    condition: check
                },
                mousewheel: {
                    base: /Firefox/.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"
                }
            }
        }(),
        fixEvent = (commonProps = "altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which".split(" "), mouseProps = commonProps.concat("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" ")), mouseWheelProps = mouseProps.concat("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis".split(" ")), keyProps = commonProps.concat("char charCode key keyCode keyIdentifier keyLocation".split(" ")), textProps = commonProps.concat(["data"]), touchProps = commonProps.concat("touches targetTouches changedTouches scale rotation".split(" ")), preventDefault = "preventDefault", createPreventDefault = function(event) {
            return function() {
                event[preventDefault] ? event[preventDefault]() : event.returnValue = !1
            }
        }, stopPropagation = "stopPropagation", createStopPropagation = function(event) {
            return function() {
                event[stopPropagation] ? event[stopPropagation]() : event.cancelBubble = !0
            }
        }, createStop = function(synEvent) {
            return function() {
                synEvent[preventDefault](), synEvent[stopPropagation](), synEvent.stopped = !0
            }
        }, copyProps = function(event, result, props) {
            var i, p;
            for (i = props.length; i--;) !((p = props[i]) in result) && p in event && (result[p] = event[p])
        }, function(event, isNative) {
            var result = {
                originalEvent: event,
                isNative: isNative
            };
            if (!event) return result;
            var props, type = event.type,
                target = event.target || event.srcElement;
            return result[preventDefault] = createPreventDefault(event), result[stopPropagation] = createStopPropagation(event), result.stop = createStop(result), result.target = target && 3 === target.nodeType ? target.parentNode : target, isNative && (-1 !== type.indexOf("key") ? (props = keyProps, result.keyCode = event.which || event.keyCode) : mouseTypeRegex.test(type) ? (props = mouseProps, result.rightClick = 3 === event.which || 2 === event.button, result.pos = {
                x: 0,
                y: 0
            }, event.pageX || event.pageY ? (result.clientX = event.pageX, result.clientY = event.pageY) : (event.clientX || event.clientY) && (result.clientX = event.clientX + doc.body.scrollLeft + root.scrollLeft, result.clientY = event.clientY + doc.body.scrollTop + root.scrollTop), overOut.test(type) && (result.relatedTarget = event.relatedTarget || event[("mouseover" === type ? "from" : "to") + "Element"])) : touchTypeRegex.test(type) ? props = touchProps : mouseWheelTypeRegex.test(type) ? props = mouseWheelProps : textTypeRegex.test(type) && (props = textProps), copyProps(event, result, props || commonProps)), result
        }),
        targetElement = function(element, isNative) {
            return W3C_MODEL || isNative || element !== doc && element !== win ? element : root
        },
        RegEntry = function() {
            function entry(element, type, handler, original, namespaces) {
                this.element = element, this.type = type, this.handler = handler, this.original = original, this.namespaces = namespaces, this.custom = customEvents[type], this.isNative = nativeEvents[type] && element[eventSupport], this.eventType = W3C_MODEL || this.isNative ? type : "propertychange", this.customType = !W3C_MODEL && !this.isNative && type, this.target = targetElement(element, this.isNative), this.eventSupport = this.target[eventSupport]
            }
            return entry.prototype = {
                inNamespaces: function(checkNamespaces) {
                    var i, j;
                    if (!checkNamespaces) return !0;
                    if (!this.namespaces) return !1;
                    for (i = checkNamespaces.length; i--;)
                        for (j = this.namespaces.length; j--;)
                            if (checkNamespaces[i] === this.namespaces[j]) return !0;
                    return !1
                },
                matches: function(checkElement, checkOriginal, checkHandler) {
                    return !(this.element !== checkElement || checkOriginal && this.original !== checkOriginal || checkHandler && this.handler !== checkHandler)
                }
            }, entry
        }(),
        registry = (map = {}, forAll = function(element, type, original, handler, fn) {
            if (type && "*" !== type) {
                var l, i = 0,
                    list = map["$" + type],
                    all = "*" === element;
                if (!list) return;
                for (l = list.length; i < l; i++)
                    if ((all || list[i].matches(element, original, handler)) && !fn(list[i], list, i, type)) return
            } else
                for (var t in map) "$" === t.charAt(0) && forAll(element, t.substr(1), original, handler, fn)
        }, {
            has: function(element, type, original) {
                var i, list = map["$" + type];
                if (list)
                    for (i = list.length; i--;)
                        if (list[i].matches(element, original, null)) return !0;
                return !1
            },
            get: function(element, type, original) {
                var entries = [];
                return forAll(element, type, original, null, (function(entry) {
                    return entries.push(entry)
                })), entries
            },
            put: function(entry) {
                return (map["$" + entry.type] || (map["$" + entry.type] = [])).push(entry), entry
            },
            del: function(entry) {
                forAll(entry.element, entry.type, null, entry.handler, (function(entry, list, i) {
                    return list.splice(i, 1), 0 === list.length && delete map["$" + entry.type], !1
                }))
            },
            entries: function() {
                var t, entries = [];
                for (t in map) "$" === t.charAt(0) && (entries = entries.concat(map[t]));
                return entries
            }
        }),
        listener = W3C_MODEL ? function(element, type, fn, add) {
            element[add ? addEvent : removeEvent](type, fn, !1)
        } : function(element, type, fn, add, custom) {
            custom && add && null === element["_on" + custom] && (element["_on" + custom] = 0), element[add ? attachEvent : detachEvent]("on" + type, fn)
        },
        nativeHandler = function(element, fn, args) {
            return function(event) {
                return event = fixEvent(event || ((this.ownerDocument || this.document || this).parentWindow || win).event, !0), fn.apply(element, [event].concat(args))
            }
        },
        customHandler = function(element, fn, type, condition, args, isNative) {
            return function(event) {
                (condition ? condition.apply(this, arguments) : W3C_MODEL || (event && event.propertyName === "_on" + type || !event)) && (event && (event = fixEvent(event || ((this.ownerDocument || this.document || this).parentWindow || win).event, isNative)), fn.apply(element, !event || args && 0 !== args.length ? slice.call(arguments, event ? 0 : 1).concat(args) : arguments))
            }
        },
        once = function(rm, element, type, fn, originalFn) {
            return function() {
                rm(element, type, originalFn), fn.apply(this, arguments)
            }
        },
        removeListener = function(element, orgType, handler, namespaces) {
            var i, l, entry, type = orgType && orgType.replace(nameRegex, ""),
                handlers = registry.get(element, type, handler);
            for (i = 0, l = handlers.length; i < l; i++) handlers[i].inNamespaces(namespaces) && ((entry = handlers[i]).eventSupport && listener(entry.target, entry.eventType, entry.handler, !1, entry.type), registry.del(entry))
        },
        addListener = function(element, orgType, fn, originalFn, args) {
            var entry, type = orgType.replace(nameRegex, ""),
                namespaces = orgType.replace(namespaceRegex, "").split(".");
            if (registry.has(element, type, fn)) return element;
            "unload" === type && (fn = once(removeListener, element, type, fn, originalFn)), customEvents[type] && (customEvents[type].condition && (fn = customHandler(element, fn, type, customEvents[type].condition, !0)), type = customEvents[type].base || type), (entry = registry.put(new RegEntry(element, type, fn, originalFn, namespaces[0] && namespaces))).handler = entry.isNative ? nativeHandler(element, entry.handler, args) : customHandler(element, entry.handler, type, !1, args, !1), entry.eventSupport && listener(entry.target, entry.eventType, entry.handler, !0, entry.customType)
        },
        del = function(selector, fn, $) {
            return function(e) {
                var target, i, array = "string" == typeof selector ? $(selector, this) : selector;
                for (target = e.target; target && target !== this; target = target.parentNode)
                    for (i = array.length; i--;)
                        if (array[i] === target) return fn.apply(target, arguments)
            }
        },
        remove = function(element, typeSpec, fn) {
            var k, type, namespaces, i, rm = removeListener,
                isString = typeSpec && "string" == typeof typeSpec;
            if (isString && typeSpec.indexOf(" ") > 0) {
                for (i = (typeSpec = typeSpec.split(" ")).length; i--;) remove(element, typeSpec[i], fn);
                return element
            }
            if ((type = isString && typeSpec.replace(nameRegex, "")) && customEvents[type] && (type = customEvents[type].type), !typeSpec || isString)(namespaces = isString && typeSpec.replace(namespaceRegex, "")) && (namespaces = namespaces.split(".")), rm(element, type, fn, namespaces);
            else if ("function" == typeof typeSpec) rm(element, null, typeSpec);
            else
                for (k in typeSpec) typeSpec.hasOwnProperty(k) && remove(element, k, typeSpec[k]);
            return element
        },
        add = function(element, events, fn, delfn, $) {
            var type, types, i, args, originalFn = fn,
                isDel = fn && "string" == typeof fn;
            if (events && !fn && "object" == typeof events)
                for (type in events) events.hasOwnProperty(type) && add.apply(this, [element, type, events[type]]);
            else
                for (args = arguments.length > 3 ? slice.call(arguments, 3) : [], types = (isDel ? fn : events).split(" "), isDel && (fn = del(events, originalFn = delfn, $)) && (args = slice.call(args, 1)), this === ONE && (fn = once(remove, element, events, fn, originalFn)), i = types.length; i--;) addListener(element, types[i], fn, originalFn, args);
            return element
        },
        one = function() {
            return add.apply(ONE, arguments)
        },
        fireListener = W3C_MODEL ? function(isNative, type, element) {
            var evt = doc.createEvent(isNative ? "HTMLEvents" : "UIEvents");
            evt[isNative ? "initEvent" : "initUIEvent"](type, !0, !0, win, 1), element.dispatchEvent(evt)
        } : function(isNative, type, element) {
            element = targetElement(element, isNative), isNative ? element.fireEvent("on" + type, doc.createEventObject()) : element["_on" + type]++
        },
        clone = function(element, from, type) {
            for (var i = 0, handlers = registry.get(from, type), l = handlers.length; i < l; i++) handlers[i].original && add(element, handlers[i].type, handlers[i].original);
            return element
        },
        bean = {
            add: add,
            one: one,
            remove: remove,
            clone: clone,
            fire: function(element, type, args) {
                var i, j, l, names, handlers, types = type.split(" ");
                for (i = types.length; i--;)
                    if (type = types[i].replace(nameRegex, ""), (names = types[i].replace(namespaceRegex, "")) && (names = names.split(".")), names || args || !element[eventSupport])
                        for (handlers = registry.get(element, type), args = [!1].concat(args), j = 0, l = handlers.length; j < l; j++) handlers[j].inNamespaces(names) && handlers[j].handler.apply(element, args);
                    else fireListener(nativeEvents[type], type, element);
                return element
            },
            noConflict: function() {
                return context[name] = old, this
            }
        };
    if (win[attachEvent]) {
        var cleanup = function() {
            var i, entries = registry.entries();
            for (i in entries) entries[i].type && "unload" !== entries[i].type && remove(entries[i].element, entries[i].type);
            win[detachEvent]("onunload", cleanup), win.CollectGarbage && win.CollectGarbage()
        };
        win[attachEvent]("onunload", cleanup)
    }
    return bean
}));
var html4 = {
        atype: {
            NONE: 0,
            URI: 1,
            URI_FRAGMENT: 11,
            SCRIPT: 2,
            STYLE: 3,
            ID: 4,
            IDREF: 5,
            IDREFS: 6,
            GLOBAL_NAME: 7,
            LOCAL_NAME: 8,
            CLASSES: 9,
            FRAME_TARGET: 10
        },
        ATTRIBS: {
            "*::class": 9,
            "*::dir": 0,
            "*::id": 4,
            "*::lang": 0,
            "*::onclick": 2,
            "*::ondblclick": 2,
            "*::onkeydown": 2,
            "*::onkeypress": 2,
            "*::onkeyup": 2,
            "*::onload": 2,
            "*::onmousedown": 2,
            "*::onmousemove": 2,
            "*::onmouseout": 2,
            "*::onmouseover": 2,
            "*::onmouseup": 2,
            "*::style": 3,
            "*::title": 0,
            "a::accesskey": 0,
            "a::coords": 0,
            "a::href": 1,
            "a::hreflang": 0,
            "a::name": 7,
            "a::onblur": 2,
            "a::onfocus": 2,
            "a::rel": 0,
            "a::rev": 0,
            "a::shape": 0,
            "a::tabindex": 0,
            "a::target": 10,
            "a::type": 0,
            "area::accesskey": 0,
            "area::alt": 0,
            "area::coords": 0,
            "area::href": 1,
            "area::nohref": 0,
            "area::onblur": 2,
            "area::onfocus": 2,
            "area::shape": 0,
            "area::tabindex": 0,
            "area::target": 10,
            "bdo::dir": 0,
            "blockquote::cite": 1,
            "br::clear": 0,
            "button::accesskey": 0,
            "button::disabled": 0,
            "button::name": 8,
            "button::onblur": 2,
            "button::onfocus": 2,
            "button::tabindex": 0,
            "button::type": 0,
            "button::value": 0,
            "canvas::height": 0,
            "canvas::width": 0,
            "caption::align": 0,
            "col::align": 0,
            "col::char": 0,
            "col::charoff": 0,
            "col::span": 0,
            "col::valign": 0,
            "col::width": 0,
            "colgroup::align": 0,
            "colgroup::char": 0,
            "colgroup::charoff": 0,
            "colgroup::span": 0,
            "colgroup::valign": 0,
            "colgroup::width": 0,
            "del::cite": 1,
            "del::datetime": 0,
            "dir::compact": 0,
            "div::align": 0,
            "dl::compact": 0,
            "font::color": 0,
            "font::face": 0,
            "font::size": 0,
            "form::accept": 0,
            "form::action": 1,
            "form::autocomplete": 0,
            "form::enctype": 0,
            "form::method": 0,
            "form::name": 7,
            "form::onreset": 2,
            "form::onsubmit": 2,
            "form::target": 10,
            "h1::align": 0,
            "h2::align": 0,
            "h3::align": 0,
            "h4::align": 0,
            "h5::align": 0,
            "h6::align": 0,
            "hr::align": 0,
            "hr::noshade": 0,
            "hr::size": 0,
            "hr::width": 0,
            "iframe::align": 0,
            "iframe::frameborder": 0,
            "iframe::height": 0,
            "iframe::marginheight": 0,
            "iframe::marginwidth": 0,
            "iframe::width": 0,
            "img::align": 0,
            "img::alt": 0,
            "img::border": 0,
            "img::height": 0,
            "img::hspace": 0,
            "img::ismap": 0,
            "img::name": 7,
            "img::src": 1,
            "img::usemap": 11,
            "img::vspace": 0,
            "img::width": 0,
            "input::accept": 0,
            "input::accesskey": 0,
            "input::align": 0,
            "input::alt": 0,
            "input::autocomplete": 0,
            "input::checked": 0,
            "input::disabled": 0,
            "input::ismap": 0,
            "input::maxlength": 0,
            "input::name": 8,
            "input::onblur": 2,
            "input::onchange": 2,
            "input::onfocus": 2,
            "input::onselect": 2,
            "input::readonly": 0,
            "input::size": 0,
            "input::src": 1,
            "input::tabindex": 0,
            "input::type": 0,
            "input::usemap": 11,
            "input::value": 0,
            "ins::cite": 1,
            "ins::datetime": 0,
            "label::accesskey": 0,
            "label::for": 5,
            "label::onblur": 2,
            "label::onfocus": 2,
            "legend::accesskey": 0,
            "legend::align": 0,
            "li::type": 0,
            "li::value": 0,
            "map::name": 7,
            "menu::compact": 0,
            "ol::compact": 0,
            "ol::start": 0,
            "ol::type": 0,
            "optgroup::disabled": 0,
            "optgroup::label": 0,
            "option::disabled": 0,
            "option::label": 0,
            "option::selected": 0,
            "option::value": 0,
            "p::align": 0,
            "pre::width": 0,
            "q::cite": 1,
            "select::disabled": 0,
            "select::multiple": 0,
            "select::name": 8,
            "select::onblur": 2,
            "select::onchange": 2,
            "select::onfocus": 2,
            "select::size": 0,
            "select::tabindex": 0,
            "table::align": 0,
            "table::bgcolor": 0,
            "table::border": 0,
            "table::cellpadding": 0,
            "table::cellspacing": 0,
            "table::frame": 0,
            "table::rules": 0,
            "table::summary": 0,
            "table::width": 0,
            "tbody::align": 0,
            "tbody::char": 0,
            "tbody::charoff": 0,
            "tbody::valign": 0,
            "td::abbr": 0,
            "td::align": 0,
            "td::axis": 0,
            "td::bgcolor": 0,
            "td::char": 0,
            "td::charoff": 0,
            "td::colspan": 0,
            "td::headers": 6,
            "td::height": 0,
            "td::nowrap": 0,
            "td::rowspan": 0,
            "td::scope": 0,
            "td::valign": 0,
            "td::width": 0,
            "textarea::accesskey": 0,
            "textarea::cols": 0,
            "textarea::disabled": 0,
            "textarea::name": 8,
            "textarea::onblur": 2,
            "textarea::onchange": 2,
            "textarea::onfocus": 2,
            "textarea::onselect": 2,
            "textarea::readonly": 0,
            "textarea::rows": 0,
            "textarea::tabindex": 0,
            "tfoot::align": 0,
            "tfoot::char": 0,
            "tfoot::charoff": 0,
            "tfoot::valign": 0,
            "th::abbr": 0,
            "th::align": 0,
            "th::axis": 0,
            "th::bgcolor": 0,
            "th::char": 0,
            "th::charoff": 0,
            "th::colspan": 0,
            "th::headers": 6,
            "th::height": 0,
            "th::nowrap": 0,
            "th::rowspan": 0,
            "th::scope": 0,
            "th::valign": 0,
            "th::width": 0,
            "thead::align": 0,
            "thead::char": 0,
            "thead::charoff": 0,
            "thead::valign": 0,
            "tr::align": 0,
            "tr::bgcolor": 0,
            "tr::char": 0,
            "tr::charoff": 0,
            "tr::valign": 0,
            "ul::compact": 0,
            "ul::type": 0
        },
        eflags: {
            OPTIONAL_ENDTAG: 1,
            EMPTY: 2,
            CDATA: 4,
            RCDATA: 8,
            UNSAFE: 16,
            FOLDABLE: 32,
            SCRIPT: 64,
            STYLE: 128
        },
        ELEMENTS: {
            a: 0,
            abbr: 0,
            acronym: 0,
            address: 0,
            applet: 16,
            area: 2,
            b: 0,
            base: 18,
            basefont: 18,
            bdo: 0,
            big: 0,
            blockquote: 0,
            body: 49,
            br: 2,
            button: 0,
            canvas: 0,
            caption: 0,
            center: 0,
            cite: 0,
            code: 0,
            col: 2,
            colgroup: 1,
            dd: 1,
            del: 0,
            dfn: 0,
            dir: 0,
            div: 0,
            dl: 0,
            dt: 1,
            em: 0,
            fieldset: 0,
            font: 0,
            form: 0,
            frame: 18,
            frameset: 16,
            h1: 0,
            h2: 0,
            h3: 0,
            h4: 0,
            h5: 0,
            h6: 0,
            head: 49,
            hr: 2,
            html: 49,
            i: 0,
            iframe: 4,
            img: 2,
            input: 2,
            ins: 0,
            isindex: 18,
            kbd: 0,
            label: 0,
            legend: 0,
            li: 1,
            link: 18,
            map: 0,
            menu: 0,
            meta: 18,
            nobr: 0,
            noembed: 4,
            noframes: 20,
            noscript: 20,
            object: 16,
            ol: 0,
            optgroup: 0,
            option: 1,
            p: 1,
            param: 18,
            pre: 0,
            q: 0,
            s: 0,
            samp: 0,
            script: 84,
            select: 0,
            small: 0,
            span: 0,
            strike: 0,
            strong: 0,
            style: 148,
            sub: 0,
            sup: 0,
            table: 0,
            tbody: 1,
            td: 1,
            textarea: 8,
            tfoot: 1,
            th: 1,
            thead: 1,
            title: 24,
            tr: 1,
            tt: 0,
            u: 0,
            ul: 0,
            var: 0
        },
        ueffects: {
            NOT_LOADED: 0,
            SAME_DOCUMENT: 1,
            NEW_DOCUMENT: 2
        },
        URIEFFECTS: {
            "a::href": 2,
            "area::href": 2,
            "blockquote::cite": 0,
            "body::background": 1,
            "del::cite": 0,
            "form::action": 2,
            "img::src": 1,
            "input::src": 1,
            "ins::cite": 0,
            "q::cite": 0
        },
        ltypes: {
            UNSANDBOXED: 2,
            SANDBOXED: 1,
            DATA: 0
        },
        LOADERTYPES: {
            "a::href": 2,
            "area::href": 2,
            "blockquote::cite": 2,
            "body::background": 1,
            "del::cite": 2,
            "form::action": 2,
            "img::src": 1,
            "input::src": 1,
            "ins::cite": 2,
            "q::cite": 2
        }
    },
    html = function(html4) {
        function lookupEntity(name) {
            if (name = lcase(name), ENTITIES.hasOwnProperty(name)) return ENTITIES[name];
            var m = name.match(decimalEscapeRe);
            return m ? String.fromCharCode(parseInt(m[1], 10)) : (m = name.match(hexEscapeRe)) ? String.fromCharCode(parseInt(m[1], 16)) : ""
        }

        function decodeOneEntity(_, name) {
            return lookupEntity(name)
        }

        function stripNULs(s) {
            return s.replace(nulRe, "")
        }

        function unescapeEntities(s) {
            return s.replace(entityRe, decodeOneEntity)
        }

        function escapeAttrib(s) {
            return s.replace(ampRe, "&amp;").replace(ltRe, "&lt;").replace(gtRe, "&gt;").replace(quotRe, "&#34;").replace(eqRe, "&#61;")
        }

        function normalizeRCData(rcdata) {
            return rcdata.replace(looseAmpRe, "&amp;$1").replace(ltRe, "&lt;").replace(gtRe, "&gt;")
        }

        function makeSaxParser(handler) {
            return function(htmlText, param) {
                htmlText = String(htmlText);
                var htmlLower = null,
                    inTag = !1,
                    attribs = [],
                    tagName = void 0,
                    eflags = void 0,
                    openTag = void 0;
                for (handler.startDoc && handler.startDoc(param); htmlText;) {
                    var m = htmlText.match(inTag ? INSIDE_TAG_TOKEN : OUTSIDE_TAG_TOKEN);
                    if (htmlText = htmlText.substring(m[0].length), inTag) {
                        if (m[1]) {
                            var decodedValue, attribName = lcase(m[1]);
                            if (m[2]) {
                                var encodedValue = m[3];
                                switch (encodedValue.charCodeAt(0)) {
                                    case 34:
                                    case 39:
                                        encodedValue = encodedValue.substring(1, encodedValue.length - 1)
                                }
                                decodedValue = unescapeEntities(stripNULs(encodedValue))
                            } else decodedValue = attribName;
                            attribs.push(attribName, decodedValue)
                        } else if (m[4]) {
                            if (void 0 !== eflags && (openTag ? handler.startTag && handler.startTag(tagName, attribs, param) : handler.endTag && handler.endTag(tagName, param)), openTag && eflags & (html4.eflags.CDATA | html4.eflags.RCDATA)) {
                                var dataEnd = (htmlLower = null === htmlLower ? lcase(htmlText) : htmlLower.substring(htmlLower.length - htmlText.length)).indexOf("</" + tagName);
                                dataEnd < 0 && (dataEnd = htmlText.length), dataEnd && (eflags & html4.eflags.CDATA ? handler.cdata && handler.cdata(htmlText.substring(0, dataEnd), param) : handler.rcdata && handler.rcdata(normalizeRCData(htmlText.substring(0, dataEnd)), param), htmlText = htmlText.substring(dataEnd))
                            }
                            tagName = eflags = openTag = void 0, attribs.length = 0, inTag = !1
                        }
                    } else if (m[1]) handler.pcdata && handler.pcdata(m[0], param);
                    else if (m[3]) openTag = !m[2], inTag = !0, tagName = lcase(m[3]), eflags = html4.ELEMENTS.hasOwnProperty(tagName) ? html4.ELEMENTS[tagName] : void 0;
                    else if (m[4]) handler.pcdata && handler.pcdata(m[4], param);
                    else if (m[5] && handler.pcdata) {
                        var ch = m[5];
                        handler.pcdata("<" === ch ? "&lt;" : ">" === ch ? "&gt;" : "&amp;", param)
                    }
                }
                handler.endDoc && handler.endDoc(param)
            }
        }

        function makeHtmlSanitizer(sanitizeAttributes) {
            var stack, ignoring;
            return makeSaxParser({
                startDoc: function() {
                    stack = [], ignoring = !1
                },
                startTag: function(tagName, attribs, out) {
                    if (!ignoring && html4.ELEMENTS.hasOwnProperty(tagName)) {
                        var eflags = html4.ELEMENTS[tagName];
                        if (!(eflags & html4.eflags.FOLDABLE))
                            if (eflags & html4.eflags.UNSAFE) ignoring = !(eflags & html4.eflags.EMPTY);
                            else if (attribs = sanitizeAttributes(tagName, attribs)) {
                            eflags & html4.eflags.EMPTY || stack.push(tagName), out.push("<", tagName);
                            for (var i = 0, n = attribs.length; i < n; i += 2) {
                                var attribName = attribs[i],
                                    value = attribs[i + 1];
                                null != value && out.push(" ", attribName, '="', escapeAttrib(value), '"')
                            }
                            out.push(">")
                        }
                    }
                },
                endTag: function(tagName, out) {
                    if (ignoring) ignoring = !1;
                    else if (html4.ELEMENTS.hasOwnProperty(tagName)) {
                        var eflags = html4.ELEMENTS[tagName];
                        if (!(eflags & (html4.eflags.UNSAFE | html4.eflags.EMPTY | html4.eflags.FOLDABLE))) {
                            var index;
                            if (eflags & html4.eflags.OPTIONAL_ENDTAG)
                                for (index = stack.length; --index >= 0;) {
                                    if ((stackEl = stack[index]) === tagName) break;
                                    if (!(html4.ELEMENTS[stackEl] & html4.eflags.OPTIONAL_ENDTAG)) return
                                } else
                                    for (index = stack.length; --index >= 0 && stack[index] !== tagName;);
                            if (index < 0) return;
                            for (var i = stack.length; --i > index;) {
                                var stackEl = stack[i];
                                html4.ELEMENTS[stackEl] & html4.eflags.OPTIONAL_ENDTAG || out.push("</", stackEl, ">")
                            }
                            stack.length = index, out.push("</", tagName, ">")
                        }
                    }
                },
                pcdata: function(text, out) {
                    ignoring || out.push(text)
                },
                rcdata: function(text, out) {
                    ignoring || out.push(text)
                },
                cdata: function(text, out) {
                    ignoring || out.push(text)
                },
                endDoc: function(out) {
                    for (var i = stack.length; --i >= 0;) out.push("</", stack[i], ">");
                    stack.length = 0
                }
            })
        }

        function sanitize(htmlText, opt_uriPolicy, opt_nmTokenPolicy) {
            var out = [];
            return makeHtmlSanitizer((function(tagName, attribs) {
                for (var i = 0; i < attribs.length; i += 2) {
                    var attribKey, attribName = attribs[i],
                        value = attribs[i + 1],
                        atype = null;
                    if (attribKey = tagName + "::" + attribName, (html4.ATTRIBS.hasOwnProperty(attribKey) || (attribKey = "*::" + attribName, html4.ATTRIBS.hasOwnProperty(attribKey))) && (atype = html4.ATTRIBS[attribKey]), null !== atype) switch (atype) {
                        case html4.atype.NONE:
                            break;
                        case html4.atype.SCRIPT:
                        case html4.atype.STYLE:
                            value = null;
                            break;
                        case html4.atype.ID:
                        case html4.atype.IDREF:
                        case html4.atype.IDREFS:
                        case html4.atype.GLOBAL_NAME:
                        case html4.atype.LOCAL_NAME:
                        case html4.atype.CLASSES:
                            value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
                            break;
                        case html4.atype.URI:
                            var parsedUri = ("" + value).match(URI_SCHEME_RE);
                            value = parsedUri && (!parsedUri[1] || ALLOWED_SCHEMES.test(parsedUri[1])) ? opt_uriPolicy && opt_uriPolicy(value) : null;
                            break;
                        case html4.atype.URI_FRAGMENT:
                            value && "#" === value.charAt(0) ? (value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value) && (value = "#" + value) : value = null;
                            break;
                        default:
                            value = null
                    } else value = null;
                    attribs[i + 1] = value
                }
                return attribs
            }))(htmlText, out), out.join("")
        }
        var lcase;
        lcase = "script" === "SCRIPT".toLowerCase() ? function(s) {
            return s.toLowerCase()
        } : function(s) {
            return s.replace(/[A-Z]/g, (function(ch) {
                return String.fromCharCode(32 | ch.charCodeAt(0))
            }))
        };
        var ENTITIES = {
                lt: "<",
                gt: ">",
                amp: "&",
                nbsp: "\xa0",
                quot: '"',
                apos: "'"
            },
            ALLOWED_SCHEMES = /^(?:https?|mailto|data)$/i,
            decimalEscapeRe = /^#(\d+)$/,
            hexEscapeRe = /^#x([0-9A-Fa-f]+)$/,
            nulRe = /\0/g,
            entityRe = /&(#\d+|#x[0-9A-Fa-f]+|\w+);/g,
            ampRe = /&/g,
            looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,
            ltRe = /</g,
            gtRe = />/g,
            quotRe = /\"/g,
            eqRe = /\=/g,
            INSIDE_TAG_TOKEN = new RegExp("^\\s*(?:(?:([a-z][a-z-]*)(\\s*=\\s*(\"[^\"]*\"|'[^']*'|(?=[a-z][a-z-]*\\s*=)|[^>\"'\\s]*))?)|(/?>)|[\\s\\S][^a-z\\s>]*)", "i"),
            OUTSIDE_TAG_TOKEN = new RegExp("^(?:&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);|<!--[\\s\\S]*?-->|<!\\w[^>]*>|<\\?[^>*]*>|<(/)?([a-z][a-z0-9]*)|([^<&>]+)|([<&>]))", "i"),
            URI_SCHEME_RE = new RegExp("^(?:([^:/?#]+):)?");
        return {
            escapeAttrib: escapeAttrib,
            makeHtmlSanitizer: makeHtmlSanitizer,
            makeSaxParser: makeSaxParser,
            normalizeRCData: normalizeRCData,
            sanitize: sanitize,
            unescapeEntities: unescapeEntities
        }
    }(html4),
    html_sanitize = html.sanitize,
    Mustache;
"undefined" != typeof window && (window.html = html, window.html_sanitize = html_sanitize), html4.ATTRIBS["*::style"] = 0, html4.ELEMENTS.style = 0, html4.ATTRIBS["a::target"] = 0, html4.ELEMENTS.video = 0, html4.ATTRIBS["video::src"] = 0, html4.ATTRIBS["video::poster"] = 0, html4.ATTRIBS["video::controls"] = 0, html4.ELEMENTS.audio = 0, html4.ATTRIBS["audio::src"] = 0, html4.ATTRIBS["video::autoplay"] = 0, html4.ATTRIBS["video::controls"] = 0,
    function(exports) {
        "undefined" != typeof module && module.exports ? module.exports = exports : "function" == typeof define ? define(exports) : Mustache = exports
    }(function() {
        function testRe(re, string) {
            return RegExp.prototype.test.call(re, string)
        }

        function isWhitespace(string) {
            return !testRe(nonSpaceRe, string)
        }

        function escapeRe(string) {
            return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }

        function escapeHtml(string) {
            return String(string).replace(/[&<>"'\/]/g, (function(s) {
                return entityMap[s]
            }))
        }

        function Scanner(string) {
            this.string = string, this.tail = string, this.pos = 0
        }

        function Context(view, parent) {
            this.view = view, this.parent = parent, this.clearCache()
        }

        function Writer() {
            this.clearCache()
        }

        function sectionBounds(token) {
            for (var tokens, start = token[3], end = start;
                (tokens = token[4]) && tokens.length;) end = (token = tokens[tokens.length - 1])[3];
            return [start, end]
        }

        function compileTokens(tokens) {
            function subRender(i, tokens, template) {
                if (!subRenders[i]) {
                    var fn = compileTokens(tokens);
                    subRenders[i] = function(writer, context) {
                        return fn(writer, context, template)
                    }
                }
                return subRenders[i]
            }

            function renderFunction(writer, context, template) {
                for (var token, sectionText, buffer = "", i = 0, len = tokens.length; i < len; ++i) switch ((token = tokens[i])[0]) {
                    case "#":
                        sectionText = template.slice.apply(template, sectionBounds(token)), buffer += writer._section(token[1], context, sectionText, subRender(i, token[4], template));
                        break;
                    case "^":
                        buffer += writer._inverted(token[1], context, subRender(i, token[4], template));
                        break;
                    case ">":
                        buffer += writer._partial(token[1], context);
                        break;
                    case "&":
                        buffer += writer._name(token[1], context);
                        break;
                    case "name":
                        buffer += writer._escaped(token[1], context);
                        break;
                    case "text":
                        buffer += token[1]
                }
                return buffer
            }
            var subRenders = {};
            return renderFunction
        }

        function nestTokens(tokens) {
            for (var token, section, tree = [], collector = tree, sections = [], i = 0; i < tokens.length; ++i) switch ((token = tokens[i])[0]) {
                case "#":
                case "^":
                    token[4] = [], sections.push(token), collector.push(token), collector = token[4];
                    break;
                case "/":
                    if (0 === sections.length) throw new Error("Unopened section: " + token[1]);
                    if ((section = sections.pop())[1] !== token[1]) throw new Error("Unclosed section: " + section[1]);
                    collector = sections.length > 0 ? sections[sections.length - 1][4] : tree;
                    break;
                default:
                    collector.push(token)
            }
            if (section = sections.pop()) throw new Error("Unclosed section: " + section[1]);
            return tree
        }

        function squashTokens(tokens) {
            for (var token, lastToken, i = 0; i < tokens.length; ++i) token = tokens[i], lastToken && "text" === lastToken[0] && "text" === token[0] ? (lastToken[1] += token[1], lastToken[3] = token[3], tokens.splice(i--, 1)) : lastToken = token
        }

        function escapeTags(tags) {
            if (2 !== tags.length) throw new Error("Invalid tags: " + tags.join(" "));
            return [new RegExp(escapeRe(tags[0]) + "\\s*"), new RegExp("\\s*" + escapeRe(tags[1]))]
        }
        var exports = {
            name: "mustache.js",
            version: "0.7.0",
            tags: ["{{", "}}"]
        };
        exports.Scanner = Scanner, exports.Context = Context, exports.Writer = Writer;
        var whiteRe = /\s*/,
            spaceRe = /\s+/,
            nonSpaceRe = /\S/,
            eqRe = /\s*=/,
            curlyRe = /\s*\}/,
            tagRe = /#|\^|\/|>|\{|&|=|!/,
            isArray = Array.isArray || function(obj) {
                return "[object Array]" === Object.prototype.toString.call(obj)
            },
            entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            };
        exports.escape = escapeHtml, Scanner.prototype.eos = function() {
            return "" === this.tail
        }, Scanner.prototype.scan = function(re) {
            var match = this.tail.match(re);
            return match && 0 === match.index ? (this.tail = this.tail.substring(match[0].length), this.pos += match[0].length, match[0]) : ""
        }, Scanner.prototype.scanUntil = function(re) {
            var match, pos = this.tail.search(re);
            switch (pos) {
                case -1:
                    match = this.tail, this.pos += this.tail.length, this.tail = "";
                    break;
                case 0:
                    match = "";
                    break;
                default:
                    match = this.tail.substring(0, pos), this.tail = this.tail.substring(pos), this.pos += pos
            }
            return match
        }, Context.make = function(view) {
            return view instanceof Context ? view : new Context(view)
        }, Context.prototype.clearCache = function() {
            this._cache = {}
        }, Context.prototype.push = function(view) {
            return new Context(view, this)
        }, Context.prototype.lookup = function(name) {
            var value = this._cache[name];
            if (!value) {
                if ("." === name) value = this.view;
                else
                    for (var context = this; context;) {
                        if (name.indexOf(".") > 0) {
                            var names = name.split("."),
                                i = 0;
                            for (value = context.view; value && i < names.length;) value = value[names[i++]]
                        } else value = context.view[name];
                        if (null != value) break;
                        context = context.parent
                    }
                this._cache[name] = value
            }
            return "function" == typeof value && (value = value.call(this.view)), value
        }, Writer.prototype.clearCache = function() {
            this._cache = {}, this._partialCache = {}
        }, Writer.prototype.compile = function(template, tags) {
            return this._compile(this._cache, template, template, tags)
        }, Writer.prototype.compilePartial = function(name, template, tags) {
            return this._compile(this._partialCache, name, template, tags)
        }, Writer.prototype.render = function(template, view, partials) {
            return this.compile(template)(view, partials)
        }, Writer.prototype._compile = function(cache, key, template, tags) {
            if (!cache[key]) {
                var fn = compileTokens(exports.parse(template, tags)),
                    self = this;
                cache[key] = function(view, partials) {
                    if (partials)
                        if ("function" == typeof partials) self._loadPartial = partials;
                        else
                            for (var name in partials) self.compilePartial(name, partials[name]);
                    return fn(self, Context.make(view), template)
                }
            }
            return cache[key]
        }, Writer.prototype._section = function(name, context, text, callback) {
            var value = context.lookup(name);
            switch (typeof value) {
                case "object":
                    if (isArray(value)) {
                        for (var buffer = "", i = 0, len = value.length; i < len; ++i) buffer += callback(this, context.push(value[i]));
                        return buffer
                    }
                    return value ? callback(this, context.push(value)) : "";
                case "function":
                    var self = this,
                        scopedRender = function(template) {
                            return self.render(template, context)
                        };
                    return value.call(context.view, text, scopedRender) || "";
                default:
                    if (value) return callback(this, context)
            }
            return ""
        }, Writer.prototype._inverted = function(name, context, callback) {
            var value = context.lookup(name);
            return !value || isArray(value) && 0 === value.length ? callback(this, context) : ""
        }, Writer.prototype._partial = function(name, context) {
            !(name in this._partialCache) && this._loadPartial && this.compilePartial(name, this._loadPartial(name));
            var fn = this._partialCache[name];
            return fn ? fn(context) : ""
        }, Writer.prototype._name = function(name, context) {
            var value = context.lookup(name);
            return "function" == typeof value && (value = value.call(context.view)), null == value ? "" : String(value)
        }, Writer.prototype._escaped = function(name, context) {
            return exports.escape(this._name(name, context))
        }, exports.parse = function(template, tags) {
            function stripSpace() {
                if (hasTag && !nonSpace)
                    for (; spaces.length;) tokens.splice(spaces.pop(), 1);
                else spaces = [];
                hasTag = !1, nonSpace = !1
            }
            for (var start, type, value, chr, tagRes = escapeTags(tags = tags || exports.tags), scanner = new Scanner(template), tokens = [], spaces = [], hasTag = !1, nonSpace = !1; !scanner.eos();) {
                if (start = scanner.pos, value = scanner.scanUntil(tagRes[0]))
                    for (var i = 0, len = value.length; i < len; ++i) isWhitespace(chr = value.charAt(i)) ? spaces.push(tokens.length) : nonSpace = !0, tokens.push(["text", chr, start, start + 1]), start += 1, "\n" === chr && stripSpace();
                if (start = scanner.pos, !scanner.scan(tagRes[0])) break;
                if (hasTag = !0, type = scanner.scan(tagRe) || "name", scanner.scan(whiteRe), "=" === type) value = scanner.scanUntil(eqRe), scanner.scan(eqRe), scanner.scanUntil(tagRes[1]);
                else if ("{" === type) {
                    var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
                    value = scanner.scanUntil(closeRe), scanner.scan(curlyRe), scanner.scanUntil(tagRes[1]), type = "&"
                } else value = scanner.scanUntil(tagRes[1]);
                if (!scanner.scan(tagRes[1])) throw new Error("Unclosed tag at " + scanner.pos);
                tokens.push([type, value, start, scanner.pos]), "name" !== type && "{" !== type && "&" !== type || (nonSpace = !0), "=" === type && (tagRes = escapeTags(tags = value.split(spaceRe)))
            }
            return squashTokens(tokens), nestTokens(tokens)
        };
        var _writer = new Writer;
        return exports.clearCache = function() {
            return _writer.clearCache()
        }, exports.compile = function(template, tags) {
            return _writer.compile(template, tags)
        }, exports.compilePartial = function(name, template, tags) {
            return _writer.compilePartial(name, template, tags)
        }, exports.render = function(template, view, partials) {
            return _writer.render(template, view, partials)
        }, exports.to_html = function(template, view, partials, send) {
            var result = exports.render(template, view, partials);
            if ("function" != typeof send) return result;
            send(result)
        }, exports
    }()),
    function(e, t) {
        "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : this[e] = t()
    }("reqwest", (function() {
        function handleReadyState(e, t, n) {
            return function() {
                e && 4 == e[readyState] && (twoHundo.test(e.status) ? t(e) : n(e))
            }
        }

        function setHeaders(e, t) {
            var r, n = t.headers || {};
            for (r in n.Accept = n.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"], !t.crossOrigin && !n[requestedWith] && (n[requestedWith] = defaultHeaders.requestedWith), n[contentType] || (n[contentType] = t.contentType || defaultHeaders.contentType), n) n.hasOwnProperty(r) && e.setRequestHeader(r, n[r])
        }

        function setCredentials(e, t) {
            void 0 !== t.withCredentials && void 0 !== e.withCredentials && (e.withCredentials = !!t.withCredentials)
        }

        function generalCallback(e) {
            lastValue = e
        }

        function urlappend(e, t) {
            return e + (/\?/.test(e) ? "&" : "?") + t
        }

        function handleJsonp(e, t, n, r) {
            var i = uniqid++,
                s = e.jsonpCallback || "callback",
                o = e.jsonpCallbackName || reqwest.getcallbackPrefix(i),
                u = new RegExp("((^|\\?|&)" + s + ")=([^&]+)"),
                a = r.match(u),
                f = doc.createElement("script"),
                l = 0,
                c = -1 !== navigator.userAgent.indexOf("MSIE 10.0");
            a ? "?" === a[3] ? r = r.replace(u, "$1=" + o) : o = a[3] : r = urlappend(r, s + "=" + o), win[o] = generalCallback, f.type = "text/javascript", f.src = r, f.async = !0, void 0 !== f.onreadystatechange && !c && (f.event = "onclick", f.htmlFor = f.id = "_reqwest_" + i), f.onload = f.onreadystatechange = function() {
                if (f[readyState] && "complete" !== f[readyState] && "loaded" !== f[readyState] || l) return !1;
                f.onload = f.onreadystatechange = null, f.onclick && f.onclick(), e.success && e.success(lastValue), lastValue = void 0, head.removeChild(f), l = 1
            }, head.appendChild(f)
        }

        function getRequest(e, t, n) {
            var o, r = (e.method || "GET").toUpperCase(),
                i = "string" == typeof e ? e : e.url,
                s = !1 !== e.processData && e.data && "string" != typeof e.data ? reqwest.toQueryString(e.data) : e.data || null;
            return ("jsonp" == e.type || "GET" == r) && s && (i = urlappend(i, s), s = null), "jsonp" == e.type ? handleJsonp(e, t, n, i) : ((o = xhr()).open(r, i, !0), setHeaders(o, e), setCredentials(o, e), o.onreadystatechange = handleReadyState(o, t, n), e.before && e.before(o), o.send(s), o)
        }

        function Reqwest(e, t) {
            this.o = e, this.fn = t, init.apply(this, arguments)
        }

        function setType(e) {
            var t = e.match(/\.(json|jsonp|html|xml)(\?|$)/);
            return t ? t[1] : "js"
        }

        function init(o, fn) {
            function complete(e) {
                for (o.timeout && clearTimeout(self.timeout), self.timeout = null; self._completeHandlers.length > 0;) self._completeHandlers.shift()(e)
            }

            function success(resp) {
                var r = resp.responseText;
                if (r) switch (type) {
                    case "json":
                        try {
                            resp = win.JSON ? win.JSON.parse(r) : eval("(" + r + ")")
                        } catch (err) {
                            return error(resp, "Could not parse JSON in response", err)
                        }
                        break;
                    case "js":
                        resp = eval(r);
                        break;
                    case "html":
                        resp = r;
                        break;
                    case "xml":
                        resp = resp.responseXML
                }
                for (self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp); self._fulfillmentHandlers.length > 0;) self._fulfillmentHandlers.shift()(resp);
                complete(resp)
            }

            function error(e, t, n) {
                for (self._responseArgs.resp = e, self._responseArgs.msg = t, self._responseArgs.t = n, self._erred = !0; self._errorHandlers.length > 0;) self._errorHandlers.shift()(e, t, n);
                complete(e)
            }
            this.url = "string" == typeof o ? o : o.url, this.timeout = null, this._fulfilled = !1, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {};
            var self = this,
                type = o.type || setType(this.url);
            fn = fn || function() {}, o.timeout && (this.timeout = setTimeout((function() {
                self.abort()
            }), o.timeout)), o.success && this._fulfillmentHandlers.push((function() {
                o.success.apply(o, arguments)
            })), o.error && this._errorHandlers.push((function() {
                o.error.apply(o, arguments)
            })), o.complete && this._completeHandlers.push((function() {
                o.complete.apply(o, arguments)
            })), this.request = getRequest(o, success, error)
        }

        function reqwest(e, t) {
            return new Reqwest(e, t)
        }

        function normalize(e) {
            return e ? e.replace(/\r?\n/g, "\r\n") : ""
        }

        function serial(e, t) {
            var n = e.name,
                r = e.tagName.toLowerCase(),
                i = function(e) {
                    e && !e.disabled && t(n, normalize(e.attributes.value && e.attributes.value.specified ? e.value : e.text))
                };
            if (!e.disabled && n) switch (r) {
                case "input":
                    if (!/reset|button|image|file/i.test(e.type)) {
                        var s = /checkbox/i.test(e.type),
                            o = /radio/i.test(e.type),
                            u = e.value;
                        (!s && !o || e.checked) && t(n, normalize(s && "" === u ? "on" : u))
                    }
                    break;
                case "textarea":
                    t(n, normalize(e.value));
                    break;
                case "select":
                    if ("select-one" === e.type.toLowerCase()) i(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null);
                    else
                        for (var a = 0; e.length && a < e.length; a++) e.options[a].selected && i(e.options[a])
            }
        }

        function eachFormElement() {
            var t, n, r, e = this,
                i = function(t, n) {
                    for (var i = 0; i < n.length; i++) {
                        var s = t[byTag](n[i]);
                        for (r = 0; r < s.length; r++) serial(s[r], e)
                    }
                };
            for (n = 0; n < arguments.length; n++) t = arguments[n], /input|select|textarea/i.test(t.tagName) && serial(t, e), i(t, ["input", "select", "textarea"])
        }

        function serializeQueryString() {
            return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
        }

        function serializeHash() {
            var e = {};
            return eachFormElement.apply((function(t, n) {
                t in e ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]), e[t].push(n)) : e[t] = n
            }), arguments), e
        }
        var win = window,
            doc = document,
            twoHundo = /^20\d$/,
            byTag = "getElementsByTagName",
            readyState = "readyState",
            contentType = "Content-Type",
            requestedWith = "X-Requested-With",
            head = doc[byTag]("head")[0],
            uniqid = 0,
            callbackPrefix = "reqwest_" + +new Date,
            lastValue, xmlHttpRequest = "XMLHttpRequest",
            isArray = "function" == typeof Array.isArray ? Array.isArray : function(e) {
                return e instanceof Array
            },
            defaultHeaders = {
                contentType: "application/x-www-form-urlencoded",
                requestedWith: xmlHttpRequest,
                accept: {
                    "*": "text/javascript, text/html, application/xml, text/xml, */*",
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    js: "application/javascript, text/javascript"
                }
            },
            xhr = win[xmlHttpRequest] ? function() {
                return new XMLHttpRequest
            } : function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            };
        return Reqwest.prototype = {
            abort: function() {
                this.request.abort()
            },
            retry: function() {
                init.call(this, this.o, this.fn)
            },
            then: function(e, t) {
                return this._fulfilled ? e(this._responseArgs.resp) : this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(e), this._errorHandlers.push(t)), this
            },
            always: function(e) {
                return this._fulfilled || this._erred ? e(this._responseArgs.resp) : this._completeHandlers.push(e), this
            },
            fail: function(e) {
                return this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(e), this
            }
        }, reqwest.serializeArray = function() {
            var e = [];
            return eachFormElement.apply((function(t, n) {
                e.push({
                    name: t,
                    value: n
                })
            }), arguments), e
        }, reqwest.serialize = function() {
            if (0 === arguments.length) return "";
            var e, n = Array.prototype.slice.call(arguments, 0);
            return (e = n.pop()) && e.nodeType && n.push(e) && (e = null), e && (e = e.type), ("map" == e ? serializeHash : "array" == e ? reqwest.serializeArray : serializeQueryString).apply(null, n)
        }, reqwest.toQueryString = function(e) {
            var n, t = "",
                r = encodeURIComponent,
                i = function(e, n) {
                    t += r(e) + "=" + r(n) + "&"
                };
            if (isArray(e))
                for (n = 0; e && n < e.length; n++) i(e[n].name, e[n].value);
            else
                for (var s in e)
                    if (Object.hasOwnProperty.call(e, s)) {
                        var o = e[s];
                        if (isArray(o))
                            for (n = 0; n < o.length; n++) i(s, o[n]);
                        else i(s, e[s])
                    } return t.replace(/&$/, "").replace(/%20/g, "+")
        }, reqwest.getcallbackPrefix = function() {
            return callbackPrefix
        }, reqwest.compat = function(e, t) {
            return e && (e.type && (e.method = e.type) && delete e.type, e.dataType && (e.type = e.dataType), e.jsonpCallback && (e.jsonpCallbackName = e.jsonpCallback) && delete e.jsonpCallback, e.jsonp && (e.jsonpCallback = e.jsonp)), new Reqwest(e, t)
        }, reqwest
    })), wax = wax || {}, wax.attribution = function() {
        var a = {},
            container = document.createElement("div");
        return container.className = "map-attribution", a.content = function(x) {
            return void 0 === x ? container.innerHTML : (container.innerHTML = wax.u.sanitize(x), this)
        }, a.element = function() {
            return container
        }, a.init = function() {
            return this
        }, a
    }, wax = wax || {}, wax.bwdetect = function(options, callback) {
        function bwTest() {
            wax.bw = -1;
            var im = new Image;
            im.src = testImage;
            var first = !0,
                timeout = setTimeout((function() {
                    first && -1 == wax.bw && (detector.bw(0), first = !1)
                }), threshold);
            im.onload = function() {
                first && -1 == wax.bw && (clearTimeout(timeout), detector.bw(1), first = !1)
            }
        }
        var detector = {},
            threshold = options.threshold || 400,
            testImage = "http://a.tiles.mapbox.com/mapbox/1.0.0/blue-marble-topo-bathy-jul/0/0/0.png?preventcache=" + +new Date,
            bw = 1,
            auto = void 0 === options.auto || options.auto;
        return detector.bw = function(x) {
            if (!arguments.length) return bw;
            wax.bwlisteners && wax.bwlisteners.length && function() {
                for (listeners = wax.bwlisteners, wax.bwlisteners = [], i = 0; i < listeners; i++) listeners[i](x)
            }(), wax.bw = x, bw != (bw = x) && callback(x)
        }, detector.add = function() {
            return auto && bwTest(), this
        }, -1 == wax.bw ? (wax.bwlisteners = wax.bwlisteners || [], wax.bwlisteners.push(detector.bw)) : void 0 !== wax.bw ? detector.bw(wax.bw) : detector.add(), detector
    }, wax.formatter = function(x) {
        var formatter = {},
            f;
        if (x && "string" == typeof x) try {
            eval("f = " + x)
        } catch (e) {
            console && console.log(e)
        } else f = x && "function" == typeof x ? x : function() {};
        return formatter.format = function(options, data) {
            try {
                return wax.u.sanitize(f(options, data))
            } catch (e) {
                console && console.log(e)
            }
        }, formatter
    }, wax.gi = function(grid_tile, options) {
        function resolveCode(key) {
            return key >= 93 && key--, key >= 35 && key--, key -= 32
        }
        var instance = {},
            resolution = (options = options || {}).resolution || 4,
            tileSize = options.tileSize || 256;
        return instance.grid_tile = function() {
            return grid_tile
        }, instance.getKey = function(x, y) {
            if (grid_tile && grid_tile.grid && !(y < 0 || x < 0 || Math.floor(y) >= tileSize || Math.floor(x) >= tileSize)) return resolveCode(grid_tile.grid[Math.floor(y / resolution)].charCodeAt(Math.floor(x / resolution)))
        }, instance.gridFeature = function(x, y) {
            var key = this.getKey(x, y),
                keys = grid_tile.keys;
            if (keys && keys[key] && grid_tile.data[keys[key]]) return grid_tile.data[keys[key]]
        }, instance.tileFeature = function(x, y, tile_element) {
            if (grid_tile) {
                var offset = wax.u.offset(tile_element);
                return feature = this.gridFeature(x - offset.left, y - offset.top), feature
            }
        }, instance
    }, wax.gm = function(options) {
        function templatedGridUrl(template) {
            return "string" == typeof template && (template = [template]),
                function(url) {
                    if (url) {
                        var xyz = new RegExp("/(\\d+)\\/(\\d+)\\/(\\d+)\\.[\\w\\._]+").exec(url);
                        if (xyz) return template[parseInt(xyz[2], 10) % template.length].replace(/\{z\}/g, xyz[1]).replace(/\{x\}/g, xyz[2]).replace(/\{y\}/g, xyz[3])
                    }
                }
        }
        var tilejson, formatter, minZoom, maxZoom, resolution = 4,
            manager = {},
            tileSize = (options = options || {}).tileSize || 256,
            gridUrl = function(url) {
                if (url) return url.replace(/(\.png|\.jpg|\.jpeg)(\d*)/, ".grid.json")
            };
        return manager.formatter = function(x) {
            return arguments.length ? (formatter = wax.formatter(x), manager) : formatter
        }, manager.template = function(x) {
            return arguments.length ? (formatter = wax.template(x), manager) : formatter
        }, manager.minZoom = function(x) {
            return arguments.length ? (minZoom = x, manager) : minZoom
        }, manager.maxZoom = function(x) {
            return arguments.length ? (maxZoom = x, manager) : maxZoom
        }, manager.gridUrl = function(x) {
            return arguments.length ? (gridUrl = x ? "function" == typeof x ? x : templatedGridUrl(x) : function() {
                return null
            }, manager) : gridUrl
        }, manager.getGrid = function(url, callback) {
            var gurl = gridUrl(url);
            return formatter && gurl ? (wax.request.get(gurl, (function(err, t) {
                if (err) return callback(err, null);
                callback(null, wax.gi(t, {
                    formatter: formatter,
                    resolution: resolution,
                    tileSize: tileSize
                }))
            })), manager) : callback(null, null)
        }, manager.tilejson = function(x) {
            return arguments.length ? (x.template ? manager.template(x.template) : x.formatter ? manager.formatter(x.formatter) : formatter = void 0, manager.gridUrl(x.grids), manager.minZoom(x.gridminzoom || 0), manager.maxZoom(x.gridmaxzoom || 22), x.resolution && (resolution = x.resolution), tilejson = x, manager) : tilejson
        }, manager
    }, wax = wax || {}, wax.hash = function(options) {
        function getState() {
            return location.hash.substring(1)
        }

        function pushState(state) {
            var l = window.location;
            l.replace(l.toString().replace(l.hash || /$/, "#" + state))
        }

        function parseHash(s) {
            for (var args = s.split("/"), i = 0; i < args.length; i++)
                if (args[i] = Number(args[i]), isNaN(args[i])) return !0;
            if (args.length < 3) return !0;
            3 == args.length && options.setCenterZoom(args)
        }

        function move() {
            var s1 = options.getCenterZoom();
            s0 !== s1 && pushState(s0 = s1)
        }

        function stateChange(state) {
            state !== s0 && parseHash(s0 = state) && move()
        }
        options = options || {};
        var s0, hash = {},
            _move = wax.u.throttle(move, 500);
        return hash.add = function() {
            return stateChange(getState()), options.bindChange(_move), hash
        }, hash.remove = function() {
            return options.unbindChange(_move), hash
        }, hash
    }, wax = wax || {}, wax.interaction = function(options) {
        function getTile(e) {
            for (var g = grid(), i = 0; i < g.length; i++)
                if (g[i][0] < e.y && g[i][0] + tileSize > e.y && g[i][1] < e.x && g[i][1] + tileSize > e.x) return g[i][2];
            return !1
        }

        function killTimeout() {
            return !!_clickTimeout && (window.clearTimeout(_clickTimeout), _clickTimeout = null, !0)
        }

        function onMove(e) {
            if (!_downLock) {
                var pos = wax.u.eventoffset(e);
                interaction.screen_feature(pos, (function(feature) {
                    feature ? bean.fire(interaction, "on", {
                        parent: parent(),
                        data: feature,
                        formatter: gm.formatter().format,
                        e: e
                    }) : bean.fire(interaction, "off")
                }))
            }
        }

        function dragEnd() {
            _downLock = !1
        }

        function onDown(e) {
            _downLock = !0, _d = wax.u.eventoffset(e), "mousedown" === e.type ? (bean.add(document.body, "click", onUp), bean.add(document.body, "mouseup", dragEnd)) : "touchstart" === e.type && 1 === e.touches.length && (bean.fire(interaction, "off"), bean.add(e.srcElement, touchEnds))
        }

        function touchCancel(e) {
            bean.remove(e.srcElement, touchEnds), _downLock = !1
        }

        function onUp(e) {
            var evt = {},
                pos = wax.u.eventoffset(e);
            for (var key in _downLock = !1, e) evt[key] = e[key];
            return bean.remove(document.body, "mouseup", onUp), bean.remove(e.srcElement, touchEnds), "touchend" === e.type ? interaction.click(e, _d) : pos && Math.round(pos.y / tol) === Math.round(_d.y / tol) && Math.round(pos.x / tol) === Math.round(_d.x / tol) && (_clickTimeout ? killTimeout() : _clickTimeout = window.setTimeout((function() {
                _clickTimeout = null, interaction.click(evt, pos)
            }), 0)), onUp
        }
        options = options || {};
        var _d, grid, attach, detach, parent, map, gm = wax.gm(options),
            interaction = {},
            _downLock = !1,
            _clickTimeout = null,
            tol = 4,
            tileSize = options.tileSize || 256,
            defaultEvents = {
                mousemove: onMove,
                touchstart: onDown,
                mousedown: onDown
            },
            touchEnds = {
                touchend: onUp,
                touchmove: onUp,
                touchcancel: touchCancel
            };
        return interaction.click = function(e, pos) {
            interaction.screen_feature(pos, (function(feature) {
                feature && bean.fire(interaction, "on", {
                    parent: parent(),
                    data: feature,
                    formatter: gm.formatter().format,
                    e: e
                })
            }))
        }, interaction.screen_feature = function(pos, callback) {
            if (interaction.is_disabled()) return callback();
            var zoom = map.getZoom(),
                tile = zoom < gm.minZoom() || zoom > gm.maxZoom() ? "undefined" : getTile(pos);
            tile || callback(null), gm.getGrid(tile.src, (function(err, g) {
                if (err || !g) return callback(null);
                var feature = g.tileFeature(pos.x, pos.y, tile);
                callback(feature)
            }))
        }, interaction.attach = function(x) {
            return arguments.length ? (attach = x, interaction) : attach
        }, interaction.detach = function(x) {
            return arguments.length ? (detach = x, interaction) : detach
        }, interaction.map = function(x) {
            return arguments.length ? (map = x, attach && attach(map), bean.add(parent(), defaultEvents), bean.add(parent(), "touchstart", onDown), interaction) : map
        }, interaction.grid = function(x) {
            return arguments.length ? (grid = x, interaction) : grid
        }, interaction.remove = function() {
            return detach && detach(map), bean.remove(parent(), defaultEvents), bean.fire(interaction, "remove"), interaction
        }, interaction.tilejson = function(x) {
            return arguments.length ? (gm.tilejson(x), interaction) : gm.tilejson()
        }, interaction.formatter = function() {
            return gm.formatter()
        }, interaction.on = function(ev, fn) {
            return bean.add(interaction, ev, fn), interaction
        }, interaction.off = function(ev, fn) {
            return bean.remove(interaction, ev, fn), interaction
        }, interaction.gridmanager = function(x) {
            return arguments.length ? (gm = x, interaction) : gm
        }, interaction.parent = function(x) {
            return parent = x, interaction
        }, interaction.is_disabled = function() {
            return !1
        }, interaction
    };
var wax = wax || {};
wax.legend = function() {
    var element, container, legend = {};
    return legend.element = function() {
        return container
    }, legend.content = function(content) {
        return arguments.length ? (element.innerHTML = wax.u.sanitize(content), element.style.display = "block", "" === element.innerHTML && (element.style.display = "none"), legend) : element.innerHTML
    }, legend.add = function() {
        return (container = document.createElement("div")).className = "map-legends wax-legends", (element = container.appendChild(document.createElement("div"))).className = "map-legend wax-legend", element.style.display = "none", legend
    }, legend.add()
};
var wax = wax || {};
wax.location = function() {
    function on(o) {
        if ("mousemove" !== o.e.type && o.e.type) {
            var loc = o.formatter({
                format: "location"
            }, o.data);
            loc && (window.top.location.href = loc)
        }
    }
    var t = {
        events: function() {
            return {
                on: on
            }
        }
    };
    return t
};
var wax = wax || {};
wax.movetip = {}, wax.movetip = function() {
    function moveTooltip(e) {
        var eo = wax.u.eventoffset(e);
        _tooltipOffset.height + eo.y > _contextOffset.top + _contextOffset.height && _contextOffset.height > _tooltipOffset.height && (eo.y -= _tooltipOffset.height, tooltip.className += " flip-y"), _tooltipOffset.width + eo.x > _contextOffset.left + _contextOffset.width && (eo.x -= _tooltipOffset.width, tooltip.className += " flip-x"), tooltip.style.left = eo.x + "px", tooltip.style.top = eo.y + "px"
    }

    function getTooltip(feature) {
        var tooltip = document.createElement("div");
        return tooltip.className = "map-tooltip map-tooltip-0", tooltip.innerHTML = feature, tooltip
    }

    function hide() {
        tooltip && (tooltip.parentNode.removeChild(tooltip), tooltip = null)
    }

    function on(o) {
        var content;
        if (!popped) {
            if ("mousemove" !== o.e.type && o.e.type) {
                if (!(content = o.formatter({
                        format: "teaser"
                    }, o.data))) return;
                hide();
                var tt = document.body.appendChild(getTooltip(content));
                tt.className += " map-popup";
                var close = tt.appendChild(document.createElement("a"));
                close.href = "#close", close.className = "close", close.innerHTML = "Close", popped = !0, tooltip = tt, _tooltipOffset = wax.u.offset(tooltip), _contextOffset = wax.u.offset(parent), moveTooltip(o.e), bean.add(close, "click touchend", (function(e) {
                    e.stop(), hide(), popped = !1
                }))
            } else {
                if (!(content = o.formatter({
                        format: "teaser"
                    }, o.data))) return;
                hide(), parent.style.cursor = "pointer", tooltip = document.body.appendChild(getTooltip(content))
            }
            tooltip && (_tooltipOffset = wax.u.offset(tooltip), _contextOffset = wax.u.offset(parent), moveTooltip(o.e))
        }
    }

    function off() {
        parent.style.cursor = "default", popped || hide()
    }
    var _tooltipOffset, _contextOffset, tooltip, parent, popped = !1,
        t = {};
    return t.parent = function(x) {
        return arguments.length ? (parent = x, t) : parent
    }, t.events = function() {
        return {
            on: on,
            off: off
        }
    }, t
};
var wax = wax || {};
if (wax.request = {
        cache: {},
        locks: {},
        promises: {},
        get: function(url, callback) {
            if (this.cache[url]) return callback(this.cache[url][0], this.cache[url][1]);
            if (this.promises[url] = this.promises[url] || [], this.promises[url].push(callback), !this.locks[url]) {
                var that = this;
                this.locks[url] = !0, reqwest({
                    url: url + (~url.indexOf("?") ? "&" : "?") + "callback=?",
                    type: "jsonp",
                    jsonpCallbackName: "utfgridCallback",
                    success: function(data) {
                        that.locks[url] = !1, that.cache[url] = [null, data];
                        for (var i = 0; i < that.promises[url].length; i++) that.promises[url][i](that.cache[url][0], that.cache[url][1])
                    },
                    error: function(err) {
                        that.locks[url] = !1, that.cache[url] = [err, null];
                        for (var i = 0; i < that.promises[url].length; i++) that.promises[url][i](that.cache[url][0], that.cache[url][1])
                    }
                })
            }
        }
    }, wax.template = function(x) {
        var template = {
            format: function(options, data) {
                var clone = {};
                for (var key in data) clone[key] = data[key];
                return options.format && (clone["__" + options.format + "__"] = !0), wax.u.sanitize(Mustache.to_html(x, clone))
            }
        };
        return template
    }, !wax) var wax = {};
wax.tilejson = function(url, callback) {
    reqwest({
        url: url + (~url.indexOf("?") ? "&" : "?") + "callback=?",
        type: "jsonp",
        success: callback,
        error: callback
    })
};
var wax = wax || {};
wax.tooltip = {}, wax.tooltip = function() {
    function getTooltip(feature) {
        var tooltip = document.createElement("div");
        return tooltip.className = "map-tooltip map-tooltip-0 wax-tooltip", tooltip.innerHTML = feature, tooltip
    }

    function remove() {
        this.parentNode && this.parentNode.removeChild(this)
    }

    function hide() {
        for (var _ct; _ct = tooltips.pop();) animate && transitionEvent ? (bean.add(_ct, transitionEvent, remove), _ct.className += " map-fade") : _ct.parentNode && _ct.parentNode.removeChild(_ct)
    }

    function on(o) {
        var content;
        if ("mousemove" !== o.e.type && o.e.type) {
            if (!(content = o.content || o.formatter({
                    format: "full"
                }, o.data)) && (o.e.type && o.e.type.match(/touch/) && (content = o.content || o.formatter({
                    format: "teaser"
                }, o.data)), !content)) return;
            hide(), parent.style.cursor = "pointer";
            var tt = parent.appendChild(getTooltip(content));
            tt.className += " map-popup wax-popup";
            var close = tt.appendChild(document.createElement("a"));
            close.href = "#close", close.className = "close", close.innerHTML = "Close", popped = !0, tooltips.push(tt), bean.add(close, "touchstart mousedown", (function(e) {
                e.stop()
            })), bean.add(close, "click touchend", (function(e) {
                e.stop(), hide(), popped = !1
            }))
        } else if (!popped) {
            if (!(content = o.content || o.formatter({
                    format: "teaser"
                }, o.data)) || content == _currentContent) return;
            hide(), parent.style.cursor = "pointer", tooltips.push(parent.appendChild(getTooltip(content))), _currentContent = content
        }
    }

    function off() {
        parent.style.cursor = "default", _currentContent = null, popped || hide()
    }
    var _currentContent, transitionEvent, parent, popped = !1,
        animate = !1,
        t = {},
        tooltips = [];
    return void 0 !== document.body.style["-webkit-transition"] ? transitionEvent = "webkitTransitionEnd" : void 0 !== document.body.style.MozTransition && (transitionEvent = "transitionend"), t.parent = function(x) {
        return arguments.length ? (parent = x, t) : parent
    }, t.animate = function(x) {
        return arguments.length ? (animate = x, t) : animate
    }, t.events = function() {
        return {
            on: on,
            off: off
        }
    }, t
};
var wax = wax || {};
wax.u = {
    offset: function(el) {
        var width = el.offsetWidth || parseInt(el.style.width, 10),
            height = el.offsetHeight || parseInt(el.style.height, 10),
            doc_body = document.body,
            top = 0,
            left = 0,
            calculateOffset = function(el) {
                if (el !== doc_body && el !== document.documentElement) {
                    top += el.offsetTop, left += el.offsetLeft;
                    var match, style = el.style.transform || el.style.WebkitTransform || el.style.OTransform || el.style.MozTransform || el.style.msTransform;
                    if (style)
                        if (match = style.match(/translate\((.+)[px]?, (.+)[px]?\)/)) top += parseInt(match[2], 10), left += parseInt(match[1], 10);
                        else if (match = style.match(/translate3d\((.+)[px]?, (.+)[px]?, (.+)[px]?\)/)) top += parseInt(match[2], 10), left += parseInt(match[1], 10);
                    else if (match = style.match(/matrix3d\(([\-\d,\s]+)\)/)) {
                        var pts = match[1].split(",");
                        top += parseInt(pts[13], 10), left += parseInt(pts[12], 10)
                    } else(match = style.match(/matrix\(.+, .+, .+, .+, (.+), (.+)\)/)) && (top += parseInt(match[2], 10), left += parseInt(match[1], 10))
                }
            };
        if (void 0 !== el.getBoundingClientRect) {
            var body = document.body,
                doc = el.ownerDocument.documentElement,
                clientTop = document.clientTop || body.clientTop || 0,
                clientLeft = document.clientLeft || body.clientLeft || 0,
                scrollTop = window.pageYOffset || doc.scrollTop,
                scrollLeft = window.pageXOffset || doc.scrollLeft,
                box = el.getBoundingClientRect();
            top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft
        } else {
            calculateOffset(el);
            try {
                for (; el = el.offsetParent;) calculateOffset(el)
            } catch (e) {}
        }
        top += doc_body.offsetTop, left += doc_body.offsetLeft, top += doc_body.parentNode.offsetTop, left += doc_body.parentNode.offsetLeft;
        var htmlComputed = document.defaultView ? window.getComputedStyle(doc_body.parentNode, null) : doc_body.parentNode.currentStyle;
        return doc_body.parentNode.offsetTop === parseInt(htmlComputed.marginTop, 10) || isNaN(parseInt(htmlComputed.marginTop, 10)) || (top += parseInt(htmlComputed.marginTop, 10), left += parseInt(htmlComputed.marginLeft, 10)), {
            top: top,
            left: left,
            height: height,
            width: width
        }
    },
    $: function(x) {
        return "string" == typeof x ? document.getElementById(x) : x
    },
    eventoffset: function(e) {
        return e || (e = window.event), e.pageX || e.pageY ? {
            x: e.pageX,
            y: e.pageY
        } : e.clientX || e.clientY ? {
            x: e.clientX,
            y: e.clientY
        } : e.touches && 1 === e.touches.length ? {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
        } : void 0
    },
    limit: function(func, wait, debounce) {
        var timeout;
        return function() {
            var context = this,
                args = arguments,
                throttler = function() {
                    timeout = null, func.apply(context, args)
                };
            debounce && clearTimeout(timeout), !debounce && timeout || (timeout = setTimeout(throttler, wait))
        }
    },
    throttle: function(func, wait) {
        return this.limit(func, wait, !1)
    },
    sanitize: function(content) {
        function urlX(url) {
            if (/^(https?:\/\/|data:image)/.test(url)) return url
        }

        function idX(id) {
            return id
        }
        return content ? html_sanitize(content, urlX, idX) : ""
    }
}, wax = wax || {}, wax.g = wax.g || {}, wax.g.attribution = function(map, tilejson) {
    tilejson = tilejson || {};
    var a, attribution = {
        element: function() {
            return a.element()
        },
        appendTo: function(elem) {
            return wax.u.$(elem).appendChild(a.element()), this
        },
        init: function() {
            return (a = wax.attribution()).content(tilejson.attribution), a.element().className = "map-attribution map-g", this
        }
    };
    return attribution.init()
}, wax = wax || {}, wax.g = wax.g || {}, wax.g.bwdetect = function(map, options) {
    var lowpng = (options = options || {}).png || ".png128",
        lowjpg = options.jpg || ".jpg70";
    if (!map.mapTypes["mb-low"]) {
        for (var mb = map.mapTypes.mb, tilejson = {
                tiles: [],
                scheme: mb.options.scheme,
                blankImage: mb.options.blankImage,
                minzoom: mb.minZoom,
                maxzoom: mb.maxZoom,
                name: mb.name,
                description: mb.description
            }, i = 0; i < mb.options.tiles.length; i++) tilejson.tiles.push(mb.options.tiles[i].replace(".png", lowpng).replace(".jpg", lowjpg));
        m.mapTypes.set("mb-low", new wax.g.connector(tilejson))
    }
    return wax.bwdetect(options, (function(bw) {
        map.setMapTypeId(bw ? "mb" : "mb-low")
    }))
}, wax = wax || {}, wax.g = wax.g || {}, wax.g.hash = function(map) {
    return wax.hash({
        getCenterZoom: function() {
            var center = map.getCenter(),
                zoom = map.getZoom(),
                precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
            return [zoom.toFixed(2), center.lat().toFixed(precision), center.lng().toFixed(precision)].join("/")
        },
        setCenterZoom: function(args) {
            map.setCenter(new google.maps.LatLng(args[1], args[2])), map.setZoom(args[0])
        },
        bindChange: function(fn) {
            google.maps.event.addListener(map, "idle", fn)
        },
        unbindChange: function(fn) {
            google.maps.event.removeListener(map, "idle", fn)
        }
    })
}, wax = wax || {}, wax.g = wax.g || {}, wax.g.interaction = function(options) {
    function setdirty() {
        dirty = !0
    }

    function grid() {
        if (!dirty && _grid) return _grid;
        _grid = [];
        var zoom = map.getZoom(),
            get = (wax.u.offset(map.getDiv()), function(mapType) {
                if (mapType && mapType.interactive && !(zoom < mapType.minZoom || zoom > mapType.maxZoom))
                    for (var key in mapType.cache)
                        if (key.split("/")[0] == zoom) {
                            var tileOffset = wax.u.offset(mapType.cache[key]);
                            _grid.push([tileOffset.top, tileOffset.left, mapType.cache[key]])
                        }
            });
        for (var i in map.mapTypes) get(map.mapTypes[i]);
        return map.overlayMapTypes.forEach(get), _grid
    }

    function attach(x) {
        if (!arguments.length) return map;
        map = x, tileloadListener = google.maps.event.addListener(map, "tileloaded", setdirty), idleListener = google.maps.event.addListener(map, "idle", setdirty)
    }

    function detach() {
        tileloadListener && google.maps.event.removeListener(tileloadListener), idleListener && google.maps.event.removeListener(idleListener)
    }
    var _grid, map, dirty = !1,
        tileloadListener = null,
        idleListener = null;
    return wax.interaction(options).attach(attach).detach(detach).parent((function() {
        return map.getDiv()
    })).grid(grid)
}, wax = wax || {}, wax.g = wax.g || {}, wax.g.legend = function(map, tilejson) {
    tilejson = tilejson || {};
    var l, legend = {
        add: function() {
            return l = wax.legend().content(tilejson.legend || ""), legend
        },
        element: function() {
            return l.element()
        },
        appendTo: function(elem) {
            return wax.u.$(elem).appendChild(l.element()), legend
        }
    };
    return legend.add()
};
var wax = wax || {};
wax.g = wax.g || {}, wax.g.connector = function(options) {
    options = options || {}, this.options = {
        tiles: options.tiles,
        scheme: options.scheme || "xyz",
        blankImage: options.blankImage || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    }, this.minZoom = options.minzoom || 0, this.maxZoom = options.maxzoom || 22, this.name = options.name || "", this.description = options.description || "", this.tileDimension = options.tileSize || 256, this.interactive = !1 !== options.interactive, this.tileSize = new google.maps.Size(this.tileDimension, this.tileDimension), this.cache = {}, this.createdAtTime = (new Date).getTime()
}, wax.g.connector.prototype.getTile = function(coord, zoom) {
    var key = zoom + "/" + coord.x + "/" + coord.y,
        img = this.cache[key] = new Image(this.tileDimension, this.tileDimension);
    return zoom < this.minZoom || zoom > this.maxZoom ? (this.cache[key].src = this.options.blankImage, this.cache[key].style.display = "none") : this.cache[key].src = this.getTileUrl(coord, zoom), this.cache[key].setAttribute("gTileKey", key), this.cache[key].onerror = function() {
        img.style.display = "none"
    }, this.cache[key]
}, wax.g.connector.prototype.releaseTile = function(tile) {
    if (!((new Date).getTime() - this.createdAtTime < 5e3)) {
        var key = tile.getAttribute("gTileKey");
        this.cache[key] && delete this.cache[key]
    }
}, wax.g.connector.prototype.getTileUrl = function(coord, z) {
    var mod = Math.pow(2, z),
        y = "tms" === this.options.scheme ? mod - 1 - coord.y : coord.y,
        x = coord.x % mod;
    return x = x < 0 ? coord.x % mod + mod : x, y < 0 ? this.options.blankImage : this.options.tiles[parseInt(x + y, 10) % this.options.tiles.length].replace(/\{z\}/g, z).replace(/\{x\}/g, x).replace(/\{y\}/g, y)
};
var loadMap3 = function() {
    function elasticsearchTileservers() {
        var tileservers = ["https://tiles.inaturalist.org/v1"];
        if (tileservers[0].match(/{n}/)) {
            var pattern = tileservers[0];
            tileservers = _.map(["1", "2", "3", "4"], (function(n) {
                return pattern.replace("{n}", n)
            }))
        }
        return tileservers
    }

    function intereactionsServer() {
        var interactionTileURL = "";
        return interactionTileURL || elasticsearchTileservers()[0]
    }

    function postgisTileservers() {
        var nodeApiURL = "https://api.inaturalist.org/v1";
        return nodeApiURL ? [nodeApiURL] : elasticsearchTileservers()
    }
    if ("undefined" != typeof google && void 0 !== google.maps) {
        var infoWindowOpenTime, deselectText = function() {
                window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
            },
            emptyLayer = new google.maps.ImageMapType({
                tileSize: new google.maps.Size(256, 256),
                getTileUrl: function() {}
            });
        google.maps.Map.prototype.createMarker = function(lat, lng, options) {
            return (options = options || {}).position = new google.maps.LatLng(lat, lng), new google.maps.Marker(options)
        }, google.maps.Map.prototype.removeMarker = function(marker) {
            google.maps.event.clearInstanceListeners(marker), marker.setMap(null), this.removeOverlay(marker)
        }, google.maps.Map.prototype.addNewCenteredMarker = function(options) {
            return this.addNewUnsavedMarker(this.getCenter().lat(), this.getCenter().lng(), options)
        }, google.maps.Map.prototype.addNewUnsavedMarker = function(lat, lng, options) {
            return this.removeLastUnsavedMarker(), this.lastUnsavedMarker = this.createMarker(lat, lng, options), this.lastUnsavedMarker.setMap(this), this.lastUnsavedMarker
        }, google.maps.Map.prototype.removeLastUnsavedMarker = function() {
            return !!this.lastUnsavedMarker && (this.removeMarker(this.lastUnsavedMarker), this.lastUnsavedMarker = null, !0)
        }, google.maps.Map.prototype.addObservation = function(observation, options) {
            options = options || {};
            var lat = observation.private_latitude || observation.latitude,
                lon = observation.private_longitude || observation.longitude;
            if (!lat || !lon) return !1;
            options.icon || (options.icon = iNaturalist.Map.createObservationIcon({
                observation: observation
            }));
            var marker = this.createMarker(lat, lon, options);
            this.observations[observation.id] = marker, void 0 !== options.clickable && 0 == options.clickable || (marker.message = this.buildObservationInfoWindow(observation), google.maps.event.addListener(marker, "click", this.openInfoWindow));
            var bounds = this.getObservationBounds();
            if (bounds.extend(new google.maps.LatLng(lat, lon)), this.setObservationBounds(bounds), marker.setMap(this), observation.marker = marker, options.showAccuracy && (observation.coordinates_obscured || observation.positional_accuracy && observation.positional_accuracy > 0)) {
                var iconicTaxonName = observation.iconic_taxon_name;
                !iconicTaxonName && observation.iconic_taxon && (iconicTaxonName = observation.iconic_taxon.name), !iconicTaxonName && observation.taxon && (iconicTaxonName = observation.taxon.iconic_taxon_name);
                var shape, color = iconicTaxonName ? iNaturalist.Map.ICONIC_TAXON_COLORS[iconicTaxonName] : "#333333",
                    shapeOptions = {
                        strokeColor: color,
                        strokeOpacity: .8,
                        strokeWeight: 2,
                        fillColor: color,
                        fillOpacity: .35,
                        map: this
                    };
                if (observation.coordinates_obscured) shape = markerObscuredRectangle(marker, shapeOptions), this.observationRectangles[observation.id] = shape;
                else {
                    var accuracy = parseInt(observation.positional_accuracy) || 0;
                    if (0 == accuracy) return;
                    shape = new google.maps.Circle(_.extend(shapeOptions, {
                        center: marker.getPosition(),
                        radius: accuracy
                    })), this.observationCircles[observation.id] = shape
                }
                var listener = function() {
                    var mapBounds = this.getBounds(),
                        shapeBounds = shape.getBounds();
                    mapBounds && shapeBounds.contains(mapBounds.getNorthEast()) && shapeBounds.contains(mapBounds.getSouthWest()) ? shape.setVisible(!1) : shape.setVisible(!0)
                };
                google.maps.event.addListener(this, "zoom_changed", listener), google.maps.event.addListener(this, "bounds_changed", listener)
            }
            return observation
        }, google.maps.Map.prototype.removeObservation = function(observation) {
            this.removeMarker(this.observations[observation.id]), this.observations[observation.id] && this.observations[observation.id].setMap(null), this.observationCircles[observation.id] && (this.observationCircles[observation.id].unbindAll(), this.observationCircles[observation.id].setMap(null), delete this.observationCircles[observation.id]), this.observationRectangles[observation.id] && (this.observationRectangles[observation.id].unbindAll(), this.observationRectangles[observation.id].setMap(null), delete this.observationRectangles[observation.id]), delete this.observations[observation.id]
        }, google.maps.Map.prototype.addObservations = function(observations, options) {
            var map = this;
            $.each(observations, (function() {
                map.addObservation(this, options)
            }))
        }, google.maps.Map.prototype.removeObservations = function(observations) {
            var map = this;
            void 0 === observations ? $.each(map.observations, (function(k) {
                map.removeObservation({
                    id: k
                }), delete map.observationBounds
            })) : $.each(observations, (function() {
                map.removeObservation(this)
            }))
        }, google.maps.Map.prototype.getObservationBounds = function() {
            return this.observationBounds || (this.observationBounds = new google.maps.LatLngBounds), this.observationBounds
        }, google.maps.Map.prototype.setObservationBounds = function(bounds) {
            this.observationBounds = bounds
        }, google.maps.Map.prototype.zoomToObservations = function() {
            this.fitBounds(this.getObservationBounds())
        }, google.maps.Map.prototype.addPlaces = function(places) {
            for (var i = places.length - 1; i >= 0; i--) this.addPlace(places[i])
        }, google.maps.Map.prototype.addPlace = function(place, options) {
            if (void 0 === options) options = {};
            void 0 === options.icon && (options.icon = iNaturalist.Map.createPlaceIcon());
            var marker = this.createMarker(place.latitude, place.longitude, options);
            this.places[place.id] = marker;
            var placesLength = 0;
            for (var key in this.places) placesLength += 1;
            if (1 == placesLength && null != place.swlat && "" != place.swlat) var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(place.swlat, place.swlng), new google.maps.LatLng(place.nelat, place.nelng));
            else {
                bounds = this.getPlaceBounds();
                place.swlat ? (bounds.extend(new google.maps.LatLng(place.swlat, place.swlng)), bounds.extend(new google.maps.LatLng(place.nelat, place.nelng))) : bounds.extend(new google.maps.LatLng(place.latitude, place.longitude))
            }
            return this.setPlaceBounds(bounds), marker.setMap(this), place.marker = marker, place
        }, google.maps.Map.prototype.setPlace = function(place, options) {
            if (options = options || {}, place.swlat) {
                var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(place.swlat, place.swlng), new google.maps.LatLng(place.nelat, place.nelng));
                this.fitBounds(bounds)
            } else this.setCenter(new google.maps.LatLng(place.latitude, place.longitude))
        }, google.maps.Map.prototype.removePlace = function(place) {
            this.places[place.id] && (this.removeMarker(this.places[place.id]), delete this.places[place.id])
        }, google.maps.Map.prototype.removePlaces = function(places) {
            var map = this;
            void 0 === places ? $.each(map.places, (function() {
                map.removeMarker(this)
            })) : $.each(places, (function() {
                map.removePlace(this)
            })), this.placeBounds = new google.maps.LatLngBounds
        }, google.maps.Map.prototype.zoomToPlaces = function() {
            this.fitBounds(this.getPlaceBounds())
        }, google.maps.Map.prototype.getPlaceBounds = function() {
            return void 0 === this.placeBounds && (this.placeBounds = new google.maps.LatLngBounds), this.placeBounds
        }, google.maps.Map.prototype.setPlaceBounds = function(bounds) {
            this.placeBounds = bounds
        }, google.maps.Map.prototype.openInfoWindow = function() {
            infoWindowOpenTime = new Date, window.map && window.map.infoWindow && window.map.infoWindow.close(), iNaturalist.Map.infoWindow = iNaturalist.Map.infoWindow || new google.maps.InfoWindow, iNaturalist.Map.infoWindow.setContent(this.message), iNaturalist.Map.infoWindow.open(this.map, this)
        }, google.maps.Map.prototype.buildObservationInfoWindow = function(observation) {
            var existing = document.getElementById("observation-" + observation.id);
            if (void 0 !== existing && null != existing) {
                var infowinobs = $(existing).clone().get(0);
                $(infowinobs).find(".details").show();
                var wrapper = $('<div class="compact mini infowindow observations"></div>').append(infowinobs);
                return $(wrapper).get(0)
            }
            var photoURL;
            wrapper = $('<div class="observation"></div>');
            return void 0 !== observation.image_url && null != observation.image_url ? photoURL = observation.image_url : void 0 !== observation.obs_image_url && null != observation.obs_image_url ? photoURL = observation.obs_image_url : void 0 !== observation.photos && observation.photos.length > 0 && (photoURL = observation.photos[0].square_url), photoURL && wrapper.append($('<img width="75" height="75"></img>').attr("src", photoURL).addClass("left")), wrapper.append($('<div class="readable attribute inlineblock"></div>').append($('<a href="/observations/' + observation.id + '"></a>').append(observation.species_guess))), observation.user ? wrapper.append(", by ", $('<a href="/people/' + observation.user.login + '"></a>').append(observation.user.login)) : void 0 !== observation.identifications && observation.identifications.length > 0 && void 0 !== observation.identifications[0].user && wrapper.append(", by ", $('<a href="/people/' + observation.identifications[0].user.login + '"></a>').append(observation.identifications[0].user.login)), void 0 !== observation.short_description && null != observation.short_description ? wrapper.append($('<div class="description"></div>').append(observation.short_description)) : wrapper.append($('<div class="description"></div>').append(observation.description)), (wrapper = $('<div class="compact observations mini infowindow"></div>').append(wrapper)).get(0)
        }, "undefined" == typeof iNaturalist && (this.iNaturalist = {}), void 0 === iNaturalist.Map && (this.iNaturalist.Map = {}), iNaturalist.Map.MAP_BACKGROUND_COLOR = "#B3D1FF", iNaturalist.Map.SATELLITE_BACKGROUND_COLOR = "#2A4280", iNaturalist.Map.MapTypes = {}, iNaturalist.Map.MapTypes.LIGHT = "light", iNaturalist.Map.MapTypes.light = new google.maps.StyledMapType([{
            stylers: [{
                lightness: 50
            }, {
                saturation: -50
            }]
        }], {
            name: "Map"
        }), iNaturalist.Map.MapTypes.LIGHT_NO_LABELS = "light_no_labels", iNaturalist.Map.MapTypes.light_no_labels = new google.maps.StyledMapType([{
            stylers: [{
                lightness: 50
            }, {
                saturation: -50
            }]
        }, {
            featureType: "all",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }], {
            name: "Map (no labels)"
        }), iNaturalist.Map.MapTypeId = iNaturalist.Map.MapTypeId || {}, iNaturalist.Map.MapTypeId.OSM = "OSM", iNaturalist.Map.DEFAULT_GOOGLE_MAP_OPTIONS = {
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, iNaturalist.Map.MapTypeId.OSM],
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            streetViewControl: !1,
            rotateControl: !1,
            backgroundColor: iNaturalist.Map.MAP_BACKGROUND_COLOR,
            clickableIcons: !1,
            gestureHandling: "greedy",
            controlSize: 26,
            scaleControl: !0,
            tilt: 0,
            zoomControl: !0,
            zoomControlOptions: {
                position: google.maps.ControlPosition.BLOCK_START_INLINE_START
            }
        }, iNaturalist.Map.API_PARAMS = function() {
            return ["acc", "acc_above", "acc_below", "acc_below_or_unknown", "annotation_user_id", "apply_project_rules_for", "border_opacity", "cache", "captive", "collection_preview", "color", "created_d1", "created_d2", "created_day", "created_month", "created_on", "created_year", "disagreements", "d1", "d2", "day", "endemic", "expected_nearby", "featured_observation_id", "geo", "geoprivacy", "has", "has[]", "hour", "hrank", "iconic_taxa", "id", "id_above", "ident_taxon_id", "ident_taxon_id_exclusive", "ident_user_id", "identifications", "identified", "introduced", "lat", "license", "licensed", "line_color", "line_opacity", "line_width", "list_id", "lng", "lrank", "members_of_project", "month", "native", "nelat", "nelng", "not_in_list_id", "not_in_place", "not_in_project", "not_matching_project_rules_for", "not_user_id", "oauth_application_id", "obscuration", "observation_accuracy_experiment_id", "on", "opacity", "outlink_source", "pcid", "photo_license", "photo_licensed", "photos", "place_id", "popular", "precision", "precision_offset", "project_id", "project_ids", "projects[]", "q", "quality_grade", "radius", "rank", "reviewed", "scaled", "search_on", "site_id", "skip_top_hits", "sound_license", "sounds", "style", "swlat", "swlng", "taxon_geoprivacy", "taxon_id", "taxon_ids", "taxon_ids[]", "term_id", "term_id_or_unknown", "term_value_id", "threatened", "tile_size", "ttl", "unobserved_by_user_id", "user_after", "user_before", "user_id", "verifiable", "viewer_id", "viewer_id", "week", "width", "without_field", "without_ident_user_id", "without_taxon_id", "without_term_id", "without_term_value_id", "year"]
        }, iNaturalist.Map.createMap = function(options) {
            var map, placement = (options = options || {}).placement;
            if (delete options.placement, options = $.extend({
                    div: "map",
                    center: new google.maps.LatLng(options.lat || 0, options.lng || 0)
                }, iNaturalist.Map.DEFAULT_GOOGLE_MAP_OPTIONS, options), iNaturalist.log({
                    "map-placement": placement || "unknown"
                }), (map = "string" == typeof options.div ? new google.maps.Map(document.getElementById(options.div), options) : new google.maps.Map(options.div, options)).observation_id = null, map.observations = {}, map.observationCircles = {}, map.observationRectangles = {}, map.places = {}, map.lastUnsavedMarker = null, google.maps.Map.prototype.infoWindow = null, map.addListener("maptypeid_changed", (function() {
                    var mapTypeId = map.getMapTypeId();
                    mapTypeId == google.maps.MapTypeId.SATELLITE || mapTypeId == google.maps.MapTypeId.HYBRID ? $(map.getDiv()).css({
                        backgroundColor: iNaturalist.Map.SATELLITE_BACKGROUND_COLOR
                    }) : $(map.getDiv()).css({
                        backgroundColor: map._inatMapBackgroundColor
                    })
                })), map._inatMapBackgroundColor = options.backgroundColor || iNaturalist.Map.MAP_BACKGROUND_COLOR, !options.disableFullscreen) {
                var fullScreenPosition = $('html[dir="rtl"]').length > 0 ? google.maps.ControlPosition.TOP_LEFT : google.maps.ControlPosition.TOP_RIGHT;
                map.controls[fullScreenPosition].push(new iNaturalist.FullScreenControl(map))
            }
            if (options.bounds)
                if ("function" == typeof options.bounds.getCenter) map.setBounds(options.bounds);
                else {
                    var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(options.bounds.swlat, options.bounds.swlng), new google.maps.LatLng(options.bounds.nelat, options.bounds.nelng));
                    map.fitBounds(bounds)
                }
            return map.mapTypes.set(iNaturalist.Map.MapTypeId.OSM, iNaturalist.Map.createOsmMapTypeForMap(map)), google.maps.event.addListener(map, "maptypeid_changed", (function() {
                iNaturalist.Map.toggleOsmAttributionForMap(this)
            })), options.mapTypeId === iNaturalist.Map.MapTypeId.OSM && iNaturalist.Map.toggleOsmAttributionForMap(map), map
        }, iNaturalist.Map.createPlaceIcon = function(options) {
            var iconPath = "/mapMarkers/mm_34_stemless_";
            iconPath += (options = options || {}).color ? options.color : "DeepPink", options.character && (iconPath += "_" + options.character), iconPath += ".png";
            var place = new google.maps.MarkerImage(iconPath);
            return place.size = new google.maps.Size(20, 20), place.anchor = new google.maps.Point(10, 10), place
        }, iNaturalist.Map.createObservationIcon = function(options) {
            if (void 0 === options) options = {};
            var iconPath;
            if (options.observation) {
                var iconSet = options.observation.coordinates_obscured ? "STEMLESS_ICONS" : "ICONS",
                    iconicTaxonIconsSet = options.observation.coordinates_obscured ? "STEMLESS_ICONIC_TAXON_ICONS" : "ICONIC_TAXON_ICONS",
                    iconicTaxonName = options.observation.iconic_taxon_name;
                return !iconicTaxonName && options.observation.iconic_taxon && (iconicTaxonName = options.observation.iconic_taxon.name), !iconicTaxonName && options.observation.taxon && (iconicTaxonName = options.observation.taxon.iconic_taxon_name), iconicTaxonName ? (iconPath = _.clone(iNaturalist.Map[iconicTaxonIconsSet][iconicTaxonName]), "research" != options.observation.quality_grade && (iconPath.url = iconPath.url.replace(/\.png$/, "NoDot.png"))) : iconPath = iNaturalist.Map[iconSet].unknown34, options.observation.coordinates_obscured && (iconPath.anchor = new google.maps.Point(10, 10)), iconPath
            }
            return iconPath = "/mapMarkers/mm_34_", iconPath += options.stemless ? "stemless_" : "", iconPath += options.color || "HotPink", iconPath += options.character ? "_" + options.character : "", options.character || "research" == options.quality_grade || (iconPath += "NoDot"), iconPath += ".png"
        }, iNaturalist.Map.distanceInMeters = function(lat1, lon1, lat2, lon2) {
            var earthRadius = 6370997,
                degreesPerRadian = 57.2958,
                dLat = (lat2 - lat1) / degreesPerRadian,
                dLon = (lon2 - lon1) / degreesPerRadian,
                a = (lat1 = lat1 / degreesPerRadian, lat2 = lat2 / degreesPerRadian, Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2));
            return earthRadius * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
        }, iNaturalist.Map.preferredMapTypeId = function(user) {
            var mapTypeId = google.maps.MapTypeId.TERRAIN;
            return user && user.preferred_observations_search_map_type && !_.isEmpty(user.preferred_observations_search_map_type) && (mapTypeId = user.preferred_observations_search_map_type.match(/light/) ? google.maps.MapTypeId.ROADMAP : user.preferred_observations_search_map_type), mapTypeId
        }, iNaturalist.FullScreenControl = function(map) {
            var controlDiv = document.createElement("DIV"),
                enter = '<span class="ui-icon ui-icon-extlink">Full screen</span>',
                exit = '<span class="ui-icon ui-icon-arrow-1-sw inlineblock"></span> ' + I18n.t("exit_full_screen");
            controlDiv.style.padding = "5px";
            var controlUI = $("<div></div>").html(enter).addClass("gmapv3control");
            controlDiv.appendChild(controlUI.get(0));
            var exitFullScreen = function() {
                var oldCenter = map.getCenter();
                $(this).html(enter).css("font-weight", "normal"), $(map.getDiv()).removeClass("fullscreen"), google.maps.event.trigger(map, "resize"), map.setCenter(oldCenter)
            };
            window.fullscreenEscapeHandler = function(e) {
                27 === e.keyCode && controlUI.click(), $(document).unbind("keyup", window.fullscreenEscapeHandler)
            };
            var enterFullScreen = function() {
                var oldCenter = map.getCenter();
                $(this).html(exit).css("font-weight", "bold"), $(map.getDiv()).addClass("fullscreen"), google.maps.event.trigger(map, "resize"), map.setCenter(oldCenter), $(document).bind("keyup", window.fullscreenEscapeHandler)
            };
            return controlUI.toggle(enterFullScreen, exitFullScreen), controlDiv
        }, iNaturalist.legendItem = function(options) {
            var li = $("<li/>"),
                iconDiv = $("<div/>").addClass("icon");
            options.images ? _.each(options.images, (function(i) {
                var icon = $("<img/>").attr("src", i);
                options.imageClasses && icon.addClass(options.imageClasses), iconDiv.append(icon)
            })) : options.color ? iconDiv.addClass("color-box").css("background", options.color) : !0 === options.unknown && iconDiv.addClass("color-box unknown"), options.classes && li.addClass(options.classes);
            var labelDiv = $("<div/>").addClass("label").text(options.label);
            return li.append(iconDiv).append(labelDiv)
        }, iNaturalist.LegendControl = function(controlDiv) {
            var controlUI = $("<div><div id='map-legend-label' class='gmap-label'>" + I18n.t("map_legend") + "</div></div>").addClass("gmapv3legend");
            controlUI.click((function() {
                $("#map-legend").toggle(), $("#map-legend").focus()
            })), controlDiv.appendChild(controlUI.get(0))
        }, iNaturalist.Legend = function(controlDiv, map, options) {
            options = options || {};
            var controlUI = $("<div id='map-legend'><div class='title'>" + I18n.t("map_legend") + "</div></div>").addClass("gmapv3legend").hide(),
                ulDiv = $("<div></div>").addClass("ul-container"),
                ul1 = $("<ul></ul>").addClass("inat-overlay left");
            ul1.append($("<li class='header'>" + I18n.t("quality_grade") + "</li>")), ul1.append(iNaturalist.legendItem({
                images: ["/assets/map_legend/legend_lg_mm_research-68c997ae66a8a1afe563ad9db421960502e2546508840381503e0a232d2be3e7.png", "/assets/map_legend/legend_lg_mm_circle_research-3c63e0f875dc2125679696373c789985ca021c5e9737f2a4da73143b91128ad7.png"],
                label: I18n.t("research_grade")
            })), ul1.append(iNaturalist.legendItem({
                images: ["/assets/map_legend/legend_lg_mm-bec5b075754cdda6ef8194709208c9d0a8b1a986b14bbe6e0dda9ad9134c8f5c.png", "/assets/map_legend/legend_lg_mm_circle-672ddc29a9d1134db4005b3a6dd35faa366c452c154f90e58362b0bccc91da1e.png"],
                label: [I18n.t("needs_id_"), I18n.t("casual_")].join(", "),
                classes: "last"
            })), ul1.append($("<li class='header'>" + I18n.t("geoprivacy") + "</li>")), ul1.append(iNaturalist.legendItem({
                images: ["/assets/map_legend/legend_lg_mm-bec5b075754cdda6ef8194709208c9d0a8b1a986b14bbe6e0dda9ad9134c8f5c.png"],
                label: I18n.t("open_")
            })), ul1.append(iNaturalist.legendItem({
                images: ["/assets/map_legend/legend_lg_mm_circle-672ddc29a9d1134db4005b3a6dd35faa366c452c154f90e58362b0bccc91da1e.png"],
                label: I18n.t("obscured"),
                classes: "last"
            })), options.hideFeatured || (ul1.append($("<li class='header'>" + I18n.t("map_marker_size") + "</li>")), ul1.append(iNaturalist.legendItem({
                images: ["/assets/map_legend/legend_lg_mm_research-68c997ae66a8a1afe563ad9db421960502e2546508840381503e0a232d2be3e7.png", "/assets/map_legend/legend_lg_mm-bec5b075754cdda6ef8194709208c9d0a8b1a986b14bbe6e0dda9ad9134c8f5c.png", "/assets/map_legend/legend_lg_mm_circle_research-3c63e0f875dc2125679696373c789985ca021c5e9737f2a4da73143b91128ad7.png", "/assets/map_legend/legend_lg_mm_circle-672ddc29a9d1134db4005b3a6dd35faa366c452c154f90e58362b0bccc91da1e.png"],
                imageClasses: "large",
                label: I18n.t("featured"),
                classes: "tall"
            })), ul1.append(iNaturalist.legendItem({
                images: ["/assets/map_legend/legend_lg_mm_research-68c997ae66a8a1afe563ad9db421960502e2546508840381503e0a232d2be3e7.png", "/assets/map_legend/legend_lg_mm-bec5b075754cdda6ef8194709208c9d0a8b1a986b14bbe6e0dda9ad9134c8f5c.png", "/assets/map_legend/legend_lg_mm_circle_research-3c63e0f875dc2125679696373c789985ca021c5e9737f2a4da73143b91128ad7.png", "/assets/map_legend/legend_lg_mm_circle-672ddc29a9d1134db4005b3a6dd35faa366c452c154f90e58362b0bccc91da1e.png"],
                imageClasses: "wide",
                label: I18n.t("all"),
                classes: "last"
            }))), ulDiv.append(ul1);
            var ul2 = $("<ul></ul>").addClass("inat-overlay right");
            ul2.append($("<li class='header'>" + I18n.t("taxonomic_groups") + "</li>")), ul2.append(iNaturalist.legendItem({
                color: iNaturalist.Map.ICONIC_TAXON_COLORS.Animalia,
                label: [I18n.t("all_taxa.amphibians"), I18n.t("all_taxa.birds"), I18n.t("all_taxa.ray_finned_fishes"), I18n.t("all_taxa.mammals"), I18n.t("all_taxa.reptiles"), I18n.t("all_taxa.other_animals")].join(", ")
            })), ul2.append(iNaturalist.legendItem({
                color: iNaturalist.Map.ICONIC_TAXON_COLORS.Mollusca,
                label: [I18n.t("all_taxa.mollusks"), I18n.t("all_taxa.arachnids"), I18n.t("all_taxa.insects")].join(", ")
            })), ul2.append(iNaturalist.legendItem({
                color: iNaturalist.Map.ICONIC_TAXON_COLORS.Plantae,
                label: I18n.t("all_taxa.plants")
            })), ul2.append(iNaturalist.legendItem({
                color: iNaturalist.Map.ICONIC_TAXON_COLORS.Fungi,
                label: I18n.t("all_taxa.fungi")
            })), ul2.append(iNaturalist.legendItem({
                color: iNaturalist.Map.ICONIC_TAXON_COLORS.Chromista,
                label: I18n.t("all_taxa.chromista")
            })), ul2.append(iNaturalist.legendItem({
                color: iNaturalist.Map.ICONIC_TAXON_COLORS.Protozoa,
                label: I18n.t("all_taxa.protozoans")
            })), ul2.append(iNaturalist.legendItem({
                unknown: !0,
                label: I18n.t("unknown")
            })), ulDiv.append(ul2), controlUI.append(ulDiv), controlDiv.appendChild(controlUI.get(0))
        }, iNaturalist.OverlayControl = function(map, options) {
            var controlDiv = (options = options || {}).div || document.createElement("DIV");
            controlDiv.style.margin = "6px 5px 0";
            var controlUI = $('<div><span class="ui-icon inat-icon ui-icon-layers">' + I18n.t("taxon_map.overlays") + "</span></div>").addClass("gmapv3control overlaycontrol"),
                ul = $("<ul></ul>").addClass("inat-overlay").hide();
            if (controlUI.append(ul), controlUI.hover((function() {
                    $(this).addClass("open"), $("ul", this).show(), $(this).parent().css("z-index", 1)
                }), (function() {
                    $(this).removeClass("open"), $("ul", this).hide(), $(this).parent().css("z-index", 0)
                })), controlDiv.appendChild(controlUI.get(0)), this.div = controlDiv, this.map = map, map.overlays)
                for (var i = 0; i < map.overlays.length; i++) this.addOverlay(map.overlays[i]);
            return this
        }, iNaturalist.OverlayControl.safeTitle = function(title) {
            return title ? title.replace(/\'/, "&#39;").replace(/\"/, "&quot;") : title
        }, iNaturalist.OverlayControl.prototype.removeOverlayControl = function(title) {
            var selector = "li[data-title='" + iNaturalist.OverlayControl.safeTitle(title) + "']";
            $(selector, this.div).remove()
        }, iNaturalist.OverlayControl.prototype.removeAll = function() {
            $("li[data-title]", this.div).remove(), $("li[data-taxon-id]", this.div).remove()
        }, iNaturalist.OverlayControl.prototype.addWindshaftOverlayControl = function(layers, options) {
            if (Array.isArray(layers) && 0 !== layers.length) {
                var map = this.map,
                    ul = $("ul", this.div),
                    title = iNaturalist.OverlayControl.safeTitle(options.title) || "Layer",
                    id = "layer_" + layers[0].layerID,
                    description = options.description,
                    checkbox = $("<input type='checkbox'/>"),
                    li = $("<li/>"),
                    controlPosition = google.maps.ControlPosition[options.controlPosition] || ($("html[dir='rtl']").length > 0 ? google.maps.ControlPosition.TOP_LEFT : google.maps.ControlPosition.TOP_RIGHT);
                options.taxon && (id += "-" + options.taxon.id + "-" + options.label), li.attr("data-title", title);
                var label = $("<label/>").attr("for", id).html(title);
                options.hover && label.attr("title", options.hover), checkbox.attr("id", id).attr("name", title).attr("checked", !options.disabled);
                var legendLeft = $("<div class='legend-left' />");
                legendLeft.append(checkbox);
                var legendRight = $("<div class='legend-right' />");
                legendRight.append(label);
                var legendColor = options.legendColor || options.color;
                legendColor && (li.addClass("with-legend-mark"), legendLeft.append($("<div class='legend-mark' />").css({
                    backgroundColor: legendColor
                }))), li.append(legendLeft, legendRight), options.link && label.append(" <a href='" + options.link + "' target='_blank' rel='noopener noreferrer'><i class='icon-link' /></a>"), options.taxon && addWindshaftOverlayTaxonDiv(ul, li, options), checkbox.change((function(e) {
                    var checked = $(this).prop("checked");
                    _.each(layers, (function(layerData) {
                        map.overlayMapTypes.setAt(layerData.layerID - 1, checked ? layerData.layer : emptyLayer)
                    })), (taxonID = $(this).parent().data("taxon-id")) && updateTaxonCheckboxState(ul, taxonID), "function" == typeof options.onChange && options.onChange(e)
                })), description && legendRight.append($("<div/>").addClass("small meta").html(description)), ul.append(li), updateCheckboxInteractions(ul), map._overlayControlDisplayed || (map.controls[controlPosition].push(map._overlayControl.div), map._overlayControlDisplayed = !0)
            }
        };
        var updateTaxonCheckboxState = function(ul, taxonID) {
                0 === ul.find("li.for_taxon[data-taxon-id='" + taxonID + "'] input:checked").length ? ul.find("li.taxon[data-taxon-id='" + taxonID + "'] input").prop("checked", !1) : ul.find("li.taxon[data-taxon-id='" + taxonID + "'] input").prop("checked", !0)
            },
            updateCheckboxInteractions = function(ul) {
                _.each(ul.find("li.taxon"), (function(taxon_li) {
                    updateTaxonCheckboxState(ul, $(taxon_li).data("taxon-id"))
                })), ul.find("li.taxon input").unbind("change"), ul.find("li.taxon input").bind("change", (function() {
                    var checked = $(this).prop("checked"),
                        selector = checked ? ":not(:checked)" : ":checked";
                    ul.find("li.for_taxon[data-taxon-id='" + $(this).attr("id") + "'] input" + selector).prop("checked", checked).trigger("change")
                }))
            },
            addWindshaftOverlayTaxonDiv = function(ul, li, options) {
                if (taxon_id = "taxon_layers_" + options.taxon.id, li.addClass("for_taxon"), li.attr("data-taxon-id", taxon_id), 0 == ul.find("#" + taxon_id).length) {
                    var primaryName, taxonLabel, taxonCheckbox = $("<input type='checkbox'/>").attr("id", taxon_id).attr("name", options.taxon.name);
                    options.taxon.forced_name ? taxonLabel = $("<label/>").attr("for", taxon_id).html(options.taxon.forced_name) : ((primaryName = options.taxon.common_name ? options.taxon.common_name.name : options.taxon.to_styled_s) || (primaryName = options.taxon.preferred_common_name), primaryName || (primaryName = options.taxon.name), taxonLabel = $("<label/>").attr("for", taxon_id).html(primaryName));
                    var legendLeft = $("<div class='legend-left' />");
                    legendLeft.append(taxonCheckbox);
                    var legendRight = $("<div class='legend-right' />");
                    legendRight.append(taxonLabel);
                    var taxonLi = $("<li/>").attr("class", "taxon").attr("data-taxon-id", taxon_id).append(legendLeft, legendRight);
                    options.taxon.url && legendRight.append(" <a href='" + options.taxon.url + "'><i class='icon-link' /></a>"), primaryName !== options.taxon.to_styled_s && legendRight.append($("<div/>").addClass("small meta").html(options.taxon.to_styled_s)), ul.append(taxonLi)
                }
            };
        iNaturalist.OverlayControl.prototype.addOverlay = function(lyr) {
            var map = this.map,
                ul = $("ul", this.div);
            name = lyr.name, id = lyr.id || name, overlay = lyr.overlay, checkbox = $('<input type="checkbox"></input>'), label = $("<label></label>").attr("for", id).html(name), li = $("<li></li>"), checkbox.attr("id", id).attr("name", name).prop("checked", overlay.getMap()), checkbox.click((function() {
                var name = $(this).attr("name"),
                    overlay = map.getOverlay(name).overlay;
                overlay.setMap(overlay.getMap() ? null : map)
            })), li.append(checkbox, label), lyr.description && li.append($("<div></div>").addClass("small meta").html(lyr.description)), ul.append(li)
        }, google.maps.Map.prototype.addOverlay = function(name, overlay, options) {
            options = options || {}, this.overlays = this.overlays || [];
            var overlayOpts = {
                name: name,
                overlay: overlay,
                id: options.id,
                description: options.description
            };
            this.overlays.push(overlayOpts), overlay.setMap && !options.hidden && overlay.setMap(this), this._overlayControl && this._overlayControl.addOverlay(overlayOpts)
        }, google.maps.Map.prototype.removeOverlay = function(name) {
            if (this.overlays)
                for (var i = 0; i < this.overlays.length; i++) this.overlays[i].name == name && (this.overlays[i].overlay.setMap(null), this.overlays.splice(i))
        }, google.maps.Map.prototype.getOverlay = function(name) {
            if (this.overlays)
                for (var i = 0; i < this.overlays.length; i++)
                    if (this.overlays[i].name == name) return this.overlays[i]
        };
        var cachedGBIFColors, appendValidParamsToURL = function(url, options) {
            var params = {};
            return options.validParams = options.validParams || {}, _.each(options, (function(value, key) {
                "grid" === options.endpoint && (key = key.replace("grid_", "")), "points" === options.endpoint && (key = key.replace("point_", "")), _.includes(options.validParams, key) && (params[key] = value), key.match(/field[:%]\w+/) && (params[key] = value)
            })), params ? url + "?" + $.param(params) : url
        };
        google.maps.Map.prototype.addPlaceLayer = function(options) {
            return _.defaults(options, {
                validParams: ["color", "tile_size"]
            }), this.addPostgisLayerByEndpoint("places", options.place.id, options)
        }, google.maps.Map.prototype.addTaxonRangeLayer = function(options) {
            return _.defaults(options, {
                validParams: ["color", "tile_size"]
            }), this.addPostgisLayerByEndpoint("taxon_ranges", options.taxon.id, options)
        }, google.maps.Map.prototype.addTaxonPlacesLayer = function(options) {
            return _.defaults(options, {
                validParams: ["confirmed_color", "unconfirmed_color", "tile_size"]
            }), this.addPostgisLayerByEndpoint("taxon_places", options.taxon.id, options)
        }, google.maps.Map.prototype.addTaxonGeomodelLayer = function(options) {
            return _.defaults(options, {
                validParams: ["thresholded", "tile_size"]
            }), this.addPostgisLayerByEndpoint("geomodel", options.taxon.id, options)
        }, google.maps.Map.prototype.addTaxonGeomodelComparisonLayer = function(options) {
            return _.defaults(options, {
                validParams: ["tile_size"]
            }), this.addPostgisLayerByEndpoint("geomodel_comparison", options.taxon.id, options)
        };
        var GBIFMapColors = function() {
            if (cachedGBIFColors) return cachedGBIFColors;
            var colors = [{
                    range: ",10",
                    color: "#F7005A"
                }, {
                    range: "10,100",
                    color: "#D50067"
                }, {
                    range: "100,1000",
                    color: "#B5006C"
                }, {
                    range: "1000,10000",
                    color: "#94006A"
                }, {
                    range: "10000,100000",
                    color: "#72005F"
                }, {
                    range: "100000,",
                    color: "#52034E"
                }],
                opacity = .9,
                alphaOpacity = parseFloat(Math.ceil(255 * opacity)).toString(16);
            return cachedGBIFColors = _.map(colors, (function(c) {
                return encodeURIComponent(c.range + "," + c.color + alphaOpacity)
            })).join("%7C")
        };
        google.maps.Map.prototype.addGBIFLayer = function(options) {
            var layerTileURL = "https://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}&type=TAXON&key=" + options.gbif_id + "&resolution=4&colors=" + GBIFMapColors();
            return this.addLayerAndControl({
                tiles: [layerTileURL]
            }, _.extend(options, {
                endpoint: "gbif"
            }))
        }, google.maps.Map.prototype.addPostgisLayerByEndpoint = function(endpoint, endpointID, options) {
            this.setTilt(0);
            var tileservers = postgisTileservers();
            (options = options || {}).tile_size = 512;
            var tileURLs = _.map(tileservers, (function(base) {
                return appendValidParamsToURL(base + "/" + endpoint + "/" + endpointID + "/{z}/{x}/{y}.png", options)
            }));
            return this.addLayerAndControl({
                tiles: tileURLs,
                tileSize: 512
            }, options)
        }, google.maps.Map.prototype.addLayerAndControl = function(tilejson, options) {
            options = options || {}, tilejson.interactive = !1;
            var layerID, layer = new wax.g.connector(tilejson);
            return layer.title = options.title, options.layerID ? (layerID = options.layerID, this.overlayMapTypes.setAt(layerID - 1, layer)) : layerID = this.overlayMapTypes.push(layer), options.disabled && this.overlayMapTypes.setAt(layerID - 1, emptyLayer), this._overlayControl && !options.noOverlayControl && this._overlayControl.addWindshaftOverlayControl([{
                layer: layer,
                layerID: layerID
            }], options), layerID
        }, google.maps.Map.prototype.removeAllLayers = function() {
            for (var i = this.overlayMapTypes.length - 1; i >= 0; i--) {
                var mapType = this.overlayMapTypes.getAt(i),
                    title = mapType.title;
                mapType.interactivity && mapType.interactivity.remove(), this.overlayMapTypes.removeAt(i), this._overlayControl && this._overlayControl.removeOverlayControl(title)
            }
            this._overlayControl && this._overlayControl.removeAll()
        }, google.maps.Map.prototype.removeObservationsLayer = function(title) {
            for (var i = this.overlayMapTypes.length - 1; i >= 0; i--) this.overlayMapTypes.getAt(i).title == title && (this.overlayMapTypes.getAt(i).interactivity.remove(), this.overlayMapTypes.removeAt(i), this._overlayControl && this._overlayControl.removeOverlayControl(title))
        }, google.maps.Map.prototype.addObservationsLayer = function(title, options) {
            this.setTilt(0);
            var tileservers = elasticsearchTileservers();
            options.style = "geotilegrid";
            var gridTileSuffix = "/" + ((options = options || {}).mapStyle || "grid") + "/{z}/{x}/{y}.png",
                pointTileSuffix = "/points/{z}/{x}/{y}.png",
                gridmaxzoom = options.gridmaxzoom || 9;
            options.title = title, options.tile_size = 512, "iconic" === options.color ? delete options.color : "heatmap" !== options.mapStyle && (options.color = options.color || "#FF4500"), options.taxon && (options.taxon_id = options.taxon.id), options.observation_id && "number" == typeof options.observation_id && (options.featured_observation_id = options.observation_id), gridTileSuffix = appendValidParamsToURL(gridTileSuffix, _.extend(options, {
                validParams: iNaturalist.Map.API_PARAMS(),
                endpoint: "grid"
            })), pointTileSuffix = appendValidParamsToURL(pointTileSuffix, _.extend(options, {
                validParams: iNaturalist.Map.API_PARAMS(),
                endpoint: "points"
            })), gridLayer = this.addTileLayer(_.map(tileservers, (function(base) {
                return base + gridTileSuffix
            })), {
                maxzoom: gridmaxzoom,
                gridmaxzoom: gridmaxzoom,
                interactivity: !1 !== options.interactivity && "id",
                interactionsURL: intereactionsServer() + gridTileSuffix,
                disabled: options.disabled,
                infoWindowCallback: options.infoWindowCallback,
                tileSize: 512 === Number(options.tile_size) ? 512 : 256,
                layerID: options.layerID
            }), pointLayer = this.addTileLayer(_.map(tileservers, (function(base) {
                return base + pointTileSuffix
            })), {
                interactivity: !1 !== options.interactivity && "id",
                minzoom: gridmaxzoom + 1,
                gridminzoom: gridmaxzoom + 1,
                interactionsURL: intereactionsServer() + pointTileSuffix,
                disabled: options.disabled,
                infoWindowCallback: options.infoWindowCallback,
                tileSize: 512 === Number(options.tile_size) ? 512 : 256,
                layerID: options.layerID + 1
            }), gridLayer.layer.title = title, pointLayer.layer.title = title, this._overlayControl && this._overlayControl.addWindshaftOverlayControl([gridLayer, pointLayer], options)
        }, google.maps.Map.prototype.getInfoWindow = function(options) {
            return iw = new google.maps.InfoWindow(_.extend({}, options, {
                position: new google.maps.LatLng(0, 0)
            })), iw
        }, google.maps.Map.prototype.createInfoWindow = function(options) {
            return this.infoWindow || (this.infoWindow = this.getInfoWindow(options)), this.infoWindow
        }, google.maps.Map.prototype.addTileLayer = function(tileURLs, options) {
            (options = options || {}).interactivity;
            if (options.interactivity) {
                var interactionsURLs = options.interactionsURL ? [options.interactionsURL] : tileURLs;
                options.grids = _.map(interactionsURLs, (function(l) {
                    return google.maps.Map.prototype.utfgridURL(l)
                }))
            }
            var layerID, waxOptions = $.extend(!0, {}, {
                    tiles: tileURLs,
                    template: "{{species_guess}}"
                }, options),
                layer = new wax.g.connector(waxOptions);
            return options.layerID ? (layerID = options.layerID, this.overlayMapTypes.setAt(layerID - 1, layer)) : layerID = this.overlayMapTypes.push(layer), options.disabled && this.overlayMapTypes.setAt(layerID - 1, emptyLayer), options.interactivity && (layer.interactivity = this.addTileInteractivity(waxOptions, layerID, options)), {
                layer: layer,
                layerID: layerID
            }
        }, google.maps.Map.prototype.utfgridURL = function(tileURL) {
            return url = tileURL.replace(/\.png/, ".grid.json"), url += url.indexOf("?") < 0 ? "?" : "&", url
        }, google.maps.Map.prototype.addTileInteractivity = function(tilejson, layerID, options) {
            var map = this,
                interactionOn = !1,
                waxInteraction = wax.g.interaction({
                    tileSize: tilejson.tileSize || 256
                }),
                oldFeature = waxInteraction.screen_feature;
            return map.createInfoWindow(), waxInteraction.screen_feature = function(pos, callback) {
                if (options.maxzoom && map.getZoom() <= options.maxzoom) return oldFeature(pos, callback);
                oldFeature({
                    x: pos.x,
                    y: pos.y + 13
                }, (function(f) {
                    if (f && "obscured" != f.geoprivacy && !f.private_location) return callback(f);
                    oldFeature(pos, (function(f) {
                        if (f && "obscured" != f.geoprivacy && !f.private_location) return callback();
                        callback(f)
                    }))
                }))
            }, waxInteraction.is_disabled = function() {
                return map.overlayMapTypes.getAt(layerID - 1) === emptyLayer
            }, waxInteraction.map(map).tilejson(tilejson).on({
                on: function(o) {
                    if (waxInteraction.is_disabled()) return null;
                    if (interactionOn = !0, map.setOptions({
                            draggableCursor: "pointer"
                        }), "click" == o.e.type) {
                        if (infoWindowOpenTime && new Date - infoWindowOpenTime < 500) return !1;
                        var googleMainMapDiv = $(map.div).find("div[style*='cursor'][style*='z-index: 0']"),
                            googleMapInteractionsDiv = $(googleMainMapDiv).find("div[style*='z-index: 3']");
                        if (!$.contains(googleMapInteractionsDiv, o.e.target) && !$(googleMapInteractionsDiv).is(o.e.target)) return !1;
                        if (iNaturalist.Map.infoWindow && iNaturalist.Map.infoWindow.close(), $("#map-legend").hide(), o.data.latitude) {
                            var latLng = new google.maps.LatLng(o.data.latitude, o.data.longitude),
                                iw = map.createInfoWindow(),
                                iwOpts = {};
                            if (options.minzoom && "obscured" != o.data.geoprivacy && !o.data.private_location ? iwOpts.pixelOffset = new google.maps.Size(0, -11) : iwOpts.pixelOffset = new google.maps.Size(0, 0), options.infoWindowCallback) return options.infoWindowCallback(map, iw, latLng, o.data, iwOpts);
                            $.ajax({
                                url: "/observations/" + o.data.id + ".html?partial=cached_component",
                                type: "GET",
                                dataType: "html",
                                beforeSend: function() {
                                    var content = $('<div class="loading status">' + I18n.t("loading") + "</div>").get(0);
                                    map.infoWindowSetContent(iw, latLng, content, iwOpts)
                                },
                                success: function(data) {
                                    var content = $('<div class="compact mini infowindow observations"></div>').append(data).get(0);
                                    map.infoWindowSetContent(iw, latLng, content, iwOpts)
                                },
                                error: function(jqXHR, textStatus) {
                                    console.log(textStatus)
                                }
                            })
                        }
                    }
                },
                off: function() {
                    if (map.overlayMapTypes.getAt(layerID - 1) === emptyLayer) return null;
                    interactionOn && map.setOptions({
                        draggableCursor: "url(https://maps.google.com/mapfiles/openhand.cur), move"
                    }), interactionOn = !1
                }
            }), waxInteraction
        }, google.maps.Map.prototype.infoWindowSetContent = function(iw, latLng, content, options) {
            options = options || {}, iw.close(), options.pixelOffset && iw.setOptions({
                pixelOffset: options.pixelOffset
            }), iw.position = latLng, iw.setContent(content), iw.open(this), deselectText(), infoWindowOpenTime = new Date
        }, iNaturalist.Map.createOsmMapTypeForMap = function(map) {
            var name = map.getDiv().offsetWidth > 300 ? "OpenStreetMap" : "OSM";
            return new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    var tilesPerGlobe = 1 << zoom,
                        x = coord.x % tilesPerGlobe;
                    return x < 0 && (x = tilesPerGlobe + x), iNaturalist.log({
                        "map-tile": "osm"
                    }), "https://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png"
                },
                tileSize: new google.maps.Size(256, 256),
                name: name,
                alt: I18n.t("show_openstreetmap"),
                maxZoom: 19
            })
        }, iNaturalist.Map.createOsmAttributionControl = function(position) {
            var div = document.createElement("div");
            div.setAttribute("id", "OsmAttributionControl"), div.style.padding = "0 6px", div.style.fontSize = "10px", div.style.height = "14px", div.style.lineHeight = "14px", div.style.marginBottom = "1px", position === google.maps.ControlPosition.BOTTOM_RIGHT && (div.style.marginBottom = "0px", div.style.marginRight = "0.1px"), div.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            var content = jQuery.parseHTML(I18n.t("base_map_copyright_openstreetmap_html", {
                startTag: "<a href='https://www.openstreetmap.org/copyright' target='_blank' rel='nofollow noopener'>",
                endTag: "</a>"
            }));
            return $(div).append(content), div
        }, iNaturalist.Map.toggleOsmAttributionForMap = function(map) {
            var mapTypeId = map.getMapTypeId(),
                position = google.maps.ControlPosition.RIGHT_BOTTOM;
            if (map.getDiv().offsetWidth > 500 && (position = google.maps.ControlPosition.BOTTOM_RIGHT), mapTypeId === iNaturalist.Map.MapTypeId.OSM) map.controls[position].insertAt(0, iNaturalist.Map.createOsmAttributionControl(position));
            else {
                var targetIdx = -1;
                map.controls[position].forEach((function(ctrl, idx) {
                    "OsmAttributionControl" === ctrl.getAttribute("id") && (targetIdx = idx)
                })), targetIdx >= 0 && map.controls[position].removeAt(targetIdx)
            }
        }, iNaturalist.Map.ICONS = {
            DodgerBlue34: new google.maps.MarkerImage("/mapMarkers/mm_34_DodgerBlue.png"),
            DeepPink34: new google.maps.MarkerImage("/mapMarkers/mm_34_DeepPink.png"),
            iNatGreen34: new google.maps.MarkerImage("/mapMarkers/mm_34_iNatGreen.png"),
            OrangeRed34: new google.maps.MarkerImage("/mapMarkers/mm_34_OrangeRed.png"),
            DarkMagenta34: new google.maps.MarkerImage("/mapMarkers/mm_34_DarkMagenta.png"),
            unknown34: new google.maps.MarkerImage("/mapMarkers/mm_34_unknown.png"),
            ChromistaBrown34: new google.maps.MarkerImage("/mapMarkers/mm_34_ChromistaBrown.png")
        }, iNaturalist.Map.STEMLESS_ICONS = {
            DodgerBlue34: new google.maps.MarkerImage("/mapMarkers/mm_34_stemless_DodgerBlue.png"),
            DeepPink34: new google.maps.MarkerImage("/mapMarkers/mm_34_stemless_DeepPink.png"),
            iNatGreen34: new google.maps.MarkerImage("/mapMarkers/mm_34_stemless_iNatGreen.png"),
            OrangeRed34: new google.maps.MarkerImage("/mapMarkers/mm_34_stemless_OrangeRed.png"),
            DarkMagenta34: new google.maps.MarkerImage("/mapMarkers/mm_34_stemless_DarkMagenta.png"),
            unknown34: new google.maps.MarkerImage("/mapMarkers/mm_34_stemless_unknown.png"),
            ChromistaBrown34: new google.maps.MarkerImage("/mapMarkers/mm_34_stemless_ChromistaBrown.png")
        }, iNaturalist.Map.ICONIC_TAXON_ICONS = {
            Protozoa: iNaturalist.Map.ICONS.DarkMagenta34,
            Animalia: iNaturalist.Map.ICONS.DodgerBlue34,
            Plantae: iNaturalist.Map.ICONS.iNatGreen34,
            Fungi: iNaturalist.Map.ICONS.DeepPink34,
            Amphibia: iNaturalist.Map.ICONS.DodgerBlue34,
            Reptilia: iNaturalist.Map.ICONS.DodgerBlue34,
            Aves: iNaturalist.Map.ICONS.DodgerBlue34,
            Mammalia: iNaturalist.Map.ICONS.DodgerBlue34,
            Actinopterygii: iNaturalist.Map.ICONS.DodgerBlue34,
            Mollusca: iNaturalist.Map.ICONS.OrangeRed34,
            Insecta: iNaturalist.Map.ICONS.OrangeRed34,
            Arachnida: iNaturalist.Map.ICONS.OrangeRed34,
            Chromista: iNaturalist.Map.ICONS.ChromistaBrown34
        }, iNaturalist.Map.STEMLESS_ICONIC_TAXON_ICONS = {
            Protozoa: iNaturalist.Map.STEMLESS_ICONS.DarkMagenta34,
            Animalia: iNaturalist.Map.STEMLESS_ICONS.DodgerBlue34,
            Plantae: iNaturalist.Map.STEMLESS_ICONS.iNatGreen34,
            Fungi: iNaturalist.Map.STEMLESS_ICONS.DeepPink34,
            Amphibia: iNaturalist.Map.STEMLESS_ICONS.DodgerBlue34,
            Reptilia: iNaturalist.Map.STEMLESS_ICONS.DodgerBlue34,
            Aves: iNaturalist.Map.STEMLESS_ICONS.DodgerBlue34,
            Mammalia: iNaturalist.Map.STEMLESS_ICONS.DodgerBlue34,
            Actinopterygii: iNaturalist.Map.STEMLESS_ICONS.DodgerBlue34,
            Mollusca: iNaturalist.Map.STEMLESS_ICONS.OrangeRed34,
            Insecta: iNaturalist.Map.STEMLESS_ICONS.OrangeRed34,
            Arachnida: iNaturalist.Map.STEMLESS_ICONS.OrangeRed34,
            Chromista: iNaturalist.Map.STEMLESS_ICONS.ChromistaBrown34
        }, iNaturalist.Map.ICONIC_TAXON_COLORS = {
            Protozoa: "#8B008B",
            Animalia: "#1E90FF",
            Plantae: "#73AC13",
            Fungi: "#FF1493",
            Amphibia: "#1E90FF",
            Reptilia: "#1E90FF",
            Aves: "#1E90FF",
            Mammalia: "#1E90FF",
            Actinopterygii: "#1E90FF",
            Mollusca: "#FF4500",
            Insecta: "#FF4500",
            Arachnida: "#FF4500",
            Chromista: "#993300"
        }
    }
};
loadMap3(), jQuery.url = function() {
        var segments = {},
            parsed = {},
            options = {
                url: window.location,
                strictMode: !1,
                key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                q: {
                    name: "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            },
            parseUri = function() {
                str = decodeURI(options.url);
                for (var m = options.parser[options.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14; i--;) uri[options.key[i]] = m[i] || "";
                return uri[options.q.name] = {}, uri[options.key[12]].replace(options.q.parser, (function($0, $1, $2) {
                    $1 && (uri[options.q.name][$1] = $2)
                })), uri
            },
            key = function(key) {
                return parsed.length || setUp(), "base" == key ? null !== parsed.port && "" !== parsed.port ? parsed.protocol + "://" + parsed.host + ":" + parsed.port + "/" : parsed.protocol + "://" + parsed.host + "/" : "" === parsed[key] ? null : parsed[key]
            },
            param = function(item) {
                return parsed.length || setUp(), null === parsed.queryKey[item] ? null : parsed.queryKey[item]
            },
            setUp = function() {
                parsed = parseUri(), getSegments()
            },
            getSegments = function() {
                var p = parsed.path;
                segments = [], segments = 1 == parsed.path.length ? {} : ("/" == p.charAt(p.length - 1) ? p.substring(1, p.length - 1) : path = p.substring(1)).split("/")
            };
        return {
            setMode: function(mode) {
                return strictMode = "strict" == mode, this
            },
            setUrl: function(newUri) {
                return options.url = void 0 === newUri ? window.location : newUri, setUp(), this
            },
            segment: function(pos) {
                return parsed.length || setUp(), void 0 === pos ? segments.length : "" === segments[pos] || void 0 === segments[pos] ? null : segments[pos]
            },
            attr: key,
            param: param
        }
    }(),
    function(n) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = n(require("jquery")) : n(jQuery)
    }((function(n) {
        n.fn.jqm = function(o) {
            return this.each((function() {
                var t = n(this).data("jqm") || n.extend({
                        ID: m++
                    }, n.jqm.params),
                    e = n.extend(t, o);
                n(this).data("jqm", e).addClass("jqm-init")[0]._jqmID = e.ID, n(this).jqmAddTrigger(e.trigger)
            }))
        }, n.fn.jqmAddTrigger = function(t) {
            return t ? this.each((function() {
                a(n(this), "jqmShow", t) || o("jqmAddTrigger must be called on initialized modals")
            })) : void 0
        }, n.fn.jqmAddClose = function(t) {
            return t ? this.each((function() {
                a(n(this), "jqmHide", t) || o("jqmAddClose must be called on initialized modals")
            })) : void 0
        }, n.fn.jqmShow = function(o) {
            return this.each((function() {
                this._jqmShown || t(n(this), o)
            }))
        }, n.fn.jqmHide = function(o) {
            return this.each((function() {
                this._jqmShown && e(n(this), o)
            }))
        };
        var o = function(n) {
                window.console && window.console.error && window.console.error(n)
            },
            t = function(o, t) {
                t = t || window.event;
                var e = o.data("jqm"),
                    i = parseInt(o.css("z-index"), 10) || 3e3,
                    s = n("<div></div>").addClass(e.overlayClass).css({
                        height: "100%",
                        width: "100%",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        "z-index": i - 1,
                        opacity: e.overlay / 100
                    }),
                    a = {
                        w: o,
                        c: e,
                        o: s,
                        t: t
                    };
                if (o.css("z-index", i), e.ajax) {
                    var d = e.target || o,
                        c = e.ajax;
                    d = "string" == typeof d ? n(d, o) : n(d), "@" === c.substr(0, 1) && (c = n(t).attr(c.substring(1))), d.load(c, (function() {
                        e.onLoad && e.onLoad.call(this, a), l.call(o, e, d)
                    })), e.ajaxText && d.html(e.ajaxText), r(a)
                } else r(a)
            },
            e = function(n, o) {
                o = o || window.event;
                var t = n.data("jqm"),
                    e = {
                        w: n,
                        c: t,
                        o: n.data("jqmv"),
                        t: o
                    };
                d(e)
            },
            i = function(o) {
                return o.c.overlay > 0 && o.o.prependTo("body"), o.w.show(), n.jqm.focusFunc(o.w, !0), !0
            },
            s = function(n) {
                return n.w.hide() && n.o && n.o.remove(), !0
            },
            a = function(o, t, e) {
                var i = o.data("jqm");
                return i ? n(e).each((function() {
                    this[t] = this[t] || [], n.inArray(i.ID, this[t]) < 0 && (this[t].push(i.ID), n(this).click((function(n) {
                        return n.isDefaultPrevented() || o[t](this), !1
                    })))
                })) : void 0
            },
            r = function(o) {
                var t = o.w,
                    e = o.o,
                    i = o.c;
                !1 !== i.onShow(o) && (t[0]._jqmShown = !0, i.modal ? (j[0] || c("bind"), j.push(t[0])) : t.jqmAddClose(e), l.call(t, i), i.toTop && e && t.before('<span id="jqmP' + i.ID + '"></span>').insertAfter(e), t.data("jqmv", e), t.unbind("keydown", n.jqm.closeOnEscFunc), i.closeOnEsc && t.attr("tabindex", 0).bind("keydown", n.jqm.closeOnEscFunc).focus())
            },
            d = function(o) {
                var t = o.w,
                    e = o.o,
                    i = o.c;
                !1 !== i.onHide(o) && (t[0]._jqmShown = !1, i.modal && (j.pop(), j[0] || c("unbind")), i.toTop && e && n("#jqmP" + i.ID).after(t).remove())
            },
            c = function(o) {
                n(document)[o]("keypress keydown mousedown", u)
            },
            u = function(o) {
                var t = n(o.target).data("jqm") || n(o.target).parents(".jqm-init:first").data("jqm"),
                    e = j[j.length - 1];
                return !(!t || t.ID !== e._jqmID) || n.jqm.focusFunc(e, o)
            },
            l = function(o, t) {
                t = t || this, o.closeClass && this.jqmAddClose(n("." + o.closeClass, t))
            },
            m = 0,
            j = [];
        return n.jqm = {
            params: {
                overlay: 50,
                overlayClass: "jqmOverlay",
                closeClass: "jqmClose",
                closeOnEsc: !1,
                trigger: ".jqModal",
                ajax: !1,
                target: !1,
                ajaxText: "",
                modal: !1,
                toTop: !1,
                onShow: i,
                onHide: s,
                onLoad: !1
            },
            focusFunc: function(o, t) {
                return t && n(":input:visible:first", o).focus(), !1
            },
            closeOnEscFunc: function(o) {
                return 27 === o.keyCode ? (n(this).jqmHide(), !1) : void 0
            }
        }, n.jqm
    })), $(document).ready((function() {
        $("#modal_image_box").jqm({
            closeClass: "close",
            ajax: "@data-photo-path",
            trigger: "a.modal_image_link",
            onShow: function(h) {
                h.w.append($('<div class="loading status">Loading...</div>')), h.w.fadeIn(500), iNaturalist.modalCenter(h.w)
            },
            onLoad: function(h) {
                iNaturalist.modalCenter(h.w)
            },
            onHide: function(h) {
                h.w.fadeOut(500, (function() {
                    h.o.remove()
                }))
            }
        })
    }));
var inatTaxonMap = {};
! function($) {
    $.fn.taxonMap = function(options) {
        options = options || {}, $(this).each((function() {
            "fit" === options ? inatTaxonMap.fit(this) : inatTaxonMap.setup(this, options)
        }))
    }
}(jQuery);
var setMapTypeAndUpdateSession = function(options, mapTypeID) {
        options.updateCurrentUser ? options.updateCurrentUser({
            preferred_observations_search_map_type: mapTypeID
        }) : updateSession({
            preferred_observations_search_map_type: mapTypeID
        })
    },
    setUrlHashCoord = function() {
        var coords = window.map.getCenter(),
            x = preciseRound(coords.lng(), 3),
            y = preciseRound(coords.lat(), 3),
            z = window.map.getZoom(),
            baseUrl = window.location.href.split("#")[0];
        window.location.replace(baseUrl + "#" + [z, y, x].join("/"))
    },
    getUrlHashCoord = function() {
        var bits = window.location.hash.split("/").map((function(x) {
            return parseFloat(x.replace(/[^0-9\-.]/, ""))
        }));
        return {
            lat: bits[1],
            lng: bits[2],
            zoom: bits[0]
        }
    };
inatTaxonMap.setup = function(elt, opts) {
        var options = $.extend(!0, {}, opts);
        options.latitude = options.latitude || $(elt).data("latitude"), options.longitude = options.longitude || $(elt).data("longitude"), options.mapType = options.mapType || $(elt).data("map-type"), options.mapStyle = options.mapStyle || $(elt).data("map-style"), options.zoomLevel = options.zoomLevel || parseInt($(elt).data("zoom-level"), 10), options.minZoom = options.minZoom || parseInt($(elt).data("min-zoom"), 10), options.urlCoords = options.urlCoords || $(elt).data("url-coords"), options.disableFullscreen = !0 === (options.disableFullscreen || $(elt).data("disable-fullscreen")), options.showRange = options.showRange || $(elt).data("show-range"), options.minX = options.minX || $(elt).data("min-x"), options.minY = options.minY || $(elt).data("min-y"), options.maxX = options.maxX || $(elt).data("max-x"), options.maxY = options.maxY || $(elt).data("max-y"), options.flagLetters = $(elt).data("flag-letters"), options.observations = options.observations || $(elt).data("observations"), options.observationLayers = options.observationLayers || $(elt).data("observation-layers"), options.placeLayers = options.placeLayers || $(elt).data("place-layers"), options.taxonLayers = options.taxonLayers || $(elt).data("taxon-layers"), options.mapTypeControl = !1 !== options.mapTypeControl && !0 !== $(elt).data("map-type-control"), options.mapTypeControlOptions = options.mapTypeControlOptions || $(elt).data("map-type-control-options"), options.zoomControl = !1 !== options.zoomControl && !1 !== $(elt).data("zoom-control"), options.zoomControlOptions = options.zoomControlOptions || $(elt).data("zoom-control-options"), options.scrollwheel = !1 !== options.scrollwheel && !1 !== $(elt).data("scrollwheel"), options.overlayMenu = !1 !== options.overlayMenu && !1 !== $(elt).data("overlay-menu"), options.enableShowAllLayer = !1 !== options.enableShowAllLayer && !1 !== $(elt).data("enable-show-all-layer"), options.showAllLayer = null != options.showAllLayer ? options.showAllLayer : $(elt).data("show-all-layer"), options.featuredLayerLabel = options.featuredLayerLabel || $(elt).data("featured-layer-label") || I18n.t("maps.overlays.featured_observations"), options.featuredLayerDescription = options.featuredLayerDescription || $(elt).data("featured-layer-description"), options.placeLayerLabel = options.placeLayerLabel || $(elt).data("place-layer-label"), options.placeLayerDescription = options.placeLayerDescription || $(elt).data("place-layer-description"), options.placement = options.placement || $(elt).data("placement"), options.taxonRangeLayerLabel = options.taxonRangeLayerLabel || $(elt).data("taxon-range-layer-label") || I18n.t("maps.overlays.range"), options.taxonRangeLayerDescription = options.taxonRangeLayerDescription || $(elt).data("taxon-range-layer-description"), options.taxonPlacesLayerLabel = options.taxonPlacesLayerLabel || $(elt).data("taxon-places-layer-label") || I18n.t("maps.overlays.checklist_places"), options.taxonPlacesLayerDescription = options.taxonPlacesLayerDescription || $(elt).data("taxon-places-layer-description"), options.taxonPlacesLayerHover = options.taxonPlacesLayerHover || $(elt).data("taxon-places-layer-hover") || I18n.t("maps.overlays.checklist_places_description"), options.taxonObservationsLayerLabel = options.taxonObservationsLayerLabel || $(elt).data("taxon-observations-layer-label") || I18n.t("maps.overlays.observations"), options.taxonObservationsLayerDescription = options.taxonObservationsLayerDescription || $(elt).data("taxon-observations-layer-description"), options.allLayerLabel = options.allLayerLabel || $(elt).data("all-layer-label") || I18n.t("maps.overlays.all_observations"), options.allLayerDescription = options.allLayerDescription || $(elt).data("all-layer-description") || I18n.t("maps.overlays.every_publicly_visible_observation"), options.gbifLayerLabel = options.gbifLayerLabel || $(elt).data("gbif-layer-label") || I18n.t("gbif_occurrences"), options.gbifLayerDescription = options.gbifLayerDescription || $(elt).data("gbif-layer-description"), options.gbifLayerHover = options.gbifLayerHover || $(elt).data("gbif-layer-hover") || I18n.t("maps.overlays.gbif_network_description2"), options.controlPosition = options.controlPosition || $(elt).data("control-position"), options.elastic_params = options.elastic_params || $(elt).data("elastic-params"), options.gestureHandling = options.gestureHandling || $(elt).data("gesture-handling"), options.tilt = options.tilt || $(elt).data("tilt") || 0, options.currentUser = options.currentUser || $(elt).data("current-user"), options.taxonGeomodelLayerLabel = options.taxonGeomodelLayerLabel || $(elt).data("taxon-geomodel-layer-label") || I18n.t("views.geo_model.explain.unthresholded_map.unthresholded_map"), options.taxonGeomodelThresholdedLayerLabel = options.taxonGeomodelThresholdedLayerLabel || $(elt).data("taxon-geomodel-thresholded-layer-label") || I18n.t("views.geo_model.explain.nearby_map.expected_nearby_map"), options.taxonGeomodelComparisonLayerLabel = options.taxonGeomodelComparisonLayerLabel || $(elt).data("taxon-geomodel-comparison-layer-label") || I18n.t("views.geo_model.explain.range_comparison.expected_nearby_vs_taxon_range"), "object" == typeof CURRENT_USER && (options.currentUser = options.currentUser || CURRENT_USER), options.observations && (options.observations = _.map(options.observations, (function(observation) {
            return "string" == typeof observation ? jQuery.parseJSON(observation) : _.assignIn({}, observation)
        }))), 0 === options.zoomLevel && (options.zoomLevel = null), options.showAllLayer || !1 === options.showAllLayer || (options.showAllLayer = !0), $(elt).data("taxonMapOptions", $.extend(!0, {}, options)), inatTaxonMap.setupGoogleMap(elt)
    }, inatTaxonMap.fit = function(elt) {
        inatTaxonMap.fitGoogle(elt)
    }, inatTaxonMap.setupGoogleMap = function(elt) {
        var options = $(elt).data("taxonMapOptions");
        if ("undefined" != typeof google) {
            var map, mapTypeControlOptions = Object.assign(iNaturalist.Map.DEFAULT_GOOGLE_MAP_OPTIONS.mapTypeControlOptions, options.mapTypeControlOptions);
            $("html[dir='rtl']").length > 0 && (mapTypeControlOptions.position = mapTypeControlOptions.position || google.maps.ControlPosition.BLOCK_START_INLINE_END);
            var mapOptions = $.extend(!0, {}, {
                backgroundColor: "#E3EAF6",
                gestureHandling: options.gestureHandling,
                mapTypeControl: !1 !== options.mapTypeControl,
                mapTypeControlOptions: mapTypeControlOptions,
                minZoom: options.minZoom,
                placement: options.placement,
                scrollwheel: !1 !== options.scrollwheel,
                styles: [{
                    stylers: [{
                        lightness: 50
                    }, {
                        saturation: -50
                    }]
                }],
                tilt: options.tilt,
                zoomControl: !1 !== options.zoomControl,
                zoomControlOptions: options.zoomControlOptions
            });
            $(elt).data("taxonMap") ? (map = $(elt).data("taxonMap")).setOptions(mapOptions) : map = iNaturalist.Map.createMap($.extend(!0, {}, mapOptions, {
                div: elt,
                disableFullscreen: !0,
                fullscreenControl: !options.disableFullscreen,
                fullscreenControlOptions: !options.disableFullscreen && {
                    position: $("html[dir='rtl']").length > 0 ? google.maps.ControlPosition.LEFT_TOP : google.maps.ControlPosition.RIGHT_TOP
                }
            }));
            var coord, preserveViewport = options.preserveViewport;
            if (options.minX) {
                var minY = Math.max(options.minY || 0, -89),
                    maxY = Math.min(options.maxY || 0, 89);
                map.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(minY, options.minX || 0), new google.maps.LatLng(maxY, options.maxX || 0))), preserveViewport = !0
            } else(options.latitude || options.longitude) && (map.setCenter(new google.maps.LatLng(options.latitude || 0, options.longitude || 0)), preserveViewport = !0), options.zoomLevel && map.setZoom(options.zoomLevel);
            if (options.overlayMenu && !map._overlayControl && (map._overlayControl = new iNaturalist.OverlayControl(map)), options.mapType) map.setMapTypeId(options.mapType);
            else if (options.currentUser || "object" == typeof CURRENT_USER) {
                var preferredMapTypeId = iNaturalist.Map.preferredMapTypeId(options.currentUser || CURRENT_USER);
                map.getMapTypeId() !== preferredMapTypeId && map.setMapTypeId(preferredMapTypeId)
            }
            if (map.mapTypeListener || (map.mapTypeListener = google.maps.event.addListener(map, "maptypeid_changed", (function() {
                    var mapTypeId = this.getMapTypeId();
                    setMapTypeAndUpdateSession(options, mapTypeId)
                }))), options.showLegend && !map._legend) {
                var legendControlDiv = document.createElement("div");
                new iNaturalist.LegendControl(legendControlDiv, map);
                $('html[dir="rtl"]').length > 0 ? map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendControlDiv) : map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendControlDiv);
                var legendDiv = document.createElement("div");
                map._legend = new iNaturalist.Legend(legendDiv, map), $('html[dir="rtl"]').length > 0 ? map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendDiv) : map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv)
            }
            map.removeAllLayers(), map._overlayControl && map._overlayControl.removeAll(), map.removeObservations(), delete map.taxonLayerSignatures, options.showAllLayer && (_.isObject(options.showAllLayer) || (options.showAllLayer = {}), map.addObservationsLayer(options.allLayerLabel, _.defaults(options.showAllLayer, {
                description: options.allLayerDescription,
                disabled: !1 === options.enableShowAllLayer,
                controlPosition: options.controlPosition,
                mapStyle: options.mapStyle || "summary",
                ttl: 86400
            }))), inatTaxonMap.addTaxonLayers(map, options), inatTaxonMap.addPlaceLayers(map, options), inatTaxonMap.addObservationLayers(map, options), inatTaxonMap.addObservationsToMap(map, options, preserveViewport), options.urlCoords && !map.setUrlHashCoordDragendListener && (map.setUrlHashCoordDragendListener = google.maps.event.addListener(map, "dragend", setUrlHashCoord), map.setUrlHashCoordZoomChangedListener = google.maps.event.addListener(map, "zoom_changed", setUrlHashCoord), (coord = getUrlHashCoord()).lat && (setTimeout((function() {
                window.map.setCenter(new google.maps.LatLng(coord.lat, coord.lng)), window.map.setZoom(coord.zoom)
            }), 100), preserveViewport = !0)), options.onZoomChanged && (map.onZoomChagedListener = google.maps.event.addListener(map, "zoom_changed", (function(e) {
                options.onZoomChanged(e, map)
            }))), preserveViewport || inatTaxonMap.fit(elt), $(elt).data("taxonMap", map)
        } else $(elt).html("<div class='alert alert-warning alert-inside text-center'>" + I18n.t("google_maps_not_loaded_error") + "</div>")
    }, inatTaxonMap.addTaxonLayers = function(map, options) {
        options.taxonLayers && _.each(options.taxonLayers, (function(layer) {
            if (layer.taxon && layer.taxon.id) {
                map.taxonLayerSignatures = map.taxonLayerSignatures || {};
                var sig = JSON.stringify(layer);
                map.taxonLayerSignatures[sig] || $.getJSON("https://api.inaturalist.org/v1/taxa/" + layer.taxon.id + "/map_layers", (function(taxonData) {
                    inatTaxonMap.addTaxonLayer(map, layer, options, taxonData)
                }))
            }
        }))
    }, inatTaxonMap.addTaxonLayer = function(map, layer, options, taxonData) {
        map.taxonLayerSignatures = map.taxonLayerSignatures || {};
        var layerOptions, sig = JSON.stringify(layer);
        map.taxonLayerSignatures[sig] || (map.taxonLayerSignatures[sig] = !0, layer.places && layer.taxon && taxonData.listed_places && (layerOptions = _.isObject(layer.places) ? layer.places : {}, map.addTaxonPlacesLayer(_.defaults(layerOptions, {
            taxon: layer.taxon,
            title: options.taxonPlacesLayerLabel,
            description: options.taxonPlacesLayerDescription,
            hover: options.taxonPlacesLayerHover,
            controlPosition: options.controlPosition
        }))), layer.ranges && taxonData.ranges && (layerOptions = _.isObject(layer.ranges) ? layer.ranges : {}, map.addTaxonRangeLayer(_.defaults(layerOptions, {
            taxon: layer.taxon,
            title: options.taxonRangeLayerLabel,
            description: options.taxonRangeLayerDescription,
            hover: options.taxonRangeLayerHover,
            controlPosition: options.controlPosition,
            disabled: "disabled" === options.disabled,
            link: "/taxa/" + layer.taxon.id + "/range.html"
        }))), layer.geomodel_thresholded && taxonData.geomodel && (layerOptions = _.isObject(layer.geomodel_thresholded) ? layer.geomodel_thresholded : {}, map.addTaxonGeomodelLayer(_.defaults(layerOptions, {
            taxon: layer.taxon,
            title: options.taxonGeomodelThresholdedLayerLabel,
            controlPosition: options.controlPosition,
            disabled: !0,
            color: "rgba(0, 125, 255, 0.6)",
            thresholded: !0,
            link: "/geo_model/" + layer.taxon.id + "/explain"
        }))), layer.observations && (layerOptions = _.isObject(layer.observations) ? layer.observations : {}, map.addObservationsLayer(options.taxonObservationsLayerLabel, _.defaults(layerOptions, {
            taxon: layer.taxon,
            description: options.taxonObservationsLayerDescription,
            hover: options.taxonObservationsLayerHover,
            controlPosition: options.controlPosition,
            mapStyle: options.mapStyle,
            layerID: options.layerID
        }))), layer.observationLayers && _.forEach(layer.observationLayers, (function(lyr) {
            map.addObservationsLayer(lyr.label || options.taxonObservationsLayerLabel, _.defaults(lyr, {
                taxon: layer.taxon,
                description: options.taxonObservationsLayerDescription,
                hover: options.taxonObservationsLayerHover,
                controlPosition: options.controlPosition,
                mapStyle: options.mapStyle
            }))
        })), layer.gbif && taxonData.gbif_id && (layerOptions = _.isObject(layer.gbif) ? layer.gbif : {}, map.addGBIFLayer(_.defaults(layerOptions, {
            taxon: layer.taxon,
            gbif_id: taxonData.gbif_id,
            title: options.gbifLayerLabel,
            description: options.gbifLayerDescription,
            hover: options.gbifLayerHover,
            controlPosition: options.controlPosition,
            link: "http://www.gbif.org/species/" + taxonData.gbif_id
        }))))
    }, inatTaxonMap.addPlaceLayers = function(map, options) {
        options.placeLayers && _.each(options.placeLayers, (function(layer) {
            layer.place && map.addPlaceLayer(_.defaults(_.clone(layer), {
                title: layer.place.name,
                description: options.placeLayerLabel
            }))
        }))
    }, inatTaxonMap.addObservationLayers = function(map, options) {
        (options = options || {}).observationLayers && _.each(options.observationLayers, (function(layer) {
            var title = options.title || layer.title || options.featuredLayerLabel || "Observations";
            map.addObservationsLayer(title, _.defaults(_.clone(layer), {
                controlPosition: options.controlPosition,
                mapStyle: options.mapStyle,
                infoWindowCallback: options.infoWindowCallback
            }))
        }))
    }, inatTaxonMap.removeObservationLayers = function(map, options) {
        var title = (options = options || {}).title || options.featuredLayerLabel || "Observations";
        map.removeObservationsLayer(title)
    }, inatTaxonMap.addObservationsToMap = function(map, options, preserveViewport) {
        if (options.observations) {
            var iconImg, letterCounter = 0,
                letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            _.each(options.observations, (function(o) {
                if (o) {
                    var iconDiv = $("#observation-" + o.id + " .icon").get(0);
                    if (!(o.latitude && o.longitude || o.private_latitude && o.private_longitude) && options.appendMarkerToList) return iconImg = $('<img src="/mapMarkers/questionmarker.png"/>'), void $(iconDiv).text("").append(iconImg);
                    var observationOptions = {
                        clickable: options.clickable,
                        showAccuracy: options.showAccuracy
                    };
                    if (options.flagLetters && (observationOptions.icon = iNaturalist.Map.createObservationIcon({
                            color: "HotPink",
                            character: letters[letterCounter],
                            stemless: o.coordinates_obscured,
                            quality_grade: o.quality_grade
                        })), map.addObservation(o, observationOptions), options.appendMarkerToList && o.marker) {
                        var src = o.marker.getIcon();
                        src.url && (src = src.url), iconImg = $("<img/>").attr("src", src).addClass("marker"), $(iconDiv).text("").append(iconImg), $(iconImg).click((function() {
                            map.openInfoWindow.apply(o.marker)
                        }))
                    }
                    letterCounter += 1
                }
            })), preserveViewport || (1 === options.observations.length ? google.maps.event.addListenerOnce(map, "idle", (function() {
                var accuracyCircle, o = options.observations[0],
                    center = new google.maps.LatLng(o.private_latitude || o.latitude, o.private_longitude || o.longitude);
                if (map.setCenter(center), o.private_latitude && o.positional_accuracy ? accuracyCircle = new google.maps.Circle({
                        center: new google.maps.LatLng(o.private_latitude, o.private_longitude),
                        radius: o.positional_accuracy
                    }) : o.public_positional_accuracy && (accuracyCircle = new google.maps.Circle({
                        center: new google.maps.LatLng(o.latitude, o.longitude),
                        radius: o.public_positional_accuracy
                    })), o.map_scale ? map.setZoom(o.map_scale) : map.setZoom(8), accuracyCircle) {
                    var mapBounds = map.getBounds(),
                        circleBounds = accuracyCircle.getBounds();
                    circleBounds.contains(mapBounds.getNorthEast()) && circleBounds.contains(mapBounds.getSouthWest()) ? map.fitBounds(circleBounds) : o.map_scale || map.setZoom(10)
                }
            })) : map.zoomToObservations())
        }
    }, inatTaxonMap.fitGoogle = function(elt) {
        var options = $(elt).data("taxonMapOptions"),
            map = $(elt).data("taxonMap");
        map && (options.minX ? map.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(options.minY, options.minX), new google.maps.LatLng(options.maxY, options.maxX))) : (map.setCenter(new google.maps.LatLng(0, 0)), map.setZoom(1)))
    },
    function($, k, m, i) {
        var e = $(i),
            g = "waypoint.reached",
            b = function(o, n) {
                o.element.trigger(g, n), o.options.triggerOnce && o.element[k]("destroy")
            },
            h = function(p, o) {
                if (!o) return -1;
                for (var n = o.waypoints.length - 1; n >= 0 && o.waypoints[n].element[0] !== p[0];) n -= 1;
                return n
            },
            f = [],
            l = function(n) {
                $.extend(this, {
                    element: $(n),
                    oldScroll: 0,
                    waypoints: [],
                    didScroll: !1,
                    didResize: !1,
                    doScroll: $.proxy((function() {
                        var q = this.element.scrollTop(),
                            p = q > this.oldScroll,
                            s = this,
                            r = $.grep(this.waypoints, (function(u) {
                                return p ? u.offset > s.oldScroll && u.offset <= q : u.offset <= s.oldScroll && u.offset > q
                            })),
                            o = r.length;
                        this.oldScroll && q || $[m]("refresh"), this.oldScroll = q, o && (p || r.reverse(), $.each(r, (function(u, t) {
                            (t.options.continuous || u === o - 1) && b(t, [p ? "down" : "up"])
                        })))
                    }), this)
                }), $(n).bind("scroll.waypoints", $.proxy((function() {
                    this.didScroll || (this.didScroll = !0, i.setTimeout($.proxy((function() {
                        this.doScroll(), this.didScroll = !1
                    }), this), $[m].settings.scrollThrottle))
                }), this)).bind("resize.waypoints", $.proxy((function() {
                    this.didResize || (this.didResize = !0, i.setTimeout($.proxy((function() {
                        $[m]("refresh"), this.didResize = !1
                    }), this), $[m].settings.resizeThrottle))
                }), this)), e.load($.proxy((function() {
                    this.doScroll()
                }), this))
            },
            j = function(n) {
                var o = null;
                return $.each(f, (function(p, q) {
                    if (q.element[0] === n) return o = q, !1
                })), o
            },
            c = {
                init: function(o, n) {
                    return this.each((function() {
                        var q, u = $.fn[k].defaults.context,
                            t = $(this);
                        n && n.context && (u = n.context), $.isWindow(u) || (u = t.closest(u)[0]), (q = j(u)) || (q = new l(u), f.push(q));
                        var p = h(t, q),
                            s = p < 0 ? $.fn[k].defaults : q.waypoints[p].options,
                            r = $.extend({}, s, n);
                        r.offset = "bottom-in-view" === r.offset ? function() {
                            return ($.isWindow(u) ? $[m]("viewportHeight") : $(u).height()) - $(this).outerHeight()
                        } : r.offset, p < 0 ? q.waypoints.push({
                            element: t,
                            offset: null,
                            options: r
                        }) : q.waypoints[p].options = r, o && t.bind(g, o), n && n.handler && t.bind(g, n.handler)
                    })), $[m]("refresh"), this
                },
                remove: function() {
                    return this.each((function(o, p) {
                        var n = $(p);
                        $.each(f, (function(r, s) {
                            var q = h(n, s);
                            q >= 0 && (s.waypoints.splice(q, 1), s.waypoints.length || (s.element.unbind("scroll.waypoints resize.waypoints"), f.splice(r, 1)))
                        }))
                    }))
                },
                destroy: function() {
                    return this.unbind(g)[k]("remove")
                }
            },
            a = {
                refresh: function() {
                    $.each(f, (function(r, s) {
                        var q = $.isWindow(s.element[0]),
                            n = q ? 0 : s.element.offset().top,
                            p = q ? $[m]("viewportHeight") : s.element.height(),
                            o = q ? 0 : s.element.scrollTop();
                        $.each(s.waypoints, (function(u, x) {
                            if (x) {
                                var t = x.options.offset,
                                    w = x.offset;
                                if ("function" == typeof x.options.offset) t = x.options.offset.apply(x.element);
                                else if ("string" == typeof x.options.offset) {
                                    var v = parseFloat(x.options.offset);
                                    t = x.options.offset.indexOf("%") ? Math.ceil(p * (v / 100)) : v
                                }
                                x.offset = x.element.offset().top - n + o - t, x.options.onlyOnScroll || (null !== w && s.oldScroll > w && s.oldScroll <= x.offset ? b(x, ["up"]) : (null !== w && s.oldScroll < w && s.oldScroll >= x.offset || !w && s.element.scrollTop() > x.offset) && b(x, ["down"]))
                            }
                        })), s.waypoints.sort((function(u, t) {
                            return u.offset - t.offset
                        }))
                    }))
                },
                viewportHeight: function() {
                    return i.innerHeight ? i.innerHeight : e.height()
                },
                aggregate: function() {
                    var n = $();
                    return $.each(f, (function(o, p) {
                        $.each(p.waypoints, (function(q, r) {
                            n = n.add(r.element)
                        }))
                    })), n
                }
            };
        $.fn[k] = function(n) {
            return c[n] ? c[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof n && n ? "object" == typeof n ? c.init.apply(this, [null, n]) : void $.error("Method " + n + " does not exist on jQuery " + k) : c.init.apply(this, arguments)
        }, $.fn[k].defaults = {
            continuous: !0,
            offset: 0,
            triggerOnce: !1,
            context: i
        }, $[m] = function(n) {
            return a[n] ? a[n].apply(this) : a.aggregate()
        }, $[m].settings = {
            resizeThrottle: 200,
            scrollThrottle: 100
        }, e.load((function() {
            $[m]("refresh")
        }))
    }(jQuery, "waypoint", "waypoints", window),
    function($) {
        function G(I) {
            return "string" == typeof I
        }

        function D(J) {
            var I = n.call(arguments, 1);
            return function() {
                return J.apply(this, I.concat(n.call(arguments)))
            }
        }

        function o(I) {
            return I.replace(H, "$2")
        }

        function q(I) {
            return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
        }

        function f(K, P, I, L, J) {
            var R, O, N, Q, M;
            return L !== h ? (M = (N = I.match(K ? H : /^([^#?]*)\??([^#]*)(#?.*)/))[3] || "", 2 === J && G(L) ? O = L.replace(K ? u : p, "") : (Q = m(N[2]), L = G(L) ? m[K ? F : B](L) : L, O = 2 === J ? L : 1 === J ? $.extend({}, L, Q) : $.extend({}, Q, L), O = j(O), K && (O = O.replace(g, t))), R = N[1] + (K ? C : O || !N[1] ? "?" : "") + O + M) : R = P(I !== h ? I : location.href), R
        }

        function A(K, I, J) {
            return I === h || "boolean" == typeof I ? (J = I, I = a[K ? F : B]()) : I = G(I) ? I.replace(K ? u : p, "") : I, m(I, J)
        }

        function v(L, J, K, I) {
            return G(K) || "object" == typeof K || (I = K, K = J, J = h), this.each((function() {
                var O = $(this),
                    M = J || k()[(this.nodeName || "").toLowerCase()] || "",
                    N = M && O.attr(M) || "";
                O.attr(M, a[L](N, K, I))
            }))
        }
        var h, j, c, m, y, s, x, k, u, H, g, i, C, n = Array.prototype.slice,
            t = decodeURIComponent,
            a = $.param,
            b = $.bbq = $.bbq || {},
            e = $.event.special,
            d = "hashchange",
            B = "querystring",
            F = "fragment",
            z = "elemUrlAttr",
            l = "href",
            w = "src",
            p = /^.*\?|#.*$/g,
            E = {};
        a[B] = D(f, 0, q), a[F] = c = D(f, 1, o), a.sorted = j = function(J, K) {
            var I = [],
                L = {};
            return $.each(a(J, K).split("&"), (function(P, M) {
                var O = M.replace(/(?:%5B|=).*$/, ""),
                    N = L[O];
                N || (N = L[O] = [], I.push(O)), N.push(M)
            })), $.map(I.sort(), (function(M) {
                return L[M]
            })).join("&")
        }, c.noEscape = function(J) {
            J = J || "";
            var I = $.map(J.split(""), encodeURIComponent);
            g = new RegExp(I.join("|"), "g")
        }, c.noEscape(",/"), c.ajaxCrawlable = function(I) {
            return I !== h && (I ? (u = /^.*(?:#!|#)/, H = /^([^#]*)(?:#!|#)?(.*)$/, C = "#!") : (u = /^.*#/, H = /^([^#]*)#?(.*)$/, C = "#"), i = !!I), i
        }, c.ajaxCrawlable(0), $.deparam = m = function(L, I) {
            var K = {},
                J = {
                    true: !0,
                    false: !1,
                    null: null
                };
            return $.each(L.replace(/\+/g, " ").split("&"), (function(O, T) {
                var M, N = T.split("="),
                    S = t(N[0]),
                    R = K,
                    P = 0,
                    U = S.split("]["),
                    Q = U.length - 1;
                if (/\[/.test(U[0]) && /\]$/.test(U[Q]) ? (U[Q] = U[Q].replace(/\]$/, ""), Q = (U = U.shift().split("[").concat(U)).length - 1) : Q = 0, 2 === N.length)
                    if (M = t(N[1]), I && (M = M && !isNaN(M) ? +M : "undefined" === M ? h : J[M] !== h ? J[M] : M), Q)
                        for (; P <= Q; P++) R = R[S = "" === U[P] ? R.length : U[P]] = P < Q ? R[S] || (U[P + 1] && isNaN(U[P + 1]) ? {} : []) : M;
                    else $.isArray(K[S]) ? K[S].push(M) : K[S] !== h ? K[S] = [K[S], M] : K[S] = M;
                else S && (K[S] = I ? h : "")
            })), K
        }, m[B] = D(A, 0), m[F] = y = D(A, 1), $[z] || ($[z] = function(I) {
            return $.extend(E, I)
        })({
            a: l,
            base: l,
            iframe: w,
            img: w,
            input: w,
            form: "action",
            link: l,
            script: w
        }), k = $[z], $.fn[B] = D(v, B), $.fn[F] = D(v, F), b.pushState = s = function(L, I) {
            G(L) && /^#/.test(L) && I === h && (I = 2);
            var K = L !== h,
                J = c(location.href, K ? L : {}, K ? I : 2);
            location.href = J
        }, b.getState = x = function(I, J) {
            return I === h || "boolean" == typeof I ? y(I) : y(J)[I]
        }, b.removeState = function(I) {
            var J = {};
            I !== h && (J = x(), $.each($.isArray(I) ? I : arguments, (function(L, K) {
                delete J[K]
            }))), s(J, 2)
        }, e[d] = $.extend(e[d], {
            add: function(I) {
                function J(M) {
                    var L = M[F] = c();
                    M.getState = function(N, O) {
                        return N === h || "boolean" == typeof N ? m(L, N) : m(L, O)[N]
                    }, K.apply(this, arguments)
                }
                var K;
                if ($.isFunction(I)) return K = I, J;
                K = I.handler, I.handler = J
            }
        })
    }(jQuery),
    function($, e, b) {
        function a(j) {
            return "#" + (j = j || location.href).replace(/^[^#]*#?(.*)$/, "$1")
        }
        var f, c = "hashchange",
            h = document,
            g = $.event.special,
            i = h.documentMode,
            d = "on" + c in e && (i === b || i > 7);
        $.fn[c] = function(j) {
            return j ? this.bind(c, j) : this.trigger(c)
        }, $.fn[c].delay = 50, g[c] = $.extend(g[c], {
            setup: function() {
                if (d) return !1;
                $(f.start)
            },
            teardown: function() {
                if (d) return !1;
                $(f.stop)
            }
        }), f = function() {
            function n() {
                var r = a(),
                    q = o(m);
                r !== m ? (l(m = r, q), $(e).trigger(c)) : q !== m && (location.href = location.href.replace(/#.*/, "") + q), p = setTimeout(n, $.fn[c].delay)
            }
            var p, q, r, j = {},
                m = a(),
                k = function(q) {
                    return q
                },
                l = k,
                o = k;
            return j.start = function() {
                p || n()
            }, j.stop = function() {
                p && clearTimeout(p), p = b
            }, !d && (j.start = function() {
                q || (r = (r = $.fn[c].src) && r + a(), q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", (function() {
                    r || l(a()), n()
                })).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow, h.onpropertychange = function() {
                    try {
                        "title" === event.propertyName && (q.document.title = h.title)
                    } catch (s) {}
                })
            }, j.stop = k, o = function() {
                return a(q.location.href)
            }, l = function(v, s) {
                var u = q.document,
                    t = $.fn[c].domain;
                v !== s && (u.title = h.title, u.open(), t && u.write('<script>document.domain="' + t + '"</script>'), u.close(), q.location.hash = v)
            }), j
        }()
    }(jQuery, this);