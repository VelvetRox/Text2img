const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
  try {
    image.src = "load.gif";
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
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
        image.src = objectURL;
      } else {
        console.error("Image element not found");
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
  });
} else {
  console.error("Button element not found");
}
