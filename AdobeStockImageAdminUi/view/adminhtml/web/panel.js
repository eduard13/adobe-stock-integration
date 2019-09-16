/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'uiElement',
    'jquery',
    'mage/translate',
    'Magento_AdobeStockAdminUi/js/config',
    'Magento_AdobeStockAdminUi/js/user-quota',
], function (Element, $, $t, config, userQuota) {
    'use strict';

    return Element.extend({
        defaults: {
            containerId: '',
            masonryComponentPath: '',
            modules: {
                masonry: '${$.masonryComponentPath}'
            },
        },

        /**
         * Init component
         *
         * @return {exports}
         */
        initialize: function () {
            this._super();

            config.downloadPreviewUrl = this.downloadPreviewUrl;
            config.quotaUrl = this.quotaUrl;
            config.seriesUrl = this.seriesUrl;

            userQuota.images(this.userQuota.images);
            userQuota.credits(this.userQuota.credits);

            $(this.containerId).modal({
                type: 'slide',
                buttons: [],
                modalClass: 'adobe-stock-modal',
                title: $t('Adobe Stock')
            }).on('openModal', function () {
                this.setStyles();
            }.bind(this)).applyBindings();

            return this;
        },

        /**
         * Apply style after images rendered on page.
         */
        setStyles: function () {
            window.dispatchEvent(new Event('resize'));
            $(document).ajaxComplete(() => {
                setTimeout(() => {
                    this.masonry().setLayoutStyles();
                }, 200);
            });
        }
    });
});
