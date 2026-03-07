# !Calculator — Not Boring Calculator

A faithful cross-platform recreation of the **(Not Boring) Calculator** app by Andy Works,  
built with **React Native + Expo** for both **iOS and Android**.

---

## Features

| Feature | Description |
|---|---|
| **Show Your Work** | Full equation displayed as you type — every number and operator |
| **Editable Input** | Backspace any character mid-expression, no need to clear |
| **Big & Readable** | Massive 3D extruded numbers fill the screen |
| **Live Preview** | See `= result` before you press `=` |
| **DTMF Sounds** | Haptic feedback on every key (add `.wav` files for full tones) |
| **Long Press Copy** | Hold the display to copy the result to clipboard |
| **6 Skins** | Graphite · Chroma (iridescent) · Karat (gold) · Andy (amber) · Monsters (neon) · Opal |
| **Percentage** | Built-in `%` key shows percentage mid-equation |
| **Cross-platform** | iOS 16+ · Android 8+ |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npx expo start

# 3. Run on device/simulator
npx expo start --ios        # iOS Simulator
npx expo start --android    # Android Emulator / Device
```

---

## Project Structure

```
not-boring-calculator/
├── App.tsx                        # Root: font loading + SafeAreaProvider
├── app.json                       # Expo config (bundle IDs, icons, splash)
├── package.json
├── tsconfig.json
├── babel.config.js
│
├── assets/
│   ├── icon.png                   # App icon (1024×1024)
│   ├── splash.png                 # Splash screen
│   ├── adaptive-icon.png          # Android adaptive icon
│   └── sounds/                    # (optional) DTMF .wav files per key
│       ├── dtmf_0.wav
│       ├── dtmf_1.wav
│       └── ...
│
└── src/
    ├── types.ts                   # Shared TypeScript interfaces
    ├── skins/
    │   └── index.ts               # All 6 skin definitions
    ├── engine/
    │   ├── math.ts                # evaluate(), tokenize(), formatters
    │   └── audio.ts               # Haptics + DTMF tone system
    ├── hooks/
    │   └── useCalculator.ts       # All calculator state & logic
    ├── components/
    │   ├── BigDisplay.tsx         # Massive 3D number (auto-sizes, gradient)
    │   ├── EquationLine.tsx       # Small equation tokens + blinking cursor
    │   ├── Key.tsx                # Flat text key with spring press animation
    │   └── SkinPanel.tsx          # Skin picker overlay
    └── screens/
        └── CalculatorScreen.tsx   # Main screen assembling all components
```

---

## Adding Real DTMF Audio

1. Generate or download `.wav` files for each DTMF key (0–9, +, −, ×, ÷, =)
2. Place them in `assets/sounds/`
3. Follow the commented instructions in `src/engine/audio.ts`

---

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure project
eas build:configure

# Build for iOS (requires Apple Developer account)
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## Skins Reference

| Skin | Background | Numbers | Accent |
|---|---|---|---|
| **Graphite** | `#111111` | White | Amber `#C8922A` |
| **Chroma** | `#050507` | Iridescent gradient | Purple `#CF8FFF` |
| **Karat** | `#0A0800` | Gold `#FFD060` | Gold |
| **Andy** | `#E8900E` | Dark brown | Red `#CC2200` |
| **Monsters** | `#070E16` | Neon green | `#39FF14` |
| **Opal** | `#C8D8EE` | Navy `#1A3060` | Blue `#2060C0` |

---

## Tech Stack

- **Expo SDK 51** — managed workflow
- **React Native 0.74**
- **TypeScript** — strict mode
- **Bebas Neue** — display font (the condensed 3D numbers)
- **Inter** — UI / keypad font
- **react-native-svg** — Chroma gradient text
- **expo-haptics** — tactile feedback
- **expo-av** — audio playback
- **expo-clipboard** — long-press copy

---

## Credits

Inspired by **(Not Boring) Calculator** by [Andy Works / Not Boring Software LLC](https://notbor.ing).  
This is a fan recreation for cross-platform learning purposes.
