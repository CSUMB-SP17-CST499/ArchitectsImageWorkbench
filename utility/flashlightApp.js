#!/usr/bin/env node

/**
 * Created by kami on 3/15/17.
 */

/*
 * @version 0.3, 3 June 2014
 */

var elasticsearch = require('elasticsearch'),
  conf = require('./flashlightConfig'),
  fbutil = require('./firebaseLoader'),
  PathMonitor = require('../flashlight/lib/PathMonitor'),
  SearchQueue = require('../flashlight/lib/SearchQueue'),
  client = require('./flashlighClient');

var escOptions = {
  hosts: [{
    host: conf.ES_HOST,
    port: conf.ES_PORT,
    auth: (conf.ES_USER && conf.ES_PASS) ? conf.ES_USER + ':' + conf.ES_PASS : null
  }]
};

for (var attrname in conf.ES_OPTS) {
  if( conf.ES_OPTS.hasOwnProperty(attrname) ) {
    escOptions[attrname] = conf.ES_OPTS[attrname];
  }
}
console.log('About to connect elastic');
// connect to ElasticSearch
var esc = new elasticsearch.Client(escOptions);
console.log('elastic connected');
console.log('Connecting to ElasticSearch host %s:%s'.grey, conf.ES_HOST, conf.ES_PORT);

var timeoutObj = setInterval(function() {
  esc.ping()
    .then(function() {
      console.log('Connected to ElasticSearch host %s:%s'.grey, conf.ES_HOST, conf.ES_PORT);
      clearInterval(timeoutObj);
      initFlashlight();
    });
}, 5000);

function initFlashlight() {
  console.log('Connecting to Firebase %s'.grey, conf.FB_URL);
  fbutil.init();
  PathMonitor.process(esc, conf.paths, conf.FB_PATH);
  SearchQueue.init(esc, conf.FB_REQ, conf.FB_RES, conf.CLEANUP_INTERVAL);
}
