import { FallbackUrlPipe } from './fallback-url.pipe';

describe('FallbackUrlPipe', () => {
  let pipe: FallbackUrlPipe;
  const fallback = 'https://via.placeholder.com/150';

  beforeEach(() => {
    pipe = new FallbackUrlPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should force https for the value', () => {
    const value = 'http://lorem.com';
    const url = pipe.transform(value, fallback, true);
    expect(url).toBe('https://lorem.com');
  });

  it('should force https for the fallback', () => {
    const value = '';
    const fallback = 'http://via.placeholder.com/150';
    const url = pipe.transform(value, fallback, true);
    expect(url).toBe('https://via.placeholder.com/150');
  });

  it('should return value if value is not empty', () => {
    const value = 'https://lorem.com';
    const url = pipe.transform(value, fallback);
    expect(url).toBe(value);
  });

  it('should return fallback url if value is empty', () => {
    const value = '';
    const url = pipe.transform(value, fallback);
    expect(url).toBe(fallback);
  });
});
