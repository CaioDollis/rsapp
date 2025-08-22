This project is an interactive learning application designed for mobile devices, created for the purpose of learning the Rust programming language. The educational content presented in the app is directly based upon the material available in the Rust Book repository.

## Android

The app is configured to run inside a native Android wrapper using [Capacitor](https://capacitorjs.com/).

### Building

```
npm run android
```

The command builds the web assets and synchronizes them with the Android project. On first run, generate the Android platform folder with:

```
npx cap add android
```

Open the `android` directory in Android Studio to run the app on a device or create an APK.
