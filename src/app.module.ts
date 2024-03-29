import { Module } from '@nestjs/common';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcClientOptions } from './grpc-client.options';
// import { TestModule } from './test/test.module';

@Module({
  imports: [GrpcReflectionModule.register(grpcClientOptions)],
})
export class AppModule {}
