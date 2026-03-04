This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Release SDK

1. Baixe a versão de Release no Google Drive [aqui](https://drive.google.com/file/d/1oRwxqCTZ1QNMxdSrzH4K7bbCvXRnEtJd/view?usp=sharing)

2. Inicie um emulador de Android na mesma maquina em que a API esta em sendo executada. (Para instalar e iniciar a API siga o README em [api-habits-tracker](https://github.com/murilombs/api-habits-tracker) )

3. Instale o executavel no Emulador de Android

4. Abra o aplicativo no Emulador

Durante o processo para gerar uma versão de release do SDK atravez de

```sh

.\gradlew assembleRelease

```

Foi disparado o seguinte erro

```sh
FAILURE: Build failed with an exception.
Execution failed for task ':app:createBundleReleaseJsAndAssets'.
> Couldn't determine Hermesc location. Please set `react.hermesCommand` to the path of the hermesc binary file. node_modules/react-native/sdks/hermesc/%OS-BIN%/hermesc
```

O problema de coopilção ja foi descoberto e documentado recentemente por outros desenvolvedores, nenhuma solução estavel foi documentada ate o momento

[Couldn't determine Hermesc location](https://github.com/facebook/react-native/issues/55673)

[Android - Build issue with hermesCommand](https://github.com/facebook/react-native/issues/37713)

#### _Follow up - ATUALIZAÇÃO DE CORREÇÃO_

Como documentado na Theread "[Couldn't determine Hermesc location](https://github.com/facebook/react-native/issues/55673)" uma solução foi encontrada e [documentada](https://github.com/facebook/react-native/issues/55673#issuecomment-3954665544).

A solução proposta se mostrou funcional ao permitir gerar uma versão de Release executavel
