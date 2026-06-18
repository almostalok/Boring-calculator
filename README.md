<p align="center">
  <img src="assets/icon.png" alt="!Calculator icon" width="120" />
</p>

<h1 align="center">!Calculator — Not Boring Calculator</h1>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=18&pause=1200&color=E8A11A&center=true&vCenter=true&width=560&lines=Show+your+math+in+full+color;Live+preview+as+you+type;Six+skins%2C+haptics%2C+DTMF+ready" alt="Typing intro" />
</p>

<p align="center">
  <a href="#quick-start"><img alt="Quick Start" src="https://img.shields.io/badge/Quick_Start-%F0%9F%9A%80-FF9F1C?style=for-the-badge" /></a>
  <a href="#features"><img alt="Features" src="https://img.shields.io/badge/Features-%E2%9C%A8-7C5CFF?style=for-the-badge" /></a>
  <a href="#skins"><img alt="Skins" src="https://img.shields.io/badge/Skins-%F0%9F%8E%A8-2EC4B6?style=for-the-badge" /></a>
</p>

<p align="center">
  A beautiful, cross-platform recreation of the <strong>(Not Boring) Calculator</strong> app by Andy Works,<br/>
  built with <strong>React Native + Expo</strong> for iOS and Android.
</p>

<p align="center">
  <img alt="Expo SDK" src="https://img.shields.io/badge/Expo-51-000020?logo=expo&logoColor=white" />
  <img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.74-61DAFB?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" />
  <img alt="Platform" src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey?logo=apple" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
</p>

<p align="center">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/almostalok/Boring-calculator?style=for-the-badge" />
  <img alt="Stars" src="https://img.shields.io/github/stars/almostalok/Boring-calculator?style=for-the-badge" />
  <img alt="Forks" src="https://img.shields.io/github/forks/almostalok/Boring-calculator?style=for-the-badge" />
  <img alt="Open issues" src="https://img.shields.io/github/issues/almostalok/Boring-calculator?style=for-the-badge" />
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/almostalok/Boring-calculator?style=for-the-badge" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [In Motion](#in-motion)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Running on a Device or Simulator](#running-on-a-device-or-simulator)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Skins](#skins)
- [Adding Real DTMF Audio](#adding-real-dtmf-audio)
- [Troubleshooting](#troubleshooting)
- [Building for Production](#building-for-production)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Credits & License](#credits--license)

---

## Overview

**!Calculator** is a feature-rich mobile calculator that trades the plain grid of numbers for a polished, expressive experience. It shows your full equation as you type, lets you edit any part of it, previews the result in real time, and wraps it all in six hand-crafted visual skins — from matte Graphite to neon Monsters.

---

## In Motion

<p align="center">
  <img src="assets/splash.png" alt="!Calculator splash screen" width="720" />
</p>

<details>
<summary><strong>Tap to reveal the micro-interactions</strong></summary>

- **Springy keypad** with tactile press animations on every key.
- **Live equation flow** that keeps your full expression visible as it grows.
- **Result preview** that updates continuously before you hit `=`.
- **Haptics everywhere** for a punchy, physical feel.
</details>

<details>
<summary><strong>Tap to reveal the sound + skin stack</strong></summary>

- **DTMF-ready tones** (drop in `.wav` files to make every key sing).
- **Six hand-crafted skins** for graphite, neon, gold, and more.
- **Gradient accents** and oversized typography for that “not boring” vibe.
</details>

> **Tip:** Long-press the result display to copy the value instantly.

---

## Features

| Feature | Description |
|---|---|
| **Show Your Work** | Full equation displayed as you type — every number and operator stays visible |
| **Editable Input** | Backspace any character mid-expression without clearing everything |
| **Big & Readable** | Massive 3D-extruded numbers that auto-scale to fill the screen |
| **Live Preview** | See `= result` updated in real time before pressing `=` |
| **Haptic Feedback** | Tactile response on every key press via `expo-haptics` |
| **DTMF Sounds** | Optional per-key audio tones (drop `.wav` files into `assets/sounds/`) |
| **Long-Press Copy** | Hold the result display to copy the value to the clipboard |
| **6 Skins** | Graphite · Chroma (iridescent) · Karat (gold) · Andy (amber) · Monsters (neon) · Opal |
| **Percentage Key** | Built-in `%` support mid-equation |
| **Sign Toggle** | `+/-` key flips the sign of the current operand |
| **Cross-Platform** | Runs on iOS 16+ and Android 8+ from a single codebase |

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org) | 18 LTS or later | Required for npm and the Expo CLI |
| [npm](https://www.npmjs.com) | 9+ | Bundled with Node.js |
| [Expo Go](https://expo.dev/go) | Latest | Install on your iOS or Android device for quick testing |
| Xcode | 15+ | Required to run the iOS Simulator (macOS only) |
| Android Studio | Hedgehog+ | Required to run the Android Emulator |

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/almostalok/Boring-calculator.git
cd Boring-calculator

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start
```

Scan the QR code that appears in the terminal with the **Expo Go** app on your phone to launch the app instantly.

---

## Running on a Device or Simulator

```bash
# iOS Simulator (macOS only)
npx expo start --ios

# Android Emulator or connected device
npx expo start --android

# Web browser (limited support)
npx expo start --web
```

> **Tip:** Press `i` or `a` in the Expo terminal to open the iOS or Android target respectively, without restarting the server.

---

## Available Scripts

Run these from the project root:

| Command | Description |
|---|---|
| `npm run start` | Starts the Expo development server |
| `npm run ios` | Starts Expo and opens iOS Simulator (macOS only) |
| `npm run android` | Starts Expo and opens Android Emulator/device |
| `npm run web` | Starts Expo for web preview |
| `npm run lint` | Runs ESLint for `.ts`/`.tsx` files |

---

## Project Structure

```
Boring-calculator/
├── App.tsx                        # App entry: font loading + SafeAreaProvider
├── app.json                       # Expo config (bundle IDs, icons, splash screen)
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # TypeScript configuration (strict mode)
├── babel.config.js                # Babel / Metro configuration
│
├── assets/
│   ├── icon.png                   # App icon (1024 × 1024 px)
│   ├── splash.png                 # Splash screen image
│   ├── adaptive-icon.png          # Android adaptive foreground icon
│   ├── favicon.png                # Web favicon (48 × 48 px)
│   └── sounds/                    # (optional) DTMF .wav files per key
│       ├── dtmf_0.wav
│       ├── dtmf_1.wav
│       └── ...
│
└── src/
    ├── types.ts                   # Shared TypeScript interfaces (Skin, Token, …)
    ├── skins/
    │   └── index.ts               # Definitions for all 6 skins
    ├── engine/
    │   ├── math.ts                # evaluate(), tokenize(), and number formatters
    │   └── audio.ts               # Haptics + DTMF tone system
    ├── hooks/
    │   └── useCalculator.ts       # All calculator state & business logic
    ├── components/
    │   ├── BigDisplay.tsx         # Massive 3D number with auto-scaling and gradient
    │   ├── EquationLine.tsx       # Scrollable equation tokens with blinking cursor
    │   ├── Key.tsx                # Keypad button with spring-press animation
    │   └── SkinPanel.tsx          # Skin picker overlay
    └── screens/
        └── CalculatorScreen.tsx   # Main screen that assembles all components
```

---

## Skins

Six carefully designed themes let you personalise the look and feel of the calculator.

| Skin | Tagline | Background | Number Color | Accent |
|---|---|---|---|---|
| **Graphite** | Material of creation | `#111111` | White | Amber `#C8922A` |
| **Chroma** | Bake in the rays | `#050507` | Iridescent gradient | Purple `#CF8FFF` |
| **Karat** | Live rich | `#0A0800` | Gold `#FFD060` | Gold `#FFD060` |
| **Andy** | Material of making | `#E8900E` | Dark brown `#5A3000` | Red `#CC2200` |
| **Monsters** | Live fun | `#070E16` | Light green `#E8FFE0` | Neon `#39FF14` |
| **Opal** | Material of inspiration | `#C8D8EE` | Navy `#1A3060` | Blue `#2060C0` |

Tap the palette icon on the calculator screen to open the skin picker.

---

## Adding Real DTMF Audio

The app ships with haptic feedback only. To add audible key tones:

1. Generate or download `.wav` files for each key: `0`–`9`, `.`, `+`, `−`, `×`, `÷`, `=`.
2. Name them according to the convention in `src/engine/audio.ts` (e.g. `dtmf_1.wav`).
3. Place the files in `assets/sounds/`.
4. Follow the commented instructions in `src/engine/audio.ts` to load and play them via `expo-av`.

---

## Troubleshooting

- **`npm run lint` fails with `eslint: not found`**  
  Install ESLint as a dev dependency if your environment does not already provide it:
  ```bash
  npm install --save-dev eslint
  ```
- **No key sounds are playing**  
  The project ships with haptics only by default. Add `.wav` files to `assets/sounds/` and enable audio loading in `src/engine/audio.ts`.
- **Expo can’t connect to your device**  
  Ensure your computer and phone are on the same network, or switch Expo connection mode to Tunnel.

---

## Building for Production

Production builds are handled by **Expo Application Services (EAS)**.

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Log in to your Expo account
eas login

# Configure the project (creates eas.json)
eas build:configure

# Build for iOS (requires an Apple Developer account)
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to the App Store / Google Play
eas submit --platform ios
eas submit --platform android
```

> Update the `extra.eas.projectId` field in `app.json` with your own EAS project ID before building.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Expo](https://expo.dev) | SDK 51 | Managed workflow, OTA updates, build toolchain |
| [React Native](https://reactnative.dev) | 0.74 | Cross-platform UI framework |
| [TypeScript](https://www.typescriptlang.org) | 5.x (strict) | Type-safe development |
| [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) | — | Condensed display font for 3D numbers |
| [Inter](https://fonts.google.com/specimen/Inter) | — | UI and keypad font |
| [react-native-svg](https://github.com/software-mansion/react-native-svg) | 15.x | Chroma iridescent gradient text |
| [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) | 13.x | Tactile key feedback |
| [expo-av](https://docs.expo.dev/versions/latest/sdk/av/) | 14.x | Optional DTMF audio playback |
| [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/) | 6.x | Long-press copy to clipboard |
| [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) | 13.x | Background and accent gradients |

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** and ensure the code compiles without errors:
   ```bash
   npx tsc --noEmit
   ```
3. **Lint your code**:
   ```bash
   npm run lint
   ```
   If ESLint is missing in your environment, install it using the Troubleshooting section above.
4. **Commit** with a clear message and **push** your branch.
5. Open a **Pull Request** describing what you changed and why.

Please keep pull requests focused — one feature or fix per PR.

---

## Credits & License

Inspired by **(Not Boring) Calculator** by [Andy Works / Not Boring Software LLC](https://notbor.ing).  
This project is a fan recreation built for cross-platform learning purposes and is not affiliated with or endorsed by Andy Works.

Released under the [MIT License](https://opensource.org/licenses/MIT).
