import { NetworkProvider } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { TestSk } from '../wrappers/TestSk';

export async function run(provider: NetworkProvider) {
  const testSk = provider.open(TestSk.createFromAddress(Address.parse('EQBBoexgQmNYL1rppLc0v8iuDBsNL4sKCps_nDscJGta8VSL')));

  await testSk.sendFigna(provider.sender(), toNano('0.05'));

  // run methods on `testSk`
}
