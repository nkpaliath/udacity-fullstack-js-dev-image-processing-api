import { Request, Response, Router } from 'express';
import { getThumbnailImage } from '../../utilities/imageProcessing';
import { validateImageApi } from '../../middlewares';

const router = Router();

export interface Image {
  filename: string;
  width: number;
  height: number;
}

router.get(
  '/',
  validateImageApi,
  async (req: Request, res: Response): Promise<Response | void> => {
    if (!res.locals.imageToProcess)
      res
        .status(500)
        .json({ error: 'internal server error. please try again later' });

    const { filename, width, height } = res.locals.imageToProcess as Image;

    try {
      const image = await getThumbnailImage(filename, width, height);

      if (typeof image === 'string') return res.status(200).sendFile(image);
      else throw image;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes('no such file or directory')) {
          return res.status(404).json({ error: 'image not found' });
        } else {
          return res
            .status(500)
            .json({ error: 'internal server error. please try again later' });
        }
      }
      return res
        .status(500)
        .json({ error: 'internal server error. please try again later' });
    }
  }
);

export default router;
