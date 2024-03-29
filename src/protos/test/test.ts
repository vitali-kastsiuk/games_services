/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "test";

export interface DoTestRequest {
  id: number;
}

export interface DoTestResponse {
  name: string;
}

export const TEST_PACKAGE_NAME = "test";

export interface TestServiceClient {
  doTest(request: DoTestRequest, metadata?: Metadata): Observable<DoTestResponse>;
}

export interface TestServiceController {
  doTest(
    request: DoTestRequest,
    metadata?: Metadata,
  ): Promise<DoTestResponse> | Observable<DoTestResponse> | DoTestResponse;
}

export function TestServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["doTest"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TestService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TestService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TEST_SERVICE_NAME = "TestService";
