export const record = (stream, ms) => {
    const rec = new MediaRecorder(stream), data = [];
    rec.ondataavailable = e => data.push(e.data);

    rec.start();
    console.log(rec.state + " for " + (ms / 1000) + " seconds...");
    // eslint-disable-next-line
    const stopped = new Promise((r, e) => (rec.onstop = r, rec.onerror = e));
    return Promise.all([stopped, wait(ms).then(() => rec.stop())])
        .then(() => data);
};

export const stop = stream => stream.getTracks().forEach(track => track.stop());
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
