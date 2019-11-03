const loader = require('@grpc/proto-loader')
const grpc = require('grpc')
const proto = loader.loadSync('ping_pong.proto')
const pingPongProto = grpc.loadPackageDefinition(proto)
const server = new grpc.Server()

server.addService(pingPongProto.pingpong.PingPongService.service, {
  pingPong: function(call,callback) {
    console.log("Request")
    return callback(null,{pong:"Pong"})
  }
});

server.bind('localhost:8080',grpc.ServerCredentials.createInsecure());
server.start();

