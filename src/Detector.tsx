import * as React from "react";
import {FaceDetector, FilesetResolver} from "@mediapipe/tasks-vision";
import {useState} from "react";

let _detector: FaceDetector | undefined = undefined;

async function initialize() {
    if (_detector) return _detector;
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );
    _detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: "GPU",
        },
        runningMode: "IMAGE",
    });
}

async function dispose() {
    if (!_detector) return;
    _detector.close();
    _detector = undefined;
}

export function Detector() {
    const [mount, setMount] = useState(false);
    return (
        <div>
            <p>Detector</p>
            <button onClick={() => {
                if (mount) {
                    dispose()
                        .catch(console.error);
                } else {
                    initialize()
                        .catch(console.error);
                }
                setMount(!mount);
            }}>{mount ? 'Dispose' : 'Initialize'}</button>
        </div>
    );
}
