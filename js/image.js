
//  画像ファイルオープン
function onFileSelected(input) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = onFileLoaded;
    reader.readAsDataURL(file);
}

function onFileLoaded(e) {
    var src_data = e.target.result;
    var img = new Image();
    img.onload = onImageSetted;
    img.src = src_data;
}

function onImageSetted(e) {
    var img_data = createImageData(e.target);
    document.getElementById('test_canvas').width = img_data.width;
    document.getElementById('test_canvas').height = img_data.height;
    document.getElementById('test_canvas').getContext('2d').putImageData(img_data, 0, 0);
    document.getElementById('test_canvas').img_data = img_data;
    document.getElementById('test_canvas').addEventListener('click', processImageData);
}

function createImageData(img) {
    var cv = document.createElement('canvas');
    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;
    var ct = cv.getContext('2d');
    ct.drawImage(img, 0, 0);
    var data = ct.getImageData(0, 0, cv.width, cv.height);
    return data;
}

//  blur
function processImageData(e) {
    var cv = document.getElementById('test_canvas');
    var img_data = cv.img_data;
    if (!img_data) {
        alert("no image data");
        return;
    }
    var processed_data = cv.getContext('2d').createImageData(img_data.width, img_data.height);
    for (var y = 1;y < img_data.height - 1;y++) {
        for (var x = 1;x < img_data.width - 1;x++) {
            var r_sum = 0;
            var g_sum = 0;
            var b_sum = 0;
            // 周囲3*3ピクセルのRGB成分を合計
            var wd = 2;
            var ar = (wd*2+1)*(wd*2+1);
            for (var yy = y - wd;yy <= y + wd;yy++) {
                for (var xx = x - wd;xx <= x + wd;xx++) {
                    var index = (xx + yy * img_data.width) * 4;
                    r_sum += img_data.data[index];      //  sum R
                    g_sum += img_data.data[index + 1];  //  sum G
                    b_sum += img_data.data[index + 2];  //  sum B
                }
            }
            var index = (x + y * img_data.width) * 4;
            // RGB平均値を算出
            var r = Math.floor(r_sum / ar);
            var g = Math.floor(g_sum / ar);
            var b = Math.floor(b_sum / ar);
            processed_data.data[index] = r;
            processed_data.data[index + 1] = g;
            processed_data.data[index + 2] = b;
            processed_data.data[index + 3] = 255;   //  alfa
        }
    }    
    cv.getContext('2d').putImageData(processed_data, 0, 0);

    // 画像のダウンロードリンクを作成
    var a = document.createElement('a');
    a.href = cv.toDataURL("image/jpeg");
    a.download = "test.jpg"
    //a.textContent = "dl";
    a.text ="dl"

    // canvas要素の親要素を取得
    var elm = cv.parentElement;
    // canvasの次にリンクを追加
    elm.appendChild(a);
}

//  色交換
function processImageData2(e) {
    var cv = document.getElementById('test_canvas');
    var img_data = cv.img_data;
    if (!img_data) {
        alert("no image data");
        return;
    }
    var processed_data = cv.getContext('2d').createImageData(img_data.width, img_data.height);
    for (var y = 1;y < img_data.height - 1;y++) {
        for (var x = 1;x < img_data.width - 1;x++) {
            var index = (x + y * img_data.width) * 4;
            var r = img_data.data[index];
            var g = img_data.data[index+1];
            var b = img_data.data[index+2];

            img_data.data[index] = g;
            img_data.data[index+1] = b;
            img_data.data[index+2] = r;

            processed_data.data[index] = b;
            processed_data.data[index + 1] = g;
            processed_data.data[index + 2] = r;
            processed_data.data[index + 3] = 255;   //  alfa
        }
    }    
    cv.getContext('2d').putImageData(processed_data, 0, 0);
}

//  グレースケール
function processImageData3(e) {
    var cv = document.getElementById('test_canvas');
    var img_data = cv.img_data;
    if (!img_data) {
        alert("no image data");
        return;
    }
    var processed_data = cv.getContext('2d').createImageData(img_data.width, img_data.height);
    for (var y = 1;y < img_data.height - 1;y++) {
        for (var x = 1;x < img_data.width - 1;x++) {
            var index = (x + y * img_data.width) * 4;
            var gray = img_data.data[index];
            processed_data.data[index] = gray;
            processed_data.data[index + 1] = gray;
            processed_data.data[index + 2] = gray;
            processed_data.data[index + 3] = 255;   //  alfa
        }
    }    
    cv.getContext('2d').putImageData(processed_data, 0, 0);
}

//  カラー化
function processImageData4(e) {
    var cv = document.getElementById('test_canvas');
    var img_data = cv.img_data;
    if (!img_data) {
        alert("no image data");
        return;
    }
    var processed_data = cv.getContext('2d').createImageData(img_data.width, img_data.height);
    for (var y = 1;y < img_data.height - 1;y++) {
        for (var x = 1;x < img_data.width - 1;x++) {
            var index = (x + y * img_data.width) * 4;
            
            processed_data.data[index] = img_data.data[index];
            processed_data.data[index + 1] = img_data.data[index+1];
            processed_data.data[index + 2] = img_data.data[index+2];
            processed_data.data[index + 3] = 255;   //  alfa
        }
    }    
    cv.getContext('2d').putImageData(processed_data, 0, 0);
}

//  二値化
function processImageData5(e) {
    var cv = document.getElementById('test_canvas');
    var img_data = cv.img_data;
    if (!img_data) {
        alert("no image data");
        return;
    }
    var processed_data = cv.getContext('2d').createImageData(img_data.width, img_data.height);
    for (var y = 1;y < img_data.height - 1;y++) {
        for (var x = 1;x < img_data.width - 1;x++) {
            var index = (x + y * img_data.width) * 4;
            var bin = 0;
            if(img_data.data[index]>128){
                bin = 256;
            }
            
            processed_data.data[index] = bin;
            processed_data.data[index + 1] = bin;
            processed_data.data[index + 2] = bin;
            processed_data.data[index + 3] = 255;   //  alfa
        }
    }    
    cv.getContext('2d').putImageData(processed_data, 0, 0);
}

//  color analyze
function processImageData6(e) {
    var cv = document.getElementById('test_canvas');
    var img_data = cv.img_data;
    if (!img_data) {
        alert("no image data");
        return;
    }
    var r = 0;
    var g = 0;
    var b = 0;
    for (var y = 1;y < img_data.height - 1;y++) {
        for (var x = 1;x < img_data.width - 1;x++) {
            var index = (x + y * img_data.width) * 4;
            r += img_data.data[index];
            g += img_data.data[index + 1];
            b += img_data.data[index + 2];
        }
    }
    r = Math.floor(r/(img_data.height*img_data.width));    
    g = Math.floor(g/(img_data.height*img_data.width));    
    b = Math.floor(b/(img_data.height*img_data.width));    
    //cv.getContext('2d').putImageData(processed_data, 0, 0);
    document.getElementById('CLR').innerHTML = "R="+r+", G="+g+", B="+b;
}

//  test
function processTest(e) {
    const startTime = performance.now(); // 開始時間
    processImageData5();
    const endTime = performance.now(); // 終了時間
    var tx = document.getElementById('T2');
    tx.innerHTML=Math.floor((endTime-startTime)*100)/100+"ms";
}

//  汎用関数
function processFunc(num){
    const startTime = performance.now(); // 開始時間
    switch(num){
        case 1:
            processImageData();
            break;
        case 2:
            processImageData2();
            break;
        case 3:
            processImageData3();
            break;
        case 4:
            processImageData4();
            break;
        case 5:
            processImageData5();
            break;
        default:
            processImageData6();
            break;
    }
    const endTime = performance.now(); // 終了時間
    var tx = document.getElementById('T2');
    tx.innerHTML=Math.floor((endTime-startTime)*100)/100+"ms";
}

