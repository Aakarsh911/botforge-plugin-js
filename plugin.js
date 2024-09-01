(function () {
  // Get the chatBotid from the window
  var chatBotId = window.customChatBot.id;

  // Make an API call to get the chatBot configuration
  fetch(`http://localhost:3000/api/bots/${chatBotId}`)
    .then((response) => response.json())
    .then((data) => {
      // Extract widget color and other settings from the response
      var widgetColor = data.bot.widgetColor || "#007bff"; // Fallback to default color if not set

      // Create the chatbot widget button
      var widgetButton = document.createElement("div");
      widgetButton.id = "chatbot-widget";
      widgetButton.style.position = "fixed";
      widgetButton.style.bottom = "20px";
      widgetButton.style.right = "20px";
      widgetButton.style.width = "50px";
      widgetButton.style.height = "50px";
      widgetButton.style.background = widgetColor; // Use fetched widget color
      widgetButton.style.borderRadius = "50%";
      widgetButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      widgetButton.style.cursor = "pointer";
      widgetButton.style.zIndex = "1000";
      widgetButton.style.display = "flex";
      widgetButton.style.justifyContent = "center";
      widgetButton.style.alignItems = "center";
      widgetButton.style.color = "#fff";
      widgetButton.style.fontSize = "24px";
      widgetButton.innerHTML = "+";

      // Append the widget button to the body
      document.body.appendChild(widgetButton);

      // Create the chatbot container (hidden initially)
      var chatbotContainer = document.createElement("div");
      chatbotContainer.id = "chatbot-container";
      chatbotContainer.style.position = "fixed";
      chatbotContainer.style.bottom = "80px";
      chatbotContainer.style.right = "20px";
      chatbotContainer.style.width = "350px";
      chatbotContainer.style.height = "500px";
      chatbotContainer.style.backgroundColor = "#fff";
      chatbotContainer.style.border = "1px solid #ccc";
      chatbotContainer.style.borderRadius = "10px";
      chatbotContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      chatbotContainer.style.zIndex = "1000";
      chatbotContainer.style.display = "none"; // Hidden by default
      chatbotContainer.style.overflow = "hidden";

      // Create the iframe for the chatbot
      var iframe = document.createElement("iframe");
      iframe.src = `http://localhost:3000/view-bot/${chatBotId}`; // Dynamic iframe URL
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.allow = "camera; microphone";
      chatbotContainer.appendChild(iframe);

      // Append the chatbot container to the body
      document.body.appendChild(chatbotContainer);

      // Toggle chatbot visibility when the widget is clicked
      widgetButton.addEventListener("click", function () {
        if (chatbotContainer.style.display === "none") {
          chatbotContainer.style.display = "block";
        } else {
          chatbotContainer.style.display = "none";
        }
      });

      // Optional: Add a close button inside the chatbot
      var closeButton = document.createElement("button");
      closeButton.innerHTML = "&times;";
      closeButton.style.position = "absolute";
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.style.backgroundColor = "transparent";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "20px";
      closeButton.style.cursor = "pointer";
      closeButton.addEventListener("click", function () {
        chatbotContainer.style.display = "none";
      });
      chatbotContainer.appendChild(closeButton);
    })
    .catch((error) => {
      console.error("Error fetching bot configuration:", error);
    });
})();
