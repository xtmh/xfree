let input;
let img;
let faceapi;

// 検出オプション
let options = {
    withLandmarks: true,
    withDescriptors: false
};

function setup() {
    input = createFileInput(handleFile);
    createCanvas(600, 400); // キャンバス
    rect(0, 0, width, height); //枠線
}

function handleFile(file) {
    if (file.type === 'image') {
        img = await createImg(file.data, '');
        img.hide();
        faceapi = ml5.faceApi(options, modelReady);
        /*
        const displaySize = { width: input.width, height: input.height };
        const canvas = document.getElementById('overlay')
        faceapi.matchDimensions(canvas, displaySize)
        //
        //const detections = faceapi.detectAllFaces(input)
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        */
    }
}

function modelReady() {
    // 顔検出
    faceapi.detectSingle(img, (error, results) => {
        // 画像をキャンバスに描画
        createCanvas(img.width, img.height); // キャンバス
        rect(0, 0, img.width, img.height); //枠線
        image(img, 0, 0, img.width, img.height);
        // 輪郭
        let x = results["detection"]["_box"]["_x"];
        let y = results["detection"]["_box"]["_y"];
        let width = results["detection"]["_box"]["_width"];
        let height = results["detection"]["_box"]["_height"];
        noFill(); // 塗りつぶしなし
        stroke("#ff0000"); // 線の色
        rect(x, y, width, height); // 四角形を描画

        // ランドマーク
        let landmarks = results["landmarks"]["_positions"];
        for (let landmark of landmarks) {
            let x = landmark["_x"];
            let y = landmark["_y"];
            fill("#00ff00"); // 塗りつぶしの色
            noStroke(); // 線なし
            circle(x, y, 5); // 円をキャンバスに描画
        }
    });
}
