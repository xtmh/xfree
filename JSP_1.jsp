<%@ page contentType="text/html;charset=Shift_JIS" autoFlush="true" %>
 <html>
 <head>
 <title>バッファの制御（outオブジェクト）</title>
 </head>
 <body>
 <%
 for(int i=0;i<=10;i++){
   Thread.sleep(1000);
   /* データベース処理など、処理時間の長い処理 */
   out.print("…");
   out.flush();
 }
 %>
 </body>
 </html>