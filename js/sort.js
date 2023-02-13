// 関数の実行時間を計測する関数
// 実行にかかった時間をミリ秒で出力
function measureb(name, func) {
    const start = performance.now();
    func();
    const end = performance.now();
    
    const elapsed = (end - start);
    const elapsedStr = elapsed.toPrecision(3) + " [ms]";
    document.querySelector( 'input[name="i"]' ).value = elapsedStr
}

function measureq(name, func) {
    const start = performance.now();
    func();
    const end = performance.now();
    
    const elapsed = (end - start);
    const elapsedStr = elapsed.toPrecision(3) + " [ms]";
    document.querySelector( 'input[name="t"]' ).value = elapsedStr
}

// テスト用の配列データをランダムに生成する関数
function generateTestData(length) {
    const data = [];
    for(let i=0; i<length; i++) {
        data.push(Math.random());
    }
    return data;
}

// バブルソート
//  let 局所変数
function bubblesort(array) {
    const length = array.length;
    for(let i=0; i<length; i++) {
        for(let j=length-1; j>i; j--) {
            if(array[j] < array[j-1]) {
                [array[j], array[j-1]] = [array[j-1], array[j]];
            }
        }
    }
}

// クイックソート
function quicksortImpl(array, left, right) {
    if(left > right) { return; }
    
    const pivot = array[Math.floor((left+right)/2)];
    let i = left;
    let j = right;
    
    while(true) {
        while(array[i] < pivot) { i++ }
        while(array[j] > pivot) { j-- }
        if(i >= j) { break; }
        
        [array[i], array[j]] = [array[j], array[i]];
        
        i++;
        j--;
    }
    
    quicksortImpl(array, left, i-1);
    quicksortImpl(array, j+1, right);
}

function quicksort(array) {
    quicksortImpl(array, 0, array.length-1);
}

function calc(){
    // テストデータの生成
    const testData = generateTestData(1000);

    // バブルソート計測
    measureb('bubblesort', () => {
        const data = [...testData]; // コピー
        bubblesort(data);
    });

    // クイックソート計測
    measureq('quicksort', () => {
        const data = [...testData];
        quicksort(data);
    });
}

//  inputのクリア
function clr() 
{
    v = " "
    document.querySelector( 'input[name="i"]' ).value = v
    document.querySelector( 'input[name="t"]' ).value = v
}
