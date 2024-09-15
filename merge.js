
function handleConflict() {

}

function merge(filename1, filename2) {

}

const sharp = require('sharp');

// Function to merge two images using element-wise multiplication and sqrt
async function mergeImages(image1Path, image2Path, outputImagePath) {
    try {
        // Load the images and get metadata
        const image1 = sharp(image1Path);
        const image2 = sharp(image2Path);

        const metadata1 = await image1.metadata();
        const metadata2 = await image2.metadata();

        if (metadata1.width !== metadata2.width || metadata1.height !== metadata2.height) {
            throw new Error('Images must have the same dimensions for element-wise operations.');
        }

        // Convert images to raw buffers
        const buffer1 = await image1.raw().toBuffer();
        const buffer2 = await image2.raw().toBuffer();

        // Prepare result buffer
        const result = Buffer.alloc(buffer1.length);

        // Element-wise multiplication and sqrt
        for (let i = 0; i < buffer1.length; i++) {
            const product = buffer1[i] * buffer2[i];
            result[i] = Math.min(Math.sqrt(product), 255); // Clip to valid range [0, 255]
        }

        // Create and save the resulting image
        await sharp(result, { raw: { width: metadata1.width, height: metadata1.height, channels: 3 } })
            .toFile(outputImagePath);

        console.log('Image saved to', outputImagePath);
    } catch (err) {
        console.error('Error merging images:', err);
    }
}

// Example usage
const image1Path = './test1.png';
const image2Path = './test2.png';
const outputImagePath = 'result1.png';

mergeImages(image1Path, image2Path, outputImagePath)
    .then(() => console.log('Image merging complete.'))
    .catch(err => console.error('Error merging images:', err));
