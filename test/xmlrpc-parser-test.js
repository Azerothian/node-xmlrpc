var vows         = require('vows')
  , assert       = require('assert')
  , xmlrpcParser = require('../lib/xmlrpc-parser.js')

vows.describe('XML-RPC Parser').addBatch({
  // Test createCallXml functionality
  'A createCallXml call' : {
    // Test String
    'with a regular String param' : {
      topic: function() {
        xmlrpcParser.createCallXml('testMethod', ['testString'], this.callback)
      }
    , 'contains the string' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><string>testString</string></value></param></params></methodCall>')
      }
    }
    // FIXME Empty string causes warnings. Need to figure out what's the
    // spec way to define an empty string
  , 'with an empty String param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [''], this.callback)
      }
    , 'contains an empty string' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><string/></value></param></params></methodCall>')
      }
    }
    // Test Integer
  , 'with a positive Interger param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [17], this.callback)
      }
    , 'contains the integer' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><int>17</int></value></param></params></methodCall>')
      }
    }
  , 'with a negative Integer param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [-32], this.callback)
      }
    , 'contains the negative integer' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><int>-32</int></value></param></params></methodCall>')
      }
    }
  , 'with an Integer param of 0' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [0], this.callback)
      }
    , 'contains 0' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><int>0</int></value></param></params></methodCall>')
      }
    }
    // Test Double
  , 'with a positive Double param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [17.5], this.callback)
      }
    , 'contains the double' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><double>17.5</double></value></param></params></methodCall>')
      }
    }
  , 'with a negative Double param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [-32.7777], this.callback)
      }
    , 'contains the negative double' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><double>-32.7777</double></value></param></params></methodCall>')
      }
    }
    // Test Boolean
  , 'with a true Boolean param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [true], this.callback)
      }
    , 'contains the value 1' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><boolean>1</boolean></value></param></params></methodCall>')
      }
    }
  , 'with a false Boolean param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [false], this.callback)
      }
    , 'contains the value 0' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><boolean>0</boolean></value></param></params></methodCall>')
      }
    }
    // Test Datetime
  , 'with a Datetime param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [new Date(2012, 05, 07, 11, 35, 10)], this.callback)
      }
    , 'contains the timestamp' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><dateTime.iso8601>20120607T11:35:10</dateTime.iso8601></value></param></params></methodCall>')
      }
    }
    // Test Nil
  , 'with a Nil param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [null], this.callback)
      }
    , 'contains the nil' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><nil/></value></param></params></methodCall>')
      }
    }
    // Test Array
  , 'with an Array param' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [['string1', 3]], this.callback)
      }
    , 'contains the array' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><array><data><value><string>string1</string></value><value><int>3</int></value></data></array></value></param></params></methodCall>')
      }
    }
    // Test Struct
  , 'with a one-level struct' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [{stringName: 'string1', intName: 3}], this.callback)
      }
    , 'contains the struct' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><struct><member><name>stringName</name><value><string>string1</string></value></member><member><name>intName</name><value><int>3</int></value></member></struct></value></param></params></methodCall>')
      }
    }
    // FIXME Empty name causes warnings. Need to figure out what's the
    // spec way to define an empty string
  , 'with a one-level struct and an empty property name' : {
      topic: function () {
        xmlrpcParser.createCallXml('testMethod', [{stringName: '', intName: 3}], this.callback)
      }
    , 'contains the struct' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><struct><member><name/><value><string>string1</string></value></member><member><name>intName</name><value><int>3</int></value></member></struct></value></param></params></methodCall>')
      }
    }
  , 'with a two-level struct' : {
    topic: function () {
        xmlrpcParser.createCallXml('testMethod', [{stringName: 'string1', objectName: { intName: 4 }}], this.callback)
      }
    , 'contains the struct' : function (err, xml) {
        assert.equal(xml, '<methodCall><methodName>testMethod</methodName><params><param><value><struct><member><name>stringName</name><value><string>string1</string></value></member><member><name>objectName</name><value><struct><member><name>intName</name><value><int>4</int></value></member></struct></value></member></struct></value></param></params></methodCall>')
      }
    }
  }

  // Test parseResponseXml functionality
, 'A paraseResponseXml call' : {
    // Test boolean
    'with a true Boolean param' : {
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
