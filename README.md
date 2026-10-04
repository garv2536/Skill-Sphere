# SkillSphere 🌐

> Intelligent Hyperlocal Freelance Ecosystem connecting clients with top-rated local freelance talent.

SkillSphere is a modern freelance marketplace frontend built with **React 18**, **Vite**, and **Tailwind CSS**. It provides a seamless experience for browsing open gigs, discovering verified freelancers, posting jobs, and managing applications.

---

## ✨ Features

- 🔍 **Gig Marketplace**: Search and filter gigs by category, budget, timeline, and required skills.
- 👨‍💻 **Freelancer Discovery**: Find verified freelancers by skill ratings, availability, and hourly rates.
- 🔐 **Authentication & Roles**: Role-based access for *Clients* and *Freelancers* with session persistence.
- 🎨 **Modern Design System**: Built with Tailwind CSS and styled with `Syne` and `DM Sans` typography.
- ⚡ **Lightning Fast**: Bundled and optimized with Vite 5.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer
- **Routing**: React Router DOM v6
- **Typography**: Google Fonts (`Syne`, `DM Sans`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <REPO_URL>
   cd skillsphere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
skillsphere/
├── public/
├── src/
│   ├── components/       # Shared UI components (Navbar, etc.)
│   ├── pages/            # App pages (Home, Gigs, Freelancers, Login, Register)
│   ├── services/         # API clients and HTTP helper services
│   ├── App.jsx           # Root application component & AuthContext
│   ├── main.jsx          # React DOM root entry
│   └── index.css         # Global Tailwind directives & custom CSS
├── index.html            # Main HTML document
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

---

## 📄 License
MIT License
