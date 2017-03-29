import {start} from './proxy';

afterEach(() => {
  jest.clearAllMocks();
});

describe('start', () => {
  test('event listener is added for message events', () => {
    window.addEventListener = jest.fn();
    start();
    expect(window.addEventListener).toHaveBeenCalledWith('message', jasmine.any(Function), false);
  });
});
