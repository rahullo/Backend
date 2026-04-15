# Firebase Cloud Messaging Setup (Android + iOS)

## 1) Create Firebase project

- Open Firebase Console.
- Create project `GoalPilot AI`.
- Add Android and iOS apps.

## 2) Android setup

- Download `google-services.json` to `frontend/android/app/google-services.json`.
- Add Google Services plugin in Android Gradle files.
- Add messaging dependency via `@react-native-firebase/messaging`.

## 3) iOS setup

- Download `GoogleService-Info.plist` to `frontend/ios/GoalPilotAI/`.
- Enable Push Notifications + Background Modes in Xcode capabilities.
- Upload APNs auth key in Firebase project settings.

## 4) Backend setup

- Generate Firebase Admin SDK service account key.
- Populate backend env:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`

## 5) Notification strategy

- Daily reminders for pending tasks.
- Streak alert when user misses a day.
- Achievement alerts on streak milestones.
