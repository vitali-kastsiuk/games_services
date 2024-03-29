import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';

export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    package: ['test', 'test1'],
    protoPath: ['test/test.proto', 'test/test1.proto'].map((f) =>
      join(__dirname, '../proto/', f),
    ),
    loader: {
      oneofs: true,
      keepCase: true,
      includeDirs: [join(__dirname, '../proto/')],
    },
  },
});
