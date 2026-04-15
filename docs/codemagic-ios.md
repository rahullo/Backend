# Codemagic iOS Build Guide (from Windows)

## 1) Prepare repository

- Push monorepo to GitHub.
- Ensure iOS folder exists in `frontend/ios` (created by RN CLI).

## 2) Connect Codemagic

- Add GitHub repo in Codemagic.
- Detect `codemagic.yaml`.

## 3) Signing

- Add App Store Connect API key.
- Configure provisioning profile and distribution certificate.

## 4) Environment variables in Codemagic

- Frontend variables (API URL, Stripe key, Firebase app IDs)
- Optional secure files for iOS Firebase plist

## 5) Build

- Run workflow: `ios-release`
- Codemagic runs `npm install`, CocoaPods install, and archive build.
- Export IPA artifact for TestFlight upload.
