# Frontend (React Native CLI)

## Why React Native CLI (No Expo)

This project uses React Native CLI for full native control required for:

- Custom Firebase setup for Android + iOS
- Stripe native SDK compatibility
- Native module flexibility

## Run on Android (Windows)

```bash
npm install
npx react-native start
npx react-native run-android
```

## iOS Build in Cloud (Codemagic)

Use `codemagic.yaml` in repo root. You can build iOS artifacts without local macOS.

## App Modules

- Auth (signup/login/persistent token)
- Goals + AI plan generation
- Checklist + progress
- Dashboard analytics
- Subscription screen

## Next Production Enhancements

- Add React Query and offline cache
- Add end-to-end tests with Detox
- Add polished UI kit and animations
