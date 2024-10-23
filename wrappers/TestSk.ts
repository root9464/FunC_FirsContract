import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TestSkConfig = {
  value: number;
};

export function testSkConfigToCell(config: TestSkConfig): Cell {
  return beginCell().storeUint(config.value, 64).endCell();
}

export class TestSk implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell },
  ) {}

  static createFromAddress(address: Address) {
    return new TestSk(address);
  }

  static createFromConfig(config: TestSkConfig, code: Cell, workchain = 0) {
    const data = testSkConfigToCell(config);
    const init = { code, data };
    return new TestSk(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async sendFigna(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeUint(69, 16).storeUint(999, 64).endCell(),
    });
  }
}
