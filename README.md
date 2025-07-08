# 🪄 AI Background Removal SaaS  
[![Live Demo](https://img.shields.io/badge/Live-Demo-27AE60?style=for-the-badge&logo=vercel&logoColor=white)](https://bg-removal-vna6.vercel.app/)

Remove backgrounds from images with a single click, manage user credits, and accept payments—all in a **MERN** (MongoDB · Express · React · Node) stack powered by **AI** and **Clerk** authentication.

---

## ✨ Features
|               | Description |
|---------------|-------------|
| 🔐 **Auth & User Management** | Clerk provides plug‑and‑play Login, Signup, and Profile components. |
| 🎨 **AI Background Removal**  | Upload any image → server calls the ClipDrop API → returns a transparent‑PNG/data‑URI. |
| 💳 **Credit System**          | Each removal costs 1 credit. New users start with free credits; buy more via Razorpay. |
| 🛒 **Razorpay Checkout**      | Secure payments in Test/Live mode, signature verification, transaction log. |
| 📦 **RESTful API**            | `/api/user/credit`, `/api/image/remove-bg`, `/api/user/pay-razor`, `/api/user/verify-razor` |
| 🧑‍💻 **Clean React UI**       | TailwindCSS, hero section, drag‑and‑drop upload, live spinner, result preview, download button. |
| 🌐 **Deployed**               | Frontend → Vercel · Backend API → Render / Railway · Static uploads → Cloudinary (optional). |

---

## 🏗️ Tech Stack
- **Frontend**   React 18 · Vite · TailwindCSS · Axios · Razorpay JS · Clerk React
- **Backend**    Node.js 18 · Express 4 · Multer · ClipDrop REST · Razorpay SDK · MongoDB Atlas
- **Auth**       Clerk JWT (`sub` → `req.clerkId`)
- **Payments**   Test & Live Keys via `.env`
- **Misc**       dotenv · cors · crypto · nodemon

---

## 🚀 Quick Start (Local)


# 1. Clone & install
git clone https://github.com/your‑username/bg‑removal.git
cd bg‑removal
npm install        # root – installs backend packages
cd client
npm install        # frontend

---

# 2. Environment variables (root/.env)
# ------------------------------------
PORT=4000
MONGODB_URI=mongodb+srv://...
CLIPDROP_API=your_clipdrop_key
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_secret
CURRENCY=INR
# Clerk
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# 3. Run both servers
# backend (port 4000)
npm run dev        # nodemon server.js
# frontend (port 5173)
cd client && npm run dev


Open http://localhost:5173 → sign up (Clerk), upload an image, remove background.

---

root
│  server.js
│  .env        # never commit!
│
├─configs
│   └─mongodb.js
├─models
│   ├─userModels.js
│   └─transactionModel.js
├─routes
│   ├─userRoutes.js
│   └─imageRoutes.js
├─controllers
│   ├─UserController.js
│   └─ImageController.js
│
└─client  # React app (Vite)
    ├─src
    │  ├─assets
    │  ├─context
    │  ├─components
    │  └─pages
    └─index.html


---


🛠️ Important Scripts
| Location | Script          | Purpose                              |
| -------- | --------------- | ------------------------------------ |
| root     | `npm run dev`   | `nodemon server.js` (backend reload) |
| client   | `npm run dev`   | `vite` (frontend hot‑reload)         |
| root     | `npm run start` | production `node server.js`          |


---

🔒 Environment Variables

| Key                                        | Description                      |
| ------------------------------------------ | -------------------------------- |
| `MONGODB_URI`                              | Atlas / local URI                |
| `CLIPDROP_API`                             | ClipDrop background‑removal key  |
| `RAZORPAY_KEY_ID` `RAZORPAY_KEY_SECRET`    | Razorpay keys (Test **or** Live) |
| `CURRENCY`                                 | `INR` / `USD` etc.               |
| `CLERK_PUBLISHABLE_KEY` `CLERK_SECRET_KEY` | Clerk project keys               |



Never hard‑code secrets—use .env and import 'dotenv/config' at the top of server.js.


---

🧪 Testing Razorpay (Sandbox)

1. Switch dashboard to Test Mode

2. Use any test card (e.g., 4111 1111 1111 1111, CVV 123, future expiry)

3. Complete payment → redirect → credits increment

---

🖥️ Deployment

| Layer        | Service                             | Command / Setting                       |
| ------------ | ----------------------------------- | --------------------------------------- |
| **Frontend** | Vercel                              | Connect `/client` → Auto Builds         |
| **Backend**  | Render / Railway                    | Node 18 · `npm start` · Build = `npm i` |
| **DB**       | MongoDB Atlas                       | Free M0 Cluster                         |
| **Webhook**  | Razorpay ↔ `/api/user/verify-razor` | Public HTTPS URL                        |


---

🙏 Credits

ClipDrop – Background Removal API

Clerk – Auth & user UI

Razorpay – Indian payment gateway

Heroicons / Lucide – Icons

---

📜 License
MIT — free for personal and commercial use. See LICENSE file.

---

Enjoy hacking!
Feel free to submit PRs or open issues. If you build something cool on top, let me know 🙂
