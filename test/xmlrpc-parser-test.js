var vows         = require('vows')
  , assert       = require('assert')
  , xmlrpcParser = require('../lib/xmlrpc-parser.js')

vows.describe('XML-RPC Parser').addBatch({
  // Test parseResponseXml functionality
  'A parseResponseXml call' : {
    // Test array
    'with an Array param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><array><data><value><int>178</int></value><value><string>testString</string></value></data></array></value></param></params></methodResponse>', this.callback)
      }
    , 'contains an array of arrays' : function (err, params) {
        assert.typeOf(params[0], 'array')
        assert.deepEqual(params, [[178, 'testString']])
      }
    }
  , 'with a nested Array param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><array><data><value><int>178</int></value><value><array><data><value><string>testString</string></value></data></array></value></data></array></value></param></params></methodResponse>', this.callback)
      }
    , 'contains an array of arrays' : function (err, params) {
        assert.typeOf(params[0], 'array')
        assert.deepEqual(params, [[178, ['testString']]])
      }
    }
  , 'with a false Boolean param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><boolean>0</boolean></value></param></params></methodResponse>', this.callback)
      }
    , 'contains an array with a false value' : function (err, params) {
        assert.typeOf(params[0], 'boolean')
        assert.deepEqual(params, [false])
      }
    }
    // Test boolean
  , 'with a true Boolean param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><boolean>1</boolean></value></param></params></methodResponse>', this.callback)
      }
    , 'contains an array with a true value' : function (err, params) {
        assert.typeOf(params[0], 'boolean')
        assert.deepEqual(params, [true])
      }
    }
  , 'with a false Boolean param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><boolean>0</boolean></value></param></params></methodResponse>', this.callback)
      }
    , 'contains an array with a false value' : function (err, params) {
        assert.typeOf(params[0], 'boolean')
        assert.deepEqual(params, [false])
      }
    }
    // Test dateTime
  , 'with a Datetime param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><dateTime.iso8601>20120608T11:35:10</dateTime.iso8601></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the Date object' : function (err, params) {
        assert.typeOf(params[0], 'date')
        assert.deepEqual(params, [new Date(2012, 05, 08, 11, 35, 10)])
      }
    }
    // Test double
  , 'with a positive Double param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><double>4.11</double></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the positive double' : function (err, params) {
        assert.typeOf(params[0], 'number')
        assert.deepEqual(params, [4.11])
      }
    }
  , 'with a negative Double param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><double>-4.2221</double></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the positive double' : function (err, params) {
        assert.typeOf(params[0], 'number')
        assert.deepEqual(params, [-4.2221])
      }
    }
    // Test Integer
  , 'with a positive Int param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><int>4</int></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the positive integer' : function (err, params) {
        assert.typeOf(params[0], 'number')
        assert.deepEqual(params, [4])
      }
    }
  , 'with a positive I4 param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><i4>6</i4></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the positive integer' : function (err, params) {
        assert.typeOf(params[0], 'number')
        assert.deepEqual(params, [6])
      }
    }
  , 'with a negative Int param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><int>-14</int></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the negative integer' : function (err, params) {
        assert.typeOf(params[0], 'number')
        assert.deepEqual(params, [-14])
      }
    }
  , 'with a negative I4 param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><i4>-26</i4></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the negative integer' : function (err, params) {
        assert.typeOf(params[0], 'number')
        assert.deepEqual(params, [-26])
      }
    }
  , 'with a Int param of 0' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><int>0</int></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the value 0' : function (err, params) {
        assert.typeOf(params[0], 'number')
        assert.deepEqual(params, [0])
      }
    }
  , 'with a I4 param of 0' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><i4>0</i4></value></param></params></methodResponse>', this.callback)
      }
    , 'contains the value 0' : function (err, params) {
        assert.typeOf(params[0], 'number')
        assert.deepEqual(params, [0])
      }
    }
    // Test String
  , 'with a String param' : {
      topic: function() {
        xmlrpcParser.parseResponseXml('<methodResponse><params><param><value><string>testString</string></value></param></params></methodResponse>', this.callback)
      }
    , 'contains an array with the string' : function (err, params) {
        assert.typeOf(params[0], 'string')
        assert.deepEqual(params, ['testString'])
      }
    }
  }

}).export(module)
