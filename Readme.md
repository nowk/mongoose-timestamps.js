# Mongoose Timestamps

[![Build Status](https://travis-ci.org/nowk/mongoose-timestamps.js.svg?branch=master)](https://travis-ci.org/nowk/mongoose-timestamps.js)
[![Code Climate](https://codeclimate.com/github/nowk/mongoose-timestamps.js.png)](https://codeclimate.com/github/nowk/mongoose-timestamps.js)

Middleware to update timestamps


## Install

    npm install mongoose-timestamps

## Usage


    var mongoose = require('mongoose');
    var updateTimestamps = require('mongoose-timestamps');

    var schema = mongoose.Schema({
      created_at: {type: Date, default: new Date()},
      updated_at: {type: Date}
    });

    schema.pre('save', updateTimestamps('updated_at'));


## License

MIT
