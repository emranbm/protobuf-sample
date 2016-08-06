/**

@author: Mr. Coder

**/

var ProtoBuf = require("protobufjs"),
    ByteBuffer = ProtoBuf.ByteBuffer, // ProtoBuf.js uses and also exposes ByteBuffer.js
    Long = ProtoBuf.Long;

var builder = ProtoBuf.loadProtoFile("./../classes.proto"), // Creates the Builder
    protos = builder.build("protos"); // Returns just the 'protos' namespace if that's all we need

var Person = protos.Person; // Get class definition.

/////////////// Class loaded successfully.

var socket = require('socket.io-client')('http://localhost:3000'); // Connect to server side.
socket.on('connect', function () {
    console.log('connected');
});

socket.on('message', function (data) {

    var obj = Person.decode(data); // Person instance

    console.log('person recieved. age = ' + obj.age);
});

socket.on('disconnect', function () {
    console.log('disconnect');
});
