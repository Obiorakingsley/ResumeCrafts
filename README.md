# 🧠 ResumeCrafts — AI Resume Builder

> **ATS-friendly resume builder** that helps job seekers instantly generate, edit, and export professional resumes using AI.
> Built with **Next.js 15**, **Firebase**, and **OpenAI** — fully serverless, scalable, and lightning fast ⚡

---

## 🚀 Features

*  **AI-Powered Resume Generation** — Generate professional summaries and experience bullet points using GPT.
*  **Real-Time Resume Builder** — Edit your resume with instant preview updates.
*  **Multiple Export Formats** — Export your resume as **PDF**, **DOCX**, using `pdfkit`, `docx`, and `canvas`.
*  **ATS-Friendly Templates** — Clean, modern, recruiter-ready designs that pass Applicant Tracking Systems.
*  **Dynamic Resume Editor** — Built with `react-hook-form`, `zustand`, and `zod` for type-safe form validation and state management.
*  **Firebase Authentication & Firestore Storage** — Secure user accounts, cloud resume saving, and easy syncing across devices.

---

## 🛠️ Tech Stack  

![My Stack](https://skillicons.dev/icons?i=ts,tailwind,nextjs,firebase)


| Category               | Tools                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend Framework** | [Next.js 15](https://nextjs.org/)                                                                                                                                                                                                     |
| **UI Styling**         | [TailwindCSS](https://tailwindcss.com/)                                                                                                        |
| **State Management**   | [Zustand](https://github.com/pmndrs/zustand), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev)                                                                                                                 |                                                                                                                                                                                       |
| **Backend**            | [Firebase](https://firebase.google.com/), [Firestore](https://firebase.google.com/docs/firestore), [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)                                                                 |
| **AI Integration**     | [OpenAI API](https://platform.openai.com/)                                                                                                                                                                                            |
| **File Handling**      | [PDFKit](https://pdfkit.org/), [DOCX](https://github.com/dolanmiu/docx), [Mammoth.js](https://github.com/mwilliamson/mammoth.js), [canvas](https://www.npmjs.com/package/canvas), [pdfjs-dist](https://github.com/mozilla/pdfjs-dist) |                                                                                                                                                                                                   |
| **Notifications**      | [React Toastify](https://fkhadra.github.io/react-toastify/)                                                                                                                                                                           |
| **Fetch / HTTP**       | [node-fetch](https://github.com/node-fetch/node-fetch)                                                                                                                                                                                |

---

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/Obiorakingsley/resumecrafts.git
cd resumecrafts

# Install dependencies
npm install

# Create your environment file
cp .env.example .env.local
```

---

## 🔧 Environment Variables

Create a `.env.local` file in your root folder and add the following:

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```



---

## 🧠 Folder Structure

```
app/
 ├─ (build)/              # Resume builder routes
 ├─ (site)/               # Public resume site routes
 ├─ api/                  # API routes for OpenAI, PDF generation, etc.
 ├─ components/           # Reusable UI components
 ├─ lib/                  # Firebase, OpenAI, and utility functions
 ├─ styles/               # Tailwind and global styles
 ├─ layout.tsx            # Root layout
 └─ error.tsx             # Custom error page
```

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.

