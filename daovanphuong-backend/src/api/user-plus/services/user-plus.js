'use strict';

/**
 * user-plus service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-plus.user-plus');
