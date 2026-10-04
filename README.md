# SkillSphere 🌐

SkillSphere is a modern freelance marketplace connecting founders and engineering teams with verified freelance software architects, UI/UX designers, and machine learning specialists across India.

Built with **React 18**, **Vite**, and **Tailwind CSS**.

---

## ⚡ Key Highlights

- **Gig Discovery & Bidding**: Filter high-intent contracts by tech stack, project duration, budget (in INR), and remote availability.
- **Talent Directory**: Browse verified freelance engineers and designers with real client reviews, portfolios, and hourly rates.
- **Interactive Proposal Flow**: Submit detailed proposals with milestone breakdowns and custom delivery estimates.
- **Post a Project**: Multi-step job posting modal with live tag chips and instant feed updates.
- **Bookmark & Saved Contracts**: Save interesting contracts with local persistence.
- **Milestone Escrow Workflow**: Transparent breakdown of payment security and contract execution.
- **Authentication**: Built-in personas for 1-click testing as a *Client* or *Freelancer*.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v3, PostCSS, Google Fonts (`Syne` & `Plus Jakarta Sans`)
- **Routing**: React Router DOM v6
- 

## 📂 Project Architecture

```text
skillsphere/
├── src/
│   ├── components/       # Navbar, Footer, GigModal, FreelancerModal, PostJobModal, Toast
│   ├── data/             # Curated marketplace dataset (gigs, talent, reviews, categories)
│   ├── pages/            # Home, Gigs, Freelancers, HowItWorks, Login, Register
│   ├── services/         # API client & fetch helpers
│   ├── App.jsx           # Root layout, router & Auth / Bookmarks context
│   ├── main.jsx          # Vite React root
│   └── index.css         # Tailwind directives & design tokens
├── index.html            # Main HTML entry
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

---

## 📄 License
MIT License
