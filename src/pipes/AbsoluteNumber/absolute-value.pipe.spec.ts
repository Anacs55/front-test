import { AbsoluteValuePipe } from './absolute-value.pipe';

describe('AbsoluteValue', () => {
  it('create an instance', () => {
    const pipe = new AbsoluteValuePipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(-1)).toBe(1);
  });
});
