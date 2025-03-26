# Innovation Ecosystem

<p align="center">
  <img src="https://raw.githubusercontent.com/heitzlki/innovation-ecosystem/refs/heads/main/docs/logo.svg" alt="Innovation Ecosystem Logo" height="50px">
</p>

Innovation is not a one-size-fits-all process. The **Innovation Ecosystem** project was developed during **[START Hack 2025](https://www.startglobal.org)** to provide an **AI-powered Innovation Coach** that guides users through a personalized innovation journey. By tailoring recommendations to individual user personas, our platform ensures engagement, motivation, and relevant next steps to help businesses and entrepreneurs navigate the complexities of innovation effectively.

## Table of Contents

- [Video Demonstration](#video-demonstration)
- [Screenshots](#screenshots)
- [Draft](#draft)
- [Figma Design](#figma-design)
- [Team Members](#team-members)
- [Problem Statement](#problem-statement)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Acknowledgments](#acknowledgments)

## Video Demonstration

Watch our project in action and see how the AI-powered Innovation Coach works in real-time:

[Watch on YouTube](https://youtu.be/ljvFArdf-VY)

## Screenshots

### Full Application View

This screenshot showcases the main interface of our **Innovation Ecosystem** platform, highlighting its clean UI and intuitive navigation.
![Full Application](https://raw.githubusercontent.com/heitzlki/innovation-ecosystem/refs/heads/main/docs/full.png)

### Roadmap Feature

An example of how the AI-driven innovation roadmap guides users through their personalized innovation journey.
![Roadmap](https://raw.githubusercontent.com/heitzlki/innovation-ecosystem/refs/heads/main/docs/roadmap.png)

## Draft

Our initial wireframe sketch illustrating the early concept and structure of the platform.
![Draft Image](https://raw.githubusercontent.com/heitzlki/innovation-ecosystem/refs/heads/main/docs/draft.JPG)

## Figma Design

We used **Figma** to design our user interface, ensuring a seamless and engaging experience.

![View Figma Design - Screen 1](https://raw.githubusercontent.com/heitzlki/innovation-ecosystem/refs/heads/main/docs/figma1.png)
![View Figma Design - Screen 2](https://raw.githubusercontent.com/heitzlki/innovation-ecosystem/refs/heads/main/docs/figma2.png)

## Team Members

Meet the amazing team behind **Innovation Ecosystem**:

- **Noah Gerber**

  - [LinkedIn](https://www.linkedin.com/in/noah-gerber-a62442229/)
  - [GitHub](https://github.com/gerbernoah)

- **Sebastian Truijens**

  - [LinkedIn](https://www.linkedin.com/in/sebastian-truijens/)
  - [GitHub](https://github.com/trusebass)

- **Lukas Diebold**
  - [LinkedIn](https://www.linkedin.com/in/lukas-diebold/)
  - [GitHub](https://github.com/lukasdiebold)

## Problem Statement

[Hackathon Challenge Repository](https://github.com/START-Hack/Kanton-St.Gallen-STARTHACK25)

Existing digital solutions fail to provide personalized guidance for innovation. Users often feel lost, unsupported, and eventually disengage due to the lack of tailored assistance. The **Innovation Ecosystem** addresses this issue by offering:

- Personalized onboarding based on experience level.
- A dynamic user journey with evolving recommendations.
- Industry-specific insights and support.
- Interactive engagement and real-time assistance.

## Technologies Used

### Frontend:

- **Next.js** – React framework for performance and scalability.
- **Shadcn UI** – Modern component library for UI elements.
- **Tailwind CSS** – Utility-first CSS framework for rapid design.
- **React Flow** – Interactive visualization library for user journeys.

### Backend:

- **FastAPI** – High-performance Python framework for backend logic.
- **SQLite** – Lightweight database for fast and efficient storage.
- **OpenAI API** – AI-driven insights and recommendations.

## Getting Started

### Frontend Setup

```sh
cd client
npm install
npm run dev
```

### Backend Setup

```sh
cd ./server/backend/
python3 -m venv venv
source venv/bin/activate
pip3 install -r ./app/requirements.txt
export OPENAI_API_KEY=[your token here]
python ./app/app.py
```

## Acknowledgments

Special thanks to the **Canton of St.Gallen** for providing the challenge and resources to make this project possible.
