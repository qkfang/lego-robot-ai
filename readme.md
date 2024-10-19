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