import { NextFunction, Request, Response } from 'express';
import { Image } from '../routes/api/images';

export const validateImageApi = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const queryStrings = req.query;

  let filename: string;
  let width: number, height: number;

  const hasFileName = Object.keys(queryStrings).includes('filename');
  const hasWidth = Object.keys(queryStrings).includes('width');
  const hasHeight = Object.keys(queryStrings).includes('height');

  if (!(hasFileName && hasWidth && hasHeight)) {
    return res
      .status(400)
      .json({ error: 'missing filename, width and/or height in querystring' });
  }

  const filenameQS = queryStrings['filename']!.toString().trim();

  if (filenameQS === '') {
    return res.status(400).json({ error: 'filename is required' });
  } else if (!(filenameQS.endsWith('.jpg') || filenameQS.endsWith('.jpeg'))) {
    return res
      .status(400)
      .json({ error: 'only jpg or jpeg files are supported' });
  } else if (
    filenameQS.split('.jpg')[0].trim() === '' ||
    filenameQS.split('.jpeg')[0].trim() === ''
  ) {
    return res.status(400).json({ error: 'invalid filename' });
  } else {
    filename = filenameQS;
  }

  const widthQS = queryStrings['width']!.toString().trim();

  if (widthQS === '') {
    return res.status(400).json({ error: 'width is required' });
  }

  try {
    width = Number(widthQS);

    if (!Number.isInteger(width) || width <= 0) {
      return res
        .status(400)
        .json({ error: 'width should be an integer value greater than 0' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'internal server error. please try again later' });
  }

  const heightQS = queryStrings['height']!.toString().trim();

  if (heightQS === '') {
    return res.status(400).json({ error: 'height is required' });
  }

  try {
    height = Number(heightQS);

    if (!Number.isInteger(height) || height <= 0) {
      return res
        .status(400)
        .json({ error: 'height should be an integer value greater than 0' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'internal server error. please try again later' });
  }

  const imageToProcess: Image = {
    filename,
    width,
    height
  };

  res.locals.imageToProcess = imageToProcess;
  next();
};
