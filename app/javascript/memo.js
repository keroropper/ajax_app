function memo() {  //memoという関数を定義。
  const submit = document.getElementById("submit"); //id"submit"を取得
  submit.addEventListener("click", (e) => {//取得したsubmitの情報をクリックしたときのイベントの設定
    const formData = new FormData(document.getElementById("form"));
     //FormDataというオブジェクトを作成し、"form"を引数として取得。それをformDataに代入。メモ投稿のフォームに入力された情報を非同期通信で送信する必要があるため
    const XHR = new XMLHttpRequest();  //非同期通信を実装するために必要な XMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true); //openによって、リクエストの内容を設定。HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.responseType = "json"; //リクエストの形式は"json"に設定。
    XHR.send(formData);
    XHR.onload = () => { //レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
      if (XHR.status != 200) {  //ステータスが200以外（上手くいかなかった時）の場合。
        alert(`Error ${XHR.status}: ${XHR.statusText}`); //アラートがなるように設定
        return null;
      }
      const item = XHR.response.post;  //レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");//HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content"); //メモの入力フォームをリセットするため。
      //↓↓「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;//旧データに、${item.id}、${item.created_at}、 ${item.content}を付与して再表示
      list.insertAdjacentHTML("afterend", HTML); //list要素の直後にHTMLを追記
      formText.value = ""; //「メモの入力フォームに入力されたままの文字」はリセット。空の文字列に上書き。
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);//memoないの処理は、loadされたときに実行される