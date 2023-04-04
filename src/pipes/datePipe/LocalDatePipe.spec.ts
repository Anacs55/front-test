import { DatePipePipe } from './LocalDatePipe';

describe('DatePipePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipePipe();
    expect(pipe).toBeTruthy();
  });
});
