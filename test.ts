import { createPromiseClient } from '@connectrpc/connect';
import { TestService } from 'src/proto/gen/test/test_connect';
import { createConnectTransport } from '@connectrpc/connect-node';
import { createConnectTransport as createConnectTransportWeb } from '@connectrpc/connect-web';

const transportConnectWeb = createConnectTransportWeb({
  baseUrl: 'http://localhost:3001',
});

const transportConnect = createConnectTransport({
  baseUrl: 'http://localhost:3001',
  httpVersion: '1.1',
});

const transportConnect2 = createConnectTransport({
  baseUrl: 'http://localhost:3000',
  httpVersion: '2',
});

async function main() {
  let client, res;

  try {
    client = createPromiseClient(TestService, transportConnectWeb);
    res = await client.doTest({ id: 1 });
    console.log(res);
  } catch (e) {
    console.error('error web');
  }

  try {
    client = createPromiseClient(TestService, transportConnect);
    res = await client.doTest({ id: 2 });
    console.log(res);
  } catch (e) {
    console.error('error 1.1');
  }

  try {
    client = createPromiseClient(TestService, transportConnect2);
    res = await client.doTest({ id: 3 });
    console.log(res);
  } catch (e) {
    console.error('error 2');
  }
}
void main();
