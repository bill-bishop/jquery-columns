(function ($) {
    'use strict';

    function toColumns(arr, cols) {
        if (cols < 1) {
            throw new Error('Invalid number of columns');
        }

        var result = [];
        var rows = Math.ceil(arr.length / cols);

        for (var i = 0; i < rows; i++) {
            for (var x = i; x < rows * cols; x += rows) {
                result.push(arr[x]);
            }
        }
        return result;
    }

    $.fn.columns = function (cols, ignoreOriginalOrder) {
        var style = {
            width: 100 / cols + '%',
            display: 'inline-block'
        };

        return this.each(function (i, self) {
            var config = self.$columnConfig = self.$columnConfig || {};

            if (!config.placeholderElement) {
                config.placeholderElement = $(self).children().filter(function (i, child) {
                        return $(child).hasClass('placeholder');
                    })[0] || $('<div />');
                $(config.placeholderElement).remove();
            }
            if (!config.childOrder) {
                config.childOrder = $(self).children().map(function (i, child) {
                    return child;
                });
            }
            if (config.columnPlaceholders && config.columnPlaceholders.length) {
                config.columnPlaceholders.forEach(function (placeholder) {
                    $(placeholder).remove();
                });
            }

            config.columnPlaceholders = [];

            var elements = ignoreOriginalOrder ? $(self).children() : config.childOrder;

            toColumns(elements, cols).forEach(function (el) {
                if (!el) {
                    el = $(config.placeholderElement).clone();
                    config.columnPlaceholders.push(el);
                }
                $(el)
                    .css(style)
                    .appendTo(self);
            });
        });
    };

})(jQuery);