/* jshint node: true */

/*
 * update timestamp on save
 *
 * NOTE: mongoose pre 'save' callbacks only fire on `save`
 *
 * @param {String} fieldName
 * @return {Function}
 */

module.exports = function(fieldName) {
  return function(next) {
    this[fieldName] = new Date();
    next();
  };
};

