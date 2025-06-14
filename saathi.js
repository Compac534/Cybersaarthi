async function askBot() {
  const userMessage = document.getElementById("userInput").value.trim();
  const replyBox = document.getElementById("botReply");

  if (!userMessage) {
    replyBox.innerText = "Please enter a question.";
    return;
  }

  replyBox.innerText = "Thinking... 🤔";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY" // Replace with your actual key here (temporarily)
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are CyberSaarthi, a helpful assistant who provides accurate guidance about cybercrime reporting in India."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    const message = data.choices[0]?.message?.content;
    replyBox.innerText = message || "Sorry, I couldn't fetch a response.";
  } catch (error) {
    replyBox.innerText = "An error occurred. Please try again later.";
    console.error(error);
  }
}
