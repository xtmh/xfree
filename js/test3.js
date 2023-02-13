    // input tag を更新する関数
    function update( _v )
    {
        document.querySelector( 'input[name="i"]' ).value = _v
    }
    // time tag を更新する関数
    function update_time( _v ) 
    {
        document.querySelector( 'input[name="t"]' ).value = _v + " [ms]"
    }
    //  inputのクリア
    function clr() 
    {
        v = " "
        document.querySelector( 'input[name="i"]' ).value = v
        document.querySelector( 'input[name="t"]' ).value = v
    }
    //  計算
    function calc()
    {
        var ii = document.querySelector('input[name="i"]').value;
        var result = prompt("ダイアログに入力してください", ii);
        const startTime = performance.now(); // 開始時間
        //max = 10000000
        max = result
        sum =0
        for(l=0; l<=max; l++){
            sum += l
        }
        update( sum )
        const endTime = performance.now(); // 終了時間
        update_time((endTime-startTime).toPrecision(3))
    }