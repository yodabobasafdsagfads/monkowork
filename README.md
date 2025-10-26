# Monkecord — Firebase-powered Discord-like clone

This project is a simple Discord-style chat built with React + Vite and Firebase (Auth, Firestore, Storage).
It supports:
- Email/password signup & login
- Realtime 1:1 DMs (Firestore)
- File/image upload (Firebase Storage)
- Presence and typing can be extended (basic structure included)

## Setup

1. Install:
```bash
npm install
```

2. Run dev server:
```bash
npm run dev
# open http://localhost:3000
```

3. Firebase config:
- The project already contains your Firebase web config in `src/firebase.js`.
- Make sure Firestore and Storage rules allow reads/writes during development (or adjust rules).

## Firestore structure (used by this app)

- `users/{uid}` — user profile documents
- `rooms/{roomId}` — room documents (for DMs `roomId` is uid_uid sorted)
- `rooms/{roomId}/messages/{messageId}` — message documents

## Deploy to Firebase Hosting (optional)
1. Install Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# select build folder 'dist' after running build
npm run build
firebase deploy
```

That's it — enjoy!
