Pain Diagnoser — 3D Interactive Symptom Assistant
An AI-driven, interactive web app that lets users tap a realistic 3D human model to indicate where they feel pain. The app then runs a guided conversational flow (doctor-like questions) and returns probable causes, basic self-care tips, and recommended next steps — all powered by a Python (Flask) backend and in-browser 3D interactions (Three.js). Designed for quick triage and user guidance (not a replacement for a clinician).

Live -> https://pain-diagnoser-frontend.vercel.app/
Note : Please wait upto 1 min for the response from server after clicking diagnose.

Fot the backend go to PainDiagnoser-backend repo in my profile.

Features

🧍‍♂️ Clickable 3D human model (GLB/glTF) — select any body part to start diagnosis
💬 Chat-style follow-up: AI-style questions generated from the backend to gather symptoms
🎯 Zone-aware mapping — front/back and left/right detection (head, neck, chest, back, pelvis, thigh, knee, leg, foot, shoulder, elbow, hand, etc.)
🔴 Visual highlight — selected part lights up with a subtle light-red marker for clarity
⌨️ Keyboard support — press Enter to send chat replies (plus Send button)
📱 Responsive UI — desktop and mobile friendly layouts and touch support
⚡ Fast local inference — lightweight rule/heuristic-based diagnosis logic in Python (Flask) (no OpenAI dependency)
🚀 Deployable — frontend on Vercel, backend on Render (or any static + Flask host)

Tech Stack

Frontend: React, React Three Fiber / @react-three/drei (Three.js), Vite, CSS

3D Model: glTF / .glb human model (customizable)

Backend: Python (Flask) — diagnostic logic, question flows, session handling

Data: JSON question flows (easy to extend) — optional MongoDB if you want to persist sessions/logs

Deployment: Vercel (frontend), Render / any WSGI host (backend)

Why it’s useful

Fast, intuitive way for users to describe pain using visuals rather than medical jargon.

Good for triage, education, and guiding users to appropriate next steps (home care vs professional attention).

Easy to extend — add more parts, richer diagnostic logic, or connect to a clinical knowledge base later.

Limitations / Notes

Not a medical device. Provides guidance and suggestions, not definitive diagnoses. Recommend users see a clinician for emergencies or persistent/worsening symptoms.

Accuracy depends on the question flow and diagnostic heuristics — consider adding clinical validation for production use.




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
