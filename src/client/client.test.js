import {create, XDomainRequestClient} from './client';

afterEach(() => {
  jest.clearAllMocks();
});

describe('create', () => {
  test('return type is XDomainRequestClient', () => {
    let client = create();
    expect(client instanceof XDomainRequestClient).toBe(true);
  });
});
