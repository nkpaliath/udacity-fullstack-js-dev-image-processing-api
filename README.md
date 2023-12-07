## Image Processing API

### Purpose of the Api

The image processing api will take an image name, width and height values as querystring, resize the image to the specified dimensions, save it and then returns the resized image.

### Using the Api

#### Clone the repository

Open the terminal and git clone the repository.

#### Run the server using `npm start`

Move into the cloned repository and run npm start. This will start the server on port 3000.

#### Testing the Api

Open the browser and enter `http://localhost:3000/api/images?filename=fjord.jpg&width=48&height=48` into the address bar. Press enter. The resized image will be displayed.

#### Scope of the project

- Only images with extension jpg or jpeg is supported.
- Only the images in the assets/images/original folder can be resized by the api. If the image is not present in the folder, it will throw an error. To test for any other images make sure to copy the image into the previously mentioned folder.
