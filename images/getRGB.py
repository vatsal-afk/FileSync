from PIL import Image
import numpy as np

# Load the images
image1_path = './output1.png'
image1 = Image.open(image1_path)

image2_path = './output2.png'
image2 = Image.open(image2_path)

# Ensure the images are in RGB mode
if image1.mode != 'RGB':
    image1 = image1.convert('RGB')

if image2.mode != 'RGB':
    image2 = image2.convert('RGB')

# Convert the images to NumPy arrays with float type
rgb_matrix1 = np.array(image1, dtype=np.float32)
rgb_matrix2 = np.array(image2, dtype=np.float32)

# Print or use the RGB matrices
print("RGB Matrix 1:")
print(rgb_matrix1)
print("RGB Matrix 2:")
print(rgb_matrix2)

# Ensure both images have the same dimensions
if rgb_matrix1.shape != rgb_matrix2.shape:
    raise ValueError("Images must have the same dimensions for element-wise operations.")

# Initialize the result matrix with zeros
res = np.zeros_like(rgb_matrix1)

# Perform the element-wise operation
for i in range(rgb_matrix1.shape[0]):
    for j in range(rgb_matrix1.shape[1]):
        for k in range(3):
            product = rgb_matrix1[i, j, k] * rgb_matrix2[i, j, k]
            if product > 255**2:  # Example threshold to avoid overflow
                product = 255**2
            res[i, j, k] = np.sqrt(product)

# Clip the values to the valid range [0, 255]
res = np.clip(res, 0, 255).astype(np.uint8)

# Print the result
print("Result Matrix:")
print(res)

image = Image.fromarray(res)

# Save the image as a PNG file
image.save('result.png')

# Optionally, show the image
image.show()

