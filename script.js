document.getElementById('checkForm').onsubmit = function(event) {
  event.preventDefault();
  var tag = document.getElementById('tag').value;
  var resultElement = document.getElementById('result');
  var submitButton = document.getElementById('submitButton');

  // UIリセット
  resultElement.style.display = "none";
  resultElement.classList.remove("safe", "danger", "loading", "fadeIn");

  // ロード中の表示
  resultElement.style.display = "block";
  resultElement.innerText = "確認中...";
  resultElement.classList.add("loading");
  submitButton.disabled = true;

  // Google Apps ScriptのデプロイURL
  var url = "https://script.google.com/macros/s/AKfycbxUkcZikyTAlif9Cwb4kWGwW4EfVIXf5eO30vOpF6a1zEM8yyctaUCgYW-E7gOFBaqNtA/exec";

  // APIリクエスト
  fetch(url + "?tag=" + encodeURIComponent(tag))
    .then(response => response.text())
    .then(result => {
      resultElement.classList.remove("loading");
      submitButton.disabled = false;

      // メッセージ表示のアニメーション
      resultElement.classList.add("fadeIn");

      if (result.includes("ブラックリスト")) {
        resultElement.innerText = "⚠️ 危険: ブラックリスト登録あり";
        resultElement.classList.add("danger");
      } else {
        resultElement.innerText = "✅ 安全: 問題ありません";
        resultElement.classList.add("safe");
      }
    })
    .catch(error => {
      resultElement.innerText = "エラーが発生しました";
      resultElement.classList.add("loading");
      submitButton.disabled = false;
      resultElement.classList.add("fadeIn");
      console.error(error);
    });
};

