//素数追求
function getPrimeNumber(num){
	var flg = 0;
	for(var i=2; i<=num -1; i++){
		if(num % i === 0){
			flg = i;
			break;
		}
	}
	if(flg === 0){
		return true;
	}
	else{
		return false;
	}
}
 
// 結果数値用の器
var prime_numbers = [];
var pn, pl;
function prime(){
	// 1~100まで
	// === 厳密演算子（型も評価）
	for(var i=2; i<=pn; i++){
		if(getPrimeNumber(i) === true){
			prime_numbers.push(i);
		}
	}
 }
 
// 結果
function calc(){
	const startTime = performance.now(); // 終了時間
	prime_numbers = [];
	pn = document.querySelector( 'input[name="i"]' ).value
	prime()
	pl = document.querySelector( 'input[name="t"]' ).value = prime_numbers.length
    for(n=0; n<pl; n++){
		document.querySelector( 'input[name="i"]' ).value +=  " " + prime_numbers[n]
    };
	const endTime = performance.now(); // 終了時間
    var tx = document.getElementById('T2');
    tx.innerHTML=Math.floor((endTime-startTime)*100)/100+"ms";
	//
	var str = "";
	for(var i = 0; i<pl; i++){
		str += prime_numbers[i] + ","
	}
	//	csv保存
	var blob =new Blob([str],{type:"text/csv"}); //配列に上記の文字列(str)を設定
	var link =document.createElement('a');
	link.href = URL.createObjectURL(blob);
	//document.body.appendChild(link);
	link.download ="tempdate.csv";
	link.click();
	//document.body.removeChild(link);
	//delete link;
}

//  inputのクリア
function clr() 
{
    v = " "
	prime_numbers = []
    document.querySelector( 'input[name="i"]' ).value = v
    document.querySelector( 'input[name="t"]' ).value = v
}
