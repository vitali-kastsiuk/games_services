import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';

export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3002',
    package: ['test'],
    protoPath: ['test/test.proto'].map((f) =>
      join(__dirname, '../proto/source/', f),
    ),
    loader: {
      oneofs: true,
      keepCase: true,
      includeDirs: [join(__dirname, '../proto/source')],
    },
  },
});
