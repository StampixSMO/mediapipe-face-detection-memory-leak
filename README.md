# Mediapipe Face Detection Memory Leak

## Reproduction

1. Install dependencies: `npm install`
2. Run the app: `npm start`
3. Open http://localhost:3000 in Safari
5. Open the Timelines tab
6. Start a recording
7. Repeatedly press the button to initialize and dispose the face detection model
8. Watch the memory usage increase infinitely

This is not repeatable in Chrome.