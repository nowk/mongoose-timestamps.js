/* jshint node: true */

process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var assert = require('chai').assert;
var updateTimestamps = require('..');

describe("mongoose-timestamps", function() {
  var schema;

  before(function(done) {
    mongoose.connect("mongodb://127.0.0.1:27017/mongoose_timestamps_test");
    mongoose.connection.on('connected', done);
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  beforeEach(function() {
    schema = mongoose.Schema({
      created_at: {type: Date, default: new Date()},
      updated_at: {type: Date}
    });
  });

  afterEach(function(done) {
    var models = Object.keys(mongoose.models);
    var i = 0;
    var len = models.length;
    models.forEach(function(m) {
      var model = mongoose.models[m];
      model.remove({}, function(err) {
        if (i<len) {
          mongoose.models = {};
          done();
        }
        i++;
      });
    });
  });


  it("updates the defined update field on save", function(done) {
    schema.pre('save', updateTimestamps('updated_at'));
    var Product = mongoose.model('Product', schema);

    Product.create({}, function(err, resource) {
      assert(resource.updated_at);

      var oldTimestamp = resource.updated_at.getTime();
      setTimeout(function() {
        resource.save(function(err, updated) {
          assert(oldTimestamp < resource.updated_at.getTime());
          done(err);
        });
      }, 1);
    });
  });
});
