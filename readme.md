# Lego Robot AI: Enriching STEM Learning for Young Coders

## 💡 **What Lego Robot AI Does**

Lego Robot AI offers an innovative learning platform that **bridges Python coding with Spike Prime robots** through an interactive web-based interface. It allows students to:
- **Generate and explain Python code** using the Spike Prime 3 API.
- **Write and execute Python code** directly on their Lego robot via a web browser using a **web serial port**.
- Experience coding concepts visually by bringing their robots to life in real-time.

### Key Features:
- **Lego Brick Image Library:** Search for and identify similar Lego bricks via image uploads.
- **Speech-Based Conversation Support:** Enable seamless communication for young learners.
- **Live Chat:** Connect students with teachers and peers through a real-time chat interface.
- **Image Generation and Descriptions:** Help students visualize new ideas by generating Lego brick images from text or describing uploaded images.

---

## 🔧 **How We Built It**

We began with a **prototype in March**, creating a Python console program that used a fine-tuned GPT-3 model to generate Python code. However, this early version posed several challenges:
- **Text-based interface** wasn't user-friendly for younger learners.
- **Extensive setup** was required on local devices.
- **Generated code lacked accuracy**, leading to frequent debugging issues.

To overcome these limitations, we **transformed the prototype into a fully web-based application**, featuring enhanced capabilities and seamless integration with various services.

### **Tech Stack:**
- **Frontend:** Built with **React** and **TypeScript** for a smooth, user-friendly interface.
- **Backend:** Hosted on **Azure**, leveraging:
  - **Azure OpenAI services** with a more capable LLM model.
  - **Cosmos DB (MongoDB)** for managing data, including image vector search.
  - **Azure API Gateway** for managing API endpoints.
  - **Azure Speech, Computer Vision, and Translation services** for multimodal interaction.
- **Integration:** Web serial port support to control the Spike Prime Hub directly from the browser.

### **Azure Services Used:**
- **App Service, Function App, APIM, Container App, Cosmos DB, ACR**  
- **Speech, Translation, and Computer Vision services**  
- **Key Vault** for secure API management  
- **Azure DevOps** for CI/CD pipeline management

---

## 🎉 **Accomplishments We're Proud Of**
- **Knowledgeable Chatbot:** Integrated a chatbot that understands both **general Lego Spike Prime knowledge** and **Spike Prime 3 Python API** functions.
- **Interactive Coding:** Enabled students to write and execute **Python code directly from the browser** via a web serial port.
- **Bilingual Support:** Added functionality to **translate responses into French** for multilingual learning.
- **Image-Based Search and Generation:**  
  - Search similar Lego bricks through **image uploads**.  
  - Generate new Lego brick images based on **text descriptions**.  
  - Provide **text-based descriptions** for uploaded brick images.
- **Speech and Voice Integration:**  
  - Accept user prompts via **speech input**.  
  - Use **text-to-speech** to read responses aloud to students.
- **Live Chat Support:** Fostered collaboration between students and teachers through **browser-based live chat**.

---

## 🔮 **What's Next for Lego Robot AI**
- **User Feedback:** Gather insights from the students and teachers to further refine the platform.
- **Expand Code Snippet Libraries:** Build a broader library of **robot action snippets** to improve the chatbot's coding recommendations.
- **Enhance Image Search:** Expand the **Lego brick image library** with additional images and 3D models.
- **AI-Driven Competition Strategies:** Utilize LLM to **generate optimal robot competition strategies**, such as efficient navigation routes.
- **Bluetooth Support:** Replace the **USB cable** with **Bluetooth connectivity** for more seamless robot control.

---

## 👩‍💻 **Contributing**

We welcome contributions! If you'd like to improve Lego Robot AI or add new features, feel free to fork the repository and submit a pull request.

---

## 📜 **License**

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 💬 **Feedback and Support**

We'd love to hear from you! Please raise an issue on the repository if you encounter bugs or have feature requests. Teachers, parents, and students are also encouraged to share their experiences using Lego Robot AI to help us improve the platform.

---
