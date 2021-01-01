import { Request, Response } from "firebase-functions";
import { storage } from "firebase-admin";

// This is an example function for uploading images 
// but in production you need to account for edge cases and validation
export const uploadPhotoHandler = async (
  request: Request,
  response: Response
) => {    
  try {
    const { base64image } = request.body.input;
    // extract img type by extension
    const contentType = base64image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1]
    const file = storage().bucket().file(`photos/${Date.now()}`);

    const base64EncodedImageString = base64image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
    await file.save(imageBuffer, { contentType });

    const url = await file.getSignedUrl({
      action: 'read',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10) // expire in 10 year
    });

    response.status(200).send({ url });
  
  } catch (error) {
    response.status(500).send({ message: `Message: ${error.message}` });
  }
};