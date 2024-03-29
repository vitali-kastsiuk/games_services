import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  CustomTransportStrategy,
  Server,
} from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';
import { FastifyInstance, fastify } from 'fastify';
import { fastifyConnectPlugin } from '@connectrpc/connect-fastify';
import routes from './test/test.connect';

class ConnectRPCServer extends Server implements CustomTransportStrategy {
  private server: FastifyInstance<any>;
  private opts: any;
  private port: number;

  constructor(port: number, opts: any = {}) {
    super();
    this.port = port;
    this.opts = opts;
  }

  async listen(callback: () => void) {
    this.server = fastify(this.opts);
    await this.server.register(fastifyConnectPlugin, {
      routes,
    });
    await this.server.listen({ port: this.port });

    callback();
  }

  close() {
    this.server?.close();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new ConnectRPCServer(3000, { http2: true }),
  });

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new ConnectRPCServer(3001),
  });

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
