export class Recorder {
    _data;
    _stream;

    constructor(stream) {
        this._stream = stream;
    }

    start() {
        this._rec = new MediaRecorder(this._stream);
        this._data = [];
        this._rec.ondataavailable = e => {
            this._data.push(e.data);
        }
        this._rec.start();
    }

    stop() {
        const stopped = new Promise((r, e) => {
            this._rec.onstop = r;
            this._rec.onerror = e;
        });
        this._rec.stop();
        this._stream.getTracks().forEach(track => track.stop());
        return stopped.then(() => {
            return new Blob(this._data, { type: "video/webm" });
        });
    }

    get data() {
        return this._data;
    }

}
