
export async function getMediaStream(displayMediaOptions) {
    let captureStream = null;

    try {
        debugger
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch(err) {
        console.error("Error: " + err);
    }
    return captureStream;
}

export function debugTrackSetup(video) {
    if (video.srcObject) {
        const videoTrack = video.srcObject.getVideoTracks()[0];

        console.info("Track settings:");
        console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
        console.info("Track constraints:");
        console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
    }
}
