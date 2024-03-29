import type { ConnectRouter } from '@connectrpc/connect';
import { TestService } from 'src/proto/gen/test/test_connect';

export default (router: ConnectRouter) =>
  router.service(TestService, {
    async doTest(req) {
      return {
        name: String(req.id),
      };
    },
  });
