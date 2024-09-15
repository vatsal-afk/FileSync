from PIL import Image

# Define the size of the image
width, height = 2, 2

# Create a new image with white background
image = Image.new('RGB', (width, height), (255, 255, 255))

# Load the pixel data
pixels = image.load()

# Set the colors for the specific pixels
pixels[1, 1] = (255, 0, 0)  # Red color
#pixels[1, 1] = (255, 0, 0)  # Red color

# Save the image
image.save('output2.png')

# Optionally, show the image
image.show()

