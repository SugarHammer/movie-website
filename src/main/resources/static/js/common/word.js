$.fn.extend({
    obj: {},
    lu_word: function (obj = {}) {
        var id = $(this).attr('id');
        this.obj[id] = {
            text: ["Hello World!"],
            width: "200",
            height: "300",
            background: "#000",
            color: "#fff",
            speed: '300',
            sleep: '2000',
            sign: true,
            type: true,
            end: 0
        };
        $.extend(this.obj[id], obj);
        var t = this.obj;
        var that = t[id];

        var word = $(this);
        word.css({
            "width": that.width,
            "height": that.height,
            "word-wrap": "break-word",
            "background": that.background
        });
        word.append("<span class='lu_word_title'></span><span class='lu_word_line' style='width: 2px;background:" + that.color + ";height: 20px;border: 1px solid " + that.color + ";'></span>");

        var title = $(this).find('.lu_word_title');
        var line = $(this).find('.lu_word_line');
        title.css('color', that.color);

        var lineSign = true;
        var i = 0;

        setInterval(function () {
            that = t[id];
            go();
        }, that.speed);
        setInterval(cursor, 1000);

        function go() {
            if (!that.sign) {
                return;
            }
            if (i >= that.text.length) {
                i = 0;
            }
            var text = that.text[i];
            var w = text.substr(0, that.end);
            title.text(w);
            if (that.type) {
                if (that.end >= text.length) {
                    t[id].type = false;
                    that.sign = false;
                    setTimeout(() => {
                        that.sign = true
                    }, that.sleep);
                }
                t[id].end++;
            } else {
                if (that.end <= 0) {
                    t[id].type = true;
                    i++
                }
                t[id].end--;
            }
        }

        function cursor() {
            if (lineSign) {
                line.hide();
                lineSign = false;
            } else {
                line.show();
                lineSign = true;
            }
        }
    },
    setColor: function (color) {
        var title = $(this).find('.lu_word_title');
        var line = $(this).find('.lu_word_line');
        title.css('color', color);
        line.css('border', "1px solid " + color + "");
    },
    setBg: function (color) {
        $(this).css('background', color);
    },
    setSpeed: function (speed) {
        that.speed = speed;
    },
    start: function () {
        var id = $(this).attr('id');
        this.obj[id].sign = true;
    },
    stop: function () {
        var id = $(this).attr('id');
        this.obj[id].sign = false;
    },
    write: function () {
        var id = $(this).attr('id');
        this.obj[id].type = true;
    },
    del: function () {
        var id = $(this).attr('id');
        this.obj[id].type = false;
    },
    setWord: function (word) {
        var id = $(this).attr('id');
        var that = this.obj[id];
        that.text = [word];
        that.end = 0;
        that.sign = true;
        that.type = true;
    }
});
