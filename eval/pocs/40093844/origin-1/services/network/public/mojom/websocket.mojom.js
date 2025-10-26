// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

(function() {
  var mojomId = 'services/network/public/mojom/websocket.mojom';
  if (mojo.internal.isMojomLoaded(mojomId)) {
    console.warn('The following mojom is loaded multiple times: ' + mojomId);
    return;
  }
  mojo.internal.markMojomLoaded(mojomId);
  var bindings = mojo;
  var associatedBindings = mojo;
  var codec = mojo.internal;
  var validator = mojo.internal;

  var exports = mojo.internal.exposeNamespace('network.mojom');
  var url$ =
      mojo.internal.exposeNamespace('url.mojom');
  if (mojo.config.autoLoadMojomDeps) {
    mojo.internal.loadMojomIfNecessary(
        'url/mojom/url.mojom', '../../../../url/mojom/url.mojom.js');
  }
  var network_param$ =
      mojo.internal.exposeNamespace('network.mojom');
  if (mojo.config.autoLoadMojomDeps) {
    mojo.internal.loadMojomIfNecessary(
        'services/network/public/mojom/network_param.mojom', 'network_param.mojom.js');
  }


  var WebSocketMessageType = {};
  WebSocketMessageType.CONTINUATION = 0;
  WebSocketMessageType.TEXT = WebSocketMessageType.CONTINUATION + 1;
  WebSocketMessageType.BINARY = WebSocketMessageType.TEXT + 1;
  WebSocketMessageType.LAST = WebSocketMessageType.BINARY;

  WebSocketMessageType.isKnownEnumValue = function(value) {
    switch (value) {
    case 0:
    case 1:
    case 2:
      return true;
    }
    return false;
  };

  WebSocketMessageType.validate = function(enumValue) {
    var isExtensible = false;
    if (isExtensible || this.isKnownEnumValue(enumValue))
      return validator.validationError.NONE;

    return validator.validationError.UNKNOWN_ENUM_VALUE;
  };

  function HttpHeader(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  HttpHeader.prototype.initDefaults_ = function() {
    this.name = null;
    this.value = null;
  };
  HttpHeader.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  HttpHeader.generate = function(generator_) {
    var generated = new HttpHeader;
    generated.name = generator_.generateString(false);
    generated.value = generator_.generateString(false);
    return generated;
  };

  HttpHeader.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.name = mutator_.mutateString(this.name, false);
    }
    if (mutator_.chooseMutateField()) {
      this.value = mutator_.mutateString(this.value, false);
    }
    return this;
  };
  HttpHeader.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  HttpHeader.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  HttpHeader.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  HttpHeader.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 24}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate HttpHeader.name
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 0, false)
    if (err !== validator.validationError.NONE)
        return err;


    // validate HttpHeader.value
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 8, false)
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  HttpHeader.encodedSize = codec.kStructHeaderSize + 16;

  HttpHeader.decode = function(decoder) {
    var packed;
    var val = new HttpHeader();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.name = decoder.decodeStruct(codec.String);
    val.value = decoder.decodeStruct(codec.String);
    return val;
  };

  HttpHeader.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(HttpHeader.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.String, val.name);
    encoder.encodeStruct(codec.String, val.value);
  };
  function WebSocketHandshakeRequest(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketHandshakeRequest.prototype.initDefaults_ = function() {
    this.url = null;
    this.headers = null;
    this.headersText = null;
  };
  WebSocketHandshakeRequest.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketHandshakeRequest.generate = function(generator_) {
    var generated = new WebSocketHandshakeRequest;
    generated.url = generator_.generateStruct(url.mojom.Url, false);
    generated.headers = generator_.generateArray(function() {
      return generator_.generateStruct(network.mojom.HttpHeader, false);
    });
    generated.headersText = generator_.generateString(false);
    return generated;
  };

  WebSocketHandshakeRequest.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.url = mutator_.mutateStruct(this.url, url.mojom.Url, false);
    }
    if (mutator_.chooseMutateField()) {
      this.headers = mutator_.mutateArray(this.headers, function(val) {
        return mutator_.mutateStruct(val, network.mojom.HttpHeader, false);
      });
    }
    if (mutator_.chooseMutateField()) {
      this.headersText = mutator_.mutateString(this.headersText, false);
    }
    return this;
  };
  WebSocketHandshakeRequest.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketHandshakeRequest.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketHandshakeRequest.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketHandshakeRequest.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 32}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketHandshakeRequest.url
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 0, url$.Url, false);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketHandshakeRequest.headers
    err = messageValidator.validateArrayPointer(offset + codec.kStructHeaderSize + 8, 8, new codec.PointerTo(HttpHeader), false, [0], 0);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketHandshakeRequest.headersText
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 16, false)
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketHandshakeRequest.encodedSize = codec.kStructHeaderSize + 24;

  WebSocketHandshakeRequest.decode = function(decoder) {
    var packed;
    var val = new WebSocketHandshakeRequest();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.url = decoder.decodeStructPointer(url$.Url);
    val.headers = decoder.decodeArrayPointer(new codec.PointerTo(HttpHeader));
    val.headersText = decoder.decodeStruct(codec.String);
    return val;
  };

  WebSocketHandshakeRequest.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketHandshakeRequest.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStructPointer(url$.Url, val.url);
    encoder.encodeArrayPointer(new codec.PointerTo(HttpHeader), val.headers);
    encoder.encodeStruct(codec.String, val.headersText);
  };
  function WebSocketHandshakeResponse(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketHandshakeResponse.prototype.initDefaults_ = function() {
    this.url = null;
    this.httpVersion = null;
    this.statusCode = 0;
    this.statusText = null;
    this.socketAddress = null;
    this.headers = null;
    this.headersText = null;
  };
  WebSocketHandshakeResponse.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketHandshakeResponse.generate = function(generator_) {
    var generated = new WebSocketHandshakeResponse;
    generated.url = generator_.generateStruct(url.mojom.Url, false);
    generated.httpVersion = generator_.generateStruct(network.mojom.HttpVersion, false);
    generated.statusCode = generator_.generateInt32();
    generated.statusText = generator_.generateString(false);
    generated.socketAddress = generator_.generateStruct(network.mojom.HostPortPair, false);
    generated.headers = generator_.generateArray(function() {
      return generator_.generateStruct(network.mojom.HttpHeader, false);
    });
    generated.headersText = generator_.generateString(false);
    return generated;
  };

  WebSocketHandshakeResponse.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.url = mutator_.mutateStruct(this.url, url.mojom.Url, false);
    }
    if (mutator_.chooseMutateField()) {
      this.httpVersion = mutator_.mutateStruct(this.httpVersion, network.mojom.HttpVersion, false);
    }
    if (mutator_.chooseMutateField()) {
      this.statusCode = mutator_.mutateInt32(this.statusCode);
    }
    if (mutator_.chooseMutateField()) {
      this.statusText = mutator_.mutateString(this.statusText, false);
    }
    if (mutator_.chooseMutateField()) {
      this.socketAddress = mutator_.mutateStruct(this.socketAddress, network.mojom.HostPortPair, false);
    }
    if (mutator_.chooseMutateField()) {
      this.headers = mutator_.mutateArray(this.headers, function(val) {
        return mutator_.mutateStruct(val, network.mojom.HttpHeader, false);
      });
    }
    if (mutator_.chooseMutateField()) {
      this.headersText = mutator_.mutateString(this.headersText, false);
    }
    return this;
  };
  WebSocketHandshakeResponse.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketHandshakeResponse.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketHandshakeResponse.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketHandshakeResponse.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 64}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketHandshakeResponse.url
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 0, url$.Url, false);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketHandshakeResponse.httpVersion
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 8, network_param$.HttpVersion, false);
    if (err !== validator.validationError.NONE)
        return err;



    // validate WebSocketHandshakeResponse.statusText
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 24, false)
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketHandshakeResponse.socketAddress
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 32, network_param$.HostPortPair, false);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketHandshakeResponse.headers
    err = messageValidator.validateArrayPointer(offset + codec.kStructHeaderSize + 40, 8, new codec.PointerTo(HttpHeader), false, [0], 0);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketHandshakeResponse.headersText
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 48, false)
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketHandshakeResponse.encodedSize = codec.kStructHeaderSize + 56;

  WebSocketHandshakeResponse.decode = function(decoder) {
    var packed;
    var val = new WebSocketHandshakeResponse();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.url = decoder.decodeStructPointer(url$.Url);
    val.httpVersion = decoder.decodeStructPointer(network_param$.HttpVersion);
    val.statusCode = decoder.decodeStruct(codec.Int32);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    val.statusText = decoder.decodeStruct(codec.String);
    val.socketAddress = decoder.decodeStructPointer(network_param$.HostPortPair);
    val.headers = decoder.decodeArrayPointer(new codec.PointerTo(HttpHeader));
    val.headersText = decoder.decodeStruct(codec.String);
    return val;
  };

  WebSocketHandshakeResponse.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketHandshakeResponse.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStructPointer(url$.Url, val.url);
    encoder.encodeStructPointer(network_param$.HttpVersion, val.httpVersion);
    encoder.encodeStruct(codec.Int32, val.statusCode);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.encodeStruct(codec.String, val.statusText);
    encoder.encodeStructPointer(network_param$.HostPortPair, val.socketAddress);
    encoder.encodeArrayPointer(new codec.PointerTo(HttpHeader), val.headers);
    encoder.encodeStruct(codec.String, val.headersText);
  };
  function AuthenticationHandler_OnAuthRequired_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  AuthenticationHandler_OnAuthRequired_Params.prototype.initDefaults_ = function() {
    this.info = null;
    this.headers = null;
    this.socketAddress = null;
  };
  AuthenticationHandler_OnAuthRequired_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  AuthenticationHandler_OnAuthRequired_Params.generate = function(generator_) {
    var generated = new AuthenticationHandler_OnAuthRequired_Params;
    generated.info = generator_.generateStruct(network.mojom.AuthChallengeInfo, false);
    generated.headers = generator_.generateStruct(network.mojom.HttpResponseHeaders, false);
    generated.socketAddress = generator_.generateStruct(network.mojom.HostPortPair, false);
    return generated;
  };

  AuthenticationHandler_OnAuthRequired_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.info = mutator_.mutateStruct(this.info, network.mojom.AuthChallengeInfo, false);
    }
    if (mutator_.chooseMutateField()) {
      this.headers = mutator_.mutateStruct(this.headers, network.mojom.HttpResponseHeaders, false);
    }
    if (mutator_.chooseMutateField()) {
      this.socketAddress = mutator_.mutateStruct(this.socketAddress, network.mojom.HostPortPair, false);
    }
    return this;
  };
  AuthenticationHandler_OnAuthRequired_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  AuthenticationHandler_OnAuthRequired_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  AuthenticationHandler_OnAuthRequired_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  AuthenticationHandler_OnAuthRequired_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 32}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate AuthenticationHandler_OnAuthRequired_Params.info
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 0, network_param$.AuthChallengeInfo, false);
    if (err !== validator.validationError.NONE)
        return err;


    // validate AuthenticationHandler_OnAuthRequired_Params.headers
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 8, network_param$.HttpResponseHeaders, false);
    if (err !== validator.validationError.NONE)
        return err;


    // validate AuthenticationHandler_OnAuthRequired_Params.socketAddress
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 16, network_param$.HostPortPair, false);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  AuthenticationHandler_OnAuthRequired_Params.encodedSize = codec.kStructHeaderSize + 24;

  AuthenticationHandler_OnAuthRequired_Params.decode = function(decoder) {
    var packed;
    var val = new AuthenticationHandler_OnAuthRequired_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.info = decoder.decodeStructPointer(network_param$.AuthChallengeInfo);
    val.headers = decoder.decodeStructPointer(network_param$.HttpResponseHeaders);
    val.socketAddress = decoder.decodeStructPointer(network_param$.HostPortPair);
    return val;
  };

  AuthenticationHandler_OnAuthRequired_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(AuthenticationHandler_OnAuthRequired_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStructPointer(network_param$.AuthChallengeInfo, val.info);
    encoder.encodeStructPointer(network_param$.HttpResponseHeaders, val.headers);
    encoder.encodeStructPointer(network_param$.HostPortPair, val.socketAddress);
  };
  function AuthenticationHandler_OnAuthRequired_ResponseParams(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  AuthenticationHandler_OnAuthRequired_ResponseParams.prototype.initDefaults_ = function() {
    this.credentials = null;
  };
  AuthenticationHandler_OnAuthRequired_ResponseParams.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  AuthenticationHandler_OnAuthRequired_ResponseParams.generate = function(generator_) {
    var generated = new AuthenticationHandler_OnAuthRequired_ResponseParams;
    generated.credentials = generator_.generateStruct(network.mojom.AuthCredentials, true);
    return generated;
  };

  AuthenticationHandler_OnAuthRequired_ResponseParams.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.credentials = mutator_.mutateStruct(this.credentials, network.mojom.AuthCredentials, true);
    }
    return this;
  };
  AuthenticationHandler_OnAuthRequired_ResponseParams.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  AuthenticationHandler_OnAuthRequired_ResponseParams.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  AuthenticationHandler_OnAuthRequired_ResponseParams.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  AuthenticationHandler_OnAuthRequired_ResponseParams.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 16}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate AuthenticationHandler_OnAuthRequired_ResponseParams.credentials
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 0, network_param$.AuthCredentials, true);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  AuthenticationHandler_OnAuthRequired_ResponseParams.encodedSize = codec.kStructHeaderSize + 8;

  AuthenticationHandler_OnAuthRequired_ResponseParams.decode = function(decoder) {
    var packed;
    var val = new AuthenticationHandler_OnAuthRequired_ResponseParams();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.credentials = decoder.decodeStructPointer(network_param$.AuthCredentials);
    return val;
  };

  AuthenticationHandler_OnAuthRequired_ResponseParams.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(AuthenticationHandler_OnAuthRequired_ResponseParams.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStructPointer(network_param$.AuthCredentials, val.credentials);
  };
  function WebSocketClient_OnFailChannel_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketClient_OnFailChannel_Params.prototype.initDefaults_ = function() {
    this.reason = null;
  };
  WebSocketClient_OnFailChannel_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketClient_OnFailChannel_Params.generate = function(generator_) {
    var generated = new WebSocketClient_OnFailChannel_Params;
    generated.reason = generator_.generateString(false);
    return generated;
  };

  WebSocketClient_OnFailChannel_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.reason = mutator_.mutateString(this.reason, false);
    }
    return this;
  };
  WebSocketClient_OnFailChannel_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketClient_OnFailChannel_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketClient_OnFailChannel_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketClient_OnFailChannel_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 16}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketClient_OnFailChannel_Params.reason
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 0, false)
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketClient_OnFailChannel_Params.encodedSize = codec.kStructHeaderSize + 8;

  WebSocketClient_OnFailChannel_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocketClient_OnFailChannel_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.reason = decoder.decodeStruct(codec.String);
    return val;
  };

  WebSocketClient_OnFailChannel_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketClient_OnFailChannel_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.String, val.reason);
  };
  function WebSocketClient_OnStartOpeningHandshake_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketClient_OnStartOpeningHandshake_Params.prototype.initDefaults_ = function() {
    this.request = null;
  };
  WebSocketClient_OnStartOpeningHandshake_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketClient_OnStartOpeningHandshake_Params.generate = function(generator_) {
    var generated = new WebSocketClient_OnStartOpeningHandshake_Params;
    generated.request = generator_.generateStruct(network.mojom.WebSocketHandshakeRequest, false);
    return generated;
  };

  WebSocketClient_OnStartOpeningHandshake_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.request = mutator_.mutateStruct(this.request, network.mojom.WebSocketHandshakeRequest, false);
    }
    return this;
  };
  WebSocketClient_OnStartOpeningHandshake_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketClient_OnStartOpeningHandshake_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketClient_OnStartOpeningHandshake_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketClient_OnStartOpeningHandshake_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 16}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketClient_OnStartOpeningHandshake_Params.request
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 0, WebSocketHandshakeRequest, false);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketClient_OnStartOpeningHandshake_Params.encodedSize = codec.kStructHeaderSize + 8;

  WebSocketClient_OnStartOpeningHandshake_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocketClient_OnStartOpeningHandshake_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.request = decoder.decodeStructPointer(WebSocketHandshakeRequest);
    return val;
  };

  WebSocketClient_OnStartOpeningHandshake_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketClient_OnStartOpeningHandshake_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStructPointer(WebSocketHandshakeRequest, val.request);
  };
  function WebSocketClient_OnFinishOpeningHandshake_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketClient_OnFinishOpeningHandshake_Params.prototype.initDefaults_ = function() {
    this.response = null;
  };
  WebSocketClient_OnFinishOpeningHandshake_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketClient_OnFinishOpeningHandshake_Params.generate = function(generator_) {
    var generated = new WebSocketClient_OnFinishOpeningHandshake_Params;
    generated.response = generator_.generateStruct(network.mojom.WebSocketHandshakeResponse, false);
    return generated;
  };

  WebSocketClient_OnFinishOpeningHandshake_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.response = mutator_.mutateStruct(this.response, network.mojom.WebSocketHandshakeResponse, false);
    }
    return this;
  };
  WebSocketClient_OnFinishOpeningHandshake_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketClient_OnFinishOpeningHandshake_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketClient_OnFinishOpeningHandshake_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketClient_OnFinishOpeningHandshake_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 16}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketClient_OnFinishOpeningHandshake_Params.response
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 0, WebSocketHandshakeResponse, false);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketClient_OnFinishOpeningHandshake_Params.encodedSize = codec.kStructHeaderSize + 8;

  WebSocketClient_OnFinishOpeningHandshake_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocketClient_OnFinishOpeningHandshake_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.response = decoder.decodeStructPointer(WebSocketHandshakeResponse);
    return val;
  };

  WebSocketClient_OnFinishOpeningHandshake_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketClient_OnFinishOpeningHandshake_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStructPointer(WebSocketHandshakeResponse, val.response);
  };
  function WebSocketClient_OnAddChannelResponse_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketClient_OnAddChannelResponse_Params.prototype.initDefaults_ = function() {
    this.selectedProtocol = null;
    this.extensions = null;
  };
  WebSocketClient_OnAddChannelResponse_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketClient_OnAddChannelResponse_Params.generate = function(generator_) {
    var generated = new WebSocketClient_OnAddChannelResponse_Params;
    generated.selectedProtocol = generator_.generateString(false);
    generated.extensions = generator_.generateString(false);
    return generated;
  };

  WebSocketClient_OnAddChannelResponse_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.selectedProtocol = mutator_.mutateString(this.selectedProtocol, false);
    }
    if (mutator_.chooseMutateField()) {
      this.extensions = mutator_.mutateString(this.extensions, false);
    }
    return this;
  };
  WebSocketClient_OnAddChannelResponse_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketClient_OnAddChannelResponse_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketClient_OnAddChannelResponse_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketClient_OnAddChannelResponse_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 24}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketClient_OnAddChannelResponse_Params.selectedProtocol
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 0, false)
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketClient_OnAddChannelResponse_Params.extensions
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 8, false)
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketClient_OnAddChannelResponse_Params.encodedSize = codec.kStructHeaderSize + 16;

  WebSocketClient_OnAddChannelResponse_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocketClient_OnAddChannelResponse_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.selectedProtocol = decoder.decodeStruct(codec.String);
    val.extensions = decoder.decodeStruct(codec.String);
    return val;
  };

  WebSocketClient_OnAddChannelResponse_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketClient_OnAddChannelResponse_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.String, val.selectedProtocol);
    encoder.encodeStruct(codec.String, val.extensions);
  };
  function WebSocketClient_OnDataFrame_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketClient_OnDataFrame_Params.prototype.initDefaults_ = function() {
    this.fin = false;
    this.type = 0;
    this.data = null;
  };
  WebSocketClient_OnDataFrame_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketClient_OnDataFrame_Params.generate = function(generator_) {
    var generated = new WebSocketClient_OnDataFrame_Params;
    generated.fin = generator_.generateBool();
    generated.type = generator_.generateEnum(0, 2);
    generated.data = generator_.generateArray(function() {
      return generator_.generateUint8();
    });
    return generated;
  };

  WebSocketClient_OnDataFrame_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.fin = mutator_.mutateBool(this.fin);
    }
    if (mutator_.chooseMutateField()) {
      this.type = mutator_.mutateEnum(this.type, 0, 2);
    }
    if (mutator_.chooseMutateField()) {
      this.data = mutator_.mutateArray(this.data, function(val) {
        return mutator_.mutateUint8(val);
      });
    }
    return this;
  };
  WebSocketClient_OnDataFrame_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketClient_OnDataFrame_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketClient_OnDataFrame_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketClient_OnDataFrame_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 24}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;



    // validate WebSocketClient_OnDataFrame_Params.type
    err = messageValidator.validateEnum(offset + codec.kStructHeaderSize + 4, WebSocketMessageType);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocketClient_OnDataFrame_Params.data
    err = messageValidator.validateArrayPointer(offset + codec.kStructHeaderSize + 8, 1, codec.Uint8, false, [0], 0);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketClient_OnDataFrame_Params.encodedSize = codec.kStructHeaderSize + 16;

  WebSocketClient_OnDataFrame_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocketClient_OnDataFrame_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    packed = decoder.readUint8();
    val.fin = (packed >> 0) & 1 ? true : false;
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    val.type = decoder.decodeStruct(codec.Int32);
    val.data = decoder.decodeArrayPointer(codec.Uint8);
    return val;
  };

  WebSocketClient_OnDataFrame_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketClient_OnDataFrame_Params.encodedSize);
    encoder.writeUint32(0);
    packed = 0;
    packed |= (val.fin & 1) << 0
    encoder.writeUint8(packed);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.encodeStruct(codec.Int32, val.type);
    encoder.encodeArrayPointer(codec.Uint8, val.data);
  };
  function WebSocketClient_OnFlowControl_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketClient_OnFlowControl_Params.prototype.initDefaults_ = function() {
    this.quota = 0;
  };
  WebSocketClient_OnFlowControl_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketClient_OnFlowControl_Params.generate = function(generator_) {
    var generated = new WebSocketClient_OnFlowControl_Params;
    generated.quota = generator_.generateInt64();
    return generated;
  };

  WebSocketClient_OnFlowControl_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.quota = mutator_.mutateInt64(this.quota);
    }
    return this;
  };
  WebSocketClient_OnFlowControl_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketClient_OnFlowControl_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketClient_OnFlowControl_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketClient_OnFlowControl_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 16}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    return validator.validationError.NONE;
  };

  WebSocketClient_OnFlowControl_Params.encodedSize = codec.kStructHeaderSize + 8;

  WebSocketClient_OnFlowControl_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocketClient_OnFlowControl_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.quota = decoder.decodeStruct(codec.Int64);
    return val;
  };

  WebSocketClient_OnFlowControl_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketClient_OnFlowControl_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.Int64, val.quota);
  };
  function WebSocketClient_OnDropChannel_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketClient_OnDropChannel_Params.prototype.initDefaults_ = function() {
    this.wasClean = false;
    this.code = 0;
    this.reason = null;
  };
  WebSocketClient_OnDropChannel_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketClient_OnDropChannel_Params.generate = function(generator_) {
    var generated = new WebSocketClient_OnDropChannel_Params;
    generated.wasClean = generator_.generateBool();
    generated.code = generator_.generateUint16();
    generated.reason = generator_.generateString(false);
    return generated;
  };

  WebSocketClient_OnDropChannel_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.wasClean = mutator_.mutateBool(this.wasClean);
    }
    if (mutator_.chooseMutateField()) {
      this.code = mutator_.mutateUint16(this.code);
    }
    if (mutator_.chooseMutateField()) {
      this.reason = mutator_.mutateString(this.reason, false);
    }
    return this;
  };
  WebSocketClient_OnDropChannel_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketClient_OnDropChannel_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketClient_OnDropChannel_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketClient_OnDropChannel_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 24}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;




    // validate WebSocketClient_OnDropChannel_Params.reason
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 8, false)
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketClient_OnDropChannel_Params.encodedSize = codec.kStructHeaderSize + 16;

  WebSocketClient_OnDropChannel_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocketClient_OnDropChannel_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    packed = decoder.readUint8();
    val.wasClean = (packed >> 0) & 1 ? true : false;
    decoder.skip(1);
    val.code = decoder.decodeStruct(codec.Uint16);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    val.reason = decoder.decodeStruct(codec.String);
    return val;
  };

  WebSocketClient_OnDropChannel_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketClient_OnDropChannel_Params.encodedSize);
    encoder.writeUint32(0);
    packed = 0;
    packed |= (val.wasClean & 1) << 0
    encoder.writeUint8(packed);
    encoder.skip(1);
    encoder.encodeStruct(codec.Uint16, val.code);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.encodeStruct(codec.String, val.reason);
  };
  function WebSocketClient_OnClosingHandshake_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocketClient_OnClosingHandshake_Params.prototype.initDefaults_ = function() {
  };
  WebSocketClient_OnClosingHandshake_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocketClient_OnClosingHandshake_Params.generate = function(generator_) {
    var generated = new WebSocketClient_OnClosingHandshake_Params;
    return generated;
  };

  WebSocketClient_OnClosingHandshake_Params.prototype.mutate = function(mutator_) {
    return this;
  };
  WebSocketClient_OnClosingHandshake_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocketClient_OnClosingHandshake_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocketClient_OnClosingHandshake_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocketClient_OnClosingHandshake_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 8}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocketClient_OnClosingHandshake_Params.encodedSize = codec.kStructHeaderSize + 0;

  WebSocketClient_OnClosingHandshake_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocketClient_OnClosingHandshake_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    return val;
  };

  WebSocketClient_OnClosingHandshake_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocketClient_OnClosingHandshake_Params.encodedSize);
    encoder.writeUint32(0);
  };
  function WebSocket_AddChannelRequest_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocket_AddChannelRequest_Params.prototype.initDefaults_ = function() {
    this.url = null;
    this.requestedProtocols = null;
    this.firstPartyForCookies = null;
    this.additionalHeaders = null;
    this.client = new WebSocketClientPtr();
  };
  WebSocket_AddChannelRequest_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocket_AddChannelRequest_Params.generate = function(generator_) {
    var generated = new WebSocket_AddChannelRequest_Params;
    generated.url = generator_.generateStruct(url.mojom.Url, false);
    generated.requestedProtocols = generator_.generateArray(function() {
      return generator_.generateString(false);
    });
    generated.firstPartyForCookies = generator_.generateStruct(url.mojom.Url, false);
    generated.additionalHeaders = generator_.generateArray(function() {
      return generator_.generateStruct(network.mojom.HttpHeader, false);
    });
    generated.client = generator_.generateInterface("network.mojom.WebSocketClient", false);
    return generated;
  };

  WebSocket_AddChannelRequest_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.url = mutator_.mutateStruct(this.url, url.mojom.Url, false);
    }
    if (mutator_.chooseMutateField()) {
      this.requestedProtocols = mutator_.mutateArray(this.requestedProtocols, function(val) {
        return mutator_.mutateString(val, false);
      });
    }
    if (mutator_.chooseMutateField()) {
      this.firstPartyForCookies = mutator_.mutateStruct(this.firstPartyForCookies, url.mojom.Url, false);
    }
    if (mutator_.chooseMutateField()) {
      this.additionalHeaders = mutator_.mutateArray(this.additionalHeaders, function(val) {
        return mutator_.mutateStruct(val, network.mojom.HttpHeader, false);
      });
    }
    if (mutator_.chooseMutateField()) {
      this.client = mutator_.mutateInterface(this.client, "network.mojom.WebSocketClient", false);
    }
    return this;
  };
  WebSocket_AddChannelRequest_Params.prototype.getHandleDeps = function() {
    var handles = [];
    if (this.client !== null) {
      Array.prototype.push.apply(handles, ["network.mojom.WebSocketClientPtr"]);
    }
    return handles;
  };

  WebSocket_AddChannelRequest_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocket_AddChannelRequest_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    this.client = handles[idx++];;
    return idx;
  };

  WebSocket_AddChannelRequest_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 48}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocket_AddChannelRequest_Params.url
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 0, url$.Url, false);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocket_AddChannelRequest_Params.requestedProtocols
    err = messageValidator.validateArrayPointer(offset + codec.kStructHeaderSize + 8, 8, codec.String, false, [0, 0], 0);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocket_AddChannelRequest_Params.firstPartyForCookies
    err = messageValidator.validateStructPointer(offset + codec.kStructHeaderSize + 16, url$.Url, false);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocket_AddChannelRequest_Params.additionalHeaders
    err = messageValidator.validateArrayPointer(offset + codec.kStructHeaderSize + 24, 8, new codec.PointerTo(HttpHeader), false, [0], 0);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocket_AddChannelRequest_Params.client
    err = messageValidator.validateInterface(offset + codec.kStructHeaderSize + 32, false);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocket_AddChannelRequest_Params.encodedSize = codec.kStructHeaderSize + 40;

  WebSocket_AddChannelRequest_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocket_AddChannelRequest_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.url = decoder.decodeStructPointer(url$.Url);
    val.requestedProtocols = decoder.decodeArrayPointer(codec.String);
    val.firstPartyForCookies = decoder.decodeStructPointer(url$.Url);
    val.additionalHeaders = decoder.decodeArrayPointer(new codec.PointerTo(HttpHeader));
    val.client = decoder.decodeStruct(new codec.Interface(WebSocketClientPtr));
    return val;
  };

  WebSocket_AddChannelRequest_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocket_AddChannelRequest_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStructPointer(url$.Url, val.url);
    encoder.encodeArrayPointer(codec.String, val.requestedProtocols);
    encoder.encodeStructPointer(url$.Url, val.firstPartyForCookies);
    encoder.encodeArrayPointer(new codec.PointerTo(HttpHeader), val.additionalHeaders);
    encoder.encodeStruct(new codec.Interface(WebSocketClientPtr), val.client);
  };
  function WebSocket_SendFrame_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocket_SendFrame_Params.prototype.initDefaults_ = function() {
    this.fin = false;
    this.type = 0;
    this.data = null;
  };
  WebSocket_SendFrame_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocket_SendFrame_Params.generate = function(generator_) {
    var generated = new WebSocket_SendFrame_Params;
    generated.fin = generator_.generateBool();
    generated.type = generator_.generateEnum(0, 2);
    generated.data = generator_.generateArray(function() {
      return generator_.generateUint8();
    });
    return generated;
  };

  WebSocket_SendFrame_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.fin = mutator_.mutateBool(this.fin);
    }
    if (mutator_.chooseMutateField()) {
      this.type = mutator_.mutateEnum(this.type, 0, 2);
    }
    if (mutator_.chooseMutateField()) {
      this.data = mutator_.mutateArray(this.data, function(val) {
        return mutator_.mutateUint8(val);
      });
    }
    return this;
  };
  WebSocket_SendFrame_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocket_SendFrame_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocket_SendFrame_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocket_SendFrame_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 24}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;



    // validate WebSocket_SendFrame_Params.type
    err = messageValidator.validateEnum(offset + codec.kStructHeaderSize + 4, WebSocketMessageType);
    if (err !== validator.validationError.NONE)
        return err;


    // validate WebSocket_SendFrame_Params.data
    err = messageValidator.validateArrayPointer(offset + codec.kStructHeaderSize + 8, 1, codec.Uint8, false, [0], 0);
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocket_SendFrame_Params.encodedSize = codec.kStructHeaderSize + 16;

  WebSocket_SendFrame_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocket_SendFrame_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    packed = decoder.readUint8();
    val.fin = (packed >> 0) & 1 ? true : false;
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    val.type = decoder.decodeStruct(codec.Int32);
    val.data = decoder.decodeArrayPointer(codec.Uint8);
    return val;
  };

  WebSocket_SendFrame_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocket_SendFrame_Params.encodedSize);
    encoder.writeUint32(0);
    packed = 0;
    packed |= (val.fin & 1) << 0
    encoder.writeUint8(packed);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.encodeStruct(codec.Int32, val.type);
    encoder.encodeArrayPointer(codec.Uint8, val.data);
  };
  function WebSocket_SendFlowControl_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocket_SendFlowControl_Params.prototype.initDefaults_ = function() {
    this.quota = 0;
  };
  WebSocket_SendFlowControl_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocket_SendFlowControl_Params.generate = function(generator_) {
    var generated = new WebSocket_SendFlowControl_Params;
    generated.quota = generator_.generateInt64();
    return generated;
  };

  WebSocket_SendFlowControl_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.quota = mutator_.mutateInt64(this.quota);
    }
    return this;
  };
  WebSocket_SendFlowControl_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocket_SendFlowControl_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocket_SendFlowControl_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocket_SendFlowControl_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 16}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;


    return validator.validationError.NONE;
  };

  WebSocket_SendFlowControl_Params.encodedSize = codec.kStructHeaderSize + 8;

  WebSocket_SendFlowControl_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocket_SendFlowControl_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.quota = decoder.decodeStruct(codec.Int64);
    return val;
  };

  WebSocket_SendFlowControl_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocket_SendFlowControl_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.Int64, val.quota);
  };
  function WebSocket_StartClosingHandshake_Params(values) {
    this.initDefaults_();
    this.initFields_(values);
  }


  WebSocket_StartClosingHandshake_Params.prototype.initDefaults_ = function() {
    this.code = 0;
    this.reason = null;
  };
  WebSocket_StartClosingHandshake_Params.prototype.initFields_ = function(fields) {
    for(var field in fields) {
        if (this.hasOwnProperty(field))
          this[field] = fields[field];
    }
  };
  WebSocket_StartClosingHandshake_Params.generate = function(generator_) {
    var generated = new WebSocket_StartClosingHandshake_Params;
    generated.code = generator_.generateUint16();
    generated.reason = generator_.generateString(false);
    return generated;
  };

  WebSocket_StartClosingHandshake_Params.prototype.mutate = function(mutator_) {
    if (mutator_.chooseMutateField()) {
      this.code = mutator_.mutateUint16(this.code);
    }
    if (mutator_.chooseMutateField()) {
      this.reason = mutator_.mutateString(this.reason, false);
    }
    return this;
  };
  WebSocket_StartClosingHandshake_Params.prototype.getHandleDeps = function() {
    var handles = [];
    return handles;
  };

  WebSocket_StartClosingHandshake_Params.prototype.setHandles = function() {
    this.setHandlesInternal_(arguments, 0);
  };
  WebSocket_StartClosingHandshake_Params.prototype.setHandlesInternal_ = function(handles, idx) {
    return idx;
  };

  WebSocket_StartClosingHandshake_Params.validate = function(messageValidator, offset) {
    var err;
    err = messageValidator.validateStructHeader(offset, codec.kStructHeaderSize);
    if (err !== validator.validationError.NONE)
        return err;

    var kVersionSizes = [
      {version: 0, numBytes: 24}
    ];
    err = messageValidator.validateStructVersion(offset, kVersionSizes);
    if (err !== validator.validationError.NONE)
        return err;



    // validate WebSocket_StartClosingHandshake_Params.reason
    err = messageValidator.validateStringPointer(offset + codec.kStructHeaderSize + 8, false)
    if (err !== validator.validationError.NONE)
        return err;

    return validator.validationError.NONE;
  };

  WebSocket_StartClosingHandshake_Params.encodedSize = codec.kStructHeaderSize + 16;

  WebSocket_StartClosingHandshake_Params.decode = function(decoder) {
    var packed;
    var val = new WebSocket_StartClosingHandshake_Params();
    var numberOfBytes = decoder.readUint32();
    var version = decoder.readUint32();
    val.code = decoder.decodeStruct(codec.Uint16);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    decoder.skip(1);
    val.reason = decoder.decodeStruct(codec.String);
    return val;
  };

  WebSocket_StartClosingHandshake_Params.encode = function(encoder, val) {
    var packed;
    encoder.writeUint32(WebSocket_StartClosingHandshake_Params.encodedSize);
    encoder.writeUint32(0);
    encoder.encodeStruct(codec.Uint16, val.code);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.skip(1);
    encoder.encodeStruct(codec.String, val.reason);
  };
  var kAuthenticationHandler_OnAuthRequired_Name = 1992787887;

  function AuthenticationHandlerPtr(handleOrPtrInfo) {
    this.ptr = new bindings.InterfacePtrController(AuthenticationHandler,
                                                   handleOrPtrInfo);
  }

  function AuthenticationHandlerAssociatedPtr(associatedInterfacePtrInfo) {
    this.ptr = new associatedBindings.AssociatedInterfacePtrController(
        AuthenticationHandler, associatedInterfacePtrInfo);
  }

  AuthenticationHandlerAssociatedPtr.prototype =
      Object.create(AuthenticationHandlerPtr.prototype);
  AuthenticationHandlerAssociatedPtr.prototype.constructor =
      AuthenticationHandlerAssociatedPtr;

  function AuthenticationHandlerProxy(receiver) {
    this.receiver_ = receiver;
  }
  AuthenticationHandlerPtr.prototype.onAuthRequired = function() {
    return AuthenticationHandlerProxy.prototype.onAuthRequired
        .apply(this.ptr.getProxy(), arguments);
  };

  AuthenticationHandlerProxy.prototype.onAuthRequired = function(info, headers, socketAddress) {
    var params_ = new AuthenticationHandler_OnAuthRequired_Params();
    params_.info = info;
    params_.headers = headers;
    params_.socketAddress = socketAddress;
    return new Promise(function(resolve, reject) {
      var builder = new codec.MessageV1Builder(
          kAuthenticationHandler_OnAuthRequired_Name,
          codec.align(AuthenticationHandler_OnAuthRequired_Params.encodedSize),
          codec.kMessageExpectsResponse, 0);
      builder.encodeStruct(AuthenticationHandler_OnAuthRequired_Params, params_);
      var message = builder.finish();
      this.receiver_.acceptAndExpectResponse(message).then(function(message) {
        var reader = new codec.MessageReader(message);
        var responseParams =
            reader.decodeStruct(AuthenticationHandler_OnAuthRequired_ResponseParams);
        resolve(responseParams);
      }).catch(function(result) {
        reject(Error("Connection error: " + result));
      });
    }.bind(this));
  };

  function AuthenticationHandlerStub(delegate) {
    this.delegate_ = delegate;
  }
  AuthenticationHandlerStub.prototype.onAuthRequired = function(info, headers, socketAddress) {
    return this.delegate_ && this.delegate_.onAuthRequired && this.delegate_.onAuthRequired(info, headers, socketAddress);
  }

  AuthenticationHandlerStub.prototype.accept = function(message) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    default:
      return false;
    }
  };

  AuthenticationHandlerStub.prototype.acceptWithResponder =
      function(message, responder) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    case kAuthenticationHandler_OnAuthRequired_Name:
      var params = reader.decodeStruct(AuthenticationHandler_OnAuthRequired_Params);
      this.onAuthRequired(params.info, params.headers, params.socketAddress).then(function(response) {
        var responseParams =
            new AuthenticationHandler_OnAuthRequired_ResponseParams();
        responseParams.credentials = response.credentials;
        var builder = new codec.MessageV1Builder(
            kAuthenticationHandler_OnAuthRequired_Name,
            codec.align(AuthenticationHandler_OnAuthRequired_ResponseParams.encodedSize),
            codec.kMessageIsResponse, reader.requestID);
        builder.encodeStruct(AuthenticationHandler_OnAuthRequired_ResponseParams,
                             responseParams);
        var message = builder.finish();
        responder.accept(message);
      });
      return true;
    default:
      return false;
    }
  };

  function validateAuthenticationHandlerRequest(messageValidator) {
    var message = messageValidator.message;
    var paramsClass = null;
    switch (message.getName()) {
      case kAuthenticationHandler_OnAuthRequired_Name:
        if (message.expectsResponse())
          paramsClass = AuthenticationHandler_OnAuthRequired_Params;
      break;
    }
    if (paramsClass === null)
      return validator.validationError.NONE;
    return paramsClass.validate(messageValidator, messageValidator.message.getHeaderNumBytes());
  }

  function validateAuthenticationHandlerResponse(messageValidator) {
   var message = messageValidator.message;
   var paramsClass = null;
   switch (message.getName()) {
      case kAuthenticationHandler_OnAuthRequired_Name:
        if (message.isResponse())
          paramsClass = AuthenticationHandler_OnAuthRequired_ResponseParams;
        break;
    }
    if (paramsClass === null)
      return validator.validationError.NONE;
    return paramsClass.validate(messageValidator, messageValidator.message.getHeaderNumBytes());
  }

  var AuthenticationHandler = {
    name: 'network.mojom.AuthenticationHandler',
    kVersion: 0,
    ptrClass: AuthenticationHandlerPtr,
    proxyClass: AuthenticationHandlerProxy,
    stubClass: AuthenticationHandlerStub,
    validateRequest: validateAuthenticationHandlerRequest,
    validateResponse: validateAuthenticationHandlerResponse,
    mojomId: 'services/network/public/mojom/websocket.mojom',
    fuzzMethods: {
      onAuthRequired: {
        params: AuthenticationHandler_OnAuthRequired_Params,
      },
    },
  };
  AuthenticationHandlerStub.prototype.validator = validateAuthenticationHandlerRequest;
  AuthenticationHandlerProxy.prototype.validator = validateAuthenticationHandlerResponse;
  var kWebSocketClient_OnFailChannel_Name = 134813282;
  var kWebSocketClient_OnStartOpeningHandshake_Name = 1816369133;
  var kWebSocketClient_OnFinishOpeningHandshake_Name = 684355944;
  var kWebSocketClient_OnAddChannelResponse_Name = 1185572792;
  var kWebSocketClient_OnDataFrame_Name = 1321768585;
  var kWebSocketClient_OnFlowControl_Name = 1158419286;
  var kWebSocketClient_OnDropChannel_Name = 422054349;
  var kWebSocketClient_OnClosingHandshake_Name = 1421054667;

  function WebSocketClientPtr(handleOrPtrInfo) {
    this.ptr = new bindings.InterfacePtrController(WebSocketClient,
                                                   handleOrPtrInfo);
  }

  function WebSocketClientAssociatedPtr(associatedInterfacePtrInfo) {
    this.ptr = new associatedBindings.AssociatedInterfacePtrController(
        WebSocketClient, associatedInterfacePtrInfo);
  }

  WebSocketClientAssociatedPtr.prototype =
      Object.create(WebSocketClientPtr.prototype);
  WebSocketClientAssociatedPtr.prototype.constructor =
      WebSocketClientAssociatedPtr;

  function WebSocketClientProxy(receiver) {
    this.receiver_ = receiver;
  }
  WebSocketClientPtr.prototype.onFailChannel = function() {
    return WebSocketClientProxy.prototype.onFailChannel
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketClientProxy.prototype.onFailChannel = function(reason) {
    var params_ = new WebSocketClient_OnFailChannel_Params();
    params_.reason = reason;
    var builder = new codec.MessageV0Builder(
        kWebSocketClient_OnFailChannel_Name,
        codec.align(WebSocketClient_OnFailChannel_Params.encodedSize));
    builder.encodeStruct(WebSocketClient_OnFailChannel_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketClientPtr.prototype.onStartOpeningHandshake = function() {
    return WebSocketClientProxy.prototype.onStartOpeningHandshake
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketClientProxy.prototype.onStartOpeningHandshake = function(request) {
    var params_ = new WebSocketClient_OnStartOpeningHandshake_Params();
    params_.request = request;
    var builder = new codec.MessageV0Builder(
        kWebSocketClient_OnStartOpeningHandshake_Name,
        codec.align(WebSocketClient_OnStartOpeningHandshake_Params.encodedSize));
    builder.encodeStruct(WebSocketClient_OnStartOpeningHandshake_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketClientPtr.prototype.onFinishOpeningHandshake = function() {
    return WebSocketClientProxy.prototype.onFinishOpeningHandshake
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketClientProxy.prototype.onFinishOpeningHandshake = function(response) {
    var params_ = new WebSocketClient_OnFinishOpeningHandshake_Params();
    params_.response = response;
    var builder = new codec.MessageV0Builder(
        kWebSocketClient_OnFinishOpeningHandshake_Name,
        codec.align(WebSocketClient_OnFinishOpeningHandshake_Params.encodedSize));
    builder.encodeStruct(WebSocketClient_OnFinishOpeningHandshake_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketClientPtr.prototype.onAddChannelResponse = function() {
    return WebSocketClientProxy.prototype.onAddChannelResponse
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketClientProxy.prototype.onAddChannelResponse = function(selectedProtocol, extensions) {
    var params_ = new WebSocketClient_OnAddChannelResponse_Params();
    params_.selectedProtocol = selectedProtocol;
    params_.extensions = extensions;
    var builder = new codec.MessageV0Builder(
        kWebSocketClient_OnAddChannelResponse_Name,
        codec.align(WebSocketClient_OnAddChannelResponse_Params.encodedSize));
    builder.encodeStruct(WebSocketClient_OnAddChannelResponse_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketClientPtr.prototype.onDataFrame = function() {
    return WebSocketClientProxy.prototype.onDataFrame
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketClientProxy.prototype.onDataFrame = function(fin, type, data) {
    var params_ = new WebSocketClient_OnDataFrame_Params();
    params_.fin = fin;
    params_.type = type;
    params_.data = data;
    var builder = new codec.MessageV0Builder(
        kWebSocketClient_OnDataFrame_Name,
        codec.align(WebSocketClient_OnDataFrame_Params.encodedSize));
    builder.encodeStruct(WebSocketClient_OnDataFrame_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketClientPtr.prototype.onFlowControl = function() {
    return WebSocketClientProxy.prototype.onFlowControl
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketClientProxy.prototype.onFlowControl = function(quota) {
    var params_ = new WebSocketClient_OnFlowControl_Params();
    params_.quota = quota;
    var builder = new codec.MessageV0Builder(
        kWebSocketClient_OnFlowControl_Name,
        codec.align(WebSocketClient_OnFlowControl_Params.encodedSize));
    builder.encodeStruct(WebSocketClient_OnFlowControl_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketClientPtr.prototype.onDropChannel = function() {
    return WebSocketClientProxy.prototype.onDropChannel
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketClientProxy.prototype.onDropChannel = function(wasClean, code, reason) {
    var params_ = new WebSocketClient_OnDropChannel_Params();
    params_.wasClean = wasClean;
    params_.code = code;
    params_.reason = reason;
    var builder = new codec.MessageV0Builder(
        kWebSocketClient_OnDropChannel_Name,
        codec.align(WebSocketClient_OnDropChannel_Params.encodedSize));
    builder.encodeStruct(WebSocketClient_OnDropChannel_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketClientPtr.prototype.onClosingHandshake = function() {
    return WebSocketClientProxy.prototype.onClosingHandshake
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketClientProxy.prototype.onClosingHandshake = function() {
    var params_ = new WebSocketClient_OnClosingHandshake_Params();
    var builder = new codec.MessageV0Builder(
        kWebSocketClient_OnClosingHandshake_Name,
        codec.align(WebSocketClient_OnClosingHandshake_Params.encodedSize));
    builder.encodeStruct(WebSocketClient_OnClosingHandshake_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };

  function WebSocketClientStub(delegate) {
    this.delegate_ = delegate;
  }
  WebSocketClientStub.prototype.onFailChannel = function(reason) {
    return this.delegate_ && this.delegate_.onFailChannel && this.delegate_.onFailChannel(reason);
  }
  WebSocketClientStub.prototype.onStartOpeningHandshake = function(request) {
    return this.delegate_ && this.delegate_.onStartOpeningHandshake && this.delegate_.onStartOpeningHandshake(request);
  }
  WebSocketClientStub.prototype.onFinishOpeningHandshake = function(response) {
    return this.delegate_ && this.delegate_.onFinishOpeningHandshake && this.delegate_.onFinishOpeningHandshake(response);
  }
  WebSocketClientStub.prototype.onAddChannelResponse = function(selectedProtocol, extensions) {
    return this.delegate_ && this.delegate_.onAddChannelResponse && this.delegate_.onAddChannelResponse(selectedProtocol, extensions);
  }
  WebSocketClientStub.prototype.onDataFrame = function(fin, type, data) {
    return this.delegate_ && this.delegate_.onDataFrame && this.delegate_.onDataFrame(fin, type, data);
  }
  WebSocketClientStub.prototype.onFlowControl = function(quota) {
    return this.delegate_ && this.delegate_.onFlowControl && this.delegate_.onFlowControl(quota);
  }
  WebSocketClientStub.prototype.onDropChannel = function(wasClean, code, reason) {
    return this.delegate_ && this.delegate_.onDropChannel && this.delegate_.onDropChannel(wasClean, code, reason);
  }
  WebSocketClientStub.prototype.onClosingHandshake = function() {
    return this.delegate_ && this.delegate_.onClosingHandshake && this.delegate_.onClosingHandshake();
  }

  WebSocketClientStub.prototype.accept = function(message) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    case kWebSocketClient_OnFailChannel_Name:
      var params = reader.decodeStruct(WebSocketClient_OnFailChannel_Params);
      this.onFailChannel(params.reason);
      return true;
    case kWebSocketClient_OnStartOpeningHandshake_Name:
      var params = reader.decodeStruct(WebSocketClient_OnStartOpeningHandshake_Params);
      this.onStartOpeningHandshake(params.request);
      return true;
    case kWebSocketClient_OnFinishOpeningHandshake_Name:
      var params = reader.decodeStruct(WebSocketClient_OnFinishOpeningHandshake_Params);
      this.onFinishOpeningHandshake(params.response);
      return true;
    case kWebSocketClient_OnAddChannelResponse_Name:
      var params = reader.decodeStruct(WebSocketClient_OnAddChannelResponse_Params);
      this.onAddChannelResponse(params.selectedProtocol, params.extensions);
      return true;
    case kWebSocketClient_OnDataFrame_Name:
      var params = reader.decodeStruct(WebSocketClient_OnDataFrame_Params);
      this.onDataFrame(params.fin, params.type, params.data);
      return true;
    case kWebSocketClient_OnFlowControl_Name:
      var params = reader.decodeStruct(WebSocketClient_OnFlowControl_Params);
      this.onFlowControl(params.quota);
      return true;
    case kWebSocketClient_OnDropChannel_Name:
      var params = reader.decodeStruct(WebSocketClient_OnDropChannel_Params);
      this.onDropChannel(params.wasClean, params.code, params.reason);
      return true;
    case kWebSocketClient_OnClosingHandshake_Name:
      var params = reader.decodeStruct(WebSocketClient_OnClosingHandshake_Params);
      this.onClosingHandshake();
      return true;
    default:
      return false;
    }
  };

  WebSocketClientStub.prototype.acceptWithResponder =
      function(message, responder) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    default:
      return false;
    }
  };

  function validateWebSocketClientRequest(messageValidator) {
    var message = messageValidator.message;
    var paramsClass = null;
    switch (message.getName()) {
      case kWebSocketClient_OnFailChannel_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocketClient_OnFailChannel_Params;
      break;
      case kWebSocketClient_OnStartOpeningHandshake_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocketClient_OnStartOpeningHandshake_Params;
      break;
      case kWebSocketClient_OnFinishOpeningHandshake_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocketClient_OnFinishOpeningHandshake_Params;
      break;
      case kWebSocketClient_OnAddChannelResponse_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocketClient_OnAddChannelResponse_Params;
      break;
      case kWebSocketClient_OnDataFrame_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocketClient_OnDataFrame_Params;
      break;
      case kWebSocketClient_OnFlowControl_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocketClient_OnFlowControl_Params;
      break;
      case kWebSocketClient_OnDropChannel_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocketClient_OnDropChannel_Params;
      break;
      case kWebSocketClient_OnClosingHandshake_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocketClient_OnClosingHandshake_Params;
      break;
    }
    if (paramsClass === null)
      return validator.validationError.NONE;
    return paramsClass.validate(messageValidator, messageValidator.message.getHeaderNumBytes());
  }

  function validateWebSocketClientResponse(messageValidator) {
    return validator.validationError.NONE;
  }

  var WebSocketClient = {
    name: 'network.mojom.WebSocketClient',
    kVersion: 0,
    ptrClass: WebSocketClientPtr,
    proxyClass: WebSocketClientProxy,
    stubClass: WebSocketClientStub,
    validateRequest: validateWebSocketClientRequest,
    validateResponse: null,
    mojomId: 'services/network/public/mojom/websocket.mojom',
    fuzzMethods: {
      onFailChannel: {
        params: WebSocketClient_OnFailChannel_Params,
      },
      onStartOpeningHandshake: {
        params: WebSocketClient_OnStartOpeningHandshake_Params,
      },
      onFinishOpeningHandshake: {
        params: WebSocketClient_OnFinishOpeningHandshake_Params,
      },
      onAddChannelResponse: {
        params: WebSocketClient_OnAddChannelResponse_Params,
      },
      onDataFrame: {
        params: WebSocketClient_OnDataFrame_Params,
      },
      onFlowControl: {
        params: WebSocketClient_OnFlowControl_Params,
      },
      onDropChannel: {
        params: WebSocketClient_OnDropChannel_Params,
      },
      onClosingHandshake: {
        params: WebSocketClient_OnClosingHandshake_Params,
      },
    },
  };
  WebSocketClientStub.prototype.validator = validateWebSocketClientRequest;
  WebSocketClientProxy.prototype.validator = null;
  var kWebSocket_AddChannelRequest_Name = 1113330277;
  var kWebSocket_SendFrame_Name = 382002286;
  var kWebSocket_SendFlowControl_Name = 426112676;
  var kWebSocket_StartClosingHandshake_Name = 527387582;

  function WebSocketPtr(handleOrPtrInfo) {
    this.ptr = new bindings.InterfacePtrController(WebSocket,
                                                   handleOrPtrInfo);
  }

  function WebSocketAssociatedPtr(associatedInterfacePtrInfo) {
    this.ptr = new associatedBindings.AssociatedInterfacePtrController(
        WebSocket, associatedInterfacePtrInfo);
  }

  WebSocketAssociatedPtr.prototype =
      Object.create(WebSocketPtr.prototype);
  WebSocketAssociatedPtr.prototype.constructor =
      WebSocketAssociatedPtr;

  function WebSocketProxy(receiver) {
    this.receiver_ = receiver;
  }
  WebSocketPtr.prototype.addChannelRequest = function() {
    return WebSocketProxy.prototype.addChannelRequest
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketProxy.prototype.addChannelRequest = function(url, requestedProtocols, firstPartyForCookies, additionalHeaders, client) {
    var params_ = new WebSocket_AddChannelRequest_Params();
    params_.url = url;
    params_.requestedProtocols = requestedProtocols;
    params_.firstPartyForCookies = firstPartyForCookies;
    params_.additionalHeaders = additionalHeaders;
    params_.client = client;
    var builder = new codec.MessageV0Builder(
        kWebSocket_AddChannelRequest_Name,
        codec.align(WebSocket_AddChannelRequest_Params.encodedSize));
    builder.encodeStruct(WebSocket_AddChannelRequest_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketPtr.prototype.sendFrame = function() {
    return WebSocketProxy.prototype.sendFrame
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketProxy.prototype.sendFrame = function(fin, type, data) {
    var params_ = new WebSocket_SendFrame_Params();
    params_.fin = fin;
    params_.type = type;
    params_.data = data;
    var builder = new codec.MessageV0Builder(
        kWebSocket_SendFrame_Name,
        codec.align(WebSocket_SendFrame_Params.encodedSize));
    builder.encodeStruct(WebSocket_SendFrame_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketPtr.prototype.sendFlowControl = function() {
    return WebSocketProxy.prototype.sendFlowControl
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketProxy.prototype.sendFlowControl = function(quota) {
    var params_ = new WebSocket_SendFlowControl_Params();
    params_.quota = quota;
    var builder = new codec.MessageV0Builder(
        kWebSocket_SendFlowControl_Name,
        codec.align(WebSocket_SendFlowControl_Params.encodedSize));
    builder.encodeStruct(WebSocket_SendFlowControl_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };
  WebSocketPtr.prototype.startClosingHandshake = function() {
    return WebSocketProxy.prototype.startClosingHandshake
        .apply(this.ptr.getProxy(), arguments);
  };

  WebSocketProxy.prototype.startClosingHandshake = function(code, reason) {
    var params_ = new WebSocket_StartClosingHandshake_Params();
    params_.code = code;
    params_.reason = reason;
    var builder = new codec.MessageV0Builder(
        kWebSocket_StartClosingHandshake_Name,
        codec.align(WebSocket_StartClosingHandshake_Params.encodedSize));
    builder.encodeStruct(WebSocket_StartClosingHandshake_Params, params_);
    var message = builder.finish();
    this.receiver_.accept(message);
  };

  function WebSocketStub(delegate) {
    this.delegate_ = delegate;
  }
  WebSocketStub.prototype.addChannelRequest = function(url, requestedProtocols, firstPartyForCookies, additionalHeaders, client) {
    return this.delegate_ && this.delegate_.addChannelRequest && this.delegate_.addChannelRequest(url, requestedProtocols, firstPartyForCookies, additionalHeaders, client);
  }
  WebSocketStub.prototype.sendFrame = function(fin, type, data) {
    return this.delegate_ && this.delegate_.sendFrame && this.delegate_.sendFrame(fin, type, data);
  }
  WebSocketStub.prototype.sendFlowControl = function(quota) {
    return this.delegate_ && this.delegate_.sendFlowControl && this.delegate_.sendFlowControl(quota);
  }
  WebSocketStub.prototype.startClosingHandshake = function(code, reason) {
    return this.delegate_ && this.delegate_.startClosingHandshake && this.delegate_.startClosingHandshake(code, reason);
  }

  WebSocketStub.prototype.accept = function(message) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    case kWebSocket_AddChannelRequest_Name:
      var params = reader.decodeStruct(WebSocket_AddChannelRequest_Params);
      this.addChannelRequest(params.url, params.requestedProtocols, params.firstPartyForCookies, params.additionalHeaders, params.client);
      return true;
    case kWebSocket_SendFrame_Name:
      var params = reader.decodeStruct(WebSocket_SendFrame_Params);
      this.sendFrame(params.fin, params.type, params.data);
      return true;
    case kWebSocket_SendFlowControl_Name:
      var params = reader.decodeStruct(WebSocket_SendFlowControl_Params);
      this.sendFlowControl(params.quota);
      return true;
    case kWebSocket_StartClosingHandshake_Name:
      var params = reader.decodeStruct(WebSocket_StartClosingHandshake_Params);
      this.startClosingHandshake(params.code, params.reason);
      return true;
    default:
      return false;
    }
  };

  WebSocketStub.prototype.acceptWithResponder =
      function(message, responder) {
    var reader = new codec.MessageReader(message);
    switch (reader.messageName) {
    default:
      return false;
    }
  };

  function validateWebSocketRequest(messageValidator) {
    var message = messageValidator.message;
    var paramsClass = null;
    switch (message.getName()) {
      case kWebSocket_AddChannelRequest_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocket_AddChannelRequest_Params;
      break;
      case kWebSocket_SendFrame_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocket_SendFrame_Params;
      break;
      case kWebSocket_SendFlowControl_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocket_SendFlowControl_Params;
      break;
      case kWebSocket_StartClosingHandshake_Name:
        if (!message.expectsResponse() && !message.isResponse())
          paramsClass = WebSocket_StartClosingHandshake_Params;
      break;
    }
    if (paramsClass === null)
      return validator.validationError.NONE;
    return paramsClass.validate(messageValidator, messageValidator.message.getHeaderNumBytes());
  }

  function validateWebSocketResponse(messageValidator) {
    return validator.validationError.NONE;
  }

  var WebSocket = {
    name: 'network.mojom.WebSocket',
    kVersion: 0,
    ptrClass: WebSocketPtr,
    proxyClass: WebSocketProxy,
    stubClass: WebSocketStub,
    validateRequest: validateWebSocketRequest,
    validateResponse: null,
    mojomId: 'services/network/public/mojom/websocket.mojom',
    fuzzMethods: {
      addChannelRequest: {
        params: WebSocket_AddChannelRequest_Params,
      },
      sendFrame: {
        params: WebSocket_SendFrame_Params,
      },
      sendFlowControl: {
        params: WebSocket_SendFlowControl_Params,
      },
      startClosingHandshake: {
        params: WebSocket_StartClosingHandshake_Params,
      },
    },
  };
  WebSocket.kInsufficientResources = 1,
  WebSocketStub.prototype.validator = validateWebSocketRequest;
  WebSocketProxy.prototype.validator = null;
  exports.WebSocketMessageType = WebSocketMessageType;
  exports.HttpHeader = HttpHeader;
  exports.WebSocketHandshakeRequest = WebSocketHandshakeRequest;
  exports.WebSocketHandshakeResponse = WebSocketHandshakeResponse;
  exports.AuthenticationHandler = AuthenticationHandler;
  exports.AuthenticationHandlerPtr = AuthenticationHandlerPtr;
  exports.AuthenticationHandlerAssociatedPtr = AuthenticationHandlerAssociatedPtr;
  exports.WebSocketClient = WebSocketClient;
  exports.WebSocketClientPtr = WebSocketClientPtr;
  exports.WebSocketClientAssociatedPtr = WebSocketClientAssociatedPtr;
  exports.WebSocket = WebSocket;
  exports.WebSocketPtr = WebSocketPtr;
  exports.WebSocketAssociatedPtr = WebSocketAssociatedPtr;
})();