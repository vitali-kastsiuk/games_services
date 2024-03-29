import { Controller } from '@nestjs/common';
import {
  DoTestRequest,
  DoTestResponse,
  TestServiceController,
  TestServiceControllerMethods,
} from 'src/protos/test/test';

@Controller('test')
@TestServiceControllerMethods()
export class TestController implements TestServiceController {
  doTest(data: DoTestRequest): DoTestResponse {
    return { name: String(data.id) };
  }
}
