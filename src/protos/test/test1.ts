/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "test1";

export interface DoTestRequest {
  id: number;
}

export interface DoTestResponse {
  name: string;
}

export const TEST1_PACKAGE_NAME = "test1";

export interface Test1ServiceClient {
  doTest(request: DoTestRequest, metadata?: Metadata): Observable<DoTestResponse>;
}

export interface Test1ServiceController {
  doTest(
    request: DoTestRequest,
    metadata?: Metadata,
  ): Promise<DoTestResponse> | Observable<DoTestResponse> | DoTestResponse;
}

export function Test1ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["doTest"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("Test1Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("Test1Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TEST1_SERVICE_NAME = "Test1Service";
