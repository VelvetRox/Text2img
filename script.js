const token = "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"; // For production, store this on the server
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const loadingIndicator = document.getElementById("loadingIndicator"); // Assuming you have a loading indicator element

async function query() {
  try {
    // Show loading GIF
    if (loadingIndicator) {
      loadingIndicator.style.display = 'block'; // Show loading
    }
    image.src = ""; // Clear previous image

    const response = await fetch(
      "https://api-inference.huggingface.co/models/openfree/flux-lora-korea-palace",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ "inputs": inputTxt.value }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  } finally {
    // Hide loading GIF after the request is complete
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none'; // Hide loading
    }
  }
}

if (button) {
  button.addEventListener('click', async function () {
    // Check if the input is empty
    if (inputTxt.value.trim() === '') {
      alert('Please enter a prompt.');
      return;  // Prevent the API call if the input is empty
    }

    try {
      const response = await query();
      const objectURL = URL.createObjectURL(response);

      if (image) {
        image.src = objectURL; // Display the generated image
      } else {
        console.error("Image element not found");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert('An error occurred while generating the image. Please try again.');
    }
  });
} else {
  console.error("Button element not found");
}
