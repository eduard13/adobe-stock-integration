/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'uiElement',
    'uiRegistry'
], function (Element, uiRegistry) {
    'use strict';

    return Element.extend({
        defaults: {
            template: 'Magento_AdobeStockImageAdminUi/sorting',
            options: [],
            applied: {},
            selectedOption: '',
            listens: {
                'selectedOption': 'applyChanges'
            },
            exports: {
                applied: '${ $.provider }:params.sorting'
            },
        },

        /**
         * @inheritDoc
         */
        initObservable: function () {
            this.preparedOptions();

            return this._super()
                .observe([
                    'applied',
                    'selectedOption'
                ]);
        },

        /**
         * Prepared sort order options
         */
        preparedOptions: function () {
            var columns = uiRegistry.get('index = adobe_stock_images_columns');
            if (columns && columns.elems().length > 0) {
                columns.elems().map((function (column) {
                    if (true === column.sortable) {
                        this.options.push({
                            value: column.index,
                            label: column.label
                        });
                    }
                }).bind(this));
            }
        },

        /**
         * Apply changes
         */
        applyChanges: function () {
            this.applied({
                field: this.selectedOption(),
                direction: 'desc',
            });
        }
    });
});
