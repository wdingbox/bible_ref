(function (l, f, n) {
    function s(a) {
        return a.replace(/(\s|\r?\n)+/g, " ").replace(/:/g, ".")
    }

    function B(a) {
        a = (a || "").toLowerCase();
        "default" === a && (a = "");
        return b.lbsBibliaVersionAbbreviations[a] || a
    }

    function G(a, d) {
        var c = "http:" + (v[b.lbsBibleReader] || v.biblia) + "/bible/";
        d = B(d);
        c = [c, d ? d + "/" : "", a.replace(/:/g, ".")];
        return encodeURI(c.join("").replace(/(\s|\r?\n)+/g, " "))
    }

    function N() {
        clearTimeout(w)
    }

    function O() {
        w = setTimeout(function () {
            r(h)
        }, C.hideTooltipDelay)
    }

    function D(a) {
        a = a || l.event;
        for (var d = a.target ||
            a.srcElement, c, e;
            "a" != d.tagName.toLowerCase();) d = d.parentNode;
        c = d.lbsReference;
        e = d.lbsVersion;
        h && (clearTimeout(w), r(h));
        H = setTimeout(function () {
            var a = d,
                f = b.createTooltip(a);
            h && r(h);
            b.populateTooltipContent(f, c, e);
            n.appendChild(f);
            h = f;
            x = a
        }, y ? 1 : C.showTooltipDelay)
    }

    function I() {
        y || (clearTimeout(H), h && (w = setTimeout(function () {
            r(h)
        }, C.hideTooltipDelay)))
    }

    function r(a) {
        a && a.parentNode && a.parentNode.removeChild(a);
        h = x = null
    }
    var E = {}, P = 0,
        J = f.getElementsByTagName("head")[0],
        H = null,
        w = null,
        h = null,
        x = null,
        y = !1,
        F = {}, K = 0,
        L = 0,
        C = {
            showTooltipDelay: 250,
            hideTooltipDelay: 300
        }, M = !1,
        v = {
            biblia: "//biblia.com",
            "bible.faithlife": "//bible.faithlife.com"
        }, b = {
            lbsBibleReader: "biblia",
            lbsBibleVersion: "ESV",
            lbsLibronixBibleVersion: "",
            lbsLogosBibleVersion: "",
            lbsAddLibronixDLSLink: !1,
            lbsAddLogosLink: !1,
            lbsAppendIconToLibLinks: !1,
            lbsAppendIconToLogosLinks: !1,
            lbsLibronixLinkIcon: null,
            lbsLogosLinkIcon: "dark",
            lbsUseTooltip: !0,
            lbsLinksOpenNewWindow: !1,
            lbsNoSearchTagNames: ["h1", "h2", "h3"],
            lbsNoSearchClassNames: [],
            lbsRootNode: null,
            lbsCssOverride: !1,
            lbsCaseInsensitive: !1,
            lbsConvertHyperlinks: !1,
            lbsHyperlinkTestList: [],
            lbsMaxTreeDepth: 200,
            callbacks: E,
            insertRefNode: function (a, d, c, e) {
                a = s(a);
                c = c || b.lbsBibleVersion;
                var t = b.addLinkAttributes(f.createElement("a"), a, B(c));
                t.innerHTML = d;
                e.parentNode.insertBefore(t, e);
                b.lbsAddLogosLink && b.insertLibLink(e, a.replace(/(\d)\s*(?:[a-z]|ff)(\W|$)|/g, "$1$2").replace(/\s+/g, "").replace(/[\u2012\u2013\u2014\u2015]+/g, "-"), c);
                K++
            },
            addLinkAttributes: function (a, d, c) {
                var e = a.innerHTML;
                a.href = G(d,
                    c);
                a.innerHTML = e;
                a.lbsReference = d;
                a.lbsVersion = c;
                a.className = a.className && 0 < a.className.length ? a.className + " lbsBibleRef" : "lbsBibleRef";
                a.setAttribute("data-reference", d);
                a.setAttribute("data-version", c);
                b.lbsLinksOpenNewWindow && (a.target = "_blank");
                b.lbsUseTooltip && (a.addEventListener ? (a.addEventListener("mouseover", D, !1), a.addEventListener("mouseout", I, !1), a.addEventListener("click", function (a) {
                    y && a.target !== x && (a.preventDefault(), null == x && D.call(this, a))
                }, !1)) : a.attachEvent && (a.attachEvent("onmouseover",
                    D), a.attachEvent("onmouseout", I)));
                return a
            },
            insertLibLink: function (a, d) {
                var c = f.createElement("img"),
                    e, t;
                c.src = "light" === (b.lbsLibronixLinkIcon || b.lbsLogosLinkIcon).toLowerCase() ? f.location.protocol + "//www.logos.com/images/Corporate/LibronixLink_light.png" : f.location.protocol + "//www.logos.com/images/Corporate/LibronixLink_dark.png";
                c.border = 0;
                c.title = "Open in Logos Bible Software (if available)";
                c.style.marginLeft = "4px";
                c.style.marginBottom = "0px";
                c.style.marginRight = "0px";
                c.style.border = 0;
                c.style.padding =
                    0;
                c.style["float"] = "none";
                c.align = "bottom";
                d ? (e = f.createElement("a"), e.href = ["libronixdls:keylink|ref=[en]bible:", d].join(""), t = b.lbsLogosBibleVersion || b.lbsLibronixBibleVersion, t.length && "DEFAULT" !== t.toUpperCase() && (e.href += "|res=LLS:" + t.toUpperCase()), e.className = "lbsLibronix", e.appendChild(c), a.parentNode.insertBefore(e, a)) : a.appendChild(c)
            },
            insertTextNode: function (a, d) {
                var b = f.createTextNode(a);
                d.parentNode.insertBefore(b, d)
            },
            refSearch: function (a, d, c, e, f, j) {
                var p = 0,
                    m = c,
                    k = e,
                    g, z, u, l, q = b.lbsBibleVersion,
                    h = null,
                    A = RegExp.rightContext;
                if (c && (g = b.lbsBookContRegExp.exec(a))) A = RegExp.rightContext, u = [m, " ", g[2]].join(""), k = g[3], l = g[1];
                if (e && !g && (g = b.lbsChapContRegExp.exec(a))) A = RegExp.rightContext, u = [m, " ", k, ":", g[2]].join(""), l = g[1];
                if (!g && b.lbsRefQuickTest.test(a) && (g = b.lbsRefRegExp.exec(a))) c = RegExp.leftContext, z = A = RegExp.rightContext, u = g[2], l = c + g[1], m = g[3], k = g[4], g[9] && (h = g[9], q = h.replace(/\W/g, "")), g[8] && (m = g[8], k = 1);
                g ? j ? (a = s(u), q = q || b.lbsBibleVersion, b.addLinkAttributes(j, a, q)) : (z || (z = A), b.insertTextNode(l,
                    d), b.insertRefNode(u, null === h ? g[2] : g[2] + h, q, d), p = b.refSearch(z, d, m, k, q == b.lbsBibleVersion ? null : q), p += b.lbsAddLogosLink ? 3 : 2) : a !== d.nodeValue && (a && f != a && b.insertTextNode(a, d), d.parentNode.removeChild(d));
                return p
            },
            traverseDom: function (a, d, c) {
                c = c || 0;
                var e = 0,
                    f = !1,
                    j = (a.tagName || "").toLowerCase(),
                    m = !1,
                    k, g, l, h, n, q, r;
				
				try {
                    p = a.className ? a.className.split(" ") : [];
				}
				catch(e)
				{
					p = a.className.baseVal ? a.className.baseVal.split(" ") : [];
				}
				
                if (c > b.lbsMaxTreeDepth) return 0;
                k = 0;
                for (n = b.lbsNoSearchClassNames.length; k < n; k++) {
                    q = 0;
                    for (r = p.length; q < r; q++)
                        if (b.lbsNoSearchClassNames[k].toLowerCase() ==
                            p[q].toLowerCase()) {
                            m = !0;
                            break
                        }
                    if (m) break
                }
                if (3 === a.nodeType) e = b.refSearch(a.nodeValue, a, null, null, null, d);
                else if (0 < j.length && (!b.lbsNoSearchTags[j] || "a" === j) && !m) {
                    d = null;
                    if ("a" === j) {
                        k = /^libronixdls:/i;
                        if (k.test(a.href))(b.lbsAppendIconToLibLinks || b.lbsAppendIconToLogosLinks) && (!a.lastChild || !(a.lastChild.tagName && "img" === a.lastChild.tagName.toLowerCase())) && b.insertLibLink(a, null);
                        else if (/lbsBibleRef/i.test(a.className)) h = a.getAttribute("data-reference"), k = a.getAttribute("data-version"), h && b.addLinkAttributes(a,
                            s(h), k || b.lbsBibleVersion);
                        else if (/bibleref/i.test(a.className)) f = b.tagBibleref(a, function (a, d, c) {
                            g = s(d);
                            l = c || b.lbsBibleVersion;
                            b.addLinkAttributes(a, g, l)
                        });
                        else if (!0 === b.lbsConvertHyperlinks && 1 === a.childNodes.length && 3 === a.firstChild.nodeType) {
                            k = 0 === b.lbsHyperlinkTestList.length;
                            for (h in b.lbsHyperlinkTestList)
                                if (0 <= a.href.toLowerCase().indexOf(h.toLowerCase())) {
                                    k = !0;
                                    break
                                }
                            k && (d = a)
                        }
                        if (null === d) return e
                    }
                    "cite" === j && /bibleref/.test(a.className.toLowerCase()) && (f = b.tagBibleref(a, function (a, d, c) {
                        b.insertRefNode(d,
                            a.innerHTML, c, a.firstChild);
                        a.removeChild(a.lastChild)
                    }));
                    if (!f) {
                        a = a.childNodes;
                        for (k = 0; k < a.length;) f = b.traverseDom(a[k], d, c + 1), k += f + 1
                    }
                }
                return e
            },
            tagBibleref: function (a, d) {
                var b = !1,
                    e, f;
                L++;
                a.title && 1 >= a.childNodes.length && (b = /^([A-Z]{2,5})[\s:]/.exec(a.title), f = RegExp.rightContext, b ? e = b[1] : f = a.title, d(a, f, e), b = !0);
                return b
            },
            createTooltip: function (a) {
                var b = a,
                    c = a = 0,
                    e = b,
                    h = 0,
                    j = 0;
                if ("number" === typeof b.offsetLeft) {
                    for (; b;) a += b.offsetLeft, c += b.offsetTop, b = b.offsetParent;
                    for (; e && e !== n && e !== f.documentElement;) j +=
                        e.scrollTop || 0, h += e.scrollLeft || 0, e = e.parentNode;
                    a -= h;
                    c -= j
                } else b.x && (a = b.x, c = b.y);
                var b = f.createElement("div"),
                    p, m, k, g;
                if ("number" === typeof l.innerHeight) p = l.innerWidth, m = l.innerHeight;
                else if (f.documentElement && (f.documentElement.clientHeight || f.documentElement.clientWidth)) p = f.documentElement.clientWidth, m = f.documentElement.clientHeight;
                else if (n && (n.clientWidth || n.clientHeight)) p = n.clientWidth, m = n.clientHeight;
                e = [];
                e.offX = l.pageXOffset || n.scrollLeft || f.documentElement.scrollLeft;
                e.offY = l.pageYOffset ||
                    n.scrollTop || f.documentElement.scrollTop;
                e && (k = e.offX, g = e.offY);
                b.style.position = "absolute";
                b.style.width = "350px";
                b.style.height = "150px";
                b.style.zIndex = "9999999";
                b.className = "lbsTooltip";
                e = parseInt(b.style.width, 10);
                h = parseInt(b.style.height, 10);
                j = [];
                j.x = a + 15;
                j.y = c - h -15; // moved the y position up a bit- BCS
                e > p || h > m || (j.x += e, j.x > p + k - 10 && (j.x = p + k - 15 - 10), 0 > j.x && (j.x = 0), j.y < g && (j.y = c + h + 25 > m + g ? g : c + 25), j.x -= e + 3);
                b.style.top = j.y + "px";
                b.style.left = j.x + "px";
                b.onmouseover = N;
                b.onmouseout = O;
                b.addEventListener && b.addEventListener("touchstart", function (a) {
                    a.stopPropagation()
                }, !1);
                return b
            },
            populateTooltipContent: function (a, d, c) {
                var e = a.currentStyle ? a.currentStyle.backgroundColor : "inherit";
                a.innerHTML = b.constructTooltipContent(e, "Loading...", "", "");
                var h = function (c) {
                    a.innerHTML = b.constructTooltipContent(a.currentStyle ? a.currentStyle.backgroundColor : "inherit", c.reference + " (" + c.version + ")", c.content.replace('<span class="verse-ref" />', ""), '<div style="float: left; margin-left: 8px;"><a href="' + G(c.reference, c.resourceName) + '" target="_blank">More &raquo;</a></div>').replace(/\<span\s*class="verse-ref"\s*\/>/gi,
                        "")
                }, j = function () {
                        a.innerHTML = b.constructTooltipContent(e, "Sorry", "<p>This reference could not be loaded at this time.</p>", "")
                    }, l = d + "-" + c;
                if (F.hasOwnProperty(l)) h(F[l]);
                else {
                    var m = encodeURIComponent;
                    c = B(c);
                    d = [f.location.protocol, v[b.lbsBibleReader] || v.biblia, "/bible/", c ? m(c) + "/" : "", m(d), "?target=reftagger&userData=", m(a.id)].join("");
                    var k = function (a) {
                        F[l] = a;
                        h(a)
                    }, g = f.createElement("script"),
                        n = "cb" + P++,
                        r = !1,
                        s;
                    E[n] = function () {
                        clearTimeout(s);
                        delete E[n];
						
                        try{
							g.parentNode.removeChild(g);
						}
						catch (e) {
							// do nothing if there is an error
						}
						
                        r || k.apply(null,
                            Array.prototype.slice.call(arguments))
                    };
                    g.src = d + (/\?/.test(d) ? "&" : "?") + "callback=" + ("Logos.ReferenceTagging.callbacks." + n);
                    J.insertBefore(g, J.firstChild);
                    s = setTimeout(function () {
                        r = !0;
                        try{
							g.parentNode.removeChild(g);
						}
						catch (e) {
							// do nothing if there is an error
						}
							
                        j && j()
                    }, 5E3)
                }
            },
            constructTooltipContent: function (a, b, c, e) {
                return '<div style="position: absolute; background: transparent url(' + f.location.protocol + '//bible.logos.com/content/images/refTaggerDropShadow.png) no-repeat; width: 364px; height: 164px; left: -7px; top: -7px; z-index: -1"></div><div class="lbsContainer" style="height:150px; background-color:' +
                    a + ';"><div class="lbsTooltipHeader">' + b + '</div><div class="lbsTooltipBody" style="width:335px;">' + c + '</div><div class="lbsTooltipFooter" style="width:345px;">' + e + '<div><a href="http://www.logos.com/reftagger" target="_blank">Powered by RefTagger</a></div></div></div>'
            },
            appendCssRules: function () {
                if (!f.getElementById("lbsToolTipStyle")) {
                    var a = f.createElement("link");
                    a.type = "text/css";
                    a.rel = "stylesheet";
                    a.href = f.location.protocol + "//bible.logos.com/Content/ReferenceTagging.css";
                    a.media = "screen";
                    a.id =
                        "lbsToolTipStyle";
                    f.getElementsByTagName("head")[0].insertBefore(a, f.getElementsByTagName("head")[0].firstChild)
                }
            },
            lbsSavePrefs: function () {
                var a = f.getElementById("lbsRefTaggerCP"),
                    b = f.getElementById("lbsVersion").value,
                    c = !! f.getElementById("lbsUseLibronixLinks").checked,
                    e = new Date;
                a && (e.setFullYear(e.getFullYear() + 10), f.cookie = "lbsRefTaggerPrefs=" + b + "." + c + ";expires=" + e.toGMTString() + ";path=/", l.location.reload())
            },
            Init: function () {
                if (!b.Initialized) {
                    var a, d;
                    f.addEventListener && f.addEventListener("touchstart",
                        function (a) {
                            y = !0;
                            !/lbsBibleRef/i.test(a.target.className) && h && r(h)
                        }, !1);
                    b.lbsCssOverride || b.appendCssRules();
                    a = /lbsRefTaggerPrefs=(?:((?:\w|\d){2,5})\.(true|false))/.exec(f.cookie);
                    var c = f.getElementById("lbsRefTaggerCP"),
                        e;
                    a && (b.lbsBibleVersion = a[1], b.lbsAddLogosLink = "true" == a[2]);
                    if (null !== c) {
                        a = f.getElementById("lbsVersion");
                        c = 0;
                        for (e = a.length; c < e; c++)
                            if (a.options[c].outerText == (b.lbsBibleVersion || "default").toUpperCase()) {
                                a.selectedIndex = c;
                                break
                            }
                        b.lbsAddLogosLink && (f.getElementById("lbsUseLibronixLinks").checked =
                            "true")
                    }
                    b.lbsNoSearchTags = {
                        applet: !0,
                        hr: !0,
                        head: !0,
                        img: !0,
                        input: !0,
                        meta: !0,
                        script: !0,
                        select: !0,
                        textarea: !0
                    };
                    for (d in b.lbsNoSearchTagNames) a = b.lbsNoSearchTagNames[d], b.lbsNoSearchTags[a] = !0;
                    b.lbsNoSearchClasses = {};
                    for (d in b.lbsNoSearchClassNames) b.lbsNoSearchClasses[b.lbsNoSearchClassNames[d]] = !0;
                    b.lbsBibliaVersionAbbreviations = {
                        dar: "darby",
                        nasb: "nasb95",
                        gw: "godsword",
                        kjv21: "kjv1900",
                        nivuk: "niv",
                        kar: "hu-bible",
                        byz: "byzprsd",
                        kjv: "kjv1900",
                        net: "gs-netbible"
                    };
                    d = "AB;ASV;CEV;DARBY;DAR;ESV;GW;HCSB;KJ21;KJV;NASB;NCV;NET;NIRV;NIV;NIVUK;NKJV;NLT;NLV;MESSAGE;TNIV;WE;WNT;YLT;TNIV;NIRV;TNIV;NASB;WESTCOTT;CHASAOT;STEPHENS;AV 1873;KJV APOC;ELZEVIR;IT-DIODATI1649;TISCH;TISCHENDORF;CS-KR1579;TR1881;TR1894MR;TR1550MR;KAR;BYZ;LEB".split(";");
                    b.lbsRefQuickTest = RegExp("((\\d{1,3})(?:\\s?\\:\\s?|\\.)(\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?))|(Ob(?:ad(?:iah)?)?|Ph(?:ilem(?:on)?|m)|(?:(?:2(?:nd\\s)?|[Ss]econd\\s|II\\s)|(?:3(?:rd\\s)?|[Tt]hird\\s|III\\s))\\s*J(?:o(?:hn?)?|h?n)|Jude?)", "i");
                    b.lbsRefRegExp = RegExp("(\\W|^)((Z(?:e(?:p(?:h(?:aniah)?)?|c(?:h(?:ariah)?)?)|[pc])|W(?:is(?:d(?:om(?:\\s+of\\s+(?:Ben\\s+Sirah?|Solomon))?|.?\\s+of\\s+Sol))?|s)|T(?:ob(?:it)?|it(?:us)?|he(?:\\s+(?:Song\\s+of\\s+(?:Three\\s+(?:Youth|Jew)s|the\\s+Three\\s+Holy\\s+Children)|Re(?:velation|st\\s+of\\s+Esther))|ssalonians)|b)|S(?:us(?:anna)?|o(?:ng(?:\\s+(?:of\\s+(?:Thr(?:ee(?:\\s+(?:(?:Youth|Jew)s|Children))?)?|So(?:l(?:omon)?|ngs)|the\\s+Three\\s+Holy\\s+Children)|Thr))?)?|ir(?:a(?:c?h)?)?|OS)|R(?:u(?:th)?|o(?:m(?:ans)?)?|e(?:v(?:elation)?|st\\s+of\\s+Esther)?|[vm]|th)|Qoh(?:eleth)?|P(?:s(?:\\s+Sol(?:omon)?|a(?:lm(?:s(?:\\s+(?:of\\s+)?Solomon)?)?)?|Sol|s|l?m)?|r(?:ov(?:erbs)?|\\s+(?:(?:of\\s+)?Man|Az)|ayer\\s+of\\s+(?:Manasse[sh]|Azariah)|v)?|h(?:il(?:em(?:on)?|ippians)?|[pm])|Ma)|O(?:b(?:ad(?:iah)?)?|des)|N(?:u(?:m(?:bers)?)?|e(?:h(?:emiah)?)?|a(?:h(?:um)?)?|[mb])|M(?:rk?|ic(?:ah)?|a(?:t(?:t(?:hew)?)?|l(?:achi)?|r(?:k))|[tlk])|L(?:uke?|e(?:v(?:iticus)?|t(?:ter\\s+of\\s+Jeremiah|\\s+Jer))?|a(?:od(?:iceans)?|m(?:entations)?)?|[vk]|tr\\s+Jer|Je)|J(?:ud(?:g(?:es)?|ith|e)?|o(?:s(?:h(?:ua)?)?|n(?:ah)?|el?|hn|b)|nh?|e(?:r(?:emiah)?)?|d(?:th?|gs?)|a(?:me)?s|[ts]h|[rmlgb]|hn)|Is(?:a(?:iah)?)?|H(?:o(?:s(?:ea)?)?|e(?:b(?:rews)?)?|a(?:g(?:gai)?|b(?:akkuk)?)|g)|G(?:e(?:n(?:esis)?)?|a(?:l(?:atians)?)?|n)|E(?:z(?:ra?|e(?:k(?:iel)?)?|k)|x(?:o(?:d(?:us)?)?)?|s(?:th(?:er)?)?|p(?:ist(?:le\\s+(?:to\\s+(?:the\\s+)?Laodiceans|Laodiceans)|\\s+Laodiceans)|h(?:es(?:ians)?)?|\\s+Laod)?|c(?:cl(?:es(?:iast(?:icu|e)s)?|us)?)?|noch)|D(?:eut(?:eronomy)?|a(?:n(?:iel)?)?|[tn])|C(?:ol(?:ossians)?|anticle(?:\\s+of\\s+Canticle)?s)|B(?:el(?:\\s+and\\s+the\\s+Dragon)?|ar(?:uch)?)|A(?:m(?:os)?|dd(?:\\s+(?:Ps(?:alm)?|Es(?:th)?)|ition(?:s\\s+to\\s+Esther|al\\s+Psalm)|Esth)|c(?:(?:t)s)?|zariah|Es)|\u03c8|(?:4(?:th\\s)?|[Ff]ourth\\s|(?:IIII|IV)\\s)\\s*(?:Ma(?:c(?:c(?:abees)?)?)?)|(?:3(?:rd\\s)?|[Tt]hird\\s|III\\s)\\s*(?:Ma(?:c(?:c(?:abees)?)?)?|Jo(?:h(?:n)?)?|Jn\\.?|Jhn)|(?:(?:2(?:nd\\s)?|[Ss]econd\\s|II\\s)|(?:1(?:st\\s)?|[Ff]irst\\s|I\\s))\\s*(?:T(?:i(?:m(?:othy)?)?|h(?:es(?:s(?:alonians)?)?)?)|S(?:a(?:m(?:uel)?)?|m)?|P(?:e(?:t(?:er)?)?|t)|Ma(?:c(?:c(?:abees)?)?)?|K(?:i(?:n(?:gs)?)?|gs)|J(?:o(?:hn?)?|h?n)|Es(?:d(?:r(?:as)?)?)?|C(?:o(?:r(?:inthians)?)?|h(?:r(?:on(?:icles)?)?)?)))(?:\\.?\\s*(\\d{1,3})(?:\\s?\\:\\s?|\\.)(\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?)(\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?((?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?)?(?!\\s*(?:T(?:i(?:m(?:othy)?)?|h(?:es(?:s(?:alonians)?)?)?)|S(?:a(?:m(?:uel)?)?|m)?|P(?:e(?:t(?:er)?)?|t)|Ma(?:c(?:c(?:abees)?)?)?|K(?:i(?:n(?:gs)?)?|gs)|J(?:o(?:hn?)?|h?n)|Es(?:d(?:r(?:as)?)?)?|C(?:o(?:r(?:inthians)?)?|h(?:r(?:on(?:icles)?)?)?))(?:\\W)))?)|(Ob(?:ad(?:iah)?)?|Ph(?:ilem(?:on)?|m)|(?:(?:2(?:nd\\s)?|[Ss]econd\\s|II\\s)|(?:3(?:rd\\s)?|[Tt]hird\\s|III\\s))\\s*J(?:o(?:hn?)?|h?n)|Jude?)\\s*\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?)?)([,]?\\s?(?:" +
                        d.join("|") + ")|[,]?\\s?[(](?:" + d.join("|") + ")[)])?", b.lbsCaseInsensitive ? "i" : "");
                    b.lbsBookContRegExp = RegExp("^((?:(?:[,;\\.]+)?\\s?(?:and|or|&|&amp;)?)\\s*(?:(?:(?:cf|Cf|CF|cp|Cp|CP)[.,]?\\s?(?:v(?:v|ss?)?[.]?)?)[.,]?\\s*)?)((\\d{1,3})(?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?)?)?)");
                    b.lbsChapContRegExp = RegExp("^((?:(?:[,;\\.]+)?\\s?(?:and|or|&|&amp;)?)\\s*(?:(?:(?:cf|Cf|CF|cp|Cp|CP)[.,]?\\s?(?:v(?:v|ss?)?[.]?)?)[.,]?\\s*)?)(\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:\\s?(?:[a-z]|ff))(?=\\W|$))?)?)(?!\\s*(?:st|nd|rd|th|T(?:i(?:m(?:othy)?)?|h(?:es(?:s(?:alonians)?)?)?)|S(?:a(?:m(?:uel)?)?|m)?|P(?:e(?:t(?:er)?)?|t)|Ma(?:c(?:c(?:abees)?)?)?|K(?:i(?:n(?:gs)?)?|gs)|J(?:o(?:hn?)?|h?n)|Es(?:d(?:r(?:as)?)?)?|C(?:o(?:r(?:inthians)?)?|h(?:r(?:on(?:icles)?)?)?)))",
                        b.lbsCaseInsensitive ? "i" : "");
                    b.Initialized = !0
                }
            },
            tag: function (a, d) {
                b.lbsAddLogosLink = b.lbsAddLogosLink || b.lbsAddLibronixDLSLink;
                "ab".match(/b/);
                f.getElementById && (f.childNodes && f.createElement && RegExp.leftContext) && (b.Initialized || b.Init(), b.traverseDom(a || b.lbsRootNode || n), M || ((new Image).src = [f.location.protocol, "//bible.logos.com/util/ReferenceData.aspx?location=", encodeURIComponent(f.location), "&refCount=", +K, "&microrefCount=", +L, "&bibleVersion=", encodeURIComponent(b.lbsBibleVersion), "&libronix=", !! b.lbsAddLogosLink, "&tooltip=", !! b.lbsUseTooltip, "&source=", encodeURIComponent(d || ""), "&rand=", Math.random().toString().substring(10)].join(""), M = !0))
            }
        };
    l.Logos = l.Logos || {};
    l.Logos.ReferenceTagging = l.Logos.ReferenceTagging || b
})(window, document, document.body);