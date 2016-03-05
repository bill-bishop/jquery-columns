(function ($) {
    'use strict';

    function toColumns(arr, cols) {
        var result = [];
        var rows = Math.ceil(arr.length / cols);

        for (var i = 0; i < rows; i++) {
            for (var x = i; x < rows * cols; x += rows) {
                result.push(arr[x]);
            }
        }
        return result;
    }

    /*

    jQuery.fn.columns (cols, options)

        cols        - the number of columns to organize the elements into
        options     - (optional) object. see below configurable properties:

            reorder             - if explicitly set to false,
                                    will not refer back to the original element order on subsequent .columns() calls
                                    useful for deferring to angular etc. for maintaining the original element order

            placeholderClass    - defaults to 'placeholder'
                                    the class name of the element to use for row placeholders

            style               - defaults to { width: 100 / cols + '%', display: 'inline-block' }
                                    fn called with # cols,
                                    return value object is passed to jQuery.fn.css on each element
     */
    $.fn.columns = function (cols, opts) {
        if (!cols || cols < 1) {
            throw new Error('Invalid number of columns');
        }
        opts = opts || {};

        var reorder = opts.reorder !== false,
            placeholderClass = opts.placeholderClass || 'placeholder',
            style;

        if(typeof opts.style === 'function') {
            style = opts.style(cols);
        }
        else {
            style = {
                width: 100 / cols + '%',
                display: 'inline-block'
            };
        }

        return this.each(function (i, self) {
            var config = self.$columnConfig = self.$columnConfig || {};

            if (!config.placeholderElement) {
                config.placeholderElement = $(self).children().filter(function (i, child) {
                        return $(child).hasClass(placeholderClass);
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

            var elements = reorder ? config.childOrder : $(self).children();

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