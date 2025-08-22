# Rust Learning App

This project is an interactive learning application designed for mobile devices, created for the purpose of learning the Rust programming language. The educational content presented in the app is directly based upon the material available in the Rust Book repository.

## Android

The app is configured to run inside a native Android wrapper using [Capacitor](https://capacitorjs.com/).

### Prerequisites

- Node.js 18+ and npm installed
- Android Studio (latest stable) with Android SDK + Platform Tools
- JDK 17 (use Android Studio bundled JDK or set `JAVA_HOME`)

### First-time Setup

1) Install dependencies
```
npm install
```

2) Generate Android project (one time)
```
npx cap add android
```

3) Build web and sync native project
```
npm run android
```

4) Open in Android Studio
```
npm run android:open
```
Then select a device/emulator and click Run, or use Build > Build Bundle(s)/APK(s).

### Iteration Workflow

- After web changes:
```
npm run android   # rebuild web + sync
```

- If only syncing plugins/native deps:
```
npm run android:sync
```

### Notes

- TypeScript is pinned to 4.9.x to satisfy CRA 5 peer requirements.
- Web assets live in `build/` (CRA). Capacitor copies them to `android/app/src/main/assets/` on sync.
- If Gradle sync fails, ensure Android Studio uses JDK 17 and the Android SDK is installed.
