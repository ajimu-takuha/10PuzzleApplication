


function make10(nums, target) {

  var 数字の並び替えパターンA = {};
  var 数字の並び替えパターンB = {};
  // if ($("#数字の並び替え").val() == "していい") {
  // 加減算混在もしくは剰余算混在の場合の数字の並び替えパターンの作成
  for (var i = 0; i < 4; i++) {
    var nums_ = nums.concat();
    var v1 = nums_[i];
    nums_.splice(i, 1);
    var v2 = nums_.shift();
    var v3 = nums_.shift();
    var v4 = nums_.shift();
    数字の並び替えパターンA[[v1, v2, v3, v4].join(".")] = [v1, v2, v3, v4];
  }
  // 四則演算混在の場合の数字の並び替えパターンの作成
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 2; k++) {
        var nums_ = nums.concat();
        var v1 = nums_[i]; nums_.splice(i, 1);
        var v2 = nums_[j]; nums_.splice(j, 1);
        var v3 = nums_[k]; nums_.splice(k, 1);
        var v4 = nums_[0];
        数字の並び替えパターンB[[v1, v2, v3, v4].join(".")] = [v1, v2, v3, v4];
      }
    }
  }
  // } else {
  //   数字の並び替えパターンA[nums.join(".")] = nums;
  //   数字の並び替えパターンB[nums.join(".")] = nums;
  // }
  var exps = {};

  // すべて加算の場合：素直に入力順に計算
  exps[nums.join("+")] = null;
  // 加減算混合の場合：カッコは関係ない。最初の文字のみ考慮する。
  var opes = ["+", "-"];
  for (var nm_ in 数字の並び替えパターンA) {
    var nm = 数字の並び替えパターンA[nm_];
    var v1 = nm[0];
    var v2 = nm[1];
    var v3 = nm[2];
    var v4 = nm[3];
    for (var j = 1; j < 8; j++) {
      var exp = v1 + opes[j & 1] + v2 + opes[(j & 2) / 2] + v3 + opes[(j & 4) / 4] + v4;
      exps[exp] = null;
    }
  }

  // すべて乗算の場合：素直に入力順に計算
  exps[nums.join("*")] = null;
  // 乗除算混合の場合：カッコは関係ない。最初の文字のみ考慮する。
  var opes = ["*", "/"];
  for (var nm_ in 数字の並び替えパターンA) {
    var nm = 数字の並び替えパターンA[nm_];
    var v1 = nm[0];
    var v2 = nm[1];
    var v3 = nm[2];
    var v4 = nm[3];
    for (var j = 1; j < 8; j++) {
      var exp = v1 + opes[j & 1] + v2 + opes[(j & 2) / 2] + v3 + opes[(j & 4) / 4] + v4;
      exps[exp] = null;
    }
  }


  // 加減2, 乗除1混合
  var opesG = [
    ["*", "+", "+"],
    ["*", "+", "-"],
    ["*", "-", "-"],
    ["/", "+", "+"],
    ["/", "+", "-"],
    ["/", "-", "-"]
  ];

  for (var nm_ in 数字の並び替えパターンB) {
    var nm = 数字の並び替えパターンB[nm_];
    var v1 = nm[0];
    var v2 = nm[1];
    var v3 = nm[2];
    var v4 = nm[3];

    for (var l = 0; l < opesG.length; l++) {
      opes = opesG[l];

      for (var m = 0; m < 3; m++) {
        for (var n = 0; n < 2; n++) {
          var opes_ = opes.concat();
          var o1 = opes_[m]; opes_.splice(m, 1);
          var o2 = opes_[n]; opes_.splice(n, 1);
          var o3 = opes_[0];

          var exp = v1 + o1 + v2 + o2 + v3 + o3 + v4;
          exps[exp] = null;

          if (m == 0) {
            // A * (B + C) - D
            // A * (B + C - D)
            var exp = v1 + o1 + "(" + v2 + o2 + v3 + ")" + o3 + v4;
            exps[exp] = null;
            var exp = v1 + o1 + "(" + v2 + o2 + v3 + o3 + v4 + ")";
            exps[exp] = null;
          } else if (n == 0) {
            // (A + B) * C - D
            // A + B * (C - D)
            // (A + B) * (C - D)
            var exp = "(" + v1 + o1 + v2 + ")" + o2 + v3 + o3 + v4;
            exps[exp] = null;
            var exp = v1 + o1 + v2 + o2 + "(" + v3 + o3 + v4 + ")";
            exps[exp] = null;
            var exp = "(" + v1 + o1 + v2 + ")" + o2 + "(" + v3 + o3 + v4 + ")";
            exps[exp] = null;
          } else {
            // A + (B - C) * D
            // (A + B - C) * D
            var exp = v1 + o1 + "(" + v2 + o2 + v3 + ")" + o3 + v4;
            exps[exp] = null;
            var exp = "(" + v1 + o1 + v2 + o2 + v3 + ")" + o3 + v4;
            exps[exp] = null;
          }
        }
      }
    }
  }
  // 追加処理
  // for (var exp in exps) {
  //   exp = "return " + exp;
  //   if (Function(exp)() == target) {
  //     console.log(exp + "で成功(1)");
  //     return true;
  //   }
  // }

  // 加減1, 乗除2混合
  var opesG = [
    ["+", "*", "*"],
    ["+", "*", "/"],
    ["+", "/", "/"],
    ["-", "*", "*"],
    ["-", "*", "/"],
    ["-", "/", "/"]
  ];

  for (var nm_ in 数字の並び替えパターンB) {
    var nm = 数字の並び替えパターンB[nm_];
    var v1 = nm[0];
    var v2 = nm[1];
    var v3 = nm[2];
    var v4 = nm[3];

    for (var l = 0; l < opesG.length; l++) {
      opes = opesG[l];

      for (var m = 0; m < 3; m++) {
        for (var n = 0; n < 2; n++) {
          var opes_ = opes.concat();
          var o1 = opes_[m]; opes_.splice(m, 1);
          var o2 = opes_[n]; opes_.splice(n, 1);
          var o3 = opes_[0];

          var exp = v1 + o1 + v2 + o2 + v3 + o3 + v4;
          exps[exp] = null;
          if (m == 0) {
            // (A + B) * C / D
            // (A + B * C) / D
            var exp = "(" + v1 + o1 + v2 + ")" + o2 + v3 + o3 + v4;
            exps[exp] = null;
            var exp = "(" + v1 + o1 + v2 + o2 + v3 + ")" + o3 + v4;
            exps[exp] = null;
          } else if (n == 0) {
            // A * (B + C) / D
            // (A * B + C) / D
            // A * (B + C / D)
            var exp = v1 + o1 + "(" + v2 + o2 + v3 + ")" + o3 + v4;
            exps[exp] = null;
            var exp = "(" + v1 + o1 + v2 + o2 + v3 + ")" + o3 + v4;
            exps[exp] = null;
            var exp = v1 + o1 + "(" + v2 + o2 + v3 + o3 + v4 + ")";
            exps[exp] = null;
          } else {
            // A * B / (C + D)
            // A * (B / C + D)
            var exp = v1 + o1 + "(" + v2 + o2 + v3 + o3 + v4 + ")";
            exps[exp] = null;
            var exp = v1 + o1 + v2 + o2 + "(" + v3 + o3 + v4 + ")";
            exps[exp] = null;
          }
        }
      }
    }
  }
  // 追加処理
  for (var exp in exps) {
    exp = "return " + exp;
    if (Function(exp)() == target) {
      // console.log(exp + "で成功");
      console.log(target + "に計算成功");
      return [true, exp];
    }
  }
  console.log( target + "にできませんでした");
  return [false, "-1"];
}










