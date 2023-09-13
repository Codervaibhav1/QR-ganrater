let myForm = document.querySelector("form");
let input = document.querySelector("input");
let size = document.querySelector("select");
let image = document.querySelector("img");
let container = document.querySelector(".container");


const getQr = async (e) => {
  e.preventDefault();
  console.log(size.value)
  let response = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=${size.value}&data=${input.value}`
  );
  let imageBlob = await response.blob();

  // Create a Blob URL from the Blob
  let blobUrl = URL.createObjectURL(imageBlob);

  // Set the image source
  image.setAttribute("src", blobUrl);

  // Store the Blob URL in a data attribute
  image.dataset.blobUrl = blobUrl;

  myForm.reset();
};

const downloadButton = document.createElement("button");
downloadButton.className = "btn btn-success rounded-0 w-75 my-3";
downloadButton.textContent = "Download QR Code";

// Define the click event handler for the download button
const downloadQR = () => {
  const blobUrl = image.dataset.blobUrl;
  if (blobUrl) {
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "qrcode.png"; // Set the desired filename
    link.click();
  }
};
downloadButton.addEventListener("click", downloadQR);
container.appendChild(downloadButton);

myForm.addEventListener("submit", getQr);
