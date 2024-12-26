const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");
const resultDiv = document.getElementById("result");

searchButton.addEventListener("click", async () => {
  const prompt = searchBox.value.trim();
  if (!prompt) {
    resultDiv.innerText = "Please enter a prompt.";
    return;
  }

  resultDiv.innerText = "Generating content...";

  try {
    const response = await fetch("http://localhost:8000/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: prompt }),
    });

    const data = await response.json();
    if (response.ok) {
      resultDiv.innerText = data.Result || "No content generated.";
    } else {
      resultDiv.innerText = `Error: ${data.error}`;
    }
  } catch (error) {
    resultDiv.innerText = `Error: ${error.message}`;
  }
});
