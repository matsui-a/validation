//Modelのコンストラクタを作成
function AppModel(attrs) {
  this.val = "";
  //オブザーバーの機能追加
  this.listeners = {
    valid: [],
    invalid: []
  };
}

AppModel.prototype.on = function(event, func) {
  this.listeners[event].push(func);
};

AppModel.prototype.trigger = function(event) {
  $.each(this.listeners[event], function() {
    this();
  });
};

//プロトタイプ setメソッド追加
AppModel.prototype.set = function(val) {
  //引数で受け取ったvalとthis.valを比較して変化があれば以下の処理を行う
  if (this.val === val) return;
  this.val = val;
  this.validate();
};