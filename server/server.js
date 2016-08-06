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

var obj = new Person({ // Instantiate and inflate new object.
    name: 'emran',
    age: 21
});

/////////////// Send object through socket:
var http = require('http');
var app = http.createServer(function ejecute(request, response) {});
var io = require('socket.io').listen(app);

io.on('connection', function (socket) {
    socket.on('message', function (data) {
        console.log("recieved data:");
        console.log(Person.decode(data));
    });

    socket.emit('message', obj.toBuffer()); // Sends the object in protobuf protocol.
});

app.listen(3000);
