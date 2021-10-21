import { MinutesAsHourStampPipe } from './minutes-as-hour-stamp.pipe';

describe('MinutesAsHourStampPipe', () => {
  it('create an instance', () => {
    const pipe = new MinutesAsHourStampPipe();
    expect(pipe).toBeTruthy();
  });
});
