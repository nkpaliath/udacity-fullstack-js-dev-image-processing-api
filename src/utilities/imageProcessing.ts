import sharp from 'sharp';
import { join, extname } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

const ORIGINAL_IMAGES_FOLDER = join(
  __dirname,
  '..',
  '..',
  'assets',
  'images',
  'original'
);
const THUMBNAIL_IMAGES_FOLDER = join(
  __dirname,
  '..',
  '..',
  'assets',
  'images',
  'thumbnail'
);

const createThumbnailImage = async (
  filename: string,
  width: number,
  height: number,
  thumbnailImagePath: string
): Promise<string | Error> => {
  const originalImagePath = join(ORIGINAL_IMAGES_FOLDER, filename);

  try {
    const result = await readFile(originalImagePath);

    await sharp(result).resize(width, height).toFile(thumbnailImagePath);

    return thumbnailImagePath;
  } catch (error) {
    return error as Error;
  }
};

export const getThumbnailImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string | Error> => {
  const fileExtn = extname(filename);
  const filenameWithoutExtn = filename.replace(fileExtn, '');
  const newFileName = `${filenameWithoutExtn}_${width}_${height}${fileExtn}`;
  const thumbnailImagePath = join(THUMBNAIL_IMAGES_FOLDER, newFileName);

  if (existsSync(thumbnailImagePath)) {
    try {
      return thumbnailImagePath;
    } catch (error) {
      return error as Error;
    }
  } else {
    return createThumbnailImage(filename, width, height, thumbnailImagePath);
  }
};
