export const VIDEO_SIZES = {
    AUTO: {width: 0, height: 0, label: "Auto"},
    SMALL: {width: 600, height: 400, label: "600x400"},
    MEDIUM: {width: 1280, height: 720, label: "1280x720"}
}

export class MediaConstraints {
    constructor() {
        this.size = VIDEO_SIZES.AUTO;
    }

    toMediaStreamConstraints() {
        return {
            video: this._size === VIDEO_SIZES.AUTO ? true : {
                width: this._size.width,
                height: this._size.height
            },
            audio: this._audio && {
                echoCancellation: this._echoCancellation,
                noiseSuppression: this._noiseSuppression,
            },
            grabMic: this._grabMic
        }
    }

    get size() {
        return this._size;
    }

    set size(newSize) {
        this._size = newSize;
    }

    get audio() {
        return this._audio;
    }

    set audio(newAudio) {
        this._audio = newAudio;
    }

    get echoCancellation() {
        return this._echoCancellation;
    }

    set echoCancellation(echoCancellation) {
        this._echoCancellation = echoCancellation;
    }

    get noiseSuppression() {
        return this._noiseSuppression;
    }

    set noiseSuppression(noiseSuppression) {
        this._noiseSuppression = noiseSuppression;
    }

    get grabMic() {
        return this._grabMic;
    }

    set grabMic(value) {
        this._grabMic = value;
    }
}
