//Modelのコンストラクタを作成
function AppModel(attrs) {
  this.val = "";
  //validation Patternを設定
  this.attrs = {
    required: "",
    maxlength: 8,
    minlength: 4
  };
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

//this.valの値が正しいかチェック
AppModel.prototype.validate = function() {
  var val;
  //エラーー保存用
  this.errors = [];

  for (var key in this.attrs) {
    val = this.attrs[key];
    //メソッドを取り出しvalの引数を渡して実行
    if (!this[key](val)) this.errors.push(key);
  }

  //this.errorsが空であればvalidイベントを通知、からでなかればinvalidイベントを通知
  this.trigger(!this.errors.length ? "valid" : "invalid");
};

//値が空かどうかを判定
AppModel.prototype.required = function(num) {
  return this.val !== "";
};

//値の文字数が引数num以上かどうかを判定
AppModel.prototype.maxlength = function(num) {
  return num >= this.val.length;
};

//値の文字数が引数num以下かどうかを判定
AppModel.prototype.minlength = function(num) {
  return num <= this.val.length;
};

//ModelをもとにViewを作成
function AppView(el) {
  this.initialize(el);
  this.handleEvents();
}

AppView.prototype.initialize = function(el) {
  this.$el = $(el);

  var obj = this.$el.data;

  //required属性があればobjに{required:''}をマージ
  if (this.$el.prop("required")) {
    obj["required"] = "";
  }

  this.model = new AppModel(obj);
};