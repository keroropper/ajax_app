function check() {

  const posts = document.querySelectorAll(".post");  //view/posts/index.html.erbの"post"クラスを取得して、"posts"という関数に代入
  posts.forEach(function (post) {  //↑で取得した,postが入っているpostsをpostという名前で、要素一つずつに対してクリックした際に動作するイベントを設置
    if (post.getAttribute("data-load") != null) { //data-loadがされていればtrue,されていなければfalse。一回目はdata-loadが定義されていないからfalse
      return null;                                   //2回目は、↓でdata-loadが定義されたため、処理はここで止まる。
    }
    post.setAttribute("data-load", "true"); // postにdata-loadをセット

    post.addEventListener("click", () => {   //メモをクリックした場合の処理↓↓
      const postId = post.getAttribute("data-id"); //postId＝ "postの属性値である”data -id"を取得
      const XHR = new XMLHttpRequest();  //エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行う
      XHR.open("GET", `/posts/${postId}`, true);//XHRの内容。httpメソッド＝GET、パス＝`/posts/${postId}`、非同期通信のON/OFF＝true
      XHR.responseType = "json";//レスポンス形式＝json
      XHR.send();//設定した情報をサーバーサイドへ送信
      XHR.onload = () => { //レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
        if (XHR.status != 200) { //もしステータスコードが２００以外の場合、
          alert(`Error ${XHR.status}: ${XHR.statusText}`); //アラートを設定
          return null;          //JavaScriptの処理から抜け出す。エラーが出た場合に、15行目以降に記述されている処理を行わないようにすることが目的
        }
        const item = XHR.response.post;//checkedアクションで返却したitemは、XHR.response.postで取得
        if (item.checked === true) { //既読
          post.setAttribute("data-check", "true");  //postの属性値にdata-checkをセット
        } else if (item.checked === false) { //未読
          post.removeAttribute("data-check");  //"data-check"を削除
        }
      };
    });
  });
}
setInterval(check, 1000); //1秒に一回
