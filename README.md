# ⬡ DUET Resource Hub

**DUET Resource Hub** is a comprehensive, open-source portal designed specifically for prospective and current students of **Dawood University of Engineering & Technology (DUET)**.

Built with a "Cream & Charcoal" aesthetic, it provides a centralized platform for academic materials, admission guides, and merit tracking.

## 🚀 Key Features

- **Admissions Guide 2026-27**: A complete breakdown of the entry test, eligibility criteria, and a dynamic 60/30/10 merit calculator visualization.
- **GitHub-Integrated Browser**: Browse semester subjects, past merit lists, and sample papers directly from GitHub repositories without leaving the app.
- **Admission Timeline**: Interactive roadmap from "Admissions Open" to "Orientation."
- **Newbie Guide**: Essential tips and FAQs for freshmen starting their journey at DUET.
- **SEO Optimized**: Fully indexed for search engines with JSON-LD schema for Google rich snippets (FAQs and Educational Organization).

## 🛠️ Tech Stack

- **Frontend**: React (Functional Components + Hooks)
- **Bundler**: Vite
- **Styling**: Vanilla CSS with CSS Modules for scoped, maintainable styles.
- **Data Fetching**: Dynamic GitHub Content API integration.
- **Analytics**: Vercel Analytics & Speed Insights.

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A GitHub Personal Access Token (for the browsing functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muhammadrehan-dev/duet-hub.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root and add your GitHub token:
   ```env
   VITE_GITHUB_TOKEN=your_token_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/src/pages`: Main page components (Home, Admissions, Newbie, About).
- `/src/components`: Reusable UI elements (Nav, Footer, Browser).
- `/src/data`: Configuration and static data (config.js).
- `/public`: Static assets including `robots.txt` and `sitemap.xml`.

## 🛡️ Developer

Developed and maintained by **Muhammad Rehan (CH4_EZIO)**, a Cybersecurity student at DUET.

- **GitHub**: [@muhammadrehan-dev](https://github.com/muhammadrehan-dev)
- **Bio**: Cybersecurity Student | Aspiring Security Researcher. Passionate about CTFs and building secure, helpful systems.

## 📄 License

This project is open-source. Feel free to contribute or adapt it for your own community.

---

_Built with ♥ for the DUET Community._
