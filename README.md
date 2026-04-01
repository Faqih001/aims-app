# 🚀 AIMS - Accreditation Information Management System

## 📖 Project Overview
The Accreditation Information Management System (AIMS) is a comprehensive, web-based platform designed to digitize, streamline, and manage the complete lifecycle of accreditations. Featuring robust role-based access control, the system offers dedicated, interactive dashboard portals tailored for **Applicants, Admins, Assessors, and Technical Reviewers**. 

This system represents a modernization of the accreditation process, bringing accessibility, scalability, and enhanced user experience to all stakeholders.

---

## 🎯 Developer Showcase: Frontend Developer (Component III)

*This repository also serves as a specialized portfolio piece demonstrating my alignment with the **Project Assistant Officer – Component III (Frontend Developer)** role. The architecture, system design, and execution of this codebase directly showcase my capacity to fulfill the duties, qualifications, and competencies required.*

### 🛠️ Execution of Duties and Responsibilities (Component III Context)

Through the development of AIMS, I have successfully demonstrated the core duties outlined for this position:

1. **Develop and Maintain User Interfaces:** Engineered a robust, modular SPA/SSR hybrid application using Vue 3 and Nuxt 3, featuring distinct, dynamic layouts for various user roles and an intuitive public-facing portal.
2. **Requirements Translation:** Translated complex accreditation workflows into step-by-step application wizards, interactive data tables (`UTable`), and detailed user interfaces that comply with modern design standards.
3. **System Usability & Accessibility:** Designed a flexible, mobile-first experience. By utilizing Tailwind CSS and Nuxt UI, I ensured cross-device responsiveness, deep browser compatibility, and seamless dark/light mode toggling.
4. **Performance Optimization:** Leveraged the Vite build engine and Vue composables to optimize rendering, state management, and ensure zero-bottleneck performance across complex pages.
5. **System Integration (Frontend-to-Backend):** Built tightly integrated modular API endpoints (`/api/auth`, `/api/users/[id]/applications`), orchestrating smooth, secure client-to-server data communication via Drizzle ORM and PostgreSQL.
6. **Documentation & Traceability:** This comprehensive README, alongside modular codebase comments and self-documenting TypeScript typings, ensures the system is easy to onboard, maintain, and test for UAT.
7. **Change Management:** Structured the `app/components/` and `pages/` directories using a scalable architectural pattern that supports iterative updates, version control, and rapid deployment of new features.
8. **Dashboards & Data Visualization:** Developed complex, role-specific analytical dashboards, employing data tables, structured metrics, and interactive charts to visualize application statuses and timelines.
9. **User Experience Improvement:** Implemented intuitive UX patterns, including dynamic breadcrumbs, user notification systems, and intelligent multi-step form validation to guide users seamlessly through the system.

### 🎓 Alignment with Qualifications & Competencies

- **Modern Frontend Frameworks:** Exhibited deep proficiency in **Vue.js, Nuxt.js 3, and TypeScript**.
- **Responsive Design & Compatibility:** Ensured flawlessly responsive UIs that adapt to mobile, tablet, and desktop interfaces.
- **RESTful API Integration:** Bridged complex interfaces with backend services seamlessly utilizing Nuxt Server API routes and State Management (Pinia).
- **Attention to Detail:** Precision in state execution, encompassing JWT Authentication flows, I18n localization (English & Swahili), and strict UI component consistency.
- **Continuous Learning & Results-Driven:** Rapid adaptation to evolving project needs, implementing cutting-edge tools like Drizzle ORM to maintain an advanced, enterprise-grade technology stack.

---

## 💻 Core Technology Stack

- **Frontend Framework:** Nuxt 3 / Vue 3 (Composition API)
- **Language:** TypeScript
- **Styling & Components:** Tailwind CSS, Nuxt UI
- **State Management:** Pinia (`stores/auth.ts`, `stores/sidebar.ts`)
- **Backend / Server:** Nuxt localized Server Routes (Nitro)
- **Database & ORM:** PostgreSQL, Drizzle ORM
- **Localization/I18n:** `@nuxtjs/i18n` (Multi-language support for English & Swahili)

## 🏗️ System Architecture Highlights

- **`app/pages/dashboard/`**: Contains deeply nested, role-protected routes specifically customized for `admin`, `applicant`, `assessor`, and `reviewer` workflows.
- **`app/components/`**: Features highly reusable components ranging from authentication layouts to advanced interactive data tables, dropdown menus, and standard application wrappers.
- **`server/api/`**: Houses all the backend interactions, including robust RESTful CRUD operations processing everything from ticket handling to application submission.
- **`server/db/schema.ts`**: A well-structured Relational Database schema fully defining `users`, `applications`, `organizations`, `documents`, and their respective cross-table relationships.

## 🛠️ Getting Started (Local Development)

### Prerequisites
- Node.js (v18+ recommended)
- `npm` or `pnpm`
- PostgreSQL instance running

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aims-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Ensure an `.env` file exists at the root, maintaining DB connection strings and required auth secrets.
   ```bash
   DATABASE_URL="postgres://user:password@localhost:5432/aims"
   ```

4. **Run Database Migrations**
   ```bash
   npx drizzle-kit migrate
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

---

*Prepared by: Project Assistant Officer Candidate (Component III - Frontend Developer)*
