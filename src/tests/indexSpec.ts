import supertest from 'supertest';
import { app } from '..';

const request = supertest(app);
const endpointBaseUrl = '/api/images';

describe('Test image processing api', () => {
  it('gets the resized image', async () => {
    const response = await request.get(
      `${endpointBaseUrl}?filename=santamonica.jpg&width=48&height=48`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Buffer);
    expect(response.type).toBe('image/jpeg');
  });

  it('returns 400 error when filename and/or width and/or height is missing', async () => {
    let response = await request.get(`${endpointBaseUrl}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'missing filename, width and/or height in querystring'
    );

    response = await request.get(
      `${endpointBaseUrl}?filename=sanatamonica.jpg`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'missing filename, width and/or height in querystring'
    );

    response = await request.get(
      `${endpointBaseUrl}?filename=sanatamonica.jpg&width=48`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'missing filename, width and/or height in querystring'
    );
  });

  it('return 400 error when filename is blank or has extension other than jpg or jpeg', async () => {
    let response = await request.get(
      `${endpointBaseUrl}?filename=&width=48&height=48`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('filename is required');

    response = await request.get(
      `${endpointBaseUrl}?filename=santamonica.png&width=48&height=48`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('only jpg or jpeg files are supported');
  });

  it('return 400 error when width is blank or is not an integer greater than zero', async () => {
    let response = await request.get(
      `${endpointBaseUrl}?filename=santamonic.jpg&width=&height=48`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('width is required');

    response = await request.get(
      `${endpointBaseUrl}?filename=santamonica.jpg&width=0&height=48`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'width should be an integer value greater than 0'
    );

    response = await request.get(
      `${endpointBaseUrl}?filename=santamonica.jpg&width=40.50&height=48`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'width should be an integer value greater than 0'
    );
  });

  it('return 400 error when height is blank or is not an integer greater than zero', async () => {
    let response = await request.get(
      `${endpointBaseUrl}?filename=santamonica.jpg&width=48&height=`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('height is required');

    response = await request.get(
      `${endpointBaseUrl}?filename=santamonica.jpg&width=48&height=0`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'height should be an integer value greater than 0'
    );

    response = await request.get(
      `${endpointBaseUrl}?filename=santamonica.jpg&width=48&height=48.80`
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'height should be an integer value greater than 0'
    );
  });

  it('returns error 404 when image to be resized is not found', async () => {
    const response = await request.get(
      `${endpointBaseUrl}?filename=newyork.jpg&width=48&height=48`
    );
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('image not found');
  });
});
