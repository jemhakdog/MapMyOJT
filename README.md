
# 🚀 MapMyOJT - Premium Placement & Tracking

**MapMyOJT** is a high-end, centralized ecosystem designed to bridge the gap between ambitious students and industry-leading businesses. It streamlines the entire On-the-Job Training (OJT) lifecycle—from discovery via interactive maps to real-time communication and AI-enhanced performance tracking.

## ✨ Core Pillars

### 1. Discovery (Interactive Mapping)
- **Geospatial Discovery:** Students can explore OJT opportunities through a sleek, dark-themed interactive map powered by Leaflet and CartoDB.
- **Categorized Filtering:** Effortlessly filter listings by industry (Tech, Design, Engineering, Marketing).
- **Instant Inquiry:** Direct integration with the chat system from any map pin.

### 2. Real-time Engagement
- **MapMyOJT Threads:** Direct 1-on-1 messaging between students and business representatives.
- **Contextual Communication:** Chat history is persisted and linked to specific OJT postings.

### 3. Performance Tracking (AI-Enhanced)
- **Work Verification Logs:** Students submit daily accomplishments which are then verified by their supervisors.
- **Gemini AI Integration:** 
  - **Log Polishing:** Automatically enhances student task descriptions to sound more professional and impactful.
  - **Career Insights:** Provides actionable career advice based on student profiles and work history.

### 4. Role-Based Dashboards
- **Students:** Manage profiles, track hours, and discover roles.
- **Businesses:** Manage OJT slots, verify intern performance, and access AI-driven talent insights.
- **Coordinators:** Oversee program distribution, verify partner businesses, and track overall success rates.

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Mapping:** Leaflet.js with CartoDB Dark Matter tiles
- **Intelligence:** Google Gemini API (@google/genai)
- **Styling:** Glassmorphism, OLED-optimized luxury theme, Plus Jakarta Sans typography
- **State Management:** React Hooks & Local Storage persistence

## 📂 Project Structure

```text
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
└── index.tsx               # Entry point
```

## 🚀 Getting Started

1. **Environment Variable:** Ensure you have a valid Gemini API Key. The app expects `process.env.API_KEY`.
2. **Installation:** Since this project uses ES modules via CDN imports, you can serve the root directory using any local web server (e.g., `npx serve .`).
3. **Roles:**
   - Use the **Register** flow to explore different roles (Student, Business, Coordinator).
   - Note: Business features require "Verification" which can be bypassed in this demo by switching roles or via the Coordinator dashboard.

## 🔮 Future Roadmap

- [ ] **PDF Resume Export:** Automatically generate professional resumes from OJT logs.
- [ ] **Certificate Generation:** Auto-issue completion certificates once hour requirements are met.
- [ ] **Deep Analytics:** Real-time performance graphing for university coordinators.
- [ ] **Verified Documents:** Secure upload for MOAs and waivers.

---
*Built with passion for the next generation of professionals.*
