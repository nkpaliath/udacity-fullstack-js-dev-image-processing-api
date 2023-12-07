import { getThumbnailImage } from '../../utilities/imageProcessing';

describe('Process image and return resized image', () => {
  it('returns the path of resized image when original image, width and height is given', async () => {
    const resizedImagePath = await getThumbnailImage('santamonica.jpg', 48, 48);
    expect(resizedImagePath).toBeInstanceOf(String);
    expect(resizedImagePath as string).toContain('santamonica_48_48.jpg');
  });

  it('throws error when the original image is not found', async () => {
    const resizedImagePath = await getThumbnailImage('newyork.jpeg', 48, 48);

    expect(resizedImagePath).toBeInstanceOf(Error);
    expect((resizedImagePath as Error).message).toContain(
      'no such file or directory'
    );
  });
});
