var videoStreamInUse = null;

function startVideo() {
    console.info('入出力デバイスを確認してビデオを開始するよ！');

    Promise.resolve()
        .then(function () {
            return navigator.mediaDevices.enumerateDevices();
        })
        .then(function (mediaDeviceInfoList) {
            console.log('使える入出力デバイスs->', mediaDeviceInfoList);

            var videoDevices = mediaDeviceInfoList.filter(function (deviceInfo) {
                return deviceInfo.kind == 'videoinput';
            });
            if (videoDevices.length < 1) {
                throw new Error('ビデオの入力デバイスがない、、、、、。');
            }

            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    deviceId: videoDevices[0].deviceId
                }
            });
        })
        .then(function (mediaStream) {
            console.log('取得したMediaStream->', mediaStream);
            videoStreamInUse = mediaStream;
            document.querySelector('video').src = window.URL.createObjectURL(mediaStream);
        })
        .catch(function (error) {
            console.error('ビデオの設定に失敗、、、、', error);
        });
}

function stopVideo() {
    console.info('ビデオを止めるよ！');

    videoStreamInUse.getVideoTracks()[0].stop();

    if (videoStreamInUse.active) {
        console.error('停止できかた、、、', videoStreamInUse);
    } else {
        console.log('停止できたよ！', videoStreamInUse);
    }
}

function snapshot() {
    console.info('スナップショットをとるよ！');

    var videoElement = document.querySelector('video');
    var canvasElement = document.querySelector('canvas');
    var context = canvasElement.getContext('2d');

    context.drawImage(videoElement, 0, 0, videoElement.width, videoElement.height);
    document.querySelector('img').src = canvasElement.toDataURL('image/webp');
}