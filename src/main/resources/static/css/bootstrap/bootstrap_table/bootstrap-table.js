/*
* bootstrap-table - v1.11.0 - 2016-07-02
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2016 zhixin wen
* Licensed MIT License
*/
!function (a) {
    "use strict";
    var b = null, c = function (a) {
        var b = arguments, c = !0, d = 1;
        return a = a.replace(/%s/g, function () {
            var a = b[d++];
            return "undefined" == typeof a ? (c = !1, "") : a
        }), c ? a : ""
    }, d = function (b, c, d, e) {
        var f = "";
        return a.each(b, function (a, b) {
            return b[c] === e ? (f = b[d], !1) : !0
        }), f
    }, e = function (b, c) {
        var d = -1;
        return a.each(b, function (a, b) {
            return b.field === c ? (d = a, !1) : !0
        }), d
    }, f = function (b) {
        var c, d, e, f = 0, g = [];
        for (c = 0; c < b[0].length; c++) f += b[0][c].colspan || 1;
        for (c = 0; c < b.length; c++) for (g[c] = [], d = 0; f > d; d++) g[c][d] = !1;
        for (c = 0; c < b.length; c++) for (d = 0; d < b[c].length; d++) {
            var h = b[c][d], i = h.rowspan || 1, j = h.colspan || 1, k = a.inArray(!1, g[c]);
            for (1 === j && (h.fieldIndex = k, "undefined" == typeof h.field && (h.field = k)), e = 0; i > e; e++) g[c + e][k] = !0;
            for (e = 0; j > e; e++) g[c][k + e] = !0
        }
    }, g = function () {
        if (null === b) {
            var c, d, e = a("<p/>").addClass("fixed-table-scroll-inner"),
                f = a("<div/>").addClass("fixed-table-scroll-outer");
            f.append(e), a("body").append(f), c = e[0].offsetWidth, f.css("overflow", "scroll"), d = e[0].offsetWidth, c === d && (d = f[0].clientWidth), f.remove(), b = c - d
        }
        return b
    }, h = function (b, d, e, f) {
        var g = d;
        if ("string" == typeof d) {
            var h = d.split(".");
            h.length > 1 ? (g = window, a.each(h, function (a, b) {
                g = g[b]
            })) : g = window[d]
        }
        return "object" == typeof g ? g : "function" == typeof g ? g.apply(b, e) : !g && "string" == typeof d && c.apply(this, [d].concat(e)) ? c.apply(this, [d].concat(e)) : f
    }, i = function (b, c, d) {
        var e = Object.getOwnPropertyNames(b), f = Object.getOwnPropertyNames(c), g = "";
        if (d && e.length !== f.length) return !1;
        for (var h = 0; h < e.length; h++) if (g = e[h], a.inArray(g, f) > -1 && b[g] !== c[g]) return !1;
        return !0
    }, j = function (a) {
        return "string" == typeof a ? a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/`/g, "&#x60;") : a
    }, k = function (b) {
        var c = 0;
        return b.children().each(function () {
            c < a(this).outerHeight(!0) && (c = a(this).outerHeight(!0))
        }), c
    }, l = function (a) {
        for (var b in a) {
            var c = b.split(/(?=[A-Z])/).join("-").toLowerCase();
            c !== b && (a[c] = a[b], delete a[b])
        }
        return a
    }, m = function (a, b, c) {
        var d = a;
        if ("string" != typeof b || a.hasOwnProperty(b)) return c ? j(a[b]) : a[b];
        var e = b.split(".");
        for (var f in e) d = d && d[e[f]];
        return c ? j(d) : d
    }, n = function () {
        return !!(navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.match(/Trident.*rv\:11\./))
    }, o = function () {
        Object.keys || (Object.keys = function () {
            var a = Object.prototype.hasOwnProperty, b = !{toString: null}.propertyIsEnumerable("toString"),
                c = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                d = c.length;
            return function (e) {
                if ("object" != typeof e && ("function" != typeof e || null === e)) throw new TypeError("Object.keys called on non-object");
                var f, g, h = [];
                for (f in e) a.call(e, f) && h.push(f);
                if (b) for (g = 0; d > g; g++) a.call(e, c[g]) && h.push(c[g]);
                return h
            }
        }())
    }, p = function (b, c) {
        this.options = c, this.$el = a(b), this.$el_ = this.$el.clone(), this.timeoutId_ = 0, this.timeoutFooter_ = 0, this.init()
    };
    p.DEFAULTS = {
        classes: "table table-hover",
        locale: void 0,
        height: void 0,
        undefinedText: "-",
        sortName: void 0,
        sortOrder: "asc",
        sortStable: !1,
        striped: !1,
        columns: [[]],
        data: [],
        dataField: "rows",
        method: "get",
        url: void 0,
        ajax: void 0,
        cache: !0,
        contentType: "application/json",
        dataType: "json",
        ajaxOptions: {},
        queryParams: function (a) {
            return a
        },
        queryParamsType: "limit",
        responseHandler: function (a) {
            return a
        },
        pagination: !1,
        onlyInfoPagination: !1,
        sidePagination: "client",
        totalRows: 0,
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        paginationHAlign: "right",
        paginationVAlign: "bottom",
        paginationDetailHAlign: "left",
        paginationPreText: "&lsaquo;",
        paginationNextText: "&rsaquo;",
        search: !1,
        searchOnEnterKey: !1,
        strictSearch: !1,
        searchAlign: "right",
        selectItemName: "btSelectItem",
        showHeader: !0,
        showFooter: !1,
        showColumns: !1,
        showPaginationSwitch: !1,
        showRefresh: !1,
        showToggle: !1,
        buttonsAlign: "right",
        smartDisplay: !0,
        escape: !1,
        minimumCountColumns: 1,
        idField: void 0,
        uniqueId: void 0,
        cardView: !1,
        detailView: !1,
        detailFormatter: function () {
            return ""
        },
        trimOnSearch: !0,
        clickToSelect: !1,
        singleSelect: !1,
        toolbar: void 0,
        toolbarAlign: "left",
        checkboxHeader: !0,
        sortable: !0,
        silentSort: !0,
        maintainSelected: !1,
        searchTimeOut: 500,
        searchText: "",
        iconSize: void 0,
        buttonsClass: "default",
        iconsPrefix: "glyphicon",
        icons: {
            paginationSwitchDown: "glyphicon-collapse-down icon-chevron-down",
            paginationSwitchUp: "glyphicon-collapse-up icon-chevron-up",
            refresh: "glyphicon-refresh icon-refresh",
            toggle: "glyphicon-list-alt icon-list-alt",
            columns: "glyphicon-th icon-th",
            detailOpen: "glyphicon-plus icon-plus",
            detailClose: "glyphicon-minus icon-minus"
        },
        customSearch: a.noop,
        customSort: a.noop,
        rowStyle: function () {
            return {}
        },
        rowAttributes: function () {
            return {}
        },
        footerStyle: function () {
            return {}
        },
        onAll: function () {
            return !1
        },
        onClickCell: function () {
            return !1
        },
        onDblClickCell: function () {
            return !1
        },
        onClickRow: function () {
            return !1
        },
        onDblClickRow: function () {
            return !1
        },
        onSort: function () {
            return !1
        },
        onCheck: function () {
            return !1
        },
        onUncheck: function () {
            return !1
        },
        onCheckAll: function () {
            return !1
        },
        onUncheckAll: function () {
            return !1
        },
        onCheckSome: function () {
            return !1
        },
        onUncheckSome: function () {
            return !1
        },
        onLoadSuccess: function () {
            return !1
        },
        onLoadError: function () {
            return !1
        },
        onColumnSwitch: function () {
            return !1
        },
        onPageChange: function () {
            return !1
        },
        onSearch: function () {
            return !1
        },
        onToggle: function () {
            return !1
        },
        onPreBody: function () {
            return !1
        },
        onPostBody: function () {
            return !1
        },
        onPostHeader: function () {
            return !1
        },
        onExpandRow: function () {
            return !1
        },
        onCollapseRow: function () {
            return !1
        },
        onRefreshOptions: function () {
            return !1
        },
        onRefresh: function () {
            return !1
        },
        onResetView: function () {
            return !1
        }
    }, p.LOCALES = {}, p.LOCALES["en-US"] = p.LOCALES.en = {
        formatLoadingMessage: function () {
            return "Loading, please wait..."
        }, formatRecordsPerPage: function (a) {
            return c("%s rows per page", a)
        }, formatShowingRows: function (a, b, d) {
            return c("Showing %s to %s of %s rows", a, b, d)
        }, formatDetailPagination: function (a) {
            return c("Showing %s rows", a)
        }, formatSearch: function () {
            return "Search"
        }, formatNoMatches: function () {
            return "No matching records found"
        }, formatPaginationSwitch: function () {
            return "Hide/Show pagination"
        }, formatRefresh: function () {
            return "Refresh"
        }, formatToggle: function () {
            return "Toggle"
        }, formatColumns: function () {
            return "Columns"
        }, formatAllRows: function () {
            return "All"
        }
    }, a.extend(p.DEFAULTS, p.LOCALES["en-US"]), p.COLUMN_DEFAULTS = {
        radio: !1,
        checkbox: !1,
        checkboxEnabled: !0,
        field: void 0,
        title: void 0,
        titleTooltip: void 0,
        "class": void 0,
        align: void 0,
        halign: void 0,
        falign: void 0,
        valign: void 0,
        width: void 0,
        sortable: !1,
        order: "asc",
        visible: !0,
        switchable: !0,
        clickToSelect: !0,
        formatter: void 0,
        footerFormatter: void 0,
        events: void 0,
        sorter: void 0,
        sortName: void 0,
        cellStyle: void 0,
        searchable: !0,
        searchFormatter: !0,
        cardVisible: !0
    }, p.EVENTS = {
        "all.bs.table": "onAll",
        "click-cell.bs.table": "onClickCell",
        "dbl-click-cell.bs.table": "onDblClickCell",
        "click-row.bs.table": "onClickRow",
        "dbl-click-row.bs.table": "onDblClickRow",
        "sort.bs.table": "onSort",
        "check.bs.table": "onCheck",
        "uncheck.bs.table": "onUncheck",
        "check-all.bs.table": "onCheckAll",
        "uncheck-all.bs.table": "onUncheckAll",
        "check-some.bs.table": "onCheckSome",
        "uncheck-some.bs.table": "onUncheckSome",
        "load-success.bs.table": "onLoadSuccess",
        "load-error.bs.table": "onLoadError",
        "column-switch.bs.table": "onColumnSwitch",
        "page-change.bs.table": "onPageChange",
        "search.bs.table": "onSearch",
        "toggle.bs.table": "onToggle",
        "pre-body.bs.table": "onPreBody",
        "post-body.bs.table": "onPostBody",
        "post-header.bs.table": "onPostHeader",
        "expand-row.bs.table": "onExpandRow",
        "collapse-row.bs.table": "onCollapseRow",
        "refresh-options.bs.table": "onRefreshOptions",
        "reset-view.bs.table": "onResetView",
        "refresh.bs.table": "onRefresh"
    }, p.prototype.init = function () {
        this.initLocale(), this.initContainer(), this.initTable(), this.initHeader(), this.initData(), this.initFooter(), this.initToolbar(), this.initPagination(), this.initBody(), this.initSearchText(), this.initServer()
    }, p.prototype.initLocale = function () {
        if (this.options.locale) {
            var b = this.options.locale.split(/-|_/);
            b[0].toLowerCase(), b[1] && b[1].toUpperCase(), a.fn.bootstrapTable.locales[this.options.locale] ? a.extend(this.options, a.fn.bootstrapTable.locales[this.options.locale]) : a.fn.bootstrapTable.locales[b.join("-")] ? a.extend(this.options, a.fn.bootstrapTable.locales[b.join("-")]) : a.fn.bootstrapTable.locales[b[0]] && a.extend(this.options, a.fn.bootstrapTable.locales[b[0]])
        }
    }, p.prototype.initContainer = function () {
        this.$container = a(['<div class="bootstrap-table">', '<div class="fixed-table-toolbar"></div>', "top" === this.options.paginationVAlign || "both" === this.options.paginationVAlign ? '<div class="fixed-table-pagination" style="clear: both;"></div>' : "", '<div class="fixed-table-container">', '<div class="fixed-table-header"><table></table></div>', '<div class="fixed-table-body">', '<div class="fixed-table-loading">', this.options.formatLoadingMessage(), "</div>", "</div>", '<div class="fixed-table-footer"><table><tr></tr></table></div>', "bottom" === this.options.paginationVAlign || "both" === this.options.paginationVAlign ? '<div class="fixed-table-pagination"></div>' : "", "</div>", "</div>"].join("")), this.$container.insertAfter(this.$el), this.$tableContainer = this.$container.find(".fixed-table-container"), this.$tableHeader = this.$container.find(".fixed-table-header"), this.$tableBody = this.$container.find(".fixed-table-body"), this.$tableLoading = this.$container.find(".fixed-table-loading"), this.$tableFooter = this.$container.find(".fixed-table-footer"), this.$toolbar = this.$container.find(".fixed-table-toolbar"), this.$pagination = this.$container.find(".fixed-table-pagination"), this.$tableBody.append(this.$el), this.$container.after('<div class="clearfix"></div>'), this.$el.addClass(this.options.classes), this.options.striped && this.$el.addClass("table-striped"), -1 !== a.inArray("table-no-bordered", this.options.classes.split(" ")) && this.$tableContainer.addClass("table-no-bordered")
    }, p.prototype.initTable = function () {
        var b = this, c = [], d = [];
        if (this.$header = this.$el.find(">thead"), this.$header.length || (this.$header = a("<thead></thead>").appendTo(this.$el)), this.$header.find("tr").each(function () {
            var b = [];
            a(this).find("th").each(function () {
                "undefined" != typeof a(this).data("field") && a(this).data("field", a(this).data("field") + ""), b.push(a.extend({}, {
                    title: a(this).html(),
                    "class": a(this).attr("class"),
                    titleTooltip: a(this).attr("title"),
                    rowspan: a(this).attr("rowspan") ? +a(this).attr("rowspan") : void 0,
                    colspan: a(this).attr("colspan") ? +a(this).attr("colspan") : void 0
                }, a(this).data()))
            }), c.push(b)
        }), a.isArray(this.options.columns[0]) || (this.options.columns = [this.options.columns]), this.options.columns = a.extend(!0, [], c, this.options.columns), this.columns = [], f(this.options.columns), a.each(this.options.columns, function (c, d) {
            a.each(d, function (d, e) {
                e = a.extend({}, p.COLUMN_DEFAULTS, e), "undefined" != typeof e.fieldIndex && (b.columns[e.fieldIndex] = e), b.options.columns[c][d] = e
            })
        }), !this.options.data.length) {
            var e = [];
            this.$el.find(">tbody>tr").each(function (c) {
                var f = {};
                f._id = a(this).attr("id"), f._class = a(this).attr("class"), f._data = l(a(this).data()), a(this).find(">td").each(function (d) {
                    for (var g, h, i = a(this), j = +i.attr("colspan") || 1, k = +i.attr("rowspan") || 1; e[c] && e[c][d]; d++) ;
                    for (g = d; d + j > g; g++) for (h = c; c + k > h; h++) e[h] || (e[h] = []), e[h][g] = !0;
                    var m = b.columns[d].field;
                    f[m] = a(this).html(), f["_" + m + "_id"] = a(this).attr("id"), f["_" + m + "_class"] = a(this).attr("class"), f["_" + m + "_rowspan"] = a(this).attr("rowspan"), f["_" + m + "_colspan"] = a(this).attr("colspan"), f["_" + m + "_title"] = a(this).attr("title"), f["_" + m + "_data"] = l(a(this).data())
                }), d.push(f)
            }), this.options.data = d, d.length && (this.fromHtml = !0)
        }
    }, p.prototype.initHeader = function () {
        var b = this, d = {}, e = [];
        this.header = {
            fields: [],
            styles: [],
            classes: [],
            formatters: [],
            events: [],
            sorters: [],
            sortNames: [],
            cellStyles: [],
            searchables: []
        }, a.each(this.options.columns, function (f, g) {
            e.push("<tr>"), 0 === f && !b.options.cardView && b.options.detailView && e.push(c('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>', b.options.columns.length)), a.each(g, function (a, f) {
                var g = "", h = "", i = "", j = "", k = c(' class="%s"', f["class"]),
                    l = (b.options.sortOrder || f.order, "px"), m = f.width;
                if (void 0 === f.width || b.options.cardView || "string" == typeof f.width && -1 !== f.width.indexOf("%") && (l = "%"), f.width && "string" == typeof f.width && (m = f.width.replace("%", "").replace("px", "")), h = c("text-align: %s; ", f.halign ? f.halign : f.align), i = c("text-align: %s; ", f.align), j = c("vertical-align: %s; ", f.valign), j += c("width: %s; ", !f.checkbox && !f.radio || m ? m ? m + l : void 0 : "36px"), "undefined" != typeof f.fieldIndex) {
                    if (b.header.fields[f.fieldIndex] = f.field, b.header.styles[f.fieldIndex] = i + j, b.header.classes[f.fieldIndex] = k, b.header.formatters[f.fieldIndex] = f.formatter, b.header.events[f.fieldIndex] = f.events, b.header.sorters[f.fieldIndex] = f.sorter, b.header.sortNames[f.fieldIndex] = f.sortName, b.header.cellStyles[f.fieldIndex] = f.cellStyle, b.header.searchables[f.fieldIndex] = f.searchable, !f.visible) return;
                    if (b.options.cardView && !f.cardVisible) return;
                    d[f.field] = f
                }
                e.push("<th" + c(' title="%s"', f.titleTooltip), f.checkbox || f.radio ? c(' class="bs-checkbox %s"', f["class"] || "") : k, c(' style="%s"', h + j), c(' rowspan="%s"', f.rowspan), c(' colspan="%s"', f.colspan), c(' data-field="%s"', f.field), "tabindex='0'", ">"), e.push(c('<div class="th-inner %s">', b.options.sortable && f.sortable ? "sortable both" : "")), g = f.title, f.checkbox && (!b.options.singleSelect && b.options.checkboxHeader && (g = '<input name="btSelectAll" type="checkbox" />'), b.header.stateField = f.field), f.radio && (g = "", b.header.stateField = f.field, b.options.singleSelect = !0), e.push(g), e.push("</div>"), e.push('<div class="fht-cell"></div>'), e.push("</div>"), e.push("</th>")
            }), e.push("</tr>")
        }), this.$header.html(e.join("")), this.$header.find("th[data-field]").each(function () {
            a(this).data(d[a(this).data("field")])
        }), this.$container.off("click", ".th-inner").on("click", ".th-inner", function (c) {
            var d = a(this);
            return b.options.detailView && d.closest(".bootstrap-table")[0] !== b.$container[0] ? !1 : void (b.options.sortable && d.parent().data().sortable && b.onSort(c))
        }), this.$header.children().children().off("keypress").on("keypress", function (c) {
            if (b.options.sortable && a(this).data().sortable) {
                var d = c.keyCode || c.which;
                13 == d && b.onSort(c)
            }
        }), a(window).off("resize.bootstrap-table"), !this.options.showHeader || this.options.cardView ? (this.$header.hide(), this.$tableHeader.hide(), this.$tableLoading.css("top", 0)) : (this.$header.show(), this.$tableHeader.show(), this.$tableLoading.css("top", this.$header.outerHeight() + 1), this.getCaret(), a(window).on("resize.bootstrap-table", a.proxy(this.resetWidth, this))), this.$selectAll = this.$header.find('[name="btSelectAll"]'), this.$selectAll.off("click").on("click", function () {
            var c = a(this).prop("checked");
            b[c ? "checkAll" : "uncheckAll"](), b.updateSelected()
        })
    }, p.prototype.initFooter = function () {
        !this.options.showFooter || this.options.cardView ? this.$tableFooter.hide() : this.$tableFooter.show()
    }, p.prototype.initData = function (a, b) {
        this.data = "append" === b ? this.data.concat(a) : "prepend" === b ? [].concat(a).concat(this.data) : a || this.options.data, this.options.data = "append" === b ? this.options.data.concat(a) : "prepend" === b ? [].concat(a).concat(this.options.data) : this.data, "server" !== this.options.sidePagination && this.initSort()
    }, p.prototype.initSort = function () {
        var b = this, c = this.options.sortName, d = "desc" === this.options.sortOrder ? -1 : 1,
            e = a.inArray(this.options.sortName, this.header.fields);
        return this.options.customSort !== a.noop ? void this.options.customSort.apply(this, [this.options.sortName, this.options.sortOrder]) : void (-1 !== e && (this.options.sortStable && a.each(this.data, function (a, b) {
            b.hasOwnProperty("_position") || (b._position = a)
        }), this.data.sort(function (f, g) {
            b.header.sortNames[e] && (c = b.header.sortNames[e]);
            var i = m(f, c, b.options.escape), j = m(g, c, b.options.escape),
                k = h(b.header, b.header.sorters[e], [i, j]);
            return void 0 !== k ? d * k : ((void 0 === i || null === i) && (i = ""), (void 0 === j || null === j) && (j = ""), b.options.sortStable && i === j && (i = f._position, j = g._position), a.isNumeric(i) && a.isNumeric(j) ? (i = parseFloat(i), j = parseFloat(j), j > i ? -1 * d : d) : i === j ? 0 : ("string" != typeof i && (i = i.toString()), -1 === i.localeCompare(j) ? -1 * d : d))
        })))
    }, p.prototype.onSort = function (b) {
        var c = "keypress" === b.type ? a(b.currentTarget) : a(b.currentTarget).parent(),
            d = this.$header.find("th").eq(c.index());
        return this.$header.add(this.$header_).find("span.order").remove(), this.options.sortName === c.data("field") ? this.options.sortOrder = "asc" === this.options.sortOrder ? "desc" : "asc" : (this.options.sortName = c.data("field"), this.options.sortOrder = "asc" === c.data("order") ? "desc" : "asc"), this.trigger("sort", this.options.sortName, this.options.sortOrder), c.add(d).data("order", this.options.sortOrder), this.getCaret(), "server" === this.options.sidePagination ? void this.initServer(this.options.silentSort) : (this.initSort(), void this.initBody())
    }, p.prototype.initToolbar = function () {
        var b, d, e = this, f = [], g = 0, i = 0;
        this.$toolbar.find(".bs-bars").children().length && a("body").append(a(this.options.toolbar)), this.$toolbar.html(""), ("string" == typeof this.options.toolbar || "object" == typeof this.options.toolbar) && a(c('<div class="bs-bars pull-%s"></div>', this.options.toolbarAlign)).appendTo(this.$toolbar).append(a(this.options.toolbar)), f = [c('<div class="columns columns-%s btn-group pull-%s">', this.options.buttonsAlign, this.options.buttonsAlign)], "string" == typeof this.options.icons && (this.options.icons = h(null, this.options.icons)), this.options.showPaginationSwitch && f.push(c('<button class="btn' + c(" btn-%s", this.options.buttonsClass) + c(" btn-%s", this.options.iconSize) + '" type="button" name="paginationSwitch" title="%s">', this.options.formatPaginationSwitch()), c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown), "</button>"), this.options.showRefresh && f.push(c('<button class="btn' + c(" btn-%s", this.options.buttonsClass) + c(" btn-%s", this.options.iconSize) + '" type="button" name="refresh" title="%s">', this.options.formatRefresh()), c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh), "</button>"), this.options.showToggle && f.push(c('<button class="btn' + c(" btn-%s", this.options.buttonsClass) + c(" btn-%s", this.options.iconSize) + '" type="button" name="toggle" title="%s">', this.options.formatToggle()), c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle), "</button>"), this.options.showColumns && (f.push(c('<div class="keep-open btn-group" title="%s">', this.options.formatColumns()), '<button type="button" class="btn' + c(" btn-%s", this.options.buttonsClass) + c(" btn-%s", this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns), ' <span class="caret"></span>', "</button>", '<ul class="dropdown-menu" role="menu">'), a.each(this.columns, function (a, b) {
            if (!(b.radio || b.checkbox || e.options.cardView && !b.cardVisible)) {
                var d = b.visible ? ' checked="checked"' : "";
                b.switchable && (f.push(c('<li><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>', b.field, a, d, b.title)), i++)
            }
        }), f.push("</ul>", "</div>")), f.push("</div>"), (this.showToolbar || f.length > 2) && this.$toolbar.append(f.join("")), this.options.showPaginationSwitch && this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click", a.proxy(this.togglePagination, this)), this.options.showRefresh && this.$toolbar.find('button[name="refresh"]').off("click").on("click", a.proxy(this.refresh, this)), this.options.showToggle && this.$toolbar.find('button[name="toggle"]').off("click").on("click", function () {
            e.toggleView()
        }), this.options.showColumns && (b = this.$toolbar.find(".keep-open"), i <= this.options.minimumCountColumns && b.find("input").prop("disabled", !0), b.find("li").off("click").on("click", function (a) {
            a.stopImmediatePropagation()
        }), b.find("input").off("click").on("click", function () {
            var b = a(this);
            e.toggleColumn(a(this).val(), b.prop("checked"), !1), e.trigger("column-switch", a(this).data("field"), b.prop("checked"))
        })), this.options.search && (f = [], f.push('<div class="pull-' + this.options.searchAlign + ' search">', c('<input class="form-control' + c(" input-%s", this.options.iconSize) + '" type="text" placeholder="%s">', this.options.formatSearch()), "</div>"), this.$toolbar.append(f.join("")), d = this.$toolbar.find(".search input"), d.off("keyup drop").on("keyup drop", function (b) {
            e.options.searchOnEnterKey && 13 !== b.keyCode || a.inArray(b.keyCode, [37, 38, 39, 40]) > -1 || (clearTimeout(g), g = setTimeout(function () {
                e.onSearch(b)
            }, e.options.searchTimeOut))
        }), n() && d.off("mouseup").on("mouseup", function (a) {
            clearTimeout(g), g = setTimeout(function () {
                e.onSearch(a)
            }, e.options.searchTimeOut)
        }))
    }, p.prototype.onSearch = function (b) {
        var c = a.trim(a(b.currentTarget).val());
        this.options.trimOnSearch && a(b.currentTarget).val() !== c && a(b.currentTarget).val(c), c !== this.searchText && (this.searchText = c, this.options.searchText = c, this.options.pageNumber = 1, this.initSearch(), this.updatePagination(), this.trigger("search", c))
    }, p.prototype.initSearch = function () {
        var b = this;
        if ("server" !== this.options.sidePagination) {
            if (this.options.customSearch !== a.noop) return void this.options.customSearch.apply(this, [this.searchText]);
            var c = this.searchText && (this.options.escape ? j(this.searchText) : this.searchText).toLowerCase(),
                d = a.isEmptyObject(this.filterColumns) ? null : this.filterColumns;
            this.data = d ? a.grep(this.options.data, function (b) {
                for (var c in d) if (a.isArray(d[c]) && -1 === a.inArray(b[c], d[c]) || b[c] !== d[c]) return !1;
                return !0
            }) : this.options.data, this.data = c ? a.grep(this.data, function (d, f) {
                for (var g = 0; g < b.header.fields.length; g++) if (b.header.searchables[g]) {
                    var i, j = a.isNumeric(b.header.fields[g]) ? parseInt(b.header.fields[g], 10) : b.header.fields[g],
                        k = b.columns[e(b.columns, j)];
                    if ("string" == typeof j) {
                        i = d;
                        for (var l = j.split("."), m = 0; m < l.length; m++) i = i[l[m]];
                        k && k.searchFormatter && (i = h(k, b.header.formatters[g], [i, d, f], i))
                    } else i = d[j];
                    if ("string" == typeof i || "number" == typeof i) if (b.options.strictSearch) {
                        if ((i + "").toLowerCase() === c) return !0
                    } else if (-1 !== (i + "").toLowerCase().indexOf(c)) return !0
                }
                return !1
            }) : this.data
        }
    }, p.prototype.initPagination = function () {
        if (!this.options.pagination) return void this.$pagination.hide();
        this.$pagination.show();
        var b, d, e, f, g, h, i, j, k, l = this, m = [], n = !1, o = this.getData(), p = this.options.pageList;
        if ("server" !== this.options.sidePagination && (this.options.totalRows = o.length), this.totalPages = 0, this.options.totalRows) {
            if (this.options.pageSize === this.options.formatAllRows()) this.options.pageSize = this.options.totalRows, n = !0; else if (this.options.pageSize === this.options.totalRows) {
                var q = "string" == typeof this.options.pageList ? this.options.pageList.replace("[", "").replace("]", "").replace(/ /g, "").toLowerCase().split(",") : this.options.pageList;
                a.inArray(this.options.formatAllRows().toLowerCase(), q) > -1 && (n = !0)
            }
            this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1, this.options.totalPages = this.totalPages
        }
        if (this.totalPages > 0 && this.options.pageNumber > this.totalPages && (this.options.pageNumber = this.totalPages), this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1, this.pageTo = this.options.pageNumber * this.options.pageSize, this.pageTo > this.options.totalRows && (this.pageTo = this.options.totalRows), m.push('<div class="pull-' + this.options.paginationDetailHAlign + ' pagination-detail">', '<span class="pagination-info">', this.options.onlyInfoPagination ? this.options.formatDetailPagination(this.options.totalRows) : this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows), "</span>"), !this.options.onlyInfoPagination) {
            m.push('<span class="page-list">');
            var r = [c('<span class="btn-group %s">', "top" === this.options.paginationVAlign || "both" === this.options.paginationVAlign ? "dropdown" : "dropup"), '<button type="button" class="btn' + c(" btn-%s", this.options.buttonsClass) + c(" btn-%s", this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', '<span class="page-size">', n ? this.options.formatAllRows() : this.options.pageSize, "</span>", ' <span class="caret"></span>', "</button>", '<ul class="dropdown-menu" role="menu">'];
            if ("string" == typeof this.options.pageList) {
                var s = this.options.pageList.replace("[", "").replace("]", "").replace(/ /g, "").split(",");
                p = [], a.each(s, function (a, b) {
                    p.push(b.toUpperCase() === l.options.formatAllRows().toUpperCase() ? l.options.formatAllRows() : +b)
                })
            }
            for (a.each(p, function (a, b) {
                if (!l.options.smartDisplay || 0 === a || p[a - 1] <= l.options.totalRows) {
                    var d;
                    d = n ? b === l.options.formatAllRows() ? ' class="active"' : "" : b === l.options.pageSize ? ' class="active"' : "", r.push(c('<li%s><a href="javascript:void(0)">%s</a></li>', d, b))
                }
            }), r.push("</ul></span>"), m.push(this.options.formatRecordsPerPage(r.join(""))), m.push("</span>"), m.push("</div>", '<div class="pull-' + this.options.paginationHAlign + ' pagination">', '<ul class="pagination' + c(" pagination-%s", this.options.iconSize) + '">', '<li class="page-pre"><a href="javascript:void(0)">' + this.options.paginationPreText + "</a></li>"), this.totalPages < 5 ? (d = 1, e = this.totalPages) : (d = this.options.pageNumber - 2, e = d + 4, 1 > d && (d = 1, e = 5), e > this.totalPages && (e = this.totalPages, d = e - 4)), this.totalPages >= 6 && (this.options.pageNumber >= 3 && (m.push('<li class="page-first' + (1 === this.options.pageNumber ? " active" : "") + '">', '<a href="javascript:void(0)">', 1, "</a>", "</li>"), d++), this.options.pageNumber >= 4 && (4 == this.options.pageNumber || 6 == this.totalPages || 7 == this.totalPages ? d-- : m.push('<li class="page-first-separator disabled">', '<a href="javascript:void(0)">...</a>', "</li>"), e--)), this.totalPages >= 7 && this.options.pageNumber >= this.totalPages - 2 && d--, 6 == this.totalPages ? this.options.pageNumber >= this.totalPages - 2 && e++ : this.totalPages >= 7 && (7 == this.totalPages || this.options.pageNumber >= this.totalPages - 3) && e++, b = d; e >= b; b++) m.push('<li class="page-number' + (b === this.options.pageNumber ? " active" : "") + '">', '<a href="javascript:void(0)">', b, "</a>", "</li>");
            this.totalPages >= 8 && this.options.pageNumber <= this.totalPages - 4 && m.push('<li class="page-last-separator disabled">', '<a href="javascript:void(0)">...</a>', "</li>"), this.totalPages >= 6 && this.options.pageNumber <= this.totalPages - 3 && m.push('<li class="page-last' + (this.totalPages === this.options.pageNumber ? " active" : "") + '">', '<a href="javascript:void(0)">', this.totalPages, "</a>", "</li>"), m.push('<li class="page-next"><a href="javascript:void(0)">' + this.options.paginationNextText + "</a></li>", "</ul>", "</div>")
        }
        this.$pagination.html(m.join("")), this.options.onlyInfoPagination || (f = this.$pagination.find(".page-list a"), g = this.$pagination.find(".page-first"), h = this.$pagination.find(".page-pre"), i = this.$pagination.find(".page-next"), j = this.$pagination.find(".page-last"), k = this.$pagination.find(".page-number"), this.options.smartDisplay && (this.totalPages <= 1 && this.$pagination.find("div.pagination").hide(), (p.length < 2 || this.options.totalRows <= p[0]) && this.$pagination.find("span.page-list").hide(), this.$pagination[this.getData().length ? "show" : "hide"]()), n && (this.options.pageSize = this.options.formatAllRows()), f.off("click").on("click", a.proxy(this.onPageListChange, this)), g.off("click").on("click", a.proxy(this.onPageFirst, this)), h.off("click").on("click", a.proxy(this.onPagePre, this)), i.off("click").on("click", a.proxy(this.onPageNext, this)), j.off("click").on("click", a.proxy(this.onPageLast, this)), k.off("click").on("click", a.proxy(this.onPageNumber, this)))
    }, p.prototype.updatePagination = function (b) {
        b && a(b.currentTarget).hasClass("disabled") || (this.options.maintainSelected || this.resetRows(), this.initPagination(), "server" === this.options.sidePagination ? this.initServer() : this.initBody(), this.trigger("page-change", this.options.pageNumber, this.options.pageSize))
    }, p.prototype.onPageListChange = function (b) {
        var c = a(b.currentTarget);
        c.parent().addClass("active").siblings().removeClass("active"), this.options.pageSize = c.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +c.text(), this.$toolbar.find(".page-size").text(this.options.pageSize), this.updatePagination(b)
    }, p.prototype.onPageFirst = function (a) {
        this.options.pageNumber = 1, this.updatePagination(a)
    }, p.prototype.onPagePre = function (a) {
        this.options.pageNumber - 1 === 0 ? this.options.pageNumber = this.options.totalPages : this.options.pageNumber--, this.updatePagination(a)
    }, p.prototype.onPageNext = function (a) {
        this.options.pageNumber + 1 > this.options.totalPages ? this.options.pageNumber = 1 : this.options.pageNumber++, this.updatePagination(a)
    }, p.prototype.onPageLast = function (a) {
        this.options.pageNumber = this.totalPages, this.updatePagination(a)
    }, p.prototype.onPageNumber = function (b) {
        this.options.pageNumber !== +a(b.currentTarget).text() && (this.options.pageNumber = +a(b.currentTarget).text(), this.updatePagination(b))
    }, p.prototype.initBody = function (b) {
        var f = this, g = [], i = this.getData();
        this.trigger("pre-body", i), this.$body = this.$el.find(">tbody"), this.$body.length || (this.$body = a("<tbody></tbody>").appendTo(this.$el)), this.options.pagination && "server" !== this.options.sidePagination || (this.pageFrom = 1, this.pageTo = i.length);
        for (var k = this.pageFrom - 1; k < this.pageTo; k++) {
            var l, n = i[k], o = {}, p = [], q = "", r = {}, s = [];
            if (o = h(this.options, this.options.rowStyle, [n, k], o), o && o.css) for (l in o.css) p.push(l + ": " + o.css[l]);
            if (r = h(this.options, this.options.rowAttributes, [n, k], r)) for (l in r) s.push(c('%s="%s"', l, j(r[l])));
            n._data && !a.isEmptyObject(n._data) && a.each(n._data, function (a, b) {
                "index" !== a && (q += c(' data-%s="%s"', a, b))
            }), g.push("<tr", c(" %s", s.join(" ")), c(' id="%s"', a.isArray(n) ? void 0 : n._id), c(' class="%s"', o.classes || (a.isArray(n) ? void 0 : n._class)), c(' data-index="%s"', k), c(' data-uniqueid="%s"', n[this.options.uniqueId]), c("%s", q), ">"), this.options.cardView && g.push(c('<td colspan="%s"><div class="card-views">', this.header.fields.length)), !this.options.cardView && this.options.detailView && g.push("<td>", '<a class="detail-icon" href="javascript:">', c('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen), "</a>", "</td>"), a.each(this.header.fields, function (b, e) {
                var i = "", j = m(n, e, f.options.escape), l = "", q = {}, r = "", s = f.header.classes[b], t = "",
                    u = "", v = "", w = "", x = f.columns[b];
                if (!(f.fromHtml && "undefined" == typeof j || !x.visible || f.options.cardView && !x.cardVisible)) {
                    if (o = c('style="%s"', p.concat(f.header.styles[b]).join("; ")), n["_" + e + "_id"] && (r = c(' id="%s"', n["_" + e + "_id"])), n["_" + e + "_class"] && (s = c(' class="%s"', n["_" + e + "_class"])), n["_" + e + "_rowspan"] && (u = c(' rowspan="%s"', n["_" + e + "_rowspan"])), n["_" + e + "_colspan"] && (v = c(' colspan="%s"', n["_" + e + "_colspan"])), n["_" + e + "_title"] && (w = c(' title="%s"', n["_" + e + "_title"])), q = h(f.header, f.header.cellStyles[b], [j, n, k, e], q), q.classes && (s = c(' class="%s"', q.classes)), q.css) {
                        var y = [];
                        for (var z in q.css) y.push(z + ": " + q.css[z]);
                        o = c('style="%s"', y.concat(f.header.styles[b]).join("; "))
                    }
                    j = h(x, f.header.formatters[b], [j, n, k], j), n["_" + e + "_data"] && !a.isEmptyObject(n["_" + e + "_data"]) && a.each(n["_" + e + "_data"], function (a, b) {
                        "index" !== a && (t += c(' data-%s="%s"', a, b))
                    }), x.checkbox || x.radio ? (l = x.checkbox ? "checkbox" : l, l = x.radio ? "radio" : l, i = [c(f.options.cardView ? '<div class="card-view %s">' : '<td class="bs-checkbox %s">', x["class"] || ""), "<input" + c(' data-index="%s"', k) + c(' name="%s"', f.options.selectItemName) + c(' type="%s"', l) + c(' value="%s"', n[f.options.idField]) + c(' checked="%s"', j === !0 || j && j.checked ? "checked" : void 0) + c(' disabled="%s"', !x.checkboxEnabled || j && j.disabled ? "disabled" : void 0) + " />", f.header.formatters[b] && "string" == typeof j ? j : "", f.options.cardView ? "</div>" : "</td>"].join(""), n[f.header.stateField] = j === !0 || j && j.checked) : (j = "undefined" == typeof j || null === j ? f.options.undefinedText : j, i = f.options.cardView ? ['<div class="card-view">', f.options.showHeader ? c('<span class="title" %s>%s</span>', o, d(f.columns, "field", "title", e)) : "", c('<span class="value">%s</span>', j), "</div>"].join("") : [c("<td%s %s %s %s %s %s %s>", r, s, o, t, u, v, w), j, "</td>"].join(""), f.options.cardView && f.options.smartDisplay && "" === j && (i = '<div class="card-view"></div>')), g.push(i)
                }
            }), this.options.cardView && g.push("</div></td>"), g.push("</tr>")
        }
        g.length || g.push('<tr class="no-records-found">', c('<td colspan="%s">%s</td>', this.$header.find("th").length, this.options.formatNoMatches()), "</tr>"), this.$body.html(g.join("")), b || this.scrollTo(0), this.$body.find("> tr[data-index] > td").off("click dblclick").on("click dblclick", function (b) {
            var d = a(this), g = d.parent(), h = f.data[g.data("index")], i = d[0].cellIndex, j = f.getVisibleFields(),
                k = j[f.options.detailView && !f.options.cardView ? i - 1 : i], l = f.columns[e(f.columns, k)],
                n = m(h, k, f.options.escape);
            if (!d.find(".detail-icon").length && (f.trigger("click" === b.type ? "click-cell" : "dbl-click-cell", k, n, h, d), f.trigger("click" === b.type ? "click-row" : "dbl-click-row", h, g, k),
            "click" === b.type && f.options.clickToSelect && l.clickToSelect)) {
                var o = g.find(c('[name="%s"]', f.options.selectItemName));
                o.length && o[0].click()
            }
        }), this.$body.find("> tr[data-index] > td > .detail-icon").off("click").on("click", function () {
            var b = a(this), d = b.parent().parent(), e = d.data("index"), g = i[e];
            if (d.next().is("tr.detail-view")) b.find("i").attr("class", c("%s %s", f.options.iconsPrefix, f.options.icons.detailOpen)), d.next().remove(), f.trigger("collapse-row", e, g); else {
                b.find("i").attr("class", c("%s %s", f.options.iconsPrefix, f.options.icons.detailClose)), d.after(c('<tr class="detail-view"><td colspan="%s"></td></tr>', d.find("td").length));
                var j = d.next().find("td"), k = h(f.options, f.options.detailFormatter, [e, g, j], "");
                1 === j.length && j.append(k), f.trigger("expand-row", e, g, j)
            }
            f.resetView()
        }), this.$selectItem = this.$body.find(c('[name="%s"]', this.options.selectItemName)), this.$selectItem.off("click").on("click", function (b) {
            b.stopImmediatePropagation();
            var c = a(this), d = c.prop("checked"), e = f.data[c.data("index")];
            f.options.maintainSelected && a(this).is(":radio") && a.each(f.options.data, function (a, b) {
                b[f.header.stateField] = !1
            }), e[f.header.stateField] = d, f.options.singleSelect && (f.$selectItem.not(this).each(function () {
                f.data[a(this).data("index")][f.header.stateField] = !1
            }), f.$selectItem.filter(":checked").not(this).prop("checked", !1)), f.updateSelected(), f.trigger(d ? "check" : "uncheck", e, c)
        }), a.each(this.header.events, function (b, c) {
            if (c) {
                "string" == typeof c && (c = h(null, c));
                var d = f.header.fields[b], e = a.inArray(d, f.getVisibleFields());
                f.options.detailView && !f.options.cardView && (e += 1);
                for (var g in c) f.$body.find(">tr:not(.no-records-found)").each(function () {
                    var b = a(this), h = b.find(f.options.cardView ? ".card-view" : "td").eq(e), i = g.indexOf(" "),
                        j = g.substring(0, i), k = g.substring(i + 1), l = c[g];
                    h.find(k).off(j).on(j, function (a) {
                        var c = b.data("index"), e = f.data[c], g = e[d];
                        l.apply(this, [a, g, e, c])
                    })
                })
            }
        }), this.updateSelected(), this.resetView(), this.trigger("post-body", i)
    }, p.prototype.initServer = function (b, c, d) {
        var e, f = this, g = {},
            i = {searchText: this.searchText, sortName: this.options.sortName, sortOrder: this.options.sortOrder};
        this.options.pagination && (i.pageSize = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize, i.pageNumber = this.options.pageNumber), (d || this.options.url || this.options.ajax) && ("limit" === this.options.queryParamsType && (i = {
            search: i.searchText,
            sort: i.sortName,
            order: i.sortOrder
        }, this.options.pagination && (i.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1), i.limit = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize)), a.isEmptyObject(this.filterColumnsPartial) || (i.filter = JSON.stringify(this.filterColumnsPartial, null)), g = h(this.options, this.options.queryParams, [i], g), a.extend(g, c || {}), g !== !1 && (b || this.$tableLoading.show(), e = a.extend({}, h(null, this.options.ajaxOptions), {
            type: this.options.method,
            url: d || this.options.url,
            data: "application/json" === this.options.contentType && "post" === this.options.method ? JSON.stringify(g) : g,
            cache: this.options.cache,
            contentType: this.options.contentType,
            dataType: this.options.dataType,
            success: function (a) {
                a = h(f.options, f.options.responseHandler, [a], a), f.load(a), f.trigger("load-success", a), b || f.$tableLoading.hide()
            },
            error: function (a) {
                f.trigger("load-error", a.status, a), b || f.$tableLoading.hide()
            }
        }), this.options.ajax ? h(this, this.options.ajax, [e], null) : (this._xhr && 4 !== this._xhr.readyState && this._xhr.abort(), this._xhr = a.ajax(e))))
    }, p.prototype.initSearchText = function () {
        if (this.options.search && "" !== this.options.searchText) {
            var a = this.$toolbar.find(".search input");
            a.val(this.options.searchText), this.onSearch({currentTarget: a})
        }
    }, p.prototype.getCaret = function () {
        var b = this;
        a.each(this.$header.find("th"), function (c, d) {
            a(d).find(".sortable").removeClass("desc asc").addClass(a(d).data("field") === b.options.sortName ? b.options.sortOrder : "both")
        })
    }, p.prototype.updateSelected = function () {
        var b = this.$selectItem.filter(":enabled").length && this.$selectItem.filter(":enabled").length === this.$selectItem.filter(":enabled").filter(":checked").length;
        this.$selectAll.add(this.$selectAll_).prop("checked", b), this.$selectItem.each(function () {
            a(this).closest("tr")[a(this).prop("checked") ? "addClass" : "removeClass"]("selected")
        })
    }, p.prototype.updateRows = function () {
        var b = this;
        this.$selectItem.each(function () {
            b.data[a(this).data("index")][b.header.stateField] = a(this).prop("checked")
        })
    }, p.prototype.resetRows = function () {
        var b = this;
        a.each(this.data, function (a, c) {
            b.$selectAll.prop("checked", !1), b.$selectItem.prop("checked", !1), b.header.stateField && (c[b.header.stateField] = !1)
        })
    }, p.prototype.trigger = function (b) {
        var c = Array.prototype.slice.call(arguments, 1);
        b += ".bs.table", this.options[p.EVENTS[b]].apply(this.options, c), this.$el.trigger(a.Event(b), c), this.options.onAll(b, c), this.$el.trigger(a.Event("all.bs.table"), [b, c])
    }, p.prototype.resetHeader = function () {
        clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(a.proxy(this.fitHeader, this), this.$el.is(":hidden") ? 100 : 0)
    }, p.prototype.fitHeader = function () {
        var b, d, e, f, h = this;
        if (h.$el.is(":hidden")) return void (h.timeoutId_ = setTimeout(a.proxy(h.fitHeader, h), 100));
        if (b = this.$tableBody.get(0), d = b.scrollWidth > b.clientWidth && b.scrollHeight > b.clientHeight + this.$header.outerHeight() ? g() : 0, this.$el.css("margin-top", -this.$header.outerHeight()), e = a(":focus"), e.length > 0) {
            var i = e.parents("th");
            if (i.length > 0) {
                var j = i.attr("data-field");
                if (void 0 !== j) {
                    var k = this.$header.find("[data-field='" + j + "']");
                    k.length > 0 && k.find(":input").addClass("focus-temp")
                }
            }
        }
        this.$header_ = this.$header.clone(!0, !0), this.$selectAll_ = this.$header_.find('[name="btSelectAll"]'), this.$tableHeader.css({"margin-right": d}).find("table").css("width", this.$el.outerWidth()).html("").attr("class", this.$el.attr("class")).append(this.$header_), f = a(".focus-temp:visible:eq(0)"), f.length > 0 && (f.focus(), this.$header.find(".focus-temp").removeClass("focus-temp")), this.$header.find("th[data-field]").each(function () {
            h.$header_.find(c('th[data-field="%s"]', a(this).data("field"))).data(a(this).data())
        });
        var l = this.getVisibleFields(), m = this.$header_.find("th");
        this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function (b) {
            var d = a(this), e = b;
            h.options.detailView && !h.options.cardView && (0 === b && h.$header_.find("th.detail").find(".fht-cell").width(d.innerWidth()), e = b - 1);
            var f = h.$header_.find(c('th[data-field="%s"]', l[e]));
            f.length > 1 && (f = a(m[d[0].cellIndex])), f.find(".fht-cell").width(d.innerWidth())
        }), this.$tableBody.off("scroll").on("scroll", function () {
            h.$tableHeader.scrollLeft(a(this).scrollLeft()), h.options.showFooter && !h.options.cardView && h.$tableFooter.scrollLeft(a(this).scrollLeft())
        }), h.trigger("post-header")
    }, p.prototype.resetFooter = function () {
        var b = this, d = b.getData(), e = [];
        this.options.showFooter && !this.options.cardView && (!this.options.cardView && this.options.detailView && e.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>'), a.each(this.columns, function (a, f) {
            var g, i = "", j = "", k = [], l = {}, m = c(' class="%s"', f["class"]);
            if (f.visible && (!b.options.cardView || f.cardVisible)) {
                if (i = c("text-align: %s; ", f.falign ? f.falign : f.align), j = c("vertical-align: %s; ", f.valign), l = h(null, b.options.footerStyle), l && l.css) for (g in l.css) k.push(g + ": " + l.css[g]);
                e.push("<td", m, c(' style="%s"', i + j + k.concat().join("; ")), ">"), e.push('<div class="th-inner">'), e.push(h(f, f.footerFormatter, [d], "&nbsp;") || "&nbsp;"), e.push("</div>"), e.push('<div class="fht-cell"></div>'), e.push("</div>"), e.push("</td>")
            }
        }), this.$tableFooter.find("tr").html(e.join("")), this.$tableFooter.show(), clearTimeout(this.timeoutFooter_), this.timeoutFooter_ = setTimeout(a.proxy(this.fitFooter, this), this.$el.is(":hidden") ? 100 : 0))
    }, p.prototype.fitFooter = function () {
        var b, c, d;
        return clearTimeout(this.timeoutFooter_), this.$el.is(":hidden") ? void (this.timeoutFooter_ = setTimeout(a.proxy(this.fitFooter, this), 100)) : (c = this.$el.css("width"), d = c > this.$tableBody.width() ? g() : 0, this.$tableFooter.css({"margin-right": d}).find("table").css("width", c).attr("class", this.$el.attr("class")), b = this.$tableFooter.find("td"), void this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function (c) {
            var d = a(this);
            b.eq(c).find(".fht-cell").width(d.innerWidth())
        }))
    }, p.prototype.toggleColumn = function (a, b, d) {
        if (-1 !== a && (this.columns[a].visible = b, this.initHeader(), this.initSearch(), this.initPagination(), this.initBody(), this.options.showColumns)) {
            var e = this.$toolbar.find(".keep-open input").prop("disabled", !1);
            d && e.filter(c('[value="%s"]', a)).prop("checked", b), e.filter(":checked").length <= this.options.minimumCountColumns && e.filter(":checked").prop("disabled", !0)
        }
    }, p.prototype.toggleRow = function (a, b, d) {
        -1 !== a && this.$body.find("undefined" != typeof a ? c('tr[data-index="%s"]', a) : c('tr[data-uniqueid="%s"]', b))[d ? "show" : "hide"]()
    }, p.prototype.getVisibleFields = function () {
        var b = this, c = [];
        return a.each(this.header.fields, function (a, d) {
            var f = b.columns[e(b.columns, d)];
            f.visible && c.push(d)
        }), c
    }, p.prototype.resetView = function (a) {
        var b = 0;
        if (a && a.height && (this.options.height = a.height), this.$selectAll.prop("checked", this.$selectItem.length > 0 && this.$selectItem.length === this.$selectItem.filter(":checked").length), this.options.height) {
            var c = k(this.$toolbar), d = k(this.$pagination), e = this.options.height - c - d;
            this.$tableContainer.css("height", e + "px")
        }
        return this.options.cardView ? (this.$el.css("margin-top", "0"), this.$tableContainer.css("padding-bottom", "0"), void this.$tableFooter.hide()) : (this.options.showHeader && this.options.height ? (this.$tableHeader.show(), this.resetHeader(), b += this.$header.outerHeight()) : (this.$tableHeader.hide(), this.trigger("post-header")), this.options.showFooter && (this.resetFooter(), this.options.height && (b += this.$tableFooter.outerHeight() + 1)), this.getCaret(), this.$tableContainer.css("padding-bottom", b + "px"), void this.trigger("reset-view"))
    }, p.prototype.getData = function (b) {
        return !this.searchText && a.isEmptyObject(this.filterColumns) && a.isEmptyObject(this.filterColumnsPartial) ? b ? this.options.data.slice(this.pageFrom - 1, this.pageTo) : this.options.data : b ? this.data.slice(this.pageFrom - 1, this.pageTo) : this.data
    }, p.prototype.load = function (b) {
        var c = !1;
        "server" === this.options.sidePagination ? (this.options.totalRows = b.total, c = b.fixedScroll, b = b[this.options.dataField]) : a.isArray(b) || (c = b.fixedScroll, b = b.data), this.initData(b), this.initSearch(), this.initPagination(), this.initBody(c)
    }, p.prototype.append = function (a) {
        this.initData(a, "append"), this.initSearch(), this.initPagination(), this.initSort(), this.initBody(!0)
    }, p.prototype.prepend = function (a) {
        this.initData(a, "prepend"), this.initSearch(), this.initPagination(), this.initSort(), this.initBody(!0)
    }, p.prototype.remove = function (b) {
        var c, d, e = this.options.data.length;
        if (b.hasOwnProperty("field") && b.hasOwnProperty("values")) {
            for (c = e - 1; c >= 0; c--) d = this.options.data[c], d.hasOwnProperty(b.field) && -1 !== a.inArray(d[b.field], b.values) && this.options.data.splice(c, 1);
            e !== this.options.data.length && (this.initSearch(), this.initPagination(), this.initSort(), this.initBody(!0))
        }
    }, p.prototype.removeAll = function () {
        this.options.data.length > 0 && (this.options.data.splice(0, this.options.data.length), this.initSearch(), this.initPagination(), this.initBody(!0))
    }, p.prototype.getRowByUniqueId = function (a) {
        var b, c, d, e = this.options.uniqueId, f = this.options.data.length, g = null;
        for (b = f - 1; b >= 0; b--) {
            if (c = this.options.data[b], c.hasOwnProperty(e)) d = c[e]; else {
                if (!c._data.hasOwnProperty(e)) continue;
                d = c._data[e]
            }
            if ("string" == typeof d ? a = a.toString() : "number" == typeof d && (Number(d) === d && d % 1 === 0 ? a = parseInt(a) : d === Number(d) && 0 !== d && (a = parseFloat(a))), d === a) {
                g = c;
                break
            }
        }
        return g
    }, p.prototype.removeByUniqueId = function (a) {
        var b = this.options.data.length, c = this.getRowByUniqueId(a);
        c && this.options.data.splice(this.options.data.indexOf(c), 1), b !== this.options.data.length && (this.initSearch(), this.initPagination(), this.initBody(!0))
    }, p.prototype.updateByUniqueId = function (b) {
        var c = this, d = a.isArray(b) ? b : [b];
        a.each(d, function (b, d) {
            var e;
            d.hasOwnProperty("id") && d.hasOwnProperty("row") && (e = a.inArray(c.getRowByUniqueId(d.id), c.options.data), -1 !== e && a.extend(c.options.data[e], d.row))
        }), this.initSearch(), this.initSort(), this.initBody(!0)
    }, p.prototype.insertRow = function (a) {
        a.hasOwnProperty("index") && a.hasOwnProperty("row") && (this.data.splice(a.index, 0, a.row), this.initSearch(), this.initPagination(), this.initSort(), this.initBody(!0))
    }, p.prototype.updateRow = function (b) {
        var c = this, d = a.isArray(b) ? b : [b];
        a.each(d, function (b, d) {
            d.hasOwnProperty("index") && d.hasOwnProperty("row") && a.extend(c.options.data[d.index], d.row)
        }), this.initSearch(), this.initSort(), this.initBody(!0)
    }, p.prototype.showRow = function (a) {
        (a.hasOwnProperty("index") || a.hasOwnProperty("uniqueId")) && this.toggleRow(a.index, a.uniqueId, !0)
    }, p.prototype.hideRow = function (a) {
        (a.hasOwnProperty("index") || a.hasOwnProperty("uniqueId")) && this.toggleRow(a.index, a.uniqueId, !1)
    }, p.prototype.getRowsHidden = function (b) {
        var c = a(this.$body[0]).children().filter(":hidden"), d = 0;
        if (b) for (; d < c.length; d++) a(c[d]).show();
        return c
    }, p.prototype.mergeCells = function (b) {
        var c, d, e, f = b.index, g = a.inArray(b.field, this.getVisibleFields()), h = b.rowspan || 1,
            i = b.colspan || 1, j = this.$body.find(">tr");
        if (this.options.detailView && !this.options.cardView && (g += 1), e = j.eq(f).find(">td").eq(g), !(0 > f || 0 > g || f >= this.data.length)) {
            for (c = f; f + h > c; c++) for (d = g; g + i > d; d++) j.eq(c).find(">td").eq(d).hide();
            e.attr("rowspan", h).attr("colspan", i).show()
        }
    }, p.prototype.updateCell = function (a) {
        a.hasOwnProperty("index") && a.hasOwnProperty("field") && a.hasOwnProperty("value") && (this.data[a.index][a.field] = a.value, a.reinit !== !1 && (this.initSort(), this.initBody(!0)))
    }, p.prototype.getOptions = function () {
        return this.options
    }, p.prototype.getSelections = function () {
        var b = this;
        return a.grep(this.options.data, function (a) {
            return a[b.header.stateField]
        })
    }, p.prototype.getAllSelections = function () {
        var b = this;
        return a.grep(this.options.data, function (a) {
            return a[b.header.stateField]
        })
    }, p.prototype.checkAll = function () {
        this.checkAll_(!0)
    }, p.prototype.uncheckAll = function () {
        this.checkAll_(!1)
    }, p.prototype.checkInvert = function () {
        var b = this, c = b.$selectItem.filter(":enabled"), d = c.filter(":checked");
        c.each(function () {
            a(this).prop("checked", !a(this).prop("checked"))
        }), b.updateRows(), b.updateSelected(), b.trigger("uncheck-some", d), d = b.getSelections(), b.trigger("check-some", d)
    }, p.prototype.checkAll_ = function (a) {
        var b;
        a || (b = this.getSelections()), this.$selectAll.add(this.$selectAll_).prop("checked", a), this.$selectItem.filter(":enabled").prop("checked", a), this.updateRows(), a && (b = this.getSelections()), this.trigger(a ? "check-all" : "uncheck-all", b)
    }, p.prototype.check = function (a) {
        this.check_(!0, a)
    }, p.prototype.uncheck = function (a) {
        this.check_(!1, a)
    }, p.prototype.check_ = function (a, b) {
        var d = this.$selectItem.filter(c('[data-index="%s"]', b)).prop("checked", a);
        this.data[b][this.header.stateField] = a, this.updateSelected(), this.trigger(a ? "check" : "uncheck", this.data[b], d)
    }, p.prototype.checkBy = function (a) {
        this.checkBy_(!0, a)
    }, p.prototype.uncheckBy = function (a) {
        this.checkBy_(!1, a)
    }, p.prototype.checkBy_ = function (b, d) {
        if (d.hasOwnProperty("field") && d.hasOwnProperty("values")) {
            var e = this, f = [];
            a.each(this.options.data, function (g, h) {
                if (!h.hasOwnProperty(d.field)) return !1;
                if (-1 !== a.inArray(h[d.field], d.values)) {
                    var i = e.$selectItem.filter(":enabled").filter(c('[data-index="%s"]', g)).prop("checked", b);
                    h[e.header.stateField] = b, f.push(h), e.trigger(b ? "check" : "uncheck", h, i)
                }
            }), this.updateSelected(), this.trigger(b ? "check-some" : "uncheck-some", f)
        }
    }, p.prototype.destroy = function () {
        this.$el.insertBefore(this.$container), a(this.options.toolbar).insertBefore(this.$el), this.$container.next().remove(), this.$container.remove(), this.$el.html(this.$el_.html()).css("margin-top", "0").attr("class", this.$el_.attr("class") || "")
    }, p.prototype.showLoading = function () {
        this.$tableLoading.show()
    }, p.prototype.hideLoading = function () {
        this.$tableLoading.hide()
    }, p.prototype.togglePagination = function () {
        this.options.pagination = !this.options.pagination;
        var a = this.$toolbar.find('button[name="paginationSwitch"] i');
        this.options.pagination ? a.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown) : a.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp), this.updatePagination()
    }, p.prototype.refresh = function (a) {
        a && a.url && (this.options.pageNumber = 1), this.initServer(a && a.silent, a && a.query, a && a.url), this.trigger("refresh", a)
    }, p.prototype.resetWidth = function () {
        this.options.showHeader && this.options.height && this.fitHeader(), this.options.showFooter && this.fitFooter()
    }, p.prototype.showColumn = function (a) {
        this.toggleColumn(e(this.columns, a), !0, !0)
    }, p.prototype.hideColumn = function (a) {
        this.toggleColumn(e(this.columns, a), !1, !0)
    }, p.prototype.getHiddenColumns = function () {
        return a.grep(this.columns, function (a) {
            return !a.visible
        })
    }, p.prototype.getVisibleColumns = function () {
        return a.grep(this.columns, function (a) {
            return a.visible
        })
    }, p.prototype.toggleAllColumns = function (b) {
        if (a.each(this.columns, function (a) {
            this.columns[a].visible = b
        }), this.initHeader(), this.initSearch(), this.initPagination(), this.initBody(), this.options.showColumns) {
            var c = this.$toolbar.find(".keep-open input").prop("disabled", !1);
            c.filter(":checked").length <= this.options.minimumCountColumns && c.filter(":checked").prop("disabled", !0)
        }
    }, p.prototype.showAllColumns = function () {
        this.toggleAllColumns(!0)
    }, p.prototype.hideAllColumns = function () {
        this.toggleAllColumns(!1)
    }, p.prototype.filterBy = function (b) {
        this.filterColumns = a.isEmptyObject(b) ? {} : b, this.options.pageNumber = 1, this.initSearch(), this.updatePagination()
    }, p.prototype.scrollTo = function (a) {
        return "string" == typeof a && (a = "bottom" === a ? this.$tableBody[0].scrollHeight : 0), "number" == typeof a && this.$tableBody.scrollTop(a), "undefined" == typeof a ? this.$tableBody.scrollTop() : void 0
    }, p.prototype.getScrollPosition = function () {
        return this.scrollTo()
    }, p.prototype.selectPage = function (a) {
        a > 0 && a <= this.options.totalPages && (this.options.pageNumber = a, this.updatePagination())
    }, p.prototype.prevPage = function () {
        this.options.pageNumber > 1 && (this.options.pageNumber--, this.updatePagination())
    }, p.prototype.nextPage = function () {
        this.options.pageNumber < this.options.totalPages && (this.options.pageNumber++, this.updatePagination())
    }, p.prototype.toggleView = function () {
        this.options.cardView = !this.options.cardView, this.initHeader(), this.initBody(), this.trigger("toggle", this.options.cardView)
    }, p.prototype.refreshOptions = function (b) {
        i(this.options, b, !0) || (this.options = a.extend(this.options, b), this.trigger("refresh-options", this.options), this.destroy(), this.init())
    }, p.prototype.resetSearch = function (a) {
        var b = this.$toolbar.find(".search input");
        b.val(a || ""), this.onSearch({currentTarget: b})
    }, p.prototype.expandRow_ = function (a, b) {
        var d = this.$body.find(c('> tr[data-index="%s"]', b));
        d.next().is("tr.detail-view") === (a ? !1 : !0) && d.find("> td > .detail-icon").click()
    }, p.prototype.expandRow = function (a) {
        this.expandRow_(!0, a)
    }, p.prototype.collapseRow = function (a) {
        this.expandRow_(!1, a)
    }, p.prototype.expandAllRows = function (b) {
        if (b) {
            var d = this.$body.find(c('> tr[data-index="%s"]', 0)), e = this, f = null, g = !1, h = -1;
            if (d.next().is("tr.detail-view") ? d.next().next().is("tr.detail-view") || (d.next().find(".detail-icon").click(), g = !0) : (d.find("> td > .detail-icon").click(), g = !0), g) try {
                h = setInterval(function () {
                    f = e.$body.find("tr.detail-view").last().find(".detail-icon"), f.length > 0 ? f.click() : clearInterval(h)
                }, 1)
            } catch (i) {
                clearInterval(h)
            }
        } else for (var j = this.$body.children(), k = 0; k < j.length; k++) this.expandRow_(!0, a(j[k]).data("index"))
    }, p.prototype.collapseAllRows = function (b) {
        if (b) this.expandRow_(!1, 0); else for (var c = this.$body.children(), d = 0; d < c.length; d++) this.expandRow_(!1, a(c[d]).data("index"))
    }, p.prototype.updateFormatText = function (a, b) {
        this.options[c("format%s", a)] && ("string" == typeof b ? this.options[c("format%s", a)] = function () {
            return b
        } : "function" == typeof b && (this.options[c("format%s", a)] = b)), this.initToolbar(), this.initPagination(), this.initBody()
    };
    var q = ["getOptions", "getSelections", "getAllSelections", "getData", "load", "append", "prepend", "remove", "removeAll", "insertRow", "updateRow", "updateCell", "updateByUniqueId", "removeByUniqueId", "getRowByUniqueId", "showRow", "hideRow", "getRowsHidden", "mergeCells", "checkAll", "uncheckAll", "checkInvert", "check", "uncheck", "checkBy", "uncheckBy", "refresh", "resetView", "resetWidth", "destroy", "showLoading", "hideLoading", "showColumn", "hideColumn", "getHiddenColumns", "getVisibleColumns", "showAllColumns", "hideAllColumns", "filterBy", "scrollTo", "getScrollPosition", "selectPage", "prevPage", "nextPage", "togglePagination", "toggleView", "refreshOptions", "resetSearch", "expandRow", "collapseRow", "expandAllRows", "collapseAllRows", "updateFormatText"];
    a.fn.bootstrapTable = function (b) {
        var c, d = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var e = a(this), f = e.data("bootstrap.table"),
                g = a.extend({}, p.DEFAULTS, e.data(), "object" == typeof b && b);
            if ("string" == typeof b) {
                if (a.inArray(b, q) < 0) throw new Error("Unknown method: " + b);
                if (!f) return;
                c = f[b].apply(f, d), "destroy" === b && e.removeData("bootstrap.table")
            }
            f || e.data("bootstrap.table", f = new p(this, g))
        }), "undefined" == typeof c ? this : c
    }, a.fn.bootstrapTable.Constructor = p, a.fn.bootstrapTable.defaults = p.DEFAULTS, a.fn.bootstrapTable.columnDefaults = p.COLUMN_DEFAULTS, a.fn.bootstrapTable.locales = p.LOCALES, a.fn.bootstrapTable.methods = q, a.fn.bootstrapTable.utils = {
        sprintf: c,
        getFieldIndex: e,
        compareObjects: i,
        calculateObjectValue: h,
        getItemField: m,
        objectKeys: o,
        isIEBrowser: n
    }, a(function () {
        a('[data-toggle="table"]').bootstrapTable()
    })
}(jQuery);