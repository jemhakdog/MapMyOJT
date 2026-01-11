
# 🚀 MapMyOJT - Premium Placement & Tracking

**MapMyOJT** is a high-end, centralized ecosystem designed to bridge the gap between ambitious students and industry-leading businesses. It streamlines the entire On-the-Job Training (OJT) lifecycle—from discovery via interactive maps to real-time communication and AI-enhanced performance tracking.

## ✨ Core Pillars

### 1. Discovery (Interactive Mapping)
- **Geospatial Discovery:** Students can explore OJT opportunities through a sleek, dark-themed interactive map.
- **Categorized Filtering:** Filter listings by industry (Tech, Design, Engineering, Marketing).
- **Instant Inquiry:** Direct integration with the chat system from any map pin.

### 2. Real-time Engagement
- **MapMyOJT Threads:** Direct 1-on-1 messaging between students and business representatives.
- **Contextual Communication:** Chat history is persisted and linked to specific OJT postings.

### 3. Performance Tracking (AI-Enhanced)
- **Work Verification Logs:** Students submit daily accomplishments verified by supervisors.
- **Gemini AI Integration:** 
  - **Log Polishing:** Automatically enhances task descriptions to sound professional.
  - **Career Insights:** Provides actionable career advice.

## 🚀 Deployment (GitHub Pages)

This project is configured for automatic deployment via GitHub Actions.

### Setup Instructions:
1. **GitHub Secrets:**
   - Go to your repository **Settings** > **Secrets and variables** > **Actions**.
   - Add a **New repository secret** named `API_KEY` with your Google Gemini API Key.
2. **Enable Pages:**
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, ensure it is set to **GitHub Actions**.
3. **Push to Main:**
   - Any push to the `main` branch will trigger the `Deploy to GitHub Pages` workflow.

## 🛠 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Run Dev Server:**
   ```bash
   npm run dev
   ```
3. **Build for Production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions deployment config
├── components/
│   ├── AuthForm.tsx        # Role-based login and registration
│   ├── DirectChat.tsx      # Real-time messaging interface
│   ├── MapDiscovery.tsx    # Leaflet interactive map & filtering
│   ├── ProfileEditor.tsx   # Comprehensive user & account settings
│   ├── Sidebar.tsx         # Context-aware navigation
│   ├── SlotManagement.tsx  # Business-side OJT posting tools
│   └── TrackingSystem.tsx  # Daily log submission & approval
├── geminiService.ts        # AI integration logic
├── constants.ts            # Mock data and initial states
├── types.ts                # TypeScript interfaces & enums
├── App.tsx                 # Main application controller
├── vite.config.ts          # Build configuration
└── package.json            # Project metadata & dependencies
```

---
*Built with passion for the next generation of professionals.*
