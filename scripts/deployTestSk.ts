import { compile, NetworkProvider } from '@ton/blueprint';
import { toNano } from '@ton/core';
import { TestSk } from '../wrappers/TestSk';

export async function run(provider: NetworkProvider) {
  const testSk = provider.open(TestSk.createFromConfig({ value: 42 }, await compile('TestSk')));

  await testSk.sendDeploy(provider.sender(), toNano('0.05'));

  await provider.waitForDeploy(testSk.address);

  // run methods on `testSk`
}
