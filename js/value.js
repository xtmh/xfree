var objValue;
objValue="";
function ValueChange(obj)
{
    objValue=obj.value;
}

(function()
{
    var p1 = 0;
    var p2 = 0;
    function clicked1(e)
    {
        document.getElementById('p1').textContent = p1++;
    };
    function clicked2(e)
    {
        document.getElementById('p2').textContent = p2++;
    };
    document.getElementById('button1').onclick = clicked1;
    document.getElementById('button2').onclick = clicked2;
})();