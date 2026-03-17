# !Calculator — Not Boring Calculator

<p align="center">
  <img src="assets/icon.png" alt="!Calculator icon" width="120" />
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

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Running on a Device or Simulator](#running-on-a-device-or-simulator)
- [Project Structure](#project-structure)
- [Skins](#skins)
- [Adding Real DTMF Audio](#adding-real-dtmf-audio)
- [Building for Production](#building-for-production)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Credits & License](#credits--license)

---

## Overview

**!Calculator** is a feature-rich mobile calculator that trades the plain grid of numbers for a polished, expressive experience. It shows your full equation as you type, lets you edit any part of it, previews the result in real time, and wraps it all in six hand-crafted visual skins — from matte Graphite to neon Monsters.

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
4. **Commit** with a clear message and **push** your branch.
5. Open a **Pull Request** describing what you changed and why.

Please keep pull requests focused — one feature or fix per PR.

---

## Credits & License

Inspired by **(Not Boring) Calculator** by [Andy Works / Not Boring Software LLC](https://notbor.ing).  
This project is a fan recreation built for cross-platform learning purposes and is not affiliated with or endorsed by Andy Works.

Released under the [MIT License](https://opensource.org/licenses/MIT).
