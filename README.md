# 🎛️ Domotic Panic - Automation Control Panel (ECAP Escape Game)

This project is an immersive gaming application developed for the **ECAP** escape room. Designed specifically for a tablet layout, it mimics an industrial **home automation / security control panel** belonging to a secured facility.

The hidden objective for players is to solve a puzzle based on the reverse **Lights Out** game logic (**Lights On**) to unlock the next step of their mission.

---

## 🕹️ Concept & Gameplay

- **The Illusion:** The screen displays a realistic automation interface blinders and domotic equipment.
- **The Escape Room Pitch:** The facility's system is offline or locked down. Players must "power up" all sectors or overload the sub-systems to force a system override.
- **The Mechanics (Lights On):**
  - The interface features a grid of buttons (toggle switches/sectors).
  - Pressing a button toggles its state (on/off) as well as the states of its adjacent neighbors (up, down, left, right).
  - **Win Condition:** Successfully turn **ON** all indicators on the grid to restore total power and find the related SYNC code.

---

## 🛠️ Tech Stack

The application is powered by a modern **Expo SDK 58** and **React Native 19** ecosystem:

- **Framework:** [Expo](https://expo.dev) (Managed workflow, targeting optimal tablet deployment).
- **Navigation:** `expo-router` for file-based native routing.
- **Animations:** `react-native-reanimated` for smooth, immersive transitions (glitch effects, warning states, glowing interfaces).
- **Multimedia:** `expo-audio` and `expo-video` for background industrial ambient noises, error feedback, or CCTV loop videos.
- **Icons:** `lucide-react-native` for a clean, technological, sci-fi UI design.
- **Localization:** `react-i18next` to easily swap game languages between local and foreign players.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) installed on your development/integration machine.

### 1. Clone the project and install dependencies

```bash
git clone git@github.com:VillageElargi/ECAP-DOMOTIC-PANIC.git
cd lights-out
npm install
```

### 2. Start the development server

```bash
npm run start
```

### 3. Run on tablet / simulator

From the Expo interactive terminal, select your target platform:

- **iOS (iPad):** Press `i` (Requires macOS and Xcode/Simulator).
- **Android (Tablet):** Press `a` (Requires Android Studio or a physical tablet connected via ADB).
- **Web:** Press `w` or run `npm run web` to quickly test the game logic and UI in your browser.

---

## 📁 Project Structure (Overview)

- `/app`: Route screens and game states handled by `expo-router`.
- `/components`: Reusable components (the Lights On grid, UI switches, feedback screens).
- `/assets`: Media files (sound effects for success/errors, background loop videos).
- `/scripts`: Utility scripts, including default layout reset helpers.

---

## ⚙️ Room Maintenance & Game Master Info

- **Resetting the game:** If players get stuck or to reset the room between sessions, the app can be reloaded by double tapping each screen corner.
- **Kiosk Mode Recommendation:** For live escape room deployments, it is highly recommended to lock the tablet using **Single App Mode** (iOS Guided Access / Android Screen Pinning) so players cannot close or exit the interface.

---

EXCLUSIVE PROPERTY OF ALYEM SÀRL © 2026
