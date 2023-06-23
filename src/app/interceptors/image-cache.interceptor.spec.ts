import { TestBed } from '@angular/core/testing';

import { ImageCacheInterceptor } from './image-cache.interceptor';

describe('ImageCacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ImageCacheInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ImageCacheInterceptor = TestBed.inject(ImageCacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
