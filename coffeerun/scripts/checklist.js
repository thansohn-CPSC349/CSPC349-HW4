(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    class CheckList {
        constructor(selector) {
            if (!selector) {
                throw new Error('No selector provided');
            }

            this.$element = $(selector);
            if (this.$element.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }

        addRow(coffeeOrder) {
            this.removeRow(coffeeOrder.emailAddress);

            var rowElement = new Row(coffeeOrder);

            this.$element.append(rowElement.$element);
        }

        removeRow(email) {
            this.$element
                .find(`[value="${email}"]`)
                .closest('[data-coffee-order="checkbox"]')
                .remove();
        }

        addClickHandler(fn) {
            this.$element.on('click', 'input', function (event) {
                var email = event.target.value;
                this.removeRow(email);
                fn(email);
            }.bind(this));
        }
    }

    class Row {
        constructor(coffeeOrder) {
            var $div = $('<div></div>', {
                'data-coffee-order': 'checkbox',
                'class': 'checkbox'
            });

            var $label = $('<label></label>');

            var $checkbox = $('<input></input>', {
                type: 'checkbox',
                value: coffeeOrder.emailAddress
            });

            var description = `${coffeeOrder.size}, `;
            if (coffeeOrder.flavor) {
                description += `${coffeeOrder.flavor} `;
            }
            description += ` ${coffeeOrder.coffee}, [${coffeeOrder.strength}x]   (${coffeeOrder.emailAddress})`;

            $label.append($checkbox);
            $label.append(description);
            $div.append($label);

            this.$element = $div;
        }


    }

    App.CheckList = CheckList;
    window.App = App;
})(window);