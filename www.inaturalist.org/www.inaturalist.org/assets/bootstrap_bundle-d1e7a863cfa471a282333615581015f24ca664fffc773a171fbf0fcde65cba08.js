function num2letterID(num) {
    return alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", ID = alphabet[num % 26], num <= 25 ? ID : alphabet[Math.floor(num / 26) - 1] + ID
}

function clickTip(obj, txt) {
    obj.value == txt && (obj.value = ""), obj.className = "formInput"
}

function blurTip(obj, txt) {
    "" == obj.value && (obj.className = "formInputTip", obj.value = txt)
}

function loadingClickForLink() {
    var txt = $(this).attr("data-loading-click");
    "true" == $.trim($(this).attr("data-loading-click")) && (txt = I18n.t("loading"));
    var loading = $(this).siblings(".loadingclick:first");
    0 == loading.length && ((loading = $(this).clone(!1)).unbind(), loading.attr("onclick", "return false;"), loading.attr("href", "#"), loading.attr("id", "").addClass("loadingclick disabled").css("padding-left", "25px").html(txt), loading.click((function(e) {
        return e.preventDefault(), !1
    })), "" == txt && loading.find("span").html(".").css("visibility", "hidden").css("width", "0px"), $(this).before(loading)), $(this).hide(), $(loading).show();
    var link = this;
    $(this).attr("data-loading-click-bound") || ($(this).bind("ajax:complete", (function() {
        $(link).show(), loading.hide()
    })), $(this).attr("data-loading-click-bound", !0))
}

function loadingClickForButton(options) {
    options = options || {}, $(this).data("original-value", $(this).val());
    var txt = $.trim($(this).attr("data-loading-click"));
    "true" == $.trim($(this).attr("data-loading-click")) && (txt = I18n.t("saving")), $(this).data("original-value", $(this).val()), $(this).addClass("disabled description").val(txt);
    var link = this;
    $(this).attr("data-loading-click-bound") || 0 == options.ajax || ($(this).parents("form").bind("ajax:complete", (function() {
        $(link).attr("disabled", !1).removeClass("disabled description"), $(link).val($(link).data("original-value"))
    })), $(this).attr("data-loading-click-bound", !0)), $(link).attr("disabled", !0)
}

function inatIsMobile() {
    return navigator && navigator.userAgent && "string" == typeof navigator.userAgent && navigator.userAgent.match(/Mobi/)
}

function buildHelpTips() {
    if (void 0 !== $().qtip) {
        var options = $.extend(!0, {}, QTIP_DEFAULTS, {
            show: {
                event: "click"
            },
            hide: {
                event: "unfocus"
            },
            position: {
                at: "bottom center"
            }
        });
        $(".helptip").not(".helptipified").each((function() {
            var content;
            $(this).addClass("helptipified"), content = $(this).attr("rel") ? .match(/^#/) ? $($(this).attr("rel")).html() : $(this).attr("rel");
            var tipOptions = $.extend(!0, {}, options, {
                content: {
                    text: content,
                    title: $(this).attr("data-helptip-title")
                }
            });
            $(this).data("tip-options") && (tipOptions = $.extend(!0, {}, tipOptions, $(this).data("tip-options"))), $(this).attr("data-helptip-width") && (tipOptions.style = tipOptions.style || {}, tipOptions.style.width = $(this).attr("data-helptip-width")), $(this).qtip(tipOptions)
        }))
    }
}

function checkFormForRequiredFields(e) {
    var inputs = $("input[required]:visible").filter((function() {
        return !$(this).val()
    }));
    if (0 == inputs.length) return !0;
    var viewport = $(this).parents(".ui-dialog-content:first").get(0) || !1,
        container = $(this).parents(".ui-dialog-content:first").get(0) || document.body;
    return inputs.css({
        "border-color": "DeepPink"
    }).qtip({
        content: "This field is required",
        style: {
            classes: "ui-tooltip-light ui-tooltip-shadow ui-tooltip-required"
        },
        position: {
            viewport: !!viewport && $(viewport),
            container: $(container)
        }
    }).qtip("show"), e.preventDefault(), e.stopImmediatePropagation(), $(window).scrollTo(inputs[0]), !1
}

function checkDelayedLink(url) {
    if (window.delayedLinkTries > 20) return $("#delayedlinknotice").dialog("close"), void alert("Your request for " + url + " seems to be taking forever.  Please try again later.");
    $.ajax({
        url: url,
        type: "get",
        statusCode: {
            202: function() {
                window.delayedLinkTries += 1, setTimeout('checkDelayedLink("' + url + '")', 5e3)
            },
            200: function() {
                $("#delayedlinknotice").dialog("close"), window.location = url
            }
        }
    })
}

function autoPopover() {
    var options = $(this).data("popover");
    options.content && options.content.match(/^#/) ? content = $(options.content).html() : content = options.content, options.style && options.style.classes && (options.style.classes = QTIP_DEFAULTS.style.classes + " " + options.style.classes);
    var tipOptions = $.extend(!0, {}, QTIP_DEFAULTS, options, {
        show: {
            event: "click"
        },
        hide: {
            event: "unfocus"
        },
        content: {
            text: content,
            title: options.title
        }
    });
    $(this).qtip(tipOptions)
}

function autoTip() {
    $(this).attr("data-tip").match(/^#\w+/) ? content = $($(this).attr("data-tip")).html() : content = $(this).attr("data-tip");
    var tipOptions = $.extend(!0, {}, QTIP_DEFAULTS);
    $(this).data("tip-options") && (tipOptions = $.extend(!0, {}, tipOptions, $(this).data("tip-options"))), $(this).attr("data-tip-title") ? tipOptions.content = {
        text: content,
        title: $(this).attr("data-helptip-title")
    } : tipOptions.content = content, $(this).attr("data-tip-show-delay") && (tipOptions.show = tipOptions.show || {}, tipOptions.show.delay = parseInt($(this).attr("data-tip-show-delay"))), $(this).attr("data-tip-width") && (tipOptions.style = tipOptions.style || {}, tipOptions.style.width = $(this).attr("data-tip-width")), $(this).attr("data-tip-style-classes") && (tipOptions.style = tipOptions.style || {}, tipOptions.style.classes = $(this).attr("data-tip-style-classes")), $(this).attr("data-tip-position-at") && (tipOptions.position = tipOptions.position || {}, tipOptions.position.at = $(this).attr("data-tip-position-at")), $(this).attr("data-tip-hide-delay") && (tipOptions.hide = tipOptions.hide || {}, tipOptions.hide.delay = $(this).attr("data-tip-hide-delay")), $(this).qtip($.extend(!0, {}, tipOptions)), navigator.platform.match(/^Win/) && $.browser.webkit && !navigator.userAgent.match(/Chrome/i) && $("input[type=file]").removeAttr("multiple")
}

function currentTimeZone() {
    var nowString = (new Date).toString(),
        timeZoneAbbr = nowString.match(/\(([A-Z]{3,4})\)$/) ? nowString.match(/\(([A-Z]{3,4})\)$/)[1] : null,
        timeZoneOffset = nowString.match(/[+-]\d\d\d\d/)[0],
        timeZoneOffsetHours = nowString.match(/([+-]\d\d)(\d\d)/)[1],
        timeZoneOffsetMinutes = nowString.match(/([+-]\d\d)(\d\d)/)[2];
    return {
        abbreviation: timeZoneAbbr,
        offset: timeZoneOffset,
        offsetHours: parseInt(timeZoneOffsetHours),
        offsetMinutes: parseInt(timeZoneOffsetMinutes)
    }
}

function setUpdatesCount(count, options) {
    options = options || {}, count > 0 ? (options.skipAnimation ? $("#header .updates").addClass("hasupdates") : $("#header .updates").switchClass("", "hasupdates"), $("#header .updates .count").html(count)) : (options.skipAnimation ? $("#header .updates").removeClass("hasupdates") : $("#header .updates").switchClass("hasupdates", ""), $("#header .updates .count").html(0))
}

function getUpdatesCount() {
    $.getJSON("/users/updates_count.json", (function(data) {
        setUpdatesCount(data.count)
    }))
}

function setMessagesCount(count, options) {
    options = options || {}, count > 0 ? (options.skipAnimation ? $("#header .messages").addClass("hasupdates") : $("#header .messages").switchClass("", "hasupdates"), $("#header .messages .count").html(count)) : (options.skipAnimation ? $("#header .messages").removeClass("hasupdates") : $("#header .messages").switchClass("hasupdates", ""), $("#header .messages .count").html(0))
}

function getMessagesCount() {
    $.getJSON("/messages/count.json", (function(data) {
        setMessagesCount(data.count)
    }))
}

function getHeaderCounts() {
    var apiToken = $("meta[name='inaturalist-api-token']").attr("content");
    $.ajax({
        url: "https://api.inaturalist.org/v1/users/notification_counts",
        headers: {
            Authorization: apiToken
        },
        success: function(data) {
            setUpdatesCount(data.updates_count), setMessagesCount(data.messages_count)
        }
    })
}

function serialID() {
    return window._serialID = window._serialID ? window._serialID + 1 : 1, window._serialID
}

function setPreference(pref, value) {
    console.log("[DEBUG] setPreference pref:", pref, ", value: ", value);
    var url = $("#usersubnav .profile_link:first").attr("href");
    if (console.log("[DEBUG] setPreference, url: ", url), url && pref && value) {
        var data = {
            authenticity_token: $("meta[name=csrf-token]").attr("content"),
            _method: "PUT"
        };
        data["user[preferred_" + pref + "]"] = value, $.ajax(url, {
            type: "POST",
            data: data,
            dataType: "json"
        })
    }
}

function showJoinProjectDialog(projectId, options) {
    var url = (options = options || {}).url || "/projects/" + projectId + "/join?partial=join",
        title = options.title || I18n.t("join_project"),
        originalInput = options.originalInput,
        dialog = $("<div></div>").addClass("dialog").html('<div class="loading status">' + I18n.t("loading") + "</div>");
    dialog.load(url, (function() {
        var button = $(".default.button", this),
            diag = this;
        button.click((function() {
            var joinUrl = $(this).attr("href");
            return $.post(joinUrl).done((function() {
                $(diag).dialog("close"), originalInput && $(originalInput).click()
            })).fail((function() {
                alert("Failed to join project")
            })), !1
        })), $(this).centerDialog()
    })), dialog.dialog({
        modal: !0,
        title: title,
        width: 600,
        maxHeight: .8 * $(window).height()
    })
}

function preciseRound(num, decimals) {
    return null === num ? null : Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

function updateSession(params) {
    (params = params || {})[$("meta[name=csrf-param]").attr("content")] = $('meta[name="csrf-token"]').attr("content"), $.ajax({
        url: "/users/update_session",
        data: params,
        type: "PUT"
    })
}! function(Date, undefined) {
    var origParse = Date.parse,
        numericKeys = [1, 4, 5, 6, 7, 10, 11];
    Date.parse = function(date) {
        var timestamp, struct, minutesOffset = 0;
        if (struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date)) {
            for (var k, i = 0; k = numericKeys[i]; ++i) struct[k] = +struct[k] || 0;
            struct[2] = (+struct[2] || 1) - 1, struct[3] = +struct[3] || 1, "Z" !== struct[8] && struct[9] !== undefined && (minutesOffset = 60 * struct[10] + struct[11], "+" === struct[9] && (minutesOffset = 0 - minutesOffset)), timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7])
        } else timestamp = origParse ? origParse(date) : NaN;
        return timestamp
    }
}(Date),
function(root, factory) {
    "function" == typeof define && define.amd ? define("i18n", (function() {
        return factory(root)
    })) : "object" == typeof module && module.exports ? module.exports = factory(root) : root.I18n = factory(root)
}(this, (function(global) {
    "use strict";
    var I18n = global && global.I18n || {},
        slice = Array.prototype.slice,
        padding = function(number) {
            return ("0" + number.toString()).substr(-2)
        },
        toFixed = function(number, precision) {
            return decimalAdjust("round", number, -precision).toFixed(precision)
        },
        isObject = function(obj) {
            var type = typeof obj;
            return "function" === type || "object" === type
        },
        isFunction = function(func) {
            return "function" === typeof func
        },
        isSet = function(value) {
            return null != value
        },
        isArray = function(val) {
            return Array.isArray ? Array.isArray(val) : "[object Array]" === Object.prototype.toString.call(val)
        },
        isString = function(val) {
            return "string" == typeof val || "[object String]" === Object.prototype.toString.call(val)
        },
        isNumber = function(val) {
            return "number" == typeof val || "[object Number]" === Object.prototype.toString.call(val)
        },
        isBoolean = function(val) {
            return !0 === val || !1 === val
        },
        isNull = function(val) {
            return null === val
        },
        decimalAdjust = function(type, value, exp) {
            return void 0 === exp || 0 == +exp ? Math[type](value) : (value = +value, exp = +exp, isNaN(value) || "number" != typeof exp || exp % 1 != 0 ? NaN : (value = value.toString().split("e"), +((value = (value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)))).toString().split("e"))[0] + "e" + (value[1] ? +value[1] + exp : exp))))
        },
        lazyEvaluate = function(message, scope) {
            return isFunction(message) ? message(scope) : message
        },
        merge = function(dest, obj) {
            var key, value;
            for (key in obj) obj.hasOwnProperty(key) && (value = obj[key], isString(value) || isNumber(value) || isBoolean(value) || isArray(value) || isNull(value) ? dest[key] = value : (null == dest[key] && (dest[key] = {}), merge(dest[key], value)));
            return dest
        },
        DATE = {
            day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridian: ["AM", "PM"]
        },
        NUMBER_FORMAT = {
            precision: 3,
            separator: ".",
            delimiter: ",",
            strip_insignificant_zeros: !1
        },
        CURRENCY_FORMAT = {
            unit: "$",
            precision: 2,
            format: "%u%n",
            sign_first: !0,
            delimiter: ",",
            separator: "."
        },
        PERCENTAGE_FORMAT = {
            unit: "%",
            precision: 3,
            format: "%n%u",
            separator: ".",
            delimiter: ""
        },
        SIZE_UNITS = [null, "kb", "mb", "gb", "tb"],
        DEFAULT_OPTIONS = {
            defaultLocale: "en",
            locale: "en",
            defaultSeparator: ".",
            placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
            fallbacks: !1,
            translations: {},
            missingBehaviour: "message",
            missingTranslationPrefix: ""
        };
    return I18n.reset = function() {
        var key;
        for (key in DEFAULT_OPTIONS) this[key] = DEFAULT_OPTIONS[key]
    }, I18n.initializeOptions = function() {
        var key;
        for (key in DEFAULT_OPTIONS) isSet(this[key]) || (this[key] = DEFAULT_OPTIONS[key])
    }, I18n.initializeOptions(), I18n.locales = {}, I18n.locales.get = function(locale) {
        var result = this[locale] || this[I18n.locale] || this.default;
        return isFunction(result) && (result = result(locale)), !1 === isArray(result) && (result = [result]), result
    }, I18n.locales.default = function(locale) {
        var locales = [],
            list = [];
        return locale && locales.push(locale), !locale && I18n.locale && locales.push(I18n.locale), I18n.fallbacks && I18n.defaultLocale && locales.push(I18n.defaultLocale), locales.forEach((function(locale) {
            var localeParts = locale.split("-"),
                firstFallback = null,
                secondFallback = null;
            3 === localeParts.length ? (firstFallback = [localeParts[0], localeParts[1]].join("-"), secondFallback = localeParts[0]) : 2 === localeParts.length && (firstFallback = localeParts[0]), -1 === list.indexOf(locale) && list.push(locale), I18n.fallbacks && [firstFallback, secondFallback].forEach((function(nullableFallbackLocale) {
                null != nullableFallbackLocale && nullableFallbackLocale !== locale && -1 === list.indexOf(nullableFallbackLocale) && list.push(nullableFallbackLocale)
            }))
        })), locales.length || locales.push("en"), list
    }, I18n.pluralization = {}, I18n.pluralization.get = function(locale) {
        return this[locale] || this[I18n.locale] || this.default
    }, I18n.pluralization.default = function(count) {
        switch (count) {
            case 0:
                return ["zero", "other"];
            case 1:
                return ["one"];
            default:
                return ["other"]
        }
    }, I18n.currentLocale = function() {
        return this.locale || this.defaultLocale
    }, I18n.isSet = isSet, I18n.lookup = function(scope, options) {
        options = options || {};
        var locale, scopes, fullScope, translations, locales = this.locales.get(options.locale).slice();
        for (fullScope = this.getFullScope(scope, options); locales.length;)
            if (locale = locales.shift(), scopes = fullScope.split(this.defaultSeparator), translations = this.translations[locale]) {
                for (; scopes.length && null != (translations = translations[scopes.shift()]););
                if (null != translations) return translations
            }
        if (isSet(options.defaultValue)) return lazyEvaluate(options.defaultValue, scope)
    }, I18n.pluralizationLookupWithoutFallback = function(count, locale, translations) {
        var pluralizerKey, message, pluralizerKeys = this.pluralization.get(locale)(count);
        if (isObject(translations))
            for (; pluralizerKeys.length;)
                if (pluralizerKey = pluralizerKeys.shift(), isSet(translations[pluralizerKey])) {
                    message = translations[pluralizerKey];
                    break
                }
        return message
    }, I18n.pluralizationLookup = function(count, scope, options) {
        options = options || {};
        var locale, scopes, translations, message, locales = this.locales.get(options.locale).slice();
        for (scope = this.getFullScope(scope, options); locales.length;)
            if (locale = locales.shift(), scopes = scope.split(this.defaultSeparator), translations = this.translations[locale]) {
                for (; scopes.length && (translations = translations[scopes.shift()], isObject(translations));) 0 === scopes.length && (message = this.pluralizationLookupWithoutFallback(count, locale, translations));
                if (null != message) break
            }
        return null == message && isSet(options.defaultValue) && (message = isObject(options.defaultValue) ? this.pluralizationLookupWithoutFallback(count, options.locale, options.defaultValue) : options.defaultValue, translations = options.defaultValue), {
            message: message,
            translations: translations
        }
    }, I18n.meridian = function() {
        var time = this.lookup("time"),
            date = this.lookup("date");
        return time && time.am && time.pm ? [time.am, time.pm] : date && date.meridian ? date.meridian : DATE.meridian
    }, I18n.prepareOptions = function() {
        for (var subject, args = slice.call(arguments), options = {}; args.length;)
            if ("object" == typeof(subject = args.shift()))
                for (var attr in subject) subject.hasOwnProperty(attr) && (isSet(options[attr]) || (options[attr] = subject[attr]));
        return options
    }, I18n.createTranslationOptions = function(scope, options) {
        var translationOptions = [{
            scope: scope
        }];
        return isSet(options.defaults) && (translationOptions = translationOptions.concat(options.defaults)), isSet(options.defaultValue) && translationOptions.push({
            message: options.defaultValue
        }), translationOptions
    }, I18n.translate = function(scope, options) {
        options = options || {};
        var translation, translationOptions = this.createTranslationOptions(scope, options),
            usedScope = scope,
            optionsWithoutDefault = this.prepareOptions(options);
        return delete optionsWithoutDefault.defaultValue, translationOptions.some((function(translationOption) {
            if (isSet(translationOption.scope) ? (usedScope = translationOption.scope, translation = this.lookup(usedScope, optionsWithoutDefault)) : isSet(translationOption.message) && (translation = lazyEvaluate(translationOption.message, scope)), null != translation) return !0
        }), this) ? ("string" == typeof translation ? translation = this.interpolate(translation, options) : isArray(translation) ? translation = translation.map((function(t) {
            return "string" == typeof t ? this.interpolate(t, options) : t
        }), this) : isObject(translation) && isSet(options.count) && (translation = this.pluralize(options.count, usedScope, options)), translation) : this.missingTranslation(scope, options)
    }, I18n.interpolate = function(message, options) {
        if (null == message) return message;
        options = options || {};
        var placeholder, value, name, regex, matches = message.match(this.placeholder);
        if (!matches) return message;
        for (; matches.length;) name = (placeholder = matches.shift()).replace(this.placeholder, "$1"), value = isSet(options[name]) ? options[name].toString().replace(/\$/gm, "_#$#_") : name in options ? this.nullPlaceholder(placeholder, message, options) : this.missingPlaceholder(placeholder, message, options), regex = new RegExp(placeholder.replace(/{/gm, "\\{").replace(/}/gm, "\\}")), message = message.replace(regex, value);
        return message.replace(/_#\$#_/g, "$")
    }, I18n.pluralize = function(count, scope, options) {
        var pluralizer, result;
        return options = this.prepareOptions({
            count: String(count)
        }, options), void 0 === (result = this.pluralizationLookup(count, scope, options)).translations || null == result.translations ? this.missingTranslation(scope, options) : void 0 !== result.message && null != result.message ? this.interpolate(result.message, options) : (pluralizer = this.pluralization.get(options.locale), this.missingTranslation(scope + "." + pluralizer(count)[0], options))
    }, I18n.missingTranslation = function(scope, options) {
        if ("guess" === this.missingBehaviour) {
            var s = scope.split(".").slice(-1)[0];
            return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : "") + s.replace("_", " ").replace(/([a-z])([A-Z])/g, (function(match, p1, p2) {
                return p1 + " " + p2.toLowerCase()
            }))
        }
        return '[missing "' + [null != options && null != options.locale ? options.locale : this.currentLocale(), this.getFullScope(scope, options)].join(this.defaultSeparator) + '" translation]'
    }, I18n.missingPlaceholder = function(placeholder) {
        return "[missing " + placeholder + " value]"
    }, I18n.nullPlaceholder = function() {
        return I18n.missingPlaceholder.apply(I18n, arguments)
    }, I18n.toNumber = function(number, options) {
        options = this.prepareOptions(options, this.lookup("number.format"), NUMBER_FORMAT);
        var precision, formattedNumber, negative = number < 0,
            parts = toFixed(Math.abs(number), options.precision).toString().split("."),
            buffer = [],
            format = options.format || "%n",
            sign = negative ? "-" : "";
        for (number = parts[0], precision = parts[1]; number.length > 0;) buffer.unshift(number.substr(Math.max(0, number.length - 3), 3)), number = number.substr(0, number.length - 3);
        return formattedNumber = buffer.join(options.delimiter), options.strip_insignificant_zeros && precision && (precision = precision.replace(/0+$/, "")), options.precision > 0 && precision && (formattedNumber += options.separator + precision), formattedNumber = (format = options.sign_first ? "%s" + format : format.replace("%n", "%s%n")).replace("%u", options.unit).replace("%n", formattedNumber).replace("%s", sign)
    }, I18n.toCurrency = function(number, options) {
        return options = this.prepareOptions(options, this.lookup("number.currency.format", options), this.lookup("number.format", options), CURRENCY_FORMAT), this.toNumber(number, options)
    }, I18n.localize = function(scope, value, options) {
        switch (options || (options = {}), scope) {
            case "currency":
                return this.toCurrency(value, options);
            case "number":
                return scope = this.lookup("number.format", options), this.toNumber(value, scope);
            case "percentage":
                return this.toPercentage(value, options);
            default:
                var localizedValue;
                return localizedValue = scope.match(/^(date|time)/) ? this.toTime(scope, value, options) : value.toString(), this.interpolate(localizedValue, options)
        }
    }, I18n.parseDate = function(date) {
        var matches, convertedDate, fraction;
        if (null == date) return date;
        if ("object" == typeof date) return date;
        if (matches = date.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/)) {
            for (var i = 1; i <= 6; i++) matches[i] = parseInt(matches[i], 10) || 0;
            matches[2] -= 1, fraction = matches[7] ? 1e3 * ("0" + matches[7]) : null, convertedDate = matches[8] ? new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction)) : new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction)
        } else "number" == typeof date ? (convertedDate = new Date).setTime(date) : date.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/) ? (convertedDate = new Date).setTime(Date.parse([RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5].join(" "))) : (date.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/), (convertedDate = new Date).setTime(Date.parse(date)));
        return convertedDate
    }, I18n.strftime = function(date, format, options) {
        options = this.lookup("date", options);
        var meridianOptions = I18n.meridian();
        if (options || (options = {}), options = this.prepareOptions(options, DATE), isNaN(date.getTime())) throw new Error("I18n.strftime() requires a valid date object, but received an invalid date.");
        var weekDay = date.getDay(),
            day = date.getDate(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            hour = date.getHours(),
            hour12 = hour,
            meridian = hour > 11 ? 1 : 0,
            secs = date.getSeconds(),
            mins = date.getMinutes(),
            offset = date.getTimezoneOffset(),
            absOffsetHours = Math.floor(Math.abs(offset / 60)),
            absOffsetMinutes = Math.abs(offset) - 60 * absOffsetHours,
            timezoneoffset = (offset > 0 ? "-" : "+") + (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) + (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes);
        return hour12 > 12 ? hour12 -= 12 : 0 === hour12 && (hour12 = 12), format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = (format = format.replace("%a", options.abbr_day_names[weekDay])).replace("%A", options.day_names[weekDay])).replace("%b", options.abbr_month_names[month])).replace("%B", options.month_names[month])).replace("%d", padding(day))).replace("%e", day)).replace("%-d", day)).replace("%H", padding(hour))).replace("%-H", hour)).replace("%k", hour)).replace("%I", padding(hour12))).replace("%-I", hour12)).replace("%l", hour12)).replace("%m", padding(month))).replace("%-m", month)).replace("%M", padding(mins))).replace("%-M", mins)).replace("%p", meridianOptions[meridian])).replace("%P", meridianOptions[meridian].toLowerCase())).replace("%S", padding(secs))).replace("%-S", secs)).replace("%w", weekDay)).replace("%y", padding(year))).replace("%-y", padding(year).replace(/^0+/, ""))).replace("%Y", year)).replace("%z", timezoneoffset)).replace("%Z", timezoneoffset)
    }, I18n.toTime = function(scope, dateString, options) {
        var date = this.parseDate(dateString),
            format = this.lookup(scope, options);
        if (null == date) return date;
        var date_string = date.toString();
        return date_string.match(/invalid/i) ? date_string : format ? this.strftime(date, format, options) : date_string
    }, I18n.toPercentage = function(number, options) {
        return options = this.prepareOptions(options, this.lookup("number.percentage.format", options), this.lookup("number.format", options), PERCENTAGE_FORMAT), this.toNumber(number, options)
    }, I18n.toHumanSize = function(number, options) {
        for (var unit, precision, kb = 1024, size = number, iterations = 0; size >= kb && iterations < 4;) size /= kb, iterations += 1;
        return 0 === iterations ? (unit = this.t("number.human.storage_units.units.byte", {
            count: size
        }), precision = 0) : (unit = this.t("number.human.storage_units.units." + SIZE_UNITS[iterations]), precision = size - Math.floor(size) == 0 ? 0 : 1), options = this.prepareOptions(options, {
            unit: unit,
            precision: precision,
            format: "%n%u",
            delimiter: ""
        }), this.toNumber(size, options)
    }, I18n.getFullScope = function(scope, options) {
        return options = options || {}, isArray(scope) && (scope = scope.join(this.defaultSeparator)), options.scope && (scope = [options.scope, scope].join(this.defaultSeparator)), scope
    }, I18n.extend = function(obj1, obj2) {
        return void 0 === obj1 && void 0 === obj2 ? {} : merge(obj1, obj2)
    }, I18n.t = I18n.translate.bind(I18n), I18n.l = I18n.localize.bind(I18n), I18n.p = I18n.pluralize.bind(I18n), I18n
})), I18n.translations || (I18n.translations = {}), I18n.translations.en = {
        Macrostrat: "Macrostrat",
        a_member_of_taxon_html: "a member of %{taxon}",
        a_to_z: "A to Z",
        about: "About",
        about_charts: "About Charts",
        about_community_taxa: "About community taxa",
        about_complete_taxa: "About Complete Taxa",
        about_conservation_status: "About Conservation Status",
        about_establishment_means: "About Establishment Means",
        about_license_options: "About License Options",
        about_names: "About Names",
        about_this_bioblitz: "About this bioblitz",
        about_trusting_projects: "About Trusting Projects",
        about_trusting_projects_options_any: "All your observations in this project",
        about_trusting_projects_options_any_desc: 'This includes observations where you have set the geoprivacy to "obscured"\nor "private," e.g. observations from your backyard or spots you don\'t want\nother people to know about.',
        about_trusting_projects_options_taxon: "Only your observations in this project that have obscured coordinates\nbecause of threatened taxa",
        about_trusting_projects_options_taxon_desc: "Many projects just need access to coordinates that are obscured because the\nobservation depicts a threatened taxon.",
        about_trusting_projects_overview: "Granting access to your hidden coordinates will allow the managers of this\nproject to see the true, unobscured location of your observations in this\nproject. This is extremely important in situations where scientists or\nresource managers need access to exact coordinates for analysis and\ndecision-making.",
        about_trusting_projects_project_managers_are: "The project managers who will have access to your hidden coordinates are:",
        about_trusting_projects_warning: "Note that project managers can change the project parameters to include any\nof your observations, and they can add or remove project managers at any\ntime. You will receive notifications about these changes, but you are\nessentially trusting this project with your private location data, so be\ncareful.",
        about_trusting_projects_you_can_choose: "You can choose to share hidden coordinates for",
        acc: "Acc (m)",
        accept_community_identifications: "Accept community identifications",
        account: "Account",
        account_creation: "Account Creation",
        accuracy: "Accuracy",
        accuracy_meters: "Accuracy (meters)",
        action: "Action",
        actions: "Actions",
        active: "Active",
        active_users: "Active Users",
        activerecord: {
            attributes: {
                observation: {
                    description: "Notes"
                },
                user: {
                    faved_project_ids: "Favorite projects",
                    time_zone: "Time Zone"
                }
            }
        },
        activity: "Activity",
        add: "Add",
        add_a_bulleted_list: "Add a bulleted list",
        add_a_comment: "Add a Comment",
        add_a_conservation_status: "Add a Conservation Status",
        add_a_field: "Add a Field",
        add_a_link: "Add a link",
        add_a_name: "Add a Name",
        add_a_numbered_list: "Add a numbered list",
        add_a_project: "Add a project",
        add_alive_or_dead_alive_annotation: 'Add "Alive or Dead: Alive" annotation',
        add_alive_or_dead_cannot_be_determined_annotation: 'Add "Alive or Dead: Cannot Be Determined" annotation',
        add_alive_or_dead_dead_annotation: 'Add "Alive or Dead: Dead" annotation',
        add_an_identification: "Add an Identification",
        add_annotations_for_x: 'Add Annotations for "%{x}"',
        add_blocked_users: "Add blocked users",
        add_bold_text: "Add bold text",
        add_edit_flags: "Add/Edit Flags",
        add_evidence_of_presence_bone_annotation: 'Add "Evidence of Presence: bone" annotation',
        add_evidence_of_presence_construction_annotation: 'Add "Evidence of Presence: construction" annotation',
        add_evidence_of_presence_egg_annotation: 'Add "Evidence of Presence: egg" annotation',
        add_evidence_of_presence_feather_annotation: 'Add "Evidence of Presence: feather" annotation',
        add_evidence_of_presence_gall_annotation: 'Add "Evidence of Presence: gall" annotation',
        add_evidence_of_presence_hair_annotation: 'Add "Evidence of Presence: hair" annotation',
        add_evidence_of_presence_leafmine_annotation: 'Add "Evidence of Presence: leafmine" annotation',
        add_evidence_of_presence_molt_annotation: 'Add "Evidence of Presence: molt" annotation',
        add_evidence_of_presence_organism_annotation: 'Add "Evidence of Presence: organism" annotation',
        add_evidence_of_presence_scat_annotation: 'Add "Evidence of Presence: scat" annotation',
        add_evidence_of_presence_track_annotation: 'Add "Evidence of Presence: track" annotation',
        add_flowers_and_fruits_flower_buds_annotation: 'Add "Flowers and Fruits: Flower Buds" annotation',
        add_flowers_and_fruits_flowers_annotation: 'Add "Flowers and Fruits: Flowers" annotation',
        add_id: "Add ID",
        add_italic_text: "Add italic text",
        add_life_stage_adult_annotation: 'Add "Life Stage: Adult" annotation',
        add_life_stage_egg_annotation: 'Add "Life Stage: Egg" annotation',
        add_life_stage_juvenile_annotation: 'Add "Life Stage: Juvenile" annotation',
        add_life_stage_larva_annotation: 'Add "Life Stage: Larva" annotation',
        add_life_stage_nymph_annotation: 'Add "Life Stage: Nymph" annotation',
        add_life_stage_pupa_annotation: 'Add "Life Stage: Pupa" annotation',
        add_life_stage_subimago_annotation: 'Add "Life Stage: subimago" annotation',
        add_life_stage_teneral_annotation: 'Add "Life Stage: teneral" annotation',
        add_link: "Add Link",
        add_muted_users: "Add muted users",
        add_observation_fields: "Add Observation Fields",
        add_one_now: "Add One Now",
        add_place: "Add Place",
        add_sex_cannot_be_determined_annotation: 'Add "Sex: Cannot Be Determined" annotation',
        add_sex_female_annotation: 'Add "Sex: Female" annotation',
        add_sex_male_annotation: 'Add "Sex: Male" annotation',
        add_tag: "Add Tag",
        add_tags: "Add Tags",
        add_to_a_project: "Add to a Project",
        add_to_favorites: "Add to Favorites",
        add_to_project: "Add to Project",
        added: "Added",
        "added!": "Added!",
        added_as_a_part_of_a_taxon_change_html: 'Added as part of a\n<a target="%{target}" class="%{class}" href="%{url}">taxon change</a>\n',
        added_as_a_part_of_a_taxon_merge_html: 'Added as part of a\n<a target="%{target}" class="%{class}" href="%{url}">taxon merge</a>\n',
        added_as_a_part_of_a_taxon_split_html: 'Added as part of a\n<a target="%{target}" class="%{class}" href="%{url}">taxon split</a>\n',
        added_as_a_part_of_a_taxon_swap_html: 'Added as part of a\n<a target="%{target}" class="%{class}" href="%{url}">taxon swap</a>\n',
        added_by: "Added by",
        added_by_user_on_date_html: "Added by %{user} on %{date}",
        added_on_datetime: "Added on %{datetime}",
        adjust_brightness: "Adjust Brightness",
        admin_s: "Admin(s)",
        agree_: "Agree",
        agree_with_current_taxon: "Agree with current taxon",
        agree_with_observation_taxon: "Agree with observation taxon",
        aka: "aka",
        alert: "Alert",
        all: "All",
        all_flags_must_be_resolved: "All flags must be resolved",
        all_media_must_be_unhidden: "All media must be unhidden",
        all_rank_added_to_the_database: {
            class: "All classes added to the database",
            complex: "All complexes added to the database",
            epifamily: "All epifamilies added to the database",
            family: "All families added to the database",
            form: "All forms added to the database",
            genus: "All genera added to the database",
            genushybrid: "All genushybrids added to the database",
            hybrid: "All hybrids added to the database",
            infraclass: "All infraclasses added to the database",
            infraorder: "All infraorders added to the database",
            order: "All orders added to the database",
            phylum: "All phyla added to the database",
            section: "All sections added to the database",
            species: "All species added to the database",
            subclass: "All subclasses added to the database",
            subfamily: "All subfamilies added to the database",
            subgenus: "All subgenera added to the database",
            suborder: "All suborders added to the database",
            subphylum: "All subphyla added to the database",
            subsection: "All subsections added to the database",
            subspecies: "All subspecies added to the database",
            subtribe: "All subtribes added to the database",
            superclass: "All superclasses added to the database",
            superfamily: "All superfamilies added to the database",
            superorder: "All superorders added to the database",
            supertribe: "All supertribes added to the database",
            tribe: "All tribes added to the database",
            variety: "All varieties added to the database"
        },
        all_rights_reserved: "all rights reserved",
        all_taxa: {
            amphibians: "Amphibians",
            animals: "Animals",
            arachnids: "Arachnids",
            birds: "Birds",
            chromista: "Chromista",
            fungi: "Fungi",
            fungi_including_lichens: "Fungi Including Lichens",
            insects: "Insects",
            mammals: "Mammals",
            mollusks: "Mollusks",
            other_animals: "Other Animals",
            plants: "Plants",
            protozoans: "Protozoans",
            ray_finned_fishes: "Ray-Finned Fishes",
            reptiles: "Reptiles",
            life: "Life",
            x_plantae: {
                one: "%{count} plant",
                other: "%{count} plants"
            },
            x_animalia: {
                one: "%{count} animal",
                other: "%{count} animals"
            },
            x_mollusca: {
                one: "%{count} mollusk",
                other: "%{count} mollusks"
            },
            x_amphibia: {
                one: "%{count} amphibian",
                other: "%{count} amphibians"
            },
            x_mammalia: {
                one: "%{count} mammal",
                other: "%{count} mammals"
            },
            x_actinopterygii: {
                one: "%{count} ray-finned fish",
                other: "%{count} ray-finned fishes"
            },
            x_reptilia: {
                one: "%{count} reptile",
                other: "%{count} reptiles"
            },
            x_aves: {
                one: "%{count} bird",
                other: "%{count} birds"
            },
            x_insecta: {
                one: "%{count} insect",
                other: "%{count} insects"
            },
            x_arachnida: {
                one: "%{count} arachnid",
                other: "%{count} arachnids"
            },
            x_fungi: {
                one: "%{count} fungus",
                other: "%{count} fungi"
            },
            x_chromista: {
                one: "%{count} chromist",
                other: "%{count} chromists"
            },
            x_protozoa: {
                one: "%{count} protozoan",
                other: "%{count} protozoa"
            },
            x_other_animals: {
                one: "%{count} other animal",
                other: "%{count} other animals"
            }
        },
        all_taxa_: "All taxa",
        allow_curator_access: "Allow curator access",
        allow_project_curators_to_view_your_private_coordinates: "Allow project curators to view your hidden coordinates",
        amphibians: "amphibians",
        android: "Android",
        animals: "Animals",
        annotation: "Annotation",
        annotations: "Annotations",
        any: "any",
        any_: "Any",
        any_annotation_attribute: "Any",
        any_annotation_value: "Any",
        any_date: "Any",
        any_establishment: "Any",
        any_license: "Any",
        any_media: "Any",
        any_project: "Any",
        any_quality_grade: "Any",
        any_reviewed: "Any",
        any_user: "Any",
        anyone: "Anyone",
        application: "Application",
        applications: "Applications",
        arachnids: "arachnids",
        "are_you_sure?": "Are you sure?",
        are_you_sure_leave_this_project: "Are you sure you want to leave this project?",
        are_you_sure_remove_photo: "Are you sure you want to remove this photo?",
        are_you_sure_want_delete_this_name: "Are you sure you want to delete this name?",
        are_you_sure_you_want_to_remove_all_tags: "Are you sure you want to remove all tags?",
        "are_you_sure_you_want_to_remove_these_x_taxa?": "Are you sure you want to remove these %{x} taxa?",
        are_you_sure_you_want_to_remove_this_observation_from_project: "Are you sure you want to remove this observation from %{project}?\n",
        asc: "Asc",
        ascending: "Ascending",
        atom: "Atom",
        attention: "Attention",
        attribute: "Attribute",
        automatically_update_my_content_for_taxon_changes: "Automatically update my content for taxon changes",
        avg: "Avg",
        back_to_suggestions: "Back to Suggestions",
        back_to_x: "Back to %{noun}",
        badges: "Badges",
        base_map_copyright_openstreetmap_html: "Base map \xa9 %{startTag}OpenStreetMap%{endTag}",
        based_on_the_evidence_can_id_be_improved: "Based on the evidence, can the Community Taxon still be confirmed or improved?\n",
        be_the_first_to_fave_this_observation: "Be the first to fave this observation!",
        become_a_donor_caps: "BECOME A DONOR",
        become_a_donor_today_caps: "BECOME A DONOR TODAY",
        bio: "Bio",
        bio_description: "Tell other users on iNaturalist about yourself!",
        birds: "birds",
        block: "Block",
        blocked_users: "Blocked Users",
        blocking_description: "Blocking prevents any communication between you and another user. It is for situations where another user may put your safety at risk, like stalking or other abusive behavior.",
        blue_butterfly_etc: "blue, butterfly, etc.",
        bold_label_colon_value_html: "<strong>%{label}:</strong> %{value}",
        bold_text: "bold text",
        browse: "Browse",
        by_user: "By %{user}",
        calendar: "Calendar",
        cancel: "Cancel",
        captive: "Captive",
        captive_cultivated: "Captive / Cultivated",
        captive_observations: "Captive Observations",
        casual: "casual",
        casual_: "Casual",
        casual_tooltip_html: '"Casual" observations are missing media, location, or a date, or do not meet the requirements of the "Research" or "Needs ID" quality grades for other reasons. <a href="https://www.inaturalist.org/pages/help#quality">Learn more about quality grades</a>',
        categories: "Categories",
        cc_0_description: "This license releases your work into the public domain, so others can copy, modify, distribute and perform your work, even for commercial purposes, all without asking permission or giving you credit. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials.",
        cc_0_name: "No Copyright (CC0)",
        cc_by_description: "This license lets others distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation.",
        cc_by_name: "Attribution",
        cc_by_nc_description: "This license lets others remix, tweak, and build upon your work non-commercially, and although their new works must also acknowledge you and be non-commercial, they don't have to license their derivative works on the same terms.",
        cc_by_nc_name: "Attribution-NonCommercial",
        cc_by_nc_nd_description: "This license is the most restrictive of the six main licenses, only allowing others to download your works and share them with others as long as they credit you, but they can't change them in any way or use them commercially.",
        cc_by_nc_nd_name: "Attribution-NonCommercial-NoDerivs",
        cc_by_nc_sa_description: "This license lets others remix, tweak, and build upon your work non-commercially, as long as they credit you and license their new creations under the identical terms.",
        cc_by_nc_sa_name: "Attribution-NonCommercial-ShareAlike",
        cc_by_nd_description: "This license allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole, with credit to you.",
        cc_by_nd_name: "Attribution-NoDerivs",
        cc_by_sa_description: "This license lets others remix, tweak, and build upon your work even for commercial purposes, as long as they credit you and license their new creations under the identical terms. All new works based on yours will carry the same license, so any derivatives will also allow commercial use.",
        cc_by_sa_name: "Attribution-ShareAlike",
        change_password: "Change Password",
        change_to_email_requested_html: "Change to <strong>%{email}</strong> requested. Check your email at that address to confirm the change.",
        change_types: {
            input_taxa_were_merged_into_output_taxon_html: "%{input_taxa} were merged into %{output_taxon}",
            input_taxa_will_be_merged_into_output_taxon_html: "%{input_taxa} will be merged into %{output_taxon}",
            input_taxon_was_dropped_html: "%{input_taxon} was dropped",
            input_taxon_was_replaced_by_output_taxon_html: "%{input_taxon} was replaced by %{output_taxon}",
            input_taxon_was_split_into_output_taxa_html: "%{input_taxon} was split into %{output_taxa}",
            input_taxon_will_be_dropped_html: "%{input_taxon} will be dropped",
            input_taxon_will_be_replaced_by_output_taxon_html: "%{input_taxon} will be replaced by %{output_taxon}",
            input_taxon_will_be_split_into_output_taxa_html: "%{input_taxon} will be split into %{output_taxa}"
        },
        check_above_for_errors: "Check above for errors",
        check_back_soon: "Check back soon!",
        check_out_the_inat_store: "Check Out the iNaturalist Store",
        checklist: "Checklist",
        choose_a_field: "Choose a field",
        choose_file: "Choose file",
        choose_files: "Choose files",
        choose_photos_for_this_taxon: "Choose photos for this taxon",
        clear: "clear",
        close: "Close",
        code_contributors: "Code Contributors",
        combine: "Combine",
        comment_: "Comment",
        commercial_solicitation: "Commercial solicitation, links to nowhere, etc.",
        common_name: "Common Name",
        community_curated: "Community Curated",
        community_id_at_species_level_or_lower: "Community Taxon at species level or lower",
        community_id_heading: "Community Taxon",
        community_id_is_precise: "Community Taxon is precise",
        community_moderation_settings: "Community Moderation Settings",
        compare: "Compare",
        comprehensive_list: "Comprehensive list",
        computer_vision_model: "Computer Vision Model",
        computer_vision_model_included: "Included",
        computer_vision_model_included_desc: 'The current Computer Vision Model knows about this taxon, so it might be\nincluded in automated suggestions with the "Visually Similar" label.\n',
        computer_vision_model_pending: "Pending",
        computer_vision_model_pending_desc2: 'The current Computer Vision Model does not know about this taxon, so while\nit might be included in automated suggestions with the "Expected Nearby" label, it\nwill not have the "Visually Similar" label. While the requirements for\nmodel inclusion change with each model, generally inclusion is based on\nnumber of observations, so to increase the chance of this taxon getting\nincluded during the next model training, add or identify more observations\nof this taxon.\n',
        computer_vision_suggestion: "Computer Vision Suggestion",
        computer_vision_suggestion_desc: "Computer vision is the process of teaching computers to recognize patterns\nin images. We provide tools that use computer vision models trained on the\ncommunity's photos to provide identification suggestions, like the auto-\ncomplete and comparison features. This label indicates when a person added\nan identification using one of these tools.\n",
        confirm: "Confirm",
        confirm_new_password: "Confirm New Password",
        confirmation_email_sent_at_datetime: "Confirmation email sent at %{datetime}",
        confirmed_on_date: "Confirmed on %{date}",
        confirming_ids: "Confirming IDs",
        confirming_ids_description: "If you turn this off, you will no longer be notified about IDs that agree\nwith yours unless they have additional remarks.\n",
        connect: "Connect",
        connected_accounts_description: "Connected accounts are your accounts from other apps or websites that you have allowed iNaturalist access to on your behalf to support sign in, photo import, or other functionality.",
        connected_accounts_titlecase: "Connected Accounts",
        conservation_status: "Conservation Status",
        conservation_status_geoprivacy_desc: "Default geoprivacy applied to all observations of this taxon in this place\n",
        contact_support: "Contact Support",
        content_and_display: "Content & Display",
        content_hidden: "Content Hidden",
        content_hidden_by_user_on_date_because_reason_html: 'Content hidden by %{user} on %{date} because: "%{reason}"\n',
        content_hidden_on_date_because_reason_html: 'Content hidden on %{date} because: "%{reason}"\n',
        continue: "Continue",
        controlled_term_definitions: {
            alive: "Organism is living and shows no signs of imminent death",
            bone: 'Predominantly endoskeletal remains; partial bone exposure in an otherwise\nintact organism should be labelled "organism"\n',
            breaking_leaf_buds: "At least one bud with its first new leaf or needle not fully unfolded",
            cannot_be_determined: "Cannot be determined from the evidence provided",
            colored_leaves: "At least one leaf or needle has late season or drought color",
            construction: "Something created by an animal, made with or excavated from other materials",
            dead: "Organism is dead or shows signs of imminent death",
            egg: "Whole egg or part of an egg",
            feather: "One or more feathers not attached to an organism",
            female: "Evidence indicates that organism can produce ova for use in sexual reproduction",
            flower_budding: "Flower buds are visible but not open",
            flower_buds: "At least one closed flower bud",
            flowering: "Flowers visible, open, and still attached to the plant",
            flowers: "At least one open flower",
            fruiting: "Fruit visible and still attached to the plant",
            fruits_or_seeds: "At least one fruit or seed",
            gall: "Deformed plant tissue outgrowth caused by a parasitic organism",
            green_leaves: "At least one green leaf or needle (or reddish if this is the normal healthy color)",
            hair: "Hair that is no longer attached to the organism from which it originated",
            leafmine: "Evidence of feeding between the dermal layers of a leaf",
            male: "Evidence indicates that organism can produce sperm for use in sexual reproduction",
            molt: "Discarded skin or exoskeleton",
            no_evidence_of_flowering: "Media provides no evidence of reproductive structures",
            no_flowers_or_fruits: "No flowers, fruits, or seeds (in whole or part) are visible",
            no_live_leaves: "No breaking leaf buds or green or colored leaves or needles are visible",
            not_established: "Organism belongs to an unestablished population including released/escaped pets, hitch-hikers and vagrants.",
            organism: "Whole or partial organism",
            scat: "Fecal matter (not owl pellets or other regurgitated matter)",
            teneral: "Adult that has recently emerged but has not yet achieved its final adult form",
            track: "Impression in ground or snow made by organism"
        },
        controlled_term_labels: {
            adult: "Adult",
            alive: "Alive",
            alive_or_dead: "Alive or Dead",
            any_alive_or_dead: "Any",
            any_evidence_of_presence: "Any",
            any_flowers_and_fruits: "Any",
            any_leaves: "Any",
            any_life_stage: "Any",
            any_plant_phenology: "Any",
            any_sex: "Any",
            bone: "Bone",
            breaking_leaf_buds: "Breaking Leaf Buds",
            budding: "Budding",
            cannot_be_determined: "Cannot Be Determined",
            colored_leaves: "Colored Leaves",
            construction: "Construction",
            dead: "Dead",
            egg: "Egg",
            established: "Established",
            evidence_of_presence: "Evidence of Presence",
            feather: "Feather",
            female: "Female",
            flower_budding: "Flower Budding",
            flower_buds: "Flower Buds",
            flowering: "Flowering",
            flowers: "Flowers",
            flowers_and_fruits: "Flowers and Fruits",
            fruiting: "Fruiting",
            fruits_or_seeds: "Fruits or Seeds",
            gall: "Gall",
            green_leaves: "Green Leaves",
            hair: "Hair",
            juvenile: "Juvenile",
            larva: "Larva",
            leafmine: "Leafmine",
            leaves: "Leaves",
            life_stage: "Life Stage",
            male: "Male",
            molt: "Molt",
            no_evidence_of_flowering: "No Evidence of Flowering",
            no_flowers_or_fruits: "No Flowers or Fruits",
            no_live_leaves: "No Live Leaves",
            not_established: "Not Established",
            nymph: "Nymph",
            organism: "Organism",
            plant_phenology: "Plant Phenology",
            pupa: "Pupa",
            scat: "Scat",
            sex: "Sex",
            subimago: "Subimago",
            teneral: "Teneral",
            track: "Track"
        },
        convert: "Convert",
        coords_viewable_for_proj_desc: 'Only show observations in this project where you can see the "true"\ncoordinates, including unobscured observations, obscured observations by\npeople who trust you, obscured observations by people who trust this\nproject with anything, and observations obscured by threatened taxa by\npeople who only trust this project to view observations that were\nobscured by threatened taxa.\n',
        coords_viewable_for_proj_label: "Only w/ full coordinates",
        "copied!": "Copied!",
        copy_to_clipboard: "Copy to clipboard",
        copyright: {
            some_rights_reserved: "some rights reserved",
            some_rights_reserved_by: "(c) %{name}, some rights reserved (%{license_short})",
            all_rights_reserved: "(c) %{name}, all rights reserved",
            no_known_copyright_restrictions: "%{name}, no known copyright restrictions (%{license_name})",
            no_known_copyright_restrictions_text: "no known copyright restrictions",
            no_rights_reserved: "no rights reserved",
            no_rights_reserved_by: "%{name}, no rights reserved (%{license_name})",
            anonymous: "anonymous",
            public_domain: "public domain",
            copyright: "copyright",
            no_copyright: "no copyright (CC0)",
            attribution_noncommercial_sharealike_license: "Attribution-NonCommercial-ShareAlike License",
            attribution_noncommercial_license: "Attribution-NonCommercial License",
            attribution_noncommercial_noderivs_license: "Attribution-NonCommercial-NoDerivs License",
            attribution_license: "Attribution License",
            attribution_sharealike_license: "Attribution-ShareAlike License",
            attribution_noderivs_license: "Attribution-NoDerivs License",
            gnu_free_documentation_license: "GNU Free Documentation License"
        },
        copyright_info: "Copyright Info",
        copyright_info_and_more: "Copyright Info and More",
        copyright_infringement: "Copyright Infringement",
        copyright_infringement_desc: "Violates copyright law or was created by someone other than the observer and lacks attribution",
        create_an_atlas: "Create an Atlas",
        created_by: "Created by",
        critically_endangered: "Critically Endangered",
        csv: "CSV",
        cumulative_ids: "Cumulative IDs: %{count} of %{total}",
        curation: "Curation",
        curators: "Curators",
        current_flags: "Current Flags",
        custom_boundary: "Custom Boundary",
        customize_location: "Customize Location",
        danger_zone: "Danger Zone",
        dashboard: "Dashboard",
        data_deficient: "Data Deficient",
        data_quality: "Data Quality",
        data_quality_assessment: "Data Quality Assessment",
        data_transfer_consent_desc_html: "<p>\n  Some data privacy laws, like the European Union's General Data\n  Protection Regulation (GDPR), require explicit consent to transfer\n  personal information from their jurisdictions to other jurisdictions\n  where the legal protection of this information is not considered\n  adequate. As of\n  <a href=\"https://en.wikipedia.org/wiki/Max_Schrems#Schrems_II\">2020</a>,\n  the European Union no longer considers the United States to be a\n  jurisdiction that provides adequate legal protection of personal\n  information, specifically because of the possibility of the US government\n  surveilling data entering the US. It is possible other jurisdictions\n  may have the same opinion.\n</p>\n<p>\n  Using iNaturalist requires the storage of personal information like your\n  email address, all iNaturalist data is stored in the United States, and\n  we cannot be sure what legal jurisdiction you are in when you are using\n  iNaturalist, so in order to comply with privacy laws like the GDPR, you\n  must acknowledge that you understand and accept this risk and consent\n  to transferring your personal information to iNaturalist's servers in\n  the US.\n</p>\n<p>\n  To learn more about what information we collect and how we use it,\n  please see our\n  <a href='%{privacy_url}' target='_blank'>Privacy Policy</a>\n  and our <a href='%{terms_url}' target='_blank'>Terms of Use</a>.\n</p>\n<p>\n  There is no way to have an iNaturalist account without storing personal\n  information, so the only way to revoke this consent is to delete your\n  account.\n</p>\n",
        data_transfer_consent_desc_title: "About Personal Information Transfer Consent",
        data_transfer_consent_label: "I consent to allow my personal information to be transferred to the United\nStates of America\n",
        data_used: "Data used:",
        date: {
            abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            day_names_min: {
                1: "Su",
                2: "Mo",
                3: "Tu",
                4: "We",
                5: "Th",
                6: "Fr",
                7: "Sa"
            },
            formats: {
                compact: "%b %e",
                long: "%B %-d, %Y",
                month_day_year: "%B %-d, %Y",
                month_year: "%B %Y"
            },
            month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        date_: "Date",
        date_added: "Date Added",
        date_authorized: "Date Authorized",
        date_format: {
            month: {
                january: "January",
                february: "February",
                march: "March",
                april: "April",
                may: "May",
                june: "June",
                july: "July",
                august: "August",
                september: "September",
                october: "October",
                november: "November",
                december: "December"
            }
        },
        date_is_accurate: "Date is accurate",
        date_obscured_notice: "Date obscured to protect personal or organism privacy",
        date_observed: "Date observed",
        date_observed_: "Date Observed",
        date_picker: {
            closeText: "Close",
            currentText: "Today",
            prevText: "Prev",
            nextText: "Next",
            range: "Range"
        },
        date_specified: "Date specified",
        date_time: "Date/Time",
        date_to_date: "%{d1} - %{d2}",
        date_updated: "Date Updated",
        datetime: {
            countdown_x_days: {
                one: "DAY",
                other: "DAYS"
            },
            countdown_x_hours: {
                one: "HOUR",
                other: "HOURS"
            },
            countdown_x_minutes: {
                one: "MIN",
                other: "MINS"
            },
            countdown_x_seconds: {
                one: "SEC",
                other: "SECS"
            },
            distance_in_words: {
                x_days: {
                    one: "%{count} day",
                    other: "%{count} days"
                }
            }
        },
        decrease_brightness: "Decrease Brightness",
        default: "default",
        default_: "Default",
        default_display_time_zone: "Default display time zone",
        default_observation_license: "Default observation license",
        default_photo_license: "Default photo license",
        default_search_place: "Default Search Place",
        default_search_place_description: "This will be your default place for all searches in Explore and Identify.\n",
        default_sound_license: "Default sound license",
        delete: "Delete",
        delete_your_account: "Delete your account",
        deleted_user: "deleted user",
        deleting: "Deleting...",
        deleting_verb: "Deleting",
        desc: "Desc",
        descending: "Descending",
        description_slash_tags: "Description / Tags",
        details: "Details",
        did_you_mean: "Did you mean",
        disagree_: "Disagree",
        disagreements: "Disagreements",
        disagreements_show_observations_that: "Show observations that have disagreeing identifications",
        disconnect: "Disconnect",
        disconnect_caps: "DISCONNECT",
        disconnect_provider: "Disconnect %{provider}",
        discoveries: "Discoveries",
        display_monthly_supporter_badge: "Display Monthly Supporter Badge on profile",
        display_name: "Display Name",
        display_name_description: "This is the name that will be displayed on your profile as well as for copyright attribution",
        do_not_show_this_message_again: "Do not show this message again",
        doh_something_went_wrong: "D'oh, something went wrong.",
        doh_something_went_wrong_error: "D'oh, something went wrong: %{error}",
        donate_again_caps: "DONATE AGAIN",
        donate_again_today_caps: "DONATE AGAIN TODAY",
        donate_to_inaturalist: "Donate to iNaturalist",
        done: "Done",
        download: "Download",
        download_caps: "DOWNLOAD",
        drag_and_drop_some_photos_or_sounds: "Drag & drop some photos or sounds",
        draw_circular_boundary: "Draw circular boundary",
        draw_rectangular_boundary: "Draw rectangular boundary",
        drop_it: "Drop it",
        duplicate_observation_flag_warning: "For duplicate observations, please ask the observer to address the issue\ninstead of adding a flag, because site curators cannot remove observations.\n",
        duplicate_verb: "Duplicate",
        earliest_added: "Earliest Added",
        edit: "Edit",
        edit_atlas: "Edit Atlas",
        edit_license: "Edit License",
        edit_multiple_dates: "Edit Multiple Dates",
        edit_multiple_descriptions: "Edit Multiple Notes",
        edit_multiple_locations: "Edit Multiple Locations",
        edit_multiple_species: "Edit Multiple Species",
        edit_photos: "Edit Photos",
        edit_project: "Edit Project",
        edit_taxon: "Edit Taxon",
        edit_your_default_settings: "Edit Your Default Settings",
        edit_your_global_project_settings: "Edit Your Global Project Settings",
        edit_your_settings_for_this_project: "Edit Your Settings For This Project",
        editing_observations: {
            one: 'Editing <span class="count">1</span> observation:',
            other: 'Editing <span class="count">%{count}</span> observations:'
        },
        eligible_for_research_grade: "Eligible for Research Grade",
        email: "Email",
        email_description: "Your email is not shared with other users on iNaturalist",
        email_notifications: "Email Notifications",
        encompassing_places: "Encompassing Places",
        end: "End",
        end_date_time: "End Date / Time",
        endangered: "Endangered",
        endemic: "Endemic",
        endemic_to_x: "Endemic to %{x}",
        establishment: {
            endemic: "Endemic",
            establishment: "Establishment",
            introduced: "Introduced",
            invasive: "Invasive",
            managed: "Managed",
            native: "Native",
            naturalised: "Naturalised"
        },
        establishment_means: "Establishment Means",
        event_in_progress: "Event in progress",
        everyone_: "Everyone",
        evidence_of_organism: "Evidence of organism",
        evidence_related_to_single_subject: "Evidence related to a single subject",
        exact: "Exact",
        exact_date: "Exact Date",
        examples_of_ranking_organizations: "Examples of Ranking Organizations",
        except: "except",
        exclude__taxon: "Exclude",
        exclude_places: "Exclude Places",
        exclude_projects: "Exclude Projects",
        exclude_taxa: "Exclude Taxa",
        exclude_users: "Exclude Users",
        excluding_x_taxa: {
            zero: "Excluding %{count} taxa",
            one: "Excluding %{count} taxon",
            few: "Excluding %{count} taxa",
            many: "Excluding %{count} taxa",
            other: "Excluding %{count} taxa"
        },
        exclusion_filters: "Exclusion Filters",
        exit_full_screen: "Exit Full Screen",
        expected_nearby: "Expected Nearby",
        export: "Export",
        export_observations: "Export Observations",
        exporting: "Exporting...",
        external_applications: "External Applications",
        external_applications_description: "External Applications are third-party software applications that you have\nauthorized to access your iNaturalist account on your behalf. In general,\nthey can do everything with your account that you can, so make sure you\ntrust the app developers before granting them permission.\n",
        extinct: "extinct",
        extinct_in_the_wild: "Extinct in the Wild",
        facebook: "Facebook",
        failed_to_find_your_location: "Failed to find your location.",
        failed_to_save_record: "Failed to save record. Please try again later.",
        faves: "Faves",
        favorite_projects: "Favorite Projects",
        favorite_projects_desc: "Choose up to seven projects that appear as links in the header. Updates\nwill appear after refreshing the page.\n",
        favorites: "Favorites",
        feature_this_project_: "Feature This Project",
        featured: "Featured",
        featuring: "Featuring",
        fewer__context_places: "Fewer",
        fields_: "Fields",
        fill_out_project_observation_fields: "Fill out project observation fields",
        filter_by_place: "Filter by Place",
        filter_by_species: "Filter by species",
        filter_by_taxon: "Filter by Taxon",
        filters: "Filters",
        find: "Find",
        find_observations: "Find observations",
        find_photos: "Find Photos",
        find_your_current_location: "Find your current location",
        finished: "Finished",
        finished_with_page: "Finished With Page",
        flag: "Flag",
        flag_an_item: "Flag An Item",
        flag_as_inappropriate: "Flag As Inappropriate",
        flag_for_curation: "Flag for Curation",
        flag_this_observation: "Flag This Observation",
        flag_this_photo: "Flag This Photo",
        flag_this_sound: "Flag This Sound",
        flagged_: "Flagged",
        flagging_desc: "Flagging brings something to the attention of volunteer site curators.\nPlease don't flag problems you can address with identifications, the Data\nQuality Assessment, or by talking to the person who made the content.\n",
        flags_with_count: "Flags (%{count})",
        flickr_has_no_creative_commons: "Flickr has no Creative Commons-licensed photos from this place.",
        fluid_layout: "Fluid Layout",
        follow: "Follow",
        follow_observation: "Follow observation",
        follow_user: "Follow %{user}",
        following: "Following",
        frequency: "Frequency",
        from_flickr_etc: "From Flickr, etc.",
        from_soundcloud: "From Soundcloud",
        full_screen: "Full screen",
        fungi: {
            one: "fungus",
            other: "fungi"
        },
        gbif: "GBIF",
        gbif_occurrences: "GBIF Occurrences",
        generate_your_stats: "Generate Your Stats",
        geo_score: "Geo score",
        geomodel_expected_nearby_label_is_derived: 'The "Expected Nearby" label is derived from the Geomodel.\n<a href="%{url}">Learn more about the Geomodel here</a>.\n',
        geoprivacy: "Geoprivacy",
        geoprivacy_is_obscured: "Geoprivacy is obscured",
        geoprivacy_is_obscured_desc: "Observer has chosen to obscure the coordinates.",
        geoprivacy_is_private: "Geoprivacy is private",
        geoprivacy_is_private_desc: "Observer has chosen to hide the coordinates.",
        geospatial: "Geospatial",
        get_started: "Get Started",
        give_monthly_caps: "GIVE MONTHLY",
        give_now_caps: "GIVE NOW",
        globally: "Globally",
        go: "Go",
        go_back: "Go back",
        going_to_your_observations: "Going to your observations...",
        good_choice_for_sharing: "Good choice for sharing with scientists",
        google: "Google",
        google_maps_not_loaded_error: "Google Maps did not initialize. You may have blocked access to Google Maps\nwith a browser extension or firewall, or something else is blocking\naccess like an Internet Service Provider.\n",
        grid: "Grid",
        grid_layout: "Grid Layout",
        grid_tooltip: "Show grid view",
        grouping: "Grouping",
        "guess_location_from_other_observations?": "Guess location from other observations?",
        has_id_supported_by_two_or_more: "Has ID supported by two or more",
        has_one_or_more_faves: "Has One or More Faves",
        has_photo: "Has Photo",
        has_photo_and_sound: "Has Both Photo and Sound",
        has_photos: "Has Photos",
        has_photos_or_sounds: "Has Photos or Sounds",
        has_sound: "Has Sound",
        has_sounds: "Has Sounds",
        heads_up: "Heads up",
        help: "Help",
        here_are_our_top_species_suggestions: "Here are our top species suggestions",
        here_are_our_top_suggestions: "Here are our top suggestions",
        hide: "Hide",
        hide_content: "Hide Content",
        hide_desc: "Hiding content will remove it from public view, but people will still be\nable to see that something was hidden, and site curators and the author of\nthe content will still be able to see the hidden content. Hidden\nidentifications will not contribute to an observation's Community Taxon.\n",
        hide_desc_staff_can_unhide: "Only site staff can unhide content once it has been hidden, so only use this\nfor clear violations of the Community Guidelines.\n",
        hide_no_annotation: 'Hide "No Annotation"',
        hide_observations_with_private_locations: "Hide observations with private locations",
        hide_running_total: "Hide Running Total",
        hide_uncountable_species: "Hide Uncountable Species",
        high: "High",
        history: "History",
        hours_to_adjust: "Hours to Adjust:",
        however_not_licensed: "However, it is not licensed for re-use and will not be shared with data\nrepositories that respect license choices.\n",
        however_not_licensed_action_html: 'You can change your license preferences in your\n<a class="linky" href="/users/edit#content">account settings</a>.\n',
        i18n: {
            inflections: {
                "@gender": {
                    m: "male",
                    f: "female",
                    n: "neuter",
                    application: "@n",
                    assessment_section: "@n",
                    atlas: "@n",
                    check_list: "@n",
                    class: "@n",
                    comment: "@n",
                    complex: "@n",
                    epifamily: "@n",
                    family: "@n",
                    favorite: "@n",
                    flag: "@n",
                    form: "@n",
                    genus: "@n",
                    genushybrid: "@n",
                    hybrid: "@n",
                    identification: "@n",
                    infraclass: "@n",
                    infraorder: "@n",
                    journal: "@n",
                    listed_taxon: "@n",
                    note: "@n",
                    observation: "@n",
                    observation_field: "@n",
                    order: "@n",
                    phylum: "@n",
                    place: "@n",
                    post: "@n",
                    profile: "@n",
                    project: "@n",
                    section: "@n",
                    species: "@n",
                    subclass: "@n",
                    subfamily: "@n",
                    subgenus: "@n",
                    suborder: "@n",
                    subphylum: "@n",
                    subsection: "@n",
                    subspecies: "@n",
                    subtribe: "@n",
                    superclass: "@n",
                    superfamily: "@n",
                    superorder: "@n",
                    supertribe: "@n",
                    taxon: "@n",
                    taxon_change: "@n",
                    taxon_drop: "@n",
                    taxon_link: "@n",
                    taxon_merge: "@n",
                    taxon_split: "@n",
                    taxon_stage: "@n",
                    taxon_swap: "@n",
                    tribe: "@n",
                    variety: "@n",
                    default: "@n"
                },
                "@iconic_taxon": {
                    Animalia: "Animalia",
                    Actinopterygii: "Actinopterygii",
                    Aves: "Aves",
                    Reptilia: "Reptilia",
                    Amphibia: "Amphibia",
                    Mammalia: "Mammalia",
                    Arachnida: "Arachnida",
                    Insecta: "Insecta",
                    Plantae: "Plantae",
                    Fungi: "Fungi",
                    Protozoa: "Protozoa",
                    Mollusca: "Mollusca",
                    Chromista: "Chromista"
                },
                "@vow_or_con": {
                    vow: "vowel",
                    con: "consonant",
                    a: "@vow",
                    e: "@vow",
                    i: "@vow",
                    o: "@vow",
                    u: "@vow",
                    default: "@con"
                }
            }
        },
        i_dont_know_but_i_am_sure_this_is_taxon: "I don't know but I am sure this is %{taxon}",
        id_categories: {
            tooltips: {
                improving: "First suggestion of this taxon that the community agrees with. This\nhelps refine the community taxon.\n",
                leading: "Taxon descends from the community taxon. This identification could be leading toward the\nright answer.\n",
                maverick: "Taxon is not a descendant or ancestor of the community taxon, i.e. the community does not\nagree with this taxon.\n"
            }
        },
        id_withdrawn: "ID Withdrawn",
        identifications: "Identifications",
        identifiers: "Identifiers",
        identify: "Identify",
        identify_observations: "Identify Observations",
        identify_title: "Identify",
        ids_by_taxon: "IDs By Taxon",
        ids_made_for_others__title: "IDs Made for Others",
        if_for_some_reason_a_user_doesnt_agree: "If for some reason you don't agree with the community taxon, you can reject it,\nwhich means your ID is the one used for linking to other observations, updating life lists,\netc. It also means your observation can only become research grade when the community agrees\nwith you.\n",
        ignore_and_continue: "Ignore and continue",
        image_size_control: "Image size control",
        imperiled: "Imperiled",
        import: "Import",
        improving: "Improving",
        in_progress: "in progress",
        in_the_past_week: "In the past week",
        inactive_taxon: "Inactive Taxon",
        inappropriate: "Inappropriate",
        inappropriate_content: "Inappropriate content?",
        inat_next: "iNatNext",
        inaturalist_activity_notifications: "%{site_name} Activity Notifications",
        inaturalist_applications: "iNaturalist Applications",
        inaturalist_network_affiliation: "iNaturalist Network Affiliation",
        inaturalist_updated_the_id_suggested_by_user: "iNaturalist updated the ID suggested by %{user}",
        include__taxon: "Include",
        include_places: "Include Places",
        include_projects: "Include Projects",
        include_slash_exclude_ancestor_taxa: "Include / Exclude Ancestor Taxa",
        include_suggestions_not_expected_nearby: "Include suggestions not expected nearby",
        include_taxa: "Include Taxa",
        include_users: "Include Users",
        including: "including",
        increase_brightness: "Increase Brightness",
        info: "Info",
        infraspecies_ids: "Infraspecies IDs",
        infraspecies_ids_description: "If you turn this off, you will no longer be notified about IDs of taxa\nbelow species-level (like subspecies and varieties) that agree with your\nspecies-level ID. You will be notified if they disagree with your ID or\nif they contain additional remarks.\n",
        input_taxon: "Input taxon",
        insect_life_stage: "Insect Life Stage",
        insects: "insects",
        insert_a_quote: "Insert a quote",
        interactions: "Interactions",
        introduced: "Introduced",
        introduced_in_place: "Introduced in %{place}",
        iphone: "iPhone",
        is_the_evidence_provided_enough_to_confirm_this_is_taxon: "Is the evidence provided enough to confirm this is %{taxon}?",
        it_can_now_be_used_for_research: "It can now be used for research and featured on other websites",
        italic_text: "italic text",
        item_flagged_notice_html: 'This has been flagged as spam and is no longer\npublicly visible. You can see it because you created it, or you are a\nsite curator. If you think this is a mistake, please\n<a href="mailto:%{help_email}" class="contact">contact us</a>.\n<a href="%{manage_flags_path}">Manage flags</a>\n',
        join: "Join",
        join_project: "Join this project",
        join_this_project: "Join this project",
        "joined!": "Joined!",
        journal: "Journal",
        keep_editing: "Keep editing",
        keyboard_shortcuts: "Keyboard Shortcuts",
        kml_file_size_error: "KML must be less than 1 MB in size",
        label_colon: "%{label}:",
        labels: "Labels",
        language_slash_locale: "Language/Locale",
        language_slash_locale_description: "This sets your language and date formatting preferences across iNaturalist based on your locale. Changes will take effect once the page is refreshed.",
        language_slash_type: "Language / Type",
        large: "large",
        last_edited_by: "Last edited by",
        last_observation_caps: "LAST OBSERVATION",
        last_year: "Last Year",
        lat: "Lat",
        latitude: "Latitude",
        latlon: "Lat/Lon",
        layers: "Layers",
        leaderboard: "Leaderboard",
        leading: "Leading",
        learn_more: "Learn More",
        learn_what_these_licenses_mean: "Learn what these licenses mean",
        least_concern: "Least Concern",
        leave: "Leave",
        leave_a_comment: "Leave a comment",
        less: "Less",
        less__context_text: "Less",
        lexicons: {
            afrikaans: "Afrikaans",
            alabama: "Alabama",
            albanian: "Albanian",
            aou_4_letter_codes: "AOU 4-Letter Codes",
            aou_6_letter_codes: "AOU 6-Letter Codes",
            arabic: "Arabic",
            armenian: "Armenian",
            asturian: "Asturian",
            basque: "Basque",
            belarusian: "Belarusian",
            bengali: "Bengali",
            bikol: "Bikol",
            bulgarian: "Bulgarian",
            carolinian: "Carolinian",
            catalan: "Catalan",
            cebuano: "Cebuano",
            chinese_simplified: "Chinese (simplified)",
            chinese_traditional: "Chinese (traditional)",
            chuvash: "Chuvash",
            creole_french: "creole (French)",
            creole_portuguese: "creole (Portuguese)",
            croatian: "Croatian",
            czech: "Czech",
            danish: "Danish",
            davawenyo: "Davawenyo",
            dutch: "Dutch",
            english: "English",
            esperanto: "Esperanto",
            estonian: "Estonian",
            faroese: "Faroese",
            fijian: "Fijian",
            finnish: "Finnish",
            french: "French",
            galician: "Galician",
            gela: "Gela",
            georgian: "Georgian",
            german: "German",
            greek: "Greek",
            gujarati: "Gujarati",
            hawaiian: "Hawaiian",
            hebrew: "Hebrew",
            herero: "Herero",
            hiligaynon: "Hiligaynon",
            hill_mari: "Hill Mari",
            hodges_number: "Hodges Number",
            hokkien: "Hokkien",
            hungarian: "Hungarian",
            icelandic: "Icelandic",
            ilokano: "Ilokano",
            indonesian: "Indonesian",
            irish: "Irish",
            italian: "Italian",
            japanese: "Japanese",
            kannada: "Kannada",
            kazakh: "Kazakh",
            korean: "Korean",
            kweyol: "Kw\xe9y\xf2l",
            latvian: "Latvian",
            lithuanian: "Lithuanian",
            lozi: "Lozi",
            luxembourgish: "Luxembourgish",
            malagasy: "Malagasy",
            malay: "Malay",
            malayalam: "Malayalam",
            maltese: "Maltese",
            maori: "Maori",
            marathi: "Marathi",
            maya: "Maya",
            misima_paneati: "Misima-paneati",
            mongolian: "Mongolian",
            nahuatl: "Nahuatl",
            navajo: "Navajo",
            ndebele: "Ndebele",
            norwegian: "Norwegian",
            occitan: "Occitan",
            ojibwe: "Ojibwe",
            palauan: "Palauan",
            pangasinan: "Pangasinan",
            persian: "Persian",
            polish: "Polish",
            portuguese: "Portuguese",
            romanian: "Romanian",
            russian: "Russian",
            santali: "Santali",
            scientific_names: "Scientific Names",
            serbian: "Serbian",
            shona: "Shona",
            sinhala: "Sinhala",
            slovak: "Slovak",
            slovenian: "Slovenian",
            sotho: "Sotho",
            sotho_northern: "Sotho (Northern)",
            spanish: "Spanish",
            swahili: "Swahili",
            swati: "Swati",
            swedish: "Swedish",
            tagalog: "Tagalog",
            tahitian: "Tahitian",
            tamil: "Tamil",
            thai: "Thai",
            tokelauan: "Tokelauan",
            totonaco: "Totonaco",
            tsonga: "Tsonga",
            tswana: "Tswana",
            turkish: "Turkish",
            u_s_d_a_symbol: "U.S.D.A. Symbol",
            ukrainian: "Ukrainian",
            uyghur: "Uyghur",
            venda: "Venda",
            vermont_flora_codes: "Vermont Flora Codes",
            vietnamese: "Vietnamese",
            visayan: "Visayan",
            waray_waray: "Waray-Waray",
            xhosa: "Xhosa",
            zapoteco: "Zapoteco",
            zulu: "Zulu"
        },
        licensing: "Licensing",
        life: "Life",
        life_list: "%{user}'s Life List",
        linear_scale_label: "Linear",
        linked_text: "linked text",
        list: "List",
        list_tooltip: "Show list view",
        list_with_n_items: "%{one}, %{two}, and %{three}",
        list_with_two_items: "%{one} and %{two}",
        listed_taxa: "Listed Taxa",
        lists: "Lists",
        loading: "Loading...",
        loading_metadata: "Loading metadata...",
        loading_suggestions: "Loading suggestions...",
        locales: {
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            br: "Breton",
            ca: "Catalan",
            cs: "Czech",
            da: "Danish",
            de: "German",
            el: "Greek",
            en: "English",
            "en-GB": "English (UK)",
            eo: "Esperanto",
            es: "Spanish",
            "es-AR": "Spanish (Argentina)",
            "es-CO": "Spanish (Colombia)",
            "es-CR": "Spanish (Costa Rica)",
            "es-MX": "Spanish (Mexico)",
            et: "Estonian",
            eu: "Basque",
            fi: "Finnish",
            fr: "French",
            "fr-CA": "French (Canada)",
            gl: "Galician",
            he: "Hebrew",
            hr: "Croatian",
            hu: "Hungarian",
            id: "Indonesian",
            it: "Italian",
            ja: "Japanese",
            ka: "Georgian",
            kk: "Kazakh",
            kn: "Kannada",
            ko: "Korean",
            lb: "Luxembourgish",
            lt: "Lithuanian",
            lv: "Latvian",
            mi: "Maori",
            mk: "Macedonian",
            ml: "Malayalam",
            mr: "Marathi",
            nb: "Norwegian Bokm\xe5l",
            nl: "Dutch",
            oc: "Occitan",
            pl: "Polish",
            pt: "Portuguese",
            "pt-BR": "Portuguese (Brazil)",
            ru: "Russian",
            sat: "Santali",
            sk: "Slovak",
            sl: "Slovenian",
            sq: "Albanian",
            sr: "Serbian",
            sv: "Swedish",
            ta: "Tamil",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            "zh-CN": "Chinese (simplified)",
            "zh-TW": "Chinese (traditional)"
        },
        locality_notes: "Locality notes",
        location: "Location",
        location_is_accurate: "Location is accurate",
        location_is_obscured: "Location is obscured",
        location_is_private: "Location is private",
        location_is_public: "Location is public",
        location_private: "Location Private",
        location_specified: "Location specified",
        location_unknown: "Missing Location",
        lock_zoom_level: "Lock zoom level",
        log_in_or_sign_up_to_add_comments_html: '<a href="/login">Log in</a> or <a href="/signup">sign up</a> to add comments.\n',
        log_in_or_sign_up_to_add_identifications_html: '<a href="/login">Log in</a> or <a href="/signup">sign up</a> to add identifications.\n',
        log_out: "Log out",
        log_out_caps: "LOG OUT",
        log_out_of_application: "Log out of %{site_name}?",
        log_scale_label: "Log",
        long: "Lon",
        longitude: "Longitude",
        lookup: "Lookup",
        low: "Low",
        make_private: "Make private",
        make_this_your_default_license: "Make this your default %{type} license",
        mammals: "mammals",
        manage_names: "Manage Names",
        manage_your_relationships: "Manage your relationships",
        map: "Map",
        map_legend: "Map Legend",
        map_marker_size: "map marker size",
        map_of_observations: "Map of Observations",
        map_tooltip: "Show map view",
        maps: {
            overlays: {
                all_observations: "All observations",
                every_publicly_visible_observation: "Every publicly visible observation created in the iNaturalist network",
                featured_observations: "Featured observations",
                gbif_network: "GBIF network",
                gbif_network_description2: "Records from museums and other occurrence providers distributed by the Global Biodiversity Information Facility",
                observations: "Observations",
                place_boundary: "Place boundary",
                checklist_places: "Checklist places",
                checklist_places_description: "Places where this taxon has been listed",
                range: "Range"
            }
        },
        mark_all_as_reviewed: "Mark All As Reviewed",
        mark_all_as_unreviewed: "Mark All As Unreviewed",
        mark_as_reviewed: "Mark As Reviewed",
        mark_as_reviewed_desc: "Marking an observation as reviewed means you will not see it again by\ndefault in Identify. It will still be visible to other people in Identify.\n",
        maverick: "Maverick",
        maximum_positional_accuracy: "Maximum positional accuracy",
        media: "Media",
        media_and: "and",
        media_type: "Media Type",
        members: "Members",
        messages: "Messages",
        misidentifications: "Misidentifications",
        misleading_or_illegal_content_html: 'Misleading or illegal content, racial or ethnic slurs, etc. For more on\nour definition of "appropriate," see the\n<a href="/help#inappropriate">FAQ</a>.\n',
        missing_date: "Missing Date",
        mobile: "Mobile",
        mollusks: "mollusks",
        momentjs: {
            shortRelativeTime: {
                future: "in %s",
                past: "%s",
                s: "1s",
                m: "1min",
                mm: "%dm",
                h: "1h",
                hh: "%dh",
                d: "1d",
                dd: "%dd",
                M: "1mo",
                MM: "%dmo",
                y: "1y",
                yy: "%dy"
            },
            datetime_with_zone: "MMM D, YYYY \xb7 LT z",
            datetime_with_zone_no_year: "MMMM D, h:mma z",
            datetime_with_offset: "MMM D, YYYY \xb7 LT Z",
            date_long: "MMMM D, YYYY",
            date_long_without_year: "MMMM D",
            time_hours: "h:mm a",
            month_year: "MMMM YYYY",
            month_year_short: "MMM 'YY"
        },
        monthly_supporter_since_date_html: '<a href="%{url}">Monthly Supporter</a> since %{date}\n',
        monthly_supporters: "Monthly Supporters",
        months: "Months",
        more: "More",
        more__context_observations_caps: "MORE",
        more__context_places: "More",
        more__context_text: "More",
        more__context_translators_caps: "MORE",
        more_caps: "MORE",
        more_filters: "More Filters",
        more_from_x: "More from %{x}",
        more_import_options: "More Import Options",
        more_info: "More Info",
        more_info_title: "More Info",
        more_photos: "More Photos",
        more_than_a_week_ago: "More than a week ago",
        most_comments_and_faves: "Most Comments and Faves",
        most_observations: "Most Observations",
        most_observed_introduced_species: "Most Observed Introduced Species",
        most_observed_species: "Most Observed Species",
        most_observed_threatened_species: "Most Observed Threatened Species",
        most_recent_observation_by_date_observed: "Most recent verifiable observation by date observed",
        most_species: "Most Species",
        multiple: "multiple",
        multiple_select_option: "-- multiple --",
        must_be_observed_after: "must be observed after %{operand}",
        must_be_observed_before: "must be observed before %{operand}",
        mute: "Mute",
        muted_users: "Muted Users",
        muting_description: 'Muting someone prevents you from being notified about any of their activity, including "@" mentions, messages, or comments and identifications on your observations.',
        name: "Name",
        name_or_slug: "Name or URL slug, e.g. my-project",
        names: "Names",
        native: "native",
        native_to_place: "Native to %{place}",
        near_threatened: "Near Threatened",
        nearby_observations_: "Nearby observations",
        needs_id: "needs ID",
        needs_id_: "Needs ID",
        needs_id_tooltip_html: '"Needs ID" observations have media, location, and a date, but still require community consensus on a precise identification. <a href="https://www.inaturalist.org/pages/help#quality">Learn more about quality grades</a>',
        new: "New",
        new_and_noteworthy: "New & Noteworthy",
        new_observation_field: "New observation field",
        new_observations: "New observations",
        new_observations_in_year: "New Observations In %{year}",
        new_password: "New Password",
        new_species_added_in_interval: "New Species Added In %{interval}",
        new_species_added_in_interval_x_of_y: "New Species Added In %{interval} (Showing %{x} of %{y})",
        new_users: "New Users",
        new_users_in_year: "New Users In %{year}",
        newly_added: "Newly Added",
        newly_added_species: "Newly Added Species",
        newly_observed_species: "Newly Observed Species",
        newly_observed_species_in_year: "Newly Added Species In %{year}",
        next_observation: "Next Observation",
        next_page: "Next page",
        next_page_short: "Next",
        next_photo: "Next Photo",
        next_tab: "Next Tab",
        next_taxon_short: "Next",
        no: "No",
        no_but_it_is_a_member_of_taxon: "No, but it is a member of %{taxon}",
        no_identifications: "No Identifications",
        no_ids_have_been_suggested_yet: "No IDs have been suggested yet",
        no_interaction_data_available: "No interaction data available",
        no_its_as_good_as_it_can_be: "No, it's as good as it can be",
        no_journal_posts_yet: "No journal posts yet",
        no_license_all_rights_reserved: "No license (all rights reserved)",
        no_matching_observations: "No matching observations.",
        no_matching_taxa: "No matching taxa",
        no_misidentifications_yet: "No misidentifications yet",
        no_more_results_found: "No more results found",
        no_more_taxa_to_load: "No more taxa to load!",
        no_observations: "No Observations",
        no_observations_from_this_place_yet: "No observations from this place yet.",
        no_observations_yet: "No observations yet",
        no_photo: "No Photo",
        no_photos: "No photos",
        no_places_available: "No places available",
        no_range_data_available: "No range data available.",
        no_relevant_annotations: "No Relevant Annotations",
        no_results_for: "No results for ",
        no_results_found: "No results found",
        no_sections_available: "No sections available.",
        no_suggestions_available: "No Suggestions Available",
        no_summary_from_wikipedia: "No summary from Wikipedia",
        no_users_found_with_those_filters: "No users found with those filters",
        non_disagreeing_ancestor_ids: "Non-disagreeing Ancestor IDs",
        non_disagreeing_ancestor_ids_description: "If you turn this off, you will no longer be notified when someone adds an\nID of a taxon that is an ancestor of the taxon from your ID and does not\nexplicitly disagree with the Community Taxon. You will be notified if the\nID has additional remarks.\n",
        none: "None",
        none_found: "None found",
        not_confident: "We're not confident enough to make a recommendation.",
        not_confident_top_suggestions: "We're not confident enough to make a recommendation, but here are our top suggestions",
        not_evaluated: "not evaluated",
        not_expected_nearby: "Not expected nearby",
        not_recorded: "Not recorded",
        notes: "Notes",
        notifications: "Notifications",
        notify_me_of_mentions: "Notify me of mentions (e.g. @username)",
        notify_me_of_mentions_description: "If you turn this off, you will not get any notifications when someone mentions you on %{site_name}.",
        number: {
            format: {
                delimiter: ",",
                separator: ".",
                si: {
                    giga: "%{number}G",
                    kilo: "%{number}k",
                    mega: "%{number}M"
                }
            }
        },
        number_selected: "# selected",
        obs: "Obs",
        obs_cid_d: "Obs CID'd",
        obs_id_d: "Obs ID'd",
        obscured: "Obscured",
        observation: "Observation",
        observation_: "observation",
        observation_accuracy_experiment_hide_additional_validators: "(hide additional validators)",
        observation_accuracy_experiment_show_additional_validators: "(show additional validators)",
        observation_attribution: "Observation by %{user}",
        observation_attribution_copyright_html: "Observation &copy; %{user}",
        observation_brief_taxon_from_place: "%{taxon} from %{place}",
        observation_date: "Date",
        observation_field_details: "Observation field details",
        observation_fields: "Observation Fields",
        observation_fields_by_preferences_description: "Observation fields are a bit like tags, except anyone can add them to your\nobservation by default. Change this if you'd prefer that only you can do\nthis, or only site curators.\n",
        observation_requirements: "Observation Requirements",
        observation_requirements_updated_at: "Observation requirements updated at",
        observation_without_media: "Observation without media",
        observations: "Observations",
        observations_: "observations",
        observations_annotated_with_annotation: "Observations annotated with %{annotation}",
        observations_by_category: "Observations By category",
        observations_can_only_have_n_photos: "Observations can only have %{limit} photos",
        observations_in_this_project_must: "Observations in this project must meet the following criteria",
        observations_map: "Observations / Map",
        observations_of_relatives: "Observations of relatives",
        observations_this_year_vs_last_year: "Observations This Year vs. Last Year",
        observations_total: "Observations Total",
        observations_with_this_field: "Observations with this field",
        observations_with_this_field_and_value: "Observations with this field and value",
        observations_without_media: "Observations w/o Media",
        observations_without_this_field: "Observations without this field",
        observed: "Observed",
        observed_on: "Observed on",
        observer_prefers_addition_to_traditional_projects_joined: "Observer only allows other people to add their observations to traditional\nprojects they have joined.\n",
        observer_prefers_no_traditional_project_addition: "Observer does not allow other people to add their observations to\ntraditional projects.\n",
        observers: "Observers",
        of_places: "places",
        of_this_taxon: "Of this taxon",
        off_caps: "OFF",
        offensive_inappropriate: "Offensive / Inappropriate",
        offset_time: "Offset Time",
        offset_time_verb: "Offset",
        ok: "OK",
        old_observation_form: "Old observation form (deprecated)",
        on_caps: "ON",
        only_view_nearby_suggestions: "Only view nearby suggestions",
        only_you: "Only you",
        open: "open",
        open_: "Open",
        open_street_map: "OpenStreetMap",
        or: "or",
        order_by: "Order by",
        organism_appears_captive_cultivated: "Organism Appears Captive / Cultivated",
        organism_is_wild: "Organism is wild",
        other: "Other",
        other_species_commonly_misidentified_as_this_species: "Other species commonly misidentified as this species",
        other_species_commonly_misidentified_as_this_species_in_place_html: 'Other species commonly misidentified as this species in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_complex: "Other taxa commonly misidentified as this complex",
        other_taxa_commonly_misidentified_as_this_complex_in_place_html: 'Other taxa commonly misidentified as this complex in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_genus: "Other taxa commonly misidentified as this genus",
        other_taxa_commonly_misidentified_as_this_genus_in_place_html: 'Other taxa commonly misidentified as this genus in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_genushybrid: "Other taxa commonly misidentified as this genushybrid",
        other_taxa_commonly_misidentified_as_this_genushybrid_in_place_html: 'Other taxa commonly misidentified as this genushybrid in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_hybrid: "Other taxa commonly misidentified as this hybrid",
        other_taxa_commonly_misidentified_as_this_hybrid_in_place_html: 'Other taxa commonly misidentified as this hybrid in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_rank: "Other taxa commonly misidentified as this %{rank}",
        other_taxa_commonly_misidentified_as_this_rank_in_place_html: 'Other taxa commonly misidentified as this %{rank} in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_section: "Other taxa commonly misidentified as this section",
        other_taxa_commonly_misidentified_as_this_section_in_place_html: 'Other taxa commonly misidentified as this section in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_species: "Other taxa commonly misidentified as this species",
        other_taxa_commonly_misidentified_as_this_species_in_place_html: 'Other taxa commonly misidentified as this species in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_subgenus: "Other taxa commonly misidentified as this subgenus",
        other_taxa_commonly_misidentified_as_this_subgenus_in_place_html: 'Other taxa commonly misidentified as this subgenus in <a href="%{url}">%{place}</a>',
        other_taxa_commonly_misidentified_as_this_subsection: "Other taxa commonly misidentified as this subsection",
        other_taxa_commonly_misidentified_as_this_subsection_in_place_html: 'Other taxa commonly misidentified as this subsection in <a href="%{url}">%{place}</a>',
        output_taxon: "Output taxon",
        overview: "Overview",
        password_change_logout_warning: "After you change your password, you will be signed out and you will need to sign in again with your new password.",
        per_day: "Per Day",
        per_month: "Per Month",
        per_week: "Per Week",
        person: "Person",
        photo: "Photo",
        photo_attribution: "Photo %{attribution}",
        photo_browser: "Photo Browser",
        photo_licensing: "Photo Licensing",
        photos_chosen_for_this_taxon: "Photos chosen for this taxon",
        photos_from: "Photos from",
        photos_locked: "Photos Locked",
        photos_locked_desc: "Only staff can change the default photos for this taxon",
        photos_of_taxon_html: "Photos of %{taxon}",
        photos_or_sounds: "Photos or sounds",
        pi_consent_desc_html: "<p>\n  We store personal information like usernames and email addresses in\n  order to manage accounts on this site, and to comply with privacy laws,\n  we need you to check this box to indicate that you consent to this use\n  of personal information. To learn more about what information we\n  collect and how we use it, please see our\n  <a href='%{privacy_url}' target='_blank'>Privacy Policy</a>\n  and our <a href='%{terms_url}' target='_blank'>Terms of Use</a>.\n</p>\n<p>\n  There is no way to have an iNaturalist account without storing personal\n  information, so the only way to revoke this consent is to delete your\n  account.\n</p>\n",
        pi_consent_desc_title: "About Personal Information",
        pi_consent_label: "I consent to allow iNaturalist to store and process limited kinds of\npersonal information about me in order to manage my account\n",
        pin_verb: "Pin",
        pinned_locations_desc: "Pin this combination of coordinates, accuracy, geoprivacy, and locality notes for later use.\n",
        place: "Place",
        place_autocomplete_placeholder: "Zion National Park, Miami, etc.",
        place_geo: {
            geo_planet_place_types: {
                Aggregate: "Aggregate",
                aggregate: "aggregate",
                Airport: "Airport",
                airport: "airport",
                Building: "Building",
                building: "building",
                Canton: "Canton",
                canton: "canton",
                "City Building": "City Building",
                "city building": "city building",
                Colloquial: "Colloquial",
                colloquial: "colloquial",
                Commune: "Commune",
                commune: "commune",
                Constituency: "Constituency",
                constituency: "constituency",
                Continent: "Continent",
                continent: "continent",
                Country: "Country",
                country: "country",
                County: "County",
                county: "county",
                Delegation: "Delegation",
                delegation: "delegation",
                Department_Segment: "Department Segment",
                department_segment: "department segment",
                District: "District",
                district: "district",
                Division: "Division",
                division: "division",
                Drainage: "Drainage",
                drainage: "drainage",
                Estate: "Estate",
                estate: "estate",
                Governorate: "Governorate",
                governorate: "governorate",
                Historical_County: "Historical County",
                historical_county: "historical county",
                Historical_State: "Historical State",
                historical_state: "historical state",
                Historical_Town: "Historical Town",
                historical_town: "historical town",
                Intersection: "Intersection",
                intersection: "intersection",
                Island: "Island",
                island: "island",
                Land_Feature: "Land Feature",
                land_feature: "land feature",
                Local_Administrative_Area: "Local Administrative Area",
                local_administrative_area: "local administrative area",
                Local_Authority: "Local Authority",
                local_authority: "local authority",
                Miscellaneous: "Miscellaneous",
                miscellaneous: "miscellaneous",
                Municipality: "Municipality",
                municipality: "municipality",
                Nationality: "Nationality",
                nationality: "nationality",
                Nearby_Building: "Nearby Building",
                nearby_building: "nearby building",
                Nearby_Intersection: "Nearby Intersection",
                nearby_intersection: "nearby intersection",
                Open_Space: "Open Space",
                open_space: "open space",
                Parish: "Parish",
                parish: "parish",
                Poblacion: "Poblacion",
                poblacion: "poblacion",
                Prefecture: "Prefecture",
                prefecture: "prefecture",
                Prefecture_City: "Prefecture City",
                prefecture_city: "prefecture city",
                Point_of_Interest: "Point of Interest",
                point_of_interest: "point of interest",
                Postal_Code: "Postal Code",
                postal_code: "postal code",
                Province: "Province",
                province: "province",
                Regency: "Regency",
                regency: "regency",
                Region: "Region",
                region: "region",
                Republic: "Republic",
                republic: "republic",
                Shire: "Shire",
                shire: "shire",
                Sports_Team: "Sports Team",
                sports_team: "sports team",
                State: "State",
                state: "state",
                Street: "Street",
                street: "street",
                Street_Segment: "Street Segment",
                street_segment: "street segment",
                Subdivision: "Subdivision",
                subdivision: "subdivision",
                Suburb: "Suburb",
                suburb: "suburb",
                Sum: "Sum",
                sum: "sum",
                Supername: "Supername",
                supername: "supername",
                Territory: "Territory",
                territory: "territory",
                Time_Zone: "Time Zone",
                time_zone: "time zone",
                Town: "Town",
                town: "town",
                Undefined: "Undefined",
                undefined: "undefined",
                Unknown: "Unknown",
                unknown: "unknown",
                Village_block: "Village block",
                village_block: "village block",
                Zone: "Zone",
                zone: "zone"
            }
        },
        placeholder: "Placeholder",
        places_added_by_members_of_the_community: "Places added by members of the community",
        places_maintained_by_site_admins: "Places maintained by site admins",
        places_name: {
            afghanistan: "Afghanistan",
            africa: "Africa",
            akrotiri_and_dhekelia: "Akrotiri and Dhekelia",
            aland: "\xc5land",
            albania: "Albania",
            algeria: "Algeria",
            american_samoa: "American Samoa",
            andorra: "Andorra",
            angola: "Angola",
            anguilla: "Anguilla",
            antarctica: "Antarctica",
            antigua_and_barbuda: "Antigua and Barbuda",
            argentina: "Argentina",
            armenia: "Armenia",
            aruba: "Aruba",
            asia: "Asia",
            australia: "Australia",
            austria: "Austria",
            azerbaijan: "Azerbaijan",
            bahamas: "Bahamas",
            bahrain: "Bahrain",
            bangladesh: "Bangladesh",
            barbados: "Barbados",
            belarus: "Belarus",
            belgium: "Belgium",
            belize: "Belize",
            benin: "Benin",
            bermuda: "Bermuda",
            bhutan: "Bhutan",
            bolivia: "Bolivia",
            bonaire_saint_eustatius_and_saba: "Bonaire, Saint Eustatius and Saba",
            bosnia_and_herzegovina: "Bosnia and Herzegovina",
            botswana: "Botswana",
            bouvet_island: "Bouvet Island",
            brazil: "Brazil",
            british_indian_ocean_territory: "British Indian Ocean Territory",
            british_virgin_islands: "British Virgin Islands",
            brunei: "Brunei",
            bulgaria: "Bulgaria",
            burkina_faso: "Burkina Faso",
            burundi: "Burundi",
            cambodia: "Cambodia",
            cameroon: "Cameroon",
            canada: "Canada",
            cape_verde: "Cape Verde",
            cayman_islands: "Cayman Islands",
            central_african_republic: "Central African Republic",
            central_america: "Central America",
            chad: "Chad",
            chile: "Chile",
            china: "China",
            christmas_island: "Christmas Island",
            clipperton_island: "Clipperton Island",
            cocos_islands: "Cocos Islands",
            colombia: "Colombia",
            commonwealth_of_the_northern_mariana_islands: "Commonwealth of the Northern Mariana Islands",
            comoros: "Comoros",
            cook_islands: "Cook Islands",
            costa_rica: "Costa Rica",
            cote_d_ivoire: "C\xf4te d'Ivoire",
            croatia: "Croatia",
            cuba: "Cuba",
            curacao: "Cura\xe7ao",
            cyprus: "Cyprus",
            czech_republic: "Czech Republic",
            democratic_republic_of_the_congo: "Democratic Republic of the Congo",
            denmark: "Denmark",
            djibouti: "Djibouti",
            dominica: "Dominica",
            dominican_republic: "Dominican Republic",
            east_timor: "East Timor",
            ecuador: "Ecuador",
            egypt: "Egypt",
            el_salvador: "El Salvador",
            equatorial_guinea: "Equatorial Guinea",
            eritrea: "Eritrea",
            estonia: "Estonia",
            ethiopia: "Ethiopia",
            europe: "Europe",
            falkland_islands: "Falkland Islands",
            faroe_islands: "Faroe Islands",
            fiji: "Fiji",
            finland: "Finland",
            france: "France",
            french_guiana: "French Guiana",
            french_polynesia: "French Polynesia",
            french_southern_territories: "French Southern Territories",
            gabon: "Gabon",
            gambia: "Gambia",
            georgia: "Georgia",
            germany: "Germany",
            ghana: "Ghana",
            gibraltar: "Gibraltar",
            greece: "Greece",
            greenland: "Greenland",
            grenada: "Grenada",
            guadeloupe: "Guadeloupe",
            guam: "Guam",
            guatemala: "Guatemala",
            guernsey: "Guernsey",
            guinea: "Guinea",
            guinea_bissau: "Guinea-Bissau",
            guyana: "Guyana",
            haiti: "Haiti",
            heard_island_and_mcdonald_islands: "Heard Island and McDonald Islands",
            honduras: "Honduras",
            hong_kong: "Hong Kong",
            hungary: "Hungary",
            iceland: "Iceland",
            india: "India",
            indonesia: "Indonesia",
            iran: "Iran",
            iraq: "Iraq",
            ireland: "Ireland",
            isle_of_man: "Isle of Man",
            israel: "Israel",
            italy: "Italy",
            jamaica: "Jamaica",
            japan: "Japan",
            jersey: "Jersey",
            jordan: "Jordan",
            kazakhstan: "Kazakhstan",
            kenya: "Kenya",
            kiribati: "Kiribati",
            korea: "Korea",
            kosovo: "Kosovo",
            kuwait: "Kuwait",
            kyrgyzstan: "Kyrgyzstan",
            laos: "Laos",
            latvia: "Latvia",
            lebanon: "Lebanon",
            lesotho: "Lesotho",
            liberia: "Liberia",
            libya: "Libya",
            liechtenstein: "Liechtenstein",
            lithuania: "Lithuania",
            luxembourg: "Luxembourg",
            macao: "Macao",
            macedonia: "Macedonia",
            madagascar: "Madagascar",
            malawi: "Malawi",
            malaysia: "Malaysia",
            maldives: "Maldives",
            mali: "Mali",
            malta: "Malta",
            marshall_islands: "Marshall Islands",
            martinique: "Martinique",
            mauritania: "Mauritania",
            mauritius: "Mauritius",
            mayotte: "Mayotte",
            mexico: "Mexico",
            micronesia: "Micronesia",
            moldova: "Moldova",
            monaco: "Monaco",
            mongolia: "Mongolia",
            montenegro: "Montenegro",
            montserrat: "Montserrat",
            morocco: "Morocco",
            mozambique: "Mozambique",
            myanmar: "Myanmar",
            namibia: "Namibia",
            nauru: "Nauru",
            nepal: "Nepal",
            netherlands: "Netherlands",
            new_caledonia: "New Caledonia",
            new_guinea: "New Guinea",
            new_zealand: "New Zealand",
            nicaragua: "Nicaragua",
            niger: "Niger",
            nigeria: "Nigeria",
            niue: "Niue",
            norfolk_island: "Norfolk Island",
            north_africa: "North Africa",
            north_america: "North America",
            north_korea: "North Korea",
            northern_cyprus: "Northern Cyprus",
            norway: "Norway",
            oceania: "Oceania",
            oman: "Oman",
            pakistan: "Pakistan",
            palau: "Palau",
            palestine: "Palestine",
            panama: "Panama",
            papua_new_guinea: "Papua New Guinea",
            paraguay: "Paraguay",
            peru: "Peru",
            philippines: "Philippines",
            pitcairn_islands: "Pitcairn Islands",
            poland: "Poland",
            portugal: "Portugal",
            puerto_rico: "Puerto Rico",
            qatar: "Qatar",
            republic_of_congo: "Republic of Congo",
            reunion: "Reunion",
            romania: "Romania",
            russia: "Russia",
            rwanda: "Rwanda",
            saint_barthelemy: "Saint-Barth\xe9lemy",
            saint_helena: "Saint Helena",
            saint_kitts_and_nevis: "Saint Kitts and Nevis",
            saint_lucia: "Saint Lucia",
            saint_martin: "Saint-Martin",
            saint_pierre_and_miquelon: "Saint Pierre and Miquelon",
            saint_vincent_and_the_grenadines: "Saint Vincent and the Grenadines",
            samoa: "Samoa",
            san_marino: "San Marino",
            sao_tome_and_principe: "Sao Tome and Principe",
            saudi_arabia: "Saudi Arabia",
            senegal: "Senegal",
            serbia: "Serbia",
            seychelles: "Seychelles",
            sierra_leone: "Sierra Leone",
            singapore: "Singapore",
            sint_maarten: "Sint Maarten",
            slovakia: "Slovakia",
            slovenia: "Slovenia",
            solomon_islands: "Solomon Islands",
            somalia: "Somalia",
            south_africa: "South Africa",
            south_america: "South America",
            south_georgia_and_the_south_sandwich_islands: "South Georgia and the South Sandwich Islands",
            south_korea: "South Korea",
            south_sudan: "South Sudan",
            spain: "Spain",
            sri_lanka: "Sri Lanka",
            sudan: "Sudan",
            suriname: "Suriname",
            svalbard_and_jan_mayen: "Svalbard and Jan Mayen",
            swaziland: "Swaziland",
            sweden: "Sweden",
            switzerland: "Switzerland",
            syria: "Syria",
            taiwan: "Taiwan",
            tajikistan: "Tajikistan",
            tanzania: "Tanzania",
            thailand: "Thailand",
            togo: "Togo",
            tokelau: "Tokelau",
            tonga: "Tonga",
            trinidad_and_tobago: "Trinidad and Tobago",
            tunisia: "Tunisia",
            turkey: "Turkey",
            turkmenistan: "Turkmenistan",
            turks_and_caicos_islands: "Turks and Caicos Islands",
            tuvalu: "Tuvalu",
            uganda: "Uganda",
            ukraine: "Ukraine",
            united_arab_emirates: "United Arab Emirates",
            united_kingdom: "United Kingdom",
            united_states: "United States",
            united_states_minor_outlying_islands: "United States Minor Outlying Islands",
            united_states_virgin_islands: "United States Virgin Islands",
            uruguay: "Uruguay",
            uzbekistan: "Uzbekistan",
            vanuatu: "Vanuatu",
            vatican_city: "Vatican City",
            venezuela: "Venezuela",
            vietnam: "Vietnam",
            virgin_islands: "Virgin Islands",
            wallis_and_futuna: "Wallis and Futuna",
            west_africa: "West Africa",
            western_sahara: "Western Sahara",
            yemen: "Yemen",
            zambia: "Zambia",
            zimbabwe: "Zimbabwe"
        },
        places_of_interest: "Places of Interest",
        plants: "plants",
        play_first_sound: "Play First Sound",
        please_allow_a_few_weeks_for_external_sites: "Please allow a few weeks for external sites to sync changes from this observation",
        "please_be_careful!": "Please Be Careful!",
        please_complete_the_following_to_add_project: "Please complete the following to add this observation to the project:\n",
        please_explain_why_you_want_to_hide_this: "Please explain why you are hiding this",
        please_explain_why_you_want_to_unhide_this: "Please explain why are unhiding this",
        popular: "Popular",
        potential_disagreement: "Potential Disagreement",
        preview: "Preview",
        preview_observations_with_these_observation_requirements: "Preview Observations with these Observation Requirements",
        previous_observation: "Previous Observation",
        previous_page: "Previous page",
        previous_page_short: "Prev",
        previous_photo: "Previous Photo",
        previous_tab: "Previous Tab",
        previous_taxon_short: "Prev",
        privacy: "Privacy",
        private_: "Private",
        proceed: "Proceed",
        profile: "Profile",
        profile_picture: "Profile Picture",
        profile_picture_file_type: "Profile Picture file type",
        project: "Project",
        project_admins: {
            one: "Project admin",
            other: "Project admins"
        },
        project_coordinate_access_disabled_until_datetime: "You will not be able to access hidden coordinates until %{datetime}\n",
        project_coordinate_access_enabled: "You should be able to view hidden coordinates for observations by trusting\nmembers.\n",
        project_coordinate_access_warning: "Coordinate access is important for scientists, but can also be abused by\npoachers. Make sure you trust all the project curators before trusting this\nproject.\n",
        project_journal: "Project Journal",
        project_members_only: "Project Members Only",
        project_requirements: "Project Requirements",
        project_settings: "Project settings",
        project_start_time_datetime: "Start time: %{datetime}",
        projects: "Projects",
        protozoans: "protozoans",
        public_domain: "Public Domain",
        quality_grade: "Quality grade",
        quality_grade_: "Quality Grade",
        random: "Random",
        rank: "Rank",
        rank_levels: {
            genus: "Genus / Genushybrid",
            species: "Species / Hybrid",
            subspecies: "Subspecies / Variety / Form"
        },
        rank_position: "Rank",
        rank_sciname: "%{rank} %{name}",
        ranks: {
            stateofmatter: "State of matter",
            kingdom: "Kingdom",
            x_kingdoms: {
                one: "Kingdom",
                other: "Kingdoms"
            },
            subkingdom: "Subkingdom",
            phylum: "Phylum",
            x_phyla: {
                one: "Phylum",
                other: "Phyla"
            },
            subphylum: "Subphylum",
            superclass: "Superclass",
            class: "Class",
            x_classes: {
                one: "Class",
                other: "Classes"
            },
            subclass: "Subclass",
            infraclass: "Infraclass",
            superorder: "Superorder",
            order: "Order",
            x_orders: {
                one: "Order",
                other: "Orders"
            },
            suborder: "Suborder",
            infraorder: "Infraorder",
            subterclass: "Subterclass",
            parvorder: "Parvorder",
            zoosection: "Zoosection",
            zoosubsection: "Zoosubsection",
            superfamily: "Superfamily",
            epifamily: "Epifamily",
            family: "Family",
            x_families: {
                one: "Family",
                other: "Families"
            },
            subfamily: "Subfamily",
            supertribe: "Supertribe",
            tribe: "Tribe",
            subtribe: "Subtribe",
            genus: "Genus",
            x_genera: {
                one: "Genus",
                other: "Genera"
            },
            genushybrid: "Genushybrid",
            subgenus: "Subgenus",
            section: "Section",
            subsection: "Subsection",
            complex: "Complex",
            species: "Species",
            x_species: {
                one: "Species",
                other: "Species"
            },
            hybrid: "Hybrid",
            subspecies: "Subspecies",
            variety: "Variety",
            form: "Form",
            infrahybrid: "Infrahybrid",
            leaves: "Leaves"
        },
        ranks_lowercase_class: "class",
        ranks_lowercase_complex: "complex",
        ranks_lowercase_epifamily: "epifamily",
        ranks_lowercase_family: "family",
        ranks_lowercase_form: "form",
        ranks_lowercase_genus: "genus",
        ranks_lowercase_genushybrid: "genushybrid",
        ranks_lowercase_hybrid: "hybrid",
        ranks_lowercase_infraclass: "infraclass",
        ranks_lowercase_infrahybrid: "infrahybrid",
        ranks_lowercase_infraorder: "infraorder",
        ranks_lowercase_kingdom: "kingdom",
        ranks_lowercase_order: "order",
        ranks_lowercase_parvorder: "parvorder",
        ranks_lowercase_phylum: "phylum",
        ranks_lowercase_section: "section",
        ranks_lowercase_species: "species",
        ranks_lowercase_stateofmatter: "state of matter",
        ranks_lowercase_subclass: "subclass",
        ranks_lowercase_subfamily: "subfamily",
        ranks_lowercase_subgenus: "subgenus",
        ranks_lowercase_subkingdom: "subkingdom",
        ranks_lowercase_suborder: "suborder",
        ranks_lowercase_subphylum: "subphylum",
        ranks_lowercase_subsection: "subsection",
        ranks_lowercase_subspecies: "subspecies",
        ranks_lowercase_subterclass: "subterclass",
        ranks_lowercase_subtribe: "subtribe",
        ranks_lowercase_superclass: "superclass",
        ranks_lowercase_superfamily: "superfamily",
        ranks_lowercase_superorder: "superorder",
        ranks_lowercase_supertribe: "supertribe",
        ranks_lowercase_tribe: "tribe",
        ranks_lowercase_variety: "variety",
        ranks_lowercase_zoosection: "zoosection",
        ranks_lowercase_zoosubsection: "zoosubsection",
        ray_finned_fishes: "ray-finned fishes",
        read_more: "Read More",
        receive_email_notifications: "Receive Email Notifications",
        receive_email_notifications_description: "If you turn this off, you will no longer receive any emails from %{site_name} regarding notifications.",
        "receive_project_journal_notifications?": "Receive project journal notifications?",
        recent: "Recent",
        recent_evidence_of_organism: "Recent evidence of an organism",
        recent_observations_: "Recent Observations",
        recently_added: "Recently Added",
        redo_search_in_map: "Redo search in map",
        regenerate_stats: "Regenerate Stats",
        regional_names: "Regional Names",
        "reject?": "Reject?",
        relationships_user_settings: "Relationships",
        relative_observations: "Relative Observations",
        reload_timed_out: "Reload timed out.  Please try again later.",
        remove: "Remove",
        remove_from_featured: "Remove from featured",
        remove_from_project: "Remove from project",
        remove_observations: {
            one: "Remove 1 observation?",
            other: "Remove %{count} observations?"
        },
        remove_photo: "Remove Photo",
        remove_place: "Remove Place",
        remove_relationship_caps: "REMOVE RELATIONSHIP",
        remove_relationship_question: "Remove Relationship?",
        removing: "Removing...",
        reptiles: "reptiles",
        request_failed: "Request Failed",
        required_: "Required",
        research: "research",
        research_: "Research",
        research_grade: "Research Grade",
        research_grade_qualification: "Research Grade Qualification",
        research_grade_short_html: "R<span class='full'>esearch </span>G<span class='full'>rade</span>",
        research_grade_tooltip_html: '"Research Grade" observations have media, location, a date, and a community consensus on a precise identification (usually at species-level). <a href="https://www.inaturalist.org/pages/help#quality">Learn more about quality grades</a>',
        resend_and_sign_out: "Re-send and Sign Out",
        resend_confirmation_email: "Re-send confirmation email",
        reset: "Reset",
        reset_brightness: "Reset Brightness",
        reset_search_filters: "Reset Search Filters",
        restore: "Restore",
        result_window_too_large_error: "Page number times the number of results per page cannot exceed 10,000. Try\napplying filters to reduce the number of results.\n",
        review_all: "Review All",
        reviewed: "Reviewed",
        revoke: "Revoke",
        revoke_caps: "REVOKE",
        revoke_external_application: "Revoke %{site_name}?",
        revoke_privacy_consent_warning: "The only way to revoke this consent is to delete your account and all associated data.",
        rg_observations: "RG Observations",
        rtl_test_joined_status: "Joined right-to-left layout test",
        rtl_test_prompt: "Test right-to-left layout? You can also use the test=rtl URL param. Note\nthat not all pages have been converted to right-to-left layout\n",
        running_total: "Running Total",
        satellite: "satellite",
        save: "Save",
        save_comment: "Save Comment",
        save_identification: "Save Identification",
        save_photos: "Save Photos",
        save_settings_caps: "SAVE SETTINGS",
        saved: "Saved",
        saved_at_time: "Saved at %{time}",
        saving: "Saving...",
        saving_num_of_count_observations: {
            one: "Saving observation...",
            other: "Saving %{num} of %{count} observations..."
        },
        saving_verb: "Saving",
        scale_colon: "Scale:",
        scientific_name: "Scientific Name",
        search: "Search",
        search_by_taxon_name_or_flickr_photo_id: "Search by taxon name or Flickr photo ID",
        search_by_taxon_name_or_observation_id: "Search by taxon name or observation ID",
        search_external_name_providers: "Search external name providers",
        search_for_a_location: "Search for a Location",
        search_remote: "Search Remote",
        search_species: "Search Species",
        search_species_: "Search Species...",
        seasonality: "Seasonality",
        seek: "Seek",
        select: "Select",
        select_all: "Select All",
        select_at_least_one: "Select At Least One",
        select_none: "Select None",
        select_observations_to_edit: "Select Observations to Edit...",
        select_options: "Select Options",
        select_this_taxon: "Select This Taxon",
        selected_photos: "Selected photos",
        send_and_sign_out: "Send and Sign Out",
        send_confirmation_email: "Send confirmation email",
        set_license: "Set license",
        settings: "Settings",
        share: "Share",
        share_caps: "SHARE",
        show: "Show",
        show_hidden_content: "Show Hidden Content",
        show_keyboard_shortcuts: "Show Keyboard Shortcuts",
        show_less: "Show Less",
        show_more: "Show More",
        show_no_annotation: 'Show "No Annotation"',
        show_openstreetmap: "Show OpenStreetMap",
        show_relative_proportions_of_all_observations: "Show relative proportions of all observations",
        show_running_total: "Show Running Total",
        show_taxa_from_everywhere: "Show taxa from everywhere",
        show_taxa_from_place: "Show taxa from %{place}",
        show_total_counts: "Show total counts",
        show_uncountable_species: "Show uncountable species",
        showing_taxa_from_everywhere: "Showing taxa from everywhere",
        showing_taxa_from_place: "Showing taxa from %{place}",
        showing_x_of_y: "Showing %{x} of %{y}",
        showing_x_of_y_listings: "Showing %{x} of %{y} listings",
        sign_out: "Sign Out",
        similar_species: "Similar Species",
        similar_taxa: "Similar Taxa",
        site_admin_tools: "Site admin tools",
        skip_to_next_page: "Skip to next page",
        some_observations_are_missing_media_or_identifications: "Some observations are missing media or identifications\n",
        some_observations_are_missing_media_or_identifications_desc: 'Observations without media will not be visible by default in searches, and\nthose without any identification may not be seen by experts looking for\nspecific taxa. Even a very coarse identification like "plants" can help a\nplant expert find your observation.\n',
        some_observations_failed_to_be_added: "Some observations failed to be added to projects",
        some_observations_failed_to_save: "Some observations failed to save",
        some_other_reason: "Some other reason you can explain below.",
        some_rights_reserved: "some rights reserved",
        something: "Something",
        something_went_wrong_adding: "Something went wrong adding that species to your list",
        somewhere_on_earth: "somewhere on Earth",
        sort_by: "Sort By",
        sounds: {
            selected_sounds: "Selected sounds",
            sound_has_been_flagged: "This sound has been flagged.",
            sounds: "Sounds"
        },
        source: "Source",
        source_: "Source:",
        source_list_: "Source List",
        source_wikipedia: "Source: Wikipedia",
        spam: "Spam",
        species: "Species",
        species_by_category: "species by category",
        species_name_cap: "Species name",
        species_unknown: "Species unknown",
        specify_the_reason_youre_flagging: "Specify the reason you're flagging this item",
        standard: "Standard",
        start: "Start",
        start_date_time: "Start Date / Time",
        start_typing_taxon_name: "Start typing taxon name...",
        stats: "Stats",
        stats_for_this_year_have_not_been_generated: "Stats for this year have not been generated.",
        status: "Status",
        status_applied_from_higher_level_taxon_html: "<strong>Status applied from a higher-level taxon:</strong> %{taxon}\n",
        status_globally: '"%{status}" Globally',
        status_in_place: '"%{status}" in %{place}',
        stay_and_try_again: "Stay and try again",
        stop_editing: "Stop Editing",
        stop_testing: "Stop Testing",
        stop_trusting_this_person_with_your_private_coordinates: "Stop trusting this person with your hidden coordinates",
        store: "Store",
        store_caps: "STORE",
        studies_that_used_inaturalist_data_in_year: "Studies That Used iNaturalist Data in %{year}",
        submit: "Submit",
        submit_observations: {
            one: "Submit 1 observation",
            other: "Submit %{count} observations"
        },
        submitted: "Submitted",
        subscribe_to_observations_from_this_place_html: "<a>Subscribe</a> to observations from this place",
        suggest_an_identification: "Suggest an Identification",
        suggestions: "Suggestions",
        suitable_for_the_global_biodiversity_information_facility: "Suitable for the Global Biodiversity Information Facility",
        suitable_for_wikipedia_and_other_wikimedia_foundation_projects: "Suitable for Wikipedia and other Wikimedia Foundation projects",
        supporting: "Supporting",
        table: "Table",
        tagging: "Tagging...",
        tags: "Tags",
        taxa: "Taxa",
        taxa_show_obs_photo_search_tip: "Tip: enter the ID of an observation in the search field if you want to\nchoose photos from a specific observation.\n",
        taxon: "Taxon",
        taxon_autocomplete_placeholder: "Birds, monarch, etc.",
        taxon_changes: "Taxon Changes",
        taxon_drop: "taxon drop",
        taxon_geoprivacy: "Taxon Geoprivacy",
        taxon_id: "Taxon ID",
        taxon_is_threatened_coordinates_hidden: "Taxon is threatened, coordinates hidden by default",
        taxon_is_threatened_coordinates_hidden_desc: "One of the taxa suggested in the identifications, or one of the taxa that\ncontain any of these taxa, is known to be rare and/or threatened, so the\nlocation of this observation has been hidden.\n",
        taxon_is_threatened_coordinates_obscured: "Taxon is threatened, coordinates obscured by default",
        taxon_is_threatened_coordinates_obscured_desc: "One of the taxa suggested in the identifications, or one of the taxa that\ncontain any of these taxa, is known to be rare and/or threatened, so the\nlocation of this observation has been obscured.\n",
        taxon_map: {
            overlays: "Overlays"
        },
        taxon_merge: "taxon merge",
        taxon_name: "Taxon name",
        taxon_schemes: "Taxon Schemes",
        taxon_split: "taxon split",
        taxon_stage: "taxon stage",
        taxon_swap: "taxon swap",
        taxonomic: "Taxonomic",
        taxonomic_groups: "Taxonomic Groups",
        taxonomy: "Taxonomy",
        taxonomy_details: "Taxonomy Details",
        taxonomy_settings: "Taxonomy Settings",
        tell_us_why: "Tell us why...",
        terms: "Terms",
        terrain: "terrain",
        text_block_controls: "Text block controls",
        text_editing_controls: "Text editing controls",
        text_formatting_controls: "Text formatting controls",
        "thank_you!": "Thank you!",
        that_was_the_last_observation_matching_the_current_filters: "That was the last observation matching the current filters.",
        the_below_items_are_needed_to_achieve: 'The below items are needed to achieve <span className="bold">Research Grade:</span>\n',
        the_community_id_requires_at_least_two_identifications: "The Community ID requires at least two identifications.",
        the_community_must_feel_that: "The community must feel that the Community Taxon is the best it can be based on the evidence\n",
        the_world: "The World",
        then_keybord_sequence: "then",
        there_were_problems_adding_taxa: "There were problems adding those taxa: %{errors}",
        there_were_some_problems_with_these_files: "There were some problems with these files:",
        these_observations_have_not_been_uploaded_yet: "These observations have not been uploaded yet.\n",
        third_party_tracking: "Third-Party Tracking",
        this_bioblitz_beings_in: "This bioblitz begins in",
        this_is_how_taxon_names_will_be_displayed: "This is how all taxon names will be displayed to you across %{site_name}",
        this_is_your_observation: "This is your observation",
        this_is_your_observation_desc: "You can always see the coordinates of your own observations.",
        this_job_failed_to_run: "This job failed to run. Please contact %{email}",
        this_observation_is_featured_on_x_sites: {
            zero: "This observation is featured on %{count} sites",
            one: "This observation is featured on %{count} site",
            few: "This observation is featured on %{count} sites",
            many: "This observation is featured on %{count} sites",
            other: "This observation is featured on %{count} sites"
        },
        this_observation_is_research_grade: "This observation is Research Grade!",
        this_observation_was_created_using: "This observation was created using:",
        this_taxon_concept_is_inactive: "this taxon concept is inactive",
        this_taxon_has_no_default_photo: "This taxon has no default photo!",
        this_will_remove_inaturalists_ability_to_access_this_account: "This will remove iNaturalist's ability to access this account on your behalf\nuntil you grant access again. You may need to change your settings on the\nexternal site to completely prevent access.\n",
        this_will_sign_you_out_current_session: "This will sign you out of your current session on this application.",
        this_will_try_to_add_tags_to_your_flickr: "This will try to add tags to your Flickr photos.  Continue?",
        this_year: "This Year",
        threatened: "Threatened",
        time: {
            am: "am",
            formats: {
                hours: "%l:%M %p",
                long: "%B %-d, %Y %I:%M %p"
            },
            pm: "pm"
        },
        today: "Today",
        too_many_results: "Too Many Results",
        top_identifier_caps: "TOP IDENTIFIER",
        top_identifiers: "Top Identifiers",
        top_identifiers_of_taxon: "Top Identifiers of %{taxon}",
        top_observer_caps: "TOP OBSERVER",
        top_observers: "Top Observers",
        total: "Total",
        total_observations_caps: "TOTAL OBSERVATIONS",
        total_species_observed_caps: "TOTAL SPECIES OBSERVED",
        translated_languages: "Translated Languages",
        trending: "Trending",
        trends: "Trends",
        trust: "Trust",
        trust_this_person_with_your_private_coordinates: "Trust this person with your hidden coordinates",
        "trust_this_project_with_your_private_coordinates?": "Trust this project with hidden coordinates?",
        trust_with_private_coordinates: "Trust with hidden coordinates",
        trusted: "Trusted",
        twitter: "Twitter",
        two_thirds: "2/3rds",
        type_species_name: "Type species name",
        umbrella_projects: "Umbrella Projects",
        unblock: "Unblock",
        unfollow_observation: "Unfollow observation",
        unfollow_user: "Unfollow user",
        unhide_content: "Unhide Content",
        unhide_desc: "Unhiding will reveal this content for everyone to see. Curators can still\nchoose to hide it again in the future.\n",
        unknown: "Unknown",
        unknown_error: "Unknown error",
        unmute: "Unmute",
        unreview_all: "Unreview All",
        update_existing_observations_with_new_license: "Update existing observations with new license choices",
        update_existing_observations_with_new_license_desc: "Selecting this option will apply your new license choice to all your\nexisting observations. This can take a few hours if you have a lot of\nobservations.\n",
        update_existing_photos_with_new_license: "Update existing photos with new license choices",
        update_existing_photos_with_new_license_desc: "Selecting this option will apply your new license choice to all your\nexisting photos. This can take a few hours if you have a lot of\nphotos.\n",
        update_existing_sounds_with_new_license: "Update existing sounds with new license choices",
        update_existing_sounds_with_new_license_desc: "Selecting this option will apply your new license choice to all your\nexisting sounds. This can take a few hours if you have a lot of\nsounds.\n",
        update_observations: "Update Observations",
        update_past: "Update Past %{type}",
        update_search: "Update Search",
        update_x_selected_taxa: {
            one: "Update 1 selected taxon",
            other: "Update %{count} selected taxa"
        },
        updated_by_user_on_date_html: "Updated by %{user} on %{date}",
        upload_new_photo: "Upload new photo",
        uploader: {
            errors: {
                file_too_big: "File must be less than %{megabytes} MB",
                unsupported_file_type: "File type not supported. We accept JPG, PNG, GIF, HEIC, HEIF, WAV, AAC, MP3, and MP4 (audio only)"
            },
            resize_tip: "If your photo files are too big, try cropping them down to a maximum\nof 2048 by 2048 pixels. This will happen to all photos on the\nserver anyway, and will make for a faster upload.\n",
            tooltips: {
                add: "Add observation(s)",
                combine: "Combine selected observations",
                duplicate: "Duplicate selected observations",
                photo_failed: "Photo failed to upload",
                remove: "Remove selected observations",
                remove_observation: "Remove observation",
                remove_photo: "Remove photo",
                select_all: "Select all observations",
                upload_failed: "Upload failed"
            }
        },
        uploading_num_of_count_photos: {
            one: "Uploading photo...",
            other: "Uploading %{num} of %{count} photos..."
        },
        use_name_as_a_placeholder: "Use <span class='ac-placeholder'>\"%{name}\"</span> as a placeholder\n",
        user: "User",
        user1_and_user2_faved_this_observation: "%{user1} and %{user2} faved this observation",
        user1_user2_and_x_others_faved_this_observation: "%{user1}, %{user2}, and %{x_others} faved this observation",
        user_autocomplete_placeholder: "kueda, simon123, etc.",
        user_commented: "%{user} commented",
        user_disagrees_this_is_taxon: "%{user} disagrees this is %{taxon}",
        user_disagrees_with_previous_finer_identifications: "%{user} disagrees with previous finer identifications",
        user_faved_this_observation: "%{user} faved this observation",
        user_has_opted_out_of_community_id: "User has opted-out of Community Taxon",
        user_helped_x_people_with_y_ids_html: "%{user} helped <strong>%{x} people</strong> with <strong>%{y} IDs</strong>",
        user_suggested_an_id: "%{user} suggested an ID",
        user_trusts_you_with_their_private_coordinates: "%{user} trusts you with their hidden coordinates",
        user_trusts_you_with_their_private_coordinates_desc: "The observer has chosen to trust you with the hidden coordinates of all\ntheir observations.\n",
        username: "Username",
        username_description: "This is the username you will use to log in, and other users can use to identify you on iNaturalist",
        username_or_user_id: "Username or User ID",
        users: "Users",
        value: "Value",
        verbing_x_of_y: "%{verb} %{x} of %{y}...",
        verifiable: "Verifiable",
        verifiable_observations: "Verifiable Observations",
        verifiable_observations_by_observation_date: "Verifiable Observations By Observation Date",
        view: "View",
        view_all: "View All",
        view_all_caps: "VIEW ALL",
        view_all_members: "View All Members",
        view_field_options: "View Field Options",
        view_flag: "View Flag",
        view_flags: "View Flags",
        view_full_size_photo: "View full-size photo",
        view_inaturalist_global_year_in_review: "View iNaturalist's Global %{year} Year in Review",
        view_inaturalist_global_year_in_review_caps: "VIEW INATURALIST'S GLOBAL %{year} YEAR IN REVIEW",
        view_license: "View License",
        view_more: "View More",
        view_more_unreviewed: "View more unreviewed",
        view_observation: "View Observation",
        view_observations: "View Observations",
        view_observations_of_this_taxon_by: "View observations of this taxon by",
        view_on: "View on",
        view_sample: "View Sample",
        view_site_year_in_review: "View %{site} %{year} Year in Review",
        view_site_year_in_review_caps: "VIEW %{site} %{year} YEAR IN REVIEW",
        view_taxon_change: "View Taxon Change",
        view_your_personal_year_in_review: "View your Personal %{year} Year in Review",
        view_your_personal_year_in_review_caps: "VIEW YOUR PERSONAL %{year} YEAR IN REVIEW",
        view_yours: "View Yours",
        views: {
            atlases: {
                show: {
                    explode_this_place: "Explode this place",
                    no_alterations_to_this_atlas_yet: "No alterations to this atlas yet",
                    show_listed_taxa: "Show listed taxa",
                    this_will_remove_this_taxon_and_all: "This will remove this taxon and all its descendants from checklists\nassociated with this place and any Standard Places it contains. It\ncannot be undone. Are you sure you want to do this?\n",
                    unexplode_this_place: "Unexplode this place"
                }
            },
            donate: {
                monthly_supporters: {
                    become_a_monthly_supporter_of_inaturalist: "Become a Monthly Supporter of iNaturalist",
                    become_a_monthly_supporter_of_inaturalist_caps: "BECOME A MONTHLY SUPPORTER OF INATURALIST",
                    thank_you_for_being_a_monthly_supporter: "Thank you for being a Monthly Supporter!",
                    thank_you_for_being_a_monthly_supporter_caps: "THANK YOU FOR BEING A MONTHLY SUPPORTER!"
                }
            },
            email_confirmation: {
                click_here_to_resend_a_confirmation_email: "Click here to resend a confirmation email",
                confirmation_email_sent: "Confirmation email sent",
                here_is_the_email_colon: "Here is the email address we will send the confirmation to:\n",
                if_you_are_still_not_receiving_email_contact_us_html: 'If you are still not receiving the confirmation email, please contact us at <a href="mailto:help+confirmation@inaturalist.org">help@inaturalist.org</a> so we can assist you.',
                if_you_do_not_receive_the_email_here_are_tips_colon: "If you do not receive the email, here are some tips:\n",
                please_click_the_link_sent_to_email_to_confirm_html: 'Please click the link sent to <span class="email">%{email}</span> to confirm your email address.',
                please_confirm_to_interact: "Please confirm your email address to interact with other users' content",
                please_confirm_to_interact_and_access: "Please confirm your email address to interact with other users' content and access certain pages.",
                please_confirm_to_use_this_page: "Please confirm your email address to use this page",
                please_confirm_your_email_address_html: 'Please confirm your email address <span class="email">%{email}</span>.',
                tips_check_email_filters: "Check for any filters you made that might remove our emails from your inbox",
                tips_check_your_spam_folder: "Check your spam folder"
            },
            geo_model: {
                explain: {
                    geomodel_predictions_of_taxon: "Geomodel Predictions of %{taxon}\n",
                    nearby_map: {
                        download_expected_nearby_map_as_geojson: "Download Expected Nearby Map as GeoJSON",
                        expected_nearby_map: "Expected Nearby Map",
                        figure_alt_text: "The Geomodel applies the Expected Nearby label",
                        for_example: "For example, an observation of a lizard in the center of the United States might\nhave the Expected Nearby label applied to a suggestion of <i>Sceloporus consobrinus</i>\nbut not <i>Sceloporus occidentalis</i> based on their respective Expected Nearby Maps.\n",
                        we_use_this_map: "We use this map to apply the Expected Nearby label to suggestions based on the\nlocation of the observation.\n",
                        you_can_think: "You can think of the Expected Nearby Map as an estimate of whether the species\nis present somewhere inside the grid cell or entirely absent.\n"
                    },
                    range_comparison: {
                        by_combining: "By combining the Expected Nearby Map to the Taxon Range, we calculate statistics\nto estimate how well the Geomodel performs.\n",
                        combining_these_maps_produces: "Combining these maps produces 3 types of cells:\n",
                        evaluation_statistics_for_taxon: "Evaluation statistics for %{taxon}",
                        expected_nearby_vs_taxon_range: "Expected Nearby vs Taxon Range",
                        f1_colon: "F1:\n",
                        f1_description: "The average (harmonic mean) of Precision and Recall",
                        f1_equation: "2 \xd7 True Presences / (2 \xd7 True Presences + False Presences + False Absences) = %{f1}\n",
                        false_absences_colon: "False Absences:\n",
                        false_absences_definition: "Areas where only the Taxon Range is present",
                        false_presences_colon: "False Presences:\n",
                        false_presences_definition: "Areas where only the Expected Nearby Map predicts the taxon exists",
                        figure_alt_text: "The Expected Nearby map and Taxon Range are compared",
                        perfect_overlap: "Perfect overlap would evaluate with a Precision, Recall and F1 of 1. No overlap\nwould evaluate with a Precision , Recall, and F1 of 0.\n",
                        precision_colon: "Precision:\n",
                        precision_description: "The fraction of the Expected Nearby Map that are True Presences",
                        precision_equation: "True Presences / (True Presences + False Presences) = %{precision}\n",
                        recall_colon: "Recall:\n",
                        recall_description: "The fraction of the Taxon Range that are True Presences",
                        recall_equation: "True Presences / (True Presences + False Absences) = %{recall}\n",
                        this_gridded_version: "This gridded version of the Taxon Range is a snapshot taken when the model was\ntrained and gridded at the same resolution as the Expected Nearby Map. We only\nuse the Taxon Ranges where at least 90% of the training data for that species\nfalls within the Taxon Range to control for errors in the Taxon Ranges.\n",
                        this_map_shows: "This map shows the Taxon Range for this species overlapping the Expected Nearby Map\nthat we use to evaluate the Geomodel.\n",
                        true_presences_colon: "True Presences:\n",
                        true_presences_definition2: "Areas where both the Expected Nearby Map and the Taxon Range predict that the taxon exists"
                    },
                    the_geo_model_is_trained: 'Like the Computer Vision Model, the Geomodel is trained on iNaturalist observations\nfor the same set of species with roughly more than 100 photos. The Geomodel does not\nmake perfect predictions. You can read more about how the Geomodel is made\n<a href="%{url}">here</a>.\n',
                    the_geo_model_makes_predictions: 'The Geomodel makes predictions about where species occur and where they are absent.\nWe use the Geomodel to apply the "Expected Nearby" label alongside suggestions and\nto weight these suggestions based on the location of the observation.\n',
                    unthresholded_map: {
                        figure_alt_text: "The Geomodel weights Computer Vision results",
                        for_example: "For example, an observation of a lizard in the center of the United States might\nhave the suggestions of <i>Sceloporus consobrinus</i> weighted more than suggestions\nof <i>Sceloporus occidentalis</i> based on comparing the Unthresholded Maps, despite\nbeing visually similar.\n",
                        unthresholded_map: "Unthresholded Map",
                        we_use_the_unthresholded_map: "We use the Unthresholded Map to weight computer vision scores by location when\noffering suggestions.\n",
                        you_can_think: "You can think of the Unthresholded Map as the relative probability that a species\noccurs within a grid cell.\n"
                    }
                }
            },
            lifelists: {
                all_observations: "All Observations",
                all_observations_in_this_taxon: "All observations in this taxon",
                all_species: "All Species",
                all_unobserved_species: "All Unobserved Species",
                apply_filters_to_export: "Apply filters to export",
                collapse_this_branch: "Collapse this branch",
                dropdowns: {
                    ancestry: "Ancestry",
                    children: "Children",
                    date_added_newest: "Date Added, Newest to Oldest",
                    date_added_oldest: "Date Added, Oldest to Newest",
                    full_taxonomy: "Full Taxonomy",
                    least_observed: "Least Observed",
                    most_observed: "Most Observed",
                    name: "Name",
                    show: "Show",
                    simplified_tree: "Simplified Tree",
                    sort: "Sort",
                    taxonomic: "Taxonomic"
                },
                expand_all_nodes_in_this_branch: "Expand all nodes in this branch",
                exporting_all_x_taxa: {
                    one: "Exporting %{count} taxon",
                    other: "Exporting all %{count} taxa"
                },
                exporting_x_taxa: {
                    one: "Exporting %{count} taxon",
                    other: "Exporting %{count} taxa"
                },
                filter_by: "Filter by",
                filtered_by: "Filtered by",
                focus_tree_on_this_taxon: "Focus tree on this taxon",
                list_view: "List View",
                no_observations_found_in_place: "No observations found in %{place}.",
                no_observations_found_within_this_taxon_in_place: "No observations found within this taxon in %{place}.",
                no_species_found_in_place: "No species found in %{place}.",
                no_species_found_within_this_taxon_in_place: "No species found within this taxon in %{place}.",
                no_unobserved_species_in_place: "No unobserved species in %{place}.",
                no_unobserved_species_within_this_taxon: "No unobserved species within this taxon.",
                no_unobserved_species_within_this_taxon_in_place: "No unobserved species within this taxon in %{place}.",
                observations_at_this_taxon: "Observations at this taxon",
                observations_of_exactly_this_taxon: "Observations of exactly this taxon",
                observations_within_this_taxon: "Observations within this taxon",
                observed_rank: "Observed %{rank}",
                reset_place_filter: "Reset Place Filter",
                restrict_to_leaf_taxa: "Restrict to leaf taxa",
                restrict_to_taxa_observed_in_place: "Restrict to taxa observed in %{place}",
                restrict_to_taxon: "Restrict to %{taxon}",
                total_observations: "Total Observations",
                tree_view: "Tree View",
                unobserved_species: "Unobserved Species"
            },
            nls_demo: {
                for_example_query: "e.g. %{query_in_english}",
                help_us_improve: "Help us improve",
                if_youd_like_to_support_this_work: "If you'd like to support this work",
                inaturalist_has_teamed: '<a href="https://www.inaturalist.org/" target="_blank" rel="noopener noreferrer">iNaturalist</a> has teamed up with researchers at <a href="https://www.cics.umass.edu/people/van-horn-grant" target="_blank" rel="noopener noreferrer">University of Massachusetts Amherst</a>, <a href="https://www.inf.ed.ac.uk/people/staff/Oisin_Mac_Aodha.html" target="_blank" rel="noopener noreferrer">University of Edinburgh</a>, <a href="https://www.ucl.ac.uk" target="_blank" rel="noopener noreferrer">University College London</a>, <a href="https://www.eecs.mit.edu/people/sara-beery/" target="_blank" rel="noopener noreferrer">MIT</a>, and with generous support from <a href="https://www.microsoft.com/en-us/research/group/ai-for-good-research-lab/overview/" target="_blank" rel="noopener noreferrer">Microsoft AI for Good Lab</a> to better understand the potential for Vision Language Models to help organize, explore, and explain iNaturalist observations.',
                mark_remaining_as_not_relevant: "Mark remaining as not relevant",
                mark_remaining_as_relevant: "Mark remaining as relevant",
                "thank_you_for_your_submission!": "Thank you for your submission!",
                this_demo_tool3: 'This demo tool lets you type a search phrase (such as "<a href="%{url}">%{query_in_english}</a>"), and compares it with 10 million iNaturalist photos. Results are ordered from most to least relevant. You can use this demo as a new way to find interesting iNaturalist observations to annotate or add to your project.',
                to_help_us_improve: "To help us improve this model we would like to know which of the images on this page are relevant to your search &quot;%{searched_term}&quot;. Please mark each image as relevant %{thumbs_up_icon} if it matches your search and not relevant %{thumbs_down_icon} if it doesn't. When you are finished, please click submit.",
                try_one_of_these_example_searches_colon: "Try one of these example searches:",
                view_these_observations_in_identify: "View these observations in Identify",
                vision_language_demo: "Vision Language Demo",
                what_do_you_want_to_search_for: "What do you want to search for?",
                you_can_also_use_this_demo: 'You can also use this demo to help us evaluate the Vision Language model powering this demo by telling us which of the returned images was relevant to your search phrase. This demo is using a third-party <a href="https://huggingface.co/sentence-transformers/clip-ViT-B-32" target="_blank" rel="noopener noreferrer">Vision Language CLIP model</a> that was not trained on iNaturalist data or by the iNaturalist team. Sometimes the tool may produce inaccurate, biased, or offensive results. <a href="https://www.inaturalist.org/blog/95911" target="_blank" rel="noopener noreferrer">Read more on the iNaturalist Blog</a>.'
            },
            observations: {
                community_id: {
                    agreement: "Agreement",
                    algorithm_summary: "Algorithm Summary",
                    ancestor_disagreements: "Ancestor Disagreements",
                    below_cutoff: "Below Cutoff",
                    cumulative_count: "Cumulative Count",
                    disagreement: "Disagreement",
                    disagreement_count: "Disagreement Count",
                    explanation: "<p>\n  If for some reason a user doesn't agree with the community taxon,\n  they can reject it, which means their ID is the one used for\n  linking to other observations, updating life lists, etc. It also\n  means their observation can only become research grade when the\n  community agrees with them.\n</p>\n<p>\n  However, the community ID is still shown, so all may see the\n  different IDs that have been suggested.\n</p>\n",
                    identification_count: "Identification Count",
                    opt_in_for_this_observation: "Opt in for this observation",
                    score: "Score",
                    you_have_opted_out: "You have opted out of community identifications",
                    your_id_does_not_match: 'Your ID (<span class="bold">%{taxon_name}</span>) does not match the community ID\n'
                },
                compare: {
                    about_total_taxa: "About Total Taxa",
                    combined: "Combined",
                    date_field: "Date Field",
                    horizontal: "Horizontal",
                    interval: "Interval",
                    interval_limit_warning_day: "Only showing 1 year's worth of days",
                    interval_limit_warning_hour: "Only showing 1 week's worth of hours",
                    interval_limit_warning_month: "Only showing 100 years worth of months",
                    interval_limit_warning_week: "Only showing 10 years worth of weeks",
                    interval_limit_warning_year: "Only showing 100 years worth of years",
                    some_queries_missing_taxa: "Some queries missing taxa",
                    some_queries_missing_taxa_desc: 'We can only load 500 of the most-observed taxa per query, so if there\nare more taxa represented in the query, they will either not appear or\nshow up as "?" if they\'re present in other queries. Try narrowing your\nqueries down so they show 500 taxa or less for optimum comparisons.\n',
                    taxa_not_observed_in_all_queries: "Taxa not observed in all queries",
                    taxa_observed_in_all_queries: "Taxa observed in all queries",
                    taxa_observed_in_only_one_query: "Taxa observed in only one query",
                    total_taxa: "Total Taxa",
                    total_taxa_desc: 'This is the total number of "leaf" taxa represented in the query.\nSometimes you\'ll see more rows than this with non- zero counts because\nthere are higher level taxa added from other queries. E.g. if Query 1\nhas an observation of Homo sapiens and Query 2 has an observation of\nGenus Homo, both taxa will be present in the table, but that\nrepresents one additional  row for Genus Homo for Query 1, which\ndidn\'t include it in its total count because it only counted the\nspecies Homo sapiens within that genus, because that was the "leaf" of\nthat part of its tree.\n',
                    vertical: "Vertical",
                    x_in_common: {
                        zero: "%{count} in common",
                        one: "%{count} in common",
                        few: "%{count} in common",
                        many: "%{count} in common",
                        other: "%{count} in common"
                    },
                    x_not_in_common: {
                        zero: "%{count} not in common",
                        one: "%{count} not in common",
                        few: "%{count} not in common",
                        many: "%{count} not in common",
                        other: "%{count} not in common"
                    },
                    x_total: {
                        zero: "%{count} total",
                        one: "%{count} total",
                        few: "%{count} total",
                        many: "%{count} total",
                        other: "%{count} total"
                    },
                    x_unique: {
                        zero: "%{count} unique",
                        one: "%{count} unique",
                        few: "%{count} unique",
                        many: "%{count} unique",
                        other: "%{count} unique"
                    }
                },
                export: {
                    taking_a_while: "This is taking a while. Please try one of the options below.",
                    well_email_you: "Ok, we'll email you when it's ready."
                },
                identify: {
                    review_all_tooltip: "Mark all observations on the page as reviewed",
                    too_many_results_desc: 'Page number times the number of results per page cannot exceed 10,000.\nTry applying filters to reduce the number of results, or mark\nobservations as reviewed and use the "View More" button instead of\npagination\n',
                    unreview_all_tooltip: "Remove reviewed status for all observations on the page",
                    you_reviewed_message: "You reviewed %{reviewed} of %{pageTotal} observations on this page out of %{total} matching observations."
                },
                show: {
                    ancestor_disagreements_desc2: 'Number of identified taxa that are among a taxon\'s ancestors, but\ndisagree with the taxon (i.e. "I think it is in the genus but I\ndisagree it is that species")\n',
                    community_taxon_desc_html: '<p class="ui">\n  The community taxon (or community identification) represents\n  what taxon the %{site_name} community thinks is depicted in an\n  observation. If you\'re interested in how we choose the\n  community taxon, see the notes on the algorithm below, but in\n  general, we try to <strong>choose a taxon that more than 2/3\n  of the identifiers agree with</strong>. Sometimes this means\n  choosing a higher level taxon that contains a number of\n  disagreeing taxa (e.g. you think it\'s a kingsnake and I think\n  it\'s rattlesnake, so iNat chooses suborder Serpentes which\n  contains all snakes). The algorithm also slightly favors\n  dissent, because we\'ve found that dissenters are often\n  correct.\n</p>\n<p class="ui">\n  A research grade observation must have (among other criteria) a\n  community taxon. If an observation has\n  only one identification, it won\u2019t have a community taxon. All\n  observations with at least one identification will also have an\n  observation taxon. The observation taxon is the taxon we use when\n  sharing observations with data partners, linking observations of\n  the same taxon on the site, updating your life list, etc. In most\n  cases the observation taxon will eventually be set to the community\n  taxon, but sometimes they will differ especially before the community\n  has settled on an identification. For example, if you think\n  its a snake (suborder Serpentes) and I think it\u2019s a kingsnake (genus\n  <i>Lampropeltis</i>) the observation taxon will be at kingsnake (supported\n  by my identification only) but the community taxon will be at\n  serpentes (supported by at least two identifications). If for\n  some reason you don\'t agree with the community taxon, you can\n  reject it on your own observations, which means that observation\n  taxon will never be set to the community taxon (rather your own ID).\n  It also means your observation can only become research grade when the community\n  agrees with <em>you</em>. If you don\'t like the whole idea of\n  community taxa, you can opt out of them entirely by\n  <a href="/users/edit" target="_blank">editing your settings</a>.\n</p>\n<p class="ui">\n  <strong>The algorithm:</strong> for all identified taxa and the taxa that contain them\n  (e.g. genus <i>Homo</i> contains <i>Homo sapiens</i>), score each as the ratio between\n  the number of \u2018agreements\u2019 - cumulative IDs for that taxon over the sum of the cumulative\n  IDs, \u2018disagreements\u2019 - the number of IDs that are completely different (i.e. IDs of taxa\n  that do not contain the taxon being scored), and \u2018ancestor disagreements\u2019 - the number of\n  more conservative IDs that disagree with the finer taxon. For the identified taxa that\n  have a score over 2/3 and at least 2 identifications, choose the lowest ranked taxon.\n</p>\n',
                    cumulative_count_desc: "# of identifications for an individual taxon and all its descendants",
                    data_quality_assessment_desc3_html: 'The Quality Grade summarizes the accuracy, precision, completeness,\nrelevance, and appropriateness of an iNaturalist observation as\nbiodiversity data. Some attributes are automatically determined,\nwhile others are subject to a vote by iNat users. iNaturalist\nshares licensed "Research Grade" observations with a number of data\npartners for use in science and conservation.\n',
                    disagreement_count_desc: "# of identified taxa that are not among a taxon's ancestors",
                    dqa_help_casual_day_year_not_accurate2_html: "the <strong>day, month, and/or year do not look accurate</strong> (e.g. snow\nappears in the photo but the date is during summer; do not take\ntime of day into account)\n",
                    dqa_help_casual_lead_html: 'Observations will revert to <strong>"casual"</strong> if the above\nconditions aren\'t met or the community agrees\n',
                    dqa_help_casual_location_not_accurate_html: "the <strong>location doesn't look accurate</strong> (e.g. monkeys in\nthe middle of the ocean, hippos in office buildings, etc.)\n",
                    dqa_help_casual_not_one_subject_html: "the observation <strong>doesn't present evidence related to one\nsubject</strong> (e.g. it has four photos of unrelated organisms; a\nphoto showing habitat of the observation\u2019s subject is OK)\n",
                    dqa_help_casual_not_organism_html: "the observation <strong>doesn't present evidence of an\norganism</strong>, e.g. images of water features, rocks, landscapes\nthat don't include the organism, etc.\n",
                    dqa_help_casual_not_recent_html: "the observation <strong>doesn't present recent (~100 years) evidence\nof the organism</strong> (e.g. fossils, but tracks, scat, and dead\nleaves are ok)\n",
                    dqa_help_casual_not_wild_html: "the <strong>organism isn't wild/naturalized</strong> (e.g. captive\nor cultivated by humans)\n",
                    dqa_help_casual_opted_out_maverick_html: "the taxon is not an ancestor or a descendant of the taxon associated\nwith the observer's ID <em>and</em> the observer has opted out of\nthe Community Taxon\n",
                    dqa_help_casual_voted_out_html: "the observation no longer needs an ID <em>and</em> the Community\nTaxon is at family or above\n",
                    dqa_help_needs_id_has_a_date_html: "the observation <strong>has a date</strong>",
                    dqa_help_needs_id_has_photos_or_sounds_html: "the observation <strong>has photos or sounds</strong>",
                    dqa_help_needs_id_is_georeferenced_html: "the observation <strong>is georeferenced</strong> (i.e. has lat/lon coordinates)",
                    dqa_help_needs_id_is_not_of_human_html: "the observation <strong>isn't of a human</strong>",
                    dqa_help_needs_id_lead_html: 'The data quality assessment is a summary of an observation\'s\naccuracy. All observations start as <strong>"casual"</strong>\ngrade, and become <strong>"needs ID"</strong> when\n',
                    dqa_help_research_grade_community_species_html: "the %{site_name} <strong>community agrees on species-level ID or\nlower</strong>, i.e. when more than 2/3 of identifiers agree on a\ntaxon (if the community has voted that the Community Taxon can no\nlonger be improved, this reverts to subfamily-level ID or lower)\n",
                    dqa_help_research_grade_lead_html: 'Observations become <strong>"research grade"</strong> when',
                    dqa_help_system_captive_vote: "The system will vote that the observation is not wild/naturalized if\nthere are at least 10 other observations of a genus or lower in the\nsmallest county-, state-, or country-equivalent place that contains\nthis observation and 80% or more of those observations have been\nmarked as not wild/naturalized.\n",
                    dqa_help_system_lead: "And if that wasn't complicated enough, there are also situations\nwhere the system gets a vote:\n",
                    identification_count_desc: "# of identifications for an individual taxon",
                    observer_does_not_allow_observation_fields: "Observer does not allow additional observation fields",
                    observer_only_allows_curators_to_add_fields: "Observer only allows site curators to add observation fields",
                    score_desc: "score = cumulative count / (cumulative count + disagreement count + ancestor disagreements)"
                }
            },
            projects: {
                collection: "Collection",
                edit: {
                    admins_can_only_be_added_after_creation: "Admins can only be added after the project has been created.\n",
                    admins_must_be_existing_members: "Admins must be existing members of the project.",
                    change_owner_alert: "This will remove your ability to delete this project or transfer\nownership again. Do you want to proceed?\n",
                    make_owner: "Make Owner",
                    trust_allow_members_to_trust: "Allow members to trust this project with hidden coordinates",
                    trust_help_desc: "If you want access to the hidden coordinates of obscured observations,\nthis option will allow people who have joined this project to trust\nthe project admins with access to those hidden coordinates. Project\nmembers will be able to grant access to the hidden coordinates of any\nof their observations that appear in this project, or just the\nobservations that are obscured because of threatened taxa.",
                    trust_help_notification2: "However, this will also notify all trusting project members every time\nyou change the project observation requirements, so they can reassess\nwhether they want to continue trusting you given the new requirements.\nYour access to hidden coordinates will be revoked for one week after\nchanging the observation requirements so members have time to do this."
                },
                new: {
                    a_project_allows_you_to_gather: "A collection project allows you to gather and visualize observations\nusing the core iNaturalist search tools. Everything that meets the\nparameters set by the project will be automatically included.\n",
                    an_umbrella_project_can_be_used_to: "An umbrella project can be used to compare statistics across two or more Collection or\nTraditional Projects. The other projects need to exist before you can add them to an\numbrella project. You can include hundreds of projects under a single umbrella. Umbrella\nprojects cannot contain other umbrella projects.\n",
                    are_you_ready_to_duplicate: "Are you ready to leave this page to duplicate this project? Please note the project icon\nand banner will not be duplicated, and would need to be re-uploaded in the duplicate\nproject.\n",
                    are_you_sure_you_want_to_delete: "Are you sure you want to delete this project?",
                    can_be_included_in_multiple: "Can be included in multiple umbrella projects",
                    check_the_box_to_include_member_observations: "Check the box below to only include observations made by users who have joined this project.\nUse the Exclude Users filter above to exclude observations from specific users,\nincluding the project owner and admins.\n",
                    click_through_to_individual_projects: "Click through to individual projects",
                    collection_project_features: "Collection Project features:",
                    collection_projects: "Collection Projects",
                    contain_entire_image_without_cropping: "Contain entire image without cropping",
                    custom_banner_icon_and_project_description: "Custom banner, icon, and project description",
                    data_visualizations: "Data visualizations",
                    delete_project: "Delete Project",
                    display_project_name: "Display project name",
                    do_you_need_features_from_traditional2: "Do you need features from traditional projects, such as custom observation fields,\nor adding individual observations that can\u2019t be automatically filtered?\n",
                    duplicate_project: "Duplicate Project",
                    errors: {
                        cannot_have_more_than_x_project_rules: "Cannot have more than %{x} project rules",
                        name_already_taken: "Project name already taken",
                        name_is_required: "Project name is required",
                        summary_is_required: "Project summary text is required"
                    },
                    include_annotated_observations: "Include only observations annotated with a particular attribute (e.g. life stage),\nor a particular attribute and value (e.g life stage = adult).\nThere is a limit of one annotation filter per project.\n",
                    leaderboards_among_individuals: "Leaderboards among <strong>individuals</strong>",
                    leaderboards_among_projects_and_bioblitzes: "Leaderboards among <strong>projects</strong>\n",
                    multiple_project_administrators: "Multiple project administrators",
                    name_placeholder: "Birds of Chicago, Amazing Dragonflies, etc.",
                    no_need_to_rely_on_manual_addition: "No manual addition of observations\n",
                    note_about_unselected_filters: "Note: If you do not select taxa, places, or users, all will be included by default.\n",
                    note_these_users_will_be_able_to_edit: "Note: these users will be able to edit ALL project details including admins.\n",
                    note_you_can_delete_the_time: "(Note: you can delete the time zone and precise times if you want to include whole days.)\n",
                    only_display_member_observations: "Only display observations from project members (people who have joined the project)\n",
                    optionally_filter_media: "Optionally filter for observations with photos, sounds, or both.",
                    or_drag_and_drop: "(or drag and drop)",
                    please_specify_the_requirements: "Please specify the requirements for the observations to be added to\nthis project.\n",
                    project_background_color: "Project Summary Background Color",
                    project_background_color_help: "Make sure to choose a color dark enough so the white overlaid text is legible.",
                    project_banner: "Project Banner (PNG or JPG)",
                    project_banner_help: "Optional banner image. Ideal dimensions are 760px by 320px.",
                    project_details: "Project Details",
                    project_icon: "Project Icon (PNG, JPG, or GIF)",
                    project_icon_help: "Optional icon. Should be a minimum of 72px x 72px and will be cropped to a square.\n",
                    project_name: "Project Name",
                    project_summary: "Project Summary",
                    project_summary_help: "Give a concise explanation of your project. Approximately the first 200 characters will\nbe visible to the right of the project home screen banner so put the best stuff first!\n",
                    project_summary_placeholder: "Discover and track the birds of Golden Gate Park...",
                    select_native_to_include: 'Select "Native" to include only taxa that have been marked as "Native" to the\nplace(s) in your project. Select "Introduced" to include only taxa that have been\nmarked as "Introduced" to the place(s) in your project.\n',
                    select_quality_grade: 'Select at least one Quality Grade. Further explanation for each Quality Grade can be found on\nour <a href="%{url}">FAQ page</a>.\n',
                    show_projects_as_flags: "Show projects as flags in map",
                    specify_project_filters: "Specify the filters for which observations to include in your project.\nYou can select multiple species (or taxa), places, dates, or other criteria for\nobservations to be automatically included.\n",
                    start_and_end_times_for_bioblitzes: "Start and end date/times (for bioblitz-type events)",
                    trusting_members_will_be_notified: "You've changed the project requirements or turned on user trust. This\nwill notify any project members who have already trusted the project\nwith hidden coordinates so they have a chance to decide whether they\nstill want to trust the project given the new requirements.\n",
                    umbrella_project_features: "Umbrella Project features:",
                    unique_url_for_outreach: "Unique URL for outreach",
                    use_this_for_a_time_limited_event: "Use this for a time-limited event, bioblitz, or seasonal project. Select a single\ndate, range of dates, or which months of the year the observations must be made\nin (regardless of year). If using the Date Range section, make sure you have the\ncorrect times and time zones selected, or delete the time/time zone text to include\nobservations made anytime that entire day. You can leave the Start Date or End Date\nblank if you want to limit the project by only one date.\n",
                    use_this_link_to_create_html: 'Use <a href="%{url}">this link</a> to create a traditional project instead.\n',
                    users_can_follow_your_project: "Users can follow your project for updates via journal posts",
                    visual_comparison_of_data_among: "Visual comparisons of data among projects under the umbrella",
                    we_have_redesigned_projects: "Projects are designed to automatically include all of the observations that fit the\nplaces, taxa, users, quality, and dates that you define. Choose between two main types:\nCollection Projects and Umbrella Projects, which share the following features:\n",
                    welcome_to_projects: "Welcome to Projects!",
                    you_can_learn_more2_html: 'You can learn more about managing projects\n<a href="https://help.inaturalist.org/support/solutions/articles/151000176472">here</a>\nor read the history of projects on\n<a href="https://www.inaturalist.org/blog/15450-announcing-changes-to-projects-on-inaturalist">our blog</a>.\n',
                    you_have_not_defined_any_observation_requirements: "You have not defined any observation requirements. Make sure to select one or more taxa\n(e.g. birds, conifers), places (e.g. Brazil, Yellowstone), users, and/or dates to define\nthe observations that you want to include in your project.\n"
                },
                project_type: "Project Type",
                projects_included: "Projects Included",
                show: {
                    are_you_sure_you_want_to_convert: "Are you sure you want to convert this project to a Collection Project?\n",
                    click_here_to_convert_this_project: "Click here to convert this project to a Collection Project.\n",
                    make_sure_you_have_read_about_the_differences: 'Make sure you have read about the differences in\nour <a href="%{url}" target="_blank">blog post about Collection Projects</a>.\n',
                    this_is_a_preview: "This is a preview of what this project would look like as a Collection Project.\n",
                    this_project_has_not_defined_requirements: "This project has not defined any observation requirements. Projects need to select one or\nmore taxa (e.g. birds, conifers), places (e.g. Brazil, Yellowstone), users, and/or dates\nto begin displaying observations.\n"
                },
                tracks_multiple_projects: "tracks multiple projects",
                umbrella: "Umbrella"
            },
            shared: {
                blocked: {
                    youve_been_blocked: "You've Been Blocked",
                    youve_been_blocked_desc: "The owner of this resource has blocked you, which prevents you from\ncommunicating with them. Most interactive features on this page will\nnot work.\n",
                    youve_blocked: "You've Blocked This Person",
                    youve_blocked_desc: "You have blocked the owner of this resource, which prevents you from\ncommunicating with them. Most interactive features on this page will\nnot work.\n"
                },
                spam: {
                    this_has_been_flagged_as_spam: "This has been flagged as spam"
                }
            },
            stats: {
                index: {
                    obs_1_day: "Obs (1 day)",
                    obs_cid_d_to_genus: "Obs CID'd to genus",
                    recent_w_0_obs: "Recent w/ 0 obs",
                    recent_w_7_obs: "Recent w/ >= 7 obs"
                },
                year: {
                    added_both: "Added Both",
                    added_only_identifications: "Added Only Identifications",
                    added_only_observations: "Added Only Observations",
                    broader_impacts: "Broader Impacts",
                    broader_impacts_desc: "Several external partners regularly import iNaturalist observations to\nsupport science and conservation. Your observations, identifications,\nand open license choices allow these organizations to provide useful\nbiodiversity information to people that need it around the world.\n",
                    compare_desc: "How did this year compare to your previous years? With three years of\nusage or more we can start comparing yearly activity metrics. The\ngreen bar shows this year, the white vertical bar shows last year, and\nthe gray background areas show the lowest and highest years, as well\nas the average for all years. Stats do not include years where the\ncount was zero.\n",
                    compared_to_previous_years: "Compare to Previous Years",
                    donate_desc2_html: 'Thank you for being generous with your time, attention, expertise,\nand donations! iNaturalist is a 501(c)3 nonprofit organization\nbased in the United States. It\u2019s supported by a\n<a href="%{team_url}">small team</a> that does all the design and software\nengineering for web, mobile, and <a href="%{seek_url}">Seek by\niNaturalist</a>, in addition to managing the community support,\ncollaborations, and integrations that keep things running\n(and growing rapidly!). The program relies on numerous grants and\ndonations, including charitable gifts from less than tiny fraction\nof contributors. We are especially grateful to Monthly Supporters\nwhose recurring gifts help us plan for the future. You can donate\nin multiple currencies to support iNaturalist\u2019s core operations.\nThank you to everyone for your part in making %{year} iNaturalist\u2019s\nbiggest year yet!\n',
                    donate_title: "Special Thanks to All Our Supporters",
                    donors: "Donors",
                    donors_guide_label_our_goal_is_1000: "Our goal is 1,000 recurring donors per month",
                    growth_by_country_desc_html: 'Where is growth happening? This map and chart attempt to break this\ndown by country, which turns out to be complicated because growth by\ncountry can be very imbalanced. Here we\'ve chosen to omit the United\nStates and use a log scale by default to accentuate differences\nbetween other countries. If a country is colored black that means it\ndid not contribute signicantly to a percentage, or it had no growth\nthis year, or did not have more observations this year than last year\n(hover over a country to see a little more detail). <strong>"% of\ntotal growth"</strong> means how much of worldwide growth came from a\nparticular country, e.g. if there were 20 observations in 2018 and 10\nin 2017, that would be 10 observations of growth, and if 5 of those\nobservations were from Benin, then Benin contributed 50% of total\ngrowth. <strong>"% growth"</strong> means the number of observations\nthis year in that country as a percent of observations last year in\nthat country, so if there were 10 observations in Laos last year but\n20 this year, that would be 100% growth, and if there were 0 last year\nand 1 this year, that\'s infinity % growth.\n',
                    growth_by_country_title: "Growth By Country",
                    growth_desc: 'The "Observations" and "Taxa" charts may include data visible on\n%{site_name} contributed by people who are not affiliated with\n%{site_name}, while the "Users" chart only shows the dates when users\ncurrently affiliated with %{site_name} joined iNaturalist.\n',
                    growth_in_year_obs: "Growth in %{year} (obs)",
                    growth_title: "Growth",
                    inaturalist_network: "iNaturalist Network",
                    inaturalist_network_desc: "Check out the Year in Review for the members of the iNaturalist Network.\n",
                    include_usa: "Include US",
                    low_too_small: "Low: %{low_value} (%{low_desc}), too small to show",
                    new_species_desc_html: "Species that were added for the first time this year.\nClick on a month to view some of the new species added in that month.\nYou can also view the total species accumulation, or move the slider\nback in time to see other newly-observed species. This chart shows\nspecies from verifiable observations by the month they were uploaded\nto %{site_name} (not the month they were observed). It does not\ninclude higher or lower level taxa, so an observation identified as\nMammalia doesn't count, and an observation of <i>Canis lupus</i> ssp.\n<i>arctos</i> will just count as <i>Canis lupus</i>.\n",
                    new_species_per_year: "New Species / Year",
                    new_species_per_year_by_date_added: "By date added",
                    new_species_per_year_by_date_observed: "By date observed",
                    obs_in_year: "Obs in %{year}",
                    observation_streaks: "Observation Streaks",
                    observation_streaks_color_desc: "Color represents the number of days on a logarithmic scale:\n",
                    observation_streaks_desc2: "An observation streak is a period of at least five days when someone\ngot outside and recorded new, verifiable observations every single\nday. Here we're showing the longest streaks that began this year or\nwere in progress when these stats were generated (for individual users\nwe're also including streaks that ended this year).\n",
                    observations_per_year: "Observations / Year",
                    observations_per_year_by_date_added: "By date added",
                    observations_per_year_by_date_observed: "By date observed",
                    one_time: "One-time",
                    percent_growth_in_year: "% Growth in %{year}",
                    percent_of_total_growth: "% of Total Growth",
                    publications_desc_short_html: 'Click the flower charts for more information about what the numbers\nand colors mean. Impact data and charts courtesy of\n<a href="https://www.altmetric.com">Altmetric</a>. Information\nabout data usage courtesy of our friends at the\n<a href="https://www.gbif.org/">Global Biodiversity Information Facility</a>.\n',
                    recurring: "Recurring",
                    species_per_year: "Species / Year",
                    species_per_year_by_date_added: "By date added",
                    species_per_year_by_date_observed: "By date observed",
                    stats_generated_datetime: "Stats generated on %{datetime}",
                    stats_generation_schedule: "Stats will be generated every Sunday in December and on January 1st",
                    store_prompt: "Want to show your iNat pride everywhere you go? Check out the iNat\nStore!\n",
                    sunburst_desc_html: 'Observed taxa arranged as a hierarchical "sunburst" diagram. The base\nof the hierarchy is at the center, starting with "Life" and ending\nwith species at the outer edges. The size of each arc is proportional\nto the number of observations of that taxon, and colors roughly\ncorrespond to our usual "iconic" taxon colors (green for plants,\norange for insects, blue for most other animals, etc.), so if you\'re\nseeing a lot of green, that means you observed a lot of plants.\n<strong>Click an arc to place that taxon at the center</strong> and\nits children around it, or <strong>click the center to move back up\nthe hierarchy</strong>.\n',
                    translators_desc: "Did you know iNaturalist has been translated into %{x_languages},\nalmost entirely by %{x_people}, some of whom don't even use iNat? Here\nare all the amazing translators who have added translations this year,\nalong with the number of words they've translated for the\n%{website_link_tag}website%{link_tag_end}, our\n%{iphone_link_tag}iPhone%{link_tag_end} and\n%{android_link_tag}Android%{link_tag_end} apps, and\n%{seek_link_tag}Seek%{link_tag_end}. You can view\nall people who have contributed translations,\nincluding people from past years and folks from Translatewiki, in our\n%{view_all_web_link_tag}web%{link_tag_end} and\n%{view_all_mobile_link_tag}mobile%{link_tag_end} code repositories.\n",
                    translators_desc_2: "Did you know iNaturalist has been translated into %{x_languages},\nalmost entirely by %{x_people}, some of whom don't even use iNat? Here\nare all the amazing translators who have added translations this year,\nalong with the number of words they've translated for the\n%{website_link_tag}website%{link_tag_end}, our\n%{iphone_link_tag}iPhone%{link_tag_end} and\n%{android_link_tag}Android%{link_tag_end} apps,\n%{seek_link_tag}Seek%{link_tag_end}, and\n%{help_link_tag}iNatHelp%{link_tag_end}.\n",
                    translators_desc_for_site: "Did you know %{site_name} has been translated almost entirely by\n%{x_people}? Here are all the amazing translators who\nhave added translations this year, along with the number of words\nthey've translated for the\n%{website_link_tag}website%{link_tag_end}, the iNaturalist\n%{iphone_link_tag}iPhone%{link_tag_end} and\n%{android_link_tag}Android%{link_tag_end} apps, and\n%{seek_link_tag}Seek%{link_tag_end}. You can view\nall people who have contributed translations in all languages,\nincluding people from past years and folks from Translatewiki, in our\n%{view_all_web_link_tag}web%{link_tag_end} and\n%{view_all_mobile_link_tag}mobile%{link_tag_end} code repositories.\n",
                    translators_desc_for_site_2: "Did you know %{site_name} has been translated almost entirely by\n%{x_people}? Here are all the amazing translators who\nhave added translations this year, along with the number of words\nthey've translated for the\n%{website_link_tag}website%{link_tag_end}, the iNaturalist\n%{iphone_link_tag}iPhone%{link_tag_end} and\n%{android_link_tag}Android%{link_tag_end} apps,\n%{seek_link_tag}Seek%{link_tag_end}, and\n%{help_link_tag}iNatHelp%{link_tag_end}.\n",
                    translators_prompt: "If you want to help translate, %{link_tag}learn how%{link_tag_end}.\n",
                    translators_title: "Translators",
                    view_all_publications_count_caps2: {
                        zero: "VIEW ALL %{count} PUBLICATIONS",
                        one: "VIEW %{count} PUBLICATION",
                        few: "VIEW ALL %{count} PUBLICATIONS",
                        many: "VIEW ALL %{count} PUBLICATIONS",
                        other: "VIEW ALL %{count} PUBLICATIONS"
                    }
                }
            },
            taxa: {
                show: {
                    about_conservation_status_desc: "The conservation status summarizes the risk of extinction for a group of organisms.\n",
                    about_establishment_desc: '"Establishment means" describes how a species arrived where it\ncurrently occurs. Introduced means it arrived because of human\nactivity, while native means it arrived without human assistance.\nEndemic species only occur in a specific place and nowhere else.\n',
                    about_names_desc: '<p>\n  Most categories of organisms have "common names" in spoken\n  languages. These names are usually recognizable, easy to pronounce,\n  and stable over time, but many organisms have several different\n  names in different places, even in the same language, which can make\n  it difficult to communicate about these organisms without confusion.\n  Scientists address this problem by using a single "scientific name"\n  for each category of organism that conforms to the rules of\n  <a href="https://en.wikipedia.org/wiki/Binomial_nomenclature">biological nomenclature</a>,\n  but these names tend to be based on Latin, a language nobody\n  speaks, so they are not as memorable as common names for many\n  people. Scientific names can also reflect an organism\'s taxonomic\n  placement, so they can change when scientists develop more\n  accurate theories about the evolutionary relationships between\n  different organisms, again reducing their usefulness in\n  communication, even among people who know scientific names.\n</p>\n<p>\n  The old adage sums it up: "Common names change from place to\n  place, and scientific names change from time to time."\n</p>\n<p>\n  We try to address these shortcomings by showing both common\n  and scientific names wherever possible, and choosing common names\n  based on the language and geographic preferences of the viewer.\n  Names are listed by their global priority within each Language /\n  Type.\n</p>\n',
                    about_regional_names_desc: "<p>\n  Names may be added to places (usually countries) in cases where\n  different countries or regions use different common names in the\n  same language. For example, Mexico and Costa Rica may have different\n  Spanish names for the same species.\n</p>\n<p>\n  This table shows which names have been added to which places, and\n  are listed in order of priority for each place. If two Spanish names\n  are added to Mexico, the one listed first will appear if you prefer\n  to see Spanish names added to Mexico.\n</p>\n",
                    charts_caps: "CHARTS",
                    charts_help_history: "This chart shows the number of observations of this taxon by month for\nthe last ten years. Again, it is biased by the number of people\nobserving, but it will show you unusual spikes in observations, and if\nit seems flat or decreasing despite an increasing number of observers,\nthat might suggest a change in abundance.\n",
                    charts_help_other: "We also show seasonality charts for observation annotations.\nAnnotations are a way to add metadata to observations using\na controlled vocabulary of terms, e.g. whether an observation depicts\na plant that is flowering or fruiting.\n",
                    charts_help_relative_observations: "Showing frequency as a relative proportion of all observations helps\nsmooth out the effect of the overall growth of the site. For example,\nif the site is growing as we get more observations with every passing\nyear, we get more observations of any individual taxon, which doesn't\ntell you anything about whether there are more of that taxon around to\nobserve, just that there are more people observing it. Showing the\nrelative proportion means that if there are 100 observations total but\n20 observations of this taxon, the proportion is 0.2 (20 / 100). If\npeople observe 2000 observations the next year and 400 observations of\nthis taxon, the proportion is still 0.2 (400 / 2000). This causes some\naberrations when there are very few observers in an area, or for taxa\nthat are very infrequently observed, but that's true of total counts\nas well.\n",
                    charts_help_seasonality: 'This chart shows the number of observations of this taxon grouped by\nmonth. Keep in mind that these are numbers of observations, so they\nare influenced both by when the organism can be observed and when\npeople bother to observe them. So a bird might seem to be very active\nin May, but that could also be due to more people birding in May who\ntend to ignore that species in later months. Similarly, if you see\nmore dragonflies in June than in January, that\'s probably because we\nhave more people observing in the northern hemisphere than in the\nsouthern hemisphere and not because dragonflies are more active in\nJune, so check the map when considering these charts. It\'s always a\ngood idea to be skeptical of these charts when there are low numbers\nof observations and/or large discrepancies between the number of\n"Verifiable" and "Research Grade" observations.\n',
                    complete_taxon_desc: '"Complete" taxa have all of their descendant, extant taxa of a\nspecific rank present in the site\'s database. When a taxon is\ncomplete to species, for example, we can say how many of its species\nhave been observed and how many still need to be observed. Counts of\nspecies for "complete" taxa complete to species do not include\n"uncountable" species like extinct species or inactive species\nconcepts, and they only include species, not infraspecific taxa like\nsubspecies or varieties.\n',
                    discoveries_desc: "Most recent newly-identified species in this taxon",
                    frequency: {
                        research: "Research Grade",
                        verifiable: "Verifiable",
                        "Alive or Dead=Alive": "Alive",
                        "Alive or Dead=Dead": "Dead",
                        "Plant Phenology=Budding": "Budding",
                        "Plant Phenology=Flower Budding": "Flower Budding",
                        "Plant Phenology=Flowering": "Flowering",
                        "Plant Phenology=Fruiting": "Fruiting",
                        "Plant Phenology=No Evidence of Flowering": "No Evidence of Flowering",
                        "Flowers and Fruits=Flower Buds": "Flower Buds",
                        "Flowers and Fruits=Flowers": "Flowers",
                        "Flowers and Fruits=Fruits or Seeds": "Fruits or Seeds",
                        "Flowers and Fruits=No Flowers or Fruits": "No Flowers or Fruits",
                        "Leaves=Breaking Leaf Buds": "Breaking Leaf Buds",
                        "Leaves=Green Leaves": "Green Leaves",
                        "Leaves=Colored Leaves": "Colored Leaves",
                        "Leaves=No Live Leaves": "No Live Leaves",
                        "Life Stage=Egg": "Egg",
                        "Life Stage=Larva": "Larva",
                        "Life Stage=Juvenile": "Juvenile",
                        "Life Stage=Nymph": "Nymph",
                        "Life Stage=Pupa": "Pupa",
                        "Life Stage=Subimago": "Subimago",
                        "Life Stage=Teneral": "Teneral",
                        "Sex=Cannot Be Determined": "Cannot Be Determined",
                        "Sex=Female": "Female",
                        "Sex=Male": "Male",
                        unannotated: "No Annotation"
                    },
                    max_photos_desc: "A taxon can only have %{max} photos. You'll need to remove existing\nphotos to add more.\n",
                    photo_chooser_modal_desc: "Drag photos here from the left, or drag photos here to re-arrange.\n",
                    photo_chooser_modal_explanation: "Note that the taxon page will show photos of this taxon\nand its descendants. The photos chosen for this\ntaxon will show first, though. The first photo will be\nthe default image used across the site.\n",
                    trending_desc: "Most-observed taxa in the last month",
                    trending_in_place_desc_html: 'Most-observed taxa in the last month in <a href="%{url}">%{place}</a>',
                    wanted_desc: "Species in this taxon that have not been observed yet."
                }
            },
            users: {
                edit: {
                    blocking_desc_html: "<p>\n  Blocking someone prevents them from messaging you, commenting on your\n  observations, identifying your observations, and otherwise interacting\n  with you on %{site_name}. It also removes their observations from your\n  search results and removes your observations from their search\n  results. However, it does not make you invisible to them. They can\n  still find your observations and view your profile, they just can't\n  interact with you.\n</p>\n<p>\n  Blocking is for situations where you just can't get along with\n  someone and they won't leave you alone, despite your best efforts to\n  settle disputes in a civilized manner. It is not a way to hide from\n  people, to prevent identifications from people whose opinions you\n  don't trust, or to opt out of the community ID (there's another\n  setting for that). Thus, blocking works both ways: if you block\n  someone, they can't interact with you, but you also can't interact\n  with them. If you misuse it to prevent someone from identifying your\n  observations, you also prevent yourself from identifying their\n  observations.\n</p>\n<p>\n  You can only block three people. We think this is a reasonable\n  number that accommodates the people who need blocking while\n  preventing abuse of blocking. If you feel you need to block more\n  people, please <a href=\"mailto:%{help_email}\">contact us</a>.\n</p>\n<p>\n  If someone is harassing or stalking you on %{site_name},\n  <a href=\"mailto:%{help_email}\">please let us know</a>. If\n  this represents a violation of our Terms of Use or represents\n  other behavior we deem inappropriate for our site, we will\n  investigate.\n</p>\n",
                    common_scientific_name_display_order: "Common / Scientific Name Display Order",
                    errors: {
                        unsupported_file_type: "File type not supported. We accept JPG, PNG, and GIF"
                    },
                    inaturalist_network_affiliation_desc_html: '<p>\n  The <a href="%{url}" target="_blank">iNaturalist Network</a> is a\n  collection of localized websites that are fully connected to the\n  global iNaturalist community. Network sites are supported by local\n  institutions that have signed an agreement with iNaturalist to\n  promote local use and benefit local biodiversity. They have access\n  to true coordinates from their countries that are automatically\n  obscured from public view in order to protect threatened species.\n</p>\n<p>\n  Your username and password work on all sites that are part of\n  the iNaturalist Network. If you choose to affiliate with a Network\n  site, the local institutions that operate each site will also have\n  access to your email address (only to communicate with you about\n  site activities) and access to the true coordinates for observations\n  that are publicly obscured or private.\n</p>\n<p>\n  Note: Please do not experimentally change your affiliation if you\n  have more than 1000 observations.\n</p>\n',
                    licensing_desc_html: 'Licensing your content gives anyone the legal right to use it without\nasking your permission if they abide by the terms of the license. In\naddition, %{site_name} includes your Creative Commons-licensed content\nin regularly-updated archives produced for select partner\norganizations interested in our data. For example, we include No\nCopyright (CC0), Attribution (CC BY), and Attribution-NonCommercial\n(CC BY-NC) records in the archive we generate for the\n<a href="http://www.gbif.org/">Global Biodiversity Information\nFacility</a> (GBIF), an international, inter-governmental organization\nthat compiles and distributes biodiversity information from around the\nworld.\n',
                    monthly_supporter_desc_html: 'iNaturalist Monthly Supporters make automatic monthly contributions\nto iNaturalist (United States IRS EIN 92-1296468) to support the\nnot-for-profit operation of iNaturalist and iNaturalist Network\nsites. <a href="%{url}">Click here to become a Monthly\nSupporter</a>. When we have confirmed your support you will be able\nto check this box to display this status on your profile. Note: the\nemail addresses on Donorbox and iNaturalist must match exactly for\nus to confirm that you are a Monthly Supporter. If they differ,\nchange one to match the other.\n',
                    muting_desc_html: "<p>\n  Muting someone prevents you from receiving notifications about things\n  they do, including commenting on your observations, messaging you,\n  mentioning you, etc. Muting helps you ignore someone without\n  preventing them from doing anything.\n</p>\n<p>\n  You can mute as many people as you want, but keep in mind that\n  you'll be missing out on potentially important notifications, like\n  identifications that shift the Community ID on your observations.\n</p>\n",
                    notification_preferences_comments: "Comments",
                    notification_preferences_identifications: "Identifications",
                    notification_preferences_mentions: "Mentions",
                    notification_preferences_messages: "Messages",
                    notification_preferences_project_added_your_observations: "When a project adds your observations",
                    notification_preferences_project_curator_changes: "Project curator changes",
                    notification_preferences_project_journal_posts: "Project journal posts",
                    notification_preferences_taxon_changes: "Taxonomy changes",
                    notification_preferences_taxon_or_place_observations: "Observations of taxa or from places that I subscribe to",
                    notification_preferences_user_observations: "Observations by people I follow",
                    prefers_community_taxa_desc: "%{site_name} tracks what you think your observations are and what the\ncommunity thinks they are. If you don't think the community's opinion\nshould overrule your own, you can opt out here. People will still be\nable to add identifications, but your observations will remain\nassociated with the taxon from your identification. This means your\nobservations will not be eligible for Research Grade status unless\nyour identification matches the community's opinion.\n",
                    prefers_no_tracking_label: "Do not collect stability and usage data using third-party services",
                    prefers_no_tracking_label_desc_info_we_share: "Information we might share with these third parties include\n",
                    prefers_no_tracking_label_desc_info_we_share_browser_details: "Browser details, like make, model, and version\n",
                    prefers_no_tracking_label_desc_info_we_share_crash_details: "Crash details, like exactly what line of code caused a crash\n",
                    prefers_no_tracking_label_desc_info_we_share_device_details: "Device details, like make and model of a mobile phone\n",
                    prefers_no_tracking_label_desc_info_we_share_ip_addresses_html: 'IP addresses (which can be used to derive location at city-level\nresolution, and to track you across different websites and services;\nnote that we have enabled\n<a href="https://support.google.com/analytics/answer/2763052">IP anonymization</a>\nin Google Analytics; Firebase Crashlytics\n<a href="https://firebase.google.com/support/privacy">\nmay store IP addresses</a> temporarily)\n',
                    prefers_no_tracking_label_desc_limits: "Note that this option only applies to analytics and crash data that we\nare explicitly sending to these companies. All iNaturalist servers are\nprovided and hosted by Microsoft, all iNaturalist images are hosted by\nAmazon, and almost all iNaturalist maps are served by Google, which\nmeans every time you look at an observation on iNaturalist, you are\nconnecting to services provided by these companies and exposing your\nIP address to them, at the very least (in the iPhone app we use\nApple\u2019s maps). iNaturalist probably would not exist without the\nservices these companies provide, and while we can limit the amount\nand kinds of data you share with them while using iNat, we cannot stop\nthe flow of data entirely.\n",
                    prefers_no_tracking_label_desc_value_html: "<strong>These third-party services provide enormous value to\nus</strong> in maintaining the stability and usability of iNaturalist\nwith our relatively small staff. On mobile devices, there is almost no\nother way we can gain insight into problems that are occurring, since\nthe software is running on devices we do not control. Sometimes we\naren\u2019t even aware such problems are occurring until we see them in the\ndata these services provide. <strong>By sharing this information, you\nare helping us serve you and the entire iNaturalist\ncommunity.</strong>\n",
                    prefers_no_tracking_label_desc_we_use: "We use a variety of third-party services to monitor stability and\ndiagnose bugs and problems in our software. These third parties\ninclude\n",
                    prefers_no_tracking_label_desc_we_use_google_html: 'Google (<a href="https://analytics.google.com">Google Analytics</a>, <a href="https://firebase.google.com/products/crashlytics/">Firebase Crashlytics</a>)',
                    project_addition_preferences: {
                        any: "Any",
                        joined: "Projects you've joined",
                        none: "None, only you can add your observations to projects"
                    },
                    project_settings_desc: "Remember, this does not give projects permission to access your\nhidden coordinates or send you updates. You must join projects in\norder to grant these permissions, or grant them on a case-by-case\nbasis.\n",
                    taxon_change_desc: "When taxa are merged or renamed on %{site_name}, your observations, listed\ntaxa, identifications, etc. will be automatically updated to the new\ntaxa if the change is unambiguous. If you opt out or the change is\nambiguous (e.g. a split), you will receive an update about the\nchange linking to a tool you can use to manually update your content\nif you choose.\n",
                    taxon_name_priorities: {
                        add_a_common_name_lexicon: "Add a common name lexicon",
                        add_a_place_optional: "Add a place (optional)",
                        common_name_lexicon_display_order: "Common Name Lexicon Display Order",
                        common_name_lexicons: "Common Name Lexicons",
                        common_name_lexicons_description: "By default, common names are displayed in your account language/locale. To see names in other lexicons, or to prioritize names used in specific places (such as English (Australia) or Spanish (Costa Rica)), add common name lexicons. A maximum of 3 common names can be displayed at a time. If no common name exists for a lexicon you have chosen, it will be omitted from display.",
                        for_multiple_common_name_lexicons_drag_and_drop: "For multiple common name lexicons, drag and drop the settings below to customize the order in which they are displayed.",
                        same_as_language_locale_preference: "Same as user language/locale preference",
                        same_as_locale: "Same as locale",
                        select_a_lexicon: "Select a lexicon",
                        the_maximum_number_of_lexicons_have_been_added: "The maximum of 3 common name lexicons have already been added"
                    },
                    this_only_applies_to_traditional_projects2: 'This only applies to traditional projects. You can\'t exclude observations\nfrom collection or umbrella projects, which are essentially saved searches.\nYou can read more\n<a href="https://help.inaturalist.org/support/solutions/articles/151000176472">here</a>.\n'
                }
            },
            welcome: {
                index: {
                    observations_to_date: {
                        zero: "Observations to Date",
                        one: "Observation to Date",
                        few: "Observations to Date",
                        many: "Observations to Date",
                        other: "Observations to Date"
                    },
                    people_signed_up: {
                        zero: "People Signed Up",
                        one: "Person Signed Up",
                        few: "People Signed Up",
                        many: "People Signed Up",
                        other: "People Signed Up"
                    },
                    species_observed: {
                        zero: "Species Observed",
                        one: "Species Observed",
                        few: "Species Observed",
                        many: "Species Observed",
                        other: "Species Observed"
                    }
                }
            }
        },
        visually_similar: "Visually Similar",
        vulnerable: "Vulnerable",
        wanted: "Wanted",
        we_have_no_conservation_status_for_this_taxon: "We have no conservation status for this taxon",
        we_have_no_establishment_data_for_this_taxon: "We have no establishment data for this taxon",
        website: "Website",
        week_of_date: "Week of %{date}",
        were_pretty_sure_this_is_in_the_family: "We're pretty sure this is in the family",
        were_pretty_sure_this_is_in_the_genus: "We're pretty sure this is in the genus",
        were_pretty_sure_this_is_in_the_order: "We're pretty sure this is in the order",
        were_pretty_sure_this_is_in_the_rank: "We're pretty sure this is in the %{rank}",
        "whats_this?": "What's this?",
        "which_projects_can_add_your_observations?": "Which traditional projects can add your observations?",
        who_can_add_observation_fields_to_my_obs: "Who can add observation fields to my observations?",
        who_can_see_the_coordinates: "Who Can See the Coordinates",
        who_can_see_the_coordinates_observer: "The person who made the observation",
        who_can_see_the_coordinates_projects: "Curators of the following projects",
        who_can_see_the_coordinates_trusted: "Individuals who the observer has trusted with their hidden coordinates",
        who_helped_user_the_most: "Who Helped %{user} the Most",
        who_user_helped_the_most: "Who %{user} Helped the Most",
        why_the_coordinates_are_obscured: "Why the Coordinates Are Obscured",
        why_you_can_see_the_coordinates: "Why You Can See the Coordinates",
        wikimedia: "Wikimedia",
        wild: "Wild",
        with_annotation: "With Annotation",
        withdraw: "Withdraw",
        without_annotation: "Without Annotation",
        worldwide: "Worldwide",
        x_comments: {
            one: "%{count} comment",
            other: "%{count} comments"
        },
        x_faves: {
            one: "%{count} fave",
            other: "%{count} faves"
        },
        x_flagged: "%{x} flagged",
        x_flagged_as_flag: "%{x} flagged as %{flag}",
        x_identifications: {
            one: "%{count} identification",
            other: "%{count} identifications"
        },
        x_identifications_: {
            zero: "%{count} Identifications",
            one: "%{count} Identification",
            few: "%{count} Identifications",
            many: "%{count} Identifications",
            other: "%{count} Identifications"
        },
        x_identifications_html: {
            zero: '<span class="count">%{count}</span> identifications',
            one: '<span class="count">%{count}</span> identification',
            few: '<span class="count">%{count}</span> identifications',
            many: '<span class="count">%{count}</span> identifications',
            other: '<span class="count">%{count}</span> identifications'
        },
        x_identifiers_caps_html: {
            zero: '<span class="count">%{count}</span> IDENTIFIERS',
            one: '<span class="count">%{count}</span> IDENTIFIER',
            few: '<span class="count">%{count}</span> IDENTIFIERS',
            many: '<span class="count">%{count}</span> IDENTIFIERS',
            other: '<span class="count">%{count}</span> IDENTIFIERS'
        },
        x_languages: {
            zero: "%{count} languages",
            one: "%{count} language",
            few: "%{count} languages",
            many: "%{count} languages",
            other: "%{count} languages"
        },
        x_matching_taxa_html: {
            one: '<span class="count">%{count}</span> matching taxon',
            other: '<span class="count">%{count}</span> matching taxa'
        },
        x_misidentifications_of_species_in_this_genus: {
            one: "%{count} misidentification of species in this genus",
            other: "%{count} misidentifications of species in this genus"
        },
        x_misidentifications_of_species_in_this_rank: {
            one: "%{count} misidentification of species in this %{rank}",
            other: "%{count} misidentifications of species in this %{rank}"
        },
        x_misidentifications_of_this_species: {
            one: "%{count} misidentification of this species",
            other: "%{count} misidentifications of this species"
        },
        x_new_species: {
            one: "%{count} New Species",
            other: "%{count} New Species"
        },
        x_new_users: {
            zero: "%{count} New Users",
            one: "%{count} New User",
            few: "%{count} New Users",
            many: "%{count} New Users",
            other: "%{count} New Users"
        },
        x_observations: {
            zero: "%{count} observations",
            one: "%{count} observation",
            few: "%{count} observations",
            many: "%{count} observations",
            other: "%{count} observations"
        },
        x_observations_: {
            zero: "%{count} Observations",
            one: "%{count} Observation",
            few: "%{count} Observations",
            many: "%{count} Observations",
            other: "%{count} Observations"
        },
        x_observations_caps_html: {
            zero: "<span class='count'>%{count}</span> OBSERVATIONS",
            one: "<span class='count'>%{count}</span> OBSERVATION",
            few: "<span class='count'>%{count}</span> OBSERVATIONS",
            many: "<span class='count'>%{count}</span> OBSERVATIONS",
            other: "<span class='count'>%{count}</span> OBSERVATIONS"
        },
        x_observations_failed: {
            one: "%{count} observation failed",
            other: "%{count} observations failed"
        },
        x_observations_html: {
            zero: "<span class='count'>%{count}</span> observations",
            one: "<span class='count'>%{count}</span> observation",
            few: "<span class='count'>%{count}</span> observations",
            many: "<span class='count'>%{count}</span> observations",
            other: "<span class='count'>%{count}</span> observations"
        },
        x_observations_link_html: {
            one: "<a href='%{url}'>%{count} observation</a>",
            other: "<a href='%{url}'>%{count} observations</a>"
        },
        x_observations_reviewed_html: {
            one: "<span class='count'>%{count}</span> observation reviewed",
            other: "<span class='count'>%{count}</span> observations reviewed"
        },
        x_observers_caps_html: {
            zero: '<span class="count">%{count}</span> OBSERVERS',
            one: '<span class="count">%{count}</span> OBSERVER',
            few: '<span class="count">%{count}</span> OBSERVERS',
            many: '<span class="count">%{count}</span> OBSERVERS',
            other: '<span class="count">%{count}</span> OBSERVERS'
        },
        x_of_count_confirmed: {
            zero: "%{x} of %{count} confirmed",
            one: "%{x} of %{count} confirmed",
            few: "%{x} of %{count} confirmed",
            many: "%{x} of %{count} confirmed",
            other: "%{x} of %{count} confirmed"
        },
        x_of_y: "%{x} of %{y}",
        x_of_y_short: "%{x} / %{y}",
        x_others: {
            one: "%{count} other",
            other: "%{count} others"
        },
        x_people: {
            zero: "%{count} people",
            one: "%{count} person",
            few: "%{count} people",
            many: "%{count} people",
            other: "%{count} people"
        },
        x_people_helped_user_with_y_ids_html: "<strong>%{x} people</strong> helped %{user} with <strong>%{y} IDs</strong>",
        x_people_html: {
            zero: '<span class="count">%{count}</span> people',
            one: '<span class="count">%{count}</span> person',
            few: '<span class="count">%{count}</span> people',
            many: '<span class="count">%{count}</span> people',
            other: '<span class="count">%{count}</span> people'
        },
        x_photos: {
            one: "%{count} photo",
            other: "%{count} photos"
        },
        x_species: {
            zero: "%{count} Species",
            one: "%{count} Species",
            few: "%{count} Species",
            many: "%{count} Species",
            other: "%{count} Species"
        },
        x_species_caps_html: {
            zero: "<span class='count'>%{count}</span> SPECIES",
            one: "<span class='count'>%{count}</span> SPECIES",
            few: "<span class='count'>%{count}</span> SPECIES",
            many: "<span class='count'>%{count}</span> SPECIES",
            other: "<span class='count'>%{count}</span> SPECIES"
        },
        x_species_html: {
            zero: "<span class='count'>%{count}</span> species",
            one: "<span class='count'>%{count}</span> species",
            few: "<span class='count'>%{count}</span> species",
            many: "<span class='count'>%{count}</span> species",
            other: "<span class='count'>%{count}</span> species"
        },
        x_species_link_html: {
            one: "<a href='%{url}'>%{count} species</a>",
            other: "<a href='%{url}'>%{count} species</a>"
        },
        x_suggestions_filtered_by_colon: {
            one: "%{count} Suggestion Filtered By:",
            other: "%{count} Suggestions Filtered By:"
        },
        year_in_review: "Year In Review %{year}",
        year_in_review2: "Year in Review %{year}",
        yes: "Yes",
        yes_but_only_for_threatened: "Yes, but only for my observations of threatened taxa, not when I've set the\ngeoprivacy",
        yes_for_any_of_my_observations: "Yes, for any of my observations",
        yes_reject_it: "Yes, reject it",
        yesterday: "Yesterday",
        yir_code_contributors_desc_html: 'Our <a href="%{url}">software</a> is nearly all open-source, which means\nanyone can contribute if they know how. Here are the people who\nvolunteered code this year. Thank you, coders!\n',
        yir_donate_banner_all_thanks: "All thanks to people like you!",
        yir_donate_banner_inaturalist_in_year: "INATURALIST IN %{year}:",
        yir_donate_banner_inaturalist_thrives: "iNaturalist thrives thanks to people like you!",
        yir_donate_banner_reaching_millions: "Reaching millions. Illuminating biodiversity. Global collaboration.",
        yir_donate_banner_you_helped_inaturalist_thrive: "You helped iNaturalist thrive this year. Thank you!",
        yir_donate_inaturalist_needs_your_support: "iNaturalist Needs Your Support",
        yir_generating_and_sharing: "Generating and sharing high-impact biodiversity data at this unprecedented\nscale and speed has increasing costs\n",
        yir_millions_of_people_used_inaturalist: "Millions of people used iNaturalist and Seek by iNaturalist this year to\nconnect with nature\n",
        yir_monthly_supporters_random_selection: "Here is a random selection of iNat's heroic community members who donate every month.\n",
        yir_thank_your_for_being_generous2: "Thank you for being generous with your time, attention, expertise, and\ndonations! iNaturalist is a non-profit, public-benefit organization. The\nprogram relies on numerous grants and donations, including charitable gifts\nfrom less than a tiny fraction of the community. We are especially grateful\nto Monthly Supporters whose recurring gifts help us plan for the future.\n",
        yir_your_gift_sustains: "Your gift sustains this program with global reach and profound personal and\necological impacts\n",
        you_: "You",
        you_appear_offline_try_again: "You appear to be offline. Please try again when you are connected to the Internet.\n",
        you_are_not_editing_any_guides_add_one_html: 'You are not editing any guides. <a href="/guides/new">Add one</a>\n',
        you_are_setting_this_project_to_aggregate: "You are setting this project to aggregate all observations matching the\nfollowing rules: %{rules} Do you want to proceed?\n",
        you_are_submitting_obs_with_no_date_or_no_location: "You are submitting observations without dates or locations. Observations\nwithout this information are often impossible to identify and will not be\nvisible by default in observation searches.\n",
        you_curate_a_project_that_contains_this_observation: "You curate a project that contains this observation",
        you_curate_a_project_that_contains_this_observation_desc: "You can see obscured coordinates when you curate a project that contains an\nobservation and the observer has chosen to share coordinates with curators\nof that project.\n",
        you_faved_this: "You faved this!",
        you_have_not_confirmed_your_email_address: "You have not confirmed your email address!",
        you_must_fill_out_the_required_fields: "You must fill out the required fields",
        you_must_select_at_least_one_taxon: "You must select at least one taxon",
        you_need_to_select_some_observations_first: "You need to select some observations first.",
        you_retain_full_copyright: "You retain full copyright over your content aside from those rights granted to %{site_name} in our Terms of Use.",
        "you_sure_delete_comment?": "Are you sure you want to delete this comment?",
        "you_sure_delete_identification?": "Are you sure you want to delete this identification?",
        you_sure_delete_this_observation: "Are you sure you want to delete this observation?",
        you_will_no_longer_be_following_or_trusting: "You will no longer be following or trusting %{user}",
        your_browser_does_not_support_the_audio_element: "Your browser does not support the audio element.",
        your_default: "your default",
        your_hard_drive: "your hard drive",
        your_membership: "Your Membership",
        your_observations: "Your Observations",
        your_pinned_locations: "Your Pinned Locations",
        youre_not_following_anyone_on_inat: "You're not following anyone on %{site_name} yet!",
        yours: "Yours",
        z_to_a: "Z to A",
        zoom_in: "Zoom In",
        zoom_out: "Zoom Out",
        zoom_photo: "Zoom Photo"
    }, I18n.translations.af = I18n.translations.af || {}, I18n.translations.af.locales = {}, I18n.translations.ar = I18n.translations.ar || {}, I18n.translations.ar.locales = {
        ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629"
    }, I18n.translations.be = I18n.translations.be || {}, I18n.translations.be.locales = {
        be: "\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f"
    }, I18n.translations.bg = I18n.translations.bg || {}, I18n.translations.bg.locales = {
        bg: "\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438"
    }, I18n.translations.br = I18n.translations.br || {}, I18n.translations.br.locales = {}, I18n.translations.ca = I18n.translations.ca || {}, I18n.translations.ca.locales = {
        ca: "Catal\xe0"
    }, I18n.translations.cs = I18n.translations.cs || {}, I18n.translations.cs.locales = {
        cs: "\u010desky"
    }, I18n.translations.da = I18n.translations.da || {}, I18n.translations.da.locales = {
        da: "Dansk"
    }, I18n.translations.de = I18n.translations.de || {}, I18n.translations.de.locales = {
        de: "Deutsch"
    }, I18n.translations.el = I18n.translations.el || {}, I18n.translations.el.locales = {
        el: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac"
    }, I18n.translations["en-GB"] = I18n.translations["en-GB"] || {}, I18n.translations["en-GB"].locales = {}, I18n.translations["en-US"] = I18n.translations["en-US"] || {}, I18n.translations["en-US"].locales = {}, I18n.translations.eo = I18n.translations.eo || {}, I18n.translations.eo.locales = {}, I18n.translations["es-AR"] = I18n.translations["es-AR"] || {}, I18n.translations["es-AR"].locales = {
        "es-AR": "Espa\xf1ol (Argentina)"
    }, I18n.translations["es-CO"] = I18n.translations["es-CO"] || {}, I18n.translations["es-CO"].locales = {}, I18n.translations["es-CR"] = I18n.translations["es-CR"] || {}, I18n.translations["es-CR"].locales = {}, I18n.translations["es-MX"] = I18n.translations["es-MX"] || {}, I18n.translations["es-MX"].locales = {
        "es-MX": "Espa\xf1ol (M\xe9xico)"
    }, I18n.translations.es = I18n.translations.es || {}, I18n.translations.es.locales = {
        es: "Espa\xf1ol"
    }, I18n.translations.et = I18n.translations.et || {}, I18n.translations.et.locales = {
        et: "Eesti"
    }, I18n.translations.eu = I18n.translations.eu || {}, I18n.translations.eu.locales = {
        eu: "Euskara"
    }, I18n.translations.fa = I18n.translations.fa || {}, I18n.translations.fa.locales = {}, I18n.translations.fi = I18n.translations.fi || {}, I18n.translations.fi.locales = {
        fi: "suomi"
    }, I18n.translations.fil = I18n.translations.fil || {}, I18n.translations.fil.locales = {}, I18n.translations["fr-CA"] = I18n.translations["fr-CA"] || {}, I18n.translations["fr-CA"].locales = {}, I18n.translations.fr = I18n.translations.fr || {}, I18n.translations.fr.locales = {
        fr: "fran\xe7ais"
    }, I18n.translations.gd = I18n.translations.gd || {}, I18n.translations.gd.locales = {}, I18n.translations.gl = I18n.translations.gl || {}, I18n.translations.gl.locales = {
        gl: "Galego"
    }, I18n.translations.gu = I18n.translations.gu || {}, I18n.translations.gu.locales = {}, I18n.translations.he = I18n.translations.he || {}, I18n.translations.he.locales = {
        he: "\u05e2\u05d1\u05e8\u05d9\u05ea"
    }, I18n.translations.hi = I18n.translations.hi || {}, I18n.translations.hi.locales = {}, I18n.translations.hr = I18n.translations.hr || {}, I18n.translations.hr.locales = {
        hr: "Hrvatski"
    }, I18n.translations.hu = I18n.translations.hu || {}, I18n.translations.hu.locales = {
        hu: "magyar"
    }, I18n.translations.hy = I18n.translations.hy || {}, I18n.translations.hy.locales = {}, I18n.translations.id = I18n.translations.id || {}, I18n.translations.id.locales = {
        id: "Indonesia"
    }, I18n.translations.it = I18n.translations.it || {}, I18n.translations.it.locales = {
        it: "Italiano"
    }, I18n.translations.iw = I18n.translations.iw || {}, I18n.translations.iw.locales = {}, I18n.translations.ja = I18n.translations.ja || {}, I18n.translations.ja.locales = {
        ja: "\u65e5\u672c\u8a9e"
    }, I18n.translations.ka = I18n.translations.ka || {}, I18n.translations.ka.locales = {}, I18n.translations.kk = I18n.translations.kk || {}, I18n.translations.kk.locales = {
        kk: "\u049a\u0430\u0437\u0430\u049b\u0448\u0430"
    }, I18n.translations.kn = I18n.translations.kn || {}, I18n.translations.kn.locales = {
        kn: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1"
    }, I18n.translations.ko = I18n.translations.ko || {}, I18n.translations.ko.locales = {
        ko: "\ud55c\uad6d\uc5b4"
    }, I18n.translations.lb = I18n.translations.lb || {}, I18n.translations.lb.locales = {
        lb: "L\xebtzebuergesch"
    }, I18n.translations.lt = I18n.translations.lt || {}, I18n.translations.lt.locales = {
        lt: "Lietuvi\u0173"
    }, I18n.translations.lv = I18n.translations.lv || {}, I18n.translations.lv.locales = {
        lv: "Latvie\u0161u"
    }, I18n.translations.mi = I18n.translations.mi || {}, I18n.translations.mi.locales = {
        mi: "Te reo M\u0101ori"
    }, I18n.translations.mk = I18n.translations.mk || {}, I18n.translations.mk.locales = {
        mk: "\u043c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438"
    }, I18n.translations.ml = I18n.translations.ml || {}, I18n.translations.ml.locales = {}, I18n.translations.mr = I18n.translations.mr || {}, I18n.translations.mr.locales = {
        mr: "\u092e\u0930\u093e\u0920\u0940"
    }, I18n.translations.ms = I18n.translations.ms || {}, I18n.translations.ms.locales = {}, I18n.translations.nb = I18n.translations.nb || {}, I18n.translations.nb.locales = {
        nb: "Norsk Bokm\xe5l"
    }, I18n.translations.nl = I18n.translations.nl || {}, I18n.translations.nl.locales = {
        nl: "Nederlands"
    }, I18n.translations.nn = I18n.translations.nn || {}, I18n.translations.nn.locales = {}, I18n.translations.oc = I18n.translations.oc || {}, I18n.translations.oc.locales = {}, I18n.translations.pl = I18n.translations.pl || {}, I18n.translations.pl.locales = {
        pl: "Polski"
    }, I18n.translations["pt-BR"] = I18n.translations["pt-BR"] || {}, I18n.translations["pt-BR"].locales = {
        "pt-BR": "Portugu\xeas (Brasil)"
    }, I18n.translations.pt = I18n.translations.pt || {}, I18n.translations.pt.locales = {}, I18n.translations.ro = I18n.translations.ro || {}, I18n.translations.ro.locales = {}, I18n.translations.ru = I18n.translations.ru || {}, I18n.translations.ru.locales = {
        ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439"
    }, I18n.translations.sat = I18n.translations.sat || {}, I18n.translations.sat.locales = {}, I18n.translations.si = I18n.translations.si || {}, I18n.translations.si.locales = {}, I18n.translations.sk = I18n.translations.sk || {}, I18n.translations.sk.locales = {
        sk: "Slovensk\xfd"
    }, I18n.translations.sl = I18n.translations.sl || {}, I18n.translations.sl.locales = {
        sl: "Sloven\u0161\u010dina"
    }, I18n.translations.sq = I18n.translations.sq || {}, I18n.translations.sq.locales = {
        sq: "Shqip"
    }, I18n.translations.sr = I18n.translations.sr || {}, I18n.translations.sr.locales = {
        sr: "srpski"
    }, I18n.translations.sv = I18n.translations.sv || {}, I18n.translations.sv.locales = {
        sv: "Svenska"
    }, I18n.translations.sw = I18n.translations.sw || {}, I18n.translations.sw.locales = {}, I18n.translations.ta = I18n.translations.ta || {}, I18n.translations.ta.locales = {
        ta: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd"
    }, I18n.translations.te = I18n.translations.te || {}, I18n.translations.te.locales = {}, I18n.translations.th = I18n.translations.th || {}, I18n.translations.th.locales = {
        th: "\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22"
    }, I18n.translations.tr = I18n.translations.tr || {}, I18n.translations.tr.locales = {
        tr: "T\xfcrk\xe7e"
    }, I18n.translations.uk = I18n.translations.uk || {}, I18n.translations.uk.locales = {
        uk: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430"
    }, I18n.translations.vi = I18n.translations.vi || {}, I18n.translations.vi.locales = {}, I18n.translations["zh-CN"] = I18n.translations["zh-CN"] || {}, I18n.translations["zh-CN"].locales = {
        "zh-CN": "\u7b80\u4f53\u4e2d\u6587"
    }, I18n.translations["zh-HK"] = I18n.translations["zh-HK"] || {}, I18n.translations["zh-HK"].locales = {}, I18n.translations["zh-TW"] = I18n.translations["zh-TW"] || {}, I18n.translations["zh-TW"].locales = {
        "zh-TW": "\u7e41\u9ad4\u4e2d\u6587"
    },
    function() {
        function normalizeCount(count, locale) {
            var separator = I18n.t("number.format.separator", {
                    locale: locale
                }),
                delimiter = I18n.t("number.format.delimiter", {
                    locale: locale
                }),
                pieces = count.toString().split(separator),
                parsableString = pieces.join(".");
            return parsableString = 2 === pieces.length ? pieces[0].replace(delimiter, "") + "." + pieces[1] : pieces[0].replace(delimiter, ""), parseFloat(parsableString)
        }

        function eastSlavic(count, locale) {
            var n = normalizeCount(count, locale) || 0,
                mod10 = n % 10,
                mod100 = n % 100,
                isWhole = parseInt(n, 10) === n;
            return 1 === mod10 && 11 !== mod100 ? ["one"] : mod10 >= 2 && mod10 <= 4 && isWhole && !(mod100 >= 12 && mod100 <= 14 && isWhole) ? ["few"] : 0 === mod10 || mod10 >= 5 && mod10 <= 9 && isWhole || mod100 >= 11 && mod100 <= 14 && isWhole ? ["many"] : ["other"]
        }

        function westSlavic(count, locale) {
            var n = normalizeCount(count, locale) || 0,
                isWhole = parseInt(n, 10) === n;
            return 1 === n ? ["one"] : n >= 2 && n <= 4 && isWhole ? ["few"] : ["other"]
        }

        function oneUptoTwoOther(count, locale) {
            var n = normalizeCount(count, locale) || 0,
                isWhole = parseInt(n, 10) === n;
            return n && n >= 0 && n < 2 && isWhole ? ["one"] : ["other"]
        }

        function oneFewOther(count, locale) {
            var n = normalizeCount(count, locale) || 0,
                frac = n % 1;
            frac > 0 && (n = parseInt(frac.toString().split(".")[1], 10));
            var mod10 = n % 10,
                mod100 = n % 100;
            return 1 === mod10 && 11 !== mod100 ? ["one"] : [2, 3, 4].indexOf(mod10) >= 0 && ![12, 13, 14].indexOf(mod100) >= 0 ? ["few"] : ["other"]
        }

        function other() {
            return ["other"]
        }
        I18n.pluralization.default = function(count) {
                switch (normalizeCount(count, I18n.locale || "en")) {
                    case 0:
                        return ["zero", "other"];
                    case 1:
                        return ["one"];
                    default:
                        return ["other"]
                }
            }, I18n.pluralization.ar = function(count) {
                var n = normalizeCount(count, "ar") || 0,
                    mod100 = n % 100,
                    isWhole = parseInt(n, 10) === n;
                return 0 === n ? ["zero"] : 1 === n ? ["one"] : isWhole && mod100 >= 3 && mod100 <= 10 ? ["few"] : isWhole && mod100 >= 11 && mod100 <= 99 ? ["many"] : ["other"]
            },
            I18n.pluralization.br = function(count) {
                var n = normalizeCount(count, "br") || 0,
                    mod10 = n % 10,
                    mod100 = n % 100;
                return 1 === mod10 && [11, 71, 91].indexOf(mod100) < 0 ? ["one"] : 2 === mod10 && [12, 72, 92].indexOf(mod100) < 0 ? ["two"] : n % 1e6 == 0 && 0 !== n ? ["many"] : ["other"]
            }, I18n.pluralization.cs = function(count) {
                return westSlavic(count, "cs")
            }, I18n.pluralization.fr = function(count) {
                return oneUptoTwoOther(count, "fr")
            }, I18n.pluralization.hr = function(count) {
                return oneFewOther(count, "hr")
            }, I18n.pluralization.id = other, I18n.pluralization.ja = other, I18n.pluralization.ko = other, I18n.pluralization.lt = function(count) {
                var n = normalizeCount(count, "lt") || 0,
                    mod10 = n % 10,
                    mod100 = n % 100,
                    isWhole = parseInt(n, 10) === n;
                return 1 !== mod10 || mod100 >= 11 && mod100 <= 19 || !isWhole ? mod10 >= 2 && mod10 <= 9 && !(mod100 >= 11 && mod100 <= 19) && isWhole ? ["few"] : ["other"] : ["one"]
            }, I18n.pluralization.mi = other, I18n.pluralization.mk = function(count) {
                var n = normalizeCount(count, "mk") || 0,
                    isWhole = parseInt(n, 10) === n;
                return n % 10 == 1 && 11 !== n && isWhole ? ["one"] : ["other"]
            }, I18n.pluralization.ms = other, I18n.pluralization.pl = function(count) {
                var n = normalizeCount(count, "pl") || 0,
                    mod10 = n % 10,
                    mod100 = n % 100,
                    isWhole = parseInt(n, 10) === n;
                return 1 === n ? ["one"] : mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14) && isWhole ? ["few"] : [0, 1, 5, 6, 7, 8, 9].indexOf(mod10) >= 0 || [12, 13, 14].indexOf(mod100) >= 0 ? ["many"] : ["other"]
            }, I18n.pluralization.ro = function(count) {
                var n = normalizeCount(count, "ro") || 0,
                    mod100 = n % 100,
                    isWhole = parseInt(n, 10) === n;
                return 1 === n ? ["one"] : 0 === n || mod100 >= 1 && mod100 <= 19 && isWhole ? ["few"] : ["other"]
            }, I18n.pluralization.ru = function(count) {
                return eastSlavic(count, "ru")
            }, I18n.pluralization.sk = function(count) {
                return westSlavic(count, "sk")
            }, I18n.pluralization.sr = function(count) {
                return oneFewOther(count, "sr")
            }, I18n.pluralization.th = other, I18n.pluralization.uk = function(count) {
                return eastSlavic(count, "uk")
            }, I18n.pluralization.vi = other, I18n.pluralization.zh = other, I18n.pluralization["zh-CN"] = other, I18n.pluralization["zh-HK"] = other, I18n.pluralization["zh-TW"] = other
    }(), I18n.t = function(key, params) {
        var translation = I18n.translate(key, params);
        if ("string" != typeof translation) return translation;
        var matches = (translation || "").match(/@(\w+)\{(.+)\}/);
        if (!matches) return translation;
        var mapping = {};
        _.forEach(matches[2].split("|"), (function(piece) {
            var bits = piece.split(":");
            bits.length > 1 ? mapping[bits[0]] = bits[1] : mapping.other = bits[0]
        }));
        var newTranslation = translation.replace(matches[0], mapping.other),
            inflectionKey = matches[1];
        if (!inflectionKey) return newTranslation;
        var inflector = params[inflectionKey];
        if (!inflector) return newTranslation;
        var inflectorKeys = I18n.translate("i18n.inflections.@" + inflectionKey, {
            defaultValue: null
        });
        if (!inflectorKeys) return newTranslation;
        var inflectorKey = inflectorKeys[inflector];
        return inflectorKey ? (inflectorKey = inflectorKey.replace("@", ""), translation.replace(matches[0], mapping[inflectorKey] || mapping.other)) : newTranslation
    }, I18n.t = function(key, params) {
        var translation = I18n.translate(key, params);
        return "en-2x" === I18n.locale ? translation + " " + translation : translation
    },
    function() {
        var originalImplementation = I18n.t;
        I18n.t = function(key, params) {
            for (var translation, base, opts = params || {}, keyParts = key.split("."), i = 0; i < keyParts.length; i += 1) {
                var candidate = (base = base || I18n.translations[I18n.locale])[keyParts[i]];
                if (!candidate) break;
                if ("string" == typeof candidate || candidate.one) {
                    translation = candidate;
                    break
                }
                base = candidate
            }
            return !opts.defaultValuePreFallback || opts.locale || translation ? originalImplementation(key, opts) : opts.defaultValuePreFallback
        }
    }(),
    function() {
        var originalImplementation = I18n.toTime;
        I18n.toTime = function(scope, input) {
            var format = I18n.t(scope, {
                    defaultValue: null
                }),
                date = I18n.parseDate(input);
            return format && format.match(/%=b/i) ? (format = (format = format.replace("%=b", I18n.strftime(date, "%b").toLowerCase())).replace("%=B", I18n.strftime(date, "%B").toLowerCase()), I18n.strftime(date, format)) : originalImplementation.apply(I18n, [scope, input])
        }
    }(),
    function(a, b, c) {
        function D(c) {
            var q, f = this,
                g = c.options.show.modal,
                h = c.elements,
                i = h.tooltip,
                j = "#qtip-overlay",
                k = ".qtipmodal",
                l = k + c.id,
                m = "is-modal-qtip",
                o = a(document.body);
            c.checks.modal = {
                "^show.modal.(on|blur)$": function() {
                    f.init(), h.overlay.toggle(i.is(":visible"))
                }
            }, a.extend(f, {
                init: function() {
                    return g.on ? (q = f.create(), i.attr(m, d).unbind(k).unbind(l).bind("tooltipshow" + k + " tooltiphide" + k, (function(b, c, d) {
                        var e = b.originalEvent;
                        e && "tooltiphide" === b.type && /mouse(leave|enter)/.test(e.type) && a(e.relatedTarget).closest(q[0]).length ? b.preventDefault() : f[b.type.replace("tooltip", "")](b, d)
                    })).bind("tooltipfocus" + k, (function(a, b, c) {
                        q[0].style.zIndex = c - 1
                    })).bind("tooltipblur" + k, (function(b) {
                        a("[" + m + "]:visible").not(i).last().qtip("focus", b)
                    })), g.escape && a(b).unbind(l).bind("keydown" + l, (function(a) {
                        27 === a.keyCode && i.hasClass(p) && c.hide(a)
                    })), g.blur && h.overlay.unbind(l).bind("click" + l, (function(a) {
                        i.hasClass(p) && c.hide(a)
                    })), f) : f
                },
                create: function() {
                    var c = a(j);
                    return c.length ? (h.overlay = c, c) : (q = h.overlay = a("<div />", {
                        id: j.substr(1),
                        html: "<div></div>",
                        mousedown: function() {
                            return e
                        }
                    }).insertBefore(a(n).last()), a(b).unbind(k).bind("resize" + k, (function() {
                        q.css({
                            height: a(b).height(),
                            width: a(b).width()
                        })
                    })).triggerHandler("resize"), q)
                },
                toggle: function(b, c, h) {
                    if (b && b.isDefaultPrevented()) return f;
                    var j = g.effect,
                        k = c ? "show" : "hide",
                        p = q.is(":visible"),
                        r = a("[" + m + "]:visible").not(i);
                    return q || (q = f.create()), q.is(":animated") && p === c || !c && r.length || (c ? (q.css({
                        left: 0,
                        top: 0
                    }), q.toggleClass("blurs", g.blur), o.delegate("*", "focusin" + l, (function(b) {
                        a(b.target).closest(n)[0] !== i[0] && a("a, :input, img", i).add(i).focus()
                    }))) : o.undelegate("*", "focusin" + l), q.stop(d, e), a.isFunction(j) ? j.call(q, c) : j === e ? q[k]() : q.fadeTo(parseInt(h, 10) || 90, c ? 1 : 0, (function() {
                        c || a(this).hide()
                    })), c || q.queue((function(a) {
                        q.css({
                            left: "",
                            top: ""
                        }), a()
                    }))), f
                },
                show: function(a, b) {
                    return f.toggle(a, d, b)
                },
                hide: function(a, b) {
                    return f.toggle(a, e, b)
                },
                destroy: function() {
                    var d = q;
                    return d && ((d = a("[" + m + "]").not(i).length < 1) ? (h.overlay.remove(), a(b).unbind(k)) : h.overlay.unbind(k + c.id), o.undelegate("*", "focusin" + l)), i.removeAttr(m).unbind(k)
                }
            }), f.init()
        }

        function C(b) {
            function w(a) {
                var j, k, b = "y" === a.precedance,
                    c = n[b ? "width" : "height"],
                    d = n[b ? "height" : "width"],
                    e = a.string().indexOf("center") > -1,
                    f = c * (e ? .5 : 1),
                    g = Math.pow,
                    h = Math.round,
                    l = Math.sqrt(g(f, 2) + g(d, 2)),
                    m = [p / f * l, p / d * l];
                return m[2] = Math.sqrt(g(m[0], 2) - g(p, 2)), m[3] = Math.sqrt(g(m[1], 2) - g(p, 2)), {
                    height: (k = [h((j = (l + m[2] + m[3] + (e ? 0 : m[0])) / l) * d), h(j * c)])[b ? 0 : 1],
                    width: k[b ? 1 : 0]
                }
            }

            function v(b) {
                var d = k.titlebar && "top" === b.y ? k.titlebar : k.content,
                    e = a.browser.mozilla,
                    f = e ? "-moz-" : a.browser.webkit ? "-webkit-" : "",
                    g = b.y + (e ? "" : "-") + b.x,
                    h = f + (e ? "border-radius-" + g : "border-" + g + "-radius");
                return parseInt(d.css(h), 10) || parseInt(l.css(h), 10) || 0
            }

            function u(a, b, c) {
                b = b || a[a.precedance];
                var h, d = l.hasClass(r),
                    f = k.titlebar && "top" === a.y ? k.titlebar : k.content,
                    g = "border-" + b + "-width";
                return l.addClass(r), h = parseInt(f.css(g), 10), h = (c ? h || parseInt(l.css(g), 10) : h) || 0, l.toggleClass(r, d), h
            }

            function t(f, g, h) {
                if (k.tip) {
                    var t, v, n = a.extend({}, i.corner),
                        o = h.adjusted,
                        p = b.options.position.adjust.method.split(" "),
                        q = p[0],
                        r = p[1] || p[0],
                        s = {
                            left: e,
                            top: e,
                            x: 0,
                            y: 0
                        },
                        u = {};
                    i.corner.fixed !== d && ("shift" === q && "x" === n.precedance && o.left && "center" !== n.y ? n.precedance = "x" === n.precedance ? "y" : "x" : "flip" === q && o.left && (n.x = "center" === n.x ? o.left > 0 ? "left" : "right" : "left" === n.x ? "right" : "left"), "shift" === r && "y" === n.precedance && o.top && "center" !== n.x ? n.precedance = "y" === n.precedance ? "x" : "y" : "flip" === r && o.top && (n.y = "center" === n.y ? o.top > 0 ? "top" : "bottom" : "top" === n.y ? "bottom" : "top"), n.string() !== m.corner && (m.top !== o.top || m.left !== o.left) && i.update(n, e)), (t = i.position(n, o)).right !== c && (t.left = -t.right), t.bottom !== c && (t.top = -t.bottom), t.user = Math.max(0, j.offset), (s.left = "shift" === q && !!o.left) && ("center" === n.x ? u["margin-left"] = s.x = t["margin-left"] - o.left : (v = t.right !== c ? [o.left, -t.left] : [-o.left, t.left], (s.x = Math.max(v[0], v[1])) > v[0] && (h.left -= o.left, s.left = e), u[t.right !== c ? "right" : "left"] = s.x)), (s.top = "shift" === r && !!o.top) && ("center" === n.y ? u["margin-top"] = s.y = t["margin-top"] - o.top : (v = t.bottom !== c ? [o.top, -t.top] : [-o.top, t.top], (s.y = Math.max(v[0], v[1])) > v[0] && (h.top -= o.top, s.top = e), u[t.bottom !== c ? "bottom" : "top"] = s.y)), k.tip.css(u).toggle(!(s.x && s.y || "center" === n.x && s.y || "center" === n.y && s.x)), h.left -= t.left.charAt ? t.user : "shift" !== q || s.top || !s.left && !s.top ? t.left : 0, h.top -= t.top.charAt ? t.user : "shift" !== r || s.left || !s.left && !s.top ? t.top : 0, m.left = o.left, m.top = o.top, m.corner = n.string()
                }
            }
            var i = this,
                j = b.options.style.tip,
                k = b.elements,
                l = k.tooltip,
                m = {
                    top: 0,
                    left: 0,
                    corner: ""
                },
                n = {
                    width: j.width,
                    height: j.height
                },
                o = {},
                p = j.border || 0,
                q = ".qtip-tip",
                s = !!(a("<canvas />")[0] || {}).getContext;
            i.corner = f, i.mimic = f, i.border = p, i.offset = j.offset, i.size = n, b.checks.tip = {
                "^position.my|style.tip.(corner|mimic|border)$": function() {
                    i.init() || i.destroy(), b.reposition()
                },
                "^style.tip.(height|width)$": function() {
                    n = {
                        width: j.width,
                        height: j.height
                    }, i.create(), i.update(), b.reposition()
                },
                "^content.title.text|style.(classes|widget)$": function() {
                    k.tip && i.update()
                }
            }, a.extend(i, {
                init: function() {
                    var b = i.detectCorner() && (s || a.browser.msie);
                    return b && (i.create(), i.update(), l.unbind(q).bind("tooltipmove" + q, t)), b
                },
                detectCorner: function() {
                    var a = j.corner,
                        c = b.options.position,
                        f = c.at,
                        g = c.my.string ? c.my.string() : c.my;
                    return a === e || g === e && f === e ? e : (a === d ? i.corner = new h.Corner(g) : a.string || (i.corner = new h.Corner(a), i.corner.fixed = d), "centercenter" !== i.corner.string())
                },
                detectColours: function() {
                    var d, e, f = k.tip.css({
                            backgroundColor: "",
                            border: ""
                        }),
                        g = i.corner,
                        h = g[g.precedance],
                        m = "border-" + h + "-color",
                        p = "border" + h.charAt(0) + h.substr(1) + "Color",
                        q = /rgba?\(0, 0, 0(, 0)?\)|transparent/i,
                        s = "background-color",
                        t = "transparent",
                        u = a(document.body).css("color"),
                        v = b.elements.content.css("color"),
                        x = k.titlebar && ("top" === g.y || "center" === g.y && f.position().top + n.height / 2 + j.offset < k.titlebar.outerHeight(1)) ? k.titlebar : k.content;
                    l.addClass(r), o.fill = d = f.css(s), o.border = e = f[0].style[p] || l.css(m), d && !q.test(d) || (o.fill = x.css(s) || t, q.test(o.fill) && (o.fill = l.css(s) || d)), e && !q.test(e) && e !== u || (o.border = x.css(m) || t, (q.test(o.border) || o.border === v) && (o.border = e)), a("*", f).add(f).css(s, t).css("border", ""), l.removeClass(r)
                },
                create: function() {
                    var d, b = n.width,
                        c = n.height;
                    k.tip && k.tip.remove(), k.tip = a("<div />", {
                        class: "ui-tooltip-tip"
                    }).css({
                        width: b,
                        height: c
                    }).prependTo(l), s ? a("<canvas />").appendTo(k.tip)[0].getContext("2d").save() : (d = '<vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape>', k.tip.html(d + d))
                },
                update: function(b, c) {
                    var y, z, A, C, D, g = k.tip,
                        l = g.children(),
                        m = n.width,
                        q = n.height,
                        v = j.mimic,
                        x = Math.round;
                    b || (b = i.corner), v === e ? v = b : ((v = new h.Corner(v)).precedance = b.precedance, "inherit" === v.x ? v.x = b.x : "inherit" === v.y ? v.y = b.y : v.x === v.y && (v[b.precedance] = b[b.precedance])), y = v.precedance, i.detectColours(), "transparent" !== o.border && "#123456" !== o.border ? (p = u(b, f, d), 0 === j.border && p > 0 && (o.fill = o.border), i.border = p = j.border !== d ? j.border : p) : i.border = p = 0, A = B(v, m, q), i.size = D = w(b), g.css(D), C = "y" === b.precedance ? [x("left" === v.x ? p : "right" === v.x ? D.width - m - p : (D.width - m) / 2), x("top" === v.y ? D.height - q : 0)] : [x("left" === v.x ? D.width - m : 0), x("top" === v.y ? p : "bottom" === v.y ? D.height - q - p : (D.height - q) / 2)], s ? (l.attr(D), (z = l[0].getContext("2d")).restore(), z.save(), z.clearRect(0, 0, 3e3, 3e3), z.translate(C[0], C[1]), z.beginPath(), z.moveTo(A[0][0], A[0][1]), z.lineTo(A[1][0], A[1][1]), z.lineTo(A[2][0], A[2][1]), z.closePath(), z.fillStyle = o.fill, z.strokeStyle = o.border, z.lineWidth = 2 * p, z.lineJoin = "miter", z.miterLimit = 100, p && z.stroke(), z.fill()) : (A = "m" + A[0][0] + "," + A[0][1] + " l" + A[1][0] + "," + A[1][1] + " " + A[2][0] + "," + A[2][1] + " xe", C[2] = p && /^(r|b)/i.test(b.string()) ? 8 === parseFloat(a.browser.version, 10) ? 2 : 1 : 0, l.css({
                        antialias: "" + (v.string().indexOf("center") > -1),
                        left: C[0] - C[2] * Number("x" === y),
                        top: C[1] - C[2] * Number("y" === y),
                        width: m + p,
                        height: q + p
                    }).each((function(b) {
                        var c = a(this);
                        c[c.prop ? "prop" : "attr"]({
                            coordsize: m + p + " " + (q + p),
                            path: A,
                            fillcolor: o.fill,
                            filled: !!b,
                            stroked: !b
                        }).css({
                            display: p || b ? "block" : "none"
                        }), !b && "" === c.html() && c.html('<vml:stroke weight="' + 2 * p + 'px" color="' + o.border + '" miterlimit="1000" joinstyle="miter"  style="behavior:url(#default#VML); display:inline-block;" />')
                    }))), c !== e && i.position(b)
                },
                position: function(b) {
                    var h, l, m, c = k.tip,
                        f = {},
                        g = Math.max(0, j.offset);
                    return j.corner !== e && c ? (b = b || i.corner, h = b.precedance, l = w(b), m = [b.x, b.y], "x" === h && m.reverse(), a.each(m, (function(a, c) {
                        var e, i;
                        "center" === c ? (f[e = "y" === h ? "left" : "top"] = "50%", f["margin-" + e] = -Math.round(l["y" === h ? "width" : "height"] / 2) + g) : (e = u(b, c, d), i = v(b), f[c] = a ? p ? u(b, c) : 0 : g + (i > e ? i : 0))
                    })), f[b[h]] -= l["x" === h ? "width" : "height"], c.css({
                        top: "",
                        bottom: "",
                        left: "",
                        right: "",
                        margin: ""
                    }).css(f), f) : e
                },
                destroy: function() {
                    k.tip && k.tip.remove(), l.unbind(q)
                }
            }), i.init()
        }

        function B(a, b, c) {
            var d = Math.ceil(b / 2),
                e = Math.ceil(c / 2),
                f = {
                    bottomright: [
                        [0, 0],
                        [b, c],
                        [b, 0]
                    ],
                    bottomleft: [
                        [0, 0],
                        [b, 0],
                        [0, c]
                    ],
                    topright: [
                        [0, c],
                        [b, 0],
                        [b, c]
                    ],
                    topleft: [
                        [0, 0],
                        [0, c],
                        [b, c]
                    ],
                    topcenter: [
                        [0, c],
                        [d, 0],
                        [b, c]
                    ],
                    bottomcenter: [
                        [0, 0],
                        [b, 0],
                        [d, c]
                    ],
                    rightcenter: [
                        [0, 0],
                        [b, e],
                        [0, c]
                    ],
                    leftcenter: [
                        [b, 0],
                        [b, c],
                        [0, e]
                    ]
                };
            return f.lefttop = f.bottomright, f.righttop = f.bottomleft, f.leftbottom = f.topright, f.rightbottom = f.topleft, f[a.string()]
        }

        function A(b) {
            var c = this,
                f = b.elements.tooltip,
                g = b.options.content.ajax,
                h = ".qtip-ajax",
                i = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
            b.checks.ajax = {
                "^content.ajax": function(a, b, d) {
                    "ajax" === b && (g = d), "once" === b ? c.init() : g && g.url ? c.load() : f.unbind(h)
                }
            }, a.extend(c, {
                init: function() {
                    return g && g.url && f.unbind(h)[g.once ? "one" : "bind"]("tooltipshow" + h, c.load), c
                },
                load: function(d, h) {
                    function p(a, c, d) {
                        b.set("content.text", c + ": " + d), n()
                    }

                    function o(c) {
                        l && (c = a("<div/>").append(c.replace(i, "")).find(l)), b.set("content.text", c), n()
                    }

                    function n() {
                        m && (f.css("visibility", ""), h = e)
                    }
                    if (d && d.isDefaultPrevented()) return c;
                    var l, j = g.url.indexOf(" "),
                        k = g.url,
                        m = g.once && !g.loading && h;
                    return m && f.css("visibility", "hidden"), j > -1 && (l = k.substr(j), k = k.substr(0, j)), a.ajax(a.extend({
                        success: o,
                        error: p,
                        context: b
                    }, g, {
                        url: k
                    })), c
                }
            }), c.init()
        }

        function z(b, c) {
            var i, j, k, l, m, n = a(this),
                o = a(document.body),
                p = this === document ? o : n,
                q = n.metadata ? n.metadata(c.metadata) : f,
                r = "html5" === c.metadata.type && q ? q[c.metadata.name] : f,
                s = n.data(c.metadata.name || "qtipopts");
            try {
                s = "string" == typeof s ? new Function("return " + s)() : s
            } catch (t) {
                w("Unable to parse HTML5 attribute data: " + s)
            }
            if (j = (l = a.extend(d, {}, g.defaults, c, "object" == typeof s ? x(s) : f, x(r || q))).position, l.id = b, "boolean" == typeof l.content.text) {
                if (k = n.attr(l.content.attr), l.content.attr === e || !k) return w("Unable to locate content for tooltip! Aborting render of tooltip on element: ", n), e;
                l.content.text = k
            }
            if (j.container === e && (j.container = o), j.target === e && (j.target = p), l.show.target === e && (l.show.target = p), l.show.solo === d && (l.show.solo = o), l.hide.target === e && (l.hide.target = p), l.position.viewport === d && (l.position.viewport = j.container), j.at = new h.Corner(j.at), j.my = new h.Corner(j.my), a.data(this, "qtip"))
                if (l.overwrite) n.qtip("destroy");
                else if (l.overwrite === e) return e;
            return (m = a.attr(this, "title")) && a(this).removeAttr("title").attr(u, m), i = new y(n, l, b, !!k), a.data(this, "qtip", i), n.bind("remove.qtip", (function() {
                i.destroy()
            })), i
        }

        function y(c, s, t, w) {
            function Q() {
                var c = [s.show.target[0], s.hide.target[0], y.rendered && F.tooltip[0], s.position.container[0], s.position.viewport[0], b, document];
                y.rendered ? a([]).pushStack(a.grep(c, (function(a) {
                    return "object" == typeof a
                }))).unbind(E) : s.show.target.unbind(E + "-create")
            }

            function P() {
                function r(a) {
                    D.is(":visible") && y.reposition(a)
                }

                function p(a) {
                    if (D.hasClass(m)) return e;
                    clearTimeout(y.timers.inactive), y.timers.inactive = setTimeout((function() {
                        y.hide(a)
                    }), s.hide.inactive)
                }

                function o(b) {
                    if (D.hasClass(m)) return e;
                    var c = a(b.relatedTarget || b.target),
                        d = c.closest(n)[0] === D[0],
                        g = c[0] === h.show[0];
                    clearTimeout(y.timers.show), clearTimeout(y.timers.hide), "mouse" === f.target && d || s.hide.fixed && /mouse(out|leave|move)/.test(b.type) && (d || g) ? b.preventDefault() : s.hide.delay > 0 ? y.timers.hide = setTimeout((function() {
                        y.hide(b)
                    }), s.hide.delay) : y.hide(b)
                }

                function l(a) {
                    if (D.hasClass(m)) return e;
                    h.show.trigger("qtip-" + t + "-inactive"), clearTimeout(y.timers.show), clearTimeout(y.timers.hide);
                    var b = function() {
                        y.toggle(d, a)
                    };
                    s.show.delay > 0 ? y.timers.show = setTimeout(b, s.show.delay) : b()
                }
                var f = s.position,
                    h = {
                        show: s.show.target,
                        hide: s.hide.target,
                        viewport: a(f.viewport),
                        document: a(document),
                        window: a(b)
                    },
                    j = {
                        show: a.trim("" + s.show.event).split(" "),
                        hide: a.trim("" + s.hide.event).split(" ")
                    },
                    k = a.browser.msie && 6 === parseInt(a.browser.version, 10);
                D.bind("mouseenter" + E + " mouseleave" + E, (function(a) {
                    var b = "mouseenter" === a.type;
                    b && y.focus(a), D.toggleClass(q, b)
                })), s.hide.fixed && (h.hide = h.hide.add(D), D.bind("mouseover" + E, (function() {
                    D.hasClass(m) || clearTimeout(y.timers.hide)
                }))), /mouse(out|leave)/i.test(s.hide.event) ? "window" === s.hide.leave && h.window.bind("mouseout" + E, (function(a) {
                    /select|option/.test(a.target) && !a.relatedTarget && y.hide(a)
                })) : /mouse(over|enter)/i.test(s.show.event) && h.hide.bind("mouseleave" + E, (function() {
                    clearTimeout(y.timers.show)
                })), ("" + s.hide.event).indexOf("unfocus") > -1 && h.document.bind("mousedown" + E, (function(b) {
                    var d = a(b.target);
                    !D.hasClass(m) && D.is(":visible");
                    0 === d.parents(n).length && d.add(c).length > 1 && y.hide(b)
                })), "number" == typeof s.hide.inactive && (h.show.bind("qtip-" + t + "-inactive", p), a.each(g.inactiveEvents, (function(a, b) {
                    h.hide.add(F.tooltip).bind(b + E + "-inactive", p)
                }))), a.each(j.hide, (function(b, c) {
                    var d = a.inArray(c, j.show),
                        e = a(h.hide);
                    d > -1 && e.add(h.show).length === e.length || "unfocus" === c ? (h.show.bind(c + E, (function(a) {
                        D.is(":visible") ? o(a) : l(a)
                    })), delete j.show[d]) : h.hide.bind(c + E, o)
                })), a.each(j.show, (function(a, b) {
                    h.show.bind(b + E, l)
                })), "number" == typeof s.hide.distance && h.show.bind("mousemove" + E, (function(a) {
                    var b = G.origin || {},
                        c = s.hide.distance,
                        d = Math.abs;
                    (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && y.hide(a)
                })), "mouse" === f.target && (h.show.bind("mousemove" + E, (function(a) {
                    i = {
                        pageX: a.pageX,
                        pageY: a.pageY,
                        type: "mousemove"
                    }
                })), f.adjust.mouse && (s.hide.event && D.bind("mouseleave" + E, (function(a) {
                    (a.relatedTarget || a.target) !== h.show[0] && y.hide(a)
                })), h.document.bind("mousemove" + E, (function(a) {
                    !D.hasClass(m) && D.is(":visible") && y.reposition(a || i)
                })))), (f.adjust.resize || h.viewport.length) && (a.event.special.resize ? h.viewport : h.window).bind("resize" + E, r), (h.viewport.length || k && "fixed" === D.css("position")) && h.viewport.bind("scroll" + E, r)
            }

            function O(b, d) {
                function g(b) {
                    function g() {
                        clearTimeout(y.timers.img[this]), a(this).unbind(E), 0 === (c = c.not(this)).length && (y.redraw(), d !== e && y.reposition(G.event), b())
                    }
                    var c;
                    if (0 === (c = f.find("img:not([height]):not([width])")).length) return g.call(c);
                    c.each((function(b, c) {
                        (function d() {
                            if (c.height && c.width) return g.call(c);
                            y.timers.img[c] = setTimeout(d, 1e3)
                        })(), a(c).bind("error" + E + " load" + E, g)
                    }))
                }
                var f = F.content;
                return y.rendered && b ? (a.isFunction(b) && (b = b.call(c, G.event, y) || ""), b.jquery && b.length > 0 ? f.empty().append(b.css({
                    display: "block"
                })) : f.html(b), y.rendered < 0 ? D.queue("fx", g) : (C = 0, g(a.noop)), y) : e
            }

            function N(b, d) {
                var f = F.title;
                return y.rendered && b ? (a.isFunction(b) && (b = b.call(c, G.event, y)), b === e ? J(e) : (b.jquery && b.length > 0 ? f.empty().append(b.css({
                    display: "block"
                })) : f.html(b), y.redraw(), void(d !== e && y.rendered && D.is(":visible") && y.reposition(G.event)))) : e
            }

            function M(a) {
                var b = F.button,
                    c = F.title;
                if (!y.rendered) return e;
                a ? (c || L(), K()) : b.remove()
            }

            function L() {
                var b = A + "-title";
                F.titlebar && J(), F.titlebar = a("<div />", {
                    class: k + "-titlebar " + (s.style.widget ? "ui-widget-header" : "")
                }).append(F.title = a("<div />", {
                    id: b,
                    class: k + "-title",
                    "aria-atomic": d
                })).insertBefore(F.content), s.content.title.button ? K() : y.rendered && y.redraw()
            }

            function K() {
                var b = s.content.title.button,
                    d = "string" == typeof b ? b : "Close tooltip";
                F.button && F.button.remove(), b.jquery ? F.button = b : F.button = a("<a />", {
                    class: "ui-state-default " + (s.style.widget ? "" : k + "-icon"),
                    title: d,
                    "aria-label": d
                }).prepend(a("<span />", {
                    class: "ui-icon ui-icon-close",
                    html: "&times;"
                })), F.button.appendTo(F.titlebar).attr("role", "button").hover((function(b) {
                    a(this).toggleClass("ui-state-hover", "mouseenter" === b.type)
                })).click((function(a) {
                    return D.hasClass(m) || y.hide(a), e
                })).bind("mousedown keydown mouseup keyup mouseout", (function(b) {
                    a(this).toggleClass("ui-state-active ui-state-focus", "down" === b.type.substr(-4))
                })), y.redraw()
            }

            function J(a) {
                F.title && (F.titlebar.remove(), F.titlebar = F.title = F.button = f, a !== e && y.reposition())
            }

            function I() {
                var a = s.style.widget;
                D.toggleClass(l, a).toggleClass(o, !a), F.content.toggleClass(l + "-content", a), F.titlebar && F.titlebar.toggleClass(l + "-header", a), F.button && F.button.toggleClass(k + "-icon", !a)
            }

            function H(a) {
                for (var c, b = 0, d = s, e = a.split("."); d = d[e[b++]];) b < e.length && (c = d);
                return [c || s, e.pop()]
            }
            var F, G, y = this,
                z = document.body,
                A = k + "-" + t,
                B = 0,
                C = 0,
                D = a(),
                E = ".qtip-" + t;
            y.id = t, y.rendered = e, y.elements = F = {
                target: c
            }, y.timers = {
                img: {}
            }, y.options = s, y.checks = {}, y.plugins = {}, y.cache = G = {
                event: {},
                target: a(),
                disabled: e,
                attr: w
            }, y.checks.builtin = {
                "^id$": function(b, c, f) {
                    var h = f === d ? g.nextid : f,
                        i = k + "-" + h;
                    h !== e && h.length > 0 && !a("#" + i).length && (D[0].id = i, F.content[0].id = i + "-content", F.title[0].id = i + "-title")
                },
                "^content.text$": function(a, b, c) {
                    O(c)
                },
                "^content.title.text$": function(a, b, c) {
                    if (!c) return J();
                    !F.title && c && L(), N(c)
                },
                "^content.title.button$": function(a, b, c) {
                    M(c)
                },
                "^position.(my|at)$": function(a, b, c) {
                    "string" == typeof c && (a[b] = new h.Corner(c))
                },
                "^position.container$": function(a, b, c) {
                    y.rendered && D.appendTo(c)
                },
                "^show.ready$": function() {
                    y.rendered ? y.toggle(d) : y.render(1)
                },
                "^style.classes$": function(a, b, c) {
                    D.attr("class", k + " qtip ui-helper-reset " + c)
                },
                "^style.widget|content.title": I,
                "^events.(render|show|move|hide|focus|blur)$": function(b, c, d) {
                    D[(a.isFunction(d) ? "" : "un") + "bind"]("tooltip" + c, d)
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                    var a = s.position;
                    D.attr("tracking", "mouse" === a.target && a.adjust.mouse), Q(), P()
                }
            }, a.extend(y, {
                render: function(b) {
                    if (y.rendered) return y;
                    var f = s.content.title.text,
                        g = s.position,
                        i = a.Event("tooltiprender");
                    return a.attr(c[0], "aria-describedby", A), D = F.tooltip = a("<div/>", {
                        id: A,
                        class: k + " qtip ui-helper-reset " + o + " " + s.style.classes,
                        width: s.style.width || "",
                        tracking: "mouse" === g.target && g.adjust.mouse,
                        role: "alert",
                        "aria-live": "polite",
                        "aria-atomic": e,
                        "aria-describedby": A + "-content",
                        "aria-hidden": d
                    }).toggleClass(m, G.disabled).data("qtip", y).appendTo(s.position.container).append(F.content = a("<div />", {
                        class: k + "-content",
                        id: A + "-content",
                        "aria-atomic": d
                    })), y.rendered = -1, C = 1, B = 1, f && (L(), N(f, e)), O(s.content.text, e), y.rendered = d, I(), a.each(s.events, (function(b, c) {
                        a.isFunction(c) && D.bind("toggle" === b ? "tooltipshow tooltiphide" : "tooltip" + b, c)
                    })), a.each(h, (function() {
                        "render" === this.initialize && this(y)
                    })), P(), D.queue("fx", (function(a) {
                        i.originalEvent = G.event, D.trigger(i, [y]), C = 0, B = 0, y.redraw(), (s.show.ready || b) && y.toggle(d, G.event), a()
                    })), y
                },
                get: function(a) {
                    var b, c;
                    switch (a.toLowerCase()) {
                        case "dimensions":
                            b = {
                                height: D.outerHeight(),
                                width: D.outerWidth()
                            };
                            break;
                        case "offset":
                            b = h.offset(D, s.position.container);
                            break;
                        default:
                            b = (b = (c = H(a.toLowerCase()))[0][c[1]]).precedance ? b.string() : b
                    }
                    return b
                },
                set: function(b, c) {
                    function m(a, b) {
                        var c, d, e;
                        for (c in k)
                            for (d in k[c])(e = new RegExp(d, "i").exec(a)) && (b.push(e), k[c][d].apply(y, b))
                    }
                    var l, g = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,
                        h = /^content\.(title|attr)|style/i,
                        i = e,
                        j = e,
                        k = y.checks;
                    return "string" == typeof b ? (l = b, (b = {})[l] = c) : b = a.extend(d, {}, b), a.each(b, (function(c, d) {
                        var f, e = H(c.toLowerCase());
                        f = e[0][e[1]], e[0][e[1]] = "object" == typeof d && d.nodeType ? a(d) : d, b[c] = [e[0], e[1], d, f], i = g.test(c) || i, j = h.test(c) || j
                    })), x(s), B = C = 1, a.each(b, m), B = C = 0, D.is(":visible") && y.rendered && (i && y.reposition("mouse" === s.position.target ? f : G.event), j && y.redraw()), y
                },
                toggle: function(b, c) {
                    function q() {
                        b ? (a.browser.msie && D[0].style.removeAttribute("filter"), D.css("overflow", "")) : (D.css({
                            display: "",
                            visibility: "",
                            opacity: "",
                            left: "",
                            top: ""
                        }), "string" == typeof h.autofocus && a(h.autofocus, D).focus())
                    }
                    if (!y.rendered) {
                        if (!b) return y;
                        y.render(1)
                    }
                    var p, g = b ? "show" : "hide",
                        h = s[g],
                        j = D.is(":visible"),
                        k = !c || s[g].target.length < 2 || G.target[0] === c.target,
                        l = s.position,
                        m = s.content;
                    if ((typeof b).search("boolean|number") && (b = !j), !D.is(":animated") && j === b && k) return y;
                    if (c) {
                        if (/over|enter/.test(c.type) && /out|leave/.test(G.event.type) && c.target === s.show.target[0] && D.has(c.relatedTarget).length) return y;
                        G.event = a.extend({}, c)
                    }
                    return (p = a.Event("tooltip" + g)).originalEvent = c ? G.event : f, D.trigger(p, [y, 90]), p.isDefaultPrevented() || (a.attr(D[0], "aria-hidden", !b), b ? (G.origin = a.extend({}, i), y.focus(c), a.isFunction(m.text) && O(m.text, e), a.isFunction(m.title.text) && N(m.title.text, e), !v && "mouse" === l.target && l.adjust.mouse && (a(document).bind("mousemove.qtip", (function(a) {
                        i = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            type: "mousemove"
                        }
                    })), v = d), y.reposition(c), h.solo && a(n, h.solo).not(D).qtip("hide", p)) : (clearTimeout(y.timers.show), delete G.origin, v && !a(n + '[tracking="true"]:visible', h.solo).not(D).length && (a(document).unbind("mousemove.qtip"), v = e), y.blur(c)), k && D.stop(0, 1), h.effect === e ? (D[g](), q.call(D)) : a.isFunction(h.effect) ? (h.effect.call(D, y), D.queue("fx", (function(a) {
                        q(), a()
                    }))) : D.fadeTo(90, b ? 1 : 0, q), b && h.target.trigger("qtip-" + t + "-inactive")), y
                },
                show: function(a) {
                    return y.toggle(d, a)
                },
                hide: function(a) {
                    return y.toggle(e, a)
                },
                focus: function(b) {
                    if (!y.rendered) return y;
                    var i, c = a(n),
                        d = parseInt(D[0].style.zIndex, 10),
                        e = g.zindex + c.length,
                        f = a.extend({}, b);
                    return D.hasClass(p) || ((i = a.Event("tooltipfocus")).originalEvent = f, D.trigger(i, [y, e]), i.isDefaultPrevented() || (d !== e && (c.each((function() {
                        this.style.zIndex > d && (this.style.zIndex = this.style.zIndex - 1)
                    })), c.filter("." + p).qtip("blur", f)), D.addClass(p)[0].style.zIndex = e)), y
                },
                blur: function(b) {
                    var d, c = a.extend({}, b);
                    return D.removeClass(p), (d = a.Event("tooltipblur")).originalEvent = c, D.trigger(d, [y]), y
                },
                reposition: function(c, d) {
                    if (!y.rendered || B) return y;
                    B = 1;
                    var f = s.position.target,
                        g = s.position,
                        j = g.my,
                        l = g.at,
                        m = g.adjust,
                        n = m.method.split(" "),
                        o = D.outerWidth(),
                        p = D.outerHeight(),
                        q = 0,
                        r = 0,
                        t = a.Event("tooltipmove"),
                        u = "fixed" === D.css("position"),
                        v = g.viewport,
                        w = {
                            left: 0,
                            top: 0
                        },
                        x = y.plugins.tip,
                        A = {
                            horizontal: n[0],
                            vertical: n[1] || n[0],
                            left: function(a) {
                                var b = "shift" === A.horizontal,
                                    c = v.offset.left + v.scrollLeft,
                                    d = "left" === j.x ? o : "right" === j.x ? -o : -o / 2,
                                    e = "left" === l.x ? q : "right" === l.x ? -q : -q / 2,
                                    f = x && x.size && x.size.width || 0,
                                    g = x && x.corner && "x" === x.corner.precedance && !b ? f : 0,
                                    h = c - a + g,
                                    i = a + o - v.width - c + g,
                                    k = d - ("x" === j.precedance || j.x === j.y ? e : 0),
                                    n = "center" === j.x;
                                return b ? (g = x && x.corner && "y" === x.corner.precedance ? f : 0, k = ("left" === j.x ? 1 : -1) * d - g, w.left += h > 0 ? h : i > 0 ? -i : 0, w.left = Math.max(v.offset.left + (g && "center" === x.corner.x ? x.offset : 0), a - k, Math.min(Math.max(v.offset.left + v.width, a + k), w.left))) : (h > 0 && ("left" !== j.x || i > 0) ? w.left -= k + (n ? 0 : 2 * m.x) : i > 0 && ("right" !== j.x || h > 0) && (w.left -= n ? -k : k + 2 * m.x), w.left !== a && n && (w.left -= m.x), w.left < c && -w.left > i && (w.left = a)), w.left - a
                            },
                            top: function(a) {
                                var b = "shift" === A.vertical,
                                    c = v.offset.top + v.scrollTop,
                                    d = "top" === j.y ? p : "bottom" === j.y ? -p : -p / 2,
                                    e = "top" === l.y ? r : "bottom" === l.y ? -r : -r / 2,
                                    f = x && x.size && x.size.height || 0,
                                    g = x && x.corner && "y" === x.corner.precedance && !b ? f : 0,
                                    h = c - a + g,
                                    i = a + p - v.height - c + g,
                                    k = d - ("y" === j.precedance || j.x === j.y ? e : 0),
                                    n = "center" === j.y;
                                return b ? (g = x && x.corner && "x" === x.corner.precedance ? f : 0, k = ("top" === j.y ? 1 : -1) * d - g, w.top += h > 0 ? h : i > 0 ? -i : 0, w.top = Math.max(v.offset.top + (g && "center" === x.corner.x ? x.offset : 0), a - k, Math.min(Math.max(v.offset.top + v.height, a + k), w.top))) : (h > 0 && ("top" !== j.y || i > 0) ? w.top -= k + (n ? 0 : 2 * m.y) : i > 0 && ("bottom" !== j.y || h > 0) && (w.top -= n ? -k : k + 2 * m.y), w.top !== a && n && (w.top -= m.y), w.top < 0 && -w.top > i && (w.top = a)), w.top - a
                            }
                        };
                    if (a.isArray(f) && 2 === f.length) l = {
                        x: "left",
                        y: "top"
                    }, w = {
                        left: f[0],
                        top: f[1]
                    };
                    else if ("mouse" === f && (c && c.pageX || G.event.pageX)) l = {
                        x: "left",
                        y: "top"
                    }, c = !c || "resize" !== c.type && "scroll" !== c.type ? c && c.pageX && "mousemove" === c.type ? c : !i || !i.pageX || !m.mouse && c && c.pageX ? !m.mouse && G.origin && G.origin.pageX ? G.origin : c : {
                        pageX: i.pageX,
                        pageY: i.pageY
                    } : G.event, w = {
                        top: c.pageY,
                        left: c.pageX
                    };
                    else {
                        if ("event" === f ? f = c && c.target && "scroll" !== c.type && "resize" !== c.type ? G.target = a(c.target) : G.target : G.target = a(f), 0 === (f = a(f).eq(0)).length) return y;
                        f[0] === document || f[0] === b ? (q = h.iOS ? b.innerWidth : f.width(), r = h.iOS ? b.innerHeight : f.height(), f[0] === b && (w = {
                            top: !u || h.iOS ? (v || f).scrollTop() : 0,
                            left: !u || h.iOS ? (v || f).scrollLeft() : 0
                        })) : f.is("area") && h.imagemap ? w = h.imagemap(f, l) : "http://www.w3.org/2000/svg" === f[0].namespaceURI && h.svg ? w = h.svg(f, l) : (q = f.outerWidth(), r = f.outerHeight(), w = h.offset(f, g.container, u)), w.offset && (q = w.width, r = w.height, w = w.offset), w.left += "right" === l.x ? q : "center" === l.x ? q / 2 : 0, w.top += "bottom" === l.y ? r : "center" === l.y ? r / 2 : 0
                    }
                    return w.left += m.x + ("right" === j.x ? -o : "center" === j.x ? -o / 2 : 0), w.top += m.y + ("bottom" === j.y ? -p : "center" === j.y ? -p / 2 : 0), v.jquery && f[0] !== b && f[0] !== z && A.vertical + A.horizontal !== "nonenone" ? (v = {
                        elem: v,
                        height: v[(v[0] === b ? "h" : "outerH") + "eight"](),
                        width: v[(v[0] === b ? "w" : "outerW") + "idth"](),
                        scrollLeft: u ? 0 : v.scrollLeft(),
                        scrollTop: u ? 0 : v.scrollTop(),
                        offset: v.offset() || {
                            left: 0,
                            top: 0
                        }
                    }, w.adjusted = {
                        left: "none" !== A.horizontal ? A.left(w.left) : 0,
                        top: "none" !== A.vertical ? A.top(w.top) : 0
                    }) : w.adjusted = {
                        left: 0,
                        top: 0
                    }, D.attr("class", (function() {
                        return a.attr(this, "class").replace(/ui-tooltip-pos-\w+/i, "")
                    })).addClass(k + "-pos-" + j.abbreviation()), t.originalEvent = a.extend({}, c), D.trigger(t, [y, w, v.elem || v]), t.isDefaultPrevented() || (delete w.adjusted, d === e || isNaN(w.left) || isNaN(w.top) || "mouse" === f || !a.isFunction(g.effect) ? D.css(w) : a.isFunction(g.effect) && (g.effect.call(D, y, a.extend({}, w)), D.queue((function(b) {
                        a(this).css({
                            opacity: "",
                            height: ""
                        }), a.browser.msie && this.style.removeAttribute("filter"), b()
                    }))), B = 0), y
                },
                redraw: function() {
                    if (y.rendered < 1 || C) return y;
                    var b, c, d, e, a = s.position.container;
                    return C = 1, s.style.width ? D.css("width", s.style.width) : (D.css("width", "").addClass(r), c = D.width() + 1, b = ((d = D.css("max-width") || "") + (e = D.css("min-width") || "")).indexOf("%") > -1 ? a.width() / 100 : 0, c = (d = (d.indexOf("%") > -1 ? b : 1) * parseInt(d, 10) || c) + (e = (e.indexOf("%") > -1 ? b : 1) * parseInt(e, 10) || 0) ? Math.min(Math.max(c, e), d) : c, D.css("width", Math.round(c)).removeClass(r)), C = 0, y
                },
                disable: function(b) {
                    var c = m;
                    return "boolean" != typeof b && (b = !D.hasClass(c) && !G.disabled), y.rendered ? (D.toggleClass(c, b), a.attr(D[0], "aria-disabled", b)) : G.disabled = !!b, y
                },
                enable: function() {
                    return y.disable(e)
                },
                destroy: function() {
                    var b = c[0],
                        d = a.attr(b, u);
                    return y.rendered && (D.remove(), a.each(y.plugins, (function() {
                        this.destroy && this.destroy()
                    }))), clearTimeout(y.timers.show), clearTimeout(y.timers.hide), Q(), a.removeData(b, "qtip"), d && (a.attr(b, "title", d), c.removeAttr(u)), c.removeAttr("aria-describedby").unbind(".qtip"), delete j[y.id], c
                }
            })
        }

        function x(b) {
            var c;
            return b && "object" == typeof b ? ("object" != typeof b.metadata && (b.metadata = {
                type: b.metadata
            }), "content" in b && (("object" != typeof b.content || b.content.jquery) && (b.content = {
                text: b.content
            }), c = b.content.text || e, !a.isFunction(c) && (!c && !c.attr || c.length < 1 || "object" == typeof c && !c.jquery) && (b.content.text = e), "title" in b.content && ("object" != typeof b.content.title && (b.content.title = {
                text: b.content.title
            }), c = b.content.title.text || e, !a.isFunction(c) && (!c && !c.attr || c.length < 1 || "object" == typeof c && !c.jquery) && (b.content.title.text = e))), "position" in b && "object" != typeof b.position && (b.position = {
                my: b.position,
                at: b.position
            }), "show" in b && "object" != typeof b.show && (b.show.jquery ? b.show = {
                target: b.show
            } : b.show = {
                event: b.show
            }), "hide" in b && "object" != typeof b.hide && (b.hide.jquery ? b.hide = {
                target: b.hide
            } : b.hide = {
                event: b.hide
            }), "style" in b && "object" != typeof b.style && (b.style = {
                classes: b.style
            }), a.each(h, (function() {
                this.sanitize && this.sanitize(b)
            })), b) : e
        }

        function w() {
            if (w.history = w.history || [], w.history.push(arguments), "object" == typeof console) {
                var a = console[console.warn ? "warn" : "log"],
                    b = Array.prototype.slice.call(arguments);
                "string" == typeof arguments[0] && (b[0] = "qTip2: " + b[0]), a.apply ? a.apply(console, b) : a(b)
            }
        }
        var g, h, i, v, d = !0,
            e = !1,
            f = null,
            j = {},
            k = "ui-tooltip",
            l = "ui-widget",
            m = "ui-state-disabled",
            n = "div.qtip." + k,
            o = k + "-default",
            p = k + "-focus",
            q = k + "-hover",
            r = k + "-fluid",
            t = "_replacedByqTip",
            u = "oldtitle";
        g = a.fn.qtip = function(b, h, i) {
            var j = ("" + b).toLowerCase(),
                k = f,
                l = "disable" === j ? [d] : a.makeArray(arguments).slice(1),
                m = l[l.length - 1],
                n = this[0] ? a.data(this[0], "qtip") : f;
            return !arguments.length && n || "api" === j ? n : "string" == typeof b ? (this.each((function() {
                var b = a.data(this, "qtip");
                if (!b) return d;
                if (m && m.timeStamp && (b.cache.event = m), "option" !== j && "options" !== j || !h) b[j] && b[j].apply(b[j], l);
                else {
                    if (!a.isPlainObject(h) && i === c) return k = b.get(h), e;
                    b.set(h, i)
                }
            })), k !== f ? k : this) : "object" != typeof b && arguments.length ? void 0 : (n = x(a.extend(d, {}, b)), g.bind.call(this, n, m))
        }, g.bind = function(b, f) {
            return this.each((function(i) {
                function q(b) {
                    function d() {
                        o.render("object" == typeof b || k.show.ready), l.show.add(l.hide).unbind(n)
                    }
                    if (o.cache.disabled) return e;
                    o.cache.event = a.extend({}, b), o.cache.target = b ? a(b.target) : [c], k.show.delay > 0 ? (clearTimeout(o.timers.show), o.timers.show = setTimeout(d, k.show.delay), m.show !== m.hide && l.hide.bind(m.hide, (function() {
                        clearTimeout(o.timers.show)
                    }))) : d()
                }
                var k, l, m, n, o, p;
                if (p = !(p = a.isArray(b.id) ? b.id[i] : b.id) || p === e || p.length < 1 || j[p] ? g.nextid++ : j[p] = p, n = ".qtip-" + p + "-create", (o = z.call(this, p, b)) === e) return d;
                k = o.options, a.each(h, (function() {
                    "initialize" === this.initialize && this(o)
                })), l = {
                    show: k.show.target,
                    hide: k.hide.target
                }, m = {
                    show: a.trim("" + k.show.event).replace(/ /g, n + " ") + n,
                    hide: a.trim("" + k.hide.event).replace(/ /g, n + " ") + n
                }, /mouse(over|enter)/i.test(m.show) && !/mouse(out|leave)/i.test(m.hide) && (m.hide += " mouseleave" + n), l.show.bind(m.show, q), (k.show.ready || k.prerender) && q(f)
            }))
        }, h = g.plugins = {
            Corner: function(a) {
                a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, "center").toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.precedance = a.charAt(0).search(/^(t|b)/) > -1 ? "y" : "x", this.string = function() {
                    return "y" === this.precedance ? this.y + this.x : this.x + this.y
                }, this.abbreviation = function() {
                    var a = this.x.substr(0, 1),
                        b = this.y.substr(0, 1);
                    return a === b ? a : "c" === a || "c" !== a && "c" !== b ? b + a : a + b
                }
            },
            offset: function(c, d, e) {
                function l(a, b) {
                    f.left += b * a.scrollLeft(), f.top += b * a.scrollTop()
                }
                var k, f = c.offset(),
                    g = d,
                    i = 0,
                    j = document.body;
                if (g) {
                    do {
                        if ("static" !== g.css("position") && (k = g[0] === j ? {
                                left: parseInt(g.css("left"), 10) || 0,
                                top: parseInt(g.css("top"), 10) || 0
                            } : g.position(), f.left -= k.left + (parseInt(g.css("borderLeftWidth"), 10) || 0), f.top -= k.top + (parseInt(g.css("borderTopWidth"), 10) || 0), i++), g[0] === j) break
                    } while (g = g.offsetParent());
                    d[0] !== j && i > 1 && l(d, 1), (h.iOS < 4.1 && h.iOS > 3.1 || !h.iOS && e) && l(a(b), -1)
                }
                return f
            },
            iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".")) || e,
            fn: {
                attr: function(b, c) {
                    if (this.length) {
                        var d = this[0],
                            e = "title",
                            f = a.data(d, "qtip");
                        if (b === e) {
                            if (arguments.length < 2) return a.attr(d, u);
                            if ("object" == typeof f) return f && f.rendered && f.options.content.attr === e && f.cache.attr && f.set("content.text", c), a.fn["attr" + t].apply(this, arguments), a.attr(d, u, a.attr(d, e)), this.removeAttr(e)
                        }
                    }
                },
                clone: function(b) {
                    a([]);
                    var d = "title";
                    return a.fn["clone" + t].apply(this, arguments).filter("[oldtitle]").each((function() {
                        a.attr(this, d, a.attr(this, u)), this.removeAttribute(u)
                    })).end()
                },
                remove: a.ui ? f : function(b, c) {
                    a(this).each((function() {
                        c || (!b || a.filter(b, [this]).length) && a("*", this).add(this).each((function() {
                            a(this).triggerHandler("remove")
                        }))
                    }))
                }
            }
        }, a.each(h.fn, (function(b, c) {
            if (!c) return d;
            var e = a.fn[b + t] = a.fn[b];
            a.fn[b] = function() {
                return c.apply(this, arguments) || e.apply(this, arguments)
            }
        })), g.version = "nightly", g.nextid = 0, g.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), g.zindex = 15e3, g.defaults = {
            prerender: e,
            id: e,
            overwrite: d,
            content: {
                text: d,
                attr: "title",
                title: {
                    text: e,
                    button: e
                }
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: e,
                container: e,
                viewport: e,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: d,
                    resize: d,
                    method: "flip flip"
                },
                effect: function(b, c) {
                    a(this).animate(c, {
                        duration: 200,
                        queue: e
                    })
                }
            },
            show: {
                target: e,
                event: "mouseenter",
                effect: d,
                delay: 90,
                solo: e,
                ready: e,
                autofocus: e
            },
            hide: {
                target: e,
                event: "mouseleave",
                effect: d,
                delay: 0,
                fixed: e,
                inactive: e,
                leave: "window",
                distance: e
            },
            style: {
                classes: "",
                widget: e,
                width: e
            },
            events: {
                render: f,
                move: f,
                show: f,
                hide: f,
                toggle: f,
                focus: f,
                blur: f
            }
        }, h.ajax = function(a) {
            var b = a.plugins.ajax;
            return "object" == typeof b ? b : a.plugins.ajax = new A(a)
        }, h.ajax.initialize = "render", h.ajax.sanitize = function(a) {
            var c, b = a.content;
            b && "ajax" in b && ("object" != typeof(c = b.ajax) && (c = a.content.ajax = {
                url: c
            }), "boolean" != typeof c.once && c.once && (c.once = !!c.once))
        }, a.extend(d, g.defaults, {
            content: {
                ajax: {
                    loading: d,
                    once: d
                }
            }
        }), h.tip = function(a) {
            var b = a.plugins.tip;
            return "object" == typeof b ? b : a.plugins.tip = new C(a)
        }, h.tip.initialize = "render", h.tip.sanitize = function(a) {
            var c, b = a.style;
            b && "tip" in b && ("object" != typeof(c = a.style.tip) && (a.style.tip = {
                corner: c
            }), /string|boolean/i.test(typeof c.corner) || (c.corner = d), "number" != typeof c.width && delete c.width, "number" != typeof c.height && delete c.height, "number" != typeof c.border && c.border !== d && delete c.border, "number" != typeof c.offset && delete c.offset)
        }, a.extend(d, g.defaults, {
            style: {
                tip: {
                    corner: d,
                    mimic: e,
                    width: 6,
                    height: 6,
                    border: d,
                    offset: 0
                }
            }
        }), h.svg = function(b) {
            var g, h, i, j, k, d = a(document),
                e = b[0],
                f = {
                    width: 0,
                    height: 0,
                    offset: {
                        top: 1e10,
                        left: 1e10
                    }
                };
            if (e.getBBox && e.parentNode) {
                if (g = e.getBBox(), h = e.getScreenCTM(), !(i = e.farthestViewportElement || e).createSVGPoint) return f;
                (j = i.createSVGPoint()).x = g.x, j.y = g.y, k = j.matrixTransform(h), f.offset.left = k.x, f.offset.top = k.y, j.x += g.width, j.y += g.height, k = j.matrixTransform(h), f.width = k.x - f.offset.left, f.height = k.y - f.offset.top, f.offset.left += d.scrollLeft(), f.offset.top += d.scrollTop()
            }
            return f
        }, h.modal = function(a) {
            var b = a.plugins.modal;
            return "object" == typeof b ? b : a.plugins.modal = new D(a)
        }, h.modal.initialize = "render", h.modal.sanitize = function(a) {
            a.show && ("object" != typeof a.show.modal ? a.show.modal = {
                on: !!a.show.modal
            } : void 0 === a.show.modal.on && (a.show.modal.on = d))
        }, a.extend(d, g.defaults, {
            show: {
                modal: {
                    on: e,
                    effect: d,
                    blur: d,
                    escape: d
                }
            }
        })
    }(jQuery, window),
    function($) {
        var multiselectID = 0;
        $.widget("ech.multiselect", {
            options: {
                header: !0,
                height: 175,
                minWidth: 225,
                classes: "",
                checkAllText: I18n.t("check_all", {
                    default: "Check all"
                }),
                uncheckAllText: I18n.t("uncheck_all", {
                    default: "Uncheck all"
                }),
                noneSelectedText: I18n.t("select_options", {
                    default: "Select options"
                }),
                selectedText: I18n.t("number_selected", {
                    default: "# selected"
                }),
                selectedList: 0,
                show: null,
                hide: null,
                autoOpen: !1,
                multiple: !0,
                position: {}
            },
            _create: function() {
                var el = this.element.hide(),
                    o = this.options;
                this.speed = $.fx.speeds._default, this._isOpen = !1;
                var button = (this.button = $('<button type="button"><span class="ui-icon ui-icon-triangle-2-n-s"></span></button>')).addClass("ui-multiselect ui-widget ui-state-default ui-corner-all").addClass(o.classes).attr({
                        title: el.attr("title"),
                        "aria-haspopup": !0,
                        tabIndex: el.attr("tabIndex")
                    }).insertAfter(el),
                    menu = ((this.buttonlabel = $("<span />")).html(o.noneSelectedText).appendTo(button), (this.menu = $("<div />")).addClass("ui-multiselect-menu ui-widget ui-widget-content ui-corner-all").addClass(o.classes).appendTo(document.body)),
                    header = (this.header = $("<div />")).addClass("ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix").appendTo(menu);
                (this.headerLinkContainer = $("<ul />")).addClass("ui-helper-reset").html((function() {
                    return !0 === o.header ? '<li><a class="ui-multiselect-all" href="#"><span class="ui-icon ui-icon-check"></span><span>' + o.checkAllText + '</span></a></li><li><a class="ui-multiselect-none" href="#"><span class="ui-icon ui-icon-closethick"></span><span>' + o.uncheckAllText + "</span></a></li>" : "string" == typeof o.header ? "<li>" + o.header + "</li>" : ""
                })).append('<li class="ui-multiselect-close"><a href="#" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>').appendTo(header), (this.checkboxContainer = $("<ul />")).addClass("ui-multiselect-checkboxes ui-helper-reset").appendTo(menu);
                this._bindEvents(), this.refresh(!0), o.multiple || menu.addClass("ui-multiselect-single")
            },
            _init: function() {
                !1 === this.options.header && this.header.hide(), this.options.multiple || this.headerLinkContainer.find(".ui-multiselect-all, .ui-multiselect-none").hide(), this.options.autoOpen && this.open(), this.element.is(":disabled") && this.disable()
            },
            refresh: function(init) {
                var el = this.element,
                    o = this.options,
                    menu = this.menu,
                    checkboxContainer = this.checkboxContainer,
                    optgroups = [],
                    html = "",
                    id = el.attr("id") || multiselectID++;
                el.find("option").each((function(i) {
                    $(this);
                    var optLabel, parent = this.parentNode,
                        title = this.innerHTML,
                        description = this.title,
                        value = this.value,
                        inputID = "ui-multiselect-" + (this.id || id + "-option-" + i),
                        isDisabled = this.disabled,
                        isSelected = this.selected,
                        labelClasses = ["ui-corner-all"],
                        liClasses = (isDisabled ? "ui-multiselect-disabled " : " ") + this.className;
                    "OPTGROUP" === parent.tagName && (optLabel = parent.getAttribute("label"), -1 === $.inArray(optLabel, optgroups) && (html += '<li class="ui-multiselect-optgroup-label ' + parent.className + '"><a href="#">' + optLabel + "</a></li>", optgroups.push(optLabel))), isDisabled && labelClasses.push("ui-state-disabled"), isSelected && !o.multiple && labelClasses.push("ui-state-active"), html += '<li class="' + liClasses + '">', html += '<label for="' + inputID + '" title="' + description + '" class="' + labelClasses.join(" ") + '">', html += '<input id="' + inputID + '" name="multiselect_' + id + '" type="' + (o.multiple ? "checkbox" : "radio") + '" value="' + value + '" title="' + title + '"', isSelected && (html += ' checked="checked"', html += ' aria-selected="true"'), isDisabled && (html += ' disabled="disabled"', html += ' aria-disabled="true"'), html += " /><span>" + title + "</span></label></li>"
                })), checkboxContainer.html(html), this.labels = menu.find("label"), this.inputs = this.labels.children("input"), this._setButtonWidth(), this._setMenuWidth(), this.button[0].defaultValue = this.update(), init || this._trigger("refresh")
            },
            update: function() {
                var value, o = this.options,
                    $inputs = this.inputs,
                    $checked = $inputs.filter(":checked"),
                    numChecked = $checked.length;
                return value = 0 === numChecked ? o.noneSelectedText : $.isFunction(o.selectedText) ? o.selectedText.call(this, numChecked, $inputs.length, $checked.get()) : /\d/.test(o.selectedList) && o.selectedList > 0 && numChecked <= o.selectedList ? $checked.map((function() {
                    return $(this).next().html()
                })).get().join(", ") : o.selectedText.replace("#", numChecked).replace("#", $inputs.length), this.buttonlabel.html(value), value
            },
            _bindEvents: function() {
                function clickHandler() {
                    return self[self._isOpen ? "close" : "open"](), !1
                }
                var self = this,
                    button = this.button;
                button.find("span").bind("click.multiselect", clickHandler), button.bind({
                    click: clickHandler,
                    keypress: function(e) {
                        switch (e.which) {
                            case 27:
                            case 38:
                            case 37:
                                self.close();
                                break;
                            case 39:
                            case 40:
                                self.open()
                        }
                    },
                    mouseenter: function() {
                        button.hasClass("ui-state-disabled") || $(this).addClass("ui-state-hover")
                    },
                    mouseleave: function() {
                        $(this).removeClass("ui-state-hover")
                    },
                    focus: function() {
                        button.hasClass("ui-state-disabled") || $(this).addClass("ui-state-focus")
                    },
                    blur: function() {
                        $(this).removeClass("ui-state-focus")
                    }
                }), this.header.delegate("a", "click.multiselect", (function(e) {
                    $(this).hasClass("ui-multiselect-close") ? self.close() : self[$(this).hasClass("ui-multiselect-all") ? "checkAll" : "uncheckAll"](), e.preventDefault()
                })), this.menu.delegate("li.ui-multiselect-optgroup-label a", "click.multiselect", (function(e) {
                    e.preventDefault();
                    var $this = $(this),
                        $inputs = $this.parent().nextUntil("li.ui-multiselect-optgroup-label").find("input:visible:not(:disabled)"),
                        nodes = $inputs.get(),
                        label = $this.parent().text();
                    !1 !== self._trigger("beforeoptgrouptoggle", e, {
                        inputs: nodes,
                        label: label
                    }) && (self._toggleChecked($inputs.filter(":checked").length !== $inputs.length, $inputs), self._trigger("optgrouptoggle", e, {
                        inputs: nodes,
                        label: label,
                        checked: nodes[0].checked
                    }))
                })).delegate("label", "mouseenter.multiselect", (function() {
                    $(this).hasClass("ui-state-disabled") || (self.labels.removeClass("ui-state-hover"), $(this).addClass("ui-state-hover").find("input").focus())
                })).delegate("label", "keydown.multiselect", (function(e) {
                    switch (e.preventDefault(), e.which) {
                        case 9:
                        case 27:
                            self.close();
                            break;
                        case 38:
                        case 40:
                        case 37:
                        case 39:
                            self._traverse(e.which, this);
                            break;
                        case 13:
                            $(this).find("input")[0].click()
                    }
                })).delegate('input[type="checkbox"], input[type="radio"]', "click.multiselect", (function(e) {
                    var $this = $(this),
                        val = this.value,
                        checked = this.checked,
                        tags = self.element.find("option");
                    this.disabled || !1 === self._trigger("click", e, {
                        value: val,
                        text: this.title,
                        checked: checked
                    }) ? e.preventDefault() : ($this.focus(), $this.attr("aria-selected", checked), tags.each((function() {
                        this.value === val ? this.selected = checked : self.options.multiple || (this.selected = !1)
                    })), self.options.multiple || (self.labels.removeClass("ui-state-active"), $this.closest("label").toggleClass("ui-state-active", checked), self.close()), self.element.trigger("change"), setTimeout($.proxy(self.update, self), 10))
                })), $(document).bind("mousedown.multiselect", (function(e) {
                    !self._isOpen || $.contains(self.menu[0], e.target) || $.contains(self.button[0], e.target) || e.target === self.button[0] || self.close()
                })), $(this.element[0].form).bind("reset.multiselect", (function() {
                    setTimeout($.proxy(self.refresh, self), 10)
                }))
            },
            _setButtonWidth: function() {
                var width = this.element.outerWidth(),
                    o = this.options;
                /\d/.test(o.minWidth) && width < o.minWidth && (width = o.minWidth), this.button.width(width)
            },
            _setMenuWidth: function() {
                var m = this.menu,
                    width = this.button.outerWidth() - parseInt(m.css("padding-left"), 10) - parseInt(m.css("padding-right"), 10) - parseInt(m.css("border-right-width"), 10) - parseInt(m.css("border-left-width"), 10);
                m.width(width || this.button.outerWidth())
            },
            _traverse: function(which, start) {
                var moveToLast = 38 === which || 37 === which,
                    $next = $(start).parent()[moveToLast ? "prevAll" : "nextAll"]("li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)")[moveToLast ? "last" : "first"]();
                if ($next.length) $next.find("label").trigger("mouseover");
                else {
                    var $container = this.menu.find("ul").last();
                    this.menu.find("label")[moveToLast ? "last" : "first"]().trigger("mouseover"), $container.scrollTop(moveToLast ? $container.height() : 0)
                }
            },
            _toggleState: function(prop, flag) {
                return function() {
                    this.disabled || (this[prop] = flag), flag ? this.setAttribute("aria-selected", !0) : this.removeAttribute("aria-selected")
                }
            },
            _toggleChecked: function(flag, group) {
                var $inputs = group && group.length ? group : this.inputs,
                    self = this;
                $inputs.each(this._toggleState("checked", flag)), $inputs.eq(0).focus(), this.update();
                var values = $inputs.map((function() {
                    return this.value
                })).get();
                this.element.find("option").each((function() {
                    !this.disabled && $.inArray(this.value, values) > -1 && self._toggleState("selected", flag).call(this)
                })), $inputs.length && this.element.trigger("change")
            },
            _toggleDisabled: function(flag) {
                this.button.attr({
                    disabled: flag,
                    "aria-disabled": flag
                })[flag ? "addClass" : "removeClass"]("ui-state-disabled");
                var inputs = this.menu.find("input"),
                    key = "ech-multiselect-disabled";
                (inputs = flag ? inputs.filter(":enabled").data(key, !0) : inputs.filter((function() {
                    return !0 === $.data(this, key)
                })).removeData(key)).attr({
                    disabled: flag,
                    "arial-disabled": flag
                }).parent()[flag ? "addClass" : "removeClass"]("ui-state-disabled"), this.element.attr({
                    disabled: flag,
                    "aria-disabled": flag
                })
            },
            open: function() {
                var self = this,
                    button = this.button,
                    menu = this.menu,
                    speed = this.speed,
                    o = this.options,
                    args = [];
                if (!1 !== this._trigger("beforeopen") && !button.hasClass("ui-state-disabled") && !this._isOpen) {
                    var $container = menu.find("ul").last(),
                        effect = o.show,
                        pos = button.offset();
                    $.isArray(o.show) && (effect = o.show[0], speed = o.show[1] || self.speed), effect && (args = [effect, speed]), $container.scrollTop(0).height(o.height), $.ui.position && !$.isEmptyObject(o.position) ? (o.position.of = o.position.of || button, menu.show().position(o.position).hide()) : menu.css({
                        top: pos.top + button.outerHeight(),
                        left: pos.left
                    }), $.fn.show.apply(menu, args), this.labels.eq(0).trigger("mouseover").trigger("mouseenter").find("input").trigger("focus"), button.addClass("ui-state-active"), this._isOpen = !0, this._trigger("open")
                }
            },
            close: function() {
                if (!1 !== this._trigger("beforeclose")) {
                    var o = this.options,
                        effect = o.hide,
                        speed = this.speed,
                        args = [];
                    $.isArray(o.hide) && (effect = o.hide[0], speed = o.hide[1] || this.speed), effect && (args = [effect, speed]), $.fn.hide.apply(this.menu, args), this.button.removeClass("ui-state-active").trigger("blur").trigger("mouseleave"), this._isOpen = !1, this._trigger("close")
                }
            },
            enable: function() {
                this._toggleDisabled(!1)
            },
            disable: function() {
                this._toggleDisabled(!0)
            },
            checkAll: function() {
                this._toggleChecked(!0), this._trigger("checkAll")
            },
            uncheckAll: function() {
                this._toggleChecked(!1), this._trigger("uncheckAll")
            },
            getChecked: function() {
                return this.menu.find("input").filter(":checked")
            },
            destroy: function() {
                return $.Widget.prototype.destroy.call(this), this.button.remove(), this.menu.remove(), this.element.show(), this
            },
            isOpen: function() {
                return this._isOpen
            },
            widget: function() {
                return this.menu
            },
            getButton: function() {
                return this.button
            },
            _setOption: function(key, value) {
                var menu = this.menu;
                switch (key) {
                    case "header":
                        menu.find("div.ui-multiselect-header")[value ? "show" : "hide"]();
                        break;
                    case "checkAllText":
                        menu.find("a.ui-multiselect-all span").eq(-1).text(value);
                        break;
                    case "uncheckAllText":
                        menu.find("a.ui-multiselect-none span").eq(-1).text(value);
                        break;
                    case "height":
                        menu.find("ul").last().height(parseInt(value, 10));
                        break;
                    case "minWidth":
                        this.options[key] = parseInt(value, 10), this._setButtonWidth(), this._setMenuWidth();
                        break;
                    case "selectedText":
                    case "selectedList":
                    case "noneSelectedText":
                        this.options[key] = value, this.update();
                        break;
                    case "classes":
                        menu.add(this.button).removeClass(this.options.classes).addClass(value);
                        break;
                    case "multiple":
                        menu.toggleClass("ui-multiselect-single", !value), this.options.multiple = value, this.element[0].multiple = value, this.refresh()
                }
                $.Widget.prototype._setOption.apply(this, arguments)
            }
        })
    }(jQuery),
    function($) {
        function filter(array, term) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, (function(value) {
                return matcher.test($("<div>").html(value.label || value.value || value).text())
            }))
        }
        var proto = $.ui.autocomplete.prototype,
            initSource = proto._initSource;
        $.extend(proto, {
            _initSource: function() {
                this.options.html && $.isArray(this.options.source) ? this.source = function(request, response) {
                    response(filter(this.options.source, request.term))
                } : initSource.call(this)
            },
            _renderItem: function(ul, item) {
                return $("<li></li>").data("item.autocomplete", item).append($("<a></a>")[this.options.html ? "html" : "text"](item.label)).appendTo(ul)
            }
        })
    }(jQuery),
    function($) {
        $.widget("ui.chooser", {
            options: {
                choiceClass: "ui-widget ui-widget-content ui-corner-left inlineblock ui-chooser-choice",
                inputClass: "ui-widget ui-widget-content ui-corner-left inlineblock ui-chooser-input",
                buttonClass: "ui-corner-right ui-chooser-button ui-button-icon inlineblock",
                queryParam: "term"
            },
            _create: function() {
                var self = this,
                    collectionUrl = (this.options.source, this.options.collectionUrl),
                    cache = {},
                    defaultSources = this.options.defaultSources || $.parseJSON($(this.element).attr("data-chooser-default-sources") || null);
                collectionUrl || "string" != typeof this.options.source || (collectionUrl = this.options.collectionUrl = this.options.source), this.defaultSources = defaultSources = this.recordsToItems(defaultSources), this.options.chosen = this.options.chosen || $.parseJSON($(this.element).attr("data-chooser-chosen") || null), this.options.source = this.options.source || defaultSources;
                var markup = this.setupMarkup();
                if (this.selectDefault(), !this.options.collectionUrl && 0 == this.options.source.length || "string" == typeof this.options.source[0]) {
                    var that = this;
                    $(this.markup.input).blur((function() {
                        $(that.markup.input).is(":visible") && that.selectItem($(that.markup.input).val())
                    }))
                }
                markup.input.autocomplete({
                    html: !0,
                    minLength: 0,
                    select: function(ui, event) {
                        return event.item.forceRemote ? (cache = {}, self.options.source = collectionUrl, $(ui.target).autocomplete("search", ui.target.value)) : event.item.clear ? ($(self).data("previous", null), self.clear()) : self.selectItem(event.item), !1
                    },
                    source: function(request, response) {
                        var source = self.options.source;
                        if ("" == request.term && "string" == typeof source && (source = self.options.source = self.defaultSources), "string" != typeof source) {
                            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i"),
                                selected = $.map(source, (function(src) {
                                    if (src.forceRemote || matcher.test(src.label)) return src
                                }));
                            if (0 != selected.length) return collectionUrl && "" != request.term && selected.push({
                                label: "<em>" + I18n.t("search_remote") + "</em>",
                                value: request.term,
                                forceRemote: !0
                            }), selected.push({
                                label: "<em>" + I18n.t("clear") + "</em>",
                                value: request.term,
                                clear: !0
                            }), void response(selected);
                            response([])
                        }
                        cache[request.term] ? response(cache[request.term]) : collectionUrl && (markup.chooseButton.hide(), markup.loadingButton.showInlineBlock(), self.request && self.request.abort(), self.request = $.getJSON(collectionUrl, self.options.queryParam + "=" + request.term, (function(json) {
                            markup.chooseButton.showInlineBlock(), markup.loadingButton.hide(), (json = self.recordsToItems(json)).push({
                                label: "<em>" + I18n.t("clear") + "</em>",
                                value: request.term,
                                clear: !0
                            }), cache[request.term] = json, response(json)
                        })))
                    }
                }), markup.clearButton.click((function() {
                    self.clear()
                })), markup.input.bind("autocompleteclose", (function() {
                    !markup.input.is(":focus") && $(self).data("previous") && self.selectItem($(self).data("previous"), {
                        blurring: !0
                    })
                })), markup.input.bind("autocompleteopen", (function(e) {
                    $(e.currentTarget).is(":visible") || markup.input.autocomplete("close")
                })), markup.chooseButton.click((function() {
                    markup.input.autocomplete("widget").is(":visible") ? markup.input.autocomplete("close") : ($(this).blur(), $(self).data("previous", $(self).data("selected")), self.open(), markup.input.autocomplete("search", ""), markup.input.focus())
                })), $(markup.input).keypress((function(e) {
                    if (13 == e.which) return !1
                }))
            },
            selectDefault: function() {
                var self = this;
                this.markup;
                if (this.options.chosen) {
                    var item = this.options.chosen;
                    "string" != typeof item && (item = self.recordsToItems([item])[0]), $(this).data("previous", item), this.selectItem(item)
                } else "" != $(this.element).val() && this.options.resourceUrl && this.selectId($(this.element).val())
            },
            selectId: function(id) {
                var self = this,
                    markup = this.markup;
                markup.chooseButton.hide(), markup.loadingButton.showInlineBlock();
                var resourceUrl = this.options.resourceUrl.replace(/\{\{id\}\}/, id);
                $.getJSON(resourceUrl, (function(json) {
                    var item = self.recordsToItems([json])[0];
                    markup.loadingButton.hide(), self.selectItem(item)
                }))
            },
            recordsToItems: function(records) {
                var items = [];
                (records = records || []).results && (records = records.results.length > 0 && records.results[0].record ? _.map(records.results, (function(r) {
                    return r.record
                })) : records.results);
                for (var i = 0; i < records.length; i++) records[i] && items.push($.extend(records[i], {
                    label: records[i].label || records[i].html || records[i].title || records[i].login || records[i].name,
                    value: records[i].value || records[i].title || records[i].name || records[i].id,
                    recordId: records[i].id
                }));
                return items
            },
            selectItem: function(item, options) {
                if (options = options || this.options || {}, item) {
                    if ("object" == typeof item) {
                        item.label || (item = this.recordsToItems([item])[0]);
                        var itemLabel = item.label || item.html,
                            itemValue = item.recordId || item.value || item.id
                    } else itemLabel = item, itemValue = item;
                    $(this).data("selected", item), $(this.markup.input).hide(), $(this.markup.choice).html(itemLabel).showInlineBlock().width(this.markup.input.width()), $(this.markup.chooseButton).showInlineBlock(), $(this.markup.clearButton).height(this.markup.choice.outerHeight() - 2), $(this.markup.chooseButton).height(this.markup.choice.outerHeight() - 2), $(".ui-icon", this.markup.clearButton).css("margin-top", "-" + Math.round(this.markup.choice.outerHeight() / 2 - 6) + "px"), $(".ui-icon", this.markup.chooseButton).css("margin-top", "-" + Math.round(this.markup.choice.outerHeight() / 2 - 6) + "px"), $(this.markup.originalInput).val(itemValue).change()
                } else this.clear();
                var changed = !0;
                ($(this).data("previous") && $(this).data("previous").id === item.id || !$(this).data("previous") && !item) && (changed = !1), !options.blurring && "function" == typeof this.options.afterSelect && changed && this.options.afterSelect.apply(this, [item]), $(this).data("previous", null)
            },
            open: function(opts) {
                this.options;
                var bubble = 0 != (opts = opts || {}).bubble;
                $(this).data("selected", null), $(this.markup.originalInput).val(""), !$(this).data("previous") && bubble && $(this.markup.originalInput).change(), $(this.markup.input).val("").showInlineBlock(), $(this.markup.choice).html("").hide(), $(this.markup.chooseButton).height(this.markup.input.outerHeight()), $(".ui-icon", this.markup.chooseButton).css("margin-top", "-" + Math.round(this.markup.input.outerHeight() / 2 - 6) + "px")
            },
            clear: function(clearOpts) {
                var options = this.options || {};
                this.open(clearOpts), options.blurring || "function" != typeof this.options.afterClear || this.options.afterClear.apply(this)
            },
            setupMarkup: function() {
                var originalInput = this.element.hide();
                return this.markup = {
                    originalInput: originalInput,
                    wrapper: $('<div class="inlineblock ui-chooser"></div>').attr("id", originalInput.attr("id") + "_chooser"),
                    input: $('<input type="text"/>').addClass(this.options.inputClass).attr("placeholder", originalInput.attr("placeholder")).blur((function() {
                        $(this).val("")
                    })),
                    choice: $("<div></div>").addClass(this.options.choiceClass).hide(),
                    chooseButton: $('<button type="button" class="choosebutton">&nbsp;</button>').button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: !1
                    }).removeClass("ui-corner-all").addClass(this.options.buttonClass),
                    clearButton: $('<button type="button">&nbsp;</button>').button({
                        icons: {
                            primary: "ui-icon-cancel"
                        },
                        text: !1
                    }).removeClass("ui-corner-all").addClass(this.options.buttonClass).hide(),
                    loadingButton: $('<button type="button" disabled="disabled">&nbsp;</button>').button({
                        text: !1,
                        disabled: !0
                    }).removeClass("ui-corner-all").addClass(this.options.buttonClass + " ui-icon-loading").hide()
                }, $(this.markup.originalInput).wrap(this.markup.wrapper), this.markup.originalInput.after(this.markup.input, this.markup.choice, this.markup.chooseButton, this.markup.loadingButton, this.markup.clearButton), this.markup.input.width(originalInput.outerWidth() - this.markup.chooseButton.width() - 20), this.markup.choice.width(originalInput.outerWidth()), this.markup
            },
            destroy: function() {
                this.markup.input.remove(), this.markup.choice.remove(), this.markup.chooseButton.remove(), this.markup.loadingButton.remove(), this.markup.clearButton.remove(), this.element.show(), $.Widget.prototype.destroy.call(this)
            },
            getOptions: function() {
                return this.options
            },
            getSources: function() {
                return this.options.source
            },
            getItemById: function(id) {
                for (var i = this.options.source.length - 1; i >= 0; i--)
                    if (this.options.source[i].id == id) return this.options.source[i];
                return null
            },
            selected: function() {
                var selected = $(this).data("selected");
                return void 0 === selected ? null : selected
            }
        })
    }(jQuery),
    function($) {
        if ($.ui.timepicker = $.ui.timepicker || {}, !$.ui.timepicker.version) {
            $.extend($.ui, {
                timepicker: {
                    version: "1.4.5"
                }
            });
            var Timepicker = function() {
                this.regional = [], this.regional[""] = {
                    currentText: "Now",
                    closeText: "Done",
                    amNames: ["AM", "A"],
                    pmNames: ["PM", "P"],
                    timeFormat: "HH:mm",
                    timeSuffix: "",
                    timeOnlyTitle: "Choose Time",
                    timeText: "Time",
                    hourText: "Hour",
                    minuteText: "Minute",
                    secondText: "Second",
                    millisecText: "Millisecond",
                    microsecText: "Microsecond",
                    timezoneText: "Time Zone",
                    isRTL: !1
                }, this._defaults = {
                    showButtonPanel: !0,
                    timeOnly: !1,
                    timeOnlyShowDate: !1,
                    showHour: null,
                    showMinute: null,
                    showSecond: null,
                    showMillisec: null,
                    showMicrosec: null,
                    showTimezone: null,
                    showTime: !0,
                    stepHour: 1,
                    stepMinute: 1,
                    stepSecond: 1,
                    stepMillisec: 1,
                    stepMicrosec: 1,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisec: 0,
                    microsec: 0,
                    timezone: null,
                    hourMin: 0,
                    minuteMin: 0,
                    secondMin: 0,
                    millisecMin: 0,
                    microsecMin: 0,
                    hourMax: 23,
                    minuteMax: 59,
                    secondMax: 59,
                    millisecMax: 999,
                    microsecMax: 999,
                    minDateTime: null,
                    maxDateTime: null,
                    maxTime: null,
                    minTime: null,
                    onSelect: null,
                    hourGrid: 0,
                    minuteGrid: 0,
                    secondGrid: 0,
                    millisecGrid: 0,
                    microsecGrid: 0,
                    alwaysSetTime: !0,
                    separator: " ",
                    altFieldTimeOnly: !0,
                    altTimeFormat: null,
                    altSeparator: null,
                    altTimeSuffix: null,
                    altRedirectFocus: !0,
                    pickerTimeFormat: null,
                    pickerTimeSuffix: null,
                    showTimepicker: !0,
                    timezoneList: null,
                    addSliderAccess: !1,
                    sliderAccessArgs: null,
                    controlType: "slider",
                    defaultValue: null,
                    parse: "strict"
                }, $.extend(this._defaults, this.regional[""])
            };
            $.extend(Timepicker.prototype, {
                    $input: null,
                    $altInput: null,
                    $timeObj: null,
                    inst: null,
                    hour_slider: null,
                    minute_slider: null,
                    second_slider: null,
                    millisec_slider: null,
                    microsec_slider: null,
                    timezone_select: null,
                    maxTime: null,
                    minTime: null,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisec: 0,
                    microsec: 0,
                    timezone: null,
                    hourMinOriginal: null,
                    minuteMinOriginal: null,
                    secondMinOriginal: null,
                    millisecMinOriginal: null,
                    microsecMinOriginal: null,
                    hourMaxOriginal: null,
                    minuteMaxOriginal: null,
                    secondMaxOriginal: null,
                    millisecMaxOriginal: null,
                    microsecMaxOriginal: null,
                    ampm: "",
                    formattedDate: "",
                    formattedTime: "",
                    formattedDateTime: "",
                    timezoneList: null,
                    units: ["hour", "minute", "second", "millisec", "microsec"],
                    support: {},
                    control: null,
                    setDefaults: function(settings) {
                        return extendRemove(this._defaults, settings || {}), this
                    },
                    _newInst: function($input, opts) {
                        var tp_inst = new Timepicker,
                            inlineSettings = {},
                            fns = {},
                            overrides, i;
                        for (var attrName in this._defaults)
                            if (this._defaults.hasOwnProperty(attrName)) {
                                var attrValue = $input.attr("time:" + attrName);
                                if (attrValue) try {
                                    inlineSettings[attrName] = eval(attrValue)
                                } catch (err) {
                                    inlineSettings[attrName] = attrValue
                                }
                            }
                        for (i in overrides = {
                                beforeShow: function(input, dp_inst) {
                                    if ($.isFunction(tp_inst._defaults.evnts.beforeShow)) return tp_inst._defaults.evnts.beforeShow.call($input[0], input, dp_inst, tp_inst)
                                },
                                onChangeMonthYear: function(year, month, dp_inst) {
                                    tp_inst._updateDateTime(dp_inst), $.isFunction(tp_inst._defaults.evnts.onChangeMonthYear) && tp_inst._defaults.evnts.onChangeMonthYear.call($input[0], year, month, dp_inst, tp_inst)
                                },
                                onClose: function(dateText, dp_inst) {
                                    !0 === tp_inst.timeDefined && "" !== $input.val() && tp_inst._updateDateTime(dp_inst), $.isFunction(tp_inst._defaults.evnts.onClose) && tp_inst._defaults.evnts.onClose.call($input[0], dateText, dp_inst, tp_inst)
                                }
                            }, overrides) overrides.hasOwnProperty(i) && (fns[i] = opts[i] || null);
                        tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, opts, overrides, {
                            evnts: fns,
                            timepicker: tp_inst
                        }), tp_inst.amNames = $.map(tp_inst._defaults.amNames, (function(val) {
                            return val.toUpperCase()
                        })), tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, (function(val) {
                            return val.toUpperCase()
                        })), tp_inst.support = detectSupport(tp_inst._defaults.timeFormat + (tp_inst._defaults.pickerTimeFormat ? tp_inst._defaults.pickerTimeFormat : "") + (tp_inst._defaults.altTimeFormat ? tp_inst._defaults.altTimeFormat : "")), "string" == typeof tp_inst._defaults.controlType ? ("slider" === tp_inst._defaults.controlType && void 0 === $.ui.slider && (tp_inst._defaults.controlType = "select"), tp_inst.control = tp_inst._controls[tp_inst._defaults.controlType]) : tp_inst.control = tp_inst._defaults.controlType;
                        var timezoneList = [-720, -660, -600, -570, -540, -480, -420, -360, -300, -270, -240, -210, -180, -120, -60, 0, 60, 120, 180, 210, 240, 270, 300, 330, 345, 360, 390, 420, 480, 525, 540, 570, 600, 630, 660, 690, 720, 765, 780, 840];
                        null !== tp_inst._defaults.timezoneList && (timezoneList = tp_inst._defaults.timezoneList);
                        var tzl = timezoneList.length,
                            tzi = 0,
                            tzv = null;
                        if (tzl > 0 && "object" != typeof timezoneList[0])
                            for (; tzi < tzl; tzi++) tzv = timezoneList[tzi], timezoneList[tzi] = {
                                value: tzv,
                                label: $.timepicker.timezoneOffsetString(tzv, tp_inst.support.iso8601)
                            };
                        return tp_inst._defaults.timezoneList = timezoneList, tp_inst.timezone = null !== tp_inst._defaults.timezone ? $.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone) : -1 * (new Date).getTimezoneOffset(), tp_inst.hour = tp_inst._defaults.hour < tp_inst._defaults.hourMin ? tp_inst._defaults.hourMin : tp_inst._defaults.hour > tp_inst._defaults.hourMax ? tp_inst._defaults.hourMax : tp_inst._defaults.hour, tp_inst.minute = tp_inst._defaults.minute < tp_inst._defaults.minuteMin ? tp_inst._defaults.minuteMin : tp_inst._defaults.minute > tp_inst._defaults.minuteMax ? tp_inst._defaults.minuteMax : tp_inst._defaults.minute, tp_inst.second = tp_inst._defaults.second < tp_inst._defaults.secondMin ? tp_inst._defaults.secondMin : tp_inst._defaults.second > tp_inst._defaults.secondMax ? tp_inst._defaults.secondMax : tp_inst._defaults.second, tp_inst.millisec = tp_inst._defaults.millisec < tp_inst._defaults.millisecMin ? tp_inst._defaults.millisecMin : tp_inst._defaults.millisec > tp_inst._defaults.millisecMax ? tp_inst._defaults.millisecMax : tp_inst._defaults.millisec, tp_inst.microsec = tp_inst._defaults.microsec < tp_inst._defaults.microsecMin ? tp_inst._defaults.microsecMin : tp_inst._defaults.microsec > tp_inst._defaults.microsecMax ? tp_inst._defaults.microsecMax : tp_inst._defaults.microsec, tp_inst.ampm = "", tp_inst.$input = $input, tp_inst._defaults.altField && (tp_inst.$altInput = $(tp_inst._defaults.altField), !0 === tp_inst._defaults.altRedirectFocus && tp_inst.$altInput.css({
                            cursor: "pointer"
                        }).focus((function() {
                            $input.trigger("focus")
                        }))), 0 !== tp_inst._defaults.minDate && 0 !== tp_inst._defaults.minDateTime || (tp_inst._defaults.minDate = new Date), 0 !== tp_inst._defaults.maxDate && 0 !== tp_inst._defaults.maxDateTime || (tp_inst._defaults.maxDate = new Date), void 0 !== tp_inst._defaults.minDate && tp_inst._defaults.minDate instanceof Date && (tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime())), void 0 !== tp_inst._defaults.minDateTime && tp_inst._defaults.minDateTime instanceof Date && (tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime())), void 0 !== tp_inst._defaults.maxDate && tp_inst._defaults.maxDate instanceof Date && (tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime())), void 0 !== tp_inst._defaults.maxDateTime && tp_inst._defaults.maxDateTime instanceof Date && (tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime())), tp_inst.$input.bind("focus", (function() {
                            tp_inst._onFocus()
                        })), tp_inst
                    },
                    _addTimePicker: function(dp_inst) {
                        var currDT = this.$altInput && this._defaults.altFieldTimeOnly ? this.$input.val() + " " + this.$altInput.val() : this.$input.val();
                        this.timeDefined = this._parseTime(currDT), this._limitMinMaxDateTime(dp_inst, !1), this._injectTimePicker()
                    },
                    _parseTime: function(timeString, withDate) {
                        if (this.inst || (this.inst = $.datepicker._getInst(this.$input[0])), withDate || !this._defaults.timeOnly) {
                            var dp_dateFormat = $.datepicker._get(this.inst, "dateFormat");
                            try {
                                var parseRes = parseDateTimeInternal(dp_dateFormat, this._defaults.timeFormat, timeString, $.datepicker._getFormatConfig(this.inst), this._defaults);
                                if (!parseRes.timeObj) return !1;
                                $.extend(this, parseRes.timeObj)
                            } catch (err) {
                                return $.timepicker.log("Error parsing the date/time string: " + err + "\ndate/time string = " + timeString + "\ntimeFormat = " + this._defaults.timeFormat + "\ndateFormat = " + dp_dateFormat), !1
                            }
                            return !0
                        }
                        var timeObj = $.datepicker.parseTime(this._defaults.timeFormat, timeString, this._defaults);
                        return !!timeObj && ($.extend(this, timeObj), !0)
                    },
                    _injectTimePicker: function() {
                        var $dp = this.inst.dpDiv,
                            o = this.inst.settings,
                            tp_inst = this,
                            litem = "",
                            uitem = "",
                            show = null,
                            max = {},
                            gridSize = {},
                            size = null,
                            i = 0,
                            l = 0;
                        if (0 === $dp.find("div.ui-timepicker-div").length && o.showTimepicker) {
                            var noDisplay = ' style="display:none;"',
                                html = '<div class="ui-timepicker-div' + (o.isRTL ? " ui-timepicker-rtl" : "") + '"><dl><dt class="ui_tpicker_time_label"' + (o.showTime ? "" : noDisplay) + ">" + o.timeText + '</dt><dd class="ui_tpicker_time"' + (o.showTime ? "" : noDisplay) + "></dd>";
                            for (i = 0, l = this.units.length; i < l; i++) {
                                if (show = null !== o["show" + (uitem = (litem = this.units[i]).substr(0, 1).toUpperCase() + litem.substr(1))] ? o["show" + uitem] : this.support[litem], max[litem] = parseInt(o[litem + "Max"] - (o[litem + "Max"] - o[litem + "Min"]) % o["step" + uitem], 10), gridSize[litem] = 0, html += '<dt class="ui_tpicker_' + litem + '_label"' + (show ? "" : noDisplay) + ">" + o[litem + "Text"] + '</dt><dd class="ui_tpicker_' + litem + '"><div class="ui_tpicker_' + litem + '_slider"' + (show ? "" : noDisplay) + "></div>", show && o[litem + "Grid"] > 0) {
                                    if (html += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>', "hour" === litem)
                                        for (var h = o[litem + "Min"]; h <= max[litem]; h += parseInt(o[litem + "Grid"], 10)) {
                                            gridSize[litem]++;
                                            var tmph = $.datepicker.formatTime(this.support.ampm ? "hht" : "HH", {
                                                hour: h
                                            }, o);
                                            html += '<td data-for="' + litem + '">' + tmph + "</td>"
                                        } else
                                            for (var m = o[litem + "Min"]; m <= max[litem]; m += parseInt(o[litem + "Grid"], 10)) gridSize[litem]++, html += '<td data-for="' + litem + '">' + (m < 10 ? "0" : "") + m + "</td>";
                                    html += "</tr></table></div>"
                                }
                                html += "</dd>"
                            }
                            var showTz = null !== o.showTimezone ? o.showTimezone : this.support.timezone;
                            html += '<dt class="ui_tpicker_timezone_label"' + (showTz ? "" : noDisplay) + ">" + o.timezoneText + "</dt>", html += '<dd class="ui_tpicker_timezone" ' + (showTz ? "" : noDisplay) + "></dd>";
                            var $tp = $(html += "</dl></div>");
                            for (!0 === o.timeOnly && ($tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + o.timeOnlyTitle + "</div></div>"), $dp.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()), i = 0, l = tp_inst.units.length; i < l; i++) show = null !== o["show" + (uitem = (litem = tp_inst.units[i]).substr(0, 1).toUpperCase() + litem.substr(1))] ? o["show" + uitem] : this.support[litem], tp_inst[litem + "_slider"] = tp_inst.control.create(tp_inst, $tp.find(".ui_tpicker_" + litem + "_slider"), litem, tp_inst[litem], o[litem + "Min"], max[litem], o["step" + uitem]), show && o[litem + "Grid"] > 0 && (size = 100 * gridSize[litem] * o[litem + "Grid"] / (max[litem] - o[litem + "Min"]), $tp.find(".ui_tpicker_" + litem + " table").css({
                                width: size + "%",
                                marginLeft: o.isRTL ? "0" : size / (-2 * gridSize[litem]) + "%",
                                marginRight: o.isRTL ? size / (-2 * gridSize[litem]) + "%" : "0",
                                borderCollapse: "collapse"
                            }).find("td").click((function() {
                                var $t = $(this),
                                    h = $t.html(),
                                    n = parseInt(h.replace(/[^0-9]/g), 10),
                                    ap = h.replace(/[^apm]/gi),
                                    f = $t.data("for");
                                "hour" === f && (-1 !== ap.indexOf("p") && n < 12 ? n += 12 : -1 !== ap.indexOf("a") && 12 === n && (n = 0)), tp_inst.control.value(tp_inst, tp_inst[f + "_slider"], litem, n), tp_inst._onTimeChange(), tp_inst._onSelectHandler()
                            })).css({
                                cursor: "pointer",
                                width: 100 / gridSize[litem] + "%",
                                textAlign: "center",
                                overflow: "hidden"
                            }));
                            if (this.timezone_select = $tp.find(".ui_tpicker_timezone").append("<select></select>").find("select"), $.fn.append.apply(this.timezone_select, $.map(o.timezoneList, (function(val) {
                                    return $("<option />").val("object" == typeof val ? val.value : val).text("object" == typeof val ? val.label : val)
                                }))), void 0 !== this.timezone && null !== this.timezone && "" !== this.timezone) - 1 * new Date(this.inst.selectedYear, this.inst.selectedMonth, this.inst.selectedDay, 12).getTimezoneOffset() === this.timezone ? selectLocalTimezone(tp_inst) : this.timezone_select.val(this.timezone);
                            else void 0 !== this.hour && null !== this.hour && "" !== this.hour ? this.timezone_select.val(o.timezone) : selectLocalTimezone(tp_inst);
                            this.timezone_select.change((function() {
                                tp_inst._onTimeChange(), tp_inst._onSelectHandler()
                            }));
                            var $buttonPanel = $dp.find(".ui-datepicker-buttonpane");
                            if ($buttonPanel.length ? $buttonPanel.before($tp) : $dp.append($tp), this.$timeObj = $tp.find(".ui_tpicker_time"), null !== this.inst) {
                                var timeDefined = this.timeDefined;
                                this._onTimeChange(), this.timeDefined = timeDefined
                            }
                            if (this._defaults.addSliderAccess) {
                                var sliderAccessArgs = this._defaults.sliderAccessArgs,
                                    rtl = this._defaults.isRTL;
                                sliderAccessArgs.isRTL = rtl, setTimeout((function() {
                                    if (0 === $tp.find(".ui-slider-access").length) {
                                        $tp.find(".ui-slider:visible").sliderAccess(sliderAccessArgs);
                                        var sliderAccessWidth = $tp.find(".ui-slider-access:eq(0)").outerWidth(!0);
                                        sliderAccessWidth && $tp.find("table:visible").each((function() {
                                            var $g = $(this),
                                                oldWidth = $g.outerWidth(),
                                                oldMarginLeft = $g.css(rtl ? "marginRight" : "marginLeft").toString().replace("%", ""),
                                                newWidth = oldWidth - sliderAccessWidth,
                                                newMarginLeft = oldMarginLeft * newWidth / oldWidth + "%",
                                                css = {
                                                    width: newWidth,
                                                    marginRight: 0,
                                                    marginLeft: 0
                                                };
                                            css[rtl ? "marginRight" : "marginLeft"] = newMarginLeft, $g.css(css)
                                        }))
                                    }
                                }), 10)
                            }
                            tp_inst._limitMinMaxDateTime(this.inst, !0)
                        }
                    },
                    _limitMinMaxDateTime: function(dp_inst, adjustSliders) {
                        var o = this._defaults,
                            dp_date = new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay);
                        if (this._defaults.showTimepicker) {
                            if (null !== $.datepicker._get(dp_inst, "minDateTime") && void 0 !== $.datepicker._get(dp_inst, "minDateTime") && dp_date) {
                                var minDateTime = $.datepicker._get(dp_inst, "minDateTime"),
                                    minDateTimeDate = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), 0, 0, 0, 0);
                                null !== this.hourMinOriginal && null !== this.minuteMinOriginal && null !== this.secondMinOriginal && null !== this.millisecMinOriginal && null !== this.microsecMinOriginal || (this.hourMinOriginal = o.hourMin, this.minuteMinOriginal = o.minuteMin, this.secondMinOriginal = o.secondMin, this.millisecMinOriginal = o.millisecMin, this.microsecMinOriginal = o.microsecMin), dp_inst.settings.timeOnly || minDateTimeDate.getTime() === dp_date.getTime() ? (this._defaults.hourMin = minDateTime.getHours(), this.hour <= this._defaults.hourMin ? (this.hour = this._defaults.hourMin, this._defaults.minuteMin = minDateTime.getMinutes(), this.minute <= this._defaults.minuteMin ? (this.minute = this._defaults.minuteMin, this._defaults.secondMin = minDateTime.getSeconds(), this.second <= this._defaults.secondMin ? (this.second = this._defaults.secondMin, this._defaults.millisecMin = minDateTime.getMilliseconds(), this.millisec <= this._defaults.millisecMin ? (this.millisec = this._defaults.millisecMin, this._defaults.microsecMin = minDateTime.getMicroseconds()) : (this.microsec < this._defaults.microsecMin && (this.microsec = this._defaults.microsecMin), this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.hourMin = this.hourMinOriginal, this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)
                            }
                            if (null !== $.datepicker._get(dp_inst, "maxDateTime") && void 0 !== $.datepicker._get(dp_inst, "maxDateTime") && dp_date) {
                                var maxDateTime = $.datepicker._get(dp_inst, "maxDateTime"),
                                    maxDateTimeDate = new Date(maxDateTime.getFullYear(), maxDateTime.getMonth(), maxDateTime.getDate(), 0, 0, 0, 0);
                                null !== this.hourMaxOriginal && null !== this.minuteMaxOriginal && null !== this.secondMaxOriginal && null !== this.millisecMaxOriginal || (this.hourMaxOriginal = o.hourMax, this.minuteMaxOriginal = o.minuteMax, this.secondMaxOriginal = o.secondMax, this.millisecMaxOriginal = o.millisecMax, this.microsecMaxOriginal = o.microsecMax), dp_inst.settings.timeOnly || maxDateTimeDate.getTime() === dp_date.getTime() ? (this._defaults.hourMax = maxDateTime.getHours(), this.hour >= this._defaults.hourMax ? (this.hour = this._defaults.hourMax, this._defaults.minuteMax = maxDateTime.getMinutes(), this.minute >= this._defaults.minuteMax ? (this.minute = this._defaults.minuteMax, this._defaults.secondMax = maxDateTime.getSeconds(), this.second >= this._defaults.secondMax ? (this.second = this._defaults.secondMax, this._defaults.millisecMax = maxDateTime.getMilliseconds(), this.millisec >= this._defaults.millisecMax ? (this.millisec = this._defaults.millisecMax, this._defaults.microsecMax = maxDateTime.getMicroseconds()) : (this.microsec > this._defaults.microsecMax && (this.microsec = this._defaults.microsecMax), this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.hourMax = this.hourMaxOriginal, this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)
                            }
                            if (null !== dp_inst.settings.minTime) {
                                var tempMinTime = new Date("01/01/1970 " + dp_inst.settings.minTime);
                                this.hour < tempMinTime.getHours() ? (this.hour = this._defaults.hourMin = tempMinTime.getHours(), this.minute = this._defaults.minuteMin = tempMinTime.getMinutes()) : this.hour === tempMinTime.getHours() && this.minute < tempMinTime.getMinutes() ? this.minute = this._defaults.minuteMin = tempMinTime.getMinutes() : this._defaults.hourMin < tempMinTime.getHours() ? (this._defaults.hourMin = tempMinTime.getHours(), this._defaults.minuteMin = tempMinTime.getMinutes()) : this._defaults.hourMin === tempMinTime.getHours() === this.hour && this._defaults.minuteMin < tempMinTime.getMinutes() ? this._defaults.minuteMin = tempMinTime.getMinutes() : this._defaults.minuteMin = 0
                            }
                            if (null !== dp_inst.settings.maxTime) {
                                var tempMaxTime = new Date("01/01/1970 " + dp_inst.settings.maxTime);
                                this.hour > tempMaxTime.getHours() ? (this.hour = this._defaults.hourMax = tempMaxTime.getHours(), this.minute = this._defaults.minuteMax = tempMaxTime.getMinutes()) : this.hour === tempMaxTime.getHours() && this.minute > tempMaxTime.getMinutes() ? this.minute = this._defaults.minuteMax = tempMaxTime.getMinutes() : this._defaults.hourMax > tempMaxTime.getHours() ? (this._defaults.hourMax = tempMaxTime.getHours(), this._defaults.minuteMax = tempMaxTime.getMinutes()) : this._defaults.hourMax === tempMaxTime.getHours() === this.hour && this._defaults.minuteMax > tempMaxTime.getMinutes() ? this._defaults.minuteMax = tempMaxTime.getMinutes() : this._defaults.minuteMax = 59
                            }
                            if (void 0 !== adjustSliders && !0 === adjustSliders) {
                                var hourMax = parseInt(this._defaults.hourMax - (this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour, 10),
                                    minMax = parseInt(this._defaults.minuteMax - (this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute, 10),
                                    secMax = parseInt(this._defaults.secondMax - (this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond, 10),
                                    millisecMax = parseInt(this._defaults.millisecMax - (this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec, 10),
                                    microsecMax = parseInt(this._defaults.microsecMax - (this._defaults.microsecMax - this._defaults.microsecMin) % this._defaults.stepMicrosec, 10);
                                this.hour_slider && (this.control.options(this, this.hour_slider, "hour", {
                                    min: this._defaults.hourMin,
                                    max: hourMax,
                                    step: this._defaults.stepHour
                                }), this.control.value(this, this.hour_slider, "hour", this.hour - this.hour % this._defaults.stepHour)), this.minute_slider && (this.control.options(this, this.minute_slider, "minute", {
                                    min: this._defaults.minuteMin,
                                    max: minMax,
                                    step: this._defaults.stepMinute
                                }), this.control.value(this, this.minute_slider, "minute", this.minute - this.minute % this._defaults.stepMinute)), this.second_slider && (this.control.options(this, this.second_slider, "second", {
                                    min: this._defaults.secondMin,
                                    max: secMax,
                                    step: this._defaults.stepSecond
                                }), this.control.value(this, this.second_slider, "second", this.second - this.second % this._defaults.stepSecond)), this.millisec_slider && (this.control.options(this, this.millisec_slider, "millisec", {
                                    min: this._defaults.millisecMin,
                                    max: millisecMax,
                                    step: this._defaults.stepMillisec
                                }), this.control.value(this, this.millisec_slider, "millisec", this.millisec - this.millisec % this._defaults.stepMillisec)), this.microsec_slider && (this.control.options(this, this.microsec_slider, "microsec", {
                                    min: this._defaults.microsecMin,
                                    max: microsecMax,
                                    step: this._defaults.stepMicrosec
                                }), this.control.value(this, this.microsec_slider, "microsec", this.microsec - this.microsec % this._defaults.stepMicrosec))
                            }
                        }
                    },
                    _onTimeChange: function() {
                        if (this._defaults.showTimepicker) {
                            var hour = !!this.hour_slider && this.control.value(this, this.hour_slider, "hour"),
                                minute = !!this.minute_slider && this.control.value(this, this.minute_slider, "minute"),
                                second = !!this.second_slider && this.control.value(this, this.second_slider, "second"),
                                millisec = !!this.millisec_slider && this.control.value(this, this.millisec_slider, "millisec"),
                                microsec = !!this.microsec_slider && this.control.value(this, this.microsec_slider, "microsec"),
                                timezone = !!this.timezone_select && this.timezone_select.val(),
                                o = this._defaults,
                                pickerTimeFormat = o.pickerTimeFormat || o.timeFormat,
                                pickerTimeSuffix = o.pickerTimeSuffix || o.timeSuffix;
                            "object" == typeof hour && (hour = !1), "object" == typeof minute && (minute = !1), "object" == typeof second && (second = !1), "object" == typeof millisec && (millisec = !1), "object" == typeof microsec && (microsec = !1), "object" == typeof timezone && (timezone = !1), !1 !== hour && (hour = parseInt(hour, 10)), !1 !== minute && (minute = parseInt(minute, 10)), !1 !== second && (second = parseInt(second, 10)), !1 !== millisec && (millisec = parseInt(millisec, 10)), !1 !== microsec && (microsec = parseInt(microsec, 10)), !1 !== timezone && (timezone = timezone.toString());
                            var ampm = o[hour < 12 ? "amNames" : "pmNames"][0],
                                hasChanged = hour !== parseInt(this.hour, 10) || minute !== parseInt(this.minute, 10) || second !== parseInt(this.second, 10) || millisec !== parseInt(this.millisec, 10) || microsec !== parseInt(this.microsec, 10) || this.ampm.length > 0 && hour < 12 != (-1 !== $.inArray(this.ampm.toUpperCase(), this.amNames)) || null !== this.timezone && timezone !== this.timezone.toString();
                            hasChanged && (!1 !== hour && (this.hour = hour), !1 !== minute && (this.minute = minute), !1 !== second && (this.second = second), !1 !== millisec && (this.millisec = millisec), !1 !== microsec && (this.microsec = microsec), !1 !== timezone && (this.timezone = timezone), this.inst || (this.inst = $.datepicker._getInst(this.$input[0])), this._limitMinMaxDateTime(this.inst, !0)), this.support.ampm && (this.ampm = ampm), this.formattedTime = $.datepicker.formatTime(o.timeFormat, this, o), this.$timeObj && (pickerTimeFormat === o.timeFormat ? this.$timeObj.text(this.formattedTime + pickerTimeSuffix) : this.$timeObj.text($.datepicker.formatTime(pickerTimeFormat, this, o) + pickerTimeSuffix)), this.timeDefined = !0, hasChanged && this._updateDateTime()
                        }
                    },
                    _onSelectHandler: function() {
                        var onSelect = this._defaults.onSelect || this.inst.settings.onSelect,
                            inputEl = this.$input ? this.$input[0] : null;
                        onSelect && inputEl && onSelect.apply(inputEl, [this.formattedDateTime, this])
                    },
                    _updateDateTime: function(dp_inst) {
                        var dtTmp = (dp_inst = this.inst || dp_inst).currentYear > 0 ? new Date(dp_inst.currentYear, dp_inst.currentMonth, dp_inst.currentDay) : new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay),
                            dt = $.datepicker._daylightSavingAdjust(dtTmp),
                            dateFmt = $.datepicker._get(dp_inst, "dateFormat"),
                            formatCfg = $.datepicker._getFormatConfig(dp_inst),
                            timeAvailable = null !== dt && this.timeDefined;
                        this.formattedDate = $.datepicker.formatDate(dateFmt, null === dt ? new Date : dt, formatCfg);
                        var formattedDateTime = this.formattedDate;
                        if ("" === dp_inst.lastVal && (dp_inst.currentYear = dp_inst.selectedYear, dp_inst.currentMonth = dp_inst.selectedMonth, dp_inst.currentDay = dp_inst.selectedDay), !0 === this._defaults.timeOnly && !1 === this._defaults.timeOnlyShowDate ? formattedDateTime = this.formattedTime : (!0 !== this._defaults.timeOnly && (this._defaults.alwaysSetTime || timeAvailable) || !0 === this._defaults.timeOnly && !0 === this._defaults.timeOnlyShowDate) && (formattedDateTime += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix), this.formattedDateTime = formattedDateTime, this._defaults.showTimepicker)
                            if (this.$altInput && !1 === this._defaults.timeOnly && !0 === this._defaults.altFieldTimeOnly) this.$altInput.val(this.formattedTime), this.$input.val(this.formattedDate);
                            else if (this.$altInput) {
                            this.$input.val(formattedDateTime);
                            var altFormattedDateTime = "",
                                altSeparator = null !== this._defaults.altSeparator ? this._defaults.altSeparator : this._defaults.separator,
                                altTimeSuffix = null !== this._defaults.altTimeSuffix ? this._defaults.altTimeSuffix : this._defaults.timeSuffix;
                            this._defaults.timeOnly || (altFormattedDateTime = this._defaults.altFormat ? $.datepicker.formatDate(this._defaults.altFormat, null === dt ? new Date : dt, formatCfg) : this.formattedDate) && (altFormattedDateTime += altSeparator), null !== this._defaults.altTimeFormat ? altFormattedDateTime += $.datepicker.formatTime(this._defaults.altTimeFormat, this, this._defaults) + altTimeSuffix : altFormattedDateTime += this.formattedTime + altTimeSuffix, this.$altInput.val(altFormattedDateTime)
                        } else this.$input.val(formattedDateTime);
                        else this.$input.val(this.formattedDate);
                        this.$input.trigger("change")
                    },
                    _onFocus: function() {
                        if (!this.$input.val() && this._defaults.defaultValue) {
                            this.$input.val(this._defaults.defaultValue);
                            var inst = $.datepicker._getInst(this.$input.get(0)),
                                tp_inst = $.datepicker._get(inst, "timepicker");
                            if (tp_inst && tp_inst._defaults.timeOnly && inst.input.val() !== inst.lastVal) try {
                                $.datepicker._updateDatepicker(inst)
                            } catch (err) {
                                $.timepicker.log(err)
                            }
                        }
                    },
                    _controls: {
                        slider: {
                            create: function(tp_inst, obj, unit, val, min, max, step) {
                                var rtl = tp_inst._defaults.isRTL;
                                return obj.prop("slide", null).slider({
                                    orientation: "horizontal",
                                    value: rtl ? -1 * val : val,
                                    min: rtl ? -1 * max : min,
                                    max: rtl ? -1 * min : max,
                                    step: step,
                                    slide: function(event, ui) {
                                        tp_inst.control.value(tp_inst, $(this), unit, rtl ? -1 * ui.value : ui.value), tp_inst._onTimeChange()
                                    },
                                    stop: function() {
                                        tp_inst._onSelectHandler()
                                    }
                                })
                            },
                            options: function(tp_inst, obj, unit, opts, val) {
                                if (tp_inst._defaults.isRTL) {
                                    if ("string" == typeof opts) return "min" === opts || "max" === opts ? void 0 !== val ? obj.slider(opts, -1 * val) : Math.abs(obj.slider(opts)) : obj.slider(opts);
                                    var min = opts.min,
                                        max = opts.max;
                                    return opts.min = opts.max = null, void 0 !== min && (opts.max = -1 * min), void 0 !== max && (opts.min = -1 * max), obj.slider(opts)
                                }
                                return "string" == typeof opts && void 0 !== val ? obj.slider(opts, val) : obj.slider(opts)
                            },
                            value: function(tp_inst, obj, unit, val) {
                                return tp_inst._defaults.isRTL ? void 0 !== val ? obj.slider("value", -1 * val) : Math.abs(obj.slider("value")) : void 0 !== val ? obj.slider("value", val) : obj.slider("value")
                            }
                        },
                        select: {
                            create: function(tp_inst, obj, unit, val, min, max, step) {
                                for (var sel = '<select class="ui-timepicker-select" data-unit="' + unit + '" data-min="' + min + '" data-max="' + max + '" data-step="' + step + '">', format = tp_inst._defaults.pickerTimeFormat || tp_inst._defaults.timeFormat, i = min; i <= max; i += step) sel += '<option value="' + i + '"' + (i === val ? " selected" : "") + ">", sel += "hour" === unit ? $.datepicker.formatTime($.trim(format.replace(/[^ht ]/gi, "")), {
                                    hour: i
                                }, tp_inst._defaults) : "millisec" === unit || "microsec" === unit || i >= 10 ? i : "0" + i.toString(), sel += "</option>";
                                return sel += "</select>", obj.children("select").remove(), $(sel).appendTo(obj).change((function() {
                                    tp_inst._onTimeChange(), tp_inst._onSelectHandler()
                                })), obj
                            },
                            options: function(tp_inst, obj, unit, opts, val) {
                                var o = {},
                                    $t = obj.children("select");
                                if ("string" == typeof opts) {
                                    if (void 0 === val) return $t.data(opts);
                                    o[opts] = val
                                } else o = opts;
                                return tp_inst.control.create(tp_inst, obj, $t.data("unit"), $t.val(), o.min || $t.data("min"), o.max || $t.data("max"), o.step || $t.data("step"))
                            },
                            value: function(tp_inst, obj, unit, val) {
                                var $t = obj.children("select");
                                return void 0 !== val ? $t.val(val) : $t.val()
                            }
                        }
                    }
                }), $.fn.extend({
                    timepicker: function(o) {
                        o = o || {};
                        var tmp_args = Array.prototype.slice.call(arguments);
                        return "object" == typeof o && (tmp_args[0] = $.extend(o, {
                            timeOnly: !0
                        })), $(this).each((function() {
                            $.fn.datetimepicker.apply($(this), tmp_args)
                        }))
                    },
                    datetimepicker: function(o) {
                        var tmp_args = arguments;
                        return "string" == typeof(o = o || {}) ? "getDate" === o || "option" === o && 2 === tmp_args.length && "string" == typeof tmp_args[1] ? $.fn.datepicker.apply($(this[0]), tmp_args) : this.each((function() {
                            var $t = $(this);
                            $t.datepicker.apply($t, tmp_args)
                        })) : this.each((function() {
                            var $t = $(this);
                            $t.datepicker($.timepicker._newInst($t, o)._defaults)
                        }))
                    }
                }), $.datepicker.parseDateTime = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
                    var parseRes = parseDateTimeInternal(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings);
                    if (parseRes.timeObj) {
                        var t = parseRes.timeObj;
                        parseRes.date.setHours(t.hour, t.minute, t.second, t.millisec), parseRes.date.setMicroseconds(t.microsec)
                    }
                    return parseRes.date
                }, $.datepicker.parseTime = function(timeFormat, timeString, options) {
                    var o = extendRemove(extendRemove({}, $.timepicker._defaults), options || {}),
                        strictParse = (timeFormat.replace(/\'.*?\'/g, "").indexOf("Z"), function(f, s, o) {
                            var treg, getPatternAmpm = function(amNames, pmNames) {
                                    var markers = [];
                                    return amNames && $.merge(markers, amNames), pmNames && $.merge(markers, pmNames), "(" + (markers = $.map(markers, (function(val) {
                                        return val.replace(/[.*+?|()\[\]{}\\]/g, "\\$&")
                                    }))).join("|") + ")?"
                                },
                                getFormatPositions = function(timeFormat) {
                                    var finds = timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g),
                                        orders = {
                                            h: -1,
                                            m: -1,
                                            s: -1,
                                            l: -1,
                                            c: -1,
                                            t: -1,
                                            z: -1
                                        };
                                    if (finds)
                                        for (var i = 0; i < finds.length; i++) - 1 === orders[finds[i].toString().charAt(0)] && (orders[finds[i].toString().charAt(0)] = i + 1);
                                    return orders
                                },
                                regstr = "^" + f.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, (function(match) {
                                    var ml = match.length;
                                    switch (match.charAt(0).toLowerCase()) {
                                        case "h":
                                        case "m":
                                        case "s":
                                            return 1 === ml ? "(\\d?\\d)" : "(\\d{" + ml + "})";
                                        case "l":
                                        case "c":
                                            return "(\\d?\\d?\\d)";
                                        case "z":
                                            return "(z|[-+]\\d\\d:?\\d\\d|\\S+)?";
                                        case "t":
                                            return getPatternAmpm(o.amNames, o.pmNames);
                                        default:
                                            return "(" + match.replace(/\'/g, "").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g, (function(m) {
                                                return "\\" + m
                                            })) + ")?"
                                    }
                                })).replace(/\s/g, "\\s?") + o.timeSuffix + "$",
                                order = getFormatPositions(f),
                                ampm = "",
                                resTime = {
                                    hour: 0,
                                    minute: 0,
                                    second: 0,
                                    millisec: 0,
                                    microsec: 0
                                };
                            return !!(treg = s.match(new RegExp(regstr, "i"))) && (-1 !== order.t && (void 0 === treg[order.t] || 0 === treg[order.t].length ? (ampm = "", resTime.ampm = "") : (ampm = -1 !== $.inArray(treg[order.t].toUpperCase(), o.amNames) ? "AM" : "PM", resTime.ampm = o["AM" === ampm ? "amNames" : "pmNames"][0])), -1 !== order.h && ("AM" === ampm && "12" === treg[order.h] ? resTime.hour = 0 : "PM" === ampm && "12" !== treg[order.h] ? resTime.hour = parseInt(treg[order.h], 10) + 12 : resTime.hour = Number(treg[order.h])), -1 !== order.m && (resTime.minute = Number(treg[order.m])), -1 !== order.s && (resTime.second = Number(treg[order.s])), -1 !== order.l && (resTime.millisec = Number(treg[order.l])), -1 !== order.c && (resTime.microsec = Number(treg[order.c])), -1 !== order.z && void 0 !== treg[order.z] && (resTime.timezone = $.timepicker.timezoneOffsetNumber(treg[order.z])), resTime)
                        }),
                        looseParse = function(f, s, o) {
                            try {
                                var d = new Date("2012-01-01 " + s);
                                if (isNaN(d.getTime()) && (d = new Date("2012-01-01T" + s), isNaN(d.getTime()) && (d = new Date("01/01/2012 " + s), isNaN(d.getTime())))) throw "Unable to parse time with native Date: " + s;
                                return {
                                    hour: d.getHours(),
                                    minute: d.getMinutes(),
                                    second: d.getSeconds(),
                                    millisec: d.getMilliseconds(),
                                    microsec: d.getMicroseconds(),
                                    timezone: -1 * d.getTimezoneOffset()
                                }
                            } catch (err) {
                                try {
                                    return strictParse(f, s, o)
                                } catch (err2) {
                                    $.timepicker.log("Unable to parse \ntimeString: " + s + "\ntimeFormat: " + f)
                                }
                            }
                            return !1
                        };
                    return "function" == typeof o.parse ? o.parse(timeFormat, timeString, o) : "loose" === o.parse ? looseParse(timeFormat, timeString, o) : strictParse(timeFormat, timeString, o)
                }, $.datepicker.formatTime = function(format, time, options) {
                    options = options || {}, options = $.extend({}, $.timepicker._defaults, options), time = $.extend({
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisec: 0,
                        microsec: 0,
                        timezone: null
                    }, time);
                    var tmptime = format,
                        ampmName = options.amNames[0],
                        hour = parseInt(time.hour, 10);
                    return hour > 11 && (ampmName = options.pmNames[0]), tmptime = tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, (function(match) {
                        switch (match) {
                            case "HH":
                                return ("0" + hour).slice(-2);
                            case "H":
                                return hour;
                            case "hh":
                                return ("0" + convert24to12(hour)).slice(-2);
                            case "h":
                                return convert24to12(hour);
                            case "mm":
                                return ("0" + time.minute).slice(-2);
                            case "m":
                                return time.minute;
                            case "ss":
                                return ("0" + time.second).slice(-2);
                            case "s":
                                return time.second;
                            case "l":
                                return ("00" + time.millisec).slice(-3);
                            case "c":
                                return ("00" + time.microsec).slice(-3);
                            case "z":
                                return $.timepicker.timezoneOffsetString(null === time.timezone ? options.timezone : time.timezone, !1);
                            case "Z":
                                return $.timepicker.timezoneOffsetString(null === time.timezone ? options.timezone : time.timezone, !0);
                            case "T":
                                return ampmName.charAt(0).toUpperCase();
                            case "TT":
                                return ampmName.toUpperCase();
                            case "t":
                                return ampmName.charAt(0).toLowerCase();
                            case "tt":
                                return ampmName.toLowerCase();
                            default:
                                return match.replace(/'/g, "")
                        }
                    }))
                }, $.datepicker._base_selectDate = $.datepicker._selectDate, $.datepicker._selectDate = function(id, dateStr) {
                    var inst = this._getInst($(id)[0]),
                        tp_inst = this._get(inst, "timepicker");
                    tp_inst && inst.settings.showTimepicker ? (tp_inst._limitMinMaxDateTime(inst, !0), inst.inline = inst.stay_open = !0, this._base_selectDate(id, dateStr), inst.inline = inst.stay_open = !1, this._notifyChange(inst), this._updateDatepicker(inst)) : this._base_selectDate(id, dateStr)
                }, $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker, $.datepicker._updateDatepicker = function(inst) {
                    var input = inst.input[0];
                    if (!($.datepicker._curInst && $.datepicker._curInst !== inst && $.datepicker._datepickerShowing && $.datepicker._lastInput !== input || "boolean" == typeof inst.stay_open && !1 !== inst.stay_open)) {
                        this._base_updateDatepicker(inst);
                        var tp_inst = this._get(inst, "timepicker");
                        tp_inst && tp_inst._addTimePicker(inst)
                    }
                }, $.datepicker._base_doKeyPress = $.datepicker._doKeyPress, $.datepicker._doKeyPress = function(event) {
                    var inst = $.datepicker._getInst(event.target),
                        tp_inst = $.datepicker._get(inst, "timepicker");
                    if (tp_inst && $.datepicker._get(inst, "constrainInput")) {
                        var ampm = tp_inst.support.ampm,
                            tz = null !== tp_inst._defaults.showTimezone ? tp_inst._defaults.showTimezone : tp_inst.support.timezone,
                            dateChars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")),
                            datetimeChars = tp_inst._defaults.timeFormat.toString().replace(/[hms]/g, "").replace(/TT/g, ampm ? "APM" : "").replace(/Tt/g, ampm ? "AaPpMm" : "").replace(/tT/g, ampm ? "AaPpMm" : "").replace(/T/g, ampm ? "AP" : "").replace(/tt/g, ampm ? "apm" : "").replace(/t/g, ampm ? "ap" : "") + " " + tp_inst._defaults.separator + tp_inst._defaults.timeSuffix + (tz ? tp_inst._defaults.timezoneList.join("") : "") + tp_inst._defaults.amNames.join("") + tp_inst._defaults.pmNames.join("") + dateChars,
                            chr = String.fromCharCode(void 0 === event.charCode ? event.keyCode : event.charCode);
                        return event.ctrlKey || chr < " " || !dateChars || datetimeChars.indexOf(chr) > -1
                    }
                    return $.datepicker._base_doKeyPress(event)
                }, $.datepicker._base_updateAlternate = $.datepicker._updateAlternate, $.datepicker._updateAlternate = function(inst) {
                    var tp_inst = this._get(inst, "timepicker");
                    if (tp_inst) {
                        var altField = tp_inst._defaults.altField;
                        if (altField) {
                            tp_inst._defaults.altFormat || tp_inst._defaults.dateFormat;
                            var date = this._getDate(inst),
                                formatCfg = $.datepicker._getFormatConfig(inst),
                                altFormattedDateTime = "",
                                altSeparator = tp_inst._defaults.altSeparator ? tp_inst._defaults.altSeparator : tp_inst._defaults.separator,
                                altTimeSuffix = tp_inst._defaults.altTimeSuffix ? tp_inst._defaults.altTimeSuffix : tp_inst._defaults.timeSuffix,
                                altTimeFormat = null !== tp_inst._defaults.altTimeFormat ? tp_inst._defaults.altTimeFormat : tp_inst._defaults.timeFormat;
                            altFormattedDateTime += $.datepicker.formatTime(altTimeFormat, tp_inst, tp_inst._defaults) + altTimeSuffix, tp_inst._defaults.timeOnly || tp_inst._defaults.altFieldTimeOnly || null === date || (altFormattedDateTime = tp_inst._defaults.altFormat ? $.datepicker.formatDate(tp_inst._defaults.altFormat, date, formatCfg) + altSeparator + altFormattedDateTime : tp_inst.formattedDate + altSeparator + altFormattedDateTime), $(altField).val(inst.input.val() ? altFormattedDateTime : "")
                        }
                    } else $.datepicker._base_updateAlternate(inst)
                }, $.datepicker._base_doKeyUp = $.datepicker._doKeyUp, $.datepicker._doKeyUp = function(event) {
                    var inst = $.datepicker._getInst(event.target),
                        tp_inst = $.datepicker._get(inst, "timepicker");
                    if (tp_inst && tp_inst._defaults.timeOnly && inst.input.val() !== inst.lastVal) try {
                        $.datepicker._updateDatepicker(inst)
                    } catch (err) {
                        $.timepicker.log(err)
                    }
                    return $.datepicker._base_doKeyUp(event)
                }, $.datepicker._base_gotoToday = $.datepicker._gotoToday, $.datepicker._gotoToday = function(id) {
                    var inst = this._getInst($(id)[0]),
                        $dp = inst.dpDiv;
                    this._base_gotoToday(id);
                    var tp_inst = this._get(inst, "timepicker");
                    selectLocalTimezone(tp_inst);
                    var now = new Date;
                    this._setTime(inst, now), $(".ui-datepicker-today", $dp).click()
                }, $.datepicker._disableTimepickerDatepicker = function(target) {
                    var inst = this._getInst(target);
                    if (inst) {
                        var tp_inst = this._get(inst, "timepicker");
                        $(target).datepicker("getDate"), tp_inst && (inst.settings.showTimepicker = !1, tp_inst._defaults.showTimepicker = !1, tp_inst._updateDateTime(inst))
                    }
                }, $.datepicker._enableTimepickerDatepicker = function(target) {
                    var inst = this._getInst(target);
                    if (inst) {
                        var tp_inst = this._get(inst, "timepicker");
                        $(target).datepicker("getDate"), tp_inst && (inst.settings.showTimepicker = !0, tp_inst._defaults.showTimepicker = !0, tp_inst._addTimePicker(inst), tp_inst._updateDateTime(inst))
                    }
                }, $.datepicker._setTime = function(inst, date) {
                    var tp_inst = this._get(inst, "timepicker");
                    if (tp_inst) {
                        var defaults = tp_inst._defaults;
                        tp_inst.hour = date ? date.getHours() : defaults.hour, tp_inst.minute = date ? date.getMinutes() : defaults.minute, tp_inst.second = date ? date.getSeconds() : defaults.second, tp_inst.millisec = date ? date.getMilliseconds() : defaults.millisec, tp_inst.microsec = date ? date.getMicroseconds() : defaults.microsec, tp_inst._limitMinMaxDateTime(inst, !0), tp_inst._onTimeChange(), tp_inst._updateDateTime(inst)
                    }
                }, $.datepicker._setTimeDatepicker = function(target, date, withDate) {
                    var inst = this._getInst(target);
                    if (inst) {
                        var tp_date, tp_inst = this._get(inst, "timepicker");
                        if (tp_inst) this._setDateFromField(inst), date && ("string" == typeof date ? (tp_inst._parseTime(date, withDate), (tp_date = new Date).setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec), tp_date.setMicroseconds(tp_inst.microsec)) : (tp_date = new Date(date.getTime())).setMicroseconds(date.getMicroseconds()), "Invalid Date" === tp_date.toString() && (tp_date = void 0), this._setTime(inst, tp_date))
                    }
                }, $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker, $.datepicker._setDateDatepicker = function(target, _date) {
                    var inst = this._getInst(target),
                        date = _date;
                    if (inst) {
                        "string" == typeof _date && ((date = new Date(_date)).getTime() || (this._base_setDateDatepicker.apply(this, arguments), date = $(target).datepicker("getDate")));
                        var tp_date, tp_inst = this._get(inst, "timepicker");
                        date instanceof Date ? (tp_date = new Date(date.getTime())).setMicroseconds(date.getMicroseconds()) : tp_date = date, tp_inst && tp_date && (tp_inst.support.timezone || null !== tp_inst._defaults.timezone || (tp_inst.timezone = -1 * tp_date.getTimezoneOffset()), date = $.timepicker.timezoneAdjust(date, tp_inst.timezone), tp_date = $.timepicker.timezoneAdjust(tp_date, tp_inst.timezone)), this._updateDatepicker(inst), this._base_setDateDatepicker.apply(this, arguments), this._setTimeDatepicker(target, tp_date, !0)
                    }
                }, $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker, $.datepicker._getDateDatepicker = function(target, noDefault) {
                    var inst = this._getInst(target);
                    if (inst) {
                        var tp_inst = this._get(inst, "timepicker");
                        if (tp_inst) {
                            void 0 === inst.lastVal && this._setDateFromField(inst, noDefault);
                            var date = this._getDate(inst);
                            return date && tp_inst._parseTime($(target).val(), tp_inst.timeOnly) && (date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec), date.setMicroseconds(tp_inst.microsec), null != tp_inst.timezone && (tp_inst.support.timezone || null !== tp_inst._defaults.timezone || (tp_inst.timezone = -1 * date.getTimezoneOffset()), date = $.timepicker.timezoneAdjust(date, tp_inst.timezone))), date
                        }
                        return this._base_getDateDatepicker(target, noDefault)
                    }
                }, $.datepicker._base_parseDate = $.datepicker.parseDate, $.datepicker.parseDate = function(format, value, settings) {
                    var date;
                    try {
                        date = this._base_parseDate(format, value, settings)
                    } catch (err) {
                        if (!(err.indexOf(":") >= 0)) throw err;
                        date = this._base_parseDate(format, value.substring(0, value.length - (err.length - err.indexOf(":") - 2)), settings), $.timepicker.log("Error parsing the date string: " + err + "\ndate string = " + value + "\ndate format = " + format)
                    }
                    return date
                }, $.datepicker._base_formatDate = $.datepicker._formatDate, $.datepicker._formatDate = function(inst) {
                    var tp_inst = this._get(inst, "timepicker");
                    return tp_inst ? (tp_inst._updateDateTime(inst), tp_inst.$input.val()) : this._base_formatDate(inst)
                },
                $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker, $.datepicker._optionDatepicker = function(target, name, value) {
                    var name_clone, inst = this._getInst(target);
                    if (!inst) return null;
                    var tp_inst = this._get(inst, "timepicker");
                    if (tp_inst) {
                        var prop, min = null,
                            max = null,
                            onselect = null,
                            overrides = tp_inst._defaults.evnts,
                            fns = {};
                        if ("string" == typeof name) {
                            if ("minDate" === name || "minDateTime" === name) min = value;
                            else if ("maxDate" === name || "maxDateTime" === name) max = value;
                            else if ("onSelect" === name) onselect = value;
                            else if (overrides.hasOwnProperty(name)) {
                                if (void 0 === value) return overrides[name];
                                fns[name] = value, name_clone = {}
                            }
                        } else if ("object" == typeof name)
                            for (prop in name.minDate ? min = name.minDate : name.minDateTime ? min = name.minDateTime : name.maxDate ? max = name.maxDate : name.maxDateTime && (max = name.maxDateTime), overrides) overrides.hasOwnProperty(prop) && name[prop] && (fns[prop] = name[prop]);
                        for (prop in fns) fns.hasOwnProperty(prop) && (overrides[prop] = fns[prop], name_clone || (name_clone = $.extend({}, name)), delete name_clone[prop]);
                        if (name_clone && isEmptyObject(name_clone)) return;
                        min ? (min = 0 === min ? new Date : new Date(min), tp_inst._defaults.minDate = min, tp_inst._defaults.minDateTime = min) : max ? (max = 0 === max ? new Date : new Date(max), tp_inst._defaults.maxDate = max, tp_inst._defaults.maxDateTime = max) : onselect && (tp_inst._defaults.onSelect = onselect)
                    }
                    return void 0 === value ? this._base_optionDatepicker.call($.datepicker, target, name) : this._base_optionDatepicker.call($.datepicker, target, name_clone || name, value)
                };
            var isEmptyObject = function(obj) {
                    var prop;
                    for (prop in obj)
                        if (obj.hasOwnProperty(prop)) return !1;
                    return !0
                },
                extendRemove = function(target, props) {
                    for (var name in $.extend(target, props), props) null !== props[name] && void 0 !== props[name] || (target[name] = props[name]);
                    return target
                },
                detectSupport = function(timeFormat) {
                    var tf = timeFormat.replace(/'.*?'/g, "").toLowerCase(),
                        isIn = function(f, t) {
                            return -1 !== f.indexOf(t)
                        };
                    return {
                        hour: isIn(tf, "h"),
                        minute: isIn(tf, "m"),
                        second: isIn(tf, "s"),
                        millisec: isIn(tf, "l"),
                        microsec: isIn(tf, "c"),
                        timezone: isIn(tf, "z"),
                        ampm: isIn(tf, "t") && isIn(timeFormat, "h"),
                        iso8601: isIn(timeFormat, "Z")
                    }
                },
                convert24to12 = function(hour) {
                    return 0 === (hour %= 12) && (hour = 12), String(hour)
                },
                computeEffectiveSetting = function(settings, property) {
                    return settings && settings[property] ? settings[property] : $.timepicker._defaults[property]
                },
                splitDateTime = function(dateTimeString, timeSettings) {
                    var separator = computeEffectiveSetting(timeSettings, "separator"),
                        timePartsLen = computeEffectiveSetting(timeSettings, "timeFormat").split(separator).length,
                        allParts = dateTimeString.split(separator),
                        allPartsLen = allParts.length;
                    return allPartsLen > 1 ? {
                        dateString: allParts.splice(0, allPartsLen - timePartsLen).join(separator),
                        timeString: allParts.splice(0, timePartsLen).join(separator)
                    } : {
                        dateString: dateTimeString,
                        timeString: ""
                    }
                },
                parseDateTimeInternal = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
                    var date, parts, parsedTime;
                    if (parts = splitDateTime(dateTimeString, timeSettings), date = $.datepicker._base_parseDate(dateFormat, parts.dateString, dateSettings), "" === parts.timeString) return {
                        date: date
                    };
                    if (!(parsedTime = $.datepicker.parseTime(timeFormat, parts.timeString, timeSettings))) throw "Wrong time format";
                    return {
                        date: date,
                        timeObj: parsedTime
                    }
                },
                selectLocalTimezone = function(tp_inst, date) {
                    if (tp_inst && tp_inst.timezone_select) {
                        var now = date || new Date;
                        tp_inst.timezone_select.val(-now.getTimezoneOffset())
                    }
                };
            $.timepicker = new Timepicker, $.timepicker.timezoneOffsetString = function(tzMinutes, iso8601) {
                if (isNaN(tzMinutes) || tzMinutes > 840 || tzMinutes < -720) return tzMinutes;
                var minutes = tzMinutes % 60,
                    hours = (tzMinutes - minutes) / 60,
                    iso = iso8601 ? ":" : "",
                    tz = (tzMinutes >= 0 ? "+" : "-") + ("0" + Math.abs(hours)).slice(-2) + iso + ("0" + Math.abs(minutes)).slice(-2);
                return "+00:00" === tz ? "Z" : tz
            }, $.timepicker.timezoneOffsetNumber = function(tzString) {
                var normalized = tzString.toString().replace(":", "");
                return "Z" === normalized.toUpperCase() ? 0 : /^(\-|\+)\d{4}$/.test(normalized) ? ("-" === normalized.substr(0, 1) ? -1 : 1) * (60 * parseInt(normalized.substr(1, 2), 10) + parseInt(normalized.substr(3, 2), 10)) : tzString
            }, $.timepicker.timezoneAdjust = function(date, toTimezone) {
                var toTz = $.timepicker.timezoneOffsetNumber(toTimezone);
                return isNaN(toTz) || date.setMinutes(date.getMinutes() + -date.getTimezoneOffset() - toTz), date
            }, $.timepicker.timeRange = function(startTime, endTime, options) {
                return $.timepicker.handleRange("timepicker", startTime, endTime, options)
            }, $.timepicker.datetimeRange = function(startTime, endTime, options) {
                $.timepicker.handleRange("datetimepicker", startTime, endTime, options)
            }, $.timepicker.dateRange = function(startTime, endTime, options) {
                $.timepicker.handleRange("datepicker", startTime, endTime, options)
            }, $.timepicker.handleRange = function(method, startTime, endTime, options) {
                function checkDates(changed, other) {
                    var startdt = startTime[method]("getDate"),
                        enddt = endTime[method]("getDate"),
                        changeddt = changed[method]("getDate");
                    if (null !== startdt) {
                        var minDate = new Date(startdt.getTime()),
                            maxDate = new Date(startdt.getTime());
                        minDate.setMilliseconds(minDate.getMilliseconds() + options.minInterval), maxDate.setMilliseconds(maxDate.getMilliseconds() + options.maxInterval), options.minInterval > 0 && minDate > enddt ? endTime[method]("setDate", minDate) : options.maxInterval > 0 && maxDate < enddt ? endTime[method]("setDate", maxDate) : startdt > enddt && other[method]("setDate", changeddt)
                    }
                }

                function selected(changed, other, option) {
                    if (changed.val()) {
                        var date = changed[method].call(changed, "getDate");
                        null !== date && options.minInterval > 0 && ("minDate" === option && date.setMilliseconds(date.getMilliseconds() + options.minInterval), "maxDate" === option && date.setMilliseconds(date.getMilliseconds() - options.minInterval)), date.getTime && other[method].call(other, "option", option, date)
                    }
                }
                options = $.extend({}, {
                    minInterval: 0,
                    maxInterval: 0,
                    start: {},
                    end: {}
                }, options);
                var timeOnly = !1;
                return "timepicker" === method && (timeOnly = !0, method = "datetimepicker"), $.fn[method].call(startTime, $.extend({
                    timeOnly: timeOnly,
                    onClose: function() {
                        checkDates($(this), endTime)
                    },
                    onSelect: function() {
                        selected($(this), endTime, "minDate")
                    }
                }, options, options.start)), $.fn[method].call(endTime, $.extend({
                    timeOnly: timeOnly,
                    onClose: function() {
                        checkDates($(this), startTime)
                    },
                    onSelect: function() {
                        selected($(this), startTime, "maxDate")
                    }
                }, options, options.end)), checkDates(startTime, endTime), selected(startTime, endTime, "minDate"), selected(endTime, startTime, "maxDate"), $([startTime.get(0), endTime.get(0)])
            }, $.timepicker.log = function(err) {
                window.console && window.console.log(err)
            }, $.timepicker._util = {
                _extendRemove: extendRemove,
                _isEmptyObject: isEmptyObject,
                _convert24to12: convert24to12,
                _detectSupport: detectSupport,
                _selectLocalTimezone: selectLocalTimezone,
                _computeEffectiveSetting: computeEffectiveSetting,
                _splitDateTime: splitDateTime,
                _parseDateTimeInternal: parseDateTimeInternal
            }, Date.prototype.getMicroseconds || (Date.prototype.microseconds = 0, Date.prototype.getMicroseconds = function() {
                return this.microseconds
            }, Date.prototype.setMicroseconds = function(m) {
                return this.setMilliseconds(this.getMilliseconds() + Math.floor(m / 1e3)), this.microseconds = m % 1e3, this
            }), $.timepicker.version = "1.4.5"
        }
    }(jQuery),
    function(c, n) {
        var k = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        c.fn.imagesLoaded = function(l) {
            function m() {
                var b = c(h),
                    a = c(g);
                d && (g.length ? d.reject(e, b, a) : d.resolve(e)), c.isFunction(l) && l.call(f, e, b, a)
            }

            function i(b, a) {
                b.src === k || -1 !== c.inArray(b, j) || (j.push(b), a ? g.push(b) : h.push(b), c.data(b, "imagesLoaded", {
                    isBroken: a,
                    src: b.src
                }), o && d.notifyWith(c(b), [a, e, c(h), c(g)]), e.length === j.length && (setTimeout(m), e.unbind(".imagesLoaded")))
            }
            var f = this,
                d = c.isFunction(c.Deferred) ? c.Deferred() : 0,
                o = c.isFunction(d.notify),
                e = f.find("img").add(f.filter("img")),
                j = [],
                h = [],
                g = [];
            return e.length ? e.bind("load.imagesLoaded error.imagesLoaded", (function(b) {
                i(b.target, "error" === b.type)
            })).each((function(b, a) {
                var e = a.src,
                    d = c.data(a, "imagesLoaded");
                d && d.src === e ? i(a, d.isBroken) : a.complete && a.naturalWidth !== n ? i(a, 0 === a.naturalWidth || 0 === a.naturalHeight) : (a.readyState || a.complete) && (a.src = k, a.src = e)
            })) : m(), d ? d.promise(f) : f
        }
    }(jQuery),
    function($) {
        function refresh() {
            var data = prepareData(this);
            return isNaN(data.datetime) || $(this).text(inWords(data.datetime)), this
        }

        function prepareData(element) {
            if (!(element = $(element)).data("timeago")) {
                element.data("timeago", {
                    datetime: $t.datetime(element)
                });
                var text = $.trim(element.text());
                !(text.length > 0) || $t.isTime(element) && element.attr("title") || element.attr("title", text)
            }
            return element.data("timeago")
        }

        function inWords(date) {
            return $t.inWords(distance(date))
        }

        function distance(date) {
            return (new Date).getTime() - date.getTime()
        }
        $.timeago = function(timestamp) {
            return timestamp instanceof Date ? inWords(timestamp) : inWords("string" == typeof timestamp ? $.timeago.parse(timestamp) : "number" == typeof timestamp ? new Date(timestamp) : $.timeago.datetime(timestamp))
        };
        var $t = $.timeago;
        $.extend($.timeago, {
            settings: {
                refreshMillis: 6e4,
                allowFuture: !1,
                strings: {
                    prefixAgo: null,
                    prefixFromNow: null,
                    suffixAgo: "ago",
                    suffixFromNow: "from now",
                    seconds: "less than a minute",
                    minute: "about a minute",
                    minutes: "%d minutes",
                    hour: "about an hour",
                    hours: "about %d hours",
                    day: "a day",
                    days: "%d days",
                    month: "about a month",
                    months: "%d months",
                    year: "about a year",
                    years: "%d years",
                    wordSeparator: " ",
                    numbers: []
                }
            },
            inWords: function(distanceMillis) {
                function substitute(stringOrFunction, number) {
                    var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction,
                        value = $l.numbers && $l.numbers[number] || number;
                    return string.replace(/%d/i, value)
                }
                var $l = this.settings.strings,
                    prefix = $l.prefixAgo,
                    suffix = $l.suffixAgo;
                this.settings.allowFuture && distanceMillis < 0 && (prefix = $l.prefixFromNow, suffix = $l.suffixFromNow);
                var seconds = Math.abs(distanceMillis) / 1e3,
                    minutes = seconds / 60,
                    hours = minutes / 60,
                    days = hours / 24,
                    years = days / 365,
                    words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) || seconds < 90 && substitute($l.minute, 1) || minutes < 45 && substitute($l.minutes, Math.round(minutes)) || minutes < 90 && substitute($l.hour, 1) || hours < 24 && substitute($l.hours, Math.round(hours)) || hours < 42 && substitute($l.day, 1) || days < 30 && substitute($l.days, Math.round(days)) || days < 45 && substitute($l.month, 1) || days < 365 && substitute($l.months, Math.round(days / 30)) || years < 1.5 && substitute($l.year, 1) || substitute($l.years, Math.round(years)),
                    separator = void 0 === $l.wordSeparator ? " " : $l.wordSeparator;
                return $.trim([prefix, words, suffix].join(separator))
            },
            parse: function(iso8601) {
                var s = $.trim(iso8601);
                return s = (s = (s = (s = s.replace(/\.\d\d\d+/, "")).replace(/-/, "/").replace(/-/, "/")).replace(/T/, " ").replace(/Z/, " UTC")).replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(s)
            },
            datetime: function(elem) {
                var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
                return $t.parse(iso8601)
            },
            isTime: function(elem) {
                return "time" === $(elem).get(0).tagName.toLowerCase()
            }
        }), $.fn.timeago = function() {
            var self = this;
            self.each(refresh);
            var $s = $t.settings;
            return $s.refreshMillis > 0 && setInterval((function() {
                self.each(refresh)
            }), $s.refreshMillis), self
        }, document.createElement("abbr"), document.createElement("time")
    }(jQuery),
    function(f) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], f) : "undefined" != typeof module && module.exports ? module.exports = f(require("jquery")) : f(jQuery)
    }((function($) {
        "use strict";

        function n(a) {
            return !a.nodeName || -1 !== $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
        }

        function h(a) {
            return $.isFunction(a) || $.isPlainObject(a) ? a : {
                top: a,
                left: a
            }
        }
        var p = $.scrollTo = function(a, d, b) {
            return $(window).scrollTo(a, d, b)
        };
        return p.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        }, $.fn.scrollTo = function(a, d, b) {
            "object" == typeof d && (b = d, d = 0), "function" == typeof b && (b = {
                onAfter: b
            }), "max" === a && (a = 9e9), b = $.extend({}, p.defaults, b), d = d || b.duration;
            var u = b.queue && 1 < b.axis.length;
            return u && (d /= 2), b.offset = h(b.offset), b.over = h(b.over), this.each((function() {
                function k(a) {
                    var k = $.extend({}, b, {
                        queue: !0,
                        duration: d,
                        complete: a && function() {
                            a.call(q, e, b)
                        }
                    });
                    r.animate(f, k)
                }
                if (null !== a) {
                    var t, l = n(this),
                        q = l ? this.contentWindow || window : this,
                        r = $(q),
                        e = a,
                        f = {};
                    switch (typeof e) {
                        case "number":
                        case "string":
                            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) {
                                e = h(e);
                                break
                            }
                            e = l ? $(e) : $(e, q);
                        case "object":
                            if (0 === e.length) return;
                            (e.is || e.style) && (t = (e = $(e)).offset())
                    }
                    var v = $.isFunction(b.offset) && b.offset(q, e) || b.offset;
                    $.each(b.axis.split(""), (function(a, c) {
                        var d = "x" === c ? "Left" : "Top",
                            m = d.toLowerCase(),
                            g = "scroll" + d,
                            h = r[g](),
                            n = p.max(q, c);
                        t ? (f[g] = t[m] + (l ? 0 : h - r.offset()[m]), b.margin && (f[g] -= parseInt(e.css("margin" + d), 10) || 0, f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0), f[g] += v[m] || 0, b.over[m] && (f[g] += e["x" === c ? "width" : "height"]() * b.over[m])) : (d = e[m], f[g] = d.slice && "%" === d.slice(-1) ? parseFloat(d) / 100 * n : d), b.limit && /^\d+$/.test(f[g]) && (f[g] = 0 >= f[g] ? 0 : Math.min(f[g], n)), !a && 1 < b.axis.length && (h === f[g] ? f = {} : u && (k(b.onAfterFirst), f = {}))
                    })), k(b.onAfter)
                }
            }))
        }, p.max = function(a, d) {
            var h = "scroll" + (b = "x" === d ? "Width" : "Height");
            if (!n(a)) return a[h] - $(a)[b.toLowerCase()]();
            var b = "client" + b,
                l = (k = a.ownerDocument || a.document).documentElement,
                k = k.body;
            return Math.max(l[h], k[h]) - Math.min(l[b], k[b])
        }, $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
            get: function(a) {
                return $(a.elem)[a.prop]()
            },
            set: function(a) {
                var d = this.get(a);
                if (a.options.interrupt && a._last && a._last !== d) return $(a.elem).stop();
                var b = Math.round(a.now);
                d !== b && ($(a.elem)[a.prop](b), a._last = this.get(a))
            }
        }, p
    })), jQuery.extend({
        __stringPrototype: {
            JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
            ScriptFragment: "<script[^>]*>([\\S\\s]*?)</script>",
            specialChar: {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                "\\": "\\\\"
            },
            blank: function(s) {
                return /^\s*$/.test(this.s(s) || " ")
            },
            camelize: function(s) {
                var i, a = this.s(s).split("-");
                for (s = [a[0]], i = 1; i < a.length; i++) s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));
                return s = s.join(""), this.r(arguments, 0, s)
            },
            capitalize: function(s) {
                return s = (s = this.s(s)).charAt(0).toUpperCase() + s.substring(1).toLowerCase(), this.r(arguments, 0, s)
            },
            dasherize: function(s) {
                return s = this.s(s).split("_").join("-"), this.r(arguments, 0, s)
            },
            empty: function(s) {
                return "" === this.s(s)
            },
            endsWith: function(pattern, s) {
                var d = (s = this.s(s)).length - pattern.length;
                return d >= 0 && s.lastIndexOf(pattern) === d
            },
            escapeHTML: function(s) {
                return s = this.s(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), this.r(arguments, 0, s)
            },
            evalJSON: function(sanitize, s) {
                s = this.s(s);
                var json = this.unfilterJSON(!1, s);
                try {
                    if (!sanitize || this.isJSON(json)) return eval("(" + json + ")")
                } catch (e) {}
                throw new SyntaxError("Badly formed JSON string: " + s)
            },
            evalScripts: function(s) {
                var scriptTags = this.extractScripts(this.s(s)),
                    results = [];
                if (scriptTags.length > 0)
                    for (var i = 0; i < scriptTags.length; i++) results.push(eval(scriptTags[i]));
                return results
            },
            extractScripts: function(s) {
                var matchAll = new RegExp(this.ScriptFragment, "img"),
                    matchOne = new RegExp(this.ScriptFragment, "im"),
                    scriptMatches = this.s(s).match(matchAll) || [],
                    scriptTags = [];
                if (scriptMatches.length > 0)
                    for (var i = 0; i < scriptMatches.length; i++) scriptTags.push(scriptMatches[i].match(matchOne)[1] || "");
                return scriptTags
            },
            gsub: function(pattern, replacement, s) {
                return s = this.s(s), s = jQuery.isFunction(replacement) ? this.sub(pattern, replacement, -1, s) : s.split(pattern).join(replacement), this.r(arguments, 2, s)
            },
            include: function(pattern, s) {
                return this.s(s).indexOf(pattern) > -1
            },
            inspect: function(useDoubleQuotes, s) {
                var escapedString;
                s = this.s(s);
                try {
                    escapedString = this.sub(/[\x00-\x1f\\]/, (function(match) {
                        var character = jQuery.__stringPrototype.specialChar[match[0]];
                        return character || "\\u00" + match[0].charCodeAt().toPaddedString(2, 16)
                    }), -1, s)
                } catch (e) {
                    escapedString = s
                }
                return s = useDoubleQuotes ? '"' + escapedString.replace(/"/g, '\\"') + '"' : "'" + escapedString.replace(/'/g, "\\'") + "'", this.r(arguments, 1, s)
            },
            interpolate: function(obj, pattern, s) {
                s = this.s(s), pattern || (pattern = /(\#\{\s*(\w+)\s*\})/);
                var i, gpattern = new RegExp(pattern.source, "g"),
                    matches = s.match(gpattern);
                for (i = 0; i < matches.length; i++) s = s.replace(matches[i], obj[matches[i].match(pattern)[2]]);
                return this.r(arguments, 2, s)
            },
            isJSON: function(s) {
                return s = this.s(s), !this.blank(s) && (s = s.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, ""), /^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(s))
            },
            scan: function(pattern, replacement, s) {
                return s = this.s(s), this.sub(pattern, replacement, -1, s), this.r(arguments, 2, s)
            },
            startsWith: function(pattern, s) {
                return 0 === this.s(s).indexOf(pattern)
            },
            strip: function(s) {
                return s = jQuery.trim(this.s(s)), this.r(arguments, 0, s)
            },
            stripScripts: function(s) {
                return s = this.s(s).replace(new RegExp(this.ScriptFragment, "img"), ""), this.r(arguments, 0, s)
            },
            stripTags: function(s) {
                return s = this.s(s).replace(/<\/?[^>]+>/gi, ""), this.r(arguments, 0, s)
            },
            sub: function(pattern, replacement, count, s) {
                if (s = this.s(s), pattern.source && !pattern.global) {
                    var patternMods = pattern.ignoreCase ? "ig" : "g";
                    patternMods += pattern.multiline ? "m" : "", pattern = new RegExp(pattern.source, patternMods)
                }
                var sarray = s.split(pattern),
                    matches = s.match(pattern);
                count = count < 0 ? sarray.length - 1 : count || 1, s = sarray[0];
                for (var i = 1; i < sarray.length; i++) i <= count ? jQuery.isFunction(replacement) ? s += replacement(matches[i - 1] || matches) + sarray[i] : s += replacement + sarray[i] : s += (matches[i - 1] || matches) + sarray[i];
                return this.r(arguments, 3, s)
            },
            succ: function(s) {
                return s = (s = this.s(s)).slice(0, s.length - 1) + String.fromCharCode(s.charCodeAt(s.length - 1) + 1), this.r(arguments, 0, s)
            },
            times: function(count, s) {
                s = this.s(s);
                for (var newS = "", i = 0; i < count; i++) newS += s;
                return this.r(arguments, 1, newS)
            },
            toJSON: function(s) {
                return this.r(arguments, 0, this.inspect(!0, this.s(s)))
            },
            toQueryParams: function(separator, s) {
                var i, key, value, pair, paramsList = (s = this.s(s)).substring(s.indexOf("?") + 1).split("#")[0].split(separator || "&"),
                    params = {};
                for (i = 0; i < paramsList.length; i++) pair = paramsList[i].split("="), key = decodeURIComponent(pair[0]), value = pair[1] ? decodeURIComponent(pair[1]) : void 0, params[key] ? ("string" == typeof params[key] && (params[key] = [params[key]]), params[key].push(value)) : params[key] = value;
                return params
            },
            truncate: function(length, truncation, s) {
                return length = length || 30, truncation = truncation || "...", s = (s = this.s(s)).length > length ? s.slice(0, length - truncation.length) + truncation : String(s), this.r(arguments, 2, s)
            },
            underscore: function(s) {
                return "_" == (s = this.sub(/[A-Z]/, (function(c) {
                    return "_" + c.toLowerCase()
                }), -1, this.s(s))).charAt(0) && (s = s.substring(1)), this.r(arguments, 0, s)
            },
            unescapeHTML: function(s) {
                return s = this.stripTags(this.s(s)).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), this.r(arguments, 0, s)
            },
            unfilterJSON: function(filter, s) {
                s = this.s(s), filter = filter || this.JSONFilter;
                var filtered = s.match(filter);
                return s = null !== filtered ? filtered[1] : s, this.r(arguments, 1, jQuery.trim(s))
            },
            r: function(args, size, s) {
                return args.length > size || void 0 === this.str ? s : (this.str = "" + s, this)
            },
            s: function(s) {
                return "" === s || s ? s : "" === this.str || this.str ? this.str : this
            }
        },
        string: function(str) {
            if (str !== String.prototype) return jQuery.extend({
                str: str
            }, jQuery.__stringPrototype);
            jQuery.extend(String.prototype, jQuery.__stringPrototype)
        }
    }), jQuery.__stringPrototype.parseQuery = jQuery.__stringPrototype.toQueryParams,
    function(Fa, T, k) {
        var S = function(h) {
            function X(a) {
                var b, c, d = {};
                h.each(a, (function(e) {
                    (b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ") && (c = e.replace(b[0], b[2].toLowerCase()), d[c] = e, "o" === b[1] && X(a[e]))
                })), a._hungarianMap = d
            }

            function I(a, b, c) {
                var d;
                a._hungarianMap || X(a), h.each(b, (function(e) {
                    (d = a._hungarianMap[e]) === k || !c && b[d] !== k || ("o" === d.charAt(0) ? (b[d] || (b[d] = {}), h.extend(!0, b[d], b[e]), I(a[d], b[d], c)) : b[d] = b[e])
                }))
            }

            function S(a) {
                var b = m.defaults.oLanguage,
                    c = a.sZeroRecords;
                !a.sEmptyTable && c && "No data available in table" === b.sEmptyTable && F(a, a, "sZeroRecords", "sEmptyTable"), !a.sLoadingRecords && c && "Loading..." === b.sLoadingRecords && F(a, a, "sZeroRecords", "sLoadingRecords"), a.sInfoThousands && (a.sThousands = a.sInfoThousands), (a = a.sDecimal) && cb(a)
            }

            function db(a) {
                if (A(a, "ordering", "bSort"), A(a, "orderMulti", "bSortMulti"), A(a, "orderClasses", "bSortClasses"), A(a, "orderCellsTop", "bSortCellsTop"), A(a, "order", "aaSorting"), A(a, "orderFixed", "aaSortingFixed"), A(a, "paging", "bPaginate"), A(a, "pagingType", "sPaginationType"), A(a, "pageLength", "iDisplayLength"), A(a, "searching", "bFilter"), "boolean" == typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" : ""), a = a.aoSearchCols)
                    for (var b = 0, c = a.length; b < c; b++) a[b] && I(m.models.oSearch, a[b])
            }

            function eb(a) {
                A(a, "orderable", "bSortable"), A(a, "orderData", "aDataSort"), A(a, "orderSequence", "asSorting"), A(a, "orderDataType", "sortDataType");
                var b = a.aDataSort;
                b && !h.isArray(b) && (a.aDataSort = [b])
            }

            function fb(a) {
                if (!m.__browser) {
                    var b = {};
                    m.__browser = b;
                    var c = h("<div/>").css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            height: 1,
                            width: 1,
                            overflow: "hidden"
                        }).append(h("<div/>").css({
                            position: "absolute",
                            top: 1,
                            left: 1,
                            width: 100,
                            overflow: "scroll"
                        }).append(h("<div/>").css({
                            width: "100%",
                            height: 10
                        }))).appendTo("body"),
                        d = c.children(),
                        e = d.children();
                    b.barWidth = d[0].offsetWidth - d[0].clientWidth, b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth, b.bScrollbarLeft = 1 !== Math.round(e.offset().left), b.bBounding = !!c[0].getBoundingClientRect().width, c.remove()
                }
                h.extend(a.oBrowser, m.__browser), a.oScroll.iBarWidth = m.__browser.barWidth
            }

            function gb(a, b, c, d, e, f) {
                var g, i = !1;
                for (c !== k && (g = c, i = !0); d !== e;) a.hasOwnProperty(d) && (g = i ? b(g, a[d], d, a) : a[d], i = !0, d += f);
                return g
            }

            function Ga(a, b) {
                var c = m.defaults.column,
                    d = a.aoColumns.length;
                c = h.extend({}, m.models.oColumn, c, {
                    nTh: b || T.createElement("th"),
                    sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
                    aDataSort: c.aDataSort ? c.aDataSort : [d],
                    mData: c.mData ? c.mData : d,
                    idx: d
                });
                a.aoColumns.push(c), (c = a.aoPreSearchCols)[d] = h.extend({}, m.models.oSearch, c[d]), la(a, d, h(b).data())
            }

            function la(a, b, c) {
                b = a.aoColumns[b];
                var d = a.oClasses,
                    e = h(b.nTh);
                if (!b.sWidthOrig) {
                    b.sWidthOrig = e.attr("width") || null;
                    var f = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
                    f && (b.sWidthOrig = f[1])
                }
                c !== k && null !== c && (eb(c), I(m.defaults.column, c), c.mDataProp !== k && !c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), h.extend(b, c), F(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== k && (b.aDataSort = [c.iDataSort]), F(b, c, "aDataSort"));
                var g = b.mData,
                    i = P(g),
                    j = b.mRender ? P(b.mRender) : null;
                c = function(a) {
                    return "string" == typeof a && -1 !== a.indexOf("@")
                };
                b._bAttrSrc = h.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter)), b.fnGetData = function(a, b, c) {
                    var d = i(a, b, k, c);
                    return j && b ? j(d, b, a, c) : d
                }, b.fnSetData = function(a, b, c) {
                    return Q(g)(a, b, c)
                }, "number" != typeof g && (a._rowReadObject = !0), a.oFeatures.bSort || (b.bSortable = !1, e.addClass(d.sSortableNone)), a = -1 !== h.inArray("asc", b.asSorting), c = -1 !== h.inArray("desc", b.asSorting), b.bSortable && (a || c) ? a && !c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI = d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI) : (b.sSortingClass = d.sSortableNone, b.sSortingClassJUI = "")
            }

            function Y(a) {
                if (!1 !== a.oFeatures.bAutoWidth) {
                    var b = a.aoColumns;
                    Ha(a);
                    for (var c = 0, d = b.length; c < d; c++) b[c].nTh.style.width = b[c].sWidth
                }("" !== (b = a.oScroll).sY || "" !== b.sX) && Z(a), w(a, null, "column-sizing", [a])
            }

            function $(a, b) {
                var c = aa(a, "bVisible");
                return "number" == typeof c[b] ? c[b] : null
            }

            function ba(a, b) {
                var c = aa(a, "bVisible");
                return -1 !== (c = h.inArray(b, c)) ? c : null
            }

            function ca(a) {
                return aa(a, "bVisible").length
            }

            function aa(a, b) {
                var c = [];
                return h.map(a.aoColumns, (function(a, e) {
                    a[b] && c.push(e)
                })), c
            }

            function Ia(a) {
                var e, f, g, i, j, h, l, r, q, b = a.aoColumns,
                    c = a.aoData,
                    d = m.ext.type.detect;
                for (e = 0, f = b.length; e < f; e++)
                    if (q = [], !(l = b[e]).sType && l._sManualType) l.sType = l._sManualType;
                    else if (!l.sType) {
                    for (g = 0, i = d.length; g < i; g++) {
                        for (j = 0, h = c.length; j < h && (q[j] === k && (q[j] = B(a, j, e, "type")), (r = d[g](q[j], a)) || g === d.length - 1) && "html" !== r; j++);
                        if (r) {
                            l.sType = r;
                            break
                        }
                    }
                    l.sType || (l.sType = "string")
                }
            }

            function hb(a, b, c, d) {
                var e, f, g, i, j, n, l = a.aoColumns;
                if (b)
                    for (e = b.length - 1; 0 <= e; e--) {
                        var r = (n = b[e]).targets !== k ? n.targets : n.aTargets;
                        for (h.isArray(r) || (r = [r]), f = 0, g = r.length; f < g; f++)
                            if ("number" == typeof r[f] && 0 <= r[f]) {
                                for (; l.length <= r[f];) Ga(a);
                                d(r[f], n)
                            } else if ("number" == typeof r[f] && 0 > r[f]) d(l.length + r[f], n);
                        else if ("string" == typeof r[f])
                            for (i = 0, j = l.length; i < j; i++)("_all" == r[f] || h(l[i].nTh).hasClass(r[f])) && d(i, n)
                    }
                if (c)
                    for (e = 0, a = c.length; e < a; e++) d(e, c[e])
            }

            function L(a, b, c, d) {
                var e = a.aoData.length,
                    f = h.extend(!0, {}, m.models.oRow, {
                        src: c ? "dom" : "data",
                        idx: e
                    });
                f._aData = b, a.aoData.push(f);
                for (var g = a.aoColumns, i = 0, j = g.length; i < j; i++) g[i].sType = null;
                return a.aiDisplayMaster.push(e), (b = a.rowIdFn(b)) !== k && (a.aIds[b] = f), (c || !a.oFeatures.bDeferRender) && Ja(a, e, c, d), e
            }

            function ma(a, b) {
                var c;
                return b instanceof h || (b = h(b)), b.map((function(b, e) {
                    return c = Ka(a, e), L(a, c.data, e, c.cells)
                }))
            }

            function B(a, b, c, d) {
                var e = a.iDraw,
                    f = a.aoColumns[c],
                    g = a.aoData[b]._aData,
                    i = f.sDefaultContent;
                if ((c = f.fnGetData(g, d, {
                        settings: a,
                        row: b,
                        col: c
                    })) === k) return a.iDrawError != e && null === i && (J(a, 0, "Requested unknown parameter " + ("function" == typeof f.mData ? "{function}" : "'" + f.mData + "'") + " for row " + b, 4), a.iDrawError = e), i;
                if (c !== g && null !== c || null === i) {
                    if ("function" == typeof c) return c.call(g)
                } else c = i;
                return null === c && "display" == d ? "" : c
            }

            function ib(a, b, c, d) {
                a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, {
                    settings: a,
                    row: b,
                    col: c
                })
            }

            function La(a) {
                return h.map(a.match(/(\\.|[^\.])+/g) || [""], (function(a) {
                    return a.replace(/\\./g, ".")
                }))
            }

            function P(a) {
                if (h.isPlainObject(a)) {
                    var b = {};
                    return h.each(a, (function(a, c) {
                            c && (b[a] = P(c))
                        })),
                        function(a, c, f, g) {
                            var i = b[c] || b._;
                            return i !== k ? i(a, c, f, g) : a
                        }
                }
                if (null === a) return function(a) {
                    return a
                };
                if ("function" == typeof a) return function(b, c, f, g) {
                    return a(b, c, f, g)
                };
                if ("string" == typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
                    var c = function(a, b, f) {
                        var g, i;
                        if ("" !== f)
                            for (var j = 0, n = (i = La(f)).length; j < n; j++) {
                                if (f = i[j].match(da), g = i[j].match(U), f) {
                                    if (i[j] = i[j].replace(da, ""), "" !== i[j] && (a = a[i[j]]), g = [], i.splice(0, j + 1), i = i.join("."), h.isArray(a))
                                        for (j = 0, n = a.length; j < n; j++) g.push(c(a[j], b, i));
                                    a = "" === (a = f[0].substring(1, f[0].length - 1)) ? g : g.join(a);
                                    break
                                }
                                if (g) i[j] = i[j].replace(U, ""), a = a[i[j]]();
                                else {
                                    if (null === a || a[i[j]] === k) return k;
                                    a = a[i[j]]
                                }
                            }
                        return a
                    };
                    return function(b, e) {
                        return c(b, e, a)
                    }
                }
                return function(b) {
                    return b[a]
                }
            }

            function Q(a) {
                if (h.isPlainObject(a)) return Q(a._);
                if (null === a) return function() {};
                if ("function" == typeof a) return function(b, d, e) {
                    a(b, "set", d, e)
                };
                if ("string" == typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
                    var b = function(a, d, e) {
                        var f;
                        f = (e = La(e))[e.length - 1];
                        for (var g, i, j = 0, n = e.length - 1; j < n; j++) {
                            if (g = e[j].match(da), i = e[j].match(U), g) {
                                if (e[j] = e[j].replace(da, ""), a[e[j]] = [], (f = e.slice()).splice(0, j + 1), g = f.join("."), h.isArray(d))
                                    for (i = 0, n = d.length; i < n; i++) b(f = {}, d[i], g), a[e[j]].push(f);
                                else a[e[j]] = d;
                                return
                            }
                            i && (e[j] = e[j].replace(U, ""), a = a[e[j]](d)), null !== a[e[j]] && a[e[j]] !== k || (a[e[j]] = {}), a = a[e[j]]
                        }
                        f.match(U) ? a[f.replace(U, "")](d) : a[f.replace(da, "")] = d
                    };
                    return function(c, d) {
                        return b(c, d, a)
                    }
                }
                return function(b, d) {
                    b[a] = d
                }
            }

            function Ma(a) {
                return D(a.aoData, "_aData")
            }

            function na(a) {
                a.aoData.length = 0, a.aiDisplayMaster.length = 0, a.aiDisplay.length = 0, a.aIds = {}
            }

            function oa(a, b, c) {
                for (var d = -1, e = 0, f = a.length; e < f; e++) a[e] == b ? d = e : a[e] > b && a[e]--; - 1 != d && c === k && a.splice(d, 1)
            }

            function ea(a, b, c, d) {
                var f, e = a.aoData[b],
                    g = function(c, d) {
                        for (; c.childNodes.length;) c.removeChild(c.firstChild);
                        c.innerHTML = B(a, b, d, "display")
                    };
                if ("dom" !== c && (c && "auto" !== c || "dom" !== e.src)) {
                    var i = e.anCells;
                    if (i)
                        if (d !== k) g(i[d], d);
                        else
                            for (c = 0, f = i.length; c < f; c++) g(i[c], c)
                } else e._aData = Ka(a, e, d, d === k ? k : e._aData).data;
                if (e._aSortData = null, e._aFilterData = null, g = a.aoColumns, d !== k) g[d].sType = null;
                else {
                    for (c = 0, f = g.length; c < f; c++) g[c].sType = null;
                    Na(a, e)
                }
            }

            function Ka(a, b, c, d) {
                var g, i, n, e = [],
                    f = b.firstChild,
                    j = 0,
                    l = a.aoColumns,
                    r = a._rowReadObject,
                    q = (d = d !== k ? d : r ? {} : [], function(a, b) {
                        if ("string" == typeof a) {
                            var c = a.indexOf("@"); - 1 !== c && (c = a.substring(c + 1), Q(a)(d, b.getAttribute(c)))
                        }
                    }),
                    jb = function(a) {
                        c !== k && c !== j || (i = l[j], n = h.trim(a.innerHTML), i && i._bAttrSrc ? (Q(i.mData._)(d, n), q(i.mData.sort, a), q(i.mData.type, a), q(i.mData.filter, a)) : r ? (i._setter || (i._setter = Q(i.mData)), i._setter(d, n)) : d[j] = n), j++
                    };
                if (f)
                    for (; f;) "TD" != (g = f.nodeName.toUpperCase()) && "TH" != g || (jb(f), e.push(f)), f = f.nextSibling;
                else {
                    g = 0;
                    for (var o = (e = b.anCells).length; g < o; g++) jb(e[g])
                }
                return (b = f ? b : b.nTr) && (b = b.getAttribute("id")) && Q(a.rowId)(d, b), {
                    data: d,
                    cells: e
                }
            }

            function Ja(a, b, c, d) {
                var i, j, h, l, r, e = a.aoData[b],
                    f = e._aData,
                    g = [];
                if (null === e.nTr) {
                    for (i = c || T.createElement("tr"), e.nTr = i, e.anCells = g, i._DT_RowIndex = b, Na(a, e), l = 0, r = a.aoColumns.length; l < r; l++) h = a.aoColumns[l], j = c ? d[l] : T.createElement(h.sCellType), g.push(j), c && !h.mRender && h.mData === l || (j.innerHTML = B(a, b, l, "display")), h.sClass && (j.className += " " + h.sClass), h.bVisible && !c ? i.appendChild(j) : !h.bVisible && c && j.parentNode.removeChild(j), h.fnCreatedCell && h.fnCreatedCell.call(a.oInstance, j, B(a, b, l), f, b, l);
                    w(a, "aoRowCreatedCallback", null, [i, f, b])
                }
                e.nTr.setAttribute("role", "row")
            }

            function Na(a, b) {
                var c = b.nTr,
                    d = b._aData;
                if (c) {
                    var e = a.rowIdFn(d);
                    e && (c.id = e), d.DT_RowClass && (e = d.DT_RowClass.split(" "), b.__rowc = b.__rowc ? pa(b.__rowc.concat(e)) : e, h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass)), d.DT_RowAttr && h(c).attr(d.DT_RowAttr), d.DT_RowData && h(c).data(d.DT_RowData)
                }
            }

            function kb(a) {
                var b, c, d, e, f, g = a.nTHead,
                    i = a.nTFoot,
                    j = 0 === h("th, td", g).length,
                    n = a.oClasses,
                    l = a.aoColumns;
                for (j && (e = h("<tr/>").appendTo(g)), b = 0, c = l.length; b < c; b++) f = l[b], d = h(f.nTh).addClass(f.sClass), j && d.appendTo(e), a.oFeatures.bSort && (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Oa(a, f.nTh, b))), f.sTitle != d[0].innerHTML && d.html(f.sTitle), Pa(a, "header")(a, d, f, n);
                if (j && fa(a.aoHeader, g), h(g).find(">tr").attr("role", "row"), h(g).find(">tr>th, >tr>td").addClass(n.sHeaderTH), h(i).find(">tr>th, >tr>td").addClass(n.sFooterTH), null !== i)
                    for (b = 0, c = (a = a.aoFooter[0]).length; b < c; b++)(f = l[b]).nTf = a[b].cell, f.sClass && h(f.nTf).addClass(f.sClass)
            }

            function ga(a, b, c) {
                var d, e, f, n, g = [],
                    i = [],
                    j = a.aoColumns.length;
                if (b) {
                    for (c === k && (c = !1), d = 0, e = b.length; d < e; d++) {
                        for (g[d] = b[d].slice(), g[d].nTr = b[d].nTr, f = j - 1; 0 <= f; f--) !a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
                        i.push([])
                    }
                    for (d = 0, e = g.length; d < e; d++) {
                        if (a = g[d].nTr)
                            for (; f = a.firstChild;) a.removeChild(f);
                        for (f = 0, b = g[d].length; f < b; f++)
                            if (n = j = 1, i[d][f] === k) {
                                for (a.appendChild(g[d][f].cell), i[d][f] = 1; g[d + j] !== k && g[d][f].cell == g[d + j][f].cell;) i[d + j][f] = 1, j++;
                                for (; g[d][f + n] !== k && g[d][f].cell == g[d][f + n].cell;) {
                                    for (c = 0; c < j; c++) i[d + c][f + n] = 1;
                                    n++
                                }
                                h(g[d][f].cell).attr("rowspan", j).attr("colspan", n)
                            }
                    }
                }
            }

            function M(a) {
                var b = w(a, "aoPreDrawCallback", "preDraw", [a]);
                if (-1 !== h.inArray(!1, b)) C(a, !1);
                else {
                    b = [];
                    var c = 0,
                        d = a.asStripeClasses,
                        e = d.length,
                        f = a.oLanguage,
                        g = a.iInitDisplayStart,
                        i = "ssp" == y(a),
                        j = a.aiDisplay;
                    a.bDrawing = !0, g !== k && -1 !== g && (a._iDisplayStart = i ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart = -1);
                    g = a._iDisplayStart;
                    var n = a.fnDisplayEnd();
                    if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++, C(a, !1);
                    else if (i) {
                        if (!a.bDestroying && !lb(a)) return
                    } else a.iDraw++;
                    if (0 !== j.length)
                        for (f = i ? a.aoData.length : n, i = i ? 0 : g; i < f; i++) {
                            var l = j[i],
                                r = a.aoData[l];
                            if (null === r.nTr && Ja(a, l), l = r.nTr, 0 !== e) {
                                var q = d[c % e];
                                r._sRowStripe != q && (h(l).removeClass(r._sRowStripe).addClass(q), r._sRowStripe = q)
                            }
                            w(a, "aoRowCallback", null, [l, r._aData, c, i]), b.push(l), c++
                        } else c = f.sZeroRecords, 1 == a.iDraw && "ajax" == y(a) ? c = f.sLoadingRecords : f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable), b[0] = h("<tr/>", {
                            class: e ? d[0] : ""
                        }).append(h("<td />", {
                            valign: "top",
                            colSpan: ca(a),
                            class: a.oClasses.sRowEmpty
                        }).html(c))[0];
                    w(a, "aoHeaderCallback", "header", [h(a.nTHead).children("tr")[0], Ma(a), g, n, j]), w(a, "aoFooterCallback", "footer", [h(a.nTFoot).children("tr")[0], Ma(a), g, n, j]), (d = h(a.nTBody)).children().detach(), d.append(h(b)), w(a, "aoDrawCallback", "draw", [a]), a.bSorted = !1, a.bFiltered = !1, a.bDrawing = !1
                }
            }

            function R(a, b) {
                var c = a.oFeatures,
                    d = c.bFilter;
                c.bSort && mb(a), d ? ha(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice(), !0 !== b && (a._iDisplayStart = 0), a._drawHold = b, M(a), a._drawHold = !1
            }

            function nb(a) {
                var b = a.oClasses,
                    c = h(a.nTable),
                    d = (c = h("<div/>").insertBefore(c), a.oFeatures),
                    e = h("<div/>", {
                        id: a.sTableId + "_wrapper",
                        class: b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter)
                    });
                a.nHolding = c[0], a.nTableWrapper = e[0], a.nTableReinsertBefore = a.nTable.nextSibling;
                for (var g, i, j, n, l, r, f = a.sDom.split(""), q = 0; q < f.length; q++) {
                    if (g = null, "<" == (i = f[q])) {
                        if (j = h("<div/>")[0], "'" == (n = f[q + 1]) || '"' == n) {
                            for (l = "", r = 2; f[q + r] != n;) l += f[q + r], r++;
                            "H" == l ? l = b.sJUIHeader : "F" == l && (l = b.sJUIFooter), -1 != l.indexOf(".") ? (n = l.split("."), j.id = n[0].substr(1, n[0].length - 1), j.className = n[1]) : "#" == l.charAt(0) ? j.id = l.substr(1, l.length - 1) : j.className = l, q += r
                        }
                        e.append(j), e = h(j)
                    } else if (">" == i) e = e.parent();
                    else if ("l" == i && d.bPaginate && d.bLengthChange) g = ob(a);
                    else if ("f" == i && d.bFilter) g = pb(a);
                    else if ("r" == i && d.bProcessing) g = qb(a);
                    else if ("t" == i) g = rb(a);
                    else if ("i" == i && d.bInfo) g = sb(a);
                    else if ("p" == i && d.bPaginate) g = tb(a);
                    else if (0 !== m.ext.feature.length)
                        for (r = 0, n = (j = m.ext.feature).length; r < n; r++)
                            if (i == j[r].cFeature) {
                                g = j[r].fnInit(a);
                                break
                            }
                    g && ((j = a.aanFeatures)[i] || (j[i] = []), j[i].push(g), e.append(g))
                }
                c.replaceWith(e), a.nHolding = null
            }

            function fa(a, b) {
                var d, e, f, g, i, j, n, l, r, q, c = h(b).children("tr");
                for (a.splice(0, a.length), f = 0, j = c.length; f < j; f++) a.push([]);
                for (f = 0,
                    j = c.length; f < j; f++)
                    for (e = (d = c[f]).firstChild; e;) {
                        if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase()) {
                            for (l = (l = 1 * e.getAttribute("colspan")) && 0 !== l && 1 !== l ? l : 1, r = (r = 1 * e.getAttribute("rowspan")) && 0 !== r && 1 !== r ? r : 1, g = 0, i = a[f]; i[g];) g++;
                            for (n = g, q = 1 === l, i = 0; i < l; i++)
                                for (g = 0; g < r; g++) a[f + g][n + i] = {
                                    cell: e,
                                    unique: q
                                }, a[f + g].nTr = d
                        }
                        e = e.nextSibling
                    }
            }

            function qa(a, b, c) {
                var d = [];
                c || (c = a.aoHeader, b && fa(c = [], b));
                b = 0;
                for (var e = c.length; b < e; b++)
                    for (var f = 0, g = c[b].length; f < g; f++) !c[b][f].unique || d[f] && a.bSortCellsTop || (d[f] = c[b][f].cell);
                return d
            }

            function ra(a, b, c) {
                if (w(a, "aoServerParams", "serverParams", [b]), b && h.isArray(b)) {
                    var d = {},
                        e = /(.*?)\[\]$/;
                    h.each(b, (function(a, b) {
                        var c = b.name.match(e);
                        c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value
                    })), b = d
                }
                var f, g = a.ajax,
                    i = a.oInstance,
                    j = function(b) {
                        w(a, null, "xhr", [a, b, a.jqXHR]), c(b)
                    };
                if (h.isPlainObject(g) && g.data) {
                    f = g.data;
                    var n = h.isFunction(f) ? f(b, a) : f;
                    b = h.isFunction(f) && n ? n : h.extend(!0, b, n);
                    delete g.data
                }
                n = {
                    data: b,
                    success: function(b) {
                        var c = b.error || b.sError;
                        c && J(a, 0, c), a.json = b, j(b)
                    },
                    dataType: "json",
                    cache: !1,
                    type: a.sServerMethod,
                    error: function(b, c) {
                        var d = w(a, null, "xhr", [a, null, a.jqXHR]); - 1 === h.inArray(!0, d) && ("parsererror" == c ? J(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && J(a, 0, "Ajax error", 7)), C(a, !1)
                    }
                }, a.oAjaxData = b, w(a, null, "preXhr", [a, b]), a.fnServerData ? a.fnServerData.call(i, a.sAjaxSource, h.map(b, (function(a, b) {
                    return {
                        name: b,
                        value: a
                    }
                })), j, a) : a.sAjaxSource || "string" == typeof g ? a.jqXHR = h.ajax(h.extend(n, {
                    url: g || a.sAjaxSource
                })) : h.isFunction(g) ? a.jqXHR = g.call(i, b, j, a) : (a.jqXHR = h.ajax(h.extend(n, g)), g.data = f)
            }

            function lb(a) {
                return !a.bAjaxDataGet || (a.iDraw++, C(a, !0), ra(a, ub(a), (function(b) {
                    vb(a, b)
                })), !1)
            }

            function ub(a) {
                var g, j, n, l, b = a.aoColumns,
                    c = b.length,
                    d = a.oFeatures,
                    e = a.oPreviousSearch,
                    f = a.aoPreSearchCols,
                    i = [],
                    r = V(a);
                g = a._iDisplayStart, j = !1 !== d.bPaginate ? a._iDisplayLength : -1;
                var q = function(a, b) {
                    i.push({
                        name: a,
                        value: b
                    })
                };
                q("sEcho", a.iDraw), q("iColumns", c), q("sColumns", D(b, "sName").join(",")), q("iDisplayStart", g), q("iDisplayLength", j);
                var k = {
                    draw: a.iDraw,
                    columns: [],
                    order: [],
                    start: g,
                    length: j,
                    search: {
                        value: e.sSearch,
                        regex: e.bRegex
                    }
                };
                for (g = 0; g < c; g++) n = b[g], l = f[g], j = "function" == typeof n.mData ? "function" : n.mData, k.columns.push({
                    data: j,
                    name: n.sName,
                    searchable: n.bSearchable,
                    orderable: n.bSortable,
                    search: {
                        value: l.sSearch,
                        regex: l.bRegex
                    }
                }), q("mDataProp_" + g, j), d.bFilter && (q("sSearch_" + g, l.sSearch), q("bRegex_" + g, l.bRegex), q("bSearchable_" + g, n.bSearchable)), d.bSort && q("bSortable_" + g, n.bSortable);
                return d.bFilter && (q("sSearch", e.sSearch), q("bRegex", e.bRegex)), d.bSort && (h.each(r, (function(a, b) {
                    k.order.push({
                        column: b.col,
                        dir: b.dir
                    }), q("iSortCol_" + a, b.col), q("sSortDir_" + a, b.dir)
                })), q("iSortingCols", r.length)), null === (b = m.ext.legacy.ajax) ? a.sAjaxSource ? i : k : b ? i : k
            }

            function vb(a, b) {
                var c = sa(a, b),
                    d = b.sEcho !== k ? b.sEcho : b.draw,
                    e = b.iTotalRecords !== k ? b.iTotalRecords : b.recordsTotal,
                    f = b.iTotalDisplayRecords !== k ? b.iTotalDisplayRecords : b.recordsFiltered;
                if (d) {
                    if (1 * d < a.iDraw) return;
                    a.iDraw = 1 * d
                }
                for (na(a), a._iRecordsTotal = parseInt(e, 10), a._iRecordsDisplay = parseInt(f, 10), d = 0, e = c.length; d < e; d++) L(a, c[d]);
                a.aiDisplay = a.aiDisplayMaster.slice(), a.bAjaxDataGet = !1, M(a), a._bInitComplete || ta(a, b), a.bAjaxDataGet = !0, C(a, !1)
            }

            function sa(a, b) {
                var c = h.isPlainObject(a.ajax) && a.ajax.dataSrc !== k ? a.ajax.dataSrc : a.sAjaxDataProp;
                return "data" === c ? b.aaData || b[c] : "" !== c ? P(c)(b) : b
            }

            function pb(a) {
                var b = a.oClasses,
                    c = a.sTableId,
                    d = a.oLanguage,
                    e = a.oPreviousSearch,
                    f = a.aanFeatures,
                    g = '<input type="search" class="' + b.sFilterInput + '"/>',
                    i = (i = d.sSearch).match(/_INPUT_/) ? i.replace("_INPUT_", g) : i + g,
                    j = (b = h("<div/>", {
                        id: f.f ? null : c + "_filter",
                        class: b.sFilter
                    }).append(h("<label/>").append(i)), f = function() {
                        var b = this.value ? this.value : "";
                        b != e.sSearch && (ha(a, {
                            sSearch: b,
                            bRegex: e.bRegex,
                            bSmart: e.bSmart,
                            bCaseInsensitive: e.bCaseInsensitive
                        }), a._iDisplayStart = 0, M(a))
                    }, g = null !== a.searchDelay ? a.searchDelay : "ssp" === y(a) ? 400 : 0, h("input", b).val(e.sSearch).attr("placeholder", d.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", g ? ua(f, g) : f).bind("keypress.DT", (function(a) {
                        if (13 == a.keyCode) return !1
                    })).attr("aria-controls", c));
                return h(a.nTable).on("search.dt.DT", (function(b, c) {
                    if (a === c) try {
                        j[0] !== T.activeElement && j.val(e.sSearch)
                    } catch (d) {}
                })), b[0]
            }

            function ha(a, b, c) {
                var d = a.oPreviousSearch,
                    e = a.aoPreSearchCols,
                    f = function(a) {
                        d.sSearch = a.sSearch, d.bRegex = a.bRegex, d.bSmart = a.bSmart, d.bCaseInsensitive = a.bCaseInsensitive
                    };
                if (Ia(a), "ssp" != y(a)) {
                    for (wb(a, b.sSearch, c, b.bEscapeRegex !== k ? !b.bEscapeRegex : b.bRegex, b.bSmart, b.bCaseInsensitive), f(b), b = 0; b < e.length; b++) xb(a, e[b].sSearch, b, e[b].bEscapeRegex !== k ? !e[b].bEscapeRegex : e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
                    yb(a)
                } else f(b);
                a.bFiltered = !0, w(a, null, "search", [a])
            }

            function yb(a) {
                for (var d, e, b = m.ext.search, c = a.aiDisplay, f = 0, g = b.length; f < g; f++) {
                    for (var i = [], j = 0, n = c.length; j < n; j++) e = c[j], d = a.aoData[e], b[f](a, d._aFilterData, e, d._aData, j) && i.push(e);
                    c.length = 0, h.merge(c, i)
                }
            }

            function xb(a, b, c, d, e, f) {
                if ("" !== b) {
                    var g = a.aiDisplay;
                    for (d = Qa(b, d, e, f), e = g.length - 1; 0 <= e; e--) b = a.aoData[g[e]]._aFilterData[c], d.test(b) || g.splice(e, 1)
                }
            }

            function wb(a, b, c, d, e, f) {
                var g;
                d = Qa(b, d, e, f), e = a.oPreviousSearch.sSearch, f = a.aiDisplayMaster;
                if (0 !== m.ext.search.length && (c = !0), g = zb(a), 0 >= b.length) a.aiDisplay = f.slice();
                else
                    for ((g || c || e.length > b.length || 0 !== b.indexOf(e) || a.bSorted) && (a.aiDisplay = f.slice()), c = (b = a.aiDisplay).length - 1; 0 <= c; c--) d.test(a.aoData[b[c]]._sFilterRow) || b.splice(c, 1)
            }

            function Qa(a, b, c, d) {
                return a = b ? a : va(a), c && (a = "^(?=.*?" + h.map(a.match(/"[^"]+"|[^ ]+/g) || [""], (function(a) {
                    if ('"' === a.charAt(0)) {
                        var b = a.match(/^"(.*)"$/);
                        a = b ? b[1] : a
                    }
                    return a.replace('"', "")
                })).join(")(?=.*?") + ").*$"), RegExp(a, d ? "i" : "")
            }

            function va(a) {
                return a.replace(Yb, "\\$1")
            }

            function zb(a) {
                var c, d, e, f, g, i, j, h, b = a.aoColumns,
                    l = m.ext.type.search;
                for (c = !1, d = 0, f = a.aoData.length; d < f; d++)
                    if (!(h = a.aoData[d])._aFilterData) {
                        for (i = [], e = 0, g = b.length; e < g; e++)(c = b[e]).bSearchable ? (j = B(a, d, e, "filter"), l[c.sType] && (j = l[c.sType](j)), null === j && (j = ""), "string" != typeof j && j.toString && (j = j.toString())) : j = "", j.indexOf && -1 !== j.indexOf("&") && (wa.innerHTML = j, j = Zb ? wa.textContent : wa.innerText), j.replace && (j = j.replace(/[\r\n]/g, "")), i.push(j);
                        h._aFilterData = i, h._sFilterRow = i.join("  "), c = !0
                    }
                return c
            }

            function Ab(a) {
                return {
                    search: a.sSearch,
                    smart: a.bSmart,
                    regex: a.bRegex,
                    caseInsensitive: a.bCaseInsensitive
                }
            }

            function Bb(a) {
                return {
                    sSearch: a.search,
                    bSmart: a.smart,
                    bRegex: a.regex,
                    bCaseInsensitive: a.caseInsensitive
                }
            }

            function sb(a) {
                var b = a.sTableId,
                    c = a.aanFeatures.i,
                    d = h("<div/>", {
                        class: a.oClasses.sInfo,
                        id: c ? null : b + "_info"
                    });
                return c || (a.aoDrawCallback.push({
                    fn: Cb,
                    sName: "information"
                }), d.attr("role", "status").attr("aria-live", "polite"), h(a.nTable).attr("aria-describedby", b + "_info")), d[0]
            }

            function Cb(a) {
                var b = a.aanFeatures.i;
                if (0 !== b.length) {
                    var c = a.oLanguage,
                        d = a._iDisplayStart + 1,
                        e = a.fnDisplayEnd(),
                        f = a.fnRecordsTotal(),
                        g = a.fnRecordsDisplay(),
                        i = g ? c.sInfo : c.sInfoEmpty;
                    g !== f && (i += " " + c.sInfoFiltered), i = Db(a, i += c.sInfoPostFix), null !== (c = c.fnInfoCallback) && (i = c.call(a.oInstance, a, d, e, f, g, i)), h(b).html(i)
                }
            }

            function Db(a, b) {
                var c = a.fnFormatNumber,
                    d = a._iDisplayStart + 1,
                    e = a._iDisplayLength,
                    f = a.fnRecordsDisplay(),
                    g = -1 === e;
                return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)))
            }

            function ia(a) {
                var b, c, f, d = a.iInitDisplayStart,
                    e = a.aoColumns;
                c = a.oFeatures;
                var g = a.bDeferLoading;
                if (a.bInitialised) {
                    for (nb(a), kb(a), ga(a, a.aoHeader), ga(a, a.aoFooter), C(a, !0), c.bAutoWidth && Ha(a), b = 0, c = e.length; b < c; b++)(f = e[b]).sWidth && (f.nTh.style.width = u(f.sWidth));
                    w(a, null, "preInit", [a]), R(a), ("ssp" != (e = y(a)) || g) && ("ajax" == e ? ra(a, [], (function(c) {
                        var f = sa(a, c);
                        for (b = 0; b < f.length; b++) L(a, f[b]);
                        a.iInitDisplayStart = d, R(a), C(a, !1), ta(a, c)
                    }), a) : (C(a, !1), ta(a)))
                } else setTimeout((function() {
                    ia(a)
                }), 200)
            }

            function ta(a, b) {
                a._bInitComplete = !0, (b || a.oInit.aaData) && Y(a), w(a, "aoInitComplete", "init", [a, b])
            }

            function Ra(a, b) {
                var c = parseInt(b, 10);
                a._iDisplayLength = c, Sa(a), w(a, null, "length", [a, c])
            }

            function ob(a) {
                for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, f = (e = h.isArray(d[0])) ? d[0] : d, e = (d = e ? d[1] : d, h("<select/>", {
                        name: c + "_length",
                        "aria-controls": c,
                        class: b.sLengthSelect
                    })), g = 0, i = f.length; g < i; g++) e[0][g] = new Option(d[g], f[g]);
                var j = h("<div><label/></div>").addClass(b.sLength);
                return a.aanFeatures.l || (j[0].id = c + "_length"), j.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML)), h("select", j).val(a._iDisplayLength).bind("change.DT", (function() {
                    Ra(a, h(this).val()), M(a)
                })), h(a.nTable).bind("length.dt.DT", (function(b, c, d) {
                    a === c && h("select", j).val(d)
                })), j[0]
            }

            function tb(a) {
                var b = a.sPaginationType,
                    c = m.ext.pager[b],
                    d = "function" == typeof c,
                    e = function(a) {
                        M(a)
                    },
                    f = (b = h("<div/>").addClass(a.oClasses.sPaging + b)[0], a.aanFeatures);
                return d || c.fnInit(a, b, e), f.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({
                    fn: function(a) {
                        if (d) {
                            var k, b = a._iDisplayStart,
                                j = a._iDisplayLength,
                                h = a.fnRecordsDisplay(),
                                l = (b = (l = -1 === j) ? 0 : Math.ceil(b / j), j = l ? 1 : Math.ceil(h / j), h = c(b, j), 0);
                            for (k = f.p.length; l < k; l++) Pa(a, "pageButton")(a, f.p[l], l, h, b, j)
                        } else c.fnUpdate(a, e)
                    },
                    sName: "pagination"
                })), b
            }

            function Ta(a, b, c) {
                var d = a._iDisplayStart,
                    e = a._iDisplayLength,
                    f = a.fnRecordsDisplay();
                return 0 === f || -1 === e ? d = 0 : "number" == typeof b ? (d = b * e) > f && (d = 0) : "first" == b ? d = 0 : "previous" == b ? 0 > (d = 0 <= e ? d - e : 0) && (d = 0) : "next" == b ? d + e < f && (d += e) : "last" == b ? d = Math.floor((f - 1) / e) * e : J(a, 0, "Unknown paging action: " + b, 5), b = a._iDisplayStart !== d, a._iDisplayStart = d, b && (w(a, null, "page", [a]), c && M(a)), b
            }

            function qb(a) {
                return h("<div/>", {
                    id: a.aanFeatures.r ? null : a.sTableId + "_processing",
                    class: a.oClasses.sProcessing
                }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]
            }

            function C(a, b) {
                a.oFeatures.bProcessing && h(a.aanFeatures.r).css("display", b ? "block" : "none"), w(a, null, "processing", [a, b])
            }

            function rb(a) {
                (b = h(a.nTable)).attr("role", "grid");
                var c = a.oScroll;
                if ("" === c.sX && "" === c.sY) return a.nTable;
                var d = c.sX,
                    e = c.sY,
                    f = a.oClasses,
                    g = b.children("caption"),
                    i = g.length ? g[0]._captionSide : null,
                    j = h(b[0].cloneNode(!1)),
                    n = h(b[0].cloneNode(!1)),
                    l = b.children("tfoot");
                c.sX && "100%" === b.attr("width") && b.removeAttr("width"), l.length || (l = null), j = h("<div/>", {
                    class: f.sScrollWrapper
                }).append(h("<div/>", {
                    class: f.sScrollHead
                }).css({
                    overflow: "hidden",
                    position: "relative",
                    border: 0,
                    width: d ? d ? u(d) : null : "100%"
                }).append(h("<div/>", {
                    class: f.sScrollHeadInner
                }).css({
                    "box-sizing": "content-box",
                    width: c.sXInner || "100%"
                }).append(j.removeAttr("id").css("margin-left", 0).append("top" === i ? g : null).append(b.children("thead"))))).append(h("<div/>", {
                    class: f.sScrollBody
                }).css({
                    position: "relative",
                    overflow: "auto",
                    width: d ? u(d) : null
                }).append(b)), l && j.append(h("<div/>", {
                    class: f.sScrollFoot
                }).css({
                    overflow: "hidden",
                    border: 0,
                    width: d ? d ? u(d) : null : "100%"
                }).append(h("<div/>", {
                    class: f.sScrollFootInner
                }).append(n.removeAttr("id").css("margin-left", 0).append("bottom" === i ? g : null).append(b.children("tfoot")))));
                var b, k = (b = j.children())[0],
                    q = (f = b[1], l ? b[2] : null);
                return d && h(f).on("scroll.DT", (function() {
                    var a = this.scrollLeft;
                    k.scrollLeft = a, l && (q.scrollLeft = a)
                })), h(f).css(e && c.bCollapse ? "max-height" : "height", e), a.nScrollHead = k, a.nScrollBody = f, a.nScrollFoot = q, a.aoDrawCallback.push({
                    fn: Z,
                    sName: "scrolling"
                }), j[0]
            }

            function Z(a) {
                var s, v, O, x, B, c = (b = a.oScroll).sX,
                    d = b.sXInner,
                    e = b.sY,
                    b = b.iBarWidth,
                    f = h(a.nScrollHead),
                    g = f[0].style,
                    j = (i = f.children("div"))[0].style,
                    n = i.children("table"),
                    i = a.nScrollBody,
                    l = h(i),
                    k = i.style,
                    q = h(a.nScrollFoot).children("div"),
                    m = q.children("table"),
                    o = h(a.nTHead),
                    E = h(a.nTable),
                    p = E[0],
                    t = p.style,
                    N = a.nTFoot ? h(a.nTFoot) : null,
                    Eb = a.oBrowser,
                    w = Eb.bScrollOversize,
                    y = [],
                    z = [],
                    A = [],
                    C = function(a) {
                        (a = a.style).paddingTop = "0", a.paddingBottom = "0", a.borderTopWidth = "0", a.borderBottomWidth = "0", a.height = 0
                    };
                E.children("thead, tfoot").remove(), x = o.clone().prependTo(E), o = o.find("tr"), v = x.find("tr"), x.find("th, td").removeAttr("tabindex"), N && (O = N.clone().prependTo(E), s = N.find("tr"), O = O.find("tr")), c || (k.width = "100%", f[0].style.width = "100%"), h.each(qa(a, x), (function(b, c) {
                    B = $(a, b), c.style.width = a.aoColumns[B].sWidth
                })), N && H((function(a) {
                    a.style.width = ""
                }), O), f = E.outerWidth(), "" === c ? (t.width = "100%", w && (E.find("tbody").height() > i.offsetHeight || "scroll" == l.css("overflow-y")) && (t.width = u(E.outerWidth() - b)), f = E.outerWidth()) : "" !== d && (t.width = u(d), f = E.outerWidth()), H(C, v), H((function(a) {
                    A.push(a.innerHTML), y.push(u(h(a).css("width")))
                }), v), H((function(a, b) {
                    a.style.width = y[b]
                }), o), h(v).height(0), N && (H(C, O), H((function(a) {
                    z.push(u(h(a).css("width")))
                }), O), H((function(a, b) {
                    a.style.width = z[b]
                }), s), h(O).height(0)), H((function(a, b) {
                    a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + A[b] + "</div>", a.style.width = y[b]
                }), v), N && H((function(a, b) {
                    a.innerHTML = "", a.style.width = z[b]
                }), O), E.outerWidth() < f ? (s = i.scrollHeight > i.offsetHeight || "scroll" == l.css("overflow-y") ? f + b : f, w && (i.scrollHeight > i.offsetHeight || "scroll" == l.css("overflow-y")) && (t.width = u(s - b)), ("" === c || "" !== d) && J(a, 1, "Possible column misalignment", 6)) : s = "100%", k.width = u(s), g.width = u(s), N && (a.nScrollFoot.style.width = u(s)), !e && w && (k.height = u(p.offsetHeight + b)), c = E.outerWidth(), n[0].style.width = u(c), j.width = u(c), d = E.height() > i.clientHeight || "scroll" == l.css("overflow-y"), j[e = "padding" + (Eb.bScrollbarLeft ? "Left" : "Right")] = d ? b + "px" : "0px", N && (m[0].style.width = u(c), q[0].style.width = u(c), q[0].style[e] = d ? b + "px" : "0px"), l.scroll(), !a.bSorted && !a.bFiltered || a._drawHold || (i.scrollTop = 0)
            }

            function H(a, b, c) {
                for (var g, i, d = 0, e = 0, f = b.length; e < f;) {
                    for (g = b[e].firstChild, i = c ? c[e].firstChild : null; g;) 1 === g.nodeType && (c ? a(g, i, d) : a(g, d), d++), g = g.nextSibling, i = c ? i.nextSibling : null;
                    e++
                }
            }

            function Ha(a) {
                var m, o, p, b = a.nTable,
                    c = a.aoColumns,
                    d = a.oScroll,
                    e = d.sY,
                    f = d.sX,
                    g = d.sXInner,
                    i = c.length,
                    j = aa(a, "bVisible"),
                    n = h("th", a.nTHead),
                    l = b.getAttribute("width"),
                    k = b.parentNode,
                    q = !1;
                for (d = (p = a.oBrowser).bScrollOversize, (m = b.style.width) && -1 !== m.indexOf("%") && (l = m), m = 0; m < j.length; m++) null !== (o = c[j[m]]).sWidth && (o.sWidth = Fb(o.sWidthOrig, k), q = !0);
                if (d || !q && !f && !e && i == ca(a) && i == n.length)
                    for (m = 0; m < i; m++)(j = $(a, m)) && (c[j].sWidth = u(n.eq(m).width()));
                else {
                    (i = h(b).clone().css("visibility", "hidden").removeAttr("id")).find("tbody tr").remove();
                    var t = h("<tr/>").appendTo(i.find("tbody"));
                    for (i.find("thead, tfoot").remove(), i.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone()), i.find("tfoot th, tfoot td").css("width", ""), n = qa(a, i.find("thead")[0]), m = 0; m < j.length; m++) o = c[j[m]], n[m].style.width = null !== o.sWidthOrig && "" !== o.sWidthOrig ? u(o.sWidthOrig) : "";
                    if (a.aoData.length)
                        for (m = 0; m < j.length; m++) o = c[q = j[m]], h(Gb(a, q)).clone(!1).append(o.sContentPadding).appendTo(t);
                    if (q = h("<div/>").css(f || e ? {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: 1,
                            right: 0,
                            overflow: "hidden"
                        } : {}).append(i).appendTo(k), f && g ? i.width(g) : f ? (i.css("width", "auto"), i.width() < k.clientWidth && i.width(k.clientWidth)) : e ? i.width(k.clientWidth) : l && i.width(l), f) {
                        for (m = g = 0; m < j.length; m++) o = c[j[m]], e = p.bBounding ? n[m].getBoundingClientRect().width : h(n[m]).outerWidth(), g += null === o.sWidthOrig ? e : parseInt(o.sWidth, 10) + e - h(n[m]).width();
                        i.width(u(g)), b.style.width = u(g)
                    }
                    for (m = 0; m < j.length; m++) o = c[j[m]], (p = h(n[m]).width()) && (o.sWidth = u(p));
                    b.style.width = u(i.css("width")), q.remove()
                }
                l && (b.style.width = u(l)), !l && !f || a._reszEvt || (b = function() {
                    h(Fa).bind("resize.DT-" + a.sInstance, ua((function() {
                        Y(a)
                    })))
                }, d ? setTimeout(b, 1e3) : b(), a._reszEvt = !0)
            }

            function ua(a, b) {
                var d, e, c = b !== k ? b : 200;
                return function() {
                    var b = this,
                        g = +new Date,
                        i = arguments;
                    d && g < d + c ? (clearTimeout(e), e = setTimeout((function() {
                        d = k, a.apply(b, i)
                    }), c)) : (d = g, a.apply(b, i))
                }
            }

            function Fb(a, b) {
                if (!a) return 0;
                var c = h("<div/>").css("width", u(a)).appendTo(b || T.body),
                    d = c[0].offsetWidth;
                return c.remove(), d
            }

            function Gb(a, b) {
                var c = Hb(a, b);
                if (0 > c) return null;
                var d = a.aoData[c];
                return d.nTr ? d.anCells[b] : h("<td/>").html(B(a, c, b, "display"))[0]
            }

            function Hb(a, b) {
                for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; f < g; f++)(c = (c = B(a, f, b, "display") + "").replace($b, "")).length > d && (d = c.length, e = f);
                return e
            }

            function u(a) {
                return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a
            }

            function V(a) {
                var b, c, f, g, i, j, d = [],
                    e = a.aoColumns;
                b = a.aaSortingFixed, c = h.isPlainObject(b);
                var n = [];
                for (f = function(a) {
                        a.length && !h.isArray(a[0]) ? n.push(a) : h.merge(n, a)
                    }, h.isArray(b) && f(b), c && b.pre && f(b.pre), f(a.aaSorting), c && b.post && f(b.post), a = 0; a < n.length; a++)
                    for (b = 0, c = (f = e[j = n[a][0]].aDataSort).length; b < c; b++) i = e[g = f[b]].sType || "string", n[a]._idx === k && (n[a]._idx = h.inArray(n[a][1], e[g].asSorting)), d.push({
                        src: j,
                        col: g,
                        dir: n[a][1],
                        index: n[a]._idx,
                        type: i,
                        formatter: m.ext.type.order[i + "-pre"]
                    });
                return d
            }

            function mb(a) {
                var b, c, i, h, d = [],
                    e = m.ext.type.order,
                    f = a.aoData,
                    g = 0,
                    j = a.aiDisplayMaster;
                for (Ia(a), b = 0, c = (h = V(a)).length; b < c; b++)(i = h[b]).formatter && g++, Ib(a, i.col);
                if ("ssp" != y(a) && 0 !== h.length) {
                    for (b = 0, c = j.length; b < c; b++) d[j[b]] = b;
                    g === h.length ? j.sort((function(a, b) {
                        var c, e, g, i, j = h.length,
                            k = f[a]._aSortData,
                            m = f[b]._aSortData;
                        for (g = 0; g < j; g++)
                            if (0 !== (c = (c = k[(i = h[g]).col]) < (e = m[i.col]) ? -1 : c > e ? 1 : 0)) return "asc" === i.dir ? c : -c;
                        return (c = d[a]) < (e = d[b]) ? -1 : c > e ? 1 : 0
                    })) : j.sort((function(a, b) {
                        var c, g, i, j, k = h.length,
                            m = f[a]._aSortData,
                            p = f[b]._aSortData;
                        for (i = 0; i < k; i++)
                            if (c = m[(j = h[i]).col], g = p[j.col], 0 !== (c = (j = e[j.type + "-" + j.dir] || e["string-" + j.dir])(c, g))) return c;
                        return (c = d[a]) < (g = d[b]) ? -1 : c > g ? 1 : 0
                    }))
                }
                a.bSorted = !0
            }

            function Jb(a) {
                for (var b, c, d = a.aoColumns, e = V(a), f = (a = a.oLanguage.oAria, 0), g = d.length; f < g; f++) {
                    var i = (c = d[f]).asSorting;
                    b = c.sTitle.replace(/<.*?>/g, "");
                    var j = c.nTh;
                    j.removeAttribute("aria-sort"), c.bSortable && (0 < e.length && e[0].col == f ? (j.setAttribute("aria-sort", "asc" == e[0].dir ? "ascending" : "descending"), c = i[e[0].index + 1] || i[0]) : c = i[0], b += "asc" === c ? a.sSortAscending : a.sSortDescending), j.setAttribute("aria-label", b)
                }
            }

            function Ua(a, b, c, d) {
                var e = a.aaSorting,
                    f = a.aoColumns[b].asSorting,
                    g = function(a, b) {
                        var c = a._idx;
                        return c === k && (c = h.inArray(a[1], f)), c + 1 < f.length ? c + 1 : b ? null : 0
                    };
                "number" == typeof e[0] && (e = a.aaSorting = [e]), c && a.oFeatures.bSortMulti ? -1 !== (c = h.inArray(b, D(e, "0"))) ? (null === (b = g(e[c], !0)) && 1 === e.length && (b = 0), null === b ? e.splice(c, 1) : (e[c][1] = f[b], e[c]._idx = b)) : (e.push([b, f[0], 0]), e[e.length - 1]._idx = 0) : e.length && e[0][0] == b ? (b = g(e[0]), e.length = 1, e[0][1] = f[b], e[0]._idx = b) : (e.length = 0, e.push([b, f[0]]), e[0]._idx = 0), R(a), "function" == typeof d && d(a)
            }

            function Oa(a, b, c, d) {
                var e = a.aoColumns[c];
                Va(b, {}, (function(b) {
                    !1 !== e.bSortable && (a.oFeatures.bProcessing ? (C(a, !0), setTimeout((function() {
                        Ua(a, c, b.shiftKey, d), "ssp" !== y(a) && C(a, !1)
                    }), 0)) : Ua(a, c, b.shiftKey, d))
                }))
            }

            function xa(a) {
                var f, g, b = a.aLastSort,
                    c = a.oClasses.sSortColumn,
                    d = V(a),
                    e = a.oFeatures;
                if (e.bSort && e.bSortClasses) {
                    for (e = 0, f = b.length; e < f; e++) g = b[e].src, h(D(a.aoData, "anCells", g)).removeClass(c + (2 > e ? e + 1 : 3));
                    for (e = 0, f = d.length; e < f; e++) g = d[e].src, h(D(a.aoData, "anCells", g)).addClass(c + (2 > e ? e + 1 : 3))
                }
                a.aLastSort = d
            }

            function Ib(a, b) {
                var e, c = a.aoColumns[b],
                    d = m.ext.order[c.sSortDataType];
                d && (e = d.call(a.oInstance, a, b, ba(a, b)));
                for (var f, g = m.ext.type.order[c.sType + "-pre"], i = 0, h = a.aoData.length; i < h; i++)(c = a.aoData[i])._aSortData || (c._aSortData = []), (!c._aSortData[b] || d) && (f = d ? e[i] : B(a, i, b, "sort"), c._aSortData[b] = g ? g(f) : f)
            }

            function ya(a) {
                if (a.oFeatures.bStateSave && !a.bDestroying) {
                    var b = {
                        time: +new Date,
                        start: a._iDisplayStart,
                        length: a._iDisplayLength,
                        order: h.extend(!0, [], a.aaSorting),
                        search: Ab(a.oPreviousSearch),
                        columns: h.map(a.aoColumns, (function(b, d) {
                            return {
                                visible: b.bVisible,
                                search: Ab(a.aoPreSearchCols[d])
                            }
                        }))
                    };
                    w(a, "aoStateSaveParams", "stateSaveParams", [a, b]), a.oSavedState = b, a.fnStateSaveCallback.call(a.oInstance, a, b)
                }
            }

            function Kb(a) {
                var b, c, d = a.aoColumns;
                if (a.oFeatures.bStateSave) {
                    var e = a.fnStateLoadCallback.call(a.oInstance, a);
                    if (e && e.time && (b = w(a, "aoStateLoadParams", "stateLoadParams", [a, e]), -1 === h.inArray(!1, b) && (!(0 < (b = a.iStateDuration) && e.time < +new Date - 1e3 * b) && d.length === e.columns.length))) {
                        for (a.oLoadedState = h.extend(!0, {}, e), e.start !== k && (a._iDisplayStart = e.start, a.iInitDisplayStart = e.start), e.length !== k && (a._iDisplayLength = e.length), e.order !== k && (a.aaSorting = [], h.each(e.order, (function(b, c) {
                                a.aaSorting.push(c[0] >= d.length ? [0, c[1]] : c)
                            }))), e.search !== k && h.extend(a.oPreviousSearch, Bb(e.search)), b = 0, c = e.columns.length; b < c; b++) {
                            var f = e.columns[b];
                            f.visible !== k && (d[b].bVisible = f.visible), f.search !== k && h.extend(a.aoPreSearchCols[b], Bb(f.search))
                        }
                        w(a, "aoStateLoaded", "stateLoaded", [a, e])
                    }
                }
            }

            function za(a) {
                var b = m.settings;
                return -1 !== (a = h.inArray(a, D(b, "nTable"))) ? b[a] : null
            }

            function J(a, b, c, d) {
                if (c = "DataTables warning: " + (a ? "table id=" + a.sTableId + " - " : "") + c, d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d), b) Fa.console && console.log && console.log(c);
                else if (b = (b = m.ext).sErrMode || b.errMode, a && w(a, null, "error", [a, d, c]), "alert" == b) alert(c);
                else {
                    if ("throw" == b) throw Error(c);
                    "function" == typeof b && b(a, d, c)
                }
            }

            function F(a, b, c, d) {
                h.isArray(c) ? h.each(c, (function(c, d) {
                    h.isArray(d) ? F(a, b, d[0], d[1]) : F(a, b, d)
                })) : (d === k && (d = c), b[c] !== k && (a[d] = b[c]))
            }

            function Lb(a, b, c) {
                var d, e;
                for (e in b) b.hasOwnProperty(e) && (d = b[e], h.isPlainObject(d) ? (h.isPlainObject(a[e]) || (a[e] = {}), h.extend(!0, a[e], d)) : a[e] = c && "data" !== e && "aaData" !== e && h.isArray(d) ? d.slice() : d);
                return a
            }

            function Va(a, b, c) {
                h(a).bind("click.DT", b, (function(b) {
                    a.blur(), c(b)
                })).bind("keypress.DT", b, (function(a) {
                    13 === a.which && (a.preventDefault(), c(a))
                })).bind("selectstart.DT", (function() {
                    return !1
                }))
            }

            function z(a, b, c, d) {
                c && a[b].push({
                    fn: c,
                    sName: d
                })
            }

            function w(a, b, c, d) {
                var e = [];
                return b && (e = h.map(a[b].slice().reverse(), (function(b) {
                    return b.fn.apply(a.oInstance, d)
                }))), null !== c && (b = h.Event(c + ".dt"), h(a.nTable).trigger(b, d), e.push(b.result)), e
            }

            function Sa(a) {
                var b = a._iDisplayStart,
                    c = a.fnDisplayEnd(),
                    d = a._iDisplayLength;
                b >= c && (b = c - d), b -= b % d, (-1 === d || 0 > b) && (b = 0), a._iDisplayStart = b
            }

            function Pa(a, b) {
                var c = a.renderer,
                    d = m.ext.renderer[b];
                return h.isPlainObject(c) && c[b] ? d[c[b]] || d._ : "string" == typeof c && d[c] || d._
            }

            function y(a) {
                return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom"
            }

            function Aa(a, b) {
                var c = [],
                    d = (c = Mb.numbers_length, Math.floor(c / 2));
                return b <= c ? c = W(0, b) : a <= d ? ((c = W(0, c - 2)).push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - d ? c = W(b - (c - 2), b) : ((c = W(a - d + 2, a + d - 1)).push("ellipsis"), c.push(b - 1)), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0)), c.DT_el = "span", c
            }

            function cb(a) {
                h.each({
                    num: function(b) {
                        return Ba(b, a)
                    },
                    "num-fmt": function(b) {
                        return Ba(b, a, Wa)
                    },
                    "html-num": function(b) {
                        return Ba(b, a, Ca)
                    },
                    "html-num-fmt": function(b) {
                        return Ba(b, a, Ca, Wa)
                    }
                }, (function(b, c) {
                    v.type.order[b + a + "-pre"] = c, b.match(/^html\-/) && (v.type.search[b + a] = v.type.search.html)
                }))
            }

            function Nb(a) {
                return function() {
                    var b = [za(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                    return m.ext.internal[a].apply(this, b)
                }
            }
            var m, v, t, p, s, Xa = {},
                Ob = /[\r\n]/g,
                Ca = /<.*?>/g,
                ac = /^[\w\+\-]/,
                bc = /[\w\+\-]$/,
                Yb = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
                Wa = /[',$\xa3\u20ac\xa5%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,
                K = function(a) {
                    return !a || !0 === a || "-" === a
                },
                Pb = function(a) {
                    var b = parseInt(a, 10);
                    return !isNaN(b) && isFinite(a) ? b : null
                },
                Qb = function(a, b) {
                    return Xa[b] || (Xa[b] = RegExp(va(b), "g")), "string" == typeof a && "." !== b ? a.replace(/\./g, "").replace(Xa[b], ".") : a
                },
                Ya = function(a, b, c) {
                    var d = "string" == typeof a;
                    return !!K(a) || (b && d && (a = Qb(a, b)), c && d && (a = a.replace(Wa, "")), !isNaN(parseFloat(a)) && isFinite(a))
                },
                Rb = function(a, b, c) {
                    return !!K(a) || ((K(a) || "string" == typeof a) && !!Ya(a.replace(Ca, ""), b, c) || null)
                },
                D = function(a, b, c) {
                    var d = [],
                        e = 0,
                        f = a.length;
                    if (c !== k)
                        for (; e < f; e++) a[e] && a[e][b] && d.push(a[e][b][c]);
                    else
                        for (; e < f; e++) a[e] && d.push(a[e][b]);
                    return d
                },
                ja = function(a, b, c, d) {
                    var e = [],
                        f = 0,
                        g = b.length;
                    if (d !== k)
                        for (; f < g; f++) a[b[f]][c] && e.push(a[b[f]][c][d]);
                    else
                        for (; f < g; f++) e.push(a[b[f]][c]);
                    return e
                },
                W = function(a, b) {
                    var d, c = [];
                    b === k ? (b = 0, d = a) : (d = b, b = a);
                    for (var e = b; e < d; e++) c.push(e);
                    return c
                },
                Sb = function(a) {
                    for (var b = [], c = 0, d = a.length; c < d; c++) a[c] && b.push(a[c]);
                    return b
                },
                pa = function(a) {
                    var c, d, f, b = [],
                        e = a.length,
                        g = 0;
                    d = 0;
                    a: for (; d < e; d++) {
                        for (c = a[d], f = 0; f < g; f++)
                            if (b[f] === c) continue a;
                        b.push(c), g++
                    }
                    return b
                },
                A = function(a, b, c) {
                    a[b] !== k && (a[c] = a[b])
                },
                da = /\[.*?\]$/,
                U = /\(\)$/,
                wa = h("<div>")[0],
                Zb = wa.textContent !== k,
                $b = /<.*?>/g;
            m = function(a) {
                this.$ = function(a, b) {
                    return this.api(!0).$(a, b)
                }, this._ = function(a, b) {
                    return this.api(!0).rows(a, b).data()
                }, this.api = function(a) {
                    return new t(a ? za(this[v.iApiIndex]) : this)
                }, this.fnAddData = function(a, b) {
                    var c = this.api(!0),
                        d = h.isArray(a) && (h.isArray(a[0]) || h.isPlainObject(a[0])) ? c.rows.add(a) : c.row.add(a);
                    return (b === k || b) && c.draw(), d.flatten().toArray()
                }, this.fnAdjustColumnSizing = function(a) {
                    var b = this.api(!0).columns.adjust(),
                        c = b.settings()[0],
                        d = c.oScroll;
                    a === k || a ? b.draw(!1) : ("" !== d.sX || "" !== d.sY) && Z(c)
                }, this.fnClearTable = function(a) {
                    var b = this.api(!0).clear();
                    (a === k || a) && b.draw()
                }, this.fnClose = function(a) {
                    this.api(!0).row(a).child.hide()
                }, this.fnDeleteRow = function(a, b, c) {
                    var d = this.api(!0),
                        e = (a = d.rows(a)).settings()[0],
                        h = e.aoData[a[0][0]];
                    return a.remove(), b && b.call(this, e, h), (c === k || c) && d.draw(), h
                }, this.fnDestroy = function(a) {
                    this.api(!0).destroy(a)
                }, this.fnDraw = function(a) {
                    this.api(!0).draw(a)
                }, this.fnFilter = function(a, b, c, d, e, h) {
                    e = this.api(!0), null === b || b === k ? e.search(a, c, d, h) : e.column(b).search(a, c, d, h), e.draw()
                }, this.fnGetData = function(a, b) {
                    var c = this.api(!0);
                    if (a !== k) {
                        var d = a.nodeName ? a.nodeName.toLowerCase() : "";
                        return b !== k || "td" == d || "th" == d ? c.cell(a, b).data() : c.row(a).data() || null
                    }
                    return c.data().toArray()
                }, this.fnGetNodes = function(a) {
                    var b = this.api(!0);
                    return a !== k ? b.row(a).node() : b.rows().nodes().flatten().toArray()
                }, this.fnGetPosition = function(a) {
                    var b = this.api(!0),
                        c = a.nodeName.toUpperCase();
                    return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? [(a = b.cell(a).index()).row, a.columnVisible, a.column] : null
                }, this.fnIsOpen = function(a) {
                    return this.api(!0).row(a).child.isShown()
                }, this.fnOpen = function(a, b, c) {
                    return this.api(!0).row(a).child(b, c).show().child()[0]
                }, this.fnPageChange = function(a, b) {
                    var c = this.api(!0).page(a);
                    (b === k || b) && c.draw(!1)
                }, this.fnSetColumnVis = function(a, b, c) {
                    a = this.api(!0).column(a).visible(b), (c === k || c) && a.columns.adjust().draw()
                }, this.fnSettings = function() {
                    return za(this[v.iApiIndex])
                }, this.fnSort = function(a) {
                    this.api(!0).order(a).draw()
                }, this.fnSortListener = function(a, b, c) {
                    this.api(!0).order.listener(a, b, c)
                }, this.fnUpdate = function(a, b, c, d, e) {
                    var h = this.api(!0);
                    return c === k || null === c ? h.row(b).data(a) : h.cell(b, c).data(a), (e === k || e) && h.columns.adjust(), (d === k || d) && h.draw(), 0
                }, this.fnVersionCheck = v.fnVersionCheck;
                var b = this,
                    c = a === k,
                    d = this.length;
                for (var e in c && (a = {}), this.oApi = this.internal = v.internal, m.ext.internal) e && (this[e] = Nb(e));
                return this.each((function() {
                    var i, e = {},
                        g = (e = 1 < d ? Lb(e, a, !0) : a, 0),
                        j = this.getAttribute("id"),
                        n = !1,
                        l = m.defaults,
                        r = h(this);
                    if ("table" != this.nodeName.toLowerCase()) J(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                    else {
                        db(l), eb(l.column), I(l, l, !0), I(l.column, l.column, !0), I(l, h.extend(e, r.data()));
                        var q = m.settings;
                        g = 0;
                        for (i = q.length; g < i; g++) {
                            var p = q[g];
                            if (p.nTable == this || p.nTHead.parentNode == this || p.nTFoot && p.nTFoot.parentNode == this) {
                                if (g = e.bRetrieve !== k ? e.bRetrieve : l.bRetrieve, c || g) return p.oInstance;
                                if (e.bDestroy !== k ? e.bDestroy : l.bDestroy) {
                                    p.oInstance.fnDestroy();
                                    break
                                }
                                return void J(p, 0, "Cannot reinitialise DataTable", 3)
                            }
                            if (p.sTableId == this.id) {
                                q.splice(g, 1);
                                break
                            }
                        }
                        null !== j && "" !== j || (this.id = j = "DataTables_Table_" + m.ext._unique++);
                        var o = h.extend(!0, {}, m.models.oSettings, {
                            sDestroyWidth: r[0].style.width,
                            sInstance: j,
                            sTableId: j
                        });
                        o.nTable = this, o.oApi = b.internal, o.oInit = e, q.push(o), o.oInstance = 1 === b.length ? b : r.dataTable(), db(e), e.oLanguage && S(e.oLanguage), e.aLengthMenu && !e.iDisplayLength && (e.iDisplayLength = h.isArray(e.aLengthMenu[0]) ? e.aLengthMenu[0][0] : e.aLengthMenu[0]), e = Lb(h.extend(!0, {}, l), e), F(o.oFeatures, e, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" ")), F(o, e, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"],
                            ["oSearch", "oPreviousSearch"],
                            ["aoSearchCols", "aoPreSearchCols"],
                            ["iDisplayLength", "_iDisplayLength"],
                            ["bJQueryUI", "bJUI"]
                        ]), F(o.oScroll, e, [
                            ["sScrollX", "sX"],
                            ["sScrollXInner", "sXInner"],
                            ["sScrollY", "sY"],
                            ["bScrollCollapse", "bCollapse"]
                        ]), F(o.oLanguage, e, "fnInfoCallback"), z(o, "aoDrawCallback", e.fnDrawCallback, "user"), z(o, "aoServerParams", e.fnServerParams, "user"), z(o, "aoStateSaveParams", e.fnStateSaveParams, "user"), z(o, "aoStateLoadParams", e.fnStateLoadParams, "user"), z(o, "aoStateLoaded", e.fnStateLoaded, "user"), z(o, "aoRowCallback", e.fnRowCallback, "user"), z(o, "aoRowCreatedCallback", e.fnCreatedRow, "user"), z(o, "aoHeaderCallback", e.fnHeaderCallback, "user"), z(o, "aoFooterCallback", e.fnFooterCallback, "user"), z(o, "aoInitComplete", e.fnInitComplete, "user"), z(o, "aoPreDrawCallback", e.fnPreDrawCallback, "user"), o.rowIdFn = P(e.rowId), fb(o), j = o.oClasses, e.bJQueryUI ? (h.extend(j, m.ext.oJUIClasses, e.oClasses), e.sDom === l.sDom && "lfrtip" === l.sDom && (o.sDom = '<"H"lfr>t<"F"ip>'), o.renderer ? h.isPlainObject(o.renderer) && !o.renderer.header && (o.renderer.header = "jqueryui") : o.renderer = "jqueryui") : h.extend(j, m.ext.classes, e.oClasses), r.addClass(j.sTable), o.iInitDisplayStart === k && (o.iInitDisplayStart = e.iDisplayStart, o._iDisplayStart = e.iDisplayStart), null !== e.iDeferLoading && (o.bDeferLoading = !0, g = h.isArray(e.iDeferLoading), o._iRecordsDisplay = g ? e.iDeferLoading[0] : e.iDeferLoading, o._iRecordsTotal = g ? e.iDeferLoading[1] : e.iDeferLoading);
                        var t = o.oLanguage;
                        h.extend(!0, t, e.oLanguage), "" !== t.sUrl && (h.ajax({
                            dataType: "json",
                            url: t.sUrl,
                            success: function(a) {
                                S(a), I(l.oLanguage, a), h.extend(!0, t, a), ia(o)
                            },
                            error: function() {
                                ia(o)
                            }
                        }), n = !0), null === e.asStripeClasses && (o.asStripeClasses = [j.sStripeOdd, j.sStripeEven]);
                        g = o.asStripeClasses;
                        var s = r.children("tbody").find("tr").eq(0);
                        if (-1 !== h.inArray(!0, h.map(g, (function(a) {
                                return s.hasClass(a)
                            }))) && (h("tbody tr", this).removeClass(g.join(" ")), o.asDestroyStripes = g.slice()), q = [], 0 !== (g = this.getElementsByTagName("thead")).length && (fa(o.aoHeader, g[0]), q = qa(o)), null === e.aoColumns)
                            for (p = [], g = 0, i = q.length; g < i; g++) p.push(null);
                        else p = e.aoColumns;
                        for (g = 0, i = p.length; g < i; g++) Ga(o, q ? q[g] : null);
                        if (hb(o, e.aoColumnDefs, p, (function(a, b) {
                                la(o, a, b)
                            })), s.length) {
                            var u = function(a, b) {
                                return null !== a.getAttribute("data-" + b) ? b : null
                            };
                            h(s[0]).children("th, td").each((function(a, b) {
                                var c = o.aoColumns[a];
                                if (c.mData === a) {
                                    var d = u(b, "sort") || u(b, "order"),
                                        e = u(b, "filter") || u(b, "search");
                                    null === d && null === e || (c.mData = {
                                        _: a + ".display",
                                        sort: null !== d ? a + ".@data-" + d : k,
                                        type: null !== d ? a + ".@data-" + d : k,
                                        filter: null !== e ? a + ".@data-" + e : k
                                    }, la(o, a))
                                }
                            }))
                        }
                        var v = o.oFeatures;
                        if (e.bStateSave && (v.bStateSave = !0, Kb(o, e), z(o, "aoDrawCallback", ya, "state_save")), e.aaSorting === k)
                            for (g = 0, i = (q = o.aaSorting).length; g < i; g++) q[g][1] = o.aoColumns[g].asSorting[0];
                        if (xa(o), v.bSort && z(o, "aoDrawCallback", (function() {
                                if (o.bSorted) {
                                    var a = V(o),
                                        b = {};
                                    h.each(a, (function(a, c) {
                                        b[c.src] = c.dir
                                    })), w(o, null, "order", [o, a, b]), Jb(o)
                                }
                            })), z(o, "aoDrawCallback", (function() {
                                (o.bSorted || "ssp" === y(o) || v.bDeferRender) && xa(o)
                            }), "sc"), g = r.children("caption").each((function() {
                                this._captionSide = r.css("caption-side")
                            })), 0 === (i = r.children("thead")).length && (i = h("<thead/>").appendTo(this)), o.nTHead = i[0], 0 === (i = r.children("tbody")).length && (i = h("<tbody/>").appendTo(this)), o.nTBody = i[0], 0 === (i = r.children("tfoot")).length && 0 < g.length && ("" !== o.oScroll.sX || "" !== o.oScroll.sY) && (i = h("<tfoot/>").appendTo(this)), 0 === i.length || 0 === i.children().length ? r.addClass(j.sNoFooter) : 0 < i.length && (o.nTFoot = i[0], fa(o.aoFooter, o.nTFoot)), e.aaData)
                            for (g = 0; g < e.aaData.length; g++) L(o, e.aaData[g]);
                        else(o.bDeferLoading || "dom" == y(o)) && ma(o, h(o.nTBody).children("tr"));
                        o.aiDisplay = o.aiDisplayMaster.slice(), o.bInitialised = !0, !1 === n && ia(o)
                    }
                })), b = null, this
            };
            var Tb = [],
                x = Array.prototype,
                cc = function(a) {
                    var b, c, d = m.settings,
                        e = h.map(d, (function(a) {
                            return a.nTable
                        }));
                    return a ? a.nTable && a.oApi ? [a] : a.nodeName && "table" === a.nodeName.toLowerCase() ? -1 !== (b = h.inArray(a, e)) ? [d[b]] : null : a && "function" == typeof a.settings ? a.settings().toArray() : ("string" == typeof a ? c = h(a) : a instanceof h && (c = a), c ? c.map((function() {
                        return -1 !== (b = h.inArray(this, e)) ? d[b] : null
                    })).toArray() : void 0) : []
                };
            t = function(a, b) {
                if (!(this instanceof t)) return new t(a, b);
                var c = [],
                    d = function(a) {
                        (a = cc(a)) && (c = c.concat(a))
                    };
                if (h.isArray(a))
                    for (var e = 0, f = a.length; e < f; e++) d(a[e]);
                else d(a);
                this.context = pa(c), b && h.merge(this, b), this.selector = {
                    rows: null,
                    cols: null,
                    opts: null
                }, t.extend(this, this, Tb)
            }, m.Api = t, h.extend(t.prototype, {
                any: function() {
                    return 0 !== this.count()
                },
                concat: x.concat,
                context: [],
                count: function() {
                    return this.flatten().length
                },
                each: function(a) {
                    for (var b = 0, c = this.length; b < c; b++) a.call(this, this[b], b, this);
                    return this
                },
                eq: function(a) {
                    var b = this.context;
                    return b.length > a ? new t(b[a], this[a]) : null
                },
                filter: function(a) {
                    var b = [];
                    if (x.filter) b = x.filter.call(this, a, this);
                    else
                        for (var c = 0, d = this.length; c < d; c++) a.call(this, this[c], c, this) && b.push(this[c]);
                    return new t(this.context, b)
                },
                flatten: function() {
                    var a = [];
                    return new t(this.context, a.concat.apply(a, this.toArray()))
                },
                join: x.join,
                indexOf: x.indexOf || function(a, b) {
                    for (var c = b || 0, d = this.length; c < d; c++)
                        if (this[c] === a) return c;
                    return -1
                },
                iterator: function(a, b, c, d) {
                    var f, g, h, j, n, m, q, e = [],
                        l = this.context,
                        p = this.selector;
                    for ("string" == typeof a && (d = c, c = b, b = a, a = !1), g = 0, h = l.length; g < h; g++) {
                        var o = new t(l[g]);
                        if ("table" === b)(f = c.call(o, l[g], g)) !== k && e.push(f);
                        else if ("columns" === b || "rows" === b)(f = c.call(o, l[g], this[g], g)) !== k && e.push(f);
                        else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b)
                            for (q = this[g], "column-rows" === b && (m = Da(l[g], p.opts)), j = 0, n = q.length; j < n; j++) f = q[j], (f = "cell" === b ? c.call(o, l[g], f.row, f.column, g, j) : c.call(o, l[g], f, g, j, m)) !== k && e.push(f)
                    }
                    return e.length || d ? ((b = (a = new t(l, a ? e.concat.apply([], e) : e)).selector).rows = p.rows, b.cols = p.cols, b.opts = p.opts, a) : this
                },
                lastIndexOf: x.lastIndexOf || function(a, b) {
                    return this.indexOf.apply(this.toArray.reverse(), arguments)
                },
                length: 0,
                map: function(a) {
                    var b = [];
                    if (x.map) b = x.map.call(this, a, this);
                    else
                        for (var c = 0, d = this.length; c < d; c++) b.push(a.call(this, this[c], c));
                    return new t(this.context, b)
                },
                pluck: function(a) {
                    return this.map((function(b) {
                        return b[a]
                    }))
                },
                pop: x.pop,
                push: x.push,
                reduce: x.reduce || function(a, b) {
                    return gb(this, a, b, 0, this.length, 1)
                },
                reduceRight: x.reduceRight || function(a, b) {
                    return gb(this, a, b, this.length - 1, -1, -1)
                },
                reverse: x.reverse,
                selector: null,
                shift: x.shift,
                sort: x.sort,
                splice: x.splice,
                toArray: function() {
                    return x.slice.call(this)
                },
                to$: function() {
                    return h(this)
                },
                toJQuery: function() {
                    return h(this)
                },
                unique: function() {
                    return new t(this.context, pa(this))
                },
                unshift: x.unshift
            }), t.extend = function(a, b, c) {
                if (c.length && b && (b instanceof t || b.__dt_wrapper)) {
                    var d, e, f, g = function(a, b, c) {
                        return function() {
                            var d = b.apply(a, arguments);
                            return t.extend(d, d, c.methodExt), d
                        }
                    };
                    for (d = 0, e = c.length; d < e; d++) b[(f = c[d]).name] = "function" == typeof f.val ? g(a, f.val, f) : h.isPlainObject(f.val) ? {} : f.val, b[f.name].__dt_wrapper = !0, t.extend(a, b[f.name], f.propExt)
                }
            }, t.register = p = function(a, b) {
                if (h.isArray(a))
                    for (var c = 0, d = a.length; c < d; c++) t.register(a[c], b);
                else {
                    var g, i, e = a.split("."),
                        f = Tb;
                    for (c = 0, d = e.length; c < d; c++) {
                        var j;
                        g = (i = -1 !== e[c].indexOf("()")) ? e[c].replace("()", "") : e[c];
                        a: {
                            j = 0;
                            for (var n = f.length; j < n; j++)
                                if (f[j].name === g) {
                                    j = f[j];
                                    break a
                                }
                            j = null
                        }
                        j || (j = {
                            name: g,
                            val: {},
                            methodExt: [],
                            propExt: []
                        }, f.push(j)), c === d - 1 ? j.val = b : f = i ? j.methodExt : j.propExt
                    }
                }
            }, t.registerPlural = s = function(a, b, c) {
                t.register(a, c), t.register(b, (function() {
                    var a = c.apply(this, arguments);
                    return a === this ? this : a instanceof t ? a.length ? h.isArray(a[0]) ? new t(a.context, a[0]) : a[0] : k : a
                }))
            }, p("tables()", (function(a) {
                var b;
                if (a) {
                    b = t;
                    var c = this.context;
                    if ("number" == typeof a) a = [c[a]];
                    else {
                        var d = h.map(c, (function(a) {
                            return a.nTable
                        }));
                        a = h(d).filter(a).map((function() {
                            var a = h.inArray(this, d);
                            return c[a]
                        })).toArray()
                    }
                    b = new b(a)
                } else b = this;
                return b
            })), p("table()", (function(a) {
                var b = (a = this.tables(a)).context;
                return b.length ? new t(b[0]) : a
            })), s("tables().nodes()", "table().node()", (function() {
                return this.iterator("table", (function(a) {
                    return a.nTable
                }), 1)
            })), s("tables().body()", "table().body()", (function() {
                return this.iterator("table", (function(a) {
                    return a.nTBody
                }), 1)
            })), s("tables().header()", "table().header()", (function() {
                return this.iterator("table", (function(a) {
                    return a.nTHead
                }), 1)
            })), s("tables().footer()", "table().footer()", (function() {
                return this.iterator("table", (function(a) {
                    return a.nTFoot
                }), 1)
            })), s("tables().containers()", "table().container()", (function() {
                return this.iterator("table", (function(a) {
                    return a.nTableWrapper
                }), 1)
            })), p("draw()", (function(a) {
                return this.iterator("table", (function(b) {
                    "page" === a ? M(b) : ("string" == typeof a && (a = "full-hold" !== a), R(b, !1 === a))
                }))
            })), p("page()", (function(a) {
                return a === k ? this.page.info().page : this.iterator("table", (function(b) {
                    Ta(b, a)
                }))
            })), p("page.info()", (function() {
                if (0 === this.context.length) return k;
                var a = this.context[0],
                    b = a._iDisplayStart,
                    c = a._iDisplayLength,
                    d = a.fnRecordsDisplay(),
                    e = -1 === c;
                return {
                    page: e ? 0 : Math.floor(b / c),
                    pages: e ? 1 : Math.ceil(d / c),
                    start: b,
                    end: a.fnDisplayEnd(),
                    length: c,
                    recordsTotal: a.fnRecordsTotal(),
                    recordsDisplay: d,
                    serverSide: "ssp" === y(a)
                }
            })), p("page.len()", (function(a) {
                return a === k ? 0 !== this.context.length ? this.context[0]._iDisplayLength : k : this.iterator("table", (function(b) {
                    Ra(b, a)
                }))
            }));
            var Ub = function(a, b, c) {
                if (c) {
                    var d = new t(a);
                    d.one("draw", (function() {
                        c(d.ajax.json())
                    }))
                }
                if ("ssp" == y(a)) R(a, b);
                else {
                    C(a, !0);
                    var e = a.jqXHR;
                    e && 4 !== e.readyState && e.abort(), ra(a, [], (function(c) {
                        na(a);
                        for (var d = 0, e = (c = sa(a, c)).length; d < e; d++) L(a, c[d]);
                        R(a, b), C(a, !1)
                    }))
                }
            };
            p("ajax.json()", (function() {
                var a = this.context;
                if (0 < a.length) return a[0].json
            })), p("ajax.params()", (function() {
                var a = this.context;
                if (0 < a.length) return a[0].oAjaxData
            })), p("ajax.reload()", (function(a, b) {
                return this.iterator("table", (function(c) {
                    Ub(c, !1 === b, a)
                }))
            })), p("ajax.url()", (function(a) {
                var b = this.context;
                return a === k ? 0 === b.length ? k : (b = b[0]).ajax ? h.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource : this.iterator("table", (function(b) {
                    h.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a
                }))
            })), p("ajax.url().load()", (function(a, b) {
                return this.iterator("table", (function(c) {
                    Ub(c, !1 === b, a)
                }))
            }));
            var Za = function(a, b, c, d, e) {
                    var g, i, j, n, l, m, f = [];
                    for (j = typeof b, b && "string" !== j && "function" !== j && b.length !== k || (b = [b]), j = 0, n = b.length; j < n; j++)
                        for (l = 0, m = (i = b[j] && b[j].split ? b[j].split(",") : [b[j]]).length; l < m; l++)(g = c("string" == typeof i[l] ? h.trim(i[l]) : i[l])) && g.length && (f = f.concat(g));
                    if ((a = v.selector[a]).length)
                        for (j = 0, n = a.length; j < n; j++) f = a[j](d, e, f);
                    return pa(f)
                },
                $a = function(a) {
                    return a || (a = {}), a.filter && a.search === k && (a.search = a.filter), h.extend({
                        search: "none",
                        order: "current",
                        page: "all"
                    }, a)
                },
                ab = function(a) {
                    for (var b = 0, c = a.length; b < c; b++)
                        if (0 < a[b].length) return a[0] = a[b], a[0].length = 1, a.length = 1, a.context = [a.context[b]], a;
                    return a.length = 0, a
                },
                Da = function(a, b) {
                    var c, d, e, f = [],
                        g = a.aiDisplay;
                    c = a.aiDisplayMaster;
                    var i = b.search;
                    if (d = b.order, e = b.page, "ssp" == y(a)) return "removed" === i ? [] : W(0, c.length);
                    if ("current" == e)
                        for (c = a._iDisplayStart, d = a.fnDisplayEnd(); c < d; c++) f.push(g[c]);
                    else if ("current" == d || "applied" == d) f = "none" == i ? c.slice() : "applied" == i ? g.slice() : h.map(c, (function(a) {
                        return -1 === h.inArray(a, g) ? a : null
                    }));
                    else if ("index" == d || "original" == d)
                        for (c = 0, d = a.aoData.length; c < d; c++) "none" == i ? f.push(c) : (-1 === (e = h.inArray(c, g)) && "removed" == i || 0 <= e && "applied" == i) && f.push(c);
                    return f
                };
            p("rows()", (function(a, b) {
                a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");
                b = $a(b);
                var c = this.iterator("table", (function(c) {
                    var e = b;
                    return Za("row", a, (function(a) {
                        var b = Pb(a);
                        if (null !== b && !e) return [b];
                        var i = Da(c, e);
                        return null !== b && -1 !== h.inArray(b, i) ? [b] : a ? "function" == typeof a ? h.map(i, (function(b) {
                            var e = c.aoData[b];
                            return a(b, e._aData, e.nTr) ? b : null
                        })) : (b = Sb(ja(c.aoData, i, "nTr")), a.nodeName && -1 !== h.inArray(a, b) ? [a._DT_RowIndex] : "string" == typeof a && "#" === a.charAt(0) && (i = c.aIds[a.replace(/^#/, "")]) !== k ? [i.idx] : h(b).filter(a).map((function() {
                            return this._DT_RowIndex
                        })).toArray()) : i
                    }), c, e)
                }), 1);
                return c.selector.rows = a, c.selector.opts = b, c
            })), p("rows().nodes()", (function() {
                return this.iterator("row", (function(a, b) {
                    return a.aoData[b].nTr || k
                }), 1)
            })), p("rows().data()", (function() {
                return this.iterator(!0, "rows", (function(a, b) {
                    return ja(a.aoData, b, "_aData")
                }), 1)
            })), s("rows().cache()", "row().cache()", (function(a) {
                return this.iterator("row", (function(b, c) {
                    var d = b.aoData[c];
                    return "search" === a ? d._aFilterData : d._aSortData
                }), 1)
            })), s("rows().invalidate()", "row().invalidate()", (function(a) {
                return this.iterator("row", (function(b, c) {
                    ea(b, c, a)
                }))
            })), s("rows().indexes()", "row().index()", (function() {
                return this.iterator("row", (function(a, b) {
                    return b
                }), 1)
            })), s("rows().ids()", "row().id()", (function(a) {
                for (var b = [], c = this.context, d = 0, e = c.length; d < e; d++)
                    for (var f = 0, g = this[d].length; f < g; f++) {
                        var h = c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);
                        b.push((!0 === a ? "#" : "") + h)
                    }
                return new t(c, b)
            })), s("rows().remove()", "row().remove()", (function() {
                var a = this;
                return this.iterator("row", (function(b, c, d) {
                    var e = b.aoData,
                        f = e[c];
                    e.splice(c, 1);
                    for (var g = 0, h = e.length; g < h; g++) null !== e[g].nTr && (e[g].nTr._DT_RowIndex = g);
                    oa(b.aiDisplayMaster, c), oa(b.aiDisplay, c), oa(a[d], c, !1), Sa(b), (c = b.rowIdFn(f._aData)) !== k && delete b.aIds[c]
                })), this.iterator("table", (function(a) {
                    for (var c = 0, d = a.aoData.length; c < d; c++) a.aoData[c].idx = c
                })), this
            })), p("rows.add()", (function(a) {
                var b = this.iterator("table", (function(b) {
                        var c, f, g, h = [];
                        for (f = 0, g = a.length; f < g; f++)(c = a[f]).nodeName && "TR" === c.nodeName.toUpperCase() ? h.push(ma(b, c)[0]) : h.push(L(b, c));
                        return h
                    }), 1),
                    c = this.rows(-1);
                return c.pop(), h.merge(c, b), c
            })), p("row()", (function(a, b) {
                return ab(this.rows(a, b))
            })), p("row().data()", (function(a) {
                var b = this.context;
                return a === k ? b.length && this.length ? b[0].aoData[this[0]]._aData : k : (b[0].aoData[this[0]]._aData = a, ea(b[0], this[0], "data"), this)
            })), p("row().node()", (function() {
                var a = this.context;
                return a.length && this.length && a[0].aoData[this[0]].nTr || null
            })), p("row.add()", (function(a) {
                a instanceof h && a.length && (a = a[0]);
                var b = this.iterator("table", (function(b) {
                    return a.nodeName && "TR" === a.nodeName.toUpperCase() ? ma(b, a)[0] : L(b, a)
                }));
                return this.row(b[0])
            }));
            var bb = function(a, b) {
                    var c = a.context;
                    c.length && (c = c[0].aoData[b !== k ? b : a[0]]) && c._details && (c._details.remove(), c._detailsShow = k, c._details = k)
                },
                Vb = function(a, b) {
                    var c = a.context;
                    if (c.length && a.length) {
                        var d = c[0].aoData[a[0]];
                        if (d._details) {
                            (d._detailsShow = b) ? d._details.insertAfter(d.nTr): d._details.detach();
                            var e = c[0],
                                f = new t(e),
                                g = e.aoData;
                            f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details"), 0 < D(g, "_details").length && (f.on("draw.dt.DT_details", (function(a, b) {
                                e === b && f.rows({
                                    page: "current"
                                }).eq(0).each((function(a) {
                                    (a = g[a])._detailsShow && a._details.insertAfter(a.nTr)
                                }))
                            })), f.on("column-visibility.dt.DT_details", (function(a, b) {
                                if (e === b)
                                    for (var c, d = ca(b), f = 0, h = g.length; f < h; f++)(c = g[f])._details && c._details.children("td[colspan]").attr("colspan", d)
                            })), f.on("destroy.dt.DT_details", (function(a, b) {
                                if (e === b)
                                    for (var c = 0, d = g.length; c < d; c++) g[c]._details && bb(f, c)
                            })))
                        }
                    }
                };
            p("row().child()", (function(a, b) {
                var c = this.context;
                if (a === k) return c.length && this.length ? c[0].aoData[this[0]]._details : k;
                if (!0 === a) this.child.show();
                else if (!1 === a) bb(this);
                else if (c.length && this.length) {
                    var d = c[0],
                        e = (c = c[0].aoData[this[0]], []),
                        f = function(a, b) {
                            if (h.isArray(a) || a instanceof h)
                                for (var c = 0, k = a.length; c < k; c++) f(a[c], b);
                            else a.nodeName && "tr" === a.nodeName.toLowerCase() ? e.push(a) : (c = h("<tr><td/></tr>").addClass(b), h("td", c).addClass(b).html(a)[0].colSpan = ca(d), e.push(c[0]))
                        };
                    f(a, b), c._details && c._details.remove(), c._details = h(e), c._detailsShow && c._details.insertAfter(c.nTr)
                }
                return this
            })), p(["row().child.show()", "row().child().show()"], (function() {
                return Vb(this, !0), this
            })), p(["row().child.hide()", "row().child().hide()"], (function() {
                return Vb(this, !1), this
            })), p(["row().child.remove()", "row().child().remove()"], (function() {
                return bb(this), this
            })), p("row().child.isShown()", (function() {
                var a = this.context;
                return a.length && this.length && a[0].aoData[this[0]]._detailsShow || !1
            }));
            var dc = /^(.+):(name|visIdx|visible)$/,
                Wb = function(a, b, c, d, e) {
                    c = [], d = 0;
                    for (var f = e.length; d < f; d++) c.push(B(a, e[d], b));
                    return c
                };
            p("columns()", (function(a, b) {
                a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");
                b = $a(b);
                var c = this.iterator("table", (function(c) {
                    var e = a,
                        f = b,
                        g = c.aoColumns,
                        i = D(g, "sName"),
                        j = D(g, "nTh");
                    return Za("column", e, (function(a) {
                        var b = Pb(a);
                        if ("" === a) return W(g.length);
                        if (null !== b) return [b >= 0 ? b : g.length + b];
                        if ("function" == typeof a) {
                            var e = Da(c, f);
                            return h.map(g, (function(b, f) {
                                return a(f, Wb(c, f, 0, 0, e), j[f]) ? f : null
                            }))
                        }
                        var k = "string" == typeof a ? a.match(dc) : "";
                        if (!k) return h(j).filter(a).map((function() {
                            return h.inArray(this, j)
                        })).toArray();
                        switch (k[2]) {
                            case "visIdx":
                            case "visible":
                                if ((b = parseInt(k[1], 10)) < 0) {
                                    var m = h.map(g, (function(a, b) {
                                        return a.bVisible ? b : null
                                    }));
                                    return [m[m.length + b]]
                                }
                                return [$(c, b)];
                            case "name":
                                return h.map(i, (function(a, b) {
                                    return a === k[1] ? b : null
                                }))
                        }
                    }), c, f)
                }), 1);
                return c.selector.cols = a, c.selector.opts = b, c
            })), s("columns().header()", "column().header()", (function() {
                return this.iterator("column", (function(a, b) {
                    return a.aoColumns[b].nTh
                }), 1)
            })), s("columns().footer()", "column().footer()", (function() {
                return this.iterator("column", (function(a, b) {
                    return a.aoColumns[b].nTf
                }), 1)
            })), s("columns().data()", "column().data()", (function() {
                return this.iterator("column-rows", Wb, 1)
            })), s("columns().dataSrc()", "column().dataSrc()", (function() {
                return this.iterator("column", (function(a, b) {
                    return a.aoColumns[b].mData
                }), 1)
            })), s("columns().cache()", "column().cache()", (function(a) {
                return this.iterator("column-rows", (function(b, c, d, e, f) {
                    return ja(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c)
                }), 1)
            })), s("columns().nodes()", "column().nodes()", (function() {
                return this.iterator("column-rows", (function(a, b, c, d, e) {
                    return ja(a.aoData, e, "anCells", b)
                }), 1)
            })), s("columns().visible()", "column().visible()", (function(a, b) {
                return this.iterator("column", (function(c, d) {
                    if (a === k) return c.aoColumns[d].bVisible;
                    var i, j, m, e = c.aoColumns,
                        f = e[d],
                        g = c.aoData;
                    if (a !== k && f.bVisible !== a) {
                        if (a) {
                            var l = h.inArray(!0, D(e, "bVisible"), d + 1);
                            for (i = 0, j = g.length; i < j; i++) m = g[i].nTr, e = g[i].anCells, m && m.insertBefore(e[d], e[l] || null)
                        } else h(D(c.aoData, "anCells", d)).detach();
                        f.bVisible = a, ga(c, c.aoHeader), ga(c, c.aoFooter), (b === k || b) && (Y(c), (c.oScroll.sX || c.oScroll.sY) && Z(c)), w(c, null, "column-visibility", [c, d, a]), ya(c)
                    }
                }))
            })), s("columns().indexes()", "column().index()", (function(a) {
                return this.iterator("column", (function(b, c) {
                    return "visible" === a ? ba(b, c) : c
                }), 1)
            })), p("columns.adjust()", (function() {
                return this.iterator("table", (function(a) {
                    Y(a)
                }), 1)
            })), p("column.index()", (function(a, b) {
                if (0 !== this.context.length) {
                    var c = this.context[0];
                    if ("fromVisible" === a || "toData" === a) return $(c, b);
                    if ("fromData" === a || "toVisible" === a) return ba(c, b)
                }
            })), p("column()", (function(a, b) {
                return ab(this.columns(a, b))
            })), p("cells()", (function(a, b, c) {
                if (h.isPlainObject(a) && (a.row === k ? (c = a, a = null) : (c = b, b = null)), h.isPlainObject(b) && (c = b, b = null), null === b || b === k) return this.iterator("table", (function(b) {
                    var l, n, p, t, s, u, v, d = a,
                        e = $a(c),
                        f = b.aoData,
                        g = Da(b, e),
                        i = Sb(ja(f, g, "anCells")),
                        j = h([].concat.apply([], i)),
                        m = b.aoColumns.length;
                    return Za("cell", d, (function(a) {
                        var c = "function" == typeof a;
                        if (null === a || a === k || c) {
                            for (n = [], p = 0, t = g.length; p < t; p++)
                                for (l = g[p], s = 0; s < m; s++) u = {
                                    row: l,
                                    column: s
                                }, c ? (v = f[l], a(u, B(b, l, s), v.anCells ? v.anCells[s] : null) && n.push(u)) : n.push(u);
                            return n
                        }
                        return h.isPlainObject(a) ? [a] : j.filter(a).map((function(a, b) {
                            if (b.parentNode) l = b.parentNode._DT_RowIndex;
                            else
                                for (a = 0, t = f.length; a < t; a++)
                                    if (-1 !== h.inArray(b, f[a].anCells)) {
                                        l = a;
                                        break
                                    } return {
                                row: l,
                                column: h.inArray(b, f[l].anCells)
                            }
                        })).toArray()
                    }), b, e)
                }));
                var f, g, i, j, m, d = this.columns(b, c),
                    e = this.rows(a, c),
                    l = this.iterator("table", (function(a, b) {
                        for (f = [], g = 0, i = e[b].length; g < i; g++)
                            for (j = 0, m = d[b].length; j < m; j++) f.push({
                                row: e[b][g],
                                column: d[b][j]
                            });
                        return f
                    }), 1);
                return h.extend(l.selector, {
                    cols: b,
                    rows: a,
                    opts: c
                }), l
            })), s("cells().nodes()", "cell().node()", (function() {
                return this.iterator("cell", (function(a, b, c) {
                    return (a = a.aoData[b].anCells) ? a[c] : k
                }), 1)
            })), p("cells().data()", (function() {
                return this.iterator("cell", (function(a, b, c) {
                    return B(a, b, c)
                }), 1)
            })), s("cells().cache()", "cell().cache()", (function(a) {
                return a = "search" === a ? "_aFilterData" : "_aSortData", this.iterator("cell", (function(b, c, d) {
                    return b.aoData[c][a][d]
                }), 1)
            })), s("cells().render()", "cell().render()", (function(a) {
                return this.iterator("cell", (function(b, c, d) {
                    return B(b, c, d, a)
                }), 1)
            })), s("cells().indexes()", "cell().index()", (function() {
                return this.iterator("cell", (function(a, b, c) {
                    return {
                        row: b,
                        column: c,
                        columnVisible: ba(a, c)
                    }
                }), 1)
            })), s("cells().invalidate()", "cell().invalidate()", (function(a) {
                return this.iterator("cell", (function(b, c, d) {
                    ea(b, c, a, d)
                }))
            })), p("cell()", (function(a, b, c) {
                return ab(this.cells(a, b, c))
            })), p("cell().data()", (function(a) {
                var b = this.context,
                    c = this[0];
                return a === k ? b.length && c.length ? B(b[0], c[0].row, c[0].column) : k : (ib(b[0], c[0].row, c[0].column, a), ea(b[0], c[0].row, "data", c[0].column), this)
            })), p("order()", (function(a, b) {
                var c = this.context;
                return a === k ? 0 !== c.length ? c[0].aaSorting : k : ("number" == typeof a ? a = [
                    [a, b]
                ] : h.isArray(a[0]) || (a = Array.prototype.slice.call(arguments)), this.iterator("table", (function(b) {
                    b.aaSorting = a.slice()
                })))
            })), p("order.listener()", (function(a, b, c) {
                return this.iterator("table", (function(d) {
                    Oa(d, a, b, c)
                }))
            })), p(["columns().order()", "column().order()"], (function(a) {
                var b = this;
                return this.iterator("table", (function(c, d) {
                    var e = [];
                    h.each(b[d], (function(b, c) {
                        e.push([c, a])
                    })), c.aaSorting = e
                }))
            })), p("search()", (function(a, b, c, d) {
                var e = this.context;
                return a === k ? 0 !== e.length ? e[0].oPreviousSearch.sSearch : k : this.iterator("table", (function(e) {
                    e.oFeatures.bFilter && ha(e, h.extend({}, e.oPreviousSearch, {
                        sSearch: a + "",
                        bRegex: null !== b && b,
                        bSmart: null === c || c,
                        bCaseInsensitive: null === d || d
                    }), 1)
                }))
            })), s("columns().search()", "column().search()", (function(a, b, c, d) {
                return this.iterator("column", (function(e, f) {
                    var g = e.aoPreSearchCols;
                    if (a === k) return g[f].sSearch;
                    e.oFeatures.bFilter && (h.extend(g[f], {
                        sSearch: a + "",
                        bRegex: null !== b && b,
                        bSmart: null === c || c,
                        bCaseInsensitive: null === d || d
                    }), ha(e, e.oPreviousSearch, 1))
                }))
            })), p("state()", (function() {
                return this.context.length ? this.context[0].oSavedState : null
            })), p("state.clear()", (function() {
                return this.iterator("table", (function(a) {
                    a.fnStateSaveCallback.call(a.oInstance, a, {})
                }))
            })), p("state.loaded()", (function() {
                return this.context.length ? this.context[0].oLoadedState : null
            })), p("state.save()", (function() {
                return this.iterator("table", (function(a) {
                    ya(a)
                }))
            })), m.versionCheck = m.fnVersionCheck = function(a) {
                for (var c, d, b = m.version.split("."), e = 0, f = (a = a.split(".")).length; e < f; e++)
                    if ((c = parseInt(b[e], 10) || 0) !== (d = parseInt(a[e], 10) || 0)) return c > d;
                return !0
            }, m.isDataTable = m.fnIsDataTable = function(a) {
                var b = h(a).get(0),
                    c = !1;
                return h.each(m.settings, (function(a, e) {
                    var f = e.nScrollHead ? h("table", e.nScrollHead)[0] : null,
                        g = e.nScrollFoot ? h("table", e.nScrollFoot)[0] : null;
                    e.nTable !== b && f !== b && g !== b || (c = !0)
                })), c
            }, m.tables = m.fnTables = function(a) {
                var b = !1;
                h.isPlainObject(a) && (b = a.api, a = a.visible);
                var c = h.map(m.settings, (function(b) {
                    if (!a || a && h(b.nTable).is(":visible")) return b.nTable
                }));
                return b ? new t(c) : c
            }, m.util = {
                throttle: ua,
                escapeRegex: va
            }, m.camelToHungarian = I, p("$()", (function(a, b) {
                var c = this.rows(b).nodes();
                c = h(c);
                return h([].concat(c.filter(a).toArray(), c.find(a).toArray()))
            })), h.each(["on", "one", "off"], (function(a, b) {
                p(b + "()", (function() {
                    var a = Array.prototype.slice.call(arguments);
                    a[0].match(/\.dt\b/) || (a[0] += ".dt");
                    var d = h(this.tables().nodes());
                    return d[b].apply(d, a), this
                }))
            })), p("clear()", (function() {
                return this.iterator("table", (function(a) {
                    na(a)
                }))
            })), p("settings()", (function() {
                return new t(this.context, this.context)
            })), p("init()", (function() {
                var a = this.context;
                return a.length ? a[0].oInit : null
            })), p("data()", (function() {
                return this.iterator("table", (function(a) {
                    return D(a.aoData, "_aData")
                })).flatten()
            })), p("destroy()", (function(a) {
                return a = a || !1, this.iterator("table", (function(b) {
                    var p, c = b.nTableWrapper.parentNode,
                        d = b.oClasses,
                        e = b.nTable,
                        f = b.nTBody,
                        g = b.nTHead,
                        i = b.nTFoot,
                        j = h(e),
                        k = (f = h(f), h(b.nTableWrapper)),
                        l = h.map(b.aoData, (function(a) {
                            return a.nTr
                        }));
                    b.bDestroying = !0, w(b, "aoDestroyCallback", "destroy", [b]), a || new t(b).columns().visible(!0), k.unbind(".DT").find(":not(tbody *)").unbind(".DT"), h(Fa).unbind(".DT-" + b.sInstance), e != g.parentNode && (j.children("thead").detach(), j.append(g)), i && e != i.parentNode && (j.children("tfoot").detach(), j.append(i)), b.aaSorting = [], b.aaSortingFixed = [], xa(b), h(l).removeClass(b.asStripeClasses.join(" ")), h("th, td", g).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone), b.bJUI && (h("th span." + d.sSortIcon + ", td span." + d.sSortIcon, g).detach(), h("th, td", g).each((function() {
                        var a = h("div." + d.sSortJUIWrapper, this);
                        h(this).append(a.contents()), a.detach()
                    }))), f.children().detach(), f.append(l), j[g = a ? "remove" : "detach"](), k[g](), !a && c && (c.insertBefore(e, b.nTableReinsertBefore), j.css("width", b.sDestroyWidth).removeClass(d.sTable), (p = b.asDestroyStripes.length) && f.children().each((function(a) {
                        h(this).addClass(b.asDestroyStripes[a % p])
                    }))), -1 !== (c = h.inArray(b, m.settings)) && m.settings.splice(c, 1)
                }))
            })), h.each(["column", "row", "cell"], (function(a, b) {
                p(b + "s().every()", (function(a) {
                    return this.iterator(b, (function(d, e, f, g, h) {
                        a.call(new t(d)[b](e, "cell" === b ? f : k), e, f, g, h)
                    }))
                }))
            })), p("i18n()", (function(a, b, c) {
                var d = this.context[0];
                return (a = P(a)(d.oLanguage)) === k && (a = b), c !== k && h.isPlainObject(a) && (a = a[c] !== k ? a[c] : a._), a.replace("%d", c)
            })), m.version = "1.10.9", m.settings = [], m.models = {}, m.models.oSearch = {
                bCaseInsensitive: !0,
                sSearch: "",
                bRegex: !1,
                bSmart: !0
            }, m.models.oRow = {
                nTr: null,
                anCells: null,
                _aData: [],
                _aSortData: null,
                _aFilterData: null,
                _sFilterRow: null,
                _sRowStripe: "",
                src: null,
                idx: -1
            }, m.models.oColumn = {
                idx: null,
                aDataSort: null,
                asSorting: null,
                bSearchable: null,
                bSortable: null,
                bVisible: null,
                _sManualType: null,
                _bAttrSrc: !1,
                fnCreatedCell: null,
                fnGetData: null,
                fnSetData: null,
                mData: null,
                mRender: null,
                nTh: null,
                nTf: null,
                sClass: null,
                sContentPadding: null,
                sDefaultContent: null,
                sName: null,
                sSortDataType: "std",
                sSortingClass: null,
                sSortingClassJUI: null,
                sTitle: null,
                sType: null,
                sWidth: null,
                sWidthOrig: null
            }, m.defaults = {
                aaData: null,
                aaSorting: [
                    [0, "asc"]
                ],
                aaSortingFixed: [],
                ajax: null,
                aLengthMenu: [10, 25, 50, 100],
                aoColumns: null,
                aoColumnDefs: null,
                aoSearchCols: [],
                asStripeClasses: null,
                bAutoWidth: !0,
                bDeferRender: !1,
                bDestroy: !1,
                bFilter: !0,
                bInfo: !0,
                bJQueryUI: !1,
                bLengthChange: !0,
                bPaginate: !0,
                bProcessing: !1,
                bRetrieve: !1,
                bScrollCollapse: !1,
                bServerSide: !1,
                bSort: !0,
                bSortMulti: !0,
                bSortCellsTop: !1,
                bSortClasses: !0,
                bStateSave: !1,
                fnCreatedRow: null,
                fnDrawCallback: null,
                fnFooterCallback: null,
                fnFormatNumber: function(a) {
                    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
                },
                fnHeaderCallback: null,
                fnInfoCallback: null,
                fnInitComplete: null,
                fnPreDrawCallback: null,
                fnRowCallback: null,
                fnServerData: null,
                fnServerParams: null,
                fnStateLoadCallback: function(a) {
                    try {
                        return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname))
                    } catch (b) {}
                },
                fnStateLoadParams: null,
                fnStateLoaded: null,
                fnStateSaveCallback: function(a, b) {
                    try {
                        (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b))
                    } catch (c) {}
                },
                fnStateSaveParams: null,
                iStateDuration: 7200,
                iDeferLoading: null,
                iDisplayLength: 10,
                iDisplayStart: 0,
                iTabIndex: 0,
                oClasses: {},
                oLanguage: {
                    oAria: {
                        sSortAscending: ": activate to sort column ascending",
                        sSortDescending: ": activate to sort column descending"
                    },
                    oPaginate: {
                        sFirst: "First",
                        sLast: "Last",
                        sNext: "Next",
                        sPrevious: "Previous"
                    },
                    sEmptyTable: "No data available in table",
                    sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                    sInfoEmpty: "Showing 0 to 0 of 0 entries",
                    sInfoFiltered: "(filtered from _MAX_ total entries)",
                    sInfoPostFix: "",
                    sDecimal: "",
                    sThousands: ",",
                    sLengthMenu: "Show _MENU_ entries",
                    sLoadingRecords: "Loading...",
                    sProcessing: "Processing...",
                    sSearch: "Search:",
                    sSearchPlaceholder: "",
                    sUrl: "",
                    sZeroRecords: "No matching records found"
                },
                oSearch: h.extend({}, m.models.oSearch),
                sAjaxDataProp: "data",
                sAjaxSource: null,
                sDom: "lfrtip",
                searchDelay: null,
                sPaginationType: "simple_numbers",
                sScrollX: "",
                sScrollXInner: "",
                sScrollY: "",
                sServerMethod: "GET",
                renderer: null,
                rowId: "DT_RowId"
            }, X(m.defaults), m.defaults.column = {
                aDataSort: null,
                iDataSort: -1,
                asSorting: ["asc", "desc"],
                bSearchable: !0,
                bSortable: !0,
                bVisible: !0,
                fnCreatedCell: null,
                mData: null,
                mRender: null,
                sCellType: "td",
                sClass: "",
                sContentPadding: "",
                sDefaultContent: null,
                sName: "",
                sSortDataType: "std",
                sTitle: null,
                sType: null,
                sWidth: null
            }, X(m.defaults.column), m.models.oSettings = {
                oFeatures: {
                    bAutoWidth: null,
                    bDeferRender: null,
                    bFilter: null,
                    bInfo: null,
                    bLengthChange: null,
                    bPaginate: null,
                    bProcessing: null,
                    bServerSide: null,
                    bSort: null,
                    bSortMulti: null,
                    bSortClasses: null,
                    bStateSave: null
                },
                oScroll: {
                    bCollapse: null,
                    iBarWidth: 0,
                    sX: null,
                    sXInner: null,
                    sY: null
                },
                oLanguage: {
                    fnInfoCallback: null
                },
                oBrowser: {
                    bScrollOversize: !1,
                    bScrollbarLeft: !1,
                    bBounding: !1,
                    barWidth: 0
                },
                ajax: null,
                aanFeatures: [],
                aoData: [],
                aiDisplay: [],
                aiDisplayMaster: [],
                aIds: {},
                aoColumns: [],
                aoHeader: [],
                aoFooter: [],
                oPreviousSearch: {},
                aoPreSearchCols: [],
                aaSorting: null,
                aaSortingFixed: [],
                asStripeClasses: null,
                asDestroyStripes: [],
                sDestroyWidth: 0,
                aoRowCallback: [],
                aoHeaderCallback: [],
                aoFooterCallback: [],
                aoDrawCallback: [],
                aoRowCreatedCallback: [],
                aoPreDrawCallback: [],
                aoInitComplete: [],
                aoStateSaveParams: [],
                aoStateLoadParams: [],
                aoStateLoaded: [],
                sTableId: "",
                nTable: null,
                nTHead: null,
                nTFoot: null,
                nTBody: null,
                nTableWrapper: null,
                bDeferLoading: !1,
                bInitialised: !1,
                aoOpenRows: [],
                sDom: null,
                searchDelay: null,
                sPaginationType: "two_button",
                iStateDuration: 0,
                aoStateSave: [],
                aoStateLoad: [],
                oSavedState: null,
                oLoadedState: null,
                sAjaxSource: null,
                sAjaxDataProp: null,
                bAjaxDataGet: !0,
                jqXHR: null,
                json: k,
                oAjaxData: k,
                fnServerData: null,
                aoServerParams: [],
                sServerMethod: null,
                fnFormatNumber: null,
                aLengthMenu: null,
                iDraw: 0,
                bDrawing: !1,
                iDrawError: -1,
                _iDisplayLength: 10,
                _iDisplayStart: 0,
                _iRecordsTotal: 0,
                _iRecordsDisplay: 0,
                bJUI: null,
                oClasses: {},
                bFiltered: !1,
                bSorted: !1,
                bSortCellsTop: null,
                oInit: null,
                aoDestroyCallback: [],
                fnRecordsTotal: function() {
                    return "ssp" == y(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
                },
                fnRecordsDisplay: function() {
                    return "ssp" == y(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
                },
                fnDisplayEnd: function() {
                    var a = this._iDisplayLength,
                        b = this._iDisplayStart,
                        c = b + a,
                        d = this.aiDisplay.length,
                        e = this.oFeatures,
                        f = e.bPaginate;
                    return e.bServerSide ? !1 === f || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d || -1 === a ? d : c
                },
                oInstance: null,
                sInstance: null,
                iTabIndex: 0,
                nScrollHead: null,
                nScrollFoot: null,
                aLastSort: [],
                oPlugins: {},
                rowIdFn: null,
                rowId: null
            }, m.ext = v = {
                buttons: {},
                classes: {},
                errMode: "alert",
                feature: [],
                search: [],
                selector: {
                    cell: [],
                    column: [],
                    row: []
                },
                internal: {},
                legacy: {
                    ajax: null
                },
                pager: {},
                renderer: {
                    pageButton: {},
                    header: {}
                },
                order: {},
                type: {
                    detect: [],
                    search: {},
                    order: {}
                },
                _unique: 0,
                fnVersionCheck: m.fnVersionCheck,
                iApiIndex: 0,
                oJUIClasses: {},
                sVersion: m.version
            }, h.extend(v, {
                afnFiltering: v.search,
                aTypes: v.type.detect,
                ofnSearch: v.type.search,
                oSort: v.type.order,
                afnSortData: v.order,
                aoFeatures: v.feature,
                oApi: v.internal,
                oStdClasses: v.classes,
                oPagination: v.pager
            }), h.extend(m.ext.classes, {
                sTable: "dataTable",
                sNoFooter: "no-footer",
                sPageButton: "paginate_button",
                sPageButtonActive: "current",
                sPageButtonDisabled: "disabled",
                sStripeOdd: "odd",
                sStripeEven: "even",
                sRowEmpty: "dataTables_empty",
                sWrapper: "dataTables_wrapper",
                sFilter: "dataTables_filter",
                sInfo: "dataTables_info",
                sPaging: "dataTables_paginate paging_",
                sLength: "dataTables_length",
                sProcessing: "dataTables_processing",
                sSortAsc: "sorting_asc",
                sSortDesc: "sorting_desc",
                sSortable: "sorting",
                sSortableAsc: "sorting_asc_disabled",
                sSortableDesc: "sorting_desc_disabled",
                sSortableNone: "sorting_disabled",
                sSortColumn: "sorting_",
                sFilterInput: "",
                sLengthSelect: "",
                sScrollWrapper: "dataTables_scroll",
                sScrollHead: "dataTables_scrollHead",
                sScrollHeadInner: "dataTables_scrollHeadInner",
                sScrollBody: "dataTables_scrollBody",
                sScrollFoot: "dataTables_scrollFoot",
                sScrollFootInner: "dataTables_scrollFootInner",
                sHeaderTH: "",
                sFooterTH: "",
                sSortJUIAsc: "",
                sSortJUIDesc: "",
                sSortJUI: "",
                sSortJUIAscAllowed: "",
                sSortJUIDescAllowed: "",
                sSortJUIWrapper: "",
                sSortIcon: "",
                sJUIHeader: "",
                sJUIFooter: ""
            });
            var Ea = "",
                G = (Ea = "") + "ui-state-default",
                ka = Ea + "css_right ui-icon ui-icon-",
                Xb = Ea + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
            h.extend(m.ext.oJUIClasses, m.ext.classes, {
                sPageButton: "fg-button ui-button " + G,
                sPageButtonActive: "ui-state-disabled",
                sPageButtonDisabled: "ui-state-disabled",
                sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
                sSortAsc: G + " sorting_asc",
                sSortDesc: G + " sorting_desc",
                sSortable: G + " sorting",
                sSortableAsc: G + " sorting_asc_disabled",
                sSortableDesc: G + " sorting_desc_disabled",
                sSortableNone: G + " sorting_disabled",
                sSortJUIAsc: ka + "triangle-1-n",
                sSortJUIDesc: ka + "triangle-1-s",
                sSortJUI: ka + "carat-2-n-s",
                sSortJUIAscAllowed: ka + "carat-1-n",
                sSortJUIDescAllowed: ka + "carat-1-s",
                sSortJUIWrapper: "DataTables_sort_wrapper",
                sSortIcon: "DataTables_sort_icon",
                sScrollHead: "dataTables_scrollHead " + G,
                sScrollFoot: "dataTables_scrollFoot " + G,
                sHeaderTH: G,
                sFooterTH: G,
                sJUIHeader: Xb + " ui-corner-tl ui-corner-tr",
                sJUIFooter: Xb + " ui-corner-bl ui-corner-br"
            });
            var Mb = m.ext.pager;
            h.extend(Mb, {
                simple: function() {
                    return ["previous", "next"]
                },
                full: function() {
                    return ["first", "previous", "next", "last"]
                },
                numbers: function(a, b) {
                    return [Aa(a, b)]
                },
                simple_numbers: function(a, b) {
                    return ["previous", Aa(a, b), "next"]
                },
                full_numbers: function(a, b) {
                    return ["first", "previous", Aa(a, b), "next", "last"]
                },
                _numbers: Aa,
                numbers_length: 7
            }), h.extend(!0, m.ext.renderer, {
                pageButton: {
                    _: function(a, b, c, d, e, f) {
                        var j, k, p, g = a.oClasses,
                            i = a.oLanguage.oPaginate,
                            l = 0,
                            m = function(b, d) {
                                var p, q, t, s, u = function(b) {
                                    Ta(a, b.data.action, !0)
                                };
                                for (p = 0, q = d.length; p < q; p++)
                                    if (s = d[p], h.isArray(s)) t = h("<" + (s.DT_el || "div") + "/>").appendTo(b), m(t, s);
                                    else {
                                        switch (j = null, k = "", s) {
                                            case "ellipsis":
                                                b.append('<span class="ellipsis">&#x2026;</span>');
                                                break;
                                            case "first":
                                                j = i.sFirst, k = s + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                                                break;
                                            case "previous":
                                                j = i.sPrevious, k = s + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                                                break;
                                            case "next":
                                                j = i.sNext, k = s + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                                                break;
                                            case "last":
                                                j = i.sLast, k = s + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                                                break;
                                            default:
                                                j = s + 1, k = e === s ? g.sPageButtonActive : ""
                                        }
                                        null !== j && (Va(t = h("<a>", {
                                            class: g.sPageButton + " " + k,
                                            "aria-controls": a.sTableId,
                                            "data-dt-idx": l,
                                            tabindex: a.iTabIndex,
                                            id: 0 === c && "string" == typeof s ? a.sTableId + "_" + s : null
                                        }).html(j).appendTo(b), {
                                            action: s
                                        }, u), l++)
                                    }
                            };
                        try {
                            p = h(b).find(T.activeElement).data("dt-idx")
                        } catch (t) {}
                        m(h(b).empty(), d), p && h(b).find("[data-dt-idx=" + p + "]").focus()
                    }
                }
            }), h.extend(m.ext.type.detect, [function(a, b) {
                var c = b.oLanguage.sDecimal;
                return Ya(a, c) ? "num" + c : null
            }, function(a) {
                if (a && !(a instanceof Date) && (!ac.test(a) || !bc.test(a))) return null;
                var b = Date.parse(a);
                return null !== b && !isNaN(b) || K(a) ? "date" : null
            }, function(a, b) {
                var c = b.oLanguage.sDecimal;
                return Ya(a, c, !0) ? "num-fmt" + c : null
            }, function(a, b) {
                var c = b.oLanguage.sDecimal;
                return Rb(a, c) ? "html-num" + c : null
            }, function(a, b) {
                var c = b.oLanguage.sDecimal;
                return Rb(a, c, !0) ? "html-num-fmt" + c : null
            }, function(a) {
                return K(a) || "string" == typeof a && -1 !== a.indexOf("<") ? "html" : null
            }]), h.extend(m.ext.type.search, {
                html: function(a) {
                    return K(a) ? a : "string" == typeof a ? a.replace(Ob, " ").replace(Ca, "") : ""
                },
                string: function(a) {
                    return K(a) ? a : "string" == typeof a ? a.replace(Ob, " ") : a
                }
            });
            var Ba = function(a, b, c, d) {
                return 0 === a || a && "-" !== a ? (b && (a = Qb(a, b)), a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, ""))), 1 * a) : -1 / 0
            };
            return h.extend(v.type.order, {
                "date-pre": function(a) {
                    return Date.parse(a) || 0
                },
                "html-pre": function(a) {
                    return K(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + ""
                },
                "string-pre": function(a) {
                    return K(a) ? "" : "string" == typeof a ? a.toLowerCase() : a.toString ? a.toString() : ""
                },
                "string-asc": function(a, b) {
                    return a < b ? -1 : a > b ? 1 : 0
                },
                "string-desc": function(a, b) {
                    return a < b ? 1 : a > b ? -1 : 0
                }
            }), cb(""), h.extend(!0, m.ext.renderer, {
                header: {
                    _: function(a, b, c, d) {
                        h(a.nTable).on("order.dt.DT", (function(e, f, g, h) {
                            a === f && (e = c.idx, b.removeClass(c.sSortingClass + " " + d.sSortAsc + " " + d.sSortDesc).addClass("asc" == h[e] ? d.sSortAsc : "desc" == h[e] ? d.sSortDesc : c.sSortingClass))
                        }))
                    },
                    jqueryui: function(a, b, c, d) {
                        h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b), h(a.nTable).on("order.dt.DT", (function(e, f, g, h) {
                            a === f && (e = c.idx, b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass("asc" == h[e] ? d.sSortAsc : "desc" == h[e] ? d.sSortDesc : c.sSortingClass), b.find("span." + d.sSortIcon).removeClass(d.sSortJUIAsc + " " + d.sSortJUIDesc + " " + d.sSortJUI + " " + d.sSortJUIAscAllowed + " " + d.sSortJUIDescAllowed).addClass("asc" == h[e] ? d.sSortJUIAsc : "desc" == h[e] ? d.sSortJUIDesc : c.sSortingClassJUI))
                        }))
                    }
                }
            }), m.render = {
                number: function(a, b, c, d, e) {
                    return {
                        display: function(f) {
                            if ("number" != typeof f && "string" != typeof f) return f;
                            var g = 0 > f ? "-" : "",
                                h = (f = Math.abs(parseFloat(f)), parseInt(f, 10));
                            f = c ? b + (f - h).toFixed(c).substring(2) : "";
                            return g + (d || "") + h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + f + (e || "")
                        }
                    }
                }
            }, h.extend(m.ext.internal, {
                _fnExternApiFunc: Nb,
                _fnBuildAjax: ra,
                _fnAjaxUpdate: lb,
                _fnAjaxParameters: ub,
                _fnAjaxUpdateDraw: vb,
                _fnAjaxDataSrc: sa,
                _fnAddColumn: Ga,
                _fnColumnOptions: la,
                _fnAdjustColumnSizing: Y,
                _fnVisibleToColumnIndex: $,
                _fnColumnIndexToVisible: ba,
                _fnVisbleColumns: ca,
                _fnGetColumns: aa,
                _fnColumnTypes: Ia,
                _fnApplyColumnDefs: hb,
                _fnHungarianMap: X,
                _fnCamelToHungarian: I,
                _fnLanguageCompat: S,
                _fnBrowserDetect: fb,
                _fnAddData: L,
                _fnAddTr: ma,
                _fnNodeToDataIndex: function(a, b) {
                    return b._DT_RowIndex !== k ? b._DT_RowIndex : null
                },
                _fnNodeToColumnIndex: function(a, b, c) {
                    return h.inArray(c, a.aoData[b].anCells)
                },
                _fnGetCellData: B,
                _fnSetCellData: ib,
                _fnSplitObjNotation: La,
                _fnGetObjectDataFn: P,
                _fnSetObjectDataFn: Q,
                _fnGetDataMaster: Ma,
                _fnClearTable: na,
                _fnDeleteIndex: oa,
                _fnInvalidate: ea,
                _fnGetRowElements: Ka,
                _fnCreateTr: Ja,
                _fnBuildHead: kb,
                _fnDrawHead: ga,
                _fnDraw: M,
                _fnReDraw: R,
                _fnAddOptionsHtml: nb,
                _fnDetectHeader: fa,
                _fnGetUniqueThs: qa,
                _fnFeatureHtmlFilter: pb,
                _fnFilterComplete: ha,
                _fnFilterCustom: yb,
                _fnFilterColumn: xb,
                _fnFilter: wb,
                _fnFilterCreateSearch: Qa,
                _fnEscapeRegex: va,
                _fnFilterData: zb,
                _fnFeatureHtmlInfo: sb,
                _fnUpdateInfo: Cb,
                _fnInfoMacros: Db,
                _fnInitialise: ia,
                _fnInitComplete: ta,
                _fnLengthChange: Ra,
                _fnFeatureHtmlLength: ob,
                _fnFeatureHtmlPaginate: tb,
                _fnPageChange: Ta,
                _fnFeatureHtmlProcessing: qb,
                _fnProcessingDisplay: C,
                _fnFeatureHtmlTable: rb,
                _fnScrollDraw: Z,
                _fnApplyToChildren: H,
                _fnCalculateColumnWidths: Ha,
                _fnThrottle: ua,
                _fnConvertToWidth: Fb,
                _fnGetWidestNode: Gb,
                _fnGetMaxLenString: Hb,
                _fnStringToCss: u,
                _fnSortFlatten: V,
                _fnSort: mb,
                _fnSortAria: Jb,
                _fnSortListener: Ua,
                _fnSortAttachListener: Oa,
                _fnSortingClasses: xa,
                _fnSortData: Ib,
                _fnSaveState: ya,
                _fnLoadState: Kb,
                _fnSettingsFromNode: za,
                _fnLog: J,
                _fnMap: F,
                _fnBindAction: Va,
                _fnCallbackReg: z,
                _fnCallbackFire: w,
                _fnLengthOverflow: Sa,
                _fnRenderer: Pa,
                _fnDataSource: y,
                _fnRowAttributes: Na,
                _fnCalculateEnd: function() {}
            }), h.fn.dataTable = m, h.fn.dataTableSettings = m.settings, h.fn.dataTableExt = m.ext, h.fn.DataTable = function(a) {
                return h(this).dataTable(a).api()
            }, h.each(m, (function(a, b) {
                h.fn.DataTable[a] = b
            })), h.fn.dataTable
        };
        "function" == typeof define && define.amd ? define("datatables", ["jquery"], S) : "object" == typeof exports ? module.exports = S(require("jquery")) : jQuery && !jQuery.fn.dataTable && S(jQuery)
    }(window, document),
    function($, undefined) {
        var rails;
        (function() {
            var events = $._data(document, "events");
            return events && events.click && $.grep(events.click, (function(e) {
                return "rails" === e.namespace
            })).length
        })() && $.error("jquery-ujs has already been loaded!"), $.rails = rails = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
            disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
            fileInputSelector: "input:file",
            linkDisableSelector: "a[data-disable-with]",
            CSRFProtection: function(xhr) {
                var token = $('meta[name="csrf-token"]').attr("content");
                token && xhr.setRequestHeader("X-CSRF-Token", token)
            },
            fire: function(obj, name, data) {
                var event = $.Event(name);
                return obj.trigger(event, data), !1 !== event.result
            },
            confirm: function(message) {
                return confirm(message)
            },
            ajax: function(options) {
                return $.ajax(options)
            },
            href: function(element) {
                return element.attr("href")
            },
            handleRemote: function(element) {
                var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;
                if (rails.fire(element, "ajax:before")) {
                    if (crossDomain = (elCrossDomain = element.data("cross-domain")) === undefined ? null : elCrossDomain, withCredentials = element.data("with-credentials") || null, dataType = element.data("type") || $.ajaxSettings && $.ajaxSettings.dataType, element.is("form")) {
                        method = element.attr("method"), url = element.attr("action"), data = element.serializeArray();
                        var button = element.data("ujs:submit-button");
                        button && (data.push(button), element.data("ujs:submit-button", null))
                    } else element.is(rails.inputChangeSelector) ? (method = element.data("method"), url = element.data("url"), data = element.serialize(), element.data("params") && (data = data + "&" + element.data("params"))) : (method = element.data("method"), url = rails.href(element), data = element.data("params") || null);
                    options = {
                        type: method || "GET",
                        data: data,
                        dataType: dataType,
                        beforeSend: function(xhr, settings) {
                            return settings.dataType === undefined && xhr.setRequestHeader("accept", "*/*;q=0.5, " + settings.accepts.script), rails.fire(element, "ajax:beforeSend", [xhr, settings])
                        },
                        success: function(data, status, xhr) {
                            element.trigger("ajax:success", [data, status, xhr])
                        },
                        complete: function(xhr, status) {
                            element.trigger("ajax:complete", [xhr, status])
                        },
                        error: function(xhr, status, error) {
                            element.trigger("ajax:error", [xhr, status, error])
                        },
                        xhrFields: {
                            withCredentials: withCredentials
                        },
                        crossDomain: crossDomain
                    }, url && (options.url = url);
                    var jqxhr = rails.ajax(options);
                    return element.trigger("ajax:send", jqxhr), jqxhr
                }
                return !1
            },
            handleMethod: function(link) {
                var href = rails.href(link),
                    method = link.data("method"),
                    target = link.attr("target"),
                    csrf_token = $("meta[name=csrf-token]").attr("content"),
                    csrf_param = $("meta[name=csrf-param]").attr("content"),
                    form = $('<form method="post" action="' + href + '"></form>'),
                    metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';
                csrf_param !== undefined && csrf_token !== undefined && (metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />'), target && form.attr("target", target), form.hide().append(metadata_input).appendTo("body"), form.submit()
            },
            disableFormElements: function(form) {
                form.find(rails.disableSelector).each((function() {
                    var element = $(this),
                        method = element.is("button") ? "html" : "val";
                    element.data("ujs:enable-with", element[method]()), element[method](element.data("disable-with")), element.prop("disabled", !0)
                }))
            },
            enableFormElements: function(form) {
                form.find(rails.enableSelector).each((function() {
                    var element = $(this),
                        method = element.is("button") ? "html" : "val";
                    element.data("ujs:enable-with") && element[method](element.data("ujs:enable-with")), element.prop("disabled", !1)
                }))
            },
            allowAction: function(element) {
                var callback, message = element.data("confirm"),
                    answer = !1;
                return !message || (rails.fire(element, "confirm") && (answer = rails.confirm(message), callback = rails.fire(element, "confirm:complete", [answer])), answer && callback)
            },
            blankInputs: function(form, specifiedSelector, nonBlank) {
                var input, valueToCheck, inputs = $(),
                    selector = specifiedSelector || "input,textarea";
                return form.find(selector).each((function() {
                    input = $(this), valueToCheck = input.is(":checkbox,:radio") ? input.is(":checked") : input.val(), 0 == parseInt(valueToCheck) || valueToCheck == !!nonBlank && (inputs = inputs.add(input))
                })), !!inputs.length && inputs
            },
            nonBlankInputs: function(form, specifiedSelector) {
                return rails.blankInputs(form, specifiedSelector, !0)
            },
            stopEverything: function(e) {
                return $(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
            },
            callFormSubmitBindings: function(form, event) {
                var events = form.data("events"),
                    continuePropagation = !0;
                return events !== undefined && events.submit !== undefined && $.each(events.submit, (function(i, obj) {
                    if ("function" == typeof obj.handler) return continuePropagation = obj.handler(event)
                })), continuePropagation
            },
            disableElement: function(element) {
                element.data("ujs:enable-with", element.html()), element.html(element.data("disable-with")), element.bind("click.railsDisable", (function(e) {
                    return rails.stopEverything(e)
                }))
            },
            enableElement: function(element) {
                element.data("ujs:enable-with") !== undefined && (element.html(element.data("ujs:enable-with")), element.data("ujs:enable-with", !1)), element.unbind("click.railsDisable")
            }
        }, rails.fire($(document), "rails:attachBindings") && ($.ajaxPrefilter((function(options, originalOptions, xhr) {
            options.crossDomain || rails.CSRFProtection(xhr)
        })), $(document).delegate(rails.linkDisableSelector, "ajax:complete", (function() {
            rails.enableElement($(this))
        })), $(document).delegate(rails.linkClickSelector, "click.rails", (function(e) {
            var link = $(this),
                method = link.data("method"),
                data = link.data("params");
            if (!rails.allowAction(link)) return rails.stopEverything(e);
            if (link.is(rails.linkDisableSelector) && rails.disableElement(link), link.data("remote") !== undefined) {
                if ((e.metaKey || e.ctrlKey) && (!method || "GET" === method) && !data) return !0;
                var handleRemote = rails.handleRemote(link);
                return !1 === handleRemote ? rails.enableElement(link) : handleRemote.error((function() {
                    rails.enableElement(link)
                })), !1
            }
            return link.data("method") ? (rails.handleMethod(link), !1) : void 0
        })), $(document).delegate(rails.inputChangeSelector, "change.rails", (function(e) {
            var link = $(this);
            return rails.allowAction(link) ? (rails.handleRemote(link), !1) : rails.stopEverything(e)
        })), $(document).delegate(rails.formSubmitSelector, "submit.rails", (function(e) {
            var form = $(this),
                remote = form.data("remote") !== undefined,
                blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
                nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
            return rails.allowAction(form) ? blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, "ajax:aborted:required", [blankRequiredInputs]) ? rails.stopEverything(e) : remote ? nonBlankFileInputs ? (setTimeout((function() {
                rails.disableFormElements(form)
            }), 13), rails.fire(form, "ajax:aborted:file", [nonBlankFileInputs])) : !$.support.submitBubbles && $().jquery < "1.7" && !1 === rails.callFormSubmitBindings(form, e) ? rails.stopEverything(e) : (rails.handleRemote(form), !1) : void setTimeout((function() {
                rails.disableFormElements(form)
            }), 13) : rails.stopEverything(e)
        })), $(document).delegate(rails.formInputClickSelector, "click.rails", (function(event) {
            var button = $(this);
            if (!rails.allowAction(button)) return rails.stopEverything(event);
            var name = button.attr("name"),
                data = name ? {
                    name: name,
                    value: button.val()
                } : null;
            button.closest("form").data("ujs:submit-button", data)
        })), $(document).delegate(rails.formSubmitSelector, "ajax:beforeSend.rails", (function(event) {
            this == event.target && rails.disableFormElements($(this))
        })), $(document).delegate(rails.formSubmitSelector, "ajax:complete.rails", (function(event) {
            this == event.target && rails.enableFormElements($(this))
        })), $((function() {
            csrf_token = $("meta[name=csrf-token]").attr("content"), csrf_param = $("meta[name=csrf-param]").attr("content"), $('form input[name="' + csrf_param + '"]').val(csrf_token)
        })))
    }(jQuery),
    function() {
        function n(n, t, r) {
            switch (r.length) {
                case 0:
                    return n.call(t);
                case 1:
                    return n.call(t, r[0]);
                case 2:
                    return n.call(t, r[0], r[1]);
                case 3:
                    return n.call(t, r[0], r[1], r[2])
            }
            return n.apply(t, r)
        }

        function t(n, t, r, e) {
            for (var u = -1, i = null == n ? 0 : n.length; ++u < i;) {
                var o = n[u];
                t(e, o, r(o), n)
            }
            return e
        }

        function r(n, t) {
            for (var r = -1, e = null == n ? 0 : n.length; ++r < e && !1 !== t(n[r], r, n););
            return n
        }

        function e(n, t) {
            for (var r = null == n ? 0 : n.length; r-- && !1 !== t(n[r], r, n););
            return n
        }

        function u(n, t) {
            for (var r = -1, e = null == n ? 0 : n.length; ++r < e;)
                if (!t(n[r], r, n)) return !1;
            return !0
        }

        function i(n, t) {
            for (var r = -1, e = null == n ? 0 : n.length, u = 0, i = []; ++r < e;) {
                var o = n[r];
                t(o, r, n) && (i[u++] = o)
            }
            return i
        }

        function o(n, t) {
            return !(null == n || !n.length) && -1 < v(n, t, 0)
        }

        function f(n, t, r) {
            for (var e = -1, u = null == n ? 0 : n.length; ++e < u;)
                if (r(t, n[e])) return !0;
            return !1
        }

        function c(n, t) {
            for (var r = -1, e = null == n ? 0 : n.length, u = Array(e); ++r < e;) u[r] = t(n[r], r, n);
            return u
        }

        function a(n, t) {
            for (var r = -1, e = t.length, u = n.length; ++r < e;) n[u + r] = t[r];
            return n
        }

        function l(n, t, r, e) {
            var u = -1,
                i = null == n ? 0 : n.length;
            for (e && i && (r = n[++u]); ++u < i;) r = t(r, n[u], u, n);
            return r
        }

        function s(n, t, r, e) {
            var u = null == n ? 0 : n.length;
            for (e && u && (r = n[--u]); u--;) r = t(r, n[u], u, n);
            return r
        }

        function h(n, t) {
            for (var r = -1, e = null == n ? 0 : n.length; ++r < e;)
                if (t(n[r], r, n)) return !0;
            return !1
        }

        function p(n, t, r) {
            var e;
            return r(n, (function(n, r, u) {
                if (t(n, r, u)) return e = r, !1
            })), e
        }

        function _(n, t, r, e) {
            var u = n.length;
            for (r += e ? 1 : -1; e ? r-- : ++r < u;)
                if (t(n[r], r, n)) return r;
            return -1
        }

        function v(n, t, r) {
            if (t == t) n: {--r;
                for (var e = n.length; ++r < e;)
                    if (n[r] === t) {
                        n = r;
                        break n
                    }
                n = -1
            }
            else n = _(n, d, r);
            return n
        }

        function g(n, t, r, e) {
            --r;
            for (var u = n.length; ++r < u;)
                if (e(n[r], t)) return r;
            return -1
        }

        function d(n) {
            return n != n
        }

        function y(n, t) {
            var r = null == n ? 0 : n.length;
            return r ? m(n, t) / r : F
        }

        function b(n) {
            return function(t) {
                return null == t ? T : t[n]
            }
        }

        function x(n) {
            return function(t) {
                return null == n ? T : n[t]
            }
        }

        function j(n, t, r, e, u) {
            return u(n, (function(n, u, i) {
                r = e ? (e = !1, n) : t(r, n, u, i)
            })), r
        }

        function w(n, t) {
            var r = n.length;
            for (n.sort(t); r--;) n[r] = n[r].c;
            return n
        }

        function m(n, t) {
            for (var r, e = -1, u = n.length; ++e < u;) {
                var i = t(n[e]);
                i !== T && (r = r === T ? i : r + i)
            }
            return r
        }

        function A(n, t) {
            for (var r = -1, e = Array(n); ++r < n;) e[r] = t(r);
            return e
        }

        function E(n, t) {
            return c(t, (function(t) {
                return [t, n[t]]
            }))
        }

        function k(n) {
            return function(t) {
                return n(t)
            }
        }

        function S(n, t) {
            return c(t, (function(t) {
                return n[t]
            }))
        }

        function O(n, t) {
            return n.has(t)
        }

        function I(n, t) {
            for (var r = -1, e = n.length; ++r < e && -1 < v(t, n[r], 0););
            return r
        }

        function R(n, t) {
            for (var r = n.length; r-- && -1 < v(t, n[r], 0););
            return r
        }

        function z(n) {
            return "\\" + Un[n]
        }

        function W(n) {
            var t = -1,
                r = Array(n.size);
            return n.forEach((function(n, e) {
                r[++t] = [e, n]
            })), r
        }

        function B(n, t) {
            return function(r) {
                return n(t(r))
            }
        }

        function L(n, t) {
            for (var r = -1, e = n.length, u = 0, i = []; ++r < e;) {
                var o = n[r];
                o !== t && "__lodash_placeholder__" !== o || (n[r] = "__lodash_placeholder__", i[u++] = r)
            }
            return i
        }

        function U(n) {
            var t = -1,
                r = Array(n.size);
            return n.forEach((function(n) {
                r[++t] = n
            })), r
        }

        function C(n) {
            var t = -1,
                r = Array(n.size);
            return n.forEach((function(n) {
                r[++t] = [n, n]
            })), r
        }

        function D(n) {
            if (Rn.test(n)) {
                for (var t = On.lastIndex = 0; On.test(n);) ++t;
                n = t
            } else n = Qn(n);
            return n
        }

        function M(n) {
            return Rn.test(n) ? n.match(On) || [] : n.split("")
        }
        var T, $ = 1 / 0,
            F = NaN,
            N = [
                ["ary", 128],
                ["bind", 1],
                ["bindKey", 2],
                ["curry", 8],
                ["curryRight", 16],
                ["flip", 512],
                ["partial", 32],
                ["partialRight", 64],
                ["rearg", 256]
            ],
            P = /\b__p\+='';/g,
            Z = /\b(__p\+=)''\+/g,
            q = /(__e\(.*?\)|\b__t\))\+'';/g,
            V = /&(?:amp|lt|gt|quot|#39);/g,
            K = /[&<>"']/g,
            G = RegExp(V.source),
            H = RegExp(K.source),
            J = /<%-([\s\S]+?)%>/g,
            Y = /<%([\s\S]+?)%>/g,
            Q = /<%=([\s\S]+?)%>/g,
            X = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            nn = /^\w*$/,
            tn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            rn = /[\\^$.*+?()[\]{}|]/g,
            en = RegExp(rn.source),
            un = /^\s+|\s+$/g,
            on = /^\s+/,
            fn = /\s+$/,
            cn = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
            an = /\{\n\/\* \[wrapped with (.+)\] \*/,
            ln = /,? & /,
            sn = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
            hn = /\\(\\)?/g,
            pn = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
            _n = /\w*$/,
            vn = /^[-+]0x[0-9a-f]+$/i,
            gn = /^0b[01]+$/i,
            dn = /^\[object .+?Constructor\]$/,
            yn = /^0o[0-7]+$/i,
            bn = /^(?:0|[1-9]\d*)$/,
            xn = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
            jn = /($^)/,
            wn = /['\n\r\u2028\u2029\\]/g,
            mn = "[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?)*",
            An = "(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])" + mn,
            En = "(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]?|[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",
            kn = RegExp("['\u2019]", "g"),
            Sn = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", "g"),
            On = RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|" + En + mn, "g"),
            In = RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])|\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])|\\d+", An].join("|"), "g"),
            Rn = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]"),
            zn = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
            Wn = "Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),
            Bn = {};
        Bn["[object Float32Array]"] = Bn["[object Float64Array]"] = Bn["[object Int8Array]"] = Bn["[object Int16Array]"] = Bn["[object Int32Array]"] = Bn["[object Uint8Array]"] = Bn["[object Uint8ClampedArray]"] = Bn["[object Uint16Array]"] = Bn["[object Uint32Array]"] = !0, Bn["[object Arguments]"] = Bn["[object Array]"] = Bn["[object ArrayBuffer]"] = Bn["[object Boolean]"] = Bn["[object DataView]"] = Bn["[object Date]"] = Bn["[object Error]"] = Bn["[object Function]"] = Bn["[object Map]"] = Bn["[object Number]"] = Bn["[object Object]"] = Bn["[object RegExp]"] = Bn["[object Set]"] = Bn["[object String]"] = Bn["[object WeakMap]"] = !1;
        var Ln = {};
        Ln["[object Arguments]"] = Ln["[object Array]"] = Ln["[object ArrayBuffer]"] = Ln["[object DataView]"] = Ln["[object Boolean]"] = Ln["[object Date]"] = Ln["[object Float32Array]"] = Ln["[object Float64Array]"] = Ln["[object Int8Array]"] = Ln["[object Int16Array]"] = Ln["[object Int32Array]"] = Ln["[object Map]"] = Ln["[object Number]"] = Ln["[object Object]"] = Ln["[object RegExp]"] = Ln["[object Set]"] = Ln["[object String]"] = Ln["[object Symbol]"] = Ln["[object Uint8Array]"] = Ln["[object Uint8ClampedArray]"] = Ln["[object Uint16Array]"] = Ln["[object Uint32Array]"] = !0, Ln["[object Error]"] = Ln["[object Function]"] = Ln["[object WeakMap]"] = !1;
        var Un = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            Cn = parseFloat,
            Dn = parseInt,
            Mn = "object" == typeof global && global && global.Object === Object && global,
            Tn = "object" == typeof self && self && self.Object === Object && self,
            $n = Mn || Tn || Function("return this")(),
            Fn = "object" == typeof exports && exports && !exports.nodeType && exports,
            Nn = Fn && "object" == typeof module && module && !module.nodeType && module,
            Pn = Nn && Nn.exports === Fn,
            Zn = Pn && Mn.process,
            qn = function() {
                try {
                    var n = Nn && Nn.f && Nn.f("util").types;
                    return n || Zn && Zn.binding && Zn.binding("util")
                } catch (n) {}
            }(),
            Vn = qn && qn.isArrayBuffer,
            Kn = qn && qn.isDate,
            Gn = qn && qn.isMap,
            Hn = qn && qn.isRegExp,
            Jn = qn && qn.isSet,
            Yn = qn && qn.isTypedArray,
            Qn = b("length"),
            Xn = x({
                "\xc0": "A",
                "\xc1": "A",
                "\xc2": "A",
                "\xc3": "A",
                "\xc4": "A",
                "\xc5": "A",
                "\xe0": "a",
                "\xe1": "a",
                "\xe2": "a",
                "\xe3": "a",
                "\xe4": "a",
                "\xe5": "a",
                "\xc7": "C",
                "\xe7": "c",
                "\xd0": "D",
                "\xf0": "d",
                "\xc8": "E",
                "\xc9": "E",
                "\xca": "E",
                "\xcb": "E",
                "\xe8": "e",
                "\xe9": "e",
                "\xea": "e",
                "\xeb": "e",
                "\xcc": "I",
                "\xcd": "I",
                "\xce": "I",
                "\xcf": "I",
                "\xec": "i",
                "\xed": "i",
                "\xee": "i",
                "\xef": "i",
                "\xd1": "N",
                "\xf1": "n",
                "\xd2": "O",
                "\xd3": "O",
                "\xd4": "O",
                "\xd5": "O",
                "\xd6": "O",
                "\xd8": "O",
                "\xf2": "o",
                "\xf3": "o",
                "\xf4": "o",
                "\xf5": "o",
                "\xf6": "o",
                "\xf8": "o",
                "\xd9": "U",
                "\xda": "U",
                "\xdb": "U",
                "\xdc": "U",
                "\xf9": "u",
                "\xfa": "u",
                "\xfb": "u",
                "\xfc": "u",
                "\xdd": "Y",
                "\xfd": "y",
                "\xff": "y",
                "\xc6": "Ae",
                "\xe6": "ae",
                "\xde": "Th",
                "\xfe": "th",
                "\xdf": "ss",
                "\u0100": "A",
                "\u0102": "A",
                "\u0104": "A",
                "\u0101": "a",
                "\u0103": "a",
                "\u0105": "a",
                "\u0106": "C",
                "\u0108": "C",
                "\u010a": "C",
                "\u010c": "C",
                "\u0107": "c",
                "\u0109": "c",
                "\u010b": "c",
                "\u010d": "c",
                "\u010e": "D",
                "\u0110": "D",
                "\u010f": "d",
                "\u0111": "d",
                "\u0112": "E",
                "\u0114": "E",
                "\u0116": "E",
                "\u0118": "E",
                "\u011a": "E",
                "\u0113": "e",
                "\u0115": "e",
                "\u0117": "e",
                "\u0119": "e",
                "\u011b": "e",
                "\u011c": "G",
                "\u011e": "G",
                "\u0120": "G",
                "\u0122": "G",
                "\u011d": "g",
                "\u011f": "g",
                "\u0121": "g",
                "\u0123": "g",
                "\u0124": "H",
                "\u0126": "H",
                "\u0125": "h",
                "\u0127": "h",
                "\u0128": "I",
                "\u012a": "I",
                "\u012c": "I",
                "\u012e": "I",
                "\u0130": "I",
                "\u0129": "i",
                "\u012b": "i",
                "\u012d": "i",
                "\u012f": "i",
                "\u0131": "i",
                "\u0134": "J",
                "\u0135": "j",
                "\u0136": "K",
                "\u0137": "k",
                "\u0138": "k",
                "\u0139": "L",
                "\u013b": "L",
                "\u013d": "L",
                "\u013f": "L",
                "\u0141": "L",
                "\u013a": "l",
                "\u013c": "l",
                "\u013e": "l",
                "\u0140": "l",
                "\u0142": "l",
                "\u0143": "N",
                "\u0145": "N",
                "\u0147": "N",
                "\u014a": "N",
                "\u0144": "n",
                "\u0146": "n",
                "\u0148": "n",
                "\u014b": "n",
                "\u014c": "O",
                "\u014e": "O",
                "\u0150": "O",
                "\u014d": "o",
                "\u014f": "o",
                "\u0151": "o",
                "\u0154": "R",
                "\u0156": "R",
                "\u0158": "R",
                "\u0155": "r",
                "\u0157": "r",
                "\u0159": "r",
                "\u015a": "S",
                "\u015c": "S",
                "\u015e": "S",
                "\u0160": "S",
                "\u015b": "s",
                "\u015d": "s",
                "\u015f": "s",
                "\u0161": "s",
                "\u0162": "T",
                "\u0164": "T",
                "\u0166": "T",
                "\u0163": "t",
                "\u0165": "t",
                "\u0167": "t",
                "\u0168": "U",
                "\u016a": "U",
                "\u016c": "U",
                "\u016e": "U",
                "\u0170": "U",
                "\u0172": "U",
                "\u0169": "u",
                "\u016b": "u",
                "\u016d": "u",
                "\u016f": "u",
                "\u0171": "u",
                "\u0173": "u",
                "\u0174": "W",
                "\u0175": "w",
                "\u0176": "Y",
                "\u0177": "y",
                "\u0178": "Y",
                "\u0179": "Z",
                "\u017b": "Z",
                "\u017d": "Z",
                "\u017a": "z",
                "\u017c": "z",
                "\u017e": "z",
                "\u0132": "IJ",
                "\u0133": "ij",
                "\u0152": "Oe",
                "\u0153": "oe",
                "\u0149": "'n",
                "\u017f": "s"
            }),
            nt = x({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }),
            tt = x({
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&#39;": "'"
            }),
            rt = function x(mn) {
                function An(n) {
                    if (du(n) && ! of (n) && !(n instanceof Un)) {
                        if (n instanceof On) return n;
                        if (ii.call(n, "__wrapped__")) return $e(n)
                    }
                    return new On(n)
                }

                function En() {}

                function On(n, t) {
                    this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = T
                }

                function Un(n) {
                    this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = 4294967295, this.__views__ = []
                }

                function Mn(n) {
                    var t = -1,
                        r = null == n ? 0 : n.length;
                    for (this.clear(); ++t < r;) {
                        var e = n[t];
                        this.set(e[0], e[1])
                    }
                }

                function Tn(n) {
                    var t = -1,
                        r = null == n ? 0 : n.length;
                    for (this.clear(); ++t < r;) {
                        var e = n[t];
                        this.set(e[0], e[1])
                    }
                }

                function Fn(n) {
                    var t = -1,
                        r = null == n ? 0 : n.length;
                    for (this.clear(); ++t < r;) {
                        var e = n[t];
                        this.set(e[0], e[1])
                    }
                }

                function Nn(n) {
                    var t = -1,
                        r = null == n ? 0 : n.length;
                    for (this.__data__ = new Fn; ++t < r;) this.add(n[t])
                }

                function Zn(n) {
                    this.size = (this.__data__ = new Tn(n)).size
                }

                function qn(n, t) {
                    var r, e = of (n),
                        u = !e && uf(n),
                        i = !e && !u && cf(n),
                        o = !e && !u && !i && pf(n),
                        f = (u = (e = e || u || i || o) ? A(n.length, Xu) : []).length;
                    for (r in n) !t && !ii.call(n, r) || e && ("length" == r || i && ("offset" == r || "parent" == r) || o && ("buffer" == r || "byteLength" == r || "byteOffset" == r) || Se(r, f)) || u.push(r);
                    return u
                }

                function Qn(n) {
                    var t = n.length;
                    return t ? n[ir(0, t - 1)] : T
                }

                function et(n, t) {
                    return Ce(Ur(n), pt(t, 0, n.length))
                }

                function ut(n) {
                    return Ce(Ur(n))
                }

                function it(n, t, r) {
                    (r === T || au(n[t], r)) && (r !== T || t in n) || st(n, t, r)
                }

                function ot(n, t, r) {
                    var e = n[t];
                    ii.call(n, t) && au(e, r) && (r !== T || t in n) || st(n, t, r)
                }

                function ft(n, t) {
                    for (var r = n.length; r--;)
                        if (au(n[r][0], t)) return r;
                    return -1
                }

                function ct(n, t, r, e) {
                    return eo(n, (function(n, u, i) {
                        t(e, n, r(n), i)
                    })), e
                }

                function at(n, t) {
                    return n && Cr(t, zu(t), n)
                }

                function lt(n, t) {
                    return n && Cr(t, Wu(t), n)
                }

                function st(n, t, r) {
                    "__proto__" == t && mi ? mi(n, t, {
                        configurable: !0,
                        enumerable: !0,
                        value: r,
                        writable: !0
                    }) : n[t] = r
                }

                function ht(n, t) {
                    for (var r = -1, e = t.length, u = Vu(e), i = null == n; ++r < e;) u[r] = i ? T : Iu(n, t[r]);
                    return u
                }

                function pt(n, t, r) {
                    return n == n && (r !== T && (n = n <= r ? n : r), t !== T && (n = n >= t ? n : t)), n
                }

                function _t(n, t, e, u, i, o) {
                    var f, c = 1 & t,
                        a = 2 & t,
                        l = 4 & t;
                    if (e && (f = i ? e(n, u, i, o) : e(n)), f !== T) return f;
                    if (!gu(n)) return n;
                    if (u = of (n)) {
                        if (f = me(n), !c) return Ur(n, f)
                    } else {
                        var s = _o(n),
                            h = "[object Function]" == s || "[object GeneratorFunction]" == s;
                        if (cf(n)) return Ir(n, c);
                        if ("[object Object]" == s || "[object Arguments]" == s || h && !i) {
                            if (f = a || h ? {} : Ae(n), !c) return a ? Mr(n, lt(f, n)) : Dr(n, at(f, n))
                        } else {
                            if (!Ln[s]) return i ? n : {};
                            f = Ee(n, s, c)
                        }
                    }
                    if (o || (o = new Zn), i = o.get(n)) return i;
                    if (o.set(n, f), hf(n)) return n.forEach((function(r) {
                        f.add(_t(r, t, e, r, n, o))
                    })), f;
                    if (lf(n)) return n.forEach((function(r, u) {
                        f.set(u, _t(r, t, e, u, n, o))
                    })), f;
                    a = l ? a ? ve : _e : a ? Wu : zu;
                    var p = u ? T : a(n);
                    return r(p || n, (function(r, u) {
                        p && (r = n[u = r]), ot(f, u, _t(r, t, e, u, n, o))
                    })), f
                }

                function vt(n) {
                    var t = zu(n);
                    return function(r) {
                        return gt(r, n, t)
                    }
                }

                function gt(n, t, r) {
                    var e = r.length;
                    if (null == n) return !e;
                    for (n = Yu(n); e--;) {
                        var u = r[e],
                            i = t[u],
                            o = n[u];
                        if (o === T && !(u in n) || !i(o)) return !1
                    }
                    return !0
                }

                function dt(n, t, r) {
                    if ("function" != typeof n) throw new ni("Expected a function");
                    return yo((function() {
                        n.apply(T, r)
                    }), t)
                }

                function yt(n, t, r, e) {
                    var u = -1,
                        i = o,
                        a = !0,
                        l = n.length,
                        s = [],
                        h = t.length;
                    if (!l) return s;
                    r && (t = c(t, k(r))), e ? (i = f, a = !1) : 200 <= t.length && (i = O, a = !1, t = new Nn(t));
                    n: for (; ++u < l;) {
                        var p = n[u],
                            _ = null == r ? p : r(p);
                        p = e || 0 !== p ? p : 0;
                        if (a && _ == _) {
                            for (var v = h; v--;)
                                if (t[v] === _) continue n;
                            s.push(p)
                        } else i(t, _, e) || s.push(p)
                    }
                    return s
                }

                function bt(n, t) {
                    var r = !0;
                    return eo(n, (function(n, e, u) {
                        return r = !!t(n, e, u)
                    })), r
                }

                function xt(n, t, r) {
                    for (var e = -1, u = n.length; ++e < u;) {
                        var i = n[e],
                            o = t(i);
                        if (null != o && (f === T ? o == o && !ju(o) : r(o, f))) var f = o,
                            c = i
                    }
                    return c
                }

                function jt(n, t) {
                    var r = [];
                    return eo(n, (function(n, e, u) {
                        t(n, e, u) && r.push(n)
                    })), r
                }

                function wt(n, t, r, e, u) {
                    var i = -1,
                        o = n.length;
                    for (r || (r = ke), u || (u = []); ++i < o;) {
                        var f = n[i];
                        0 < t && r(f) ? 1 < t ? wt(f, t - 1, r, e, u) : a(u, f) : e || (u[u.length] = f)
                    }
                    return u
                }

                function mt(n, t) {
                    return n && io(n, t, zu)
                }

                function At(n, t) {
                    return n && oo(n, t, zu)
                }

                function Et(n, t) {
                    return i(t, (function(t) {
                        return pu(n[t])
                    }))
                }

                function kt(n, t) {
                    for (var r = 0, e = (t = Sr(t, n)).length; null != n && r < e;) n = n[De(t[r++])];
                    return r && r == e ? n : T
                }

                function St(n, t, r) {
                    return t = t(n), of (n) ? t : a(t, r(n))
                }

                function Ot(n) {
                    if (null == n) n = n === T ? "[object Undefined]" : "[object Null]";
                    else if (wi && wi in Yu(n)) {
                        var t = ii.call(n, wi),
                            r = n[wi];
                        try {
                            n[wi] = T;
                            var e = !0
                        } catch (n) {}
                        var u = ci.call(n);
                        e && (t ? n[wi] = r : delete n[wi]), n = u
                    } else n = ci.call(n);
                    return n
                }

                function It(n, t) {
                    return n > t
                }

                function Rt(n, t) {
                    return null != n && ii.call(n, t)
                }

                function zt(n, t) {
                    return null != n && t in Yu(n)
                }

                function Wt(n, t, r) {
                    for (var e = r ? f : o, u = n[0].length, i = n.length, a = i, l = Vu(i), s = 1 / 0, h = []; a--;) {
                        var p = n[a];
                        a && t && (p = c(p, k(t))), s = Ui(p.length, s), l[a] = !r && (t || 120 <= u && 120 <= p.length) ? new Nn(a && p) : T
                    }
                    p = n[0];
                    var _ = -1,
                        v = l[0];
                    n: for (; ++_ < u && h.length < s;) {
                        var g = p[_],
                            d = t ? t(g) : g;
                        g = r || 0 !== g ? g : 0;
                        if (v ? !O(v, d) : !e(h, d, r)) {
                            for (a = i; --a;) {
                                var y = l[a];
                                if (y ? !O(y, d) : !e(n[a], d, r)) continue n
                            }
                            v && v.push(d), h.push(g)
                        }
                    }
                    return h
                }

                function Bt(n, t, r) {
                    var e = {};
                    return mt(n, (function(n, u, i) {
                        t(e, r(n), u, i)
                    })), e
                }

                function Lt(t, r, e) {
                    return null == (r = null == (t = 2 > (r = Sr(r, t)).length ? t : kt(t, hr(r, 0, -1))) ? t : t[De(qe(r))]) ? T : n(r, t, e)
                }

                function Ut(n) {
                    return du(n) && "[object Arguments]" == Ot(n)
                }

                function Ct(n) {
                    return du(n) && "[object ArrayBuffer]" == Ot(n)
                }

                function Dt(n) {
                    return du(n) && "[object Date]" == Ot(n)
                }

                function Mt(n, t, r, e, u) {
                    if (n === t) t = !0;
                    else if (null == n || null == t || !du(n) && !du(t)) t = n != n && t != t;
                    else n: {
                        var f, c, i = of (n),
                            o = of (t),
                            a = "[object Object]" == (f = "[object Arguments]" == (f = i ? "[object Array]" : _o(n)) ? "[object Object]" : f);o = "[object Object]" == (c = "[object Arguments]" == (c = o ? "[object Array]" : _o(t)) ? "[object Object]" : c);
                        if ((c = f == c) && cf(n)) {
                            if (!cf(t)) {
                                t = !1;
                                break n
                            }
                            i = !0, a = !1
                        }
                        if (c && !a) u || (u = new Zn),
                        t = i || pf(n) ? se(n, t, r, e, Mt, u) : he(n, t, f, r, e, Mt, u);
                        else {
                            if (!(1 & r) && (i = a && ii.call(n, "__wrapped__"), f = o && ii.call(t, "__wrapped__"), i || f)) {
                                n = i ? n.value() : n, t = f ? t.value() : t, u || (u = new Zn), t = Mt(n, t, r, e, u);
                                break n
                            }
                            if (c) t: if (u || (u = new Zn), i = 1 & r, f = _e(n), o = f.length, c = _e(t).length, o == c || i) {
                                for (a = o; a--;) {
                                    var l = f[a];
                                    if (!(i ? l in t : ii.call(t, l))) {
                                        t = !1;
                                        break t
                                    }
                                }
                                if ((c = u.get(n)) && u.get(t)) t = c == t;
                                else {
                                    c = !0, u.set(n, t), u.set(t, n);
                                    for (var s = i; ++a < o;) {
                                        var h = n[l = f[a]],
                                            p = t[l];
                                        if (e) var _ = i ? e(p, h, l, t, n, u) : e(h, p, l, n, t, u);
                                        if (_ === T ? h !== p && !Mt(h, p, r, e, u) : !_) {
                                            c = !1;
                                            break
                                        }
                                        s || (s = "constructor" == l)
                                    }
                                    c && !s && ((r = n.constructor) != (e = t.constructor) && "constructor" in n && "constructor" in t && !("function" == typeof r && r instanceof r && "function" == typeof e && e instanceof e) && (c = !1)), u.delete(n), u.delete(t), t = c
                                }
                            } else t = !1;
                            else t = !1
                        }
                    }
                    return t
                }

                function Tt(n) {
                    return du(n) && "[object Map]" == _o(n)
                }

                function $t(n, t, r, e) {
                    var u = r.length,
                        i = u,
                        o = !e;
                    if (null == n) return !i;
                    for (n = Yu(n); u--;) {
                        var f = r[u];
                        if (o && f[2] ? f[1] !== n[f[0]] : !(f[0] in n)) return !1
                    }
                    for (; ++u < i;) {
                        var c = (f = r[u])[0],
                            a = n[c],
                            l = f[1];
                        if (o && f[2]) {
                            if (a === T && !(c in n)) return !1
                        } else {
                            if (f = new Zn, e) var s = e(a, l, c, n, t, f);
                            if (s === T ? !Mt(l, a, 3, e, f) : !s) return !1
                        }
                    }
                    return !0
                }

                function Ft(n) {
                    return !(!gu(n) || fi && fi in n) && (pu(n) ? si : dn).test(Me(n))
                }

                function Nt(n) {
                    return du(n) && "[object RegExp]" == Ot(n)
                }

                function Pt(n) {
                    return du(n) && "[object Set]" == _o(n)
                }

                function Zt(n) {
                    return du(n) && vu(n.length) && !!Bn[Ot(n)]
                }

                function qt(n) {
                    return "function" == typeof n ? n : null == n ? Tu : "object" == typeof n ? of (n) ? Jt(n[0], n[1]) : Ht(n) : Pu(n)
                }

                function Vt(n) {
                    if (!ze(n)) return Bi(n);
                    var t, r = [];
                    for (t in Yu(n)) ii.call(n, t) && "constructor" != t && r.push(t);
                    return r
                }

                function Kt(n, t) {
                    return n < t
                }

                function Gt(n, t) {
                    var r = -1,
                        e = lu(n) ? Vu(n.length) : [];
                    return eo(n, (function(n, u, i) {
                        e[++r] = t(n, u, i)
                    })), e
                }

                function Ht(n) {
                    var t = xe(n);
                    return 1 == t.length && t[0][2] ? We(t[0][0], t[0][1]) : function(r) {
                        return r === n || $t(r, n, t)
                    }
                }

                function Jt(n, t) {
                    return Ie(n) && t == t && !gu(t) ? We(De(n), t) : function(r) {
                        var e = Iu(r, n);
                        return e === T && e === t ? Ru(r, n) : Mt(t, e, 3)
                    }
                }

                function Yt(n, t, r, e, u) {
                    n !== t && io(t, (function(i, o) {
                        if (gu(i)) {
                            u || (u = new Zn);
                            var f = u,
                                c = "__proto__" == o ? T : n[o],
                                a = "__proto__" == o ? T : t[o];
                            if (l = f.get(a)) it(n, o, l);
                            else {
                                var s = (l = e ? e(c, a, o + "", n, t, f) : T) === T;
                                if (s) {
                                    var h = of (a),
                                        p = !h && cf(a),
                                        _ = !h && !p && pf(a),
                                        l = a;
                                    h || p || _ ? of (c) ? l = c : su(c) ? l = Ur(c) : p ? (s = !1, l = Ir(a, !0)) : _ ? (s = !1, l = zr(a, !0)) : l = [] : bu(a) || uf(a) ? (l = c, uf(c) ? l = Su(c) : (!gu(c) || r && pu(c)) && (l = Ae(a))) : s = !1
                                }
                                s && (f.set(a, l), Yt(l, a, r, e, f), f.delete(a)), it(n, o, l)
                            }
                        } else(f = e ? e("__proto__" == o ? T : n[o], i, o + "", n, t, u) : T) === T && (f = i), it(n, o, f)
                    }), Wu)
                }

                function Qt(n, t) {
                    var r = n.length;
                    if (r) return Se(t += 0 > t ? r : 0, r) ? n[t] : T
                }

                function Xt(n, t, r) {
                    var e = -1;
                    return t = c(t.length ? t : [Tu], k(ye())), n = Gt(n, (function(n) {
                        return {
                            a: c(t, (function(t) {
                                return t(n)
                            })),
                            b: ++e,
                            c: n
                        }
                    })), w(n, (function(n, t) {
                        var e;
                        n: {
                            e = -1;
                            for (var u = n.a, i = t.a, o = u.length, f = r.length; ++e < o;) {
                                var c = Wr(u[e], i[e]);
                                if (c) {
                                    e = e >= f ? c : c * ("desc" == r[e] ? -1 : 1);
                                    break n
                                }
                            }
                            e = n.b - t.b
                        }
                        return e
                    }))
                }

                function nr(n, t) {
                    return tr(n, t, (function(t, r) {
                        return Ru(n, r)
                    }))
                }

                function tr(n, t, r) {
                    for (var e = -1, u = t.length, i = {}; ++e < u;) {
                        var o = t[e],
                            f = kt(n, o);
                        r(f, o) && lr(i, Sr(o, n), f)
                    }
                    return i
                }

                function rr(n) {
                    return function(t) {
                        return kt(t, n)
                    }
                }

                function er(n, t, r, e) {
                    var u = e ? g : v,
                        i = -1,
                        o = t.length,
                        f = n;
                    for (n === t && (t = Ur(t)), r && (f = c(n, k(r))); ++i < o;) {
                        var a = 0,
                            l = t[i];
                        for (l = r ? r(l) : l; - 1 < (a = u(f, l, a, e));) f !== n && bi.call(f, a, 1), bi.call(n, a, 1)
                    }
                    return n
                }

                function ur(n, t) {
                    for (var r = n ? t.length : 0, e = r - 1; r--;) {
                        var u = t[r];
                        if (r == e || u !== i) {
                            var i = u;
                            Se(u) ? bi.call(n, u, 1) : xr(n, u)
                        }
                    }
                }

                function ir(n, t) {
                    return n + Oi(Mi() * (t - n + 1))
                }

                function or(n, t) {
                    var r = "";
                    if (!n || 1 > t || 9007199254740991 < t) return r;
                    do {
                        t % 2 && (r += n), (t = Oi(t / 2)) && (n += n)
                    } while (t);
                    return r
                }

                function fr(n, t) {
                    return bo(Be(n, t, Tu), n + "")
                }

                function cr(n) {
                    return Qn(Lu(n))
                }

                function ar(n, t) {
                    var r = Lu(n);
                    return Ce(r, pt(t, 0, r.length))
                }

                function lr(n, t, r, e) {
                    if (!gu(n)) return n;
                    for (var u = -1, i = (t = Sr(t, n)).length, o = i - 1, f = n; null != f && ++u < i;) {
                        var c = De(t[u]),
                            a = r;
                        if (u != o) {
                            var l = f[c];
                            (a = e ? e(l, c, f) : T) === T && (a = gu(l) ? l : Se(t[u + 1]) ? [] : {})
                        }
                        ot(f, c, a), f = f[c]
                    }
                    return n
                }

                function sr(n) {
                    return Ce(Lu(n))
                }

                function hr(n, t, r) {
                    var e = -1,
                        u = n.length;
                    for (0 > t && (t = -t > u ? 0 : u + t), 0 > (r = r > u ? u : r) && (r += u), u = t > r ? 0 : r - t >>> 0, t >>>= 0, r = Vu(u); ++e < u;) r[e] = n[e + t];
                    return r
                }

                function pr(n, t) {
                    var r;
                    return eo(n, (function(n, e, u) {
                        return !(r = t(n, e, u))
                    })), !!r
                }

                function _r(n, t, r) {
                    var e = 0,
                        u = null == n ? e : n.length;
                    if ("number" == typeof t && t == t && 2147483647 >= u) {
                        for (; e < u;) {
                            var i = e + u >>> 1,
                                o = n[i];
                            null !== o && !ju(o) && (r ? o <= t : o < t) ? e = i + 1 : u = i
                        }
                        return u
                    }
                    return vr(n, t, Tu, r)
                }

                function vr(n, t, r, e) {
                    t = r(t);
                    for (var u = 0, i = null == n ? 0 : n.length, o = t != t, f = null === t, c = ju(t), a = t === T; u < i;) {
                        var l = Oi((u + i) / 2),
                            s = r(n[l]),
                            h = s !== T,
                            p = null === s,
                            _ = s == s,
                            v = ju(s);
                        (o ? e || _ : a ? _ && (e || h) : f ? _ && h && (e || !p) : c ? _ && h && !p && (e || !v) : !p && !v && (e ? s <= t : s < t)) ? u = l + 1: i = l
                    }
                    return Ui(i, 4294967294)
                }

                function gr(n, t) {
                    for (var r = -1, e = n.length, u = 0, i = []; ++r < e;) {
                        var o = n[r],
                            f = t ? t(o) : o;
                        if (!r || !au(f, c)) {
                            var c = f;
                            i[u++] = 0 === o ? 0 : o
                        }
                    }
                    return i
                }

                function dr(n) {
                    return "number" == typeof n ? n : ju(n) ? F : +n
                }

                function yr(n) {
                    if ("string" == typeof n) return n;
                    if ( of (n)) return c(n, yr) + "";
                    if (ju(n)) return to ? to.call(n) : "";
                    var t = n + "";
                    return "0" == t && 1 / n == -$ ? "-0" : t
                }

                function br(n, t, r) {
                    var e = -1,
                        u = o,
                        i = n.length,
                        c = !0,
                        a = [],
                        l = a;
                    if (r) c = !1, u = f;
                    else if (200 <= i) {
                        if (u = t ? null : lo(n)) return U(u);
                        c = !1, u = O, l = new Nn
                    } else l = t ? [] : a;
                    n: for (; ++e < i;) {
                        var s = n[e],
                            h = t ? t(s) : s;
                        s = r || 0 !== s ? s : 0;
                        if (c && h == h) {
                            for (var p = l.length; p--;)
                                if (l[p] === h) continue n;
                            t && l.push(h), a.push(s)
                        } else u(l, h, r) || (l !== a && l.push(h), a.push(s))
                    }
                    return a
                }

                function xr(n, t) {
                    return null == (n = 2 > (t = Sr(t, n)).length ? n : kt(n, hr(t, 0, -1))) || delete n[De(qe(t))]
                }

                function jr(n, t, r, e) {
                    for (var u = n.length, i = e ? u : -1;
                        (e ? i-- : ++i < u) && t(n[i], i, n););
                    return r ? hr(n, e ? 0 : i, e ? i + 1 : u) : hr(n, e ? i + 1 : 0, e ? u : i)
                }

                function wr(n, t) {
                    var r = n;
                    return r instanceof Un && (r = r.value()), l(t, (function(n, t) {
                        return t.func.apply(t.thisArg, a([n], t.args))
                    }), r)
                }

                function mr(n, t, r) {
                    var e = n.length;
                    if (2 > e) return e ? br(n[0]) : [];
                    for (var u = -1, i = Vu(e); ++u < e;)
                        for (var o = n[u], f = -1; ++f < e;) f != u && (i[u] = yt(i[u] || o, n[f], t, r));
                    return br(wt(i, 1), t, r)
                }

                function Ar(n, t, r) {
                    for (var e = -1, u = n.length, i = t.length, o = {}; ++e < u;) r(o, n[e], e < i ? t[e] : T);
                    return o
                }

                function Er(n) {
                    return su(n) ? n : []
                }

                function kr(n) {
                    return "function" == typeof n ? n : Tu
                }

                function Sr(n, t) {
                    return of(n) ? n : Ie(n, t) ? [n] : xo(Ou(n))
                }

                function Or(n, t, r) {
                    var e = n.length;
                    return r = r === T ? e : r, !t && r >= e ? n : hr(n, t, r)
                }

                function Ir(n, t) {
                    if (t) return n.slice();
                    var r = n.length;
                    r = vi ? vi(r) : new n.constructor(r);
                    return n.copy(r), r
                }

                function Rr(n) {
                    var t = new n.constructor(n.byteLength);
                    return new _i(t).set(new _i(n)), t
                }

                function zr(n, t) {
                    return new n.constructor(t ? Rr(n.buffer) : n.buffer, n.byteOffset, n.length)
                }

                function Wr(n, t) {
                    if (n !== t) {
                        var r = n !== T,
                            e = null === n,
                            u = n == n,
                            i = ju(n),
                            o = t !== T,
                            f = null === t,
                            c = t == t,
                            a = ju(t);
                        if (!f && !a && !i && n > t || i && o && c && !f && !a || e && o && c || !r && c || !u) return 1;
                        if (!e && !i && !a && n < t || a && r && u && !e && !i || f && r && u || !o && u || !c) return -1
                    }
                    return 0
                }

                function Br(n, t, r, e) {
                    var u = -1,
                        i = n.length,
                        o = r.length,
                        f = -1,
                        c = t.length,
                        a = Li(i - o, 0),
                        l = Vu(c + a);
                    for (e = !e; ++f < c;) l[f] = t[f];
                    for (; ++u < o;)(e || u < i) && (l[r[u]] = n[u]);
                    for (; a--;) l[f++] = n[u++];
                    return l
                }

                function Lr(n, t, r, e) {
                    var u = -1,
                        i = n.length,
                        o = -1,
                        f = r.length,
                        c = -1,
                        a = t.length,
                        l = Li(i - f, 0),
                        s = Vu(l + a);
                    for (e = !e; ++u < l;) s[u] = n[u];
                    for (l = u; ++c < a;) s[l + c] = t[c];
                    for (; ++o < f;)(e || u < i) && (s[l + r[o]] = n[u++]);
                    return s
                }

                function Ur(n, t) {
                    var r = -1,
                        e = n.length;
                    for (t || (t = Vu(e)); ++r < e;) t[r] = n[r];
                    return t
                }

                function Cr(n, t, r, e) {
                    var u = !r;
                    r || (r = {});
                    for (var i = -1, o = t.length; ++i < o;) {
                        var f = t[i],
                            c = e ? e(r[f], n[f], f, r, n) : T;
                        c === T && (c = n[f]), u ? st(r, f, c) : ot(r, f, c)
                    }
                    return r
                }

                function Dr(n, t) {
                    return Cr(n, ho(n), t)
                }

                function Mr(n, t) {
                    return Cr(n, po(n), t)
                }

                function Tr(n, r) {
                    return function(e, u) {
                        var i = of (e) ? t : ct,
                            o = r ? r() : {};
                        return i(e, n, ye(u, 2), o)
                    }
                }

                function $r(n) {
                    return fr((function(t, r) {
                        var e = -1,
                            u = r.length,
                            i = 1 < u ? r[u - 1] : T,
                            o = 2 < u ? r[2] : T;
                        i = 3 < n.length && "function" == typeof i ? (u--, i) : T;
                        for (o && Oe(r[0], r[1], o) && (i = 3 > u ? T : i, u = 1), t = Yu(t); ++e < u;)(o = r[e]) && n(t, o, e, i);
                        return t
                    }))
                }

                function Fr(n, t) {
                    return function(r, e) {
                        if (null == r) return r;
                        if (!lu(r)) return n(r, e);
                        for (var u = r.length, i = t ? u : -1, o = Yu(r);
                            (t ? i-- : ++i < u) && !1 !== e(o[i], i, o););
                        return r
                    }
                }

                function Nr(n) {
                    return function(t, r, e) {
                        for (var u = -1, i = Yu(t), o = (e = e(t)).length; o--;) {
                            var f = e[n ? o : ++u];
                            if (!1 === r(i[f], f, i)) break
                        }
                        return t
                    }
                }

                function Pr(n, t, r) {
                    function e() {
                        return (this && this !== $n && this instanceof e ? i : n).apply(u ? r : this, arguments)
                    }
                    var u = 1 & t,
                        i = Vr(n);
                    return e
                }

                function Zr(n) {
                    return function(t) {
                        t = Ou(t);
                        var r = Rn.test(t) ? M(t) : T,
                            e = r ? r[0] : t.charAt(0);
                        return t = r ? Or(r, 1).join("") : t.slice(1), e[n]() + t
                    }
                }

                function qr(n) {
                    return function(t) {
                        return l(Du(Cu(t).replace(kn, "")), n, "")
                    }
                }

                function Vr(n) {
                    return function() {
                        switch ((t = arguments).length) {
                            case 0:
                                return new n;
                            case 1:
                                return new n(t[0]);
                            case 2:
                                return new n(t[0], t[1]);
                            case 3:
                                return new n(t[0], t[1], t[2]);
                            case 4:
                                return new n(t[0], t[1], t[2], t[3]);
                            case 5:
                                return new n(t[0], t[1], t[2], t[3], t[4]);
                            case 6:
                                return new n(t[0], t[1], t[2], t[3], t[4], t[5]);
                            case 7:
                                return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6])
                        }
                        var t, r = ro(n.prototype);
                        return gu(t = n.apply(r, t)) ? t : r
                    }
                }

                function Kr(t, r, e) {
                    function u() {
                        for (var o = arguments.length, f = Vu(o), c = o, a = de(u); c--;) f[c] = arguments[c];
                        return (o -= (c = 3 > o && f[0] !== a && f[o - 1] !== a ? [] : L(f, a)).length) < e ? ue(t, r, Jr, u.placeholder, T, f, c, T, T, e - o) : n(this && this !== $n && this instanceof u ? i : t, this, f)
                    }
                    var i = Vr(t);
                    return u
                }

                function Gr(n) {
                    return function(t, r, e) {
                        var u = Yu(t);
                        if (!lu(t)) {
                            var i = ye(r, 3);
                            t = zu(t), r = function(n) {
                                return i(u[n], n, u)
                            }
                        }
                        return -1 < (r = n(t, r, e)) ? u[i ? t[r] : r] : T
                    }
                }

                function Hr(n) {
                    return pe((function(t) {
                        var r = t.length,
                            e = r,
                            u = On.prototype.thru;
                        for (n && t.reverse(); e--;) {
                            if ("function" != typeof(i = t[e])) throw new ni("Expected a function");
                            if (u && !o && "wrapper" == ge(i)) var o = new On([], !0)
                        }
                        for (e = o ? e : r; ++e < r;) {
                            var i, f = "wrapper" == (u = ge(i = t[e])) ? so(i) : T;
                            o = f && Re(f[0]) && 424 == f[1] && !f[4].length && 1 == f[9] ? o[ge(f[0])].apply(o, f[3]) : 1 == i.length && Re(i) ? o[u]() : o.thru(i)
                        }
                        return function() {
                            var e = (n = arguments)[0];
                            if (o && 1 == n.length && of (e)) return o.plant(e).value();
                            for (var u = 0, n = r ? t[u].apply(this, n) : e; ++u < r;) n = t[u].call(this, n);
                            return n
                        }
                    }))
                }

                function Jr(n, t, r, e, u, i, o, f, c, a) {
                    function l() {
                        for (var d = arguments.length, y = Vu(d), b = d; b--;) y[b] = arguments[b];
                        if (_) {
                            var x, j = de(l);
                            b = y.length;
                            for (x = 0; b--;) y[b] === j && ++x
                        }
                        if (e && (y = Br(y, e, u, _)), i && (y = Lr(y, i, o, _)), d -= x, _ && d < a) return j = L(y, j), ue(n, t, Jr, l.placeholder, r, y, j, f, c, a - d);
                        if (j = h ? r : this, b = p ? j[n] : n, d = y.length, f) {
                            x = y.length;
                            for (var w = Ui(f.length, x), m = Ur(y); w--;) {
                                var A = f[w];
                                y[w] = Se(A, x) ? m[A] : T
                            }
                        } else v && 1 < d && y.reverse();
                        return s && c < d && (y.length = c), this && this !== $n && this instanceof l && (b = g || Vr(b)), b.apply(j, y)
                    }
                    var s = 128 & t,
                        h = 1 & t,
                        p = 2 & t,
                        _ = 24 & t,
                        v = 512 & t,
                        g = p ? T : Vr(n);
                    return l
                }

                function Yr(n, t) {
                    return function(r, e) {
                        return Bt(r, n, t(e))
                    }
                }

                function Qr(n, t) {
                    return function(r, e) {
                        var u;
                        if (r === T && e === T) return t;
                        if (r !== T && (u = r), e !== T) {
                            if (u === T) return e;
                            "string" == typeof r || "string" == typeof e ? (r = yr(r), e = yr(e)) : (r = dr(r), e = dr(e)), u = n(r, e)
                        }
                        return u
                    }
                }

                function Xr(t) {
                    return pe((function(r) {
                        return r = c(r, k(ye())), fr((function(e) {
                            var u = this;
                            return t(r, (function(t) {
                                return n(t, u, e)
                            }))
                        }))
                    }))
                }

                function ne(n, t) {
                    var r = (t = t === T ? " " : yr(t)).length;
                    return 2 > r ? r ? or(t, n) : t : (r = or(t, Si(n / D(t))), Rn.test(t) ? Or(M(r), 0, n).join("") : r.slice(0, n))
                }

                function te(t, r, e, u) {
                    function i() {
                        for (var r = -1, c = arguments.length, a = -1, l = u.length, s = Vu(l + c), h = this && this !== $n && this instanceof i ? f : t; ++a < l;) s[a] = u[a];
                        for (; c--;) s[a++] = arguments[++r];
                        return n(h, o ? e : this, s)
                    }
                    var o = 1 & r,
                        f = Vr(t);
                    return i
                }

                function re(n) {
                    return function(t, r, e) {
                        e && "number" != typeof e && Oe(t, r, e) && (r = e = T), t = mu(t), r === T ? (r = t, t = 0) : r = mu(r), e = e === T ? t < r ? 1 : -1 : mu(e);
                        var u = -1;
                        r = Li(Si((r - t) / (e || 1)), 0);
                        for (var i = Vu(r); r--;) i[n ? r : ++u] = t, t += e;
                        return i
                    }
                }

                function ee(n) {
                    return function(t, r) {
                        return "string" == typeof t && "string" == typeof r || (t = ku(t), r = ku(r)), n(t, r)
                    }
                }

                function ue(n, t, r, e, u, i, o, f, c, a) {
                    var l = 8 & t;
                    return 4 & (t = (t | (l ? 32 : 64)) & ~(l ? 64 : 32)) || (t &= -4), u = [n, t, u, l ? i : T, l ? o : T, i = l ? T : i, o = l ? T : o, f, c, a], r = r.apply(T, u), Re(n) && go(r, u), r.placeholder = e, Le(r, n, t)
                }

                function ie(n) {
                    var t = Ju[n];
                    return function(n, r) {
                        if (n = ku(n), r = null == r ? 0 : Ui(Au(r), 292)) {
                            var e = (Ou(n) + "e").split("e");
                            return +((e = (Ou(e = t(e[0] + "e" + (+e[1] + r))) + "e").split("e"))[0] + "e" + (+e[1] - r))
                        }
                        return t(n)
                    }
                }

                function oe(n) {
                    return function(t) {
                        var r = _o(t);
                        return "[object Map]" == r ? W(t) : "[object Set]" == r ? C(t) : E(t, n(t))
                    }
                }

                function fe(n, t, r, e, u, i, o, f) {
                    var c = 2 & t;
                    if (!c && "function" != typeof n) throw new ni("Expected a function");
                    var a = e ? e.length : 0;
                    if (a || (t &= -97, e = u = T), o = o === T ? o : Li(Au(o), 0), f = f === T ? f : Au(f), a -= u ? u.length : 0, 64 & t) {
                        var l = e,
                            s = u;
                        e = u = T
                    }
                    var h = c ? T : so(n);
                    return i = [n, t, r, e, u, l, s, i, o, f], h && (t = (r = i[1]) | (n = h[1]), e = 128 == n && 8 == r || 128 == n && 256 == r && i[7].length <= h[8] || 384 == n && h[7].length <= h[8] && 8 == r, 131 > t || e) && (1 & n && (i[2] = h[2], t |= 1 & r ? 0 : 4), (r = h[3]) && (e = i[3], i[3] = e ? Br(e, r, h[4]) : r, i[4] = e ? L(i[3], "__lodash_placeholder__") : h[4]), (r = h[5]) && (e = i[5], i[5] = e ? Lr(e, r, h[6]) : r, i[6] = e ? L(i[5], "__lodash_placeholder__") : h[6]), (r = h[7]) && (i[7] = r), 128 & n && (i[8] = null == i[8] ? h[8] : Ui(i[8], h[8])), null == i[9] && (i[9] = h[9]), i[0] = h[0], i[1] = t), n = i[0], t = i[1], r = i[2], e = i[3], u = i[4], !(f = i[9] = i[9] === T ? c ? 0 : n.length : Li(i[9] - a, 0)) && 24 & t && (t &= -25), Le((h ? fo : go)(t && 1 != t ? 8 == t || 16 == t ? Kr(n, t, f) : 32 != t && 33 != t || u.length ? Jr.apply(T, i) : te(n, t, r, e) : Pr(n, t, r), i), n, t)
                }

                function ce(n, t, r, e) {
                    return n === T || au(n, ri[r]) && !ii.call(e, r) ? t : n
                }

                function ae(n, t, r, e, u, i) {
                    return gu(n) && gu(t) && (i.set(t, n), Yt(n, t, T, ae, i), i.delete(t)), n
                }

                function le(n) {
                    return bu(n) ? T : n
                }

                function se(n, t, r, e, u, i) {
                    var o = 1 & r,
                        f = n.length;
                    if (f != (c = t.length) && !(o && c > f)) return !1;
                    if ((c = i.get(n)) && i.get(t)) return c == t;
                    var c = -1,
                        a = !0,
                        l = 2 & r ? new Nn : T;
                    for (i.set(n, t), i.set(t, n); ++c < f;) {
                        var s = n[c],
                            p = t[c];
                        if (e) var _ = o ? e(p, s, c, t, n, i) : e(s, p, c, n, t, i);
                        if (_ !== T) {
                            if (_) continue;
                            a = !1;
                            break
                        }
                        if (l) {
                            if (!h(t, (function(n, t) {
                                    if (!O(l, t) && (s === n || u(s, n, r, e, i))) return l.push(t)
                                }))) {
                                a = !1;
                                break
                            }
                        } else if (s !== p && !u(s, p, r, e, i)) {
                            a = !1;
                            break
                        }
                    }
                    return i.delete(n), i.delete(t), a
                }

                function he(n, t, r, e, u, i, o) {
                    switch (r) {
                        case "[object DataView]":
                            if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset) break;
                            n = n.buffer, t = t.buffer;
                        case "[object ArrayBuffer]":
                            if (n.byteLength != t.byteLength || !i(new _i(n), new _i(t))) break;
                            return !0;
                        case "[object Boolean]":
                        case "[object Date]":
                        case "[object Number]":
                            return au(+n, +t);
                        case "[object Error]":
                            return n.name == t.name && n.message == t.message;
                        case "[object RegExp]":
                        case "[object String]":
                            return n == t + "";
                        case "[object Map]":
                            var f = W;
                        case "[object Set]":
                            if (f || (f = U), n.size != t.size && !(1 & e)) break;
                            return (r = o.get(n)) ? r == t : (e |= 2, o.set(n, t), t = se(f(n), f(t), e, u, i, o), o.delete(n), t);
                        case "[object Symbol]":
                            if (no) return no.call(n) == no.call(t)
                    }
                    return !1
                }

                function pe(n) {
                    return bo(Be(n, T, Pe), n + "")
                }

                function _e(n) {
                    return St(n, zu, ho)
                }

                function ve(n) {
                    return St(n, Wu, po)
                }

                function ge(n) {
                    for (var t = n.name + "", r = Ki[t], e = ii.call(Ki, t) ? r.length : 0; e--;) {
                        var u = r[e],
                            i = u.func;
                        if (null == i || i == n) return u.name
                    }
                    return t
                }

                function de(n) {
                    return (ii.call(An, "placeholder") ? An : n).placeholder
                }

                function ye() {
                    var n = (n = An.iteratee || $u) === $u ? qt : n;
                    return arguments.length ? n(arguments[0], arguments[1]) : n
                }

                function be(n, t) {
                    var r = n.__data__,
                        e = typeof t;
                    return ("string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t) ? r["string" == typeof t ? "string" : "hash"] : r.map
                }

                function xe(n) {
                    for (var t = zu(n), r = t.length; r--;) {
                        var e = t[r],
                            u = n[e];
                        t[r] = [e, u, u == u && !gu(u)]
                    }
                    return t
                }

                function je(n, t) {
                    var r = null == n ? T : n[t];
                    return Ft(r) ? r : T
                }

                function we(n, t, r) {
                    for (var e = -1, u = (t = Sr(t, n)).length, i = !1; ++e < u;) {
                        var o = De(t[e]);
                        if (!(i = null != n && r(n, o))) break;
                        n = n[o]
                    }
                    return i || ++e != u ? i : !!(u = null == n ? 0 : n.length) && vu(u) && Se(o, u) && ( of (n) || uf(n))
                }

                function me(n) {
                    var t = n.length,
                        r = new n.constructor(t);
                    return t && "string" == typeof n[0] && ii.call(n, "index") && (r.index = n.index, r.input = n.input), r
                }

                function Ae(n) {
                    return "function" != typeof n.constructor || ze(n) ? {} : ro(gi(n))
                }

                function Ee(n, t, r) {
                    var e = n.constructor;
                    switch (t) {
                        case "[object ArrayBuffer]":
                            return Rr(n);
                        case "[object Boolean]":
                        case "[object Date]":
                            return new e(+n);
                        case "[object DataView]":
                            return t = r ? Rr(n.buffer) : n.buffer, new n.constructor(t, n.byteOffset, n.byteLength);
                        case "[object Float32Array]":
                        case "[object Float64Array]":
                        case "[object Int8Array]":
                        case "[object Int16Array]":
                        case "[object Int32Array]":
                        case "[object Uint8Array]":
                        case "[object Uint8ClampedArray]":
                        case "[object Uint16Array]":
                        case "[object Uint32Array]":
                            return zr(n, r);
                        case "[object Map]":
                        case "[object Set]":
                            return new e;
                        case "[object Number]":
                        case "[object String]":
                            return new e(n);
                        case "[object RegExp]":
                            return (t = new n.constructor(n.source, _n.exec(n))).lastIndex = n.lastIndex, t;
                        case "[object Symbol]":
                            return no ? Yu(no.call(n)) : {}
                    }
                }

                function ke(n) {
                    return of(n) || uf(n) || !!(xi && n && n[xi])
                }

                function Se(n, t) {
                    var r = typeof n;
                    return !!(t = null == t ? 9007199254740991 : t) && ("number" == r || "symbol" != r && bn.test(n)) && -1 < n && 0 == n % 1 && n < t
                }

                function Oe(n, t, r) {
                    if (!gu(r)) return !1;
                    var e = typeof t;
                    return !!("number" == e ? lu(r) && Se(t, r.length) : "string" == e && t in r) && au(r[t], n)
                }

                function Ie(n, t) {
                    if ( of (n)) return !1;
                    var r = typeof n;
                    return !("number" != r && "symbol" != r && "boolean" != r && null != n && !ju(n)) || nn.test(n) || !X.test(n) || null != t && n in Yu(t)
                }

                function Re(n) {
                    var t = ge(n),
                        r = An[t];
                    return "function" == typeof r && t in Un.prototype && (n === r || !!(t = so(r)) && n === t[0])
                }

                function ze(n) {
                    var t = n && n.constructor;
                    return n === ("function" == typeof t && t.prototype || ri)
                }

                function We(n, t) {
                    return function(r) {
                        return null != r && r[n] === t && (t !== T || n in Yu(r))
                    }
                }

                function Be(t, r, e) {
                    return r = Li(r === T ? t.length - 1 : r, 0),
                        function() {
                            for (var u = arguments, i = -1, o = Li(u.length - r, 0), f = Vu(o); ++i < o;) f[i] = u[r + i];
                            for (i = -1, o = Vu(r + 1); ++i < r;) o[i] = u[i];
                            return o[r] = e(f), n(t, this, o)
                        }
                }

                function Le(n, t, r) {
                    var e = t + "";
                    t = bo;
                    var u, i = Te;
                    return r = i(u = (u = e.match(an)) ? u[1].split(ln) : [], r), (i = r.length) && (r[u = i - 1] = (1 < i ? "& " : "") + r[u], r = r.join(2 < i ? ", " : " "), e = e.replace(cn, "{\n/* [wrapped with " + r + "] */\n")), t(n, e)
                }

                function Ue(n) {
                    var t = 0,
                        r = 0;
                    return function() {
                        var e = Ci(),
                            u = 16 - (e - r);
                        if (r = e, 0 < u) {
                            if (800 <= ++t) return arguments[0]
                        } else t = 0;
                        return n.apply(T, arguments)
                    }
                }

                function Ce(n, t) {
                    var r = -1,
                        u = (e = n.length) - 1;
                    for (t = t === T ? e : t; ++r < t;) {
                        var e, i = n[e = ir(r, u)];
                        n[e] = n[r], n[r] = i
                    }
                    return n.length = t, n
                }

                function De(n) {
                    if ("string" == typeof n || ju(n)) return n;
                    var t = n + "";
                    return "0" == t && 1 / n == -$ ? "-0" : t
                }

                function Me(n) {
                    if (null != n) {
                        try {
                            return ui.call(n)
                        } catch (n) {}
                        return n + ""
                    }
                    return ""
                }

                function Te(n, t) {
                    return r(N, (function(r) {
                        var e = "_." + r[0];
                        t & r[1] && !o(n, e) && n.push(e)
                    })), n.sort()
                }

                function $e(n) {
                    if (n instanceof Un) return n.clone();
                    var t = new On(n.__wrapped__, n.__chain__);
                    return t.__actions__ = Ur(n.__actions__), t.__index__ = n.__index__, t.__values__ = n.__values__, t
                }

                function Fe(n, t, r) {
                    var e = null == n ? 0 : n.length;
                    return e ? (0 > (r = null == r ? 0 : Au(r)) && (r = Li(e + r, 0)), _(n, ye(t, 3), r)) : -1
                }

                function Ne(n, t, r) {
                    var e = null == n ? 0 : n.length;
                    if (!e) return -1;
                    var u = e - 1;
                    return r !== T && (u = Au(r), u = 0 > r ? Li(e + u, 0) : Ui(u, e - 1)), _(n, ye(t, 3), u, !0)
                }

                function Pe(n) {
                    return null != n && n.length ? wt(n, 1) : []
                }

                function Ze(n) {
                    return n && n.length ? n[0] : T
                }

                function qe(n) {
                    var t = null == n ? 0 : n.length;
                    return t ? n[t - 1] : T
                }

                function Ve(n, t) {
                    return n && n.length && t && t.length ? er(n, t) : n
                }

                function Ke(n) {
                    return null == n ? n : Ti.call(n)
                }

                function Ge(n) {
                    if (!n || !n.length) return [];
                    var t = 0;
                    return n = i(n, (function(n) {
                        if (su(n)) return t = Li(n.length, t), !0
                    })), A(t, (function(t) {
                        return c(n, b(t))
                    }))
                }

                function He(t, r) {
                    if (!t || !t.length) return [];
                    var e = Ge(t);
                    return null == r ? e : c(e, (function(t) {
                        return n(r, T, t)
                    }))
                }

                function Je(n) {
                    return (n = An(n)).__chain__ = !0, n
                }

                function Ye(n, t) {
                    return t(n)
                }

                function Qe() {
                    return this
                }

                function Xe(n, t) {
                    return ( of (n) ? r : eo)(n, ye(t, 3))
                }

                function nu(n, t) {
                    return ( of (n) ? e : uo)(n, ye(t, 3))
                }

                function tu(n, t) {
                    return ( of (n) ? c : Gt)(n, ye(t, 3))
                }

                function ru(n, t, r) {
                    return t = r ? T : t, t = n && null == t ? n.length : t, fe(n, 128, T, T, T, T, t)
                }

                function eu(n, t) {
                    var r;
                    if ("function" != typeof t) throw new ni("Expected a function");
                    return n = Au(n),
                        function() {
                            return 0 < --n && (r = t.apply(this, arguments)), 1 >= n && (t = T), r
                        }
                }

                function uu(n, t, r) {
                    return (n = fe(n, 8, T, T, T, T, T, t = r ? T : t)).placeholder = uu.placeholder, n
                }

                function iu(n, t, r) {
                    return (n = fe(n, 16, T, T, T, T, T, t = r ? T : t)).placeholder = iu.placeholder, n
                }

                function ou(n, t, r) {
                    function e(t) {
                        var r = c,
                            e = a;
                        return c = a = T, _ = t, s = n.apply(e, r)
                    }

                    function u(n) {
                        var r = n - p;
                        return n -= _, p === T || r >= t || 0 > r || g && n >= l
                    }

                    function i() {
                        var n = Ko();
                        if (u(n)) return o(n);
                        var r, e = yo;
                        r = n - _, n = t - (n - p), r = g ? Ui(n, l - r) : n, h = e(i, r)
                    }

                    function o(n) {
                        return h = T, d && c ? e(n) : (c = a = T, s)
                    }

                    function f() {
                        var n = Ko(),
                            r = u(n);
                        if (c = arguments, a = this, p = n, r) {
                            if (h === T) return _ = n = p, h = yo(i, t), v ? e(n) : s;
                            if (g) return h = yo(i, t), e(p)
                        }
                        return h === T && (h = yo(i, t)), s
                    }
                    var c, a, l, s, h, p, _ = 0,
                        v = !1,
                        g = !1,
                        d = !0;
                    if ("function" != typeof n) throw new ni("Expected a function");
                    return t = ku(t) || 0, gu(r) && (v = !!r.leading, l = (g = "maxWait" in r) ? Li(ku(r.maxWait) || 0, t) : l, d = "trailing" in r ? !!r.trailing : d), f.cancel = function() {
                        h !== T && ao(h), _ = 0, c = p = a = h = T
                    }, f.flush = function() {
                        return h === T ? s : o(Ko())
                    }, f
                }

                function fu(n, t) {
                    function r() {
                        var e = arguments,
                            u = t ? t.apply(this, e) : e[0],
                            i = r.cache;
                        return i.has(u) ? i.get(u) : (e = n.apply(this, e), r.cache = i.set(u, e) || i, e)
                    }
                    if ("function" != typeof n || null != t && "function" != typeof t) throw new ni("Expected a function");
                    return r.cache = new(fu.Cache || Fn), r
                }

                function cu(n) {
                    if ("function" != typeof n) throw new ni("Expected a function");
                    return function() {
                        var t = arguments;
                        switch (t.length) {
                            case 0:
                                return !n.call(this);
                            case 1:
                                return !n.call(this, t[0]);
                            case 2:
                                return !n.call(this, t[0], t[1]);
                            case 3:
                                return !n.call(this, t[0], t[1], t[2])
                        }
                        return !n.apply(this, t)
                    }
                }

                function au(n, t) {
                    return n === t || n != n && t != t
                }

                function lu(n) {
                    return null != n && vu(n.length) && !pu(n)
                }

                function su(n) {
                    return du(n) && lu(n)
                }

                function hu(n) {
                    if (!du(n)) return !1;
                    var t = Ot(n);
                    return "[object Error]" == t || "[object DOMException]" == t || "string" == typeof n.message && "string" == typeof n.name && !bu(n)
                }

                function pu(n) {
                    return !!gu(n) && ("[object Function]" == (n = Ot(n)) || "[object GeneratorFunction]" == n || "[object AsyncFunction]" == n || "[object Proxy]" == n)
                }

                function _u(n) {
                    return "number" == typeof n && n == Au(n)
                }

                function vu(n) {
                    return "number" == typeof n && -1 < n && 0 == n % 1 && 9007199254740991 >= n
                }

                function gu(n) {
                    var t = typeof n;
                    return null != n && ("object" == t || "function" == t)
                }

                function du(n) {
                    return null != n && "object" == typeof n
                }

                function yu(n) {
                    return "number" == typeof n || du(n) && "[object Number]" == Ot(n)
                }

                function bu(n) {
                    return !(!du(n) || "[object Object]" != Ot(n)) && (null === (n = gi(n)) || "function" == typeof(n = ii.call(n, "constructor") && n.constructor) && n instanceof n && ui.call(n) == ai)
                }

                function xu(n) {
                    return "string" == typeof n || ! of (n) && du(n) && "[object String]" == Ot(n)
                }

                function ju(n) {
                    return "symbol" == typeof n || du(n) && "[object Symbol]" == Ot(n)
                }

                function wu(n) {
                    if (!n) return [];
                    if (lu(n)) return xu(n) ? M(n) : Ur(n);
                    if (ji && n[ji]) {
                        n = n[ji]();
                        for (var t, r = []; !(t = n.next()).done;) r.push(t.value);
                        return r
                    }
                    return ("[object Map]" == (t = _o(n)) ? W : "[object Set]" == t ? U : Lu)(n)
                }

                function mu(n) {
                    return n ? (n = ku(n)) === $ || n === -$ ? 17976931348623157e292 * (0 > n ? -1 : 1) : n == n ? n : 0 : 0 === n ? n : 0
                }

                function Au(n) {
                    var t = (n = mu(n)) % 1;
                    return n == n ? t ? n - t : n : 0
                }

                function Eu(n) {
                    return n ? pt(Au(n), 0, 4294967295) : 0
                }

                function ku(n) {
                    if ("number" == typeof n) return n;
                    if (ju(n)) return F;
                    if (gu(n) && (n = gu(n = "function" == typeof n.valueOf ? n.valueOf() : n) ? n + "" : n), "string" != typeof n) return 0 === n ? n : +n;
                    n = n.replace(un, "");
                    var t = gn.test(n);
                    return t || yn.test(n) ? Dn(n.slice(2), t ? 2 : 8) : vn.test(n) ? F : +n
                }

                function Su(n) {
                    return Cr(n, Wu(n))
                }

                function Ou(n) {
                    return null == n ? "" : yr(n)
                }

                function Iu(n, t, r) {
                    return (n = null == n ? T : kt(n, t)) === T ? r : n
                }

                function Ru(n, t) {
                    return null != n && we(n, t, zt)
                }

                function zu(n) {
                    return lu(n) ? qn(n) : Vt(n)
                }

                function Wu(n) {
                    if (lu(n)) n = qn(n, !0);
                    else if (gu(n)) {
                        var t, r = ze(n),
                            e = [];
                        for (t in n)("constructor" != t || !r && ii.call(n, t)) && e.push(t);
                        n = e
                    } else {
                        if (t = [], null != n)
                            for (r in Yu(n)) t.push(r);
                        n = t
                    }
                    return n
                }

                function Bu(n, t) {
                    if (null == n) return {};
                    var r = c(ve(n), (function(n) {
                        return [n]
                    }));
                    return t = ye(t), tr(n, r, (function(n, r) {
                        return t(n, r[0])
                    }))
                }

                function Lu(n) {
                    return null == n ? [] : S(n, zu(n))
                }

                function Uu(n) {
                    return Tf(Ou(n).toLowerCase())
                }

                function Cu(n) {
                    return (n = Ou(n)) && n.replace(xn, Xn).replace(Sn, "")
                }

                function Du(n, t, r) {
                    return n = Ou(n), (t = r ? T : t) === T ? zn.test(n) ? n.match(In) || [] : n.match(sn) || [] : n.match(t) || []
                }

                function Mu(n) {
                    return function() {
                        return n
                    }
                }

                function Tu(n) {
                    return n
                }

                function $u(n) {
                    return qt("function" == typeof n ? n : _t(n, 1))
                }

                function Fu(n, t, e) {
                    var u = zu(t),
                        i = Et(t, u);
                    null != e || gu(t) && (i.length || !u.length) || (e = t, t = n, n = this, i = Et(t, zu(t)));
                    var o = !(gu(e) && "chain" in e && !e.chain),
                        f = pu(n);
                    return r(i, (function(r) {
                        var e = t[r];
                        n[r] = e, f && (n.prototype[r] = function() {
                            var t = this.__chain__;
                            if (o || t) {
                                var r = n(this.__wrapped__);
                                return (r.__actions__ = Ur(this.__actions__)).push({
                                    func: e,
                                    args: arguments,
                                    thisArg: n
                                }), r.__chain__ = t, r
                            }
                            return e.apply(n, a([this.value()], arguments))
                        })
                    })), n
                }

                function Nu() {}

                function Pu(n) {
                    return Ie(n) ? b(De(n)) : rr(n)
                }

                function Zu() {
                    return []
                }

                function qu() {
                    return !1
                }
                var Vu = (mn = null == mn ? $n : rt.defaults($n.Object(), mn, rt.pick($n, Wn))).Array,
                    Ku = mn.Date,
                    Gu = mn.Error,
                    Hu = mn.Function,
                    Ju = mn.Math,
                    Yu = mn.Object,
                    Qu = mn.RegExp,
                    Xu = mn.String,
                    ni = mn.TypeError,
                    ti = Vu.prototype,
                    ri = Yu.prototype,
                    ei = mn["__core-js_shared__"],
                    ui = Hu.prototype.toString,
                    ii = ri.hasOwnProperty,
                    oi = 0,
                    fi = function() {
                        var n = /[^.]+$/.exec(ei && ei.keys && ei.keys.IE_PROTO || "");
                        return n ? "Symbol(src)_1." + n : ""
                    }(),
                    ci = ri.toString,
                    ai = ui.call(Yu),
                    li = $n._,
                    si = Qu("^" + ui.call(ii).replace(rn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                    hi = Pn ? mn.Buffer : T,
                    pi = mn.Symbol,
                    _i = mn.Uint8Array,
                    vi = hi ? hi.g : T,
                    gi = B(Yu.getPrototypeOf, Yu),
                    di = Yu.create,
                    yi = ri.propertyIsEnumerable,
                    bi = ti.splice,
                    xi = pi ? pi.isConcatSpreadable : T,
                    ji = pi ? pi.iterator : T,
                    wi = pi ? pi.toStringTag : T,
                    mi = function() {
                        try {
                            var n = je(Yu, "defineProperty");
                            return n({}, "", {}), n
                        } catch (n) {}
                    }(),
                    Ai = mn.clearTimeout !== $n.clearTimeout && mn.clearTimeout,
                    Ei = Ku && Ku.now !== $n.Date.now && Ku.now,
                    ki = mn.setTimeout !== $n.setTimeout && mn.setTimeout,
                    Si = Ju.ceil,
                    Oi = Ju.floor,
                    Ii = Yu.getOwnPropertySymbols,
                    Ri = hi ? hi.isBuffer : T,
                    zi = mn.isFinite,
                    Wi = ti.join,
                    Bi = B(Yu.keys, Yu),
                    Li = Ju.max,
                    Ui = Ju.min,
                    Ci = Ku.now,
                    Di = mn.parseInt,
                    Mi = Ju.random,
                    Ti = ti.reverse,
                    $i = je(mn, "DataView"),
                    Fi = je(mn, "Map"),
                    Ni = je(mn, "Promise"),
                    Pi = je(mn, "Set"),
                    Zi = je(mn, "WeakMap"),
                    qi = je(Yu, "create"),
                    Vi = Zi && new Zi,
                    Ki = {},
                    Gi = Me($i),
                    Hi = Me(Fi),
                    Ji = Me(Ni),
                    Yi = Me(Pi),
                    Qi = Me(Zi),
                    Xi = pi ? pi.prototype : T,
                    no = Xi ? Xi.valueOf : T,
                    to = Xi ? Xi.toString : T,
                    ro = function() {
                        function n() {}
                        return function(t) {
                            return gu(t) ? di ? di(t) : (n.prototype = t, t = new n, n.prototype = T, t) : {}
                        }
                    }();
                An.templateSettings = {
                    escape: J,
                    evaluate: Y,
                    interpolate: Q,
                    variable: "",
                    imports: {
                        _: An
                    }
                }, An.prototype = En.prototype, An.prototype.constructor = An, On.prototype = ro(En.prototype), On.prototype.constructor = On, Un.prototype = ro(En.prototype), Un.prototype.constructor = Un, Mn.prototype.clear = function() {
                    this.__data__ = qi ? qi(null) : {}, this.size = 0
                }, Mn.prototype.delete = function(n) {
                    return n = this.has(n) && delete this.__data__[n], this.size -= n ? 1 : 0, n
                }, Mn.prototype.get = function(n) {
                    var t = this.__data__;
                    return qi ? "__lodash_hash_undefined__" === (n = t[n]) ? T : n : ii.call(t, n) ? t[n] : T
                }, Mn.prototype.has = function(n) {
                    var t = this.__data__;
                    return qi ? t[n] !== T : ii.call(t, n)
                }, Mn.prototype.set = function(n, t) {
                    var r = this.__data__;
                    return this.size += this.has(n) ? 0 : 1, r[n] = qi && t === T ? "__lodash_hash_undefined__" : t, this
                }, Tn.prototype.clear = function() {
                    this.__data__ = [], this.size = 0
                }, Tn.prototype.delete = function(n) {
                    var t = this.__data__;
                    return !(0 > (n = ft(t, n)) || (n == t.length - 1 ? t.pop() : bi.call(t, n, 1), --this.size, 0))
                }, Tn.prototype.get = function(n) {
                    var t = this.__data__;
                    return 0 > (n = ft(t, n)) ? T : t[n][1]
                }, Tn.prototype.has = function(n) {
                    return -1 < ft(this.__data__, n)
                }, Tn.prototype.set = function(n, t) {
                    var r = this.__data__,
                        e = ft(r, n);
                    return 0 > e ? (++this.size, r.push([n, t])) : r[e][1] = t, this
                }, Fn.prototype.clear = function() {
                    this.size = 0, this.__data__ = {
                        hash: new Mn,
                        map: new(Fi || Tn),
                        string: new Mn
                    }
                }, Fn.prototype.delete = function(n) {
                    return n = be(this, n).delete(n), this.size -= n ? 1 : 0, n
                }, Fn.prototype.get = function(n) {
                    return be(this, n).get(n)
                }, Fn.prototype.has = function(n) {
                    return be(this, n).has(n)
                }, Fn.prototype.set = function(n, t) {
                    var r = be(this, n),
                        e = r.size;
                    return r.set(n, t), this.size += r.size == e ? 0 : 1, this
                }, Nn.prototype.add = Nn.prototype.push = function(n) {
                    return this.__data__.set(n, "__lodash_hash_undefined__"), this
                }, Nn.prototype.has = function(n) {
                    return this.__data__.has(n)
                }, Zn.prototype.clear = function() {
                    this.__data__ = new Tn, this.size = 0
                }, Zn.prototype.delete = function(n) {
                    var t = this.__data__;
                    return n = t.delete(n), this.size = t.size, n
                }, Zn.prototype.get = function(n) {
                    return this.__data__.get(n)
                }, Zn.prototype.has = function(n) {
                    return this.__data__.has(n)
                }, Zn.prototype.set = function(n, t) {
                    var r = this.__data__;
                    if (r instanceof Tn) {
                        var e = r.__data__;
                        if (!Fi || 199 > e.length) return e.push([n, t]), this.size = ++r.size, this;
                        r = this.__data__ = new Fn(e)
                    }
                    return r.set(n, t), this.size = r.size, this
                };
                var eo = Fr(mt),
                    uo = Fr(At, !0),
                    io = Nr(),
                    oo = Nr(!0),
                    fo = Vi ? function(n, t) {
                        return Vi.set(n, t), n
                    } : Tu,
                    co = mi ? function(n, t) {
                        return mi(n, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: Mu(t),
                            writable: !0
                        })
                    } : Tu,
                    ao = Ai || function(n) {
                        return $n.clearTimeout(n)
                    },
                    lo = Pi && 1 / U(new Pi([, -0]))[1] == $ ? function(n) {
                        return new Pi(n)
                    } : Nu,
                    so = Vi ? function(n) {
                        return Vi.get(n)
                    } : Nu,
                    ho = Ii ? function(n) {
                        return null == n ? [] : (n = Yu(n), i(Ii(n), (function(t) {
                            return yi.call(n, t)
                        })))
                    } : Zu,
                    po = Ii ? function(n) {
                        for (var t = []; n;) a(t, ho(n)), n = gi(n);
                        return t
                    } : Zu,
                    _o = Ot;
                ($i && "[object DataView]" != _o(new $i(new ArrayBuffer(1))) || Fi && "[object Map]" != _o(new Fi) || Ni && "[object Promise]" != _o(Ni.resolve()) || Pi && "[object Set]" != _o(new Pi) || Zi && "[object WeakMap]" != _o(new Zi)) && (_o = function(n) {
                    var t = Ot(n);
                    if (n = (n = "[object Object]" == t ? n.constructor : T) ? Me(n) : "") switch (n) {
                        case Gi:
                            return "[object DataView]";
                        case Hi:
                            return "[object Map]";
                        case Ji:
                            return "[object Promise]";
                        case Yi:
                            return "[object Set]";
                        case Qi:
                            return "[object WeakMap]"
                    }
                    return t
                });
                var vo = ei ? pu : qu,
                    go = Ue(fo),
                    yo = ki || function(n, t) {
                        return $n.setTimeout(n, t)
                    },
                    bo = Ue(co),
                    xo = function(n) {
                        var t = (n = fu(n, (function(n) {
                            return 500 === t.size && t.clear(), n
                        }))).cache;
                        return n
                    }((function(n) {
                        var t = [];
                        return 46 === n.charCodeAt(0) && t.push(""), n.replace(tn, (function(n, r, e, u) {
                            t.push(e ? u.replace(hn, "$1") : r || n)
                        })), t
                    })),
                    jo = fr((function(n, t) {
                        return su(n) ? yt(n, wt(t, 1, su, !0)) : []
                    })),
                    wo = fr((function(n, t) {
                        var r = qe(t);
                        return su(r) && (r = T), su(n) ? yt(n, wt(t, 1, su, !0), ye(r, 2)) : []
                    })),
                    mo = fr((function(n, t) {
                        var r = qe(t);
                        return su(r) && (r = T), su(n) ? yt(n, wt(t, 1, su, !0), T, r) : []
                    })),
                    Ao = fr((function(n) {
                        var t = c(n, Er);
                        return t.length && t[0] === n[0] ? Wt(t) : []
                    })),
                    Eo = fr((function(n) {
                        var t = qe(n),
                            r = c(n, Er);
                        return t === qe(r) ? t = T : r.pop(), r.length && r[0] === n[0] ? Wt(r, ye(t, 2)) : []
                    })),
                    ko = fr((function(n) {
                        var t = qe(n),
                            r = c(n, Er);
                        return (t = "function" == typeof t ? t : T) && r.pop(), r.length && r[0] === n[0] ? Wt(r, T, t) : []
                    })),
                    So = fr(Ve),
                    Oo = pe((function(n, t) {
                        var r = null == n ? 0 : n.length,
                            e = ht(n, t);
                        return ur(n, c(t, (function(n) {
                            return Se(n, r) ? +n : n
                        })).sort(Wr)), e
                    })),
                    Io = fr((function(n) {
                        return br(wt(n, 1, su, !0))
                    })),
                    Ro = fr((function(n) {
                        var t = qe(n);
                        return su(t) && (t = T), br(wt(n, 1, su, !0), ye(t, 2))
                    })),
                    zo = fr((function(n) {
                        var t = "function" == typeof(t = qe(n)) ? t : T;
                        return br(wt(n, 1, su, !0), T, t)
                    })),
                    Wo = fr((function(n, t) {
                        return su(n) ? yt(n, t) : []
                    })),
                    Bo = fr((function(n) {
                        return mr(i(n, su))
                    })),
                    Lo = fr((function(n) {
                        var t = qe(n);
                        return su(t) && (t = T), mr(i(n, su), ye(t, 2))
                    })),
                    Uo = fr((function(n) {
                        var t = "function" == typeof(t = qe(n)) ? t : T;
                        return mr(i(n, su), T, t)
                    })),
                    Co = fr(Ge),
                    Do = fr((function(n) {
                        var t = "function" == typeof(t = 1 < (t = n.length) ? n[t - 1] : T) ? (n.pop(), t) : T;
                        return He(n, t)
                    })),
                    Mo = pe((function(n) {
                        function t(t) {
                            return ht(t, n)
                        }
                        var r = n.length,
                            e = r ? n[0] : 0,
                            u = this.__wrapped__;
                        return !(1 < r || this.__actions__.length) && u instanceof Un && Se(e) ? ((u = u.slice(e, +e + (r ? 1 : 0))).__actions__.push({
                            func: Ye,
                            args: [t],
                            thisArg: T
                        }), new On(u, this.__chain__).thru((function(n) {
                            return r && !n.length && n.push(T), n
                        }))) : this.thru(t)
                    })),
                    To = Tr((function(n, t, r) {
                        ii.call(n, r) ? ++n[r] : st(n, r, 1)
                    })),
                    $o = Gr(Fe),
                    Fo = Gr(Ne),
                    No = Tr((function(n, t, r) {
                        ii.call(n, r) ? n[r].push(t) : st(n, r, [t])
                    })),
                    Po = fr((function(t, r, e) {
                        var u = -1,
                            i = "function" == typeof r,
                            o = lu(t) ? Vu(t.length) : [];
                        return eo(t, (function(t) {
                            o[++u] = i ? n(r, t, e) : Lt(t, r, e)
                        })), o
                    })),
                    Zo = Tr((function(n, t, r) {
                        st(n, r, t)
                    })),
                    qo = Tr((function(n, t, r) {
                        n[r ? 0 : 1].push(t)
                    }), (function() {
                        return [
                            [],
                            []
                        ]
                    })),
                    Vo = fr((function(n, t) {
                        if (null == n) return [];
                        var r = t.length;
                        return 1 < r && Oe(n, t[0], t[1]) ? t = [] : 2 < r && Oe(t[0], t[1], t[2]) && (t = [t[0]]), Xt(n, wt(t, 1), [])
                    })),
                    Ko = Ei || function() {
                        return $n.Date.now()
                    },
                    Go = fr((function(n, t, r) {
                        var e = 1;
                        if (r.length) {
                            var u = L(r, de(Go));
                            e = 32 | e
                        }
                        return fe(n, e, t, r, u)
                    })),
                    Ho = fr((function(n, t, r) {
                        var e = 3;
                        if (r.length) {
                            var u = L(r, de(Ho));
                            e = 32 | e
                        }
                        return fe(t, e, n, r, u)
                    })),
                    Jo = fr((function(n, t) {
                        return dt(n, 1, t)
                    })),
                    Yo = fr((function(n, t, r) {
                        return dt(n, ku(t) || 0, r)
                    }));
                fu.Cache = Fn;
                var Qo = fr((function(t, r) {
                        var e = (r = 1 == r.length && of (r[0]) ? c(r[0], k(ye())) : c(wt(r, 1), k(ye()))).length;
                        return fr((function(u) {
                            for (var i = -1, o = Ui(u.length, e); ++i < o;) u[i] = r[i].call(this, u[i]);
                            return n(t, this, u)
                        }))
                    })),
                    Xo = fr((function(n, t) {
                        return fe(n, 32, T, t, L(t, de(Xo)))
                    })),
                    nf = fr((function(n, t) {
                        return fe(n, 64, T, t, L(t, de(nf)))
                    })),
                    tf = pe((function(n, t) {
                        return fe(n, 256, T, T, T, t)
                    })),
                    rf = ee(It),
                    ef = ee((function(n, t) {
                        return n >= t
                    })),
                    uf = Ut(function() {
                        return arguments
                    }()) ? Ut : function(n) {
                        return du(n) && ii.call(n, "callee") && !yi.call(n, "callee")
                    },
                    of = Vu.isArray,
                    ff = Vn ? k(Vn) : Ct,
                    cf = Ri || qu,
                    af = Kn ? k(Kn) : Dt,
                    lf = Gn ? k(Gn) : Tt,
                    sf = Hn ? k(Hn) : Nt,
                    hf = Jn ? k(Jn) : Pt,
                    pf = Yn ? k(Yn) : Zt,
                    _f = ee(Kt),
                    vf = ee((function(n, t) {
                        return n <= t
                    })),
                    gf = $r((function(n, t) {
                        if (ze(t) || lu(t)) Cr(t, zu(t), n);
                        else
                            for (var r in t) ii.call(t, r) && ot(n, r, t[r])
                    })),
                    df = $r((function(n, t) {
                        Cr(t, Wu(t), n)
                    })),
                    yf = $r((function(n, t, r, e) {
                        Cr(t, Wu(t), n, e)
                    })),
                    bf = $r((function(n, t, r, e) {
                        Cr(t, zu(t), n, e)
                    })),
                    xf = pe(ht),
                    jf = fr((function(n, t) {
                        n = Yu(n);
                        var r = -1,
                            e = t.length;
                        for ((u = 2 < e ? t[2] : T) && Oe(t[0], t[1], u) && (e = 1); ++r < e;)
                            for (var u, i = Wu(u = t[r]), o = -1, f = i.length; ++o < f;) {
                                var c = i[o],
                                    a = n[c];
                                (a === T || au(a, ri[c]) && !ii.call(n, c)) && (n[c] = u[c])
                            }
                        return n
                    })),
                    wf = fr((function(t) {
                        return t.push(T, ae), n(Sf, T, t)
                    })),
                    mf = Yr((function(n, t, r) {
                        null != t && "function" != typeof t.toString && (t = ci.call(t)), n[t] = r
                    }), Mu(Tu)),
                    Af = Yr((function(n, t, r) {
                        null != t && "function" != typeof t.toString && (t = ci.call(t)), ii.call(n, t) ? n[t].push(r) : n[t] = [r]
                    }), ye),
                    Ef = fr(Lt),
                    kf = $r((function(n, t, r) {
                        Yt(n, t, r)
                    })),
                    Sf = $r((function(n, t, r, e) {
                        Yt(n, t, r, e)
                    })),
                    Of = pe((function(n, t) {
                        var r = {};
                        if (null == n) return r;
                        var e = !1;
                        t = c(t, (function(t) {
                            return t = Sr(t, n), e || (e = 1 < t.length), t
                        })), Cr(n, ve(n), r), e && (r = _t(r, 7, le));
                        for (var u = t.length; u--;) xr(r, t[u]);
                        return r
                    })),
                    If = pe((function(n, t) {
                        return null == n ? {} : nr(n, t)
                    })),
                    Rf = oe(zu),
                    zf = oe(Wu),
                    Wf = qr((function(n, t, r) {
                        return t = t.toLowerCase(), n + (r ? Uu(t) : t)
                    })),
                    Bf = qr((function(n, t, r) {
                        return n + (r ? "-" : "") + t.toLowerCase()
                    })),
                    Lf = qr((function(n, t, r) {
                        return n + (r ? " " : "") + t.toLowerCase()
                    })),
                    Uf = Zr("toLowerCase"),
                    Cf = qr((function(n, t, r) {
                        return n + (r ? "_" : "") + t.toLowerCase()
                    })),
                    Df = qr((function(n, t, r) {
                        return n + (r ? " " : "") + Tf(t)
                    })),
                    Mf = qr((function(n, t, r) {
                        return n + (r ? " " : "") + t.toUpperCase()
                    })),
                    Tf = Zr("toUpperCase"),
                    $f = fr((function(t, r) {
                        try {
                            return n(t, T, r)
                        } catch (n) {
                            return hu(n) ? n : new Gu(n)
                        }
                    })),
                    Ff = pe((function(n, t) {
                        return r(t, (function(t) {
                            t = De(t), st(n, t, Go(n[t], n))
                        })), n
                    })),
                    Nf = Hr(),
                    Pf = Hr(!0),
                    Zf = fr((function(n, t) {
                        return function(r) {
                            return Lt(r, n, t)
                        }
                    })),
                    qf = fr((function(n, t) {
                        return function(r) {
                            return Lt(n, r, t)
                        }
                    })),
                    Vf = Xr(c),
                    Kf = Xr(u),
                    Gf = Xr(h),
                    Hf = re(),
                    Jf = re(!0),
                    Yf = Qr((function(n, t) {
                        return n + t
                    }), 0),
                    Qf = ie("ceil"),
                    Xf = Qr((function(n, t) {
                        return n / t
                    }), 1),
                    nc = ie("floor"),
                    tc = Qr((function(n, t) {
                        return n * t
                    }), 1),
                    rc = ie("round"),
                    ec = Qr((function(n, t) {
                        return n - t
                    }), 0);
                return An.after = function(n, t) {
                        if ("function" != typeof t) throw new ni("Expected a function");
                        return n = Au(n),
                            function() {
                                if (1 > --n) return t.apply(this, arguments)
                            }
                    }, An.ary = ru, An.assign = gf, An.assignIn = df, An.assignInWith = yf, An.assignWith = bf, An.at = xf, An.before = eu, An.bind = Go, An.bindAll = Ff, An.bindKey = Ho, An.castArray = function() {
                        if (!arguments.length) return [];
                        var n = arguments[0];
                        return of(n) ? n : [n]
                    }, An.chain = Je, An.chunk = function(n, t, r) {
                        if (t = (r ? Oe(n, t, r) : t === T) ? 1 : Li(Au(t), 0), !(r = null == n ? 0 : n.length) || 1 > t) return [];
                        for (var e = 0, u = 0, i = Vu(Si(r / t)); e < r;) i[u++] = hr(n, e, e += t);
                        return i
                    }, An.compact = function(n) {
                        for (var t = -1, r = null == n ? 0 : n.length, e = 0, u = []; ++t < r;) {
                            var i = n[t];
                            i && (u[e++] = i)
                        }
                        return u
                    }, An.concat = function() {
                        var n = arguments.length;
                        if (!n) return [];
                        for (var t = Vu(n - 1), r = arguments[0]; n--;) t[n - 1] = arguments[n];
                        return a( of (r) ? Ur(r) : [r], wt(t, 1))
                    }, An.cond = function(t) {
                        var r = null == t ? 0 : t.length,
                            e = ye();
                        return t = r ? c(t, (function(n) {
                            if ("function" != typeof n[1]) throw new ni("Expected a function");
                            return [e(n[0]), n[1]]
                        })) : [], fr((function(e) {
                            for (var u = -1; ++u < r;) {
                                var i = t[u];
                                if (n(i[0], this, e)) return n(i[1], this, e)
                            }
                        }))
                    }, An.conforms = function(n) {
                        return vt(_t(n, 1))
                    }, An.constant = Mu, An.countBy = To, An.create = function(n, t) {
                        var r = ro(n);
                        return null == t ? r : at(r, t)
                    }, An.curry = uu, An.curryRight = iu, An.debounce = ou, An.defaults = jf, An.defaultsDeep = wf, An.defer = Jo, An.delay = Yo, An.difference = jo, An.differenceBy = wo, An.differenceWith = mo, An.drop = function(n, t, r) {
                        var e = null == n ? 0 : n.length;
                        return e ? hr(n, 0 > (t = r || t === T ? 1 : Au(t)) ? 0 : t, e) : []
                    }, An.dropRight = function(n, t, r) {
                        var e = null == n ? 0 : n.length;
                        return e ? hr(n, 0, 0 > (t = e - (t = r || t === T ? 1 : Au(t))) ? 0 : t) : []
                    }, An.dropRightWhile = function(n, t) {
                        return n && n.length ? jr(n, ye(t, 3), !0, !0) : []
                    }, An.dropWhile = function(n, t) {
                        return n && n.length ? jr(n, ye(t, 3), !0) : []
                    }, An.fill = function(n, t, r, e) {
                        var u = null == n ? 0 : n.length;
                        if (!u) return [];
                        for (r && "number" != typeof r && Oe(n, t, r) && (r = 0, e = u), u = n.length, 0 > (r = Au(r)) && (r = -r > u ? 0 : u + r), 0 > (e = e === T || e > u ? u : Au(e)) && (e += u), e = r > e ? 0 : Eu(e); r < e;) n[r++] = t;
                        return n
                    }, An.filter = function(n, t) {
                        return ( of (n) ? i : jt)(n, ye(t, 3))
                    }, An.flatMap = function(n, t) {
                        return wt(tu(n, t), 1)
                    }, An.flatMapDeep = function(n, t) {
                        return wt(tu(n, t), $)
                    }, An.flatMapDepth = function(n, t, r) {
                        return r = r === T ? 1 : Au(r), wt(tu(n, t), r)
                    }, An.flatten = Pe, An.flattenDeep = function(n) {
                        return null != n && n.length ? wt(n, $) : []
                    }, An.flattenDepth = function(n, t) {
                        return null != n && n.length ? wt(n, t = t === T ? 1 : Au(t)) : []
                    }, An.flip = function(n) {
                        return fe(n, 512)
                    }, An.flow = Nf, An.flowRight = Pf, An.fromPairs = function(n) {
                        for (var t = -1, r = null == n ? 0 : n.length, e = {}; ++t < r;) {
                            var u = n[t];
                            e[u[0]] = u[1]
                        }
                        return e
                    }, An.functions = function(n) {
                        return null == n ? [] : Et(n, zu(n))
                    }, An.functionsIn = function(n) {
                        return null == n ? [] : Et(n, Wu(n))
                    }, An.groupBy = No, An.initial = function(n) {
                        return null != n && n.length ? hr(n, 0, -1) : []
                    }, An.intersection = Ao, An.intersectionBy = Eo, An.intersectionWith = ko, An.invert = mf, An.invertBy = Af, An.invokeMap = Po, An.iteratee = $u, An.keyBy = Zo, An.keys = zu, An.keysIn = Wu, An.map = tu, An.mapKeys = function(n, t) {
                        var r = {};
                        return t = ye(t, 3), mt(n, (function(n, e, u) {
                            st(r, t(n, e, u), n)
                        })), r
                    }, An.mapValues = function(n, t) {
                        var r = {};
                        return t = ye(t, 3), mt(n, (function(n, e, u) {
                            st(r, e, t(n, e, u))
                        })), r
                    }, An.matches = function(n) {
                        return Ht(_t(n, 1))
                    }, An.matchesProperty = function(n, t) {
                        return Jt(n, _t(t, 1))
                    }, An.memoize = fu, An.merge = kf, An.mergeWith = Sf, An.method = Zf, An.methodOf = qf, An.mixin = Fu, An.negate = cu, An.nthArg = function(n) {
                        return n = Au(n), fr((function(t) {
                            return Qt(t, n)
                        }))
                    }, An.omit = Of, An.omitBy = function(n, t) {
                        return Bu(n, cu(ye(t)))
                    }, An.once = function(n) {
                        return eu(2, n)
                    }, An.orderBy = function(n, t, r, e) {
                        return null == n ? [] : ( of (t) || (t = null == t ? [] : [t]), of (r = e ? T : r) || (r = null == r ? [] : [r]), Xt(n, t, r))
                    }, An.over = Vf, An.overArgs = Qo, An.overEvery = Kf, An.overSome = Gf, An.partial = Xo, An.partialRight = nf, An.partition = qo, An.pick = If, An.pickBy = Bu, An.property = Pu, An.propertyOf = function(n) {
                        return function(t) {
                            return null == n ? T : kt(n, t)
                        }
                    }, An.pull = So, An.pullAll = Ve, An.pullAllBy = function(n, t, r) {
                        return n && n.length && t && t.length ? er(n, t, ye(r, 2)) : n
                    }, An.pullAllWith = function(n, t, r) {
                        return n && n.length && t && t.length ? er(n, t, T, r) : n
                    }, An.pullAt = Oo, An.range = Hf, An.rangeRight = Jf, An.rearg = tf, An.reject = function(n, t) {
                        return ( of (n) ? i : jt)(n, cu(ye(t, 3)))
                    }, An.remove = function(n, t) {
                        var r = [];
                        if (!n || !n.length) return r;
                        var e = -1,
                            u = [],
                            i = n.length;
                        for (t = ye(t, 3); ++e < i;) {
                            var o = n[e];
                            t(o, e, n) && (r.push(o), u.push(e))
                        }
                        return ur(n, u), r
                    }, An.rest = function(n, t) {
                        if ("function" != typeof n) throw new ni("Expected a function");
                        return fr(n, t = t === T ? t : Au(t))
                    }, An.reverse = Ke, An.sampleSize = function(n, t, r) {
                        return t = (r ? Oe(n, t, r) : t === T) ? 1 : Au(t), ( of (n) ? et : ar)(n, t)
                    }, An.set = function(n, t, r) {
                        return null == n ? n : lr(n, t, r)
                    }, An.setWith = function(n, t, r, e) {
                        return e = "function" == typeof e ? e : T, null == n ? n : lr(n, t, r, e)
                    }, An.shuffle = function(n) {
                        return ( of (n) ? ut : sr)(n)
                    }, An.slice = function(n, t, r) {
                        var e = null == n ? 0 : n.length;
                        return e ? (r && "number" != typeof r && Oe(n, t, r) ? (t = 0, r = e) : (t = null == t ? 0 : Au(t), r = r === T ? e : Au(r)), hr(n, t, r)) : []
                    }, An.sortBy = Vo, An.sortedUniq = function(n) {
                        return n && n.length ? gr(n) : []
                    },
                    An.sortedUniqBy = function(n, t) {
                        return n && n.length ? gr(n, ye(t, 2)) : []
                    }, An.split = function(n, t, r) {
                        return r && "number" != typeof r && Oe(n, t, r) && (t = r = T), (r = r === T ? 4294967295 : r >>> 0) ? (n = Ou(n)) && ("string" == typeof t || null != t && !sf(t)) && (!(t = yr(t)) && Rn.test(n)) ? Or(M(n), 0, r) : n.split(t, r) : []
                    }, An.spread = function(t, r) {
                        if ("function" != typeof t) throw new ni("Expected a function");
                        return r = null == r ? 0 : Li(Au(r), 0), fr((function(e) {
                            var u = e[r];
                            return e = Or(e, 0, r), u && a(e, u), n(t, this, e)
                        }))
                    }, An.tail = function(n) {
                        var t = null == n ? 0 : n.length;
                        return t ? hr(n, 1, t) : []
                    }, An.take = function(n, t, r) {
                        return n && n.length ? hr(n, 0, 0 > (t = r || t === T ? 1 : Au(t)) ? 0 : t) : []
                    }, An.takeRight = function(n, t, r) {
                        var e = null == n ? 0 : n.length;
                        return e ? hr(n, 0 > (t = e - (t = r || t === T ? 1 : Au(t))) ? 0 : t, e) : []
                    }, An.takeRightWhile = function(n, t) {
                        return n && n.length ? jr(n, ye(t, 3), !1, !0) : []
                    }, An.takeWhile = function(n, t) {
                        return n && n.length ? jr(n, ye(t, 3)) : []
                    }, An.tap = function(n, t) {
                        return t(n), n
                    }, An.throttle = function(n, t, r) {
                        var e = !0,
                            u = !0;
                        if ("function" != typeof n) throw new ni("Expected a function");
                        return gu(r) && (e = "leading" in r ? !!r.leading : e, u = "trailing" in r ? !!r.trailing : u), ou(n, t, {
                            leading: e,
                            maxWait: t,
                            trailing: u
                        })
                    }, An.thru = Ye, An.toArray = wu, An.toPairs = Rf, An.toPairsIn = zf, An.toPath = function(n) {
                        return of(n) ? c(n, De) : ju(n) ? [n] : Ur(xo(Ou(n)))
                    }, An.toPlainObject = Su, An.transform = function(n, t, e) {
                        var u = of (n),
                            i = u || cf(n) || pf(n);
                        if (t = ye(t, 4), null == e) {
                            var o = n && n.constructor;
                            e = i ? u ? new o : [] : gu(n) && pu(o) ? ro(gi(n)) : {}
                        }
                        return (i ? r : mt)(n, (function(n, r, u) {
                            return t(e, n, r, u)
                        })), e
                    }, An.unary = function(n) {
                        return ru(n, 1)
                    }, An.union = Io, An.unionBy = Ro, An.unionWith = zo, An.uniq = function(n) {
                        return n && n.length ? br(n) : []
                    }, An.uniqBy = function(n, t) {
                        return n && n.length ? br(n, ye(t, 2)) : []
                    }, An.uniqWith = function(n, t) {
                        return t = "function" == typeof t ? t : T, n && n.length ? br(n, T, t) : []
                    }, An.unset = function(n, t) {
                        return null == n || xr(n, t)
                    }, An.unzip = Ge, An.unzipWith = He, An.update = function(n, t, r) {
                        return null == n ? n : lr(n, t, kr(r)(kt(n, t)), void 0)
                    }, An.updateWith = function(n, t, r, e) {
                        return e = "function" == typeof e ? e : T, null != n && (n = lr(n, t, kr(r)(kt(n, t)), e)), n
                    }, An.values = Lu, An.valuesIn = function(n) {
                        return null == n ? [] : S(n, Wu(n))
                    }, An.without = Wo, An.words = Du, An.wrap = function(n, t) {
                        return Xo(kr(t), n)
                    }, An.xor = Bo, An.xorBy = Lo, An.xorWith = Uo, An.zip = Co, An.zipObject = function(n, t) {
                        return Ar(n || [], t || [], ot)
                    }, An.zipObjectDeep = function(n, t) {
                        return Ar(n || [], t || [], lr)
                    }, An.zipWith = Do, An.entries = Rf, An.entriesIn = zf, An.extend = df, An.extendWith = yf, Fu(An, An), An.add = Yf, An.attempt = $f, An.camelCase = Wf, An.capitalize = Uu, An.ceil = Qf, An.clamp = function(n, t, r) {
                        return r === T && (r = t, t = T), r !== T && (r = (r = ku(r)) == r ? r : 0), t !== T && (t = (t = ku(t)) == t ? t : 0), pt(ku(n), t, r)
                    }, An.clone = function(n) {
                        return _t(n, 4)
                    }, An.cloneDeep = function(n) {
                        return _t(n, 5)
                    }, An.cloneDeepWith = function(n, t) {
                        return _t(n, 5, t = "function" == typeof t ? t : T)
                    }, An.cloneWith = function(n, t) {
                        return _t(n, 4, t = "function" == typeof t ? t : T)
                    }, An.conformsTo = function(n, t) {
                        return null == t || gt(n, t, zu(t))
                    }, An.deburr = Cu, An.defaultTo = function(n, t) {
                        return null == n || n != n ? t : n
                    }, An.divide = Xf, An.endsWith = function(n, t, r) {
                        n = Ou(n), t = yr(t);
                        var e = n.length;
                        e = r = r === T ? e : pt(Au(r), 0, e);
                        return 0 <= (r -= t.length) && n.slice(r, e) == t
                    }, An.eq = au, An.escape = function(n) {
                        return (n = Ou(n)) && H.test(n) ? n.replace(K, nt) : n
                    }, An.escapeRegExp = function(n) {
                        return (n = Ou(n)) && en.test(n) ? n.replace(rn, "\\$&") : n
                    }, An.every = function(n, t, r) {
                        var e = of (n) ? u : bt;
                        return r && Oe(n, t, r) && (t = T), e(n, ye(t, 3))
                    }, An.find = $o, An.findIndex = Fe, An.findKey = function(n, t) {
                        return p(n, ye(t, 3), mt)
                    }, An.findLast = Fo, An.findLastIndex = Ne, An.findLastKey = function(n, t) {
                        return p(n, ye(t, 3), At)
                    }, An.floor = nc, An.forEach = Xe, An.forEachRight = nu, An.forIn = function(n, t) {
                        return null == n ? n : io(n, ye(t, 3), Wu)
                    }, An.forInRight = function(n, t) {
                        return null == n ? n : oo(n, ye(t, 3), Wu)
                    }, An.forOwn = function(n, t) {
                        return n && mt(n, ye(t, 3))
                    }, An.forOwnRight = function(n, t) {
                        return n && At(n, ye(t, 3))
                    }, An.get = Iu, An.gt = rf, An.gte = ef, An.has = function(n, t) {
                        return null != n && we(n, t, Rt)
                    }, An.hasIn = Ru, An.head = Ze, An.identity = Tu, An.includes = function(n, t, r, e) {
                        return n = lu(n) ? n : Lu(n), r = r && !e ? Au(r) : 0, e = n.length, 0 > r && (r = Li(e + r, 0)), xu(n) ? r <= e && -1 < n.indexOf(t, r) : !!e && -1 < v(n, t, r)
                    }, An.indexOf = function(n, t, r) {
                        var e = null == n ? 0 : n.length;
                        return e ? (0 > (r = null == r ? 0 : Au(r)) && (r = Li(e + r, 0)), v(n, t, r)) : -1
                    }, An.inRange = function(n, t, r) {
                        return t = mu(t), r === T ? (r = t, t = 0) : r = mu(r), (n = ku(n)) >= Ui(t, r) && n < Li(t, r)
                    }, An.invoke = Ef, An.isArguments = uf, An.isArray = of , An.isArrayBuffer = ff, An.isArrayLike = lu, An.isArrayLikeObject = su, An.isBoolean = function(n) {
                        return !0 === n || !1 === n || du(n) && "[object Boolean]" == Ot(n)
                    }, An.isBuffer = cf, An.isDate = af, An.isElement = function(n) {
                        return du(n) && 1 === n.nodeType && !bu(n)
                    }, An.isEmpty = function(n) {
                        if (null == n) return !0;
                        if (lu(n) && ( of (n) || "string" == typeof n || "function" == typeof n.splice || cf(n) || pf(n) || uf(n))) return !n.length;
                        var t = _o(n);
                        if ("[object Map]" == t || "[object Set]" == t) return !n.size;
                        if (ze(n)) return !Vt(n).length;
                        for (var r in n)
                            if (ii.call(n, r)) return !1;
                        return !0
                    }, An.isEqual = function(n, t) {
                        return Mt(n, t)
                    }, An.isEqualWith = function(n, t, r) {
                        var e = (r = "function" == typeof r ? r : T) ? r(n, t) : T;
                        return e === T ? Mt(n, t, T, r) : !!e
                    }, An.isError = hu, An.isFinite = function(n) {
                        return "number" == typeof n && zi(n)
                    }, An.isFunction = pu, An.isInteger = _u, An.isLength = vu, An.isMap = lf, An.isMatch = function(n, t) {
                        return n === t || $t(n, t, xe(t))
                    }, An.isMatchWith = function(n, t, r) {
                        return r = "function" == typeof r ? r : T, $t(n, t, xe(t), r)
                    }, An.isNaN = function(n) {
                        return yu(n) && n != +n
                    }, An.isNative = function(n) {
                        if (vo(n)) throw new Gu("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
                        return Ft(n)
                    }, An.isNil = function(n) {
                        return null == n
                    }, An.isNull = function(n) {
                        return null === n
                    }, An.isNumber = yu, An.isObject = gu, An.isObjectLike = du, An.isPlainObject = bu, An.isRegExp = sf, An.isSafeInteger = function(n) {
                        return _u(n) && -9007199254740991 <= n && 9007199254740991 >= n
                    }, An.isSet = hf, An.isString = xu, An.isSymbol = ju, An.isTypedArray = pf, An.isUndefined = function(n) {
                        return n === T
                    }, An.isWeakMap = function(n) {
                        return du(n) && "[object WeakMap]" == _o(n)
                    }, An.isWeakSet = function(n) {
                        return du(n) && "[object WeakSet]" == Ot(n)
                    }, An.join = function(n, t) {
                        return null == n ? "" : Wi.call(n, t)
                    }, An.kebabCase = Bf, An.last = qe, An.lastIndexOf = function(n, t, r) {
                        var e = null == n ? 0 : n.length;
                        if (!e) return -1;
                        var u = e;
                        if (r !== T && (u = 0 > (u = Au(r)) ? Li(e + u, 0) : Ui(u, e - 1)), t == t) {
                            for (r = u + 1; r-- && n[r] !== t;);
                            n = r
                        } else n = _(n, d, u, !0);
                        return n
                    }, An.lowerCase = Lf, An.lowerFirst = Uf, An.lt = _f, An.lte = vf, An.max = function(n) {
                        return n && n.length ? xt(n, Tu, It) : T
                    }, An.maxBy = function(n, t) {
                        return n && n.length ? xt(n, ye(t, 2), It) : T
                    }, An.mean = function(n) {
                        return y(n, Tu)
                    }, An.meanBy = function(n, t) {
                        return y(n, ye(t, 2))
                    }, An.min = function(n) {
                        return n && n.length ? xt(n, Tu, Kt) : T
                    }, An.minBy = function(n, t) {
                        return n && n.length ? xt(n, ye(t, 2), Kt) : T
                    }, An.stubArray = Zu, An.stubFalse = qu, An.stubObject = function() {
                        return {}
                    }, An.stubString = function() {
                        return ""
                    }, An.stubTrue = function() {
                        return !0
                    }, An.multiply = tc, An.nth = function(n, t) {
                        return n && n.length ? Qt(n, Au(t)) : T
                    }, An.noConflict = function() {
                        return $n._ === this && ($n._ = li), this
                    }, An.noop = Nu, An.now = Ko, An.pad = function(n, t, r) {
                        n = Ou(n);
                        var e = (t = Au(t)) ? D(n) : 0;
                        return !t || e >= t ? n : ne(Oi(t = (t - e) / 2), r) + n + ne(Si(t), r)
                    }, An.padEnd = function(n, t, r) {
                        n = Ou(n);
                        var e = (t = Au(t)) ? D(n) : 0;
                        return t && e < t ? n + ne(t - e, r) : n
                    }, An.padStart = function(n, t, r) {
                        n = Ou(n);
                        var e = (t = Au(t)) ? D(n) : 0;
                        return t && e < t ? ne(t - e, r) + n : n
                    }, An.parseInt = function(n, t, r) {
                        return r || null == t ? t = 0 : t && (t = +t), Di(Ou(n).replace(on, ""), t || 0)
                    }, An.random = function(n, t, r) {
                        if (r && "boolean" != typeof r && Oe(n, t, r) && (t = r = T), r === T && ("boolean" == typeof t ? (r = t, t = T) : "boolean" == typeof n && (r = n, n = T)), n === T && t === T ? (n = 0, t = 1) : (n = mu(n), t === T ? (t = n, n = 0) : t = mu(t)), n > t) {
                            var e = n;
                            n = t, t = e
                        }
                        return r || n % 1 || t % 1 ? (r = Mi(), Ui(n + r * (t - n + Cn("1e-" + ((r + "").length - 1))), t)) : ir(n, t)
                    }, An.reduce = function(n, t, r) {
                        var e = of (n) ? l : j,
                            u = 3 > arguments.length;
                        return e(n, ye(t, 4), r, u, eo)
                    }, An.reduceRight = function(n, t, r) {
                        var e = of (n) ? s : j,
                            u = 3 > arguments.length;
                        return e(n, ye(t, 4), r, u, uo)
                    }, An.repeat = function(n, t, r) {
                        return t = (r ? Oe(n, t, r) : t === T) ? 1 : Au(t), or(Ou(n), t)
                    }, An.replace = function() {
                        var n = arguments,
                            t = Ou(n[0]);
                        return 3 > n.length ? t : t.replace(n[1], n[2])
                    }, An.result = function(n, t, r) {
                        var e = -1,
                            u = (t = Sr(t, n)).length;
                        for (u || (u = 1, n = T); ++e < u;) {
                            var i = null == n ? T : n[De(t[e])];
                            i === T && (e = u, i = r), n = pu(i) ? i.call(n) : i
                        }
                        return n
                    }, An.round = rc, An.runInContext = x, An.sample = function(n) {
                        return ( of (n) ? Qn : cr)(n)
                    }, An.size = function(n) {
                        if (null == n) return 0;
                        if (lu(n)) return xu(n) ? D(n) : n.length;
                        var t = _o(n);
                        return "[object Map]" == t || "[object Set]" == t ? n.size : Vt(n).length
                    }, An.snakeCase = Cf, An.some = function(n, t, r) {
                        var e = of (n) ? h : pr;
                        return r && Oe(n, t, r) && (t = T), e(n, ye(t, 3))
                    }, An.sortedIndex = function(n, t) {
                        return _r(n, t)
                    }, An.sortedIndexBy = function(n, t, r) {
                        return vr(n, t, ye(r, 2))
                    }, An.sortedIndexOf = function(n, t) {
                        var r = null == n ? 0 : n.length;
                        if (r) {
                            var e = _r(n, t);
                            if (e < r && au(n[e], t)) return e
                        }
                        return -1
                    }, An.sortedLastIndex = function(n, t) {
                        return _r(n, t, !0)
                    }, An.sortedLastIndexBy = function(n, t, r) {
                        return vr(n, t, ye(r, 2), !0)
                    }, An.sortedLastIndexOf = function(n, t) {
                        if (null != n && n.length) {
                            var r = _r(n, t, !0) - 1;
                            if (au(n[r], t)) return r
                        }
                        return -1
                    }, An.startCase = Df, An.startsWith = function(n, t, r) {
                        return n = Ou(n), r = null == r ? 0 : pt(Au(r), 0, n.length), t = yr(t), n.slice(r, r + t.length) == t
                    }, An.subtract = ec, An.sum = function(n) {
                        return n && n.length ? m(n, Tu) : 0
                    }, An.sumBy = function(n, t) {
                        return n && n.length ? m(n, ye(t, 2)) : 0
                    }, An.template = function(n, t, r) {
                        var e = An.templateSettings;
                        r && Oe(n, t, r) && (t = T), n = Ou(n), t = yf({}, t, e, ce);
                        var u, i, o = zu(r = yf({}, t.imports, e.imports, ce)),
                            f = S(r, o),
                            c = 0;
                        r = t.interpolate || jn;
                        var a = "__p+='";
                        r = Qu((t.escape || jn).source + "|" + r.source + "|" + (r === Q ? pn : jn).source + "|" + (t.evaluate || jn).source + "|$", "g");
                        var l = "sourceURL" in t ? "//# sourceURL=" + t.sourceURL + "\n" : "";
                        if (n.replace(r, (function(t, r, e, o, f, l) {
                                return e || (e = o), a += n.slice(c, l).replace(wn, z), r && (u = !0, a += "'+__e(" + r + ")+'"), f && (i = !0, a += "';" + f + ";\n__p+='"), e && (a += "'+((__t=(" + e + "))==null?'':__t)+'"), c = l + t.length, t
                            })), a += "';", (t = t.variable) || (a = "with(obj){" + a + "}"), a = (i ? a.replace(P, "") : a).replace(Z, "$1").replace(q, "$1;"), a = "function(" + (t || "obj") + "){" + (t ? "" : "obj||(obj={});") + "var __t,__p=''" + (u ? ",__e=_.escape" : "") + (i ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + a + "return __p}", (t = $f((function() {
                                return Hu(o, l + "return " + a).apply(T, f)
                            }))).source = a, hu(t)) throw t;
                        return t
                    }, An.times = function(n, t) {
                        if (1 > (n = Au(n)) || 9007199254740991 < n) return [];
                        var r = 4294967295,
                            e = Ui(n, 4294967295);
                        for (n -= 4294967295, e = A(e, t = ye(t)); ++r < n;) t(r);
                        return e
                    }, An.toFinite = mu, An.toInteger = Au, An.toLength = Eu, An.toLower = function(n) {
                        return Ou(n).toLowerCase()
                    }, An.toNumber = ku, An.toSafeInteger = function(n) {
                        return n ? pt(Au(n), -9007199254740991, 9007199254740991) : 0 === n ? n : 0
                    }, An.toString = Ou, An.toUpper = function(n) {
                        return Ou(n).toUpperCase()
                    }, An.trim = function(n, t, r) {
                        return (n = Ou(n)) && (r || t === T) ? n.replace(un, "") : n && (t = yr(t)) ? Or(n = M(n), t = I(n, r = M(t)), r = R(n, r) + 1).join("") : n
                    }, An.trimEnd = function(n, t, r) {
                        return (n = Ou(n)) && (r || t === T) ? n.replace(fn, "") : n && (t = yr(t)) ? Or(n = M(n), 0, t = R(n, M(t)) + 1).join("") : n
                    }, An.trimStart = function(n, t, r) {
                        return (n = Ou(n)) && (r || t === T) ? n.replace(on, "") : n && (t = yr(t)) ? Or(n = M(n), t = I(n, M(t))).join("") : n
                    }, An.truncate = function(n, t) {
                        var r = 30,
                            e = "...";
                        if (gu(t)) {
                            var u = "separator" in t ? t.separator : u;
                            r = "length" in t ? Au(t.length) : r, e = "omission" in t ? yr(t.omission) : e
                        }
                        var i = (n = Ou(n)).length;
                        if (Rn.test(n)) {
                            var o = M(n);
                            i = o.length
                        }
                        if (r >= i) return n;
                        if (1 > (i = r - D(e))) return e;
                        if (r = o ? Or(o, 0, i).join("") : n.slice(0, i), u === T) return r + e;
                        if (o && (i += r.length - i), sf(u)) {
                            if (n.slice(i).search(u)) {
                                var f = r;
                                for (u.global || (u = Qu(u.source, Ou(_n.exec(u)) + "g")), u.lastIndex = 0; o = u.exec(f);) var c = o.index;
                                r = r.slice(0, c === T ? i : c)
                            }
                        } else n.indexOf(yr(u), i) != i && (-1 < (u = r.lastIndexOf(u)) && (r = r.slice(0, u)));
                        return r + e
                    }, An.unescape = function(n) {
                        return (n = Ou(n)) && G.test(n) ? n.replace(V, tt) : n
                    }, An.uniqueId = function(n) {
                        var t = ++oi;
                        return Ou(n) + t
                    }, An.upperCase = Mf, An.upperFirst = Tf, An.each = Xe, An.eachRight = nu, An.first = Ze, Fu(An, function() {
                        var n = {};
                        return mt(An, (function(t, r) {
                            ii.call(An.prototype, r) || (n[r] = t)
                        })), n
                    }(), {
                        chain: !1
                    }), An.VERSION = "4.17.10", r("bind bindKey curry curryRight partial partialRight".split(" "), (function(n) {
                        An[n].placeholder = An
                    })), r(["drop", "take"], (function(n, t) {
                        Un.prototype[n] = function(r) {
                            r = r === T ? 1 : Li(Au(r), 0);
                            var e = this.__filtered__ && !t ? new Un(this) : this.clone();
                            return e.__filtered__ ? e.__takeCount__ = Ui(r, e.__takeCount__) : e.__views__.push({
                                size: Ui(r, 4294967295),
                                type: n + (0 > e.__dir__ ? "Right" : "")
                            }), e
                        }, Un.prototype[n + "Right"] = function(t) {
                            return this.reverse()[n](t).reverse()
                        }
                    })), r(["filter", "map", "takeWhile"], (function(n, t) {
                        var r = t + 1,
                            e = 1 == r || 3 == r;
                        Un.prototype[n] = function(n) {
                            var t = this.clone();
                            return t.__iteratees__.push({
                                iteratee: ye(n, 3),
                                type: r
                            }), t.__filtered__ = t.__filtered__ || e, t
                        }
                    })), r(["head", "last"], (function(n, t) {
                        var r = "take" + (t ? "Right" : "");
                        Un.prototype[n] = function() {
                            return this[r](1).value()[0]
                        }
                    })), r(["initial", "tail"], (function(n, t) {
                        var r = "drop" + (t ? "" : "Right");
                        Un.prototype[n] = function() {
                            return this.__filtered__ ? new Un(this) : this[r](1)
                        }
                    })), Un.prototype.compact = function() {
                        return this.filter(Tu)
                    }, Un.prototype.find = function(n) {
                        return this.filter(n).head()
                    }, Un.prototype.findLast = function(n) {
                        return this.reverse().find(n)
                    }, Un.prototype.invokeMap = fr((function(n, t) {
                        return "function" == typeof n ? new Un(this) : this.map((function(r) {
                            return Lt(r, n, t)
                        }))
                    })), Un.prototype.reject = function(n) {
                        return this.filter(cu(ye(n)))
                    }, Un.prototype.slice = function(n, t) {
                        n = Au(n);
                        var r = this;
                        return r.__filtered__ && (0 < n || 0 > t) ? new Un(r) : (0 > n ? r = r.takeRight(-n) : n && (r = r.drop(n)), t !== T && (r = 0 > (t = Au(t)) ? r.dropRight(-t) : r.take(t - n)), r)
                    }, Un.prototype.takeRightWhile = function(n) {
                        return this.reverse().takeWhile(n).reverse()
                    }, Un.prototype.toArray = function() {
                        return this.take(4294967295)
                    }, mt(Un.prototype, (function(n, t) {
                        var r = /^(?:filter|find|map|reject)|While$/.test(t),
                            e = /^(?:head|last)$/.test(t),
                            u = An[e ? "take" + ("last" == t ? "Right" : "") : t],
                            i = e || /^find/.test(t);
                        u && (An.prototype[t] = function() {
                            function t(n) {
                                return n = u.apply(An, a([n], f)), e && h ? n[0] : n
                            }
                            var o = this.__wrapped__,
                                f = e ? [1] : arguments,
                                c = o instanceof Un,
                                l = f[0],
                                s = c || of (o);
                            s && r && "function" == typeof l && 1 != l.length && (c = s = !1);
                            var h = this.__chain__,
                                p = !!this.__actions__.length;
                            l = i && !h, c = c && !p;
                            return !i && s ? (o = c ? o : new Un(this), (o = n.apply(o, f)).__actions__.push({
                                func: Ye,
                                args: [t],
                                thisArg: T
                            }), new On(o, h)) : l && c ? n.apply(this, f) : (o = this.thru(t), l ? e ? o.value()[0] : o.value() : o)
                        })
                    })), r("pop push shift sort splice unshift".split(" "), (function(n) {
                        var t = ti[n],
                            r = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru",
                            e = /^(?:pop|shift)$/.test(n);
                        An.prototype[n] = function() {
                            var n = arguments;
                            if (e && !this.__chain__) {
                                var u = this.value();
                                return t.apply( of (u) ? u : [], n)
                            }
                            return this[r]((function(r) {
                                return t.apply( of (r) ? r : [], n)
                            }))
                        }
                    })), mt(Un.prototype, (function(n, t) {
                        var r = An[t];
                        if (r) {
                            var e = r.name + "";
                            (Ki[e] || (Ki[e] = [])).push({
                                name: t,
                                func: r
                            })
                        }
                    })), Ki[Jr(T, 2).name] = [{
                        name: "wrapper",
                        func: T
                    }], Un.prototype.clone = function() {
                        var n = new Un(this.__wrapped__);
                        return n.__actions__ = Ur(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = Ur(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = Ur(this.__views__), n
                    }, Un.prototype.reverse = function() {
                        if (this.__filtered__) {
                            var n = new Un(this);
                            n.__dir__ = -1, n.__filtered__ = !0
                        } else(n = this.clone()).__dir__ *= -1;
                        return n
                    }, Un.prototype.value = function() {
                        var n, t = this.__wrapped__.value(),
                            r = this.__dir__,
                            e = of (t),
                            u = 0 > r,
                            i = e ? t.length : 0;
                        n = i;
                        for (var o = this.__views__, f = 0, c = -1, a = o.length; ++c < a;) {
                            var l = o[c],
                                s = l.size;
                            switch (l.type) {
                                case "drop":
                                    f += s;
                                    break;
                                case "dropRight":
                                    n -= s;
                                    break;
                                case "take":
                                    n = Ui(n, f + s);
                                    break;
                                case "takeRight":
                                    f = Li(f, n - s)
                            }
                        }
                        if (o = (n = {
                                start: f,
                                end: n
                            }).start, n = (f = n.end) - o, o = u ? f : o - 1, c = (f = this.__iteratees__).length, a = 0, l = Ui(n, this.__takeCount__), !e || !u && i == n && l == n) return wr(t, this.__actions__);
                        e = [];
                        n: for (; n-- && a < l;) {
                            for (u = -1, i = t[o += r]; ++u < c;) {
                                s = (h = f[u]).type;
                                var h = (0, h.iteratee)(i);
                                if (2 == s) i = h;
                                else if (!h) {
                                    if (1 == s) continue n;
                                    break n
                                }
                            }
                            e[a++] = i
                        }
                        return e
                    }, An.prototype.at = Mo, An.prototype.chain = function() {
                        return Je(this)
                    }, An.prototype.commit = function() {
                        return new On(this.value(), this.__chain__)
                    }, An.prototype.next = function() {
                        this.__values__ === T && (this.__values__ = wu(this.value()));
                        var n = this.__index__ >= this.__values__.length;
                        return {
                            done: n,
                            value: n ? T : this.__values__[this.__index__++]
                        }
                    }, An.prototype.plant = function(n) {
                        for (var t, r = this; r instanceof En;) {
                            var e = $e(r);
                            e.__index__ = 0, e.__values__ = T, t ? u.__wrapped__ = e : t = e;
                            var u = e;
                            r = r.__wrapped__
                        }
                        return u.__wrapped__ = n, t
                    }, An.prototype.reverse = function() {
                        var n = this.__wrapped__;
                        return n instanceof Un ? (this.__actions__.length && (n = new Un(this)), (n = n.reverse()).__actions__.push({
                            func: Ye,
                            args: [Ke],
                            thisArg: T
                        }), new On(n, this.__chain__)) : this.thru(Ke)
                    }, An.prototype.toJSON = An.prototype.valueOf = An.prototype.value = function() {
                        return wr(this.__wrapped__, this.__actions__)
                    }, An.prototype.first = An.prototype.head, ji && (An.prototype[ji] = Qe), An
            }();
        "function" == typeof define && "object" == typeof define.amd && define.amd ? ($n._ = rt, define((function() {
            return rt
        }))) : Nn ? ((Nn.exports = rt)._ = rt, Fn._ = rt) : $n._ = rt
    }.call(this);
var genericAutocomplete = {
    nonCharacters: [9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 91, 93, 144, 145]
};
$.widget("ui.autocomplete", $.ui.autocomplete, {
        _create: function() {
            this._super(), this.widget().menu("option", "items", "> :not(.non-option)")
        }
    }), genericAutocomplete.createWrappingDiv = function(field, options) {
        if (!field.parent().hasClass("ac-chooser")) {
            var wrappingDiv = $("<div/>").addClass("ac-chooser");
            if (field.wrap(wrappingDiv), options.bootstrapClear) {
                var removeIcon = $("<span/>").addClass("searchclear glyphicon glyphicon-remove-circle");
                field.parent().append(removeIcon), removeIcon.on("click", (function() {
                    field.trigger("resetAll")
                }))
            }
        }
    }, genericAutocomplete.menuClosed = function() {
        return 0 === $("ul.ac-menu:visible").length
    }, genericAutocomplete.focus = function(e, ui) {
        var li = $(this).data("uiAutocomplete").menu.element.find("li#ui-id-" + ui.item.id);
        return li.parent().find("li").removeClass("active"), li.addClass("active"), !1
    }, genericAutocomplete.renderItem = function(ul, item) {
        return $("<li/>").addClass("ac-result").data("item.autocomplete", item).append(genericAutocomplete.template(item, null)).appendTo(ul)
    }, genericAutocomplete.renderMenu = function(ul, items) {
        var that = this;
        ul.removeClass("ui-corner-all").removeClass("ui-menu"), ul.addClass("ac-menu"), $.each(items, (function(index, item) {
            that._renderItemData(ul, item)
        }))
    }, genericAutocomplete.stripTags = function(txt) {
        return txt ? txt.replace(/<\w+>(.+)<\/\w+>/g, "$1") : txt
    }, $.fn.genericAutocomplete = function(acOptions) {
        var ac, options = acOptions || {},
            field = this;
        if ($('html[dir="rtl"]').length > 0 && (options.position = options.position || {
                my: "right top",
                at: "right bottom"
            }), field && !(field.length < 1)) {
            (options.createWrappingDiv || genericAutocomplete.createWrappingDiv)(field, options), field.wrappingDiv = field.closest(".ac-chooser"), field.searchClear = field.wrappingDiv.find(".searchclear")[0], field.selection = null, field.searchClear && $(field.searchClear).hide(), field.on("search", (function() {
                if (!options.react) return field.val(""), field.trigger("resetSelection"), !1
            })), field.select = function(e, ui) {
                return ui.item.id && field.val(ui.item.title), options.idEl && options.idEl.val(ui.item.id), options.afterSelect && options.afterSelect(ui), e && e.preventDefault(), !1
            }, field.template = options.template || field.template || function(item) {
                var wrapperDiv = $("<div/>").addClass("ac").attr("id", item.id),
                    labelDiv = $("<div/>").addClass("ac-label");
                return labelDiv.append($("<span/>").addClass("title").append(item.title)), wrapperDiv.append(labelDiv), wrapperDiv
            }, field.renderItem = function(ul, item) {
                var li = $("<li/>").addClass("ac-result").data("item.autocomplete", item).append(field.template(item, field.val(), options)).appendTo(ul);
                return options.extraClass && li.addClass(options.extraClass), li.find("a[rel*='noopener']").click((function(e) {
                    e.stopPropagation()
                })), li
            }, field.selectFirst = function() {
                if ($(ac.menu.element).is(":visible")) {
                    var firstItem = $(ac.menu.element).find("li").first();
                    if (firstItem) return ac._trigger("select", null, {
                        item: firstItem.data("uiAutocompleteItem")
                    }), !0
                }
                return !1
            }, ac = field.autocomplete({
                minLength: options.minLength || 0 === options.minLength ? options.minLength : 1,
                delay: options.delay || 250,
                source: options.source,
                select: options.select || field.select,
                focus: options.focus || genericAutocomplete.focus,
                appendTo: options.appendTo,
                position: options.position,
                classes: options.classes,
                open: function() {
                    $($(this).data().uiAutocomplete.menu.element).addClass("open")
                }
            }).data("uiAutocomplete"), field.on("autocompleteclose", (function() {
                $(ac.menu.element).removeClass("open")
            })), options.menuClass && ac.menu && ac.menu.element && $(ac.menu.element).addClass(options.menuClass), ac._move = function(direction, e) {
                this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction) || this.menu[direction](e) : this.search(null, e)
            }, ac._close = function(event) {
                if (!this.keepOpen && this.menu.element.is(":visible")) {
                    var that = this;
                    that.menu.blur(), setTimeout((function() {
                        that.menu.element.hide(), that.isNewMenu = !0, that._trigger("close", event)
                    }), 10)
                }
            }, ac._renderItem = field.renderItem, ac._renderMenu = options.renderMenu || genericAutocomplete.renderMenu;
            var acResponse = ac.__response.bind(ac);
            if (ac.__response = function(content) {
                    options.onResults && options.onResults(content), acResponse(content)
                }, field.keydown((function(e) {
                    if (field.searchClear && !1 == !options.resetOnChange && setTimeout((function() {
                            field.val() ? $(field.searchClear).show() : $(field.searchClear).hide()
                        }), 1), !options.react) {
                        var key = e.keyCode || e.which;
                        if (13 === key) return !options.preventEnterSubmit && (options.selectFirstMatch && field.selectFirst(), !(!options.allowEnterSubmit && !genericAutocomplete.menuClosed()));
                        if (!1 === options.resetOnChange) return;
                        if (_.includes(genericAutocomplete.nonCharacters, key)) return;
                        field.trigger("resetSelection")
                    }
                })), field.keyup((function(e) {
                    if (!field.val()) {
                        var key = e.keyCode || e.which;
                        if (_.includes(genericAutocomplete.nonCharacters, key)) return;
                        ac._close(), !1 !== options.resetOnChange && field.trigger("resetSelection")
                    }
                })), field.bind("focus", (function() {
                    var that = this;
                    setTimeout((function() {
                        genericAutocomplete.menuClosed() && $(that).data("uiAutocomplete") && $(that).autocomplete("search", $(that).val())
                    }), 100)
                })), field.bind("click", (function() {
                    genericAutocomplete.menuClosed() && $(this).autocomplete("search", $(this).val())
                })), field.bind("assignSelection", (function(e, s) {
                    if (options.idEl) {
                        options.idEl.val(s.id), field.data("autocomplete-item", s), field.val(s.title), field.selection = s, field.searchClear && $(field.searchClear).show()
                    }
                })), field.bind("resetSelection", (function() {
                    if (options.idEl) {
                        var id = parseInt(options.idEl.val());
                        id && id > 0 && options.idEl.val(null), options.afterUnselect && options.afterUnselect(id), field.selection = null, field.selectedItem = null
                    }
                })), field.bind("resetAll", (function() {
                    field.trigger("resetSelection"), field.val(null), field.searchClear && $(field.searchClear).hide(), options.afterClear && options.afterClear()
                })), options.idEl) return !0 !== options.allowPlaceholders && field.blur((function() {
                !1 === options.resetOnChange && field.selection && field.val(field.selection.textTitle || genericAutocomplete.stripTags(field.selection.title)), setTimeout((function() {
                    !options.idEl.val() && genericAutocomplete.menuClosed() && (field.val(null), field.trigger("resetSelection"), field.searchClear && $(field.searchClear).hide())
                }), 20)
            })), ac
        }
    },
    function($) {
        var cocoon_element_counter = 0,
            create_new_id = function() {
                return (new Date).getTime() + cocoon_element_counter++
            },
            newcontent_braced = function(id) {
                return "[" + id + "]$1"
            },
            newcontent_underscord = function(id) {
                return "_" + id + "_$1"
            };
        $(document).on("click", ".add_fields", (function(e) {
            e.preventDefault();
            var $this = $(this),
                assoc = $this.data("association"),
                assocs = $this.data("associations"),
                content = $this.data("association-insertion-template"),
                insertionMethod = $this.data("association-insertion-method") || $this.data("association-insertion-position") || "before",
                insertionNode = $this.data("association-insertion-node"),
                insertionTraversal = $this.data("association-insertion-traversal"),
                count = parseInt($this.data("count"), 10),
                regexp_braced = new RegExp("\\[new_" + assoc + "\\](.*?\\s)", "g"),
                regexp_underscord = new RegExp("_new_" + assoc + "_(\\w*)", "g"),
                new_id = create_new_id(),
                new_content = content.replace(regexp_braced, newcontent_braced(new_id)),
                new_contents = [];
            for (new_content == content && (regexp_braced = new RegExp("\\[new_" + assocs + "\\](.*?\\s)", "g"), regexp_underscord = new RegExp("_new_" + assocs + "_(\\w*)", "g"), new_content = content.replace(regexp_braced, newcontent_braced(new_id))), new_contents = [new_content = new_content.replace(regexp_underscord, newcontent_underscord(new_id))], count = isNaN(count) ? 1 : Math.max(count, 1), count -= 1; count;) new_id = create_new_id(), new_content = (new_content = content.replace(regexp_braced, newcontent_braced(new_id))).replace(regexp_underscord, newcontent_underscord(new_id)), new_contents.push(new_content), count -= 1;
            insertionNode = insertionNode ? insertionTraversal ? $this[insertionTraversal](insertionNode) : "this" == insertionNode ? $this : $(insertionNode) : $this.parent(), $.each(new_contents, (function(i, node) {
                var contentNode = $(node);
                insertionNode.trigger("cocoon:before-insert", [contentNode]);
                insertionNode[insertionMethod](contentNode);
                insertionNode.trigger("cocoon:after-insert", [contentNode])
            }))
        })), $(document).on("click", ".remove_fields.dynamic, .remove_fields.existing", (function(e) {
            var $this = $(this),
                wrapper_class = $this.data("wrapper-class") || "nested-fields",
                node_to_delete = $this.closest("." + wrapper_class),
                trigger_node = node_to_delete.parent();
            e.preventDefault(), trigger_node.trigger("cocoon:before-remove", [node_to_delete]);
            var timeout = trigger_node.data("remove-timeout") || 0;
            setTimeout((function() {
                $this.hasClass("dynamic") ? node_to_delete.remove() : ($this.prev("input[type=hidden]").val("1"), node_to_delete.hide()), trigger_node.trigger("cocoon:after-remove", [node_to_delete])
            }), timeout)
        })), $(".remove_fields.existing.destroyed").each((function() {
            var $this = $(this),
                wrapper_class = $this.data("wrapper-class") || "nested-fields";
            $this.closest("." + wrapper_class).hide()
        }))
    }(jQuery);
var QTIP_DEFAULTS = {
    hide: {
        fixed: !0
    },
    style: {
        classes: "ui-tooltip-light ui-tooltip-shadow",
        width: "auto"
    },
    position: {
        viewport: $(window)
    }
};
if ($(document).on("click", "a[data-loading-click], button[data-loading-click], input[data-loading-click][type=radio], input[data-loading-click][type=checkbox]", loadingClickForLink), $(document).on("click", "input[data-loading-click][type=text], input[data-loading-click][type=submit]", (function() {
        var button = this;
        $(this).parents("form").length > 0 ? "true" != $(this).attr("exception") && $(this).parents("form").submit((function() {
            loadingClickForButton.apply(button)
        })) : loadingClickForButton.apply(button)
    })), $(document).on("change", "[data-autosubmit]", (function() {
        $(this).parents("form").submit()
    })), $(document).ready((function() {
        if ($.browser = $.browser || {}, buildHelpTips(), $("#usernav .signin_link, #usernav .signup_link").click((function() {
                if ("" != window.location.pathname && "/" != window.location.pathname) return window.location = $(this).attr("href") + "?return_to=" + window.location, !1
            })), $(["/assets/spinner-8f41a231c60b2b67a9639777cb9b08e0d8bbec6448cd212b02f13afd1d220920.gif", "/assets/spinner-small-e8c0cae72de4e69dc82f67e8614f96eafb9cafa4254b53a236b4b68b267ad5fe.gif", "/assets/spinner-small-ffffff_on_dedede-451d56a639b46d7f0c1e604d693fe0120f793168f393021939f8039b9cbb6cca.gif", "/assets/spinner-small-ffffff_on_aaaaaa-6718ea4343fe92eda4163cfc34f2342f985e84c9df7d8c5f695bec7162173aeb.gif"]).preload(), $("[data-tip]").each(autoTip), $("[data-popover]").each(autoPopover), $(".source_nested_form_fields input.existing").chooser({
                collectionUrl: "/sources.json",
                resourceUrl: "/sources/{{id}}.json"
            }), $(".zoomable").zoomify(), $(".delayedlink").click((function() {
                window.delayedLinkTries = 0;
                var dialog = $("#delayedlinknotice"),
                    msg = $(this).attr("data-delayed-link-msg") || "Hold on while we generate that file...",
                    status = $('<div class="loading status"></div>').html(msg);
                return 0 == dialog.length && (dialog = $('<div id="delayedlinknotice"></div>'), $(document.body).append(dialog)), dialog.html(status), dialog.dialog({
                    modal: !0,
                    title: "Hold on..."
                }), checkDelayedLink($(this).attr("href")), !1
            })), $("#headerupdatesnotice").click((function() {
                return toggleHeaderSubnav(this), $("#updatessubnav").data("loaded") || $("#updatessubnav").load("/users/new_updates?notification=activity,mention", (function(data) {
                    $(this).html(data), $("#updatessubnav").data("loaded", !0), setUpdatesCount(0, {
                        skipAnimation: !0
                    });
                    var tipOptions = $.extend(!0, {}, QTIP_DEFAULTS, {
                        position: {
                            my: "right center",
                            at: "left center",
                            target: "event"
                        },
                        content: {
                            text: '<span class="loading status">' + I18n.t("loading") + "</span>",
                            ajax: {
                                type: "GET",
                                data: {
                                    partial: "cached_component"
                                }
                            }
                        }
                    });
                    tipOptions.style.classes += " compact mini observations", tipOptions.style.width = 250, $('li a[href*="/observations/"]', this).each((function() {
                        tipOptions.position.target = $(this).parents("li:first"), tipOptions.content.ajax.url = $(this).attr("href"), $(this).qtip(tipOptions)
                    }))
                })), !1
            })), $("#headermessagesnotice").click((function() {
                return toggleHeaderSubnav(this), $("#messagessubnav").data("loaded") || $("#messagessubnav").load("/messages/new_messages", (function(data) {
                    $(this).html(data), $("#messagessubnav").data("loaded", !0), setMessagesCount(0, {
                        skipAnimation: !0
                    })
                })), !1
            })), $("#header #mainnav .dropdown .dropdown-toggle a, #header #usernav .user .dropdown .dropdown-toggle a").on("click", (function(e) {
                return inatIsMobile() || (window.location = e.currentTarget.href), !1
            })), $("#header #mainnav .dropdown, #header #usernav .user .dropdown").on("mouseover", (function() {
                var $dropdown = $(this);
                if ($dropdown.is(".dropdown") || ($dropdown = $dropdown.parents(".dropdown:first")), !$dropdown.is(".disabled, :disabled")) return $dropdown.addClass("open"), $dropdown.focus(), !1
            })).on("mouseout", (function() {
                var $dropdown = $(this);
                $dropdown.is(".dropdown") && $dropdown.removeClass("open")
            })), $("#header #messagesnav .dropdown").on("click", (function(e) {
                0 === $(e.target).parents(".dropdown-menu").length && ($(this).toggleClass("open"), $(this).attr("aria-expanded", "true" === $(this).attr("aria-expanded") ? "false" : "true"), $("#header #updatesnav .dropdown").removeClass("open"), $("#header #updatesnav .dropdown").attr("aria-expanded", "false"))
            })), $("#header #updatesnav .dropdown").on("click", (function(e) {
                0 === $(e.target).parents(".dropdown-menu").length && ($(this).toggleClass("open"), $(this).attr("aria-expanded", "true" === $(this).attr("aria-expanded") ? "false" : "true"), $("#header #messagesnav .dropdown").removeClass("open"), $("#header #messagesnav .dropdown").attr("aria-expanded", "false"))
            })), $("body").on("click", (function(e) {
                $("#header #messagesnav .dropdown").is(e.target) || 0 !== $("#header #messagesnav .dropdown").has(e.target).length || 0 !== $(".open").has(e.target).length || ($("#header #messagesnav .dropdown").removeClass("open"), $(this).attr("aria-expanded", "false"))
            })), $("body").on("click", (function(e) {
                $("#header #updatesnav .dropdown").is(e.target) || 0 !== $("#header #updatesnav .dropdown").has(e.target).length || 0 !== $(".open").has(e.target).length || ($("#header #updatesnav .dropdown").removeClass("open"), $(this).attr("aria-expanded", "false"))
            })), $("#header #messagesnav .dropdown").on("click", (function() {
                $("#messagessubnav").data("loaded") || $("#messagessubnav").load("/messages/new_messages", (function(data) {
                    $(this).html(data), $("#messagessubnav").data("loaded", !0)
                }))
            })), $("#header #updatesnav .dropdown").on("click", (function() {
                $("#updatessubnav").data("loaded") || $("#updatessubnav").load("/users/new_updates?notification=activity,mention", (function(data) {
                    $(this).html(data), $("#updatessubnav").data("loaded", !0), setUpdatesCount(0, {
                        skipAnimation: !0
                    });
                    var tipOptions = $.extend(!0, {}, QTIP_DEFAULTS, {
                        position: {
                            my: "right center",
                            at: "left center",
                            target: "event"
                        },
                        content: {
                            text: '<span class="loading status">' + I18n.t("loading") + "</span>",
                            ajax: {
                                type: "GET",
                                data: {
                                    partial: "cached_component"
                                }
                            }
                        }
                    });
                    tipOptions.style.classes += " compact mini observations", tipOptions.style.width = 250, $('li a[href*="/observations/"]', this).each((function() {
                        tipOptions.position.target = $(this).parents("li:first"), tipOptions.content.ajax.url = $(this).attr("href"), $(this).qtip(tipOptions)
                    }))
                }))
            })), $(".commentpreviewbutton").click((function() {
                var button = this;
                return $.ajax($(this).attr("href"), {
                    type: "POST",
                    data: $(this).parents("form").serialize() + "&preview=true",
                    dataType: "json",
                    beforeSend: function() {
                        $(button).hide(), $(button).nextAll(".loading").show()
                    }
                }).done((function(data) {
                    $(button).show(), $(button).nextAll(".loading").hide();
                    var html = data.html || data.body || "";
                    html = '<div class="dialog">' + html + "</div>", $(html).dialog({
                        modal: !0,
                        title: I18n.t("preview"),
                        width: .7 * $(window).width()
                    })
                })), !1
            })), $(".identificationform").bind("ajax:before", (function() {
                $(".default.button", this).hide(), $(".loading", this).show()
            })).bind("ajax:complete", (function() {
                $(".default.button", this).show(), $(".loading", this).hide()
            })).bind("ajax:success", (function(event, json) {
                $(this).parents(".identification_form_wrapper:first").fadeOut(), $(this).parents(".identifications").find(".identifications-list").append(json.html), $(this).parents(".identifications").find(".identifications-list .identification:last").addClass("stacked")
            })).bind("ajax:error", (function(event, request, settings) {
                var json = eval("(" + request.responseText + ")");
                if (json.errors) {
                    var errors = json.errors.join(", ");
                    alert("Failed to save identification: " + errors)
                }
            })), $(".friend_link").bind("ajax:before", (function() {
                $(this).fadeOut((function() {
                    $(this).siblings(".unfriend_link").fadeIn()
                }))
            })), $(".unfriend_link").bind("ajax:before", (function() {
                $(this).fadeOut((function() {
                    $(this).siblings(".friend_link").fadeIn()
                }))
            })), $(".commentform").bind("ajax:before", (function() {
                $(this).siblings(".loading").show(), $(this).hide()
            })).bind("ajax:complete", (function() {
                $(this).siblings(".loading").hide(), $(this).show(), $("input[type=submit]", this).val("Save comment").attr("disabled", !1)
            })).bind("ajax:success", (function(e, json) {
                $("textarea", this).val("");
                var wrapper = $(this).parents(".comments_wrapper:first");
                wrapper.find(".comments").show(), wrapper.find(".noresults").hide(), wrapper.find(".comments").append(json.html), $(".item .item_content", wrapper).width((function() {
                    return $(this).parent().width() - 58
                }))
            })).bind("ajax:error", (function(xhr, status, error) {
                alert(error)
            })), $("form:has(input[required])").submit(checkFormForRequiredFields), $("body.browser .item .item_content").width((function() {
                return $(this).parent().width() - 58
            })), setTimeout((function() {
                $(".identification:visible .identification_body").width((function() {
                    return $(this).parent().outerWidth(!0) - $(this).siblings(".identification_image").outerWidth(!0) - 25
                }))
            }), 1e3), $(".dna").dnaHighlight(), $("#header").length > 0) {
            function showHeaderSearch() {
                $("#headersearch").addClass("open"), $("#header").addClass("search-open"), $("#headersearch input").focus(), $("#headersearch input").attr("tabindex", null), updateSession({
                    header_search_open: !0
                })
            }

            function hideHeaderSearch() {
                $("#headersearch").removeClass("open"), $("#header").removeClass("search-open"), $("#headersearch input").attr("tabindex", -1), updateSession({
                    header_search_open: !1
                })
            }
            $("#header .search input").universalAutocomplete(), $("#header .show-btn").click(showHeaderSearch), $("#header .hide-btn").click(hideHeaderSearch), $(document).bind("keyup", (function(e) {
                var forwardSlashKeyCode = 191;
                return e.which !== forwardSlashKeyCode || ("textarea" === e.target.type || "text" === e.target.type || "search" === e.target.type || "datetime" === e.target.type || "email" === e.target.type || "password" === e.target.type || void showHeaderSearch())
            }))
        }
        $("button[data-enable-with-js]").attr("disabled", !1)
    })), jQuery.fn.autolink = function() {
        return this.each((function() {
            var re = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
            $(this).html($(this).html().replace(re, '<a href="$1">$1</a> '))
        }))
    }, $.fn.preload = function() {
        this.each((function() {
            $("<img/>")[0].src = this
        }))
    }, $(document).on("click", ".ui-widget-overlay, .shades", (function() {
        $(".dialog:visible").dialog("close")
    })), $.fn.shades = function(e, options) {
        switch (options = options || {}, elt = this[0], e) {
            case "close":
                $(elt).find(".shades:last").hide();
                break;
            case "remove":
                $(elt).find(".shades:last").remove();
                break;
            default:
                var shades = $(elt).find(".shades:last")[0] || $('<div class="shades"></div>'),
                    underlay = $('<div class="underlay"></div>'),
                    overlay = $('<div class="overlay"></div>').html(options.content);
                $(shades).html("").append(underlay, overlay), options.css && $(underlay).css(options.css), elt != document.body && ($(elt).css("position", "relative"), $(shades).css("position", "absolute"), $(underlay).css("position", "absolute")), $(elt).append(shades), $(shades).show()
        }
    }, $.fn.loadingShades = function(e, options) {
        if (options = options || {}, e && "close" == e) $(this).shades(e, options);
        else {
            var txt = e || I18n.t("loading"),
                msg = '<div class="loadingShadesMsg"><span class="loading ' + (options.cssClass || "bigloading") + ' status inlineblock">' + txt + "</span></div>";
            options = $.extend(!0, options, {
                css: {
                    "background-color": "white"
                },
                content: msg
            }), $(this).shades("open", options);
            var status = $(".shades .loading.status", this);
            status.css({
                position: "absolute",
                top: options.top || "50%",
                left: options.left || "50%",
                marginTop: -1 * status.outerHeight() / 2 + "px",
                marginLeft: -1 * status.outerWidth() / 2 + "px"
            })
        }
    }, $.fn.showInlineBlock = function() {
        var opts = {
            display: "inline-block"
        };
        return $(this).css(opts), this
    }, $.fn.disable = function() {
        return $(this).attr("disabled", !0).addClass("disabled"), this
    }, $.fn.enable = function() {
        return $(this).attr("disabled", !1).removeClass("disabled"), this
    }, $.fn.toggleDisabled = function() {
        $(this).hasClass("disabled") ? $(this).enable() : $(this).disable()
    }, $.fn.lock = function() {
        $(this).each((function() {
            var replacement = $(this).clone();
            replacement.attr("name", "").val($(this).val()).addClass("lock-replacement").disable(), $(this).after(replacement), $(this).hide().data("locked", !0)
        }))
    }, $.fn.unlock = function() {
        $(this).each((function() {
            $(this).nearest(".lock-replacement").remove(), $(this).show().data("locked", !1)
        }))
    }, $(document).ready((function() {
        $(":input[data-locked]").lock()
    })), $.fn.zoomify = function() {
        var selection = $(this).not(".zoomified");
        selection.addClass("zoomified").addClass("inlineblock").append('<img src="/assets/silk/magnifier-769be938ec8e3240d0c37574a9cec6b632fac9a4b74d52c838439a92220b39ea.png" class="zoom_icon"/>'), selection.click((function() {
            return 0 == $("#zoomable_dialog").length && $(document.body).append($("<div></div>").attr("id", "zoomable_dialog").addClass("dialog")), $("#zoomable_dialog").html('<div class="loading status">' + I18n.t("loading") + "</div>"), $("#zoomable_dialog").load($(this).attr("href"), "partial=photo", (function() {
                $("img", this).load((function() {
                    var dialog = $("#zoomable_dialog"),
                        newHeight = $(":first", dialog).height() + 60,
                        maxHeight = .8 * $(window).height();
                    newHeight > maxHeight && (newHeight = maxHeight), $(dialog).dialog("option", "height", newHeight), $(dialog).dialog("option", "position", {
                        my: "center",
                        at: "center",
                        of: $(window)
                    })
                }))
            })), $("#zoomable_dialog").dialog({
                modal: !0,
                title: $(this).attr("title") || $(this).attr("alt"),
                width: .8 * $(window).width()
            }), !1
        }))
    }, $.fn.slideToggleWidth = function() {
        $(this).each((function() {
            $(this).attr("data-original-width") && $(this).attr("data-original-width") != $(this).width() ? ($(this).show(), $(this).animate({
                width: $(this).attr("data-original-width")
            }, 500)) : ($(this).attr("data-original-width", $(this).width()), $(this).animate({
                width: 0
            }, 500, (function() {
                $(this).hide()
            })))
        }))
    }, $.fn.centerInContainer = function(options) {
        var containerSelector = (options = options || {}).container || ":first";
        $(this).not(".centeredInContainer").each((function() {
            var container = $(this).parents(containerSelector),
                containerWidth = container.width(),
                containerHeight = container.height(),
                w = $(this).naturalWidth(),
                h = $(this).naturalHeight();
            if (w > h) {
                var width = containerHeight / h * w;
                $(this).css({
                    height: containerHeight,
                    maxWidth: "none",
                    position: "absolute"
                }), $(this).css({
                    top: 0,
                    left: "50%",
                    marginLeft: "-" + width / 2 + "px"
                })
            } else if (w < h) {
                var height = containerWidth / w * h;
                $(this).css({
                    width: $(this).parents(containerSelector).width(),
                    maxHeight: "none",
                    position: "absolute"
                }), $(this).css({
                    left: 0,
                    top: "50%",
                    marginTop: "-" + height / 2 + "px"
                })
            } else {
                if (0 == w && 0 == h) {
                    if (options.secondAttempt) return;
                    var that = this;
                    return void setTimeout((function() {
                        $(that).centerInContainer(_.extend({}, options, {
                            secondAttempt: !0
                        }))
                    }), 500)
                }
                $(this).css({
                    width: $(this).parents(containerSelector).width(),
                    maxWidth: "none",
                    maxHeight: "none"
                }), $(this).css({
                    left: 0,
                    top: 0,
                    marginTop: "0px"
                })
            }
            $(this).addClass("centeredInContainer")
        }))
    }, $.fn.observationsGrid = function(size) {
        $(this).removeClass("mini map"), $(this).addClass("observations grid"), $(".observation", this).showInlineBlock(), $(".map", this).hide();
        var that = this;
        "medium" == size ? ($(this).addClass("medium"), $(".photos img[data-small-url]", this).each((function() {
            $(this).load((function() {
                $(this).centerInContainer({
                    container: ".observation:first"
                }), $(this).fadeIn(), $(this).unbind("load")
            })), $(this).attr("src", $(this).attr("data-small-url")), $(this).hide()
        })), $(".icon img[data-small-url]", this).each((function() {
            $(this).attr("src", $(this).attr("data-small-url"))
        }))) : ($(that).removeClass("medium"), $(".photos img[data-square-url]", that).attr("style", ""), $(".photos img[data-square-url]", that).removeClass("centeredInContainer"), $(".photos img[data-square-url]", that).attr("src", (function() {
            return $(this).attr("data-square-url")
        })), $(".icon img[data-square-url]", that).attr("src", (function() {
            return $(this).attr("data-square-url")
        })))
    }, $.fn.observationsList = function() {
        $(".observation", this).show().css("display", "block"), $(".map", this).hide(), $(this).removeClass("medium grid map"), $(this).addClass("mini"), $(".photos img[data-square-url]", this).attr("style", ""), $(".photos img[data-square-url]", this).removeClass("centeredInContainer"), $(".photos img[data-square-url]", this).attr("src", (function() {
            return $(this).attr("data-square-url")
        })), $(".icon img[data-square-url]", this).attr("src", (function() {
            return $(this).attr("data-square-url")
        }))
    }, $.fn.observationsMap = function() {
        $(this).observationsList(), $(this).removeClass("medium grid mini"), $(this).addClass("map"), $(this).each((function() {
            if ($(".map", this).length > 0) return $(".map", this).show(), void google.maps.event.trigger($(".map", this).get(0), "resize");
            var w = $(this).width(),
                h = $(window).height() / $(window).width() * w,
                mapDiv = $("<div></div>");
            mapDiv.addClass("stacked map"), mapDiv.width(w), "this" == $(this).data("map-height") ? mapDiv.height($(this).height()) : mapDiv.height(h), $(this).prepend(mapDiv);
            var map = iNaturalist.Map.createMap({
                div: mapDiv.get(0)
            });
            if ("object" == typeof CURRENT_USER && (map.setMapTypeId(iNaturalist.Map.preferredMapTypeId(CURRENT_USER)), !map.mapTypeListener)) {
                function setMapTypeAndUpdateSession() {
                    updateSession({
                        prefers_observations_search_map_type: this.getMapTypeId()
                    })
                }
                map.mapTypeListener = google.maps.event.addListener(map, "maptypeid_changed", setMapTypeAndUpdateSession)
            }
            $(".observation", this).each((function() {
                var o = {
                    id: $(this).attr("id").split("-")[1],
                    latitude: $(this).attr("data-latitude"),
                    longitude: $(this).attr("data-longitude"),
                    coordinates_obscured: $(this).attr("data-coordinates-obscured"),
                    taxonId: $(this).attr("data-taxon-id"),
                    iconic_taxon: {
                        name: $(this).attr("data-iconic-taxon-name")
                    }
                };
                map.addObservation(o)
            })), map.zoomToObservations()
        })), $(".observation", this).hide()
    }, $.fn.observationControls = function(options) {
        options = options || {};
        $(this).each((function() {
            var observations = options.div || $(this).parent().find(".observations"),
                gridButton = $(".gridbutton", this);
            options.skipGrid || 0 != gridButton.length || ((gridButton = $('<a href="#" class="gridbutton" title="' + I18n.t("grid_tooltip") + '"><span class="inat-icon ui-icon ui-icon-grid inlineblock">&nbsp;</span><label>' + I18n.t("grid") + "</label></a>")).data("gridSize", $(observations).hasClass("medium") ? "medium" : null), gridButton.click((function() {
                return $(observations).observationsGrid($(this).data("gridSize")), $(this).siblings().addClass("disabled"), $(this).removeClass("disabled"), !1
            })));
            var listButton = $(".listbutton", this);
            options.skipList || 0 != listButton.length || (listButton = $('<a href="#" class="listbutton" title="' + I18n.t("list_tooltip") + '"><span class="inat-icon ui-icon ui-icon-list inlineblock">&nbsp;</span><label>' + I18n.t("list") + "</label></a>")).click((function() {
                return $(observations).observationsList(), $(this).siblings().addClass("disabled"), $(this).removeClass("disabled"), !1
            }));
            var mapButton = $(".mapbutton", this);
            options.skipMap || 0 != mapButton.length || (mapButton = $('<a href="#" class="mapbutton" title="' + I18n.t("map_tooltip") + '"><span class="inat-icon ui-icon ui-icon-map inlineblock">&nbsp;</span><label>' + I18n.t("map") + "</label></a>")).click((function() {
                return $(observations).observationsMap(), $(this).siblings().addClass("disabled"), $(this).removeClass("disabled"), !1
            })), 0 == $(this).children().length && $(this).append(" ", gridButton, listButton, mapButton), $(observations).hasClass("grid") ? gridButton.click() : $(observations).hasClass("map") ? mapButton.click() : listButton.click()
        }))
    }, $.fn.naturalWidth = function() {
        $(this).get(0);
        var fakeImg = new Image;
        return fakeImg.src = $(this).attr("src"), fakeImg.width
    }, $.fn.naturalHeight = function() {
        $(this).get(0);
        var fakeImg = new Image;
        return fakeImg.src = $(this).attr("src"), fakeImg.height
    }, $.fn.subscriptionSettings = function() {
        var options = $.extend(!0, {
            position: {
                my: "top right",
                at: "bottom center"
            },
            show: {
                event: "click"
            },
            hide: {
                event: "unfocus"
            },
            content: {
                text: '<span class="loading status">' + I18n.t("loading") + "</span>",
                ajax: {
                    type: "GET",
                    data: {
                        partial: "edit_inline"
                    },
                    error: function() {
                        this.set("content.text", "<div class='meta'>You're no longer subscribed to that item.</div>")
                    },
                    success: function(data) {
                        this.set("content.text", data), $(".taxonchooser", this.elements.content).simpleTaxonSelector({
                            afterSelect: function(wrapper) {
                                var form = $(wrapper).parents("form:first"),
                                    data = form.serialize() + "&format=json";
                                $.ajax({
                                    url: form.attr("action"),
                                    type: "post",
                                    data: data
                                })
                            }
                        }), $(".createdestroy form", this.elements.content).submit((function() {
                            $(this).fadeOut((function() {
                                $(this).siblings("form").fadeIn()
                            }));
                            var data = $(this).serialize() + "&format=json",
                                resourceType = $("input[name*=resource_type]", this).val(),
                                resourceId = $("input[name*=resource_id]", this).val();
                            return $.ajax({
                                url: $(this).attr("action"),
                                type: "post",
                                data: data
                            }), $(this).hasClass("unsubscribe") ? $(".subscription_for_" + resourceType + "_" + resourceId).addClass("unsubscribed") : $(".subscription_for_" + resourceType + "_" + resourceId).removeClass("unsubscribed"), !1
                        }))
                    }
                }
            }
        }, QTIP_DEFAULTS);
        $(this).each((function() {
            var thisOptions = $.extend({}, options);
            if (thisOptions.content.ajax && (thisOptions.content.ajax.url = $(this).attr("href")), $(this).data("gear-text")) {
                var text = $(this).data("gear-text");
                $(this).data("gear-url") && (text = "<a href='" + $(this).data("gear-url") + "'>" + text + "</a>"), thisOptions.content = {
                    text: "<div class='meta'>" + text + "</div>"
                }, thisOptions.ajax = null
            }!1 === $(this).data("remote") && (thisOptions.content.ajax.success = function(data) {
                this.set("content.text", data);
                var handleAction = function(wrapper) {
                    var form = $(wrapper).parents("form:first"),
                        data = form.serialize() + "&format=json";
                    $.ajax({
                        url: form.attr("action"),
                        type: "post",
                        data: data
                    })
                };
                $(".taxonchooser", this.elements.content).simpleTaxonSelector({
                    afterSelect: handleAction,
                    afterUnselect: handleAction
                })
            }), $(this).qtip(thisOptions), $(this).click((function() {
                return !1
            }))
        }))
    }, Array.prototype.unique = function() {
        var i, o = {},
            l = this.length,
            r = [];
        for (i = 0; i < l; i += 1) o[this[i]] = this[i];
        for (i in o) r.push(o[i]);
        return r
    }, $.fn.serializeObject = function() {
        var o = {},
            a = this.serializeArray();
        return $.each(a, (function() {
            void 0 !== o[this.name] ? (o[this.name].push || (o[this.name] = [o[this.name]]), o[this.name].push(this.value || "")) : o[this.name] = this.value || ""
        })), o
    }, $.fn.centerDialog = function() {
        if (1 == $(this).children().length) var newHeight = $(":first", this).height() + 100;
        else newHeight = $(this).height() + 100;
        var maxHeight = .8 * $(window).height();
        newHeight > maxHeight && (newHeight = maxHeight), $(this).dialog("option", "height", newHeight), $(this).dialog("option", "position", {
            my: "center",
            at: "center",
            of: $(window)
        })
    }, $(document).on("click", ".flaglink", (function() {
        $("#flagdialog").remove();
        var dialog = $("<div></div>").attr("id", "flagdialog").addClass("dialog").html('<div class="loading status">' + I18n.t("loading") + "</div>");
        return dialog.load($(this).attr("href"), "partial=dialog", (function() {
            $(this).centerDialog(), $("input[type=radio]", this).change((function() {
                "other" == $(this).val() ? ($(this).parents(".dialog:first").find("textarea").show(), $(this).parents(".dialog:first").centerDialog()) : ($(this).parents(".dialog:first").find("textarea").hide(), $(this).parents(".dialog:first").centerDialog())
            }))
        })), $(document.body).append(dialog), dialog.dialog({
            modal: !0,
            title: I18n.t("flag_an_item")
        }), !1
    })), $(document).on("ajax:success", ".project_user_invitation .acceptlink", (function() {
        $(this).hide(), $(this).siblings(".status").html(I18n.t("joined!")).show().addClass("success").removeClass("loading")
    })), $(document).on("ajax:before", ".project_user_invitation .acceptlink", (function() {
        $(this).hide(), $(this).siblings(".status").html(I18n.t("loading")).show().addClass("loading")
    })), $(document).on("ajax:before", ".announcement .dismiss-announcement", (function() {
        $(this).parents(".announcement").fadeOut()
    })), $.fn.loadObservations = function(options) {
        var url = options.url || "/observations";
        url.match(/partial=/) || (url += url.match(/\?/) ? "&" : "?", url += "partial=cached_component");
        var req, container = this;
        if (req = $.ajax({
                type: "GET",
                url: url,
                success: function(data, status) {
                    var html = data.replace(/\/div>[\s\n]+?<div/g, "/div><div"),
                        oldObsId = $(".observation:first", container).attr("id");
                    if (oldObsId && new RegExp("^[^>]+" + oldObsId, "g").test(html)) return;
                    $(container).html(html), "list" == options.style ? $(container).observationsList() : "map" == options.style ? $(container).observationsMap() : $(container).observationsGrid("medium"), "function" == typeof options.success && options.success(req, data, status)
                }
            }), options.refresh) {
            var t = setTimeout((function() {
                container.loadObservations(options)
            }), options.refresh);
            container.data("loadObservationsTimeout", t)
        }
    }, $.fn.observationTaxonStats = function(options) {
        options = options || {};
        var container = this,
            baseSearch = "undefined" == typeof OBSERVATIONS_URL ? window.location.search : "?" + OBSERVATIONS_URL.split("?")[1],
            limit = options.limit || 5,
            url = options.url || "/observations/taxon_stats.json?limit" + limit;
        baseSearch = (baseSearch = baseSearch.replace(/per_page=[^&]+/, "")).replace(/page=[^&]+/, ""), $.getJSON(url, (function(json) {
            var speciesCount;
            speciesCount = json.rank_counts.leaves ? json.rank_counts.leaves : (json.rank_counts.species || 0) + (json.rank_counts.subspecies || 0) + (json.rank_counts.variety || 0) + (json.rank_counts.form || 0) + (json.rank_counts.hybrid || 0);
            var speciesCountLink = $("<a>" + speciesCount + "</a>").attr("href", "/observations/taxa" + baseSearch + "&hrank=species");
            if ($(".species .count", container).html(speciesCountLink), json.species_counts.length > 0) {
                var most;
                $(".most_observed table", container).html("");
                for (var i = 0; i < json.species_counts.length; i++)
                    if (json.species_counts[i].taxon) {
                        most = json.species_counts[i];
                        var tr = $("<tr></tr>"),
                            taxonTD = $('<td class="taxon"></td>'),
                            imageTD = $('<td class="image"></td>');
                        taxonTD.html($("<a></a>").addClass("nobr " + ("Scientific Names" == most.taxon.default_name.lexicon ? "scientific" : "")).attr("href", "/taxa/" + most.taxon.id).html(most.taxon.default_name.name)), imageTD.append($("<img/>").attr("src", most.taxon.image_url)), taxonTD.append($('<div class="meta"></div>').append(I18n.t("x_observations_link_html", {
                            count: most.count,
                            url: "/observations" + baseSearch + "&taxon_id=" + most.taxon.id
                        }))), tr.append(imageTD, taxonTD), $(".most_observed table", container).append(tr)
                    }
            }
            if (options.refresh) {
                var t = setTimeout((function() {
                    container.observationTaxonStats(options)
                }), options.refresh);
                container.data("observationTaxonStatsTimeout", t)
            }
        }))
    }, $.fn.observationUserStats = function(options) {
        var url = options.url || "/observations/taxon_stats.json",
            container = this,
            baseSearch = "undefined" == typeof OBSERVATIONS_URL ? window.location.search : "?" + OBSERVATIONS_URL.split("?")[1];
        baseSearch = (baseSearch = baseSearch.replace(/per_page=[^&]+/, "")).replace(/page=[^&]+/, ""), $.getJSON(url, (function(json) {
            var total = json.total || 0,
                totalLink = $("<a>" + total + "</a>").attr("href", "/observations/user_stats" + baseSearch);
            if ($(".people .count", container).html(totalLink), json.most_observations.length > 0) {
                $(".most_observations table", container).html("");
                for (var i = 0; i < json.most_observations.length; i++) {
                    var most = json.most_observations[i],
                        img_url = most.user.user_icon_url || "/attachment_defaults/users/icons/defaults/thumb.png",
                        tr = $("<tr></tr>"),
                        imageTD = $('<td class="image"></td>'),
                        userTD = $('<td class="user"></td>');
                    imageTD.append($("<a></a>").attr("href", "/people/" + most.user.login).append($("<img/>").attr("src", img_url).addClass("usericon"))), userTD.html($("<a>" + most.user.login + "</a>").attr("href", "/people/" + most.user.login)), userTD.append($("<div></div>").addClass("meta").html(I18n.t("x_observations_link_html", {
                        count: most.count,
                        url: "/observations" + baseSearch + "&user_id=" + most.user.login
                    }))), tr.append(imageTD, userTD), $(".most_observations table", container).append(tr)
                }
            }
            if (json.most_species.length > 0) {
                $(".most_species table", container).html("");
                for (i = 0; i < json.most_species.length; i++) {
                    var row = json.most_species[i];
                    img_url = row.user.user_icon_url || "/attachment_defaults/users/icons/defaults/thumb.png", tr = $("<tr></tr>"), imageTD = $('<td class="image"></td>'), userTD = $('<td class="user"></td>'), imageTD.append($("<img/>").attr("src", img_url).addClass("usericon")), userTD.html($("<a>" + row.user.login + "</a>").attr("href", "/people/" + row.user.login)), userTD.append($("<div></div>").addClass("meta").html(I18n.t("x_species_link_html", {
                        count: row.count,
                        url: "/observations/taxa" + baseSearch + "&user_id=" + row.user.login + "&hrank=species"
                    }))), tr.append(imageTD, userTD), $(".most_species table", container).append(tr)
                }
            }
            if (options.refresh) {
                var t = setTimeout((function() {
                    container.observationUserStats(options)
                }), options.refresh);
                container.data("observationUserStats", t)
            }
        }))
    }, $.fn.dnaHighlight = function() {
        $(this).each((function() {
            for (var newt = "", oldt = $(this).text(), i = 0; i < oldt.length; i++) switch (oldt[i]) {
                case "A":
                    newt += '<nt class="a">' + oldt[i] + "</nt>";
                    break;
                case "T":
                    newt += '<nt class="t">' + oldt[i] + "</nt>";
                    break;
                case "C":
                    newt += '<nt class="c">' + oldt[i] + "</nt>";
                    break;
                case "G":
                    newt += '<nt class="g">' + oldt[i] + "</nt>";
                    break;
                default:
                    newt += oldt[i]
            }
            $(this).html(newt)
        }))
    }, $.fn.textcompleteUsers = function() {
        this.textcomplete([{
            index: 1,
            match: /\B@([A-z][\\\w\\\-_]*)$/,
            search: function(term, callback) {
                $.getJSON("https://api.inaturalist.org/v1/users/autocomplete", {
                    q: term
                }).done((function(data) {
                    callback($.map(data.results, (function(user) {
                        var icon = user.icon || "/attachment_defaults/users/icons/defaults/thumb.png";
                        icon = icon.replace("thumb.", "medium.");
                        var label = user.login;
                        return user.name && (label = user.name + " (" + label + ")"), $('<div class="chooseritem">').append($('<div class="user_image usericon">').css({
                            backgroundImage: "url(" + icon + ")"
                        }), label).prop("outerHTML")
                    })))
                }))
            },
            replace: function(html) {
                var login, matches;
                return ((matches = html.match(/\(([^\s\<\>]+)\)<\/div>/)) || (matches = html.match(/([^\s\<\>]+)<\/div>/))) && (login = matches[1]), "@" + login + " "
            }
        }], {
            debounce: 500
        })
    }, $.fn.boldId = function() {
        $(this).each((function() {
            var bolddb;
            if (!($(".boldid", this).length > 0) && ($(this).hasClass("bold-its") || $(this).hasClass("bold-matk") || (bolddb = "COX1"), bolddb)) {
                var boldWrapper = $('<span class="boldid"><label><a href="http://www.boldsystems.org/">BOLD</a> DNA Match:</label></span>'),
                    boldLink = $('<span class="button inline status"><a href="#">Load DNA-based identification from BOLD</a></span>');
                boldWrapper.append(" ", boldLink), boldLink.click((function() {
                    return $(this).hide(), $(".status", boldWrapper).replaceWith('<span class="loading status inline">Loading BOLD ID...</span>'), $.get(url, (function(data) {
                        var name = $("match:first taxonomicidentification", data).text(),
                            similarity = $("match:first similarity", data).text(),
                            specimenURL = $("match:first url", data).text();
                        similarity = preciseRound(100 * parseFloat(similarity), 2), name ? $.getJSON("/taxa/search?q=" + name, (function(taxa) {
                            for (var taxon, i = 0; i < taxa.length; i++)
                                if (taxa[i].name == name) {
                                    taxon = taxa[i];
                                    break
                                }
                            if (taxon) {
                                var cssClass = "taxon " + [taxon.rank, taxon.iconic_taxon_name].join(" ");
                                $(".status", boldWrapper).replaceWith('<span class="iconic_taxon_sprite ' + taxon.iconic_taxon_name.toLowerCase() + ' selected">&nbsp;</span> <span class="' + cssClass + '"><a href="/taxa/' + taxon.id + '"><span class="sciname">' + name + "</span></span></span>")
                            } else $(".status", boldWrapper).replaceWith('<span class="taxon"><span class="sciname">' + name + "</span></span>");
                            $(boldWrapper).append(' <span class="meta">(' + similarity + "% match)</span>"), $(boldWrapper).append(' <a href="' + specimenURL + '" class="readmore">View matching specimen on BOLD</a>')
                        })) : $(".status", boldWrapper).replaceWith('<span class="status">No matches</span>')
                    })), !1
                })), $(this).after(boldWrapper);
                var url = "/identifications/bold.xml?db=" + bolddb + "&sequence=" + $(this).text()
            }
        }))
    }, $.fn.leaderboard = function(options) {
        $(this).addClass("leaderboard-container");
        var htmltable = $(this).html($('<table class="table">').append($("<thead>").append($("<tr>").append($("<th>").append("#"), $('<th class="user">').append(I18n.t("user")), $('<th class="numeric">').append(I18n.t("observations")), $('<th class="numeric">').append(I18n.t("species")))), $("<tbody>")));
        jQuery.fn.dataTableExt.oSort["numeric-html-asc"] = jQuery.fn.dataTableExt.oSort["numeric-html-asc"] || function(a, b) {
            return a.toString().match(/^\d+$/) || (a = parseInt($(a).text()) || 0, b = parseInt($(b).text()) || 0), a < b ? -1 : a > b ? 1 : 0
        }, jQuery.fn.dataTableExt.oSort["numeric-html-desc"] = jQuery.fn.dataTableExt.oSort["numeric-html-desc"] || function(a, b) {
            return a.toString().match(/^\d+$/) || (a = parseInt($(a).text()) || 0, b = parseInt($(b).text()) || 0), a < b ? 1 : a > b ? -1 : 0
        };
        var table = $("table", this).DataTable({
            bPaginate: !1,
            bLengthChange: !1,
            bFilter: !1,
            bInfo: !1,
            aaSorting: [
                [2, "desc"]
            ],
            aoColumns: [{
                bSortable: !1
            }, {
                sType: "html",
                sClass: "user"
            }, {
                sType: "numeric-html",
                sClass: "numeric",
                orderSequence: ["desc", "asc"]
            }, {
                sType: "numeric-html",
                sClass: "numeric",
                orderSequence: ["desc", "asc"]
            }],
            fnDrawCallback: function(oSettings) {
                var that = this;
                (oSettings.bSorted || oSettings.bFiltered) && this.$("td:first-child", {
                    filter: "applied"
                }).each((function(i) {
                    that.fnUpdate(i + 1, this.parentNode, 0, !1, !1)
                }))
            }
        });
        htmltable.loadingShades(), $.getJSON("/observations/user_stats?" + $.param(options), (function(data) {
            htmltable.shades("close");
            var users = {};
            $.each(data.most_observations, (function() {
                users[this.user.id] = {
                    user: this.user,
                    observations: this.count
                }
            })), $.each(data.most_species, (function() {
                users[this.user.id] = users[this.user.id] || {
                    user: this.user
                }, users[this.user.id].species = this.count
            })), $.each(users, (function(i) {
                var linkOptions = $.extend({}, options, !0);
                delete linkOptions.limit;
                var row = [i, $("<a>").attr("href", "/people/" + this.user.login).html($("<img>").attr("src", this.user.user_icon_url || "https://www.inaturalist.org/attachment_defaults/users/icons/defaults/thumb.png")).prop("outerHTML") + $("<a>").attr("href", "/people/" + this.user.login).html(this.user.login).prop("outerHTML"), $("<a>").attr("href", "/observations/" + this.user.login + "?" + $.param(linkOptions)).html(this.observations || "*").prop("outerHTML"), $("<a>").attr("href", "/observations/taxa?" + $.param($.extend({}, linkOptions, {
                    user_id: this.user.login,
                    hrank: "species"
                }, !0))).html(this.species || "*").prop("outerHTML")];
                table.row.add(row)
            })), table.draw()
        }))
    }, $.fn.isolatedScroll = function() {
        return this.bind("mousewheel DOMMouseScroll", (function(e) {
            var delta = e.wheelDelta || e.originalEvent && e.originalEvent.wheelDelta || -e.detail,
                bottomOverflow = this.scrollTop + $(this).outerHeight() - this.scrollHeight >= 0,
                topOverflow = this.scrollTop <= 0;
            (delta < 0 && bottomOverflow || delta > 0 && topOverflow) && e.preventDefault()
        })), this
    }, $.fn.confirmModal = function(options) {
        var that = this,
            action = $(this).is("form") ? "submit" : "click";
        that.on(action, (function(e, opts) {
            if ((!opts || !opts.forceSubmit) && (!_.isFunction(options.condition) || options.condition())) {
                e.preventDefault();
                var dialogDiv = $("<div/>").addClass("dialog"),
                    confirm = $("<input/>").addClass("default button").attr({
                        type: "button",
                        value: options.confirmText || I18n.t("proceed")
                    }),
                    cancel = $("<input/>").addClass("button").attr({
                        type: "button",
                        value: I18n.t("cancel")
                    });
                confirm.on("click", (function() {
                    _.isFunction(options.confirmValidation) && !options.confirmValidation() || (dialogDiv.dialog("close"), that.trigger(action, {
                        forceSubmit: !0
                    }), _.isFunction(options.onConfirm) && options.onConfirm())
                })), cancel.on("click", (function() {
                    dialogDiv.dialog("close"), _.isFunction(options.onCancel) && options.onCancel()
                }));
                var buttonsDiv = $("<div/>").addClass("foot").append(confirm).append(cancel);
                if (options.silencePreference) {
                    var checkbox = $("<input type='checkbox' id='silence' />");
                    checkbox.on("click", (function() {
                        var pref = {};
                        pref[options.silencePreference] = $(this).is(":checked"), updateSession(pref)
                    })), buttonsDiv.append(checkbox), buttonsDiv.append($("<label for='silence'>").append(I18n.t("do_not_show_this_message_again")))
                }
                var text = _.isFunction(options.text) ? options.text() : options.text;
                dialogDiv.append($("<p/>").append(text)), options.additionalContent && dialogDiv.append(options.additionalContent), dialogDiv.append(buttonsDiv), $(document.body).append(dialogDiv), dialogDiv.dialog({
                    modal: !0,
                    title: options.titleText || I18n.t("attention"),
                    dialogClass: "confirm-modal",
                    minWidth: 450,
                    maxWidth: 600
                }), dialogDiv.centerDialog(), $(":focus").blur()
            }
        }))
    }, $(document).ready((function() {
        $(".bootstrap .button.default").addClass("btn btn-primary").removeClass("button default"), $(".bootstrap .inter").addClass("btn btn-link").removeClass("inter"), $(".bootstrap .button").addClass("btn btn-default").removeClass("button"), $('[data-toggle="popover"]').popover({
            html: !0
        }), $("html").on("mouseup", (function(e) {
            $(e.target).closest("[data-toggle]").length || $(e.target).closest(".popover").length || $(".popover").each((function() {
                $(this.previousSibling).popover("hide"), $(this.previousSibling).data("bs.popover") && $(this.previousSibling).data("bs.popover").inState && $(this.previousSibling).data("bs.popover").inState.click && ($(this.previousSibling).data("bs.popover").inState.click = !1)
            }))
        }))
    })), $ && $.fn && void 0 !== $.fn.button && void 0 !== $.fn.button.noConflict) var bootstrapButton = $.fn.button.noConflict();
! function() {
    var iNaturalist = window.iNaturalist = new function() {
        this.registerNameSpace = function(ns) {
            for (var nsParts = ns.split("."), root = window, i = 0; i < nsParts.length; i++) void 0 === root[nsParts[i]] && (root[nsParts[i]] = new Object), root = root[nsParts[i]]
        }, this.restfulDelete = function(deleteURL, options, target) {
            if (void 0 === options.plural) var plural = !1;
            else {
                plural = options.plural;
                options.plural = null
            }
            var ajaxOptions = $.extend({}, options, {
                type: "POST",
                data: $.extend({
                    _method: "delete",
                    authenticity_token: $("meta[name=csrf-token]").attr("content")
                }, options.data),
                url: deleteURL
            });
            if (confirmStr = plural ? "Are you sure you want to delete these?" : "Are you sure you want to delete this?", !confirm(confirmStr)) return !1;
            if (void 0 !== target) {
                $(target).hide();
                var deleteStatus = $('<span class="loading status">Deleting...</span>');
                $(target).after(deleteStatus)
            }
            $.ajax(ajaxOptions)
        }, this.modalShow = function(hash) {
            iNaturalist.modalCenter(hash.w), hash.w.show(), hash.c.overlay > 0 && hash.o.prependTo("body")
        }, this.modalCenter = function(elt) {
            elt.height("auto");
            var height = .9 * $(window).height();
            elt.height() < height && (height = elt.height()), (height = elt.height()) ? elt.height("auto") : elt.height(height);
            var top = $(window).scrollTop() + $(window).height() / 2 - elt.height() / 2 - 20;
            elt.css("top", top + "px")
        }, this.localeParams = function() {
            var localeParams = {
                locale: I18n.locale
            };
            return PREFERRED_PLACE && (localeParams.preferred_place_id = PREFERRED_PLACE.id), localeParams
        }, this.Licenses = {
            c: {
                code: "C",
                short: "(c)",
                name: "Copyright",
                url: "http://en.wikipedia.org/wiki/Copyright",
                icon: null,
                icon_large: null
            },
            "cc-by-nc-sa": {
                code: "CC-BY-NC-SA",
                short: "CC BY-NC-SA",
                name: "Creative Commons Attribution-NonCommercial-ShareAlike License",
                url: "http://creativecommons.org/licenses/by-nc-sa/4.0/",
                icon: "/assets/CC-BY-NC-SA_small-85f19714f6892ca949e763a35e9c759e2106dfde13187799f9b3a0796098c22c.png",
                icon_large: "/assets/CC-BY-NC-SA-a7749536d535922dbf0f644220809345d63aec5c05741e667e70c4b409046cf6.png"
            },
            "cc-by-nc": {
                code: "CC-BY-NC",
                short: "CC BY-NC",
                name: "Creative Commons Attribution-NonCommercial License",
                url: "http://creativecommons.org/licenses/by-nc/4.0/",
                icon: "/assets/CC-BY-NC_small-8cb103ee08dccdbe1ba4ec084017fe10e086826d1fa8645109f75ebbd99c8544.png",
                icon_large: "/assets/CC-BY-NC-dd72648f7ae0d6cc6972c17f3a4943cb1954b2f01a2acd24116a0aaa51c996b3.png"
            },
            "cc-by-nc-nd": {
                code: "CC-BY-NC-ND",
                short: "CC BY-NC-ND",
                name: "Creative Commons Attribution-NonCommercial-NoDerivs License",
                url: "http://creativecommons.org/licenses/by-nc-nd/4.0/",
                icon: "/assets/CC-BY-NC-ND_small-a2a1b2171b8d9c5ae1c31b9466373e822eb785cecc42995e19e450e582f9dd00.png",
                icon_large: "/assets/CC-BY-NC-ND-72846f1f9166497188b15fd263fa8bf8cfd9bb0e85baa36532086ae197f290e1.png"
            },
            "cc-by": {
                code: "CC-BY",
                short: "CC BY",
                name: "Creative Commons Attribution License",
                url: "http://creativecommons.org/licenses/by/4.0/",
                icon: "/assets/CC-BY_small-cc17e09e34120997b6fa069657b14dc28a42714fbe9bb0959894f3ee93bd7ff4.png",
                icon_large: "/assets/CC-BY-77b20339c888559fbd06fcfcb159da280ec37ddcc03b3ca48696bb28fcbd61b6.png"
            },
            "cc-by-sa": {
                code: "CC-BY-SA",
                short: "CC BY-SA",
                name: "Creative Commons Attribution-ShareAlike License",
                url: "http://creativecommons.org/licenses/by-sa/4.0/",
                icon: "/assets/CC-BY-SA_small-38588da3aaef010f361ddec85629fa83e47398d86c79134e827b2d498c3fe412.png",
                icon_large: "/assets/CC-BY-SA-1e137d59e2fe177f87fc81b39bcc9d03d1f0bb2b5ad00bbb4498ca77cf2ac027.png"
            },
            "cc-by-nd": {
                code: "CC-BY-ND",
                short: "CC BY-ND",
                name: "Creative Commons Attribution-NoDerivs License",
                url: "http://creativecommons.org/licenses/by-nd/4.0/",
                icon: "/assets/CC-BY-ND_small-e2a464d21dbc54ef6828ae63ff22e0e9505939c6ce3235d8c8590dbef58fe5df.png",
                icon_large: "/assets/CC-BY-ND-d2521db8e63f050cc47b1c56ccd6dd8e8865b14c812b1b1cd55525d99ce00fcd.png"
            },
            pd: {
                code: "PD",
                short: "PD",
                name: "Public domain",
                url: "http://en.wikipedia.org/wiki/Public_domain",
                icon: null,
                icon_large: null
            },
            gfdl: {
                code: "GFDL",
                short: "GFDL",
                name: "GNU Free Documentation License",
                url: "http://www.gnu.org/copyleft/fdl.html",
                icon: null,
                icon_large: null
            },
            cc0: {
                code: "CC0",
                short: "CC0",
                name: "Creative Commons CC0 Universal Public Domain Dedication",
                url: "http://creativecommons.org/publicdomain/zero/1.0/",
                icon: "/assets/CC0_small-e25729564f3899c2f35260cbbae3cba5b689d5494cbee2729c6d55a02e4340e4.png",
                icon_large: "/assets/CC0-948e4861507ca24fc89ac392bd6961d568625a4e11e786882e9fb1b9f5a4ebb5.png"
            }
        }, this.log = function(params, options) {
            options = options || {};
            try {
                if ("object" != typeof SITE || "iNaturalist" !== SITE.name) return;
                var apiUrl = $("meta[name='config:inaturalist_api_url']").attr("content");
                if (!apiUrl) return;
                var jwt = $("meta[name='inaturalist-api-token']").attr("content"),
                    url = apiUrl + "/log";
                "string" == typeof CONTROLLER_ACTION && (params.controller_action = CONTROLLER_ACTION), "POST" === options.method ? options.data = JSON.stringify(params) : url += "?" + $.param(params);
                var ajaxOpts = Object.assign(options, {
                    url: url
                });
                jwt && jwt.length > 0 && (ajaxOpts.headers = {
                    Authorization: jwt
                }), $.ajax(ajaxOpts)
            } catch (e) {
                console.log("[DEBUG] Failed to log: ", e)
            }
        }, this.logError = function(error) {
            this.log({
                error_type: error.name,
                error_message: error.message,
                backtrace: error.stack
            }, {
                method: "POST",
                dataType: "json"
            })
        }
    };
    iNaturalist.version = .1, iNaturalist.form_authenticity_token = null
}(),
function($) {
    function setup(input, options) {
        $(input).wrap($('<div class="simpleTaxonSelector clear"></div>'));
        var wrapper = $(input).parent();
        $(wrapper).css({
            position: "relative",
            width: options.inputWidth,
            "margin-bottom": $(input).css("margin-bottom")
        }), $(wrapper).data("simpleTaxonSelectorOptions", options);
        var taxon_id = getTaxonID(wrapper, options),
            imageURL = "/assets/iconic_taxa/unknown-32px-2d8741bf0ec894e06623eede31bcfe7595c7d4458df3bce79ab8eb983980546d.png";
        void 0 !== $(taxon_id).attr("rel") && "" != $(taxon_id).attr("rel") && (imageURL = $(taxon_id).attr("rel"));
        var image = $('<img src="' + imageURL + '" class="simpleTaxonSelectorImage"/>');
        $(wrapper).prepend(image);
        var button = $('<input type="button" class="button" />');
        $(button).css({
            margin: 0,
            float: "left"
        }).val(options.buttonText), $(button).height(options.inputHeight), $(wrapper).append(button), $(input).width(options.inputWidth - $(button).outerWidth() - 57), $(input).css({
            float: "left",
            "margin-right": "5px",
            "margin-bottom": "3px"
        }), $(button).click((function() {
            try {
                $.fn.simpleTaxonSelector.lookup(wrapper, options)
            } catch (e) {}
            return !1
        })), $(input).keypress((function(e) {
            if (13 == e.which) {
                try {
                    $.fn.simpleTaxonSelector.lookup(wrapper, options)
                } catch (e) {}
                return !1
            }
        })), $(input).blur((function() {
            "" == $.trim($(this).val()) && $.fn.simpleTaxonSelector.unSelectTaxon(wrapper, options)
        }));
        var status = $('<div class="status">' + I18n.t("species_unknown") + "</div>");
        $(status).css($.extend({}, $.fn.simpleTaxonSelector.styles.statuses.default, $.fn.simpleTaxonSelector.styles.statuses.unmatched)), $(wrapper).append(status), ($(input).val() && "" != $(input).val() || $(taxon_id).val() && "" != $(taxon_id).val()) && ("" != $(taxon_id).val() ? $(taxon_id).attr("alt") && "" != $(taxon_id).attr("alt") ? $.fn.simpleTaxonSelector.setStatus(wrapper, "matched", $(taxon_id).attr("alt")) : $.fn.simpleTaxonSelector.selectTaxonFromId(wrapper, $(taxon_id).val(), options) : $.fn.simpleTaxonSelector.lookup(wrapper, options))
    }

    function handleTaxa(wrapper, taxa, options) {
        options = $.extend({}, options);
        var searchEverywhereLink, searchEverywhereNotice, input = $(wrapper).find("input[type=text]:first"),
            q = $(input).val(),
            searchExternalLink = null;
        if (!CONFIG || !CONFIG.content_freeze_enabled) searchExternalLink = $('<a href="#">' + I18n.t("search_external_name_providers") + " &raquo;</a>").css({
            "font-weight": "bold"
        }).click((function() {
            return $.fn.simpleTaxonSelector.lookup(wrapper, $.extend({}, options, {
                includeExternal: !0
            })), !1
        }));
        var lastLookupOptions = $(wrapper).data("lastOptions") || {};
        if (options.placeName && (lastLookupOptions.everywhere ? (searchEverywhereLink = $('<a href="#">' + I18n.t("show_taxa_from_place", {
                place: options.placeName
            }) + "</a>").click((function() {
                return $.fn.simpleTaxonSelector.lookup(wrapper, $.extend({}, options, {
                    everywhere: !1
                })), !1
            })), searchEverywhereNotice = $("<div></div>").append(I18n.t("showing_taxa_from_everywhere"), " (", searchEverywhereLink, ")")) : (searchEverywhereLink = $('<a href="#">' + I18n.t("show_taxa_from_everywhere") + "</a>").click((function() {
                return $.fn.simpleTaxonSelector.lookup(wrapper, $.extend({}, options, {
                    everywhere: !0
                })), !1
            })), searchEverywhereNotice = $("<div></div>").append(I18n.t("showing_taxa_from_place", {
                place: options.placeName
            }), " (", searchEverywhereLink, ")"))), 0 == taxa.length) {
            var status = $("<span>" + I18n.t("no_results_for") + '"' + q + '".<br/></span>');
            $(input).focus(), options.includeSearchExternal && $(status).append(searchExternalLink), $.fn.simpleTaxonSelector.setStatus(wrapper, "unmatched", status)
        } else if (1 == taxa.length && taxa[0].taxon_names.map((function(n) {
                return n.name.toLowerCase()
            })).indexOf(q.toLowerCase()) >= 0) $.fn.simpleTaxonSelector.selectTaxon(wrapper, taxa[0], $.extend(!0, {}, options, {
            selectedName: q
        }));
        else {
            var message = $("<span>" + I18n.t("did_you_mean") + "</span>"),
                list = $('<ul class="matches"></ul>').css({
                    "margin-bottom": "3px"
                });
            $(taxa).each((function(i, taxon) {
                var chosenTaxonName = $.fn.simpleTaxonSelector.chosenTaxonNameFor(q, taxon);
                if (chosenTaxonName && chosenTaxonName.name != taxon.name) var t = $.fn.simpleTaxonSelector.taxonNameToS(chosenTaxonName, $.extend(!0, {}, options, {
                    taxon: taxon
                }));
                else t = $.fn.simpleTaxonSelector.taxonNameToS(taxon.default_name, $.extend(!0, {}, options, {
                    taxon: taxon
                }));
                var link = $("<a>" + I18n.t("view") + "</a>").attr("href", "/taxa/" + taxon.id).addClass("small");
                $(link).click((function() {
                    return window.open($(this).attr("href"), "_blank", "noopener,noreferrer"), !1
                })), $(t).append(" ", link);
                var li = $("<li></li>").append(t);
                list.append(li), $(t).click((function() {
                    return $.fn.simpleTaxonSelector.selectTaxon(wrapper, taxon, options), !1
                }))
            })), message.append(list);
            var links = [];
            links.push(searchEverywhereNotice), options.includeSearchExternal && links.push(searchExternalLink), links.length > 0 && message.append(links), $.fn.simpleTaxonSelector.setStatus(wrapper, "choice", message)
        }
    }

    function getTaxonID(wrapper, options) {
        if (void 0 !== (options = $.extend({}, options)).taxonIDField) return $(options.taxonIDField);
        var taxon_id = $(wrapper).siblings('input[name="taxon_id"]:first');
        return 0 == $(taxon_id).length && (taxon_id = $(wrapper).siblings('input[name*="[taxon_id]"]:first')), taxon_id
    }
    $.fn.simpleTaxonSelector = function(options) {
        void 0 === (options = $.extend({}, $.fn.simpleTaxonSelector.defaults, options)).inputWidth && (options.inputWidth = $(this).outerWidth()), options.placeName = options.placeName || ("object" == typeof SITE_PLACE && SITE_PLACE ? SITE_PLACE.name : null);
        var instances = [];
        return this.each((function() {
            instances.push(setup(this, options))
        })), instances
    }, $.fn.simpleTaxonSelector.setStatus = function(wrapper, statusType, message) {
        var status = $(wrapper).find(".status:first");
        $.each($.fn.simpleTaxonSelector.styles.statuses, (function(statusKey) {
            $(status).removeClass(statusKey)
        })), $(status).addClass(statusType), $(status).css($.fn.simpleTaxonSelector.styles.statuses[statusType]), void 0 !== message && ($(status).empty(), $(status).append(message))
    }, $.fn.simpleTaxonSelector.lookup = function(wrapper, options) {
        options = $.extend({}, $(wrapper).data("simpleTaxonSelectorOptions"), options);
        var input = $(wrapper).find("input[type=text]:first"),
            q = $(input).val(),
            url = "/taxa/search.json?per_page=10&q=" + q;
        if (options.includeExternal && (url += "&include_external=1"), options.forceExternal && (url += "&force_external=1"), options.isActive && (url += "&is_active=" + String(options.isActive)), options.everywhere && (url += "&everywhere=" + String(options.everywhere)), "" == q) return $.fn.simpleTaxonSelector.unSelectTaxon(wrapper, options), !1;
        $(wrapper).data("lastUrl", url), $(wrapper).data("lastOptions", options), $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            beforeSend: function() {
                $.fn.simpleTaxonSelector.setStatus(wrapper, "loading", I18n.t("loading"))
            },
            success: function(data) {
                data.status && $.fn.simpleTaxonSelector.setStatus(wrapper, "error", data.status), handleTaxa(wrapper, data, options)
            },
            error: function() {}
        })
    }, $.fn.simpleTaxonSelector.unSelectTaxon = function(wrapper, options) {
        options = $.extend({}, $(wrapper).data("simpleTaxonSelectorOptions"), options);
        var input = $(wrapper).find("input[type=text]:first"),
            taxon_id = getTaxonID(wrapper, options),
            image = $(wrapper).find(".simpleTaxonSelectorImage:first");
        $(taxon_id).val(""), $(input).val(""), $.fn.simpleTaxonSelector.setStatus(wrapper, "unmatched", I18n.t("species_unknown")), $(image).attr("src", "/assets/iconic_taxa/unknown-32px-2d8741bf0ec894e06623eede31bcfe7595c7d4458df3bce79ab8eb983980546d.png"), $(wrapper).data("taxon", null), "function" == typeof options.afterUnselect && options.afterUnselect(wrapper, name, options)
    }, $.fn.simpleTaxonSelector.selectTaxon = function(wrapper, taxon, options) {
        options = $.extend({}, $(wrapper).data("simpleTaxonSelectorOptions"), options);
        var input = $(wrapper).find("input[type=text]:first"),
            q = $(input).val();
        if ("function" == typeof options.beforeSelect && 0 == options.beforeSelect(wrapper, taxon, options)) return !1;
        input = $(wrapper).find("input[type=text]:first");
        var taxon_id = getTaxonID(wrapper, options),
            chosenTaxonName = $.fn.simpleTaxonSelector.chosenTaxonNameFor(q, taxon);
        if ($(taxon_id).val(taxon.id).trigger("change"), void 0 !== options.selectedName ? $(input).val(options.selectedName) : void 0 !== chosenTaxonName ? $(input).val(chosenTaxonName.name) : $(input).val(taxon.name), chosenTaxonName && chosenTaxonName.name != taxon.name) var message = $.fn.simpleTaxonSelector.taxonNameToS(chosenTaxonName, $.extend(!0, {}, options, {
            taxon: taxon
        }));
        else if (taxon.default_name) message = $.fn.simpleTaxonSelector.taxonNameToS(taxon.default_name, $.extend(!0, {}, options, {
            taxon: taxon
        }));
        else message = $.fn.simpleTaxonSelector.taxonToS(taxon, options);
        $.fn.simpleTaxonSelector.setStatus(wrapper, "matched", message), void 0 !== taxon.image_url && $(wrapper).find(".simpleTaxonSelectorImage").attr("src", taxon.image_url), $(wrapper).data("taxon", taxon), "function" == typeof options.afterSelect && options.afterSelect(wrapper, taxon, options)
    }, $.fn.simpleTaxonSelector.selectTaxonFromId = function(wrapper, taxonId, options) {
        options = $.extend({}, options);
        $.fn.simpleTaxonSelector.setStatus(wrapper, "loading", I18n.t("loading")), jQuery.getJSON("/taxa/" + taxonId + ".json", (function(taxon) {
            $.fn.simpleTaxonSelector.selectTaxon(wrapper, taxon, options)
        }))
    }, $.fn.simpleTaxonSelector.taxonNameToS = function(name, options) {
        options = $.extend({}, options);
        var taxon = void 0 === name.taxon ? options.taxon : name.taxon,
            formatted = $('<span class="taxon"></span>');
        taxon.iconic_taxon && void 0 !== taxon.iconic_taxon ? formatted.addClass(taxon.iconic_taxon.name) : formatted.addClass("Unknown");
        var formattedSciName = $.fn.simpleTaxonSelector.taxonToS(taxon, $.extend(!0, {}, options, {
            skipClasses: !0
        }));
        if ("Scientific Names" == name.lexicon) name.is_valid ? $(formatted).append(formattedSciName) : ($(formatted).append(I18n.t("all_taxa." + name.name.toLowerCase().replace(/ /g, "_").replace(/-/g, "_"), {
            defaultValue: name.name
        }) + " (="), $(formatted).append(formattedSciName), $(formatted).append(")"));
        else {
            var titleCaseName = iNatModels.Taxon.titleCaseName(name.name);
            $(formatted).append(I18n.t("all_taxa." + name.name.toLowerCase().replace(/ /g, "_").replace(/-/g, "_"), {
                defaultValue: titleCaseName
            }) + " ("), $(formatted).append(formattedSciName), $(formatted).append(")")
        }
        return $(formatted).get(0)
    }, $.fn.simpleTaxonSelector.taxonToS = function(taxon, options) {
        options = $.extend({}, options);
        var formatted = $("<span></span>").append(taxon.name);
        return "species" == taxon.rank || "infraspecies" == taxon.rank || "genus" == taxon.rank ? $(formatted).wrapInner("<i></i>") : void 0 !== $.string ? $(formatted).prepend(I18n.t("ranks." + $.string(taxon.rank).str.toLowerCase(), {
            defaultValue: $.string(taxon.rank).capitalize().str
        }) + " ") : $(formatted).prepend(taxon.rank + " "), options.skipClasses || (formatted.addClass("taxon"), taxon.iconic_taxon ? formatted.addClass(taxon.iconic_taxon.name) : formatted.addClass("Unknown")), options.includeID && formatted.append(" " + taxon.id), "any" == options.isActive && (formatted.addClass(taxon.is_active ? "active" : "inactive"), 0 == taxon.is_active && formatted.append(" [inactive]")), $(formatted).get(0)
    }, $.fn.simpleTaxonSelector.taxonNameMatchesLocale = function(taxonName) {
        var lexicon = taxonName.lexicon || "";
        return "scientific names" == lexicon.toLowerCase() || ("en" == I18n.locale && "English" == lexicon || !(!I18n.locale || !I18n.locale.match(/^es/) || "Spanish" != lexicon))
    }, $.fn.simpleTaxonSelector.chosenTaxonNameFor = function(q, taxon) {
        for (var i = taxon.taxon_names.length - 1; i >= 0; i--) {
            if ((tn = taxon.taxon_names[i]) && q && tn.name.toLowerCase() == q.toLowerCase() && $.fn.simpleTaxonSelector.taxonNameMatchesLocale(tn)) return tn
        }
        for (i = taxon.taxon_names.length - 1; i >= 0; i--) {
            if ((tn = taxon.taxon_names[i]) && q && tn.name.toLowerCase() == q.toLowerCase() && "Scientific Names" != tn.lexicon) return tn
        }
        for (i = taxon.taxon_names.length - 1; i >= 0; i--) {
            if ((tn = taxon.taxon_names[i]) && q && tn.is_valid && tn.name.toLowerCase().indexOf(q.toLowerCase()) >= 0 && $.fn.simpleTaxonSelector.taxonNameMatchesLocale(tn)) return tn
        }
        for (i = taxon.taxon_names.length - 1; i >= 0; i--) {
            var tn;
            if ((tn = taxon.taxon_names[i]) && q && tn.name.toLowerCase().indexOf(q.toLowerCase()) >= 0 && $.fn.simpleTaxonSelector.taxonNameMatchesLocale(tn)) return tn
        }
        return taxon.default_name
    }, $.fn.simpleTaxonSelector.styles = {}, $.fn.simpleTaxonSelector.styles.statuses = {}, $.fn.simpleTaxonSelector.styles.statuses.default = {
        padding: "0 0 0 20px",
        margin: 0,
        border: 0,
        clear: "both"
    }, $.fn.simpleTaxonSelector.styles.statuses.matched = $.extend({}, $.fn.simpleTaxonSelector.styles.statuses.default, {
        color: "green",
        background: "transparent none",
        padding: 0
    }), $.fn.simpleTaxonSelector.styles.statuses.unmatched = $.extend({}, $.fn.simpleTaxonSelector.styles.statuses.default, {
        color: "#888",
        background: "url(/assets/logo-grey-15px-4c09684a4fcc2b8bdfc73770db479bf57058386c1142d98c1b38bb2023b90ead.png) 0 3px no-repeat"
    }), $.fn.simpleTaxonSelector.styles.statuses.choice = $.extend({}, $.fn.simpleTaxonSelector.styles.statuses.unmatched, {}), $.fn.simpleTaxonSelector.styles.statuses.error = $.extend({}, $.fn.simpleTaxonSelector.styles.statuses.default, {
        color: "DeepPink",
        background: "url('/assets/logo-DeepPink-15px-error-1ddf513ee1fcd62b8b854e590c44eb608b83dab5b5e0b5620d0de88a52996864.png') 0 3px no-repeat"
    }), $.fn.simpleTaxonSelector.styles.statuses.loading = $.extend({}, $.fn.simpleTaxonSelector.styles.statuses.default, {
        color: "#888",
        background: "url(/assets/spinner-small-e8c0cae72de4e69dc82f67e8614f96eafb9cafa4254b53a236b4b68b267ad5fe.gif) 0 3px no-repeat"
    }), $.fn.simpleTaxonSelector.defaults = {
        buttonText: I18n.t("lookup"),
        includeSearchExternal: !0
    }
}(jQuery);
var inaturalist = inaturalist || {};
inaturalist.ICONIC_TAXA = {
    1: {
        name: "Animalia",
        label: "animals",
        icon: "/assets/iconic_taxa/animalia-75px.png",
        id: 1
    },
    3: {
        name: "Aves",
        label: "birds",
        icon: "/assets/iconic_taxa/aves-75px.png",
        id: 3
    },
    20978: {
        name: "Amphibia",
        label: "amphibians",
        icon: "/assets/iconic_taxa/amphibia-75px.png",
        id: 20978
    },
    26036: {
        name: "Reptilia",
        label: "reptiles",
        icon: "/assets/iconic_taxa/reptilia-75px.png",
        id: 26036
    },
    40151: {
        name: "Mammalia",
        label: "mammals",
        icon: "/assets/iconic_taxa/mammalia-75px.png",
        id: 40151
    },
    47115: {
        name: "Mollusca",
        label: "mollusks",
        icon: "/assets/iconic_taxa/mollusca-75px.png",
        id: 47115
    },
    47119: {
        name: "Arachnida",
        label: "arachnids",
        icon: "/assets/iconic_taxa/arachnida-75px.png",
        id: 47119
    },
    47126: {
        name: "Plantae",
        label: "plants",
        icon: "/assets/iconic_taxa/plantae-75px.png",
        id: 47126
    },
    47158: {
        name: "Insecta",
        label: "insects",
        icon: "/assets/iconic_taxa/insecta-75px.png",
        id: 47158
    },
    47170: {
        name: "Fungi",
        label: "fungi",
        icon: "/assets/iconic_taxa/fungi-75px.png",
        id: 47170
    },
    47178: {
        name: "Actinopterygii",
        label: "ray_finned_fishes",
        icon: "/assets/iconic_taxa/actinopterygii-75px.png",
        id: 47178
    },
    47686: {
        name: "Protozoa",
        label: "protozoans",
        icon: "/assets/iconic_taxa/protozoa-75px.png",
        id: 47686
    },
    48222: {
        name: "Chromista",
        label: "chromista",
        icon: "/assets/iconic_taxa/chromista-75px.png",
        id: 48222
    }
}, inaturalist.UNKNOWN_TAXON_ICON = "/assets/iconic_taxa/unknown-75px.png", inaturalist.EXTERNAL_SEARCH_ICON = "/assets/external_search-e2967210699fa3de3909b591f7502cdbb3ae55e983065848b2779d81ac27ed5c.png";
var TAXON_AUTOCOMPLETE_FIELDS = {
        ancestor_ids: !0,
        default_photo: {
            square_url: !0
        },
        iconic_taxon_id: !0,
        iconic_taxon_name: !0,
        is_active: !0,
        matched_term: !0,
        name: !0,
        preferred_common_name: !0,
        rank: !0,
        rank_level: !0
    },
    autocompleter = {
        capitalize: function(s) {
            if (s) return s[0].toUpperCase() + s.slice(1)
        },
        defaultPhotoForResult: function(result) {
            return "search_external" !== result.type && "message" !== result.type && result.name ? result.photoTag ? result.photoTag() : null : "<i class='fa fa-search'></i>"
        },
        setTitle: function(result, options) {
            result.title || ((options = options || {}).user && options.user.prefers_scientific_name_first ? result.rank_level <= 10 ? result.title = "<i>" + result.name + "</i>" : result.title = result.name : _.isEmpty(result.preferred_common_names) ? result.title = iNatModels.Taxon.titleCaseName(result.preferred_common_name) || result.name || "" : (names = _.map(result.preferred_common_names, (function(taxonName) {
                return iNatModels.Taxon.titleCaseName(taxonName.name)
            })), result.title = names.join(" \xb7 ")), result.textTitle = autocompleter.stripRank(genericAutocomplete.stripTags(_.first(result.title.split(" \xb7 ")))))
        },
        setSubtitle: function(result, options) {
            options = options || {}, result.title && (options.user && options.user.prefers_scientific_name_first ? _.isEmpty(result.preferred_common_names) ? result.subtitle = iNatModels.Taxon.titleCaseName(result.preferred_common_name) : (names = _.map(result.preferred_common_names, (function(taxonName) {
                return iNatModels.Taxon.titleCaseName(taxonName.name)
            })), result.subtitle = names.join(" \xb7 ")) : result.name != result.title && (result.rank_level <= 10 ? result.subtitle = "<i>" + result.name + "</i>" : result.subtitle = result.name))
        },
        stripRank: function(txt) {
            return txt ? txt.replace(/^(Kingdom|Subkingdom|Phylum|Subphylum|Superclass|Class|Subclass|Infraclass|Superorder|Order|Suborder|Infraorder|Parvorder|Zoosection|Zoosubsection|Superfamily|Epifamily|Family|Subfamily|Supertribe|Tribe|Subtribe|Genus|Genushybrid|Subgenus|Section|Subsection)\s+(.+)/g, "$2") : txt
        },
        stringIncludes: function(string, test) {
            return !(!string || !test) && -1 != string.toLowerCase().indexOf(test.toLowerCase())
        },
        appendMatchedTerm: function(result, fieldValue) {
            result.matched_term && (autocompleter.stringIncludes(result.title, fieldValue) || autocompleter.stringIncludes(result.subtitle, fieldValue) || autocompleter.stringIncludes(result.title, result.matched_term) || autocompleter.stringIncludes(result.subtitle, result.matched_term) || (result.title += " (" + autocompleter.capitalize(result.matched_term) + ")"))
        },
        taxonTemplate: function(result, fieldValue, options) {
            if (options = options || {}, autocompleter.setTitle(result, options), autocompleter.setSubtitle(result, options), autocompleter.appendMatchedTerm(result, fieldValue), result.rank && (result.rank_level > 10 || !result.subtitle)) {
                var rank = autocompleter.capitalize(I18n.t("ranks." + result.rank, {
                    defaultValue: result.rank
                }));
                options.user && options.user.prefers_scientific_name_first ? result.title = rank + (result.title ? " " + result.title : "") : result.subtitle = rank + (result.subtitle ? " " + result.subtitle : "")
            }
            result.defaultPhoto = autocompleter.defaultPhotoForResult(result);
            var wrapperDiv = $("<div/>").addClass("ac").attr("data-taxon-id", result.id).attr("data-type", result.type),
                thumbDiv = $("<div/>").addClass("ac-thumb");
            result.defaultPhoto && $(result.defaultPhoto).appendTo(thumbDiv);
            var labelDiv = $("<div/>").addClass("ac-label"),
                labelInnerDiv = $("<div/>");
            if (labelInnerDiv.append($("<span/>").addClass("title").append(result.title)), labelInnerDiv.append($("<span/>").addClass("subtitle").append(result.subtitle)), labelDiv.append(labelInnerDiv), result.id || (wrapperDiv.addClass("ac-message"), "search_external" == result.type && labelDiv.find(".title").addClass("linky"), labelDiv.append($("<a/>").attr("href", "#"))), wrapperDiv.append(thumbDiv), wrapperDiv.append(labelDiv), result.id) {
                var viewLink = $("<a/>").addClass("ac-view").attr("target", "_blank").attr("rel", "noopener noreferrer").attr("href", "/taxa/" + result.id).append(I18n.t("view"));
                wrapperDiv.append(viewLink)
            }
            return wrapperDiv
        },
        createWrappingDiv: function(field, options) {
            if (!field.parent().hasClass("ac-chooser")) {
                var wrappingDiv = $("<div/>").addClass("ac-chooser");
                if (field.wrap(wrappingDiv), !1 !== options.thumbnail) {
                    var photo = autocompleter.defaultPhotoForResult({
                            default_photo_url: field.data("default-photo-url"),
                            iconic_taxon_id: field.data("iconic-taxon-id")
                        }),
                        thumbDiv = $("<div/>").addClass("ac-select-thumb");
                    if (photo && thumbDiv.append($(photo)), field.parent().prepend(thumbDiv), options.bootstrapClear) {
                        var removeIcon = $("<span/>").addClass("searchclear glyphicon glyphicon-remove-circle");
                        field.parent().append(removeIcon), removeIcon.on("click", (function() {
                            field.trigger("resetAll")
                        }))
                    }
                }
            }
        }
    };
if ($.fn.taxonAutocomplete = function(options) {
        if ((options = options || {}).idEl = options.idEl || $("#taxon_id"), options.idEl) {
            var field = this;
            field.template = autocompleter.taxonTemplate, options.user || "object" != typeof CURRENT_USER || (options.user = CURRENT_USER);
            var source = function(request, response) {
                    var apiToken = $("meta[name='inaturalist-api-token']").attr("content"),
                        headers = {};
                    apiToken && (headers.Authorization = apiToken);
                    var params = {
                        q: request.term,
                        per_page: options.perPage || 10,
                        locale: I18n.locale,
                        preferred_place_id: PREFERRED_PLACE ? PREFERRED_PLACE.id : null
                    };
                    options.notIDs && (params.not_id = options.notIDs.slice(0, 750).join(","));
                    var apiBaseURL = "https://api.inaturalist.org/v1";
                    options.useAPIv2 && (apiBaseURL = apiBaseURL.replace("/v1", "/v2"), headers["X-HTTP-Method-Override"] = "GET", params.fields = TAXON_AUTOCOMPLETE_FIELDS), $.ajax({
                        url: apiBaseURL + "/taxa/autocomplete",
                        cache: !0,
                        headers: headers,
                        data: options.useAPIv2 ? JSON.stringify(params) : params,
                        method: options.useAPIv2 ? "POST" : "GET",
                        success: function(data) {
                            var results = data.results || [];
                            !1 === options.searchExternal || CONFIG && CONFIG.content_freeze_enabled || results.push({
                                type: "search_external",
                                title: I18n.t("search_external_name_providers")
                            }), options.showPlaceholder && !options.idEl.val() && field.val() && results.unshift({
                                type: "placeholder",
                                title: I18n.t("use_name_as_a_placeholder", {
                                    name: field.val()
                                }),
                                placeholderTitle: field.val()
                            }), response(_.map(results, (function(r) {
                                return new iNatModels.Taxon(r)
                            })))
                        }
                    })
                },
                select = function(e, ui) {
                    if (e && e.toElement && $(e.toElement).hasClass("ac-view")) return !1;
                    if ("search_external" === ui.item.type && field.val()) {
                        var thisSearch = Math.random();
                        return ac.searchInProgress = thisSearch, $.ajax({
                            url: "/taxa/search.json?per_page=" + (options.perPage || 10) + "&include_external=1&partial=elastic&q=" + field.val(),
                            dataType: "json",
                            beforeSend: function() {
                                var externalItem = $(".ac[data-type='search_external']");
                                externalItem.find(".title").removeClass("linky"), externalItem.find(".title").text(I18n.t("loading")), externalItem.closest("li").removeClass("active"), externalItem.attr("data-type", "message")
                            },
                            success: function(data) {
                                ac.searchInProgress === thisSearch && (ac.searchInProgress = !1, ac.menu.element.empty(), 0 == (data = _.map(data, (function(r) {
                                    var t = new iNatModels.Taxon(r);
                                    return t.preferred_common_name = t.preferredCommonName(iNaturalist.localeParams()), t
                                }))).length && data.push({
                                    type: "message",
                                    title: I18n.t("no_results_found")
                                }), options.showPlaceholder && field.val() && data.unshift({
                                    type: "placeholder",
                                    title: I18n.t("use_name_as_a_placeholder", {
                                        name: field.val()
                                    }),
                                    placeholderTitle: field.val()
                                }), ac._suggest(data), field.focus())
                            },
                            error: function() {
                                ac.searchInProgress = !1
                            }
                        }), ac.keepOpen = !0, setTimeout((function() {
                            ac.keepOpen = !1
                        }), 10), e && e.preventDefault(), !1
                    }
                    return field.trigger("assignSelection", ui.item), options.afterSelect && options.afterSelect(ui), !1
                },
                focus = function(e, ui) {
                    if ("message" !== ui.item.type) {
                        var li = ui.item.id ? ac.menu.element.find("[data-taxon-id='" + ui.item.id + "']").closest("li") : ac.menu.element.find("[data-type='" + ui.item.type + "']").closest("li");
                        return li.parent().find("li").removeClass("active"), li.addClass("active"), !1
                    }
                },
                ac = field.genericAutocomplete(_.extend({}, {
                    extraClass: "taxon",
                    source: source,
                    select: select,
                    focus: focus,
                    createWrappingDiv: autocompleter.createWrappingDiv,
                    menuClass: "taxon-autocomplete"
                }, options));
            if (ac && (field.bind("assignSelection", (function(e, t) {
                    options.idEl.val(t.id), autocompleter.setTitle(t, options);
                    var title = "placeholder" === t.type ? t.placeholderTitle : _.first((t.textTitle || t.title).split(" \xb7 "));
                    field.val(title);
                    var photo = autocompleter.defaultPhotoForResult(t);
                    field.wrappingDiv.find(".ac-select-thumb").html(photo), field.selection = t, field.data("autocomplete-item", t), field.searchClear && $(field.searchClear).show()
                })), field.bind("resetSelection", (function() {
                    null !== options.idEl.val() && field.wrappingDiv.find(".ac-select-thumb").html(autocompleter.defaultPhotoForResult({})), field.selection = null, field.selectedItem = null, field.data("autocomplete-item", null)
                })), options.initialSelection && field.trigger("assignSelection", options.initialSelection), $(options.idEl).val())) {
                var url = "https://api.inaturalist.org/v1/taxa/" + $(options.idEl).val(),
                    jsonpCallback = "initialTaxonCallback";
                options.idEl.id && "" != options.idEl.id ? jsonpCallback += options.idEl.id : jsonpCallback += Math.round(1e6 * Math.random()).toString(), $.ajax({
                    url: url,
                    dataType: "jsonp",
                    cache: !0,
                    data: {
                        locale: I18n.locale,
                        preferred_place_id: PREFERRED_PLACE ? PREFERRED_PLACE.id : null
                    },
                    jsonpCallback: jsonpCallback,
                    success: function(data) {
                        field.trigger("assignSelection", _.map(data.results || [], (function(r) {
                            return new iNatModels.Taxon(r)
                        })))
                    }
                })
            }
        }
    }, $.fn.placeAutocomplete = function(opts) {
        var options = opts || {};
        if (options.idEl) {
            var field = this;
            field.template = function(item) {
                var wrapperDiv = $("<div/>").addClass("ac").attr("id", item.id),
                    labelDiv = $("<div/>").addClass("ac-label");
                labelDiv.append($("<span/>").addClass("title").append(item.title));
                var type = item.placeTypeLabel();
                return type && labelDiv.append($("<span/>").addClass("type").append(type)), wrapperDiv.append(labelDiv), wrapperDiv
            }, field.genericAutocomplete(_.extend(options, {
                extraClass: "place",
                source: function(request, response) {
                    $.ajax({
                        url: "https://api.inaturalist.org/v1/search",
                        dataType: "jsonp",
                        cache: !0,
                        jsonpCallback: "placeAutocompleteCallback",
                        data: {
                            q: request.term,
                            per_page: 10,
                            sources: "places"
                        },
                        success: function(data) {
                            var results = data.results || [];
                            response(_.map(results, (function(r) {
                                return new iNatModels.Place(Object.assign({}, r.record, {
                                    title: r.record.display_name
                                }))
                            })))
                        }
                    })
                }
            }))
        }
    }, $.fn.userAutocomplete = function(options) {
        if ((options = options || {}).idEl) {
            var field = this;
            field.template = function(item) {
                var wrapperDiv = $("<div/>").addClass("ac").attr("id", item.id),
                    labelDiv = $("<div/>").addClass("ac-label"),
                    icon = item.icon || "/attachment_defaults/users/icons/defaults/mini.png";
                return labelDiv.append("<img alt='" + item.login + "' title='" + item.login + "' class='user_image  usericon' src='" + icon + "'>"), labelDiv.append("<span class='title'>" + item.login + "</span>"), wrapperDiv.append(labelDiv), wrapperDiv
            }, field.genericAutocomplete(_.extend(options, {
                source: function(request, response) {
                    var requestParameters = {
                        q: request.term,
                        per_page: options.per_page || 10,
                        project_id: options.projectID,
                        order: "activity"
                    };
                    options.includeSuspended && (requestParameters.include_suspended = !0), $.ajax({
                        url: "https://api.inaturalist.org/v1/users/autocomplete",
                        dataType: "jsonp",
                        cache: !0,
                        jsonpCallback: "projectAutocompleteCallback",
                        data: requestParameters,
                        success: function(data) {
                            response(_.map(data.results, (function(r) {
                                return r.user_id = r.id, r.id = r.login, r.title = r.login, r
                            })))
                        }
                    })
                },
                menuClass: "user-autocomplete"
            })), $(options.idEl).val() && $.ajax({
                url: "/users/" + $(options.idEl).val() + ".json",
                dataType: "json",
                data: {
                    locale: I18n.locale,
                    preferred_place_id: PREFERRED_PLACE ? PREFERRED_PLACE.id : null
                },
                success: function(data) {
                    data.title = data.login, field.trigger("assignSelection", data)
                }
            })
        }
    }, void 0 === CURRENT_USER) var CURRENT_USER = {};
if ($.fn.projectAutocomplete = function(opts) {
        var options = _.assign({}, opts);
        options.idEl && this.genericAutocomplete(_.extend(options, {
            menuClass: "projects",
            minLength: CURRENT_USER.id ? 0 : void 0,
            allowPlaceholders: !0,
            source: function(request, response) {
                var params = {
                    q: request.term,
                    per_page: request.term ? 10 : 300
                };
                this.options.currentUsersProjects && CURRENT_USER && (params.member_id = CURRENT_USER.id), this.options.notIDs && (params.not_id = this.options.notIDs.slice(0, 750).join(",")), this.options.notTypes && (params.not_type = this.options.notTypes.join(",")), this.options.hasParams && (params.has_params = !0), $.ajax({
                    url: "https://api.inaturalist.org/v1/projects/autocomplete",
                    dataType: "jsonp",
                    cache: !0,
                    jsonpCallback: "projectAutocompleteCallback",
                    data: params,
                    success: function(data) {
                        response(data.results)
                    }
                })
            }
        }))
    }, void 0 === RECENT_OBSERVATION_FIELDS) var RECENT_OBSERVATION_FIELDS = [];
var anyRecentFields = RECENT_OBSERVATION_FIELDS.length > 0;
$.fn.observationFieldAutocomplete = function(options) {
        (options = options || {}).idEl && this.genericAutocomplete(_.extend(options, {
            minLength: anyRecentFields ? 0 : void 0,
            allowPlaceholders: !0,
            source: function(request, response) {
                if (request.term) $.ajax({
                    url: "https://api.inaturalist.org/v1/observation_fields/autocomplete",
                    dataType: "jsonp",
                    cache: !0,
                    jsonpCallback: "observationFieldAutocompleteCallback",
                    data: {
                        q: request.term,
                        per_page: 10,
                        not_id: options.notIDs ? options.notIDs.join(",") : null
                    },
                    success: function(data) {
                        response(_.map(data.results, (function(r) {
                            return _.assign({}, r, {
                                title: r.name
                            })
                        })))
                    }
                });
                else if (anyRecentFields) {
                    var defaultFields = _.size(options.notIDs) > 0 ? _.filter(RECENT_OBSERVATION_FIELDS, (function(f) {
                        return !_.includes(options.notIDs, f.id)
                    })) : RECENT_OBSERVATION_FIELDS;
                    response(_.map(defaultFields, (function(r) {
                        return _.assign({}, r, {
                            title: r.name
                        })
                    })))
                } else response([])
            }
        }))
    }, $.fn.universalAutocomplete = function(options) {
        (options = options || {}).appendTo = options.appendTo || "#inat-universal-autocomplete";
        var universalSearchTextModifiedAt, field = this,
            PLACE_TYPES = {
                0: "Undefined",
                2: "Street Segment",
                5: "Intersection",
                6: "Street",
                7: "Town",
                8: "State",
                9: "County",
                10: "Local Administrative Area",
                12: "Country",
                13: "Island",
                14: "Airport",
                15: "Drainage",
                16: "Land Feature",
                17: "Miscellaneous",
                18: "Nationality",
                19: "Supername",
                20: "Point of Interest",
                21: "Region",
                24: "Colloquial",
                25: "Zone",
                26: "Historical State",
                27: "Historical County",
                29: "Continent",
                33: "Estate",
                35: "Historical Town",
                36: "Aggregate",
                100: "Open Space",
                101: "Territory",
                102: "District",
                103: "Province",
                1e3: "Municipality",
                1001: "Parish",
                1002: "Department Segment",
                1003: "City Building",
                1004: "Commune",
                1005: "Governorate",
                1006: "Prefecture",
                1007: "Canton",
                1008: "Republic",
                1009: "Division",
                1010: "Subdivision",
                1011: "Village block",
                1012: "Sum",
                1013: "Unknown",
                1014: "Shire",
                1015: "Prefecture City",
                1016: "Regency",
                1017: "Constituency",
                1018: "Local Authority",
                1019: "Poblacion",
                1020: "Delegation"
            };
        $(field).on("keydown", (function(e) {
            13 === e.which && ($(field).data("selected") ? $(field).data("selected", !1) : window.location = "/search?q=" + $(field).val())
        })), field.template = function(item) {
            var itemUrl, obsUrl, itemText, acThumb, wrapperDiv = $("<div/>").addClass("ac");
            if ("view_all" == item.type) return wrapperDiv.addClass("view-all").append($("<div>").addClass("ac-thumb").append($("<i>").addClass("fa fa-search")), $("<a>").attr("href", "/search?q=" + $(field).val()).addClass("view-all").html(I18n.t("view_all")));
            switch (wrapperDiv.attr("id", item.type + "-" + item.record.id), wrapperDiv.addClass("ac-result-" + item.type), item.type) {
                case "Taxon":
                    itemUrl = "/taxa/" + item.record.id, obsUrl = "/observations?taxon_id=" + item.record.id, acThumb = item.record.default_photo ? $("<img />").attr("src", item.record.default_photo.square_url) : $("<div />").addClass("no-photo").append($("<i></i>").addClass("icon-iconic-" + (item.record.iconic_taxon_name || "unknown").toLowerCase())), itemText = $("<span></span>").addClass("taxon").addClass(item.record.rank);
                    var scinameWithRank = item.record.name;
                    if (item.record.rank_level > 10 && (scinameWithRank = "<span class='rank'>" + I18n.t("ranks." + item.record.rank.toLowerCase(), {
                            defaultValue: item.record.rank
                        }) + "</span> " + item.record.name), item.record.preferred_common_name) {
                        itemText.addClass("has-com-name");
                        var displayName = iNatModels.Taxon.titleCaseName(item.record.preferred_common_name);
                        CURRENT_USER && CURRENT_USER.prefers_scientific_name_first ? (itemText.append($("<span>").addClass("display-name").addClass("sciname").html(scinameWithRank)), itemText.append(" "), itemText.append($("<span>").addClass("secondary-name").html(displayName))) : (item.record.matched_term && item.record.preferred_common_name !== item.record.matched_term && item.record.name !== item.record.matched_term && (displayName += " (" + iNatModels.Taxon.titleCaseName(item.record.matched_term) + ")"), itemText.append($("<span>").addClass("display-name").html(displayName)), itemText.append(" "), itemText.append($("<span>").addClass("secondary-name").addClass("sciname").html(scinameWithRank)))
                    } else {
                        (displayName = $("<span>").addClass("display-name")).append($("<span>").addClass("sciname").html(scinameWithRank)), item.record.matched_term && item.record.name !== item.record.matched_term && displayName.append($("<span>").html(" (" + item.record.matched_term + ")")), itemText.append(displayName)
                    }
                    break;
                case "Place":
                    itemUrl = "/places/" + (item.record.slug || item.record.id), obsUrl = "/observations?place_id=" + item.record.id, acThumb = $("<i></i>").addClass("fa fa-map-marker"), itemText = item.record.display_name || item.record.name, itemText = I18n.t("places_name." + _.snakeCase(itemText), {
                        defaultValue: itemText
                    });
                    var matchingPlaceType = PLACE_TYPES[item.record.place_type];
                    matchingPlaceType && (itemText += " <span class='secondary-name'>" + I18n.t("place_geo.geo_planet_place_types." + matchingPlaceType.toString().replace(" ", "_"), {
                        defaultValue: I18n.t("place")
                    }) + "</span>"), itemText = $("<div></div>").append(itemText);
                    break;
                case "Project":
                    itemUrl = "/projects/" + (item.record.slug || item.record.id),
                        obsUrl = "/observations?project_id=" + item.record.id, acThumb = item.record.icon && !item.record.icon.match(/attachment_defaults/) ? $("<img />").attr("src", item.record.icon) : $("<div />").addClass("no-photo").append($("<div />").addClass("inner").append($("<i/>").addClass("fa fa-briefcase"))), itemText = item.record.title + " <span class='secondary-name'>" + I18n.t("project") + "</span>", itemText = $("<div></div>").append(itemText);
                    break;
                case "User":
                    itemUrl = "/people/" + item.record.login, obsUrl = "/observations?place_id=any&user_id=" + item.record.login + "&verifiable=any", acThumb = item.record.icon_url ? $("<img />").attr("src", item.record.icon_url.replace(/medium\./, "thumb.")).addClass("usericon") : $("<div />").addClass("usericon").append($("<i/>").addClass("icon-person")), itemText = item.record.login, item.record.name && (itemText += " <span class='secondary-name'>" + item.record.name.replace(/\<.*?\/.+\>/, "") + "</span>"), itemText = $("<div></div>").append(itemText)
            }
            wrapperDiv.append($("<div/>").addClass("ac-thumb").append(acThumb));
            var labelDiv = $("<div/>").addClass("ac-label");
            return labelDiv.append(itemText), wrapperDiv.append(labelDiv), wrapperDiv.append($("<a></a>").attr("href", obsUrl).addClass("ac-view").addClass("view-observations").html(I18n.t("view_observations"))), wrapperDiv.append($("<a></a>").attr("href", itemUrl).addClass("ac-view").addClass("about").html(I18n.t("about"))), wrapperDiv.on("mouseup", (function(e) {
                if (2 == e.which) {
                    var a = "A" == e.target.nodeName ? e.target : $(e.target).parents("a").get(0);
                    return a ? window.open(a.href, "_blank", "noopener,noreferrer") : $(field).data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                        item: item,
                        openBlank: !0
                    }), e.preventDefault(), !1
                }
            })), wrapperDiv.on("click", (function(e) {
                var a = "A" == e.target.nodeName ? e.target : $(e.target).parents("a").get(0);
                return e.metaKey || e.ctrlKey || e.altKey ? (a ? window.open(a.href, "_blank", "noopener,noreferrer") : $(field).data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                    item: item,
                    openBlank: !0
                }), e.preventDefault(), !1) : a ? (window.location = a.href, e.preventDefault(), !1) : void 0
            })), wrapperDiv
        }, field.genericAutocomplete(_.extend(options, {
            source: function(request, response) {
                var thisSearchTime = (new Date).getTime();
                universalSearchTextModifiedAt = thisSearchTime;
                var apiToken = $("meta[name='inaturalist-api-token']").attr("content"),
                    headers = {};
                apiToken && (headers.Authorization = apiToken), setTimeout((function() {
                    thisSearchTime === universalSearchTextModifiedAt && $.ajax({
                        url: "https://api.inaturalist.org/v1/search",
                        dataType: "json",
                        cache: !0,
                        headers: headers,
                        data: {
                            q: request.term,
                            locale: I18n.locale,
                            preferred_place_id: PREFERRED_PLACE ? PREFERRED_PLACE.id : null,
                            per_page: 10
                        },
                        success: function(data) {
                            response(data.results.concat([{
                                type: "view_all"
                            }]))
                        }
                    })
                }), 500)
            },
            select: function(e, ui) {
                var url;
                if ($(field).data("selected", !0), "view_all" === ui.item.type) url = "/search?q=" + $(field).val();
                else if (e.ctrlKey || e.altKey || e.metaKey) switch (ui.item.type) {
                    case "Taxon":
                        url = "/taxa/" + ui.item.record.id;
                        break;
                    case "Place":
                        url = "/places/" + ui.item.record.id;
                        break;
                    case "Project":
                        url = "/projects/" + (ui.item.record.slug || ui.item.record.slug.id);
                        break;
                    case "User":
                        url = "/people/" + ui.item.record.login
                } else switch (url = "/observations?", ui.item.type) {
                    case "Taxon":
                        url += "taxon_id=" + ui.item.record.id;
                        break;
                    case "Place":
                        url += "place_id=" + ui.item.record.id;
                        break;
                    case "Project":
                        url += "project_id=" + ui.item.record.id;
                        break;
                    case "User":
                        url += "user_id=" + ui.item.record.login
                }
                ui.openBlank ? window.open("https://google.com", "_blank", "noopener,noreferrer") : window.location = url
            }
        }))
    },
    function($) {
        $.datepicker._doKeyPress = function() {
            return !0
        }, $.fn.iNatDatepicker = function(options) {
            $(this).width($(this).width() - 28), $(this).css({
                "margin-right": "10px",
                "vertical-align": "middle"
            }), options = options || {}, (options = $.extend({}, {
                showOn: "both",
                buttonImage: "/assets/silk/date-2ae66809a324696a940adc3b65574e3fb0d9a2cb4e545c113109b43213500739.png",
                buttonImageOnly: !0,
                showButtonPanel: !0,
                showAnim: "fadeIn",
                yearRange: "c-100:" + (new Date).getFullYear(),
                maxDate: "+0d",
                constrainInput: !1,
                firstDay: 0,
                changeFirstDay: !1,
                changeMonth: !0,
                changeYear: !0,
                dateFormat: "yy-mm-dd",
                timeFormat: "hh:mm tt z",
                showTimezone: !0,
                closeText: I18n.t("date_picker.closeText"),
                currentText: I18n.t("date_picker.currentText"),
                prevText: I18n.t("date_picker.prevText"),
                nextText: I18n.t("date_picker.nextText"),
                montNames: _.compact(_.values(I18n.t("date.month_names"))),
                monthNamesShort: _.compact(_.values(I18n.t("date.abbr_month_names"))),
                dayNames: _.compact(_.values(I18n.t("date.day_names"))),
                dayNamesShort: _.compact(_.values(I18n.t("date.abbr_day_names"))),
                dayNamesMin: _.compact(_.values(I18n.t("date.day_names_min")))
            }, options)).time ? $(this).datetimepicker(options) : $(this).datepicker(options), $(this).next(".ui-datepicker-trigger").css({
                "vertical-align": "middle"
            })
        }
    }(jQuery),
    function(factory) {
        if ("function" == typeof define && define.amd) define(["jquery"], factory);
        else if ("object" == typeof module && module.exports) {
            var $ = require("jquery");
            module.exports = factory($)
        } else factory(jQuery)
    }((function(jQuery) {
        if (void 0 === jQuery) throw new Error("jQuery.textcomplete requires jQuery");
        return function($) {
                "use strict";
                var warn = function(message) {
                        console.warn && console.warn(message)
                    },
                    id = 1;
                $.fn.textcomplete = function(strategies, option) {
                    var args = Array.prototype.slice.call(arguments);
                    return this.each((function() {
                        var $this = $(this),
                            completer = $this.data("textComplete");
                        if (completer || (option || (option = {}), option._oid = id++, completer = new $.fn.textcomplete.Completer(this, option), $this.data("textComplete", completer)), "string" == typeof strategies) {
                            if (!completer) return;
                            args.shift(), completer[strategies].apply(completer, args), "destroy" === strategies && $this.removeData("textComplete")
                        } else $.each(strategies, (function(obj) {
                            $.each(["header", "footer", "placement", "maxCount"], (function(name) {
                                obj[name] && (completer.option[name] = obj[name], warn(name + "as a strategy param is deprecated. Use option."), delete obj[name])
                            }))
                        })), completer.register($.fn.textcomplete.Strategy.parse(strategies))
                    }))
                }
            }(jQuery),
            function($) {
                "use strict";

                function Completer(element, option) {
                    if (this.$el = $(element), this.id = "textcomplete" + uniqueId++, this.strategies = [], this.views = [], this.option = $.extend({}, Completer._getDefaults(), option), !this.$el.is("input[type=text]") && !this.$el.is("textarea") && !element.isContentEditable && "true" != element.contentEditable) throw new Error("textcomplete must be called on a Textarea or a ContentEditable.");
                    if (element === document.activeElement) this.initialize();
                    else {
                        var self = this;
                        this.$el.one("focus." + this.id, (function() {
                            self.initialize()
                        }))
                    }
                }
                var lock = function(func) {
                        var locked, queuedArgsToReplay;
                        return function() {
                            var args = Array.prototype.slice.call(arguments);
                            if (locked) queuedArgsToReplay = args;
                            else {
                                locked = !0;
                                var self = this;
                                args.unshift((function replayOrFree() {
                                    if (queuedArgsToReplay) {
                                        var replayArgs = queuedArgsToReplay;
                                        queuedArgsToReplay = void 0, replayArgs.unshift(replayOrFree), func.apply(self, replayArgs)
                                    } else locked = !1
                                })), func.apply(this, args)
                            }
                        }
                    },
                    isString = function(obj) {
                        return "[object String]" === Object.prototype.toString.call(obj)
                    },
                    isFunction = function(obj) {
                        return "[object Function]" === Object.prototype.toString.call(obj)
                    },
                    uniqueId = 0;
                Completer._getDefaults = function() {
                    return Completer.DEFAULTS || (Completer.DEFAULTS = {
                        appendTo: $("body"),
                        zIndex: "100"
                    }), Completer.DEFAULTS
                }, $.extend(Completer.prototype, {
                    id: null,
                    option: null,
                    strategies: null,
                    adapter: null,
                    dropdown: null,
                    $el: null,
                    initialize: function() {
                        var Adapter, viewName, element = this.$el.get(0);
                        this.dropdown = new $.fn.textcomplete.Dropdown(element, this, this.option), this.option.adapter ? Adapter = this.option.adapter : (viewName = this.$el.is("textarea") || this.$el.is("input[type=text]") ? "number" == typeof element.selectionEnd ? "Textarea" : "IETextarea" : "ContentEditable", Adapter = $.fn.textcomplete[viewName]), this.adapter = new Adapter(element, this, this.option)
                    },
                    destroy: function() {
                        this.$el.off("." + this.id), this.adapter && this.adapter.destroy(), this.dropdown && this.dropdown.destroy(), this.$el = this.adapter = this.dropdown = null
                    },
                    trigger: function(text, skipUnchangedTerm) {
                        this.dropdown || this.initialize(), null != text || (text = this.adapter.getTextFromHeadToCaret());
                        var searchQuery = this._extractSearchQuery(text);
                        if (searchQuery.length) {
                            var term = searchQuery[1];
                            if (skipUnchangedTerm && this._term === term) return;
                            this._term = term, this._search.apply(this, searchQuery)
                        } else this._term = null, this.dropdown.deactivate()
                    },
                    fire: function(eventName) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        return this.$el.trigger(eventName, args), this
                    },
                    register: function(strategies) {
                        Array.prototype.push.apply(this.strategies, strategies)
                    },
                    select: function(value, strategy, e) {
                        this.adapter.select(value, strategy, e), this.fire("change").fire("textComplete:select", value, strategy), this.adapter.focus()
                    },
                    _clearAtNext: !0,
                    _term: null,
                    _extractSearchQuery: function(text) {
                        for (var i = 0; i < this.strategies.length; i++) {
                            var strategy = this.strategies[i],
                                context = strategy.context(text);
                            if (context || "" === context) {
                                var matchRegexp = isFunction(strategy.match) ? strategy.match(text) : strategy.match;
                                isString(context) && (text = context);
                                var match = text.match(matchRegexp);
                                if (match) return [strategy, match[strategy.index], match]
                            }
                        }
                        return []
                    },
                    _search: lock((function(free, strategy, term, match) {
                        var self = this;
                        strategy.search(term, (function(data, stillSearching) {
                            self.dropdown.shown || self.dropdown.activate(), self._clearAtNext && (self.dropdown.clear(), self._clearAtNext = !1), self.dropdown.setPosition(self.adapter.getCaretPosition()), self.dropdown.render(self._zip(data, strategy, term)), stillSearching || (free(), self._clearAtNext = !0)
                        }), match)
                    })),
                    _zip: function(data, strategy, term) {
                        return $.map(data, (function(value) {
                            return {
                                value: value,
                                strategy: strategy,
                                term: term
                            }
                        }))
                    }
                }), $.fn.textcomplete.Completer = Completer
            }(jQuery),
            function($) {
                "use strict";

                function Dropdown(element, completer, option) {
                    this.$el = Dropdown.createElement(option), this.completer = completer, this.id = completer.id + "dropdown", this._data = [], this.$inputEl = $(element), this.option = option, option.listPosition && (this.setPosition = option.listPosition), option.height && this.$el.height(option.height);
                    var self = this;
                    $.each(["maxCount", "placement", "footer", "header", "noResultsMessage", "className"], (function(_i, name) {
                        null != option[name] && (self[name] = option[name])
                    })), this._bindEvents(element), dropdownViews[this.id] = this
                }
                var $window = $(window),
                    include = function(zippedData, datum) {
                        var i, elem, idProperty = datum.strategy.idProperty;
                        for (i = 0; i < zippedData.length; i++)
                            if ((elem = zippedData[i]).strategy === datum.strategy)
                                if (idProperty) {
                                    if (elem.value[idProperty] === datum.value[idProperty]) return !0
                                } else if (elem.value === datum.value) return !0;
                        return !1
                    },
                    dropdownViews = {};
                $(document).on("click", (function(e) {
                    var id = e.originalEvent && e.originalEvent.keepTextCompleteDropdown;
                    $.each(dropdownViews, (function(key, view) {
                        key !== id && view.deactivate()
                    }))
                }));
                var commands = {
                    SKIP_DEFAULT: 0,
                    KEY_UP: 1,
                    KEY_DOWN: 2,
                    KEY_ENTER: 3,
                    KEY_PAGEUP: 4,
                    KEY_PAGEDOWN: 5,
                    KEY_ESCAPE: 6
                };
                $.extend(Dropdown, {
                    createElement: function(option) {
                        var $parent = option.appendTo;
                        return $parent instanceof $ || ($parent = $($parent)), $("<ul></ul>").addClass("dropdown-menu textcomplete-dropdown").attr("id", "textcomplete-dropdown-" + option._oid).css({
                            display: "none",
                            left: 0,
                            position: "absolute",
                            zIndex: option.zIndex
                        }).appendTo($parent)
                    }
                }), $.extend(Dropdown.prototype, {
                    $el: null,
                    $inputEl: null,
                    completer: null,
                    footer: null,
                    header: null,
                    id: null,
                    maxCount: 10,
                    placement: "",
                    shown: !1,
                    data: [],
                    className: "",
                    destroy: function() {
                        this.deactivate(), this.$el.off("." + this.id), this.$inputEl.off("." + this.id), this.clear(), this.$el = this.$inputEl = this.completer = null, delete dropdownViews[this.id]
                    },
                    render: function(zippedData) {
                        var contentsHtml = this._buildContents(zippedData),
                            unzippedData = $.map(this.data, (function(d) {
                                return d.value
                            }));
                        this.data.length ? (this._renderHeader(unzippedData), this._renderFooter(unzippedData), contentsHtml && (this._renderContents(contentsHtml), this._fitToBottom(), this._activateIndexedItem()), this._setScroll()) : this.noResultsMessage ? this._renderNoResultsMessage(unzippedData) : this.shown && this.deactivate()
                    },
                    setPosition: function(pos) {
                        this.$el.css(this._applyPlacement(pos));
                        var position = "absolute";
                        return this.$inputEl.add(this.$inputEl.parents()).each((function() {
                            return "absolute" !== $(this).css("position") && ("fixed" === $(this).css("position") ? (position = "fixed", !1) : void 0)
                        })), this.$el.css({
                            position: position
                        }), this
                    },
                    clear: function() {
                        this.$el.html(""), this.data = [], this._index = 0, this._$header = this._$footer = this._$noResultsMessage = null
                    },
                    activate: function() {
                        return this.shown || (this.clear(), this.$el.show(), this.className && this.$el.addClass(this.className), this.completer.fire("textComplete:show"), this.shown = !0), this
                    },
                    deactivate: function() {
                        return this.shown && (this.$el.hide(), this.className && this.$el.removeClass(this.className), this.completer.fire("textComplete:hide"), this.shown = !1), this
                    },
                    isUp: function(e) {
                        return 38 === e.keyCode || e.ctrlKey && 80 === e.keyCode
                    },
                    isDown: function(e) {
                        return 40 === e.keyCode || e.ctrlKey && 78 === e.keyCode
                    },
                    isEnter: function(e) {
                        return !(e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) && (13 === e.keyCode || 9 === e.keyCode || !0 === this.option.completeOnSpace && 32 === e.keyCode)
                    },
                    isPageup: function(e) {
                        return 33 === e.keyCode
                    },
                    isPagedown: function(e) {
                        return 34 === e.keyCode
                    },
                    isEscape: function(e) {
                        return 27 === e.keyCode
                    },
                    _data: null,
                    _index: null,
                    _$header: null,
                    _$noResultsMessage: null,
                    _$footer: null,
                    _bindEvents: function() {
                        this.$el.on("mousedown." + this.id, ".textcomplete-item", $.proxy(this._onClick, this)), this.$el.on("touchstart." + this.id, ".textcomplete-item", $.proxy(this._onClick, this)), this.$el.on("mouseover." + this.id, ".textcomplete-item", $.proxy(this._onMouseover, this)), this.$inputEl.on("keydown." + this.id, $.proxy(this._onKeydown, this))
                    },
                    _onClick: function(e) {
                        var $el = $(e.target);
                        e.preventDefault(), e.originalEvent.keepTextCompleteDropdown = this.id, $el.hasClass("textcomplete-item") || ($el = $el.closest(".textcomplete-item"));
                        var datum = this.data[parseInt($el.data("index"), 10)];
                        this.completer.select(datum.value, datum.strategy, e);
                        var self = this;
                        setTimeout((function() {
                            self.deactivate(), "touchstart" === e.type && self.$inputEl.focus()
                        }), 0)
                    },
                    _onMouseover: function(e) {
                        var $el = $(e.target);
                        e.preventDefault(), $el.hasClass("textcomplete-item") || ($el = $el.closest(".textcomplete-item")), this._index = parseInt($el.data("index"), 10), this._activateIndexedItem()
                    },
                    _onKeydown: function(e) {
                        var command;
                        if (this.shown) switch ($.isFunction(this.option.onKeydown) && (command = this.option.onKeydown(e, commands)), null == command && (command = this._defaultKeydown(e)), command) {
                            case commands.KEY_UP:
                                e.preventDefault(), this._up();
                                break;
                            case commands.KEY_DOWN:
                                e.preventDefault(), this._down();
                                break;
                            case commands.KEY_ENTER:
                                e.preventDefault(), this._enter(e);
                                break;
                            case commands.KEY_PAGEUP:
                                e.preventDefault(), this._pageup();
                                break;
                            case commands.KEY_PAGEDOWN:
                                e.preventDefault(), this._pagedown();
                                break;
                            case commands.KEY_ESCAPE:
                                e.preventDefault(), this.deactivate()
                        }
                    },
                    _defaultKeydown: function(e) {
                        return this.isUp(e) ? commands.KEY_UP : this.isDown(e) ? commands.KEY_DOWN : this.isEnter(e) ? commands.KEY_ENTER : this.isPageup(e) ? commands.KEY_PAGEUP : this.isPagedown(e) ? commands.KEY_PAGEDOWN : this.isEscape(e) ? commands.KEY_ESCAPE : void 0
                    },
                    _up: function() {
                        0 === this._index ? this._index = this.data.length - 1 : this._index -= 1, this._activateIndexedItem(), this._setScroll()
                    },
                    _down: function() {
                        this._index === this.data.length - 1 ? this._index = 0 : this._index += 1, this._activateIndexedItem(), this._setScroll()
                    },
                    _enter: function(e) {
                        var datum = this.data[parseInt(this._getActiveElement().data("index"), 10)];
                        this.completer.select(datum.value, datum.strategy, e), this.deactivate()
                    },
                    _pageup: function() {
                        var target = 0,
                            threshold = this._getActiveElement().position().top - this.$el.innerHeight();
                        this.$el.children().each((function(i) {
                            if ($(this).position().top + $(this).outerHeight() > threshold) return target = i, !1
                        })), this._index = target, this._activateIndexedItem(), this._setScroll()
                    },
                    _pagedown: function() {
                        var target = this.data.length - 1,
                            threshold = this._getActiveElement().position().top + this.$el.innerHeight();
                        this.$el.children().each((function(i) {
                            if ($(this).position().top > threshold) return target = i, !1
                        })), this._index = target, this._activateIndexedItem(), this._setScroll()
                    },
                    _activateIndexedItem: function() {
                        this.$el.find(".textcomplete-item.active").removeClass("active"), this._getActiveElement().addClass("active")
                    },
                    _getActiveElement: function() {
                        return this.$el.children(".textcomplete-item:nth(" + this._index + ")")
                    },
                    _setScroll: function() {
                        var $activeEl = this._getActiveElement(),
                            itemTop = $activeEl.position().top,
                            itemHeight = $activeEl.outerHeight(),
                            visibleHeight = this.$el.innerHeight(),
                            visibleTop = this.$el.scrollTop();
                        0 === this._index || this._index == this.data.length - 1 || itemTop < 0 ? this.$el.scrollTop(itemTop + visibleTop) : itemTop + itemHeight > visibleHeight && this.$el.scrollTop(itemTop + itemHeight + visibleTop - visibleHeight)
                    },
                    _buildContents: function(zippedData) {
                        var datum, i, index, html = "";
                        for (i = 0; i < zippedData.length && this.data.length !== this.maxCount; i++) datum = zippedData[i], include(this.data, datum) || (index = this.data.length, this.data.push(datum), html += '<li class="textcomplete-item" data-index="' + index + '"><a>', html += datum.strategy.template(datum.value, datum.term), html += "</a></li>");
                        return html
                    },
                    _renderHeader: function(unzippedData) {
                        if (this.header) {
                            this._$header || (this._$header = $('<li class="textcomplete-header"></li>').prependTo(this.$el));
                            var html = $.isFunction(this.header) ? this.header(unzippedData) : this.header;
                            this._$header.html(html)
                        }
                    },
                    _renderFooter: function(unzippedData) {
                        if (this.footer) {
                            this._$footer || (this._$footer = $('<li class="textcomplete-footer"></li>').appendTo(this.$el));
                            var html = $.isFunction(this.footer) ? this.footer(unzippedData) : this.footer;
                            this._$footer.html(html)
                        }
                    },
                    _renderNoResultsMessage: function(unzippedData) {
                        if (this.noResultsMessage) {
                            this._$noResultsMessage || (this._$noResultsMessage = $('<li class="textcomplete-no-results-message"></li>').appendTo(this.$el));
                            var html = $.isFunction(this.noResultsMessage) ? this.noResultsMessage(unzippedData) : this.noResultsMessage;
                            this._$noResultsMessage.html(html)
                        }
                    },
                    _renderContents: function(html) {
                        this._$footer ? this._$footer.before(html) : this.$el.append(html)
                    },
                    _fitToBottom: function() {
                        var windowScrollBottom = $window.scrollTop() + $window.height(),
                            height = this.$el.height();
                        this.$el.position().top + height > windowScrollBottom && this.$el.offset({
                            top: windowScrollBottom - height
                        })
                    },
                    _applyPlacement: function(position) {
                        return -1 !== this.placement.indexOf("top") ? position = {
                            top: "auto",
                            bottom: this.$el.parent().height() - position.top + position.lineHeight,
                            left: position.left
                        } : (position.bottom = "auto", delete position.lineHeight), -1 !== this.placement.indexOf("absleft") ? position.left = 0 : -1 !== this.placement.indexOf("absright") && (position.right = 0, position.left = "auto"), position
                    }
                }), $.fn.textcomplete.Dropdown = Dropdown, $.extend($.fn.textcomplete, commands)
            }(jQuery),
            function($) {
                "use strict";

                function Strategy(options) {
                    $.extend(this, options), this.cache && (this.search = memoize(this.search))
                }
                var memoize = function(func) {
                    var memo = {};
                    return function(term, callback) {
                        memo[term] ? callback(memo[term]) : func.call(this, term, (function(data) {
                            memo[term] = (memo[term] || []).concat(data), callback.apply(null, arguments)
                        }))
                    }
                };
                Strategy.parse = function(optionsArray) {
                    return $.map(optionsArray, (function(options) {
                        return new Strategy(options)
                    }))
                }, $.extend(Strategy.prototype, {
                    match: null,
                    replace: null,
                    search: null,
                    cache: !1,
                    context: function() {
                        return !0
                    },
                    index: 2,
                    template: function(obj) {
                        return obj
                    },
                    idProperty: null
                }), $.fn.textcomplete.Strategy = Strategy
            }(jQuery),
            function($) {
                "use strict";

                function Adapter() {}
                var now = Date.now || function() {
                        return (new Date).getTime()
                    },
                    debounce = function(func, wait) {
                        var timeout, args, context, timestamp, result, later = function() {
                            var last = now() - timestamp;
                            last < wait ? timeout = setTimeout(later, wait - last) : (timeout = null, result = func.apply(context, args), context = args = null)
                        };
                        return function() {
                            return context = this, args = arguments, timestamp = now(), timeout || (timeout = setTimeout(later, wait)), result
                        }
                    };
                $.extend(Adapter.prototype, {
                    id: null,
                    completer: null,
                    el: null,
                    $el: null,
                    option: null,
                    initialize: function(element, completer, option) {
                        this.el = element, this.$el = $(element), this.id = completer.id + this.constructor.name, this.completer = completer, this.option = option, this.option.debounce && (this._onKeyup = debounce(this._onKeyup, this.option.debounce)), this._bindEvents()
                    },
                    destroy: function() {
                        this.$el.off("." + this.id), this.$el = this.el = this.completer = null
                    },
                    select: function() {
                        throw new Error("Not implemented")
                    },
                    getCaretPosition: function() {
                        var position = this._getCaretRelativePosition(),
                            offset = this.$el.offset();
                        return position.top += offset.top, position.left += offset.left, position
                    },
                    focus: function() {
                        this.$el.focus()
                    },
                    _bindEvents: function() {
                        this.$el.on("keyup." + this.id, $.proxy(this._onKeyup, this))
                    },
                    _onKeyup: function(e) {
                        this._skipSearch(e) || this.completer.trigger(this.getTextFromHeadToCaret(), !0)
                    },
                    _skipSearch: function(clickEvent) {
                        switch (clickEvent.keyCode) {
                            case 13:
                            case 40:
                            case 38:
                                return !0
                        }
                        if (clickEvent.ctrlKey) switch (clickEvent.keyCode) {
                            case 78:
                            case 80:
                                return !0
                        }
                    }
                }), $.fn.textcomplete.Adapter = Adapter
            }(jQuery),
            function($) {
                "use strict";

                function Textarea(element, completer, option) {
                    this.initialize(element, completer, option)
                }
                Textarea.DIV_PROPERTIES = {
                    left: -9999,
                    position: "absolute",
                    top: 0,
                    whiteSpace: "pre-wrap"
                }, Textarea.COPY_PROPERTIES = ["border-width", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "word-spacing", "line-height", "text-decoration", "text-align", "width", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin-top", "margin-right", "margin-bottom", "margin-left", "border-style", "box-sizing", "tab-size"], $.extend(Textarea.prototype, $.fn.textcomplete.Adapter.prototype, {
                    select: function(value, strategy, e) {
                        var pre = this.getTextFromHeadToCaret(),
                            post = this.el.value.substring(this.el.selectionEnd),
                            newSubstr = strategy.replace(value, e);
                        $.isArray(newSubstr) && (post = newSubstr[1] + post, newSubstr = newSubstr[0]), pre = pre.replace(strategy.match, newSubstr), this.$el.val(pre + post), this.el.selectionStart = this.el.selectionEnd = pre.length
                    },
                    _getCaretRelativePosition: function() {
                        var dummyDiv = $("<div></div>").css(this._copyCss()).text(this.getTextFromHeadToCaret()),
                            span = $("<span></span>").text(".").appendTo(dummyDiv);
                        this.$el.before(dummyDiv);
                        var position = span.position();
                        return position.top += span.height() - this.$el.scrollTop(), position.lineHeight = span.height(), dummyDiv.remove(), position
                    },
                    _copyCss: function() {
                        return $.extend({
                            overflow: this.el.scrollHeight > this.el.offsetHeight ? "scroll" : "auto"
                        }, Textarea.DIV_PROPERTIES, this._getStyles())
                    },
                    _getStyles: function($) {
                        return void 0 !== $("<div></div>").css(["color"]).color ? function() {
                            return this.$el.css(Textarea.COPY_PROPERTIES)
                        } : function() {
                            var $el = this.$el,
                                styles = {};
                            return $.each(Textarea.COPY_PROPERTIES, (function(i, property) {
                                styles[property] = $el.css(property)
                            })), styles
                        }
                    }($),
                    getTextFromHeadToCaret: function() {
                        return this.el.value.substring(0, this.el.selectionEnd)
                    }
                }), $.fn.textcomplete.Textarea = Textarea
            }(jQuery),
            function($) {
                "use strict";

                function IETextarea(element, completer, option) {
                    this.initialize(element, completer, option), $("<span>" + sentinelChar + "</span>").css({
                        position: "absolute",
                        top: -9999,
                        left: -9999
                    }).insertBefore(element)
                }
                var sentinelChar = "\u5436";
                $.extend(IETextarea.prototype, $.fn.textcomplete.Textarea.prototype, {
                    select: function(value, strategy, e) {
                        var pre = this.getTextFromHeadToCaret(),
                            post = this.el.value.substring(pre.length),
                            newSubstr = strategy.replace(value, e);
                        $.isArray(newSubstr) && (post = newSubstr[1] + post, newSubstr = newSubstr[0]), pre = pre.replace(strategy.match, newSubstr), this.$el.val(pre + post), this.el.focus();
                        var range = this.el.createTextRange();
                        range.collapse(!0), range.moveEnd("character", pre.length), range.moveStart("character", pre.length), range.select()
                    },
                    getTextFromHeadToCaret: function() {
                        this.el.focus();
                        var range = document.selection.createRange();
                        range.moveStart("character", -this.el.value.length);
                        var arr = range.text.split(sentinelChar);
                        return 1 === arr.length ? arr[0] : arr[1]
                    }
                }), $.fn.textcomplete.IETextarea = IETextarea
            }(jQuery),
            function($) {
                "use strict";

                function ContentEditable(element, completer, option) {
                    this.initialize(element, completer, option)
                }
                $.extend(ContentEditable.prototype, $.fn.textcomplete.Adapter.prototype, {
                    select: function(value, strategy, e) {
                        var pre = this.getTextFromHeadToCaret(),
                            sel = window.getSelection(),
                            range = sel.getRangeAt(0),
                            selection = range.cloneRange();
                        selection.selectNodeContents(range.startContainer);
                        var post = selection.toString().substring(range.startOffset),
                            newSubstr = strategy.replace(value, e);
                        $.isArray(newSubstr) && (post = newSubstr[1] + post, newSubstr = newSubstr[0]), pre = pre.replace(strategy.match, newSubstr), range.selectNodeContents(range.startContainer), range.deleteContents();
                        var node = document.createTextNode(pre + post);
                        range.insertNode(node), range.setStart(node, pre.length), range.collapse(!0), sel.removeAllRanges(), sel.addRange(range)
                    },
                    _getCaretRelativePosition: function() {
                        var range = window.getSelection().getRangeAt(0).cloneRange(),
                            node = document.createElement("span");
                        range.insertNode(node), range.selectNodeContents(node), range.deleteContents();
                        var $node = $(node),
                            position = $node.offset();
                        return position.left -= this.$el.offset().left, position.top += $node.height() - this.$el.offset().top, position.lineHeight = $node.height(), $node.remove(), "rtl" === (this.$el.attr("dir") || this.$el.css("direction")) && (position.left -= this.listView.$el.width()), position
                    },
                    getTextFromHeadToCaret: function() {
                        var range = window.getSelection().getRangeAt(0),
                            selection = range.cloneRange();
                        return selection.selectNodeContents(range.startContainer), selection.toString().substring(0, range.startOffset)
                    }
                }), $.fn.textcomplete.ContentEditable = ContentEditable
            }(jQuery), jQuery
    }));
var iNatModels = iNatModels || {};
iNatModels.Observation = function(attrs) {
    var that = this;
    _.each(attrs, (function(value, attr) {
        that[attr] = "taxon" === attr ? new iNatModels.Taxon(value) : "user" === attr ? new iNatModels.User(value) : value
    })), this.identifications_count = _.size(_.filter(this.identifications, (function(i) {
        return i.current && !i.hidden
    })))
}, iNatModels.Observation.prototype.photo = function() {
    if (void 0 !== this.cachedPhoto) return this.cachedPhoto;
    if (this.photos && this.photos.length > 0) {
        var url = this.photos[0].url;
        this.cachedPhoto = url ? url.replace(/square.(jpe?g|png|gif|\?)/i, (function(match, $1) {
            return "medium." + $1
        })) : null
    }
    return this.cachedPhoto
}, iNatModels.Observation.prototype.hasMedia = function() {
    return this.photo() || this.hasSound()
}, iNatModels.Observation.prototype.hasSound = function() {
    return this.sounds && this.sounds.length > 0
}, iNatModels.Observation.prototype.placeIcon = function() {
    return this.obscured ? "private" === this.geoprivacy ? "<i class='geoprivacy-icon icon-icn-location-private' title='" + I18n.t("location_is_private") + "' alt='" + I18n.t("location_is_private") + "' />" : "<i class='geoprivacy-icon icon-icn-location-obscured' title='" + I18n.t("location_is_obscured") + "' alt='" + I18n.t("location_is_obscured") + "' />" : this.location ? "<i class='fa fa-map-marker' title='" + I18n.t("location_is_public") + "' alt='" + I18n.t("location_is_public") + "' />" : ""
}, iNatModels.Observation.prototype.displayPlace = function() {
    return "private" !== this.geoprivacy || this.location ? this.place_guess ? this.place_guess : this.location ? this.location : I18n.t("location_unknown") : I18n.t("private_")
}, iNatModels.Observation.prototype.qualityGrade = function(opts) {
    var options = opts || {};
    return "research" === this.quality_grade ? options.short ? I18n.t("research_grade_short_html") : I18n.t("research_grade") : "needs_id" === this.quality_grade ? I18n.t("needs_id_") : I18n.t("casual_")
};
var iNatModels = iNatModels || {};
iNatModels.Place = function(attrs) {
    var that = this;
    _.each(attrs, (function(value, attr) {
        that[attr] = value
    }))
}, iNatModels.Place.prototype.placeTypeLabel = function() {
    if (!this.place_type) return null;
    var label = iNatModels.Place.PLACE_TYPES[this.place_type];
    return label ? I18n.t("place_geo.geo_planet_place_types." + label.replace(/ /g, "_")) : null
}, iNatModels.Place.PLACE_TYPES = {
    0: "Undefined",
    2: "Street Segment",
    5: "Intersection",
    6: "Street",
    7: "Town",
    8: "State",
    9: "County",
    10: "Local Administrative Area",
    12: "Country",
    13: "Island",
    14: "Airport",
    15: "Drainage",
    16: "Land Feature",
    17: "Miscellaneous",
    18: "Nationality",
    19: "Supername",
    20: "Point of Interest",
    21: "Region",
    24: "Colloquial",
    25: "Zone",
    26: "Historical State",
    27: "Historical County",
    29: "Continent",
    33: "Estate",
    35: "Historical Town",
    36: "Aggregate",
    100: "Open Space",
    101: "Territory",
    102: "District",
    103: "Province",
    1e3: "Municipality",
    1001: "Parish",
    1002: "Department Segment",
    1003: "City Building",
    1004: "Commune",
    1005: "Governorate",
    1006: "Prefecture",
    1007: "Canton",
    1008: "Republic",
    1009: "Division",
    1010: "Subdivision",
    1011: "Village block",
    1012: "Sum",
    1013: "Unknown",
    1014: "Shire",
    1015: "Prefecture City",
    1016: "Regency",
    1017: "Constituency",
    1018: "Local Authority",
    1019: "Poblacion",
    1020: "Delegation"
};
var iNatModels = iNatModels || {};
iNatModels.Taxon = function(attrs) {
    var that = this;
    _.each(attrs, (function(value, attr) {
        that[attr] = value
    }))
}, iNatModels.Taxon.ICONIC_TAXA = [{
    id: 1,
    name: "Animalia",
    rank: "kingdom"
}, {
    id: 3,
    name: "Aves",
    rank: "class"
}, {
    id: 20978,
    name: "Amphibia",
    rank: "class"
}, {
    id: 26036,
    name: "Reptilia",
    rank: "class"
}, {
    id: 40151,
    name: "Mammalia",
    rank: "class"
}, {
    id: 47115,
    name: "Mollusca",
    rank: "phylum"
}, {
    id: 47119,
    name: "Arachnida",
    rank: "class"
}, {
    id: 47126,
    name: "Plantae",
    rank: "kingdom"
}, {
    id: 47158,
    name: "Insecta",
    rank: "class"
}, {
    id: 47170,
    name: "Fungi",
    rank: "kingdom"
}, {
    id: 47178,
    name: "Actinopterygii",
    rank: "class"
}, {
    id: 47686,
    name: "Protozoa",
    rank: "kingdom"
}, {
    id: 48222,
    name: "Chromista",
    rank: "kingdom"
}], iNatModels.Taxon.prototype.iconicTaxonName = function() {
    var that = this,
        iconicTaxon = _.find(iNatModels.Taxon.ICONIC_TAXA, (function(t) {
            return t.id === that.iconic_taxon_id
        }));
    return iconicTaxon ? iconicTaxon.name : "unknown"
}, iNatModels.Taxon.prototype.photo = function() {
    return this.default_photo ? this.default_photo.medium_url : this.default_photo_url
}, iNatModels.Taxon.prototype.photoTag = function() {
    return this.default_photo ? "<img src='" + this.default_photo.square_url + "'/>" : "<i class='icon icon-iconic-" + this.iconicTaxonName().toLowerCase() + "'/>"
}, iNatModels.Taxon.prototype.photoLicenseShort = function() {
    return this.default_photo ? this.default_photo.license_code && "c" !== this.default_photo.license_code ? this.default_photo.license_code.match(/^cc-/) ? "CC" : this.default_photo.license_code.toUpperCase() : "\xa9" : null
}, iNatModels.Taxon.prototype.photoAttribution = function() {
    return this.default_photo ? I18n.t("photo") + ": " + this.default_photo.attribution : null
}, iNatModels.Taxon.prototype.localizedPhotoAttribution = function(opts) {
    var options = _.extend({}, opts || {}),
        photo = this.default_photo;
    if (!photo) return null;
    var separator = options.separator || "",
        userName = options.name || "";
    0 === userName.length && (userName = photo.native_realname || userName), 0 === userName.length && (userName = photo.native_username || userName);
    var s, user = photo.user || options.user || (options.observation ? options.observation.user : null);
    if (user && 0 === userName.length && (userName = user.name || user.login || userName), 0 === userName.length && photo.attribution) {
        var matches = photo.attribution.match(/\(.+\) (.+?),/);
        matches && (userName = matches[1])
    }
    userName = 0 === userName.length ? I18n.t("unknown") : userName, s = "pd" === photo.license_code ? I18n.t("copyright.no_known_copyright_restrictions", {
        name: userName,
        license_name: I18n.t("public_domain")
    }) : "cc0" === photo.license_code ? I18n.t("by_user", {
        user: userName
    }) : "(c) " + userName;
    var rights = I18n.t("all_rights_reserved");
    return photo.license_code && (s += separator, rights = "cc0" === photo.license_code ? I18n.t("copyright.no_rights_reserved") + " (CC0)" : I18n.t("some_rights_reserved") + " (" + photo.license_code.replace(/cc-?/, "CC ").toUpperCase() + ")"), s + " " + rights
}, iNatModels.Taxon.prototype.establishmentMeansCode = function() {
    if (void 0 !== this.establishment_means_code) return this.establishment_means_code;
    switch (this.establishment_means && this.establishment_means.establishment_means) {
        case "native":
            this.establishment_means_code = "N";
            break;
        case "endemic":
            this.establishment_means_code = "E";
            break;
        case "introduced":
            this.establishment_means_code = "IN";
            break;
        default:
            this.establishment_means_code = null
    }
    return this.establishment_means_code
}, iNatModels.Taxon.prototype.conservationStatus = function() {
    if (void 0 !== this.conservationStatusName) return this.conservationStatusName;
    switch (this.conservation_status && this.conservation_status.status) {
        case "NE":
            this.conservationStatusName = I18n.t("not_evaluated");
            break;
        case "DD":
            this.conservationStatusName = I18n.t("data_deficient");
            break;
        case "LC":
            this.conservationStatusName = I18n.t("least_concern");
            break;
        case "NT":
            this.conservationStatusName = I18n.t("near_threatened");
            break;
        case "VU":
            this.conservationStatusName = I18n.t("vulnerable");
            break;
        case "EN":
            this.conservationStatusName = I18n.t("endangered");
            break;
        case "CR":
            this.conservationStatusName = I18n.t("critically_endangered");
            break;
        case "EW":
            this.conservationStatusName = I18n.t("extinct_in_the_wild");
            break;
        case "EX":
            this.conservationStatusName = I18n.t("extinct");
            break;
        default:
            this.conservationStatusName = null
    }
    return this.conservationStatusName
}, iNatModels.Taxon.capitalize = function(s) {
    if (_.isEmpty(s)) return s;
    var lowerCaseChars = "\xb5\xdf\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf8\xd8\xf9\xfa\xfb\xfc\xfd\xfe\xff\u0101\u0103\u0105\u0107\u0109\u010b\u010d\u010f\u0113\u0115\u0117\u0119\u011b\u011d\u011f\u0121\u0123\u0125\u0129\u012b\u012d\u012f\u0135\u0137\u013a\u013c\u013e\u0142\u0144\u0146\u0148\u014d\u014f\u0151\u0152\u0153\u0155\u0157\u0159\u015b\u015d\u015f\u0161\u0163\u0165\u0169\u016b\u016d\u016f\u0171\u0173\u0175\u0177\u017a\u017c\u017e\u01a1\u01b0\u01ce\u01d0\u01d2\u01d4\u01d6\u01d8\u01da\u01dc\u01df\u01e1\u01e3\u01e7\u01e9\u01eb\u01ed\u01ef\u01f0\u01f5\u01f9\u01fb\u01fd\u01ff\u0201\u0203\u0205\u0207\u0209\u020b\u020d\u020f\u0211\u0213\u0215\u0217\u0219\u021b\u021f\u0227\u0229\u022b\u022d\u022f\u0231\u0233\u03a9\u1e01\u1e03\u1e05\u1e07\u1e09\u1e0b\u1e0d\u1e0f\u1e11\u1e13\u1e15\u1e17\u1e19\u1e1b\u1e1d\u1e1f\u1e21\u1e23\u1e25\u1e27\u1e29\u1e2b\u1e2d\u1e2f\u1e31\u1e33\u1e35\u1e37\u1e39\u1e3b\u1e3d\u1e3f\u1e41\u1e43\u1e45\u1e47\u1e49\u1e4b\u1e4d\u1e4f\u1e51\u1e53\u1e55\u1e57\u1e59\u1e5b\u1e5d\u1e5f\u1e61\u1e63\u1e65\u1e67\u1e69\u1e6b\u1e6d\u1e6f\u1e71\u1e73\u1e75\u1e77\u1e79\u1e7b\u1e7d\u1e7f\u1e81\u1e83\u1e85\u1e87\u1e89\u1e8b\u1e8d\u1e8f\u1e91\u1e93\u1e95\u1e96\u1e97\u1e98\u1e99\u1e9b\u1ea1\u1ea3\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\u1eb9\u1ebb\u1ebd\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u1ec9\u1ecb\u1ecd\u1ecf\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u1edb\u1edd\u1edf\u1ee1\u1ee3\u1ee5\u1ee7\u1ee9\u1eeb\u1eed\u1eef\u1ef1\u1ef3\u1ef5\u1ef7\u1ef9\u2202\u2206\u2211\ufb01\ufb02",
        allCasePattern = new RegExp("[A-z" + lowerCaseChars + lowerCaseChars.toUpperCase() + "]"),
        firstLetterMatch = s.match(allCasePattern),
        firstLetterIndex = firstLetterMatch ? firstLetterMatch.index : 0,
        leadingContractionPattern = new RegExp("^[a-z" + lowerCaseChars + "][\u2019']([A-z" + lowerCaseChars + lowerCaseChars.toUpperCase() + "]+)"),
        leadingContractionMatch = s.match(leadingContractionPattern);
    return leadingContractionMatch && (firstLetterIndex = s.indexOf(leadingContractionMatch[1])), s.slice(0, firstLetterIndex) + s[firstLetterIndex].toUpperCase() + s.slice(firstLetterIndex + 1)
}, iNatModels.Taxon.titleCaseName = function(name) {
    if (!name) return name;
    var uncapitalized = ["a", "and", "atau", "con", "da", "dal", "dan", "de", "dei", "del", "des", "di", "du", "e", "in", "la", "o", "of", "on", "the", "u", "y", "\xe0"],
        commonNamePieces = _.trim(name).split(/\s+/);
    return _.map(commonNamePieces, (function(piece, i) {
        return i > 0 && uncapitalized.indexOf(piece.toLowerCase()) >= 0 ? piece.toLowerCase() : i === commonNamePieces.length - 1 ? "-" === piece[0] ? piece.toLowerCase() : piece.split("-").map((function(s) {
            return uncapitalized.indexOf(s.toLowerCase()) >= 0 ? s.toLowerCase() : iNatModels.Taxon.capitalize(s)
        })).join("-") : iNatModels.Taxon.capitalize(piece)
    })).join(" ")
}, iNatModels.Taxon.prototype.preferredCommonName = function(opts) {
    var nameInLocale, nameInPlace, nameInAncestorPlace, options = _.extend({}, opts || {});
    return options.locale = (options.locale || I18n.locale || "en").split("-")[0], _.each(this.names, (function(n) {
        options.preferredPlace && n.place_taxon_names && (_.find(n.place_taxon_names, (function(ptn) {
            return ptn.place_id === options.preferredPlace.id
        })) ? nameInPlace = n.name : _.find(n.place_taxon_names, (function(ptn) {
            return _.includes(options.preferredPlace.ancestor_place_ids, ptn.place_id)
        })) && (nameInAncestorPlace = n.name)), nameInLocale || n.locale.toString().split("-")[0] !== options.locale || (nameInLocale = n.name)
    })), nameInLocale = nameInPlace || nameInAncestorPlace || nameInLocale || this.preferred_common_name, !0 !== options.defaultToEnglish || nameInLocale || "en" === options.locale ? iNatModels.Taxon.titleCaseName(nameInLocale) : this.preferredCommonName(_.extend({}, options, {
        locale: "en"
    }))
};
var iNatModels = iNatModels || {};
if (iNatModels.User = function(attrs) {
        var that = this;
        _.each(attrs, (function(value, attr) {
            that[attr] = value
        }))
    }, iNatModels.User.default_thumbnail = function() {
        return "/attachment_defaults/users/icons/defaults/thumb.png"
    }, "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
! function() {
    "use strict";
    var b = jQuery.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(),
function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        return a(this).one("bsTransitionEnd", (function() {
            c = !0
        })), setTimeout((function() {
            c || a(d).trigger(a.support.transition.end)
        }), b), this
    }, a((function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    }))
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each((function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        }))
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.5", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = (f = e.attr("href")) && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each((function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        }))
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.5", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy((function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }), this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', (function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
    })).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', (function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    }))
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each((function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        }))
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b);
        if (("prev" == a && 0 === c || "next" == a && c == this.$items.length - 1) && !this.options.wrap) return b;
        var f = (c + ("prev" == a ? -1 : 1)) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", (function() {
            b.to(a)
        })) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", (function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout((function() {
                    i.$element.trigger(m)
                }), 0)
            })).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", (function() {
        a('[data-ride="carousel"]').each((function() {
            var c = a(this);
            b.call(c, c.data())
        }))
    }))
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each((function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        }))
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.5", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy((function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }), this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', (function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            h = f.data("bs.collapse") ? "toggle" : e.data();
        c.call(f, h)
    }))
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = (c = b.attr("href")) && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each((function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f))))
        })))
    }

    function d(b) {
        return this.each((function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        }))
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.5", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", (function(a) {
        a.stopPropagation()
    })).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery),
function(a) {
    "use strict";

    function b(b, d) {
        return this.each((function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        }))
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy((function() {
            this.$element.trigger("loaded.bs.modal")
        }), this))
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", (function() {
            d.$element.one("mouseup.dismiss.bs.modal", (function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            }))
        })), this.backdrop((function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", (function() {
                d.$element.trigger("focus").trigger(f)
            })).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        })))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy((function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }), this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy((function(a) {
            27 == a.which && this.hide()
        }), this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop((function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        }))
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy((function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }), this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', (function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", (function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", (function() {
                d.is(":visible") && d.trigger("focus")
            }))
        })), b.call(f, g, this)
    }))
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each((function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        }))
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return (b = a.extend({}, this.getDefaults(), this.$element.data(), b)).delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, (function(a, d) {
            c[a] != d && (b[a] = d)
        })), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout((function() {
            "in" == c.hoverState && c.show()
        }), c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout((function() {
            "out" == c.hoverState && c.hide()
        }), c.options.delay.hide)) : c.hide())
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        var c = (b = b || this.$element)[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var b = this.$element,
            c = this.options;
        return b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do {
            a += ~~(1e6 * Math.random())
        } while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && ((c = a(b.currentTarget).data("bs." + this.type)) || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide((function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
        }))
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each((function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        }))
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.5",
        c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
            return c.DEFAULTS
        }, c.prototype.setContent = function() {
            var a = this.tip(),
                b = this.getTitle(),
                c = this.getContent();
            a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
        }, c.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, c.prototype.getContent = function() {
            var a = this.$element,
                b = this.options;
            return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
        }, c.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery),
function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each((function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        }))
    }
    b.VERSION = "3.3.5", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map((function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        })).sort((function(a, b) {
            return a[0] - b[0]
        })).each((function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        }))
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", (function() {
        a('[data-spy="scroll"]').each((function() {
            var b = a(this);
            c.call(b, b.data())
        }))
    }))
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each((function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        }))
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = (d = b.attr("href")) && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), (function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                }))
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery),
function(a) {
    "use strict";

    function b(b) {
        return this.each((function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        }))
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.5", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e && "top";
        if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(a - d >= e + g) && "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top;
        return null != c && c >= e ? "top" : null != d && i + (h ? g : b) >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", (function() {
        a('[data-spy="affix"]').each((function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        }))
    }))
}(jQuery);