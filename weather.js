  // map表示用に使用する変数
  let map;
  // 現在地を取得するときのオプション-----------------
  const option = {
    enableHighAccuracy: true, // 対応端末でGPSを使用
    maximumAge: 20000,        // 指定時間以内であれば前回の値を用いる
    timeout: 1000000,         // タイムアウト時間を設定
  };

  // 緯度，経度，表示したいマップを入力するとピンを立てる関数を定義. 
  // ピンの色と表示をする を設定.
  // googleの規定の関数
  function pushPin(lat, lng, map) {
    const location = new Microsoft.Maps.Location(lat, lng)
    const pin = new Microsoft.Maps.Pushpin(location, {
      color: 'navy', // 色の設定
      visible: true, // これ書かないとピンが見えない
    });
      map.entities.push(pin);
  };

  // 緯度，経度，表示したいマップを入力するとinfoboxをつくる関数を定義. 
  // 表示内容を設定する.
  // googleの規定の関数
  function generateInfobox(lat, lng, map) {
    const location = new Microsoft.Maps.Location(lat, lng)
    const infobox = new Microsoft.Maps.Infobox(location, {
      title: 'イマココ',
      description: "I'm here!!!"
    });
    infobox.setMap(map);
  }


  // 現在地の取得に成功したときの関数(位置情報を表示する)-------------------
  // 「地図を表示したいHTML要素のid」「center」「zoom」を指定する.
  // googleの規定の関数なのであとはそのまま使うこと
  function mapsInit(position) {
    const lat = position.coords.latitude;    // 緯度
    const lng = position.coords.longitude;   // 経度
    map = new Microsoft.Maps.Map('#map', {   // 
      center: {
        latitude: lat, longitude: lng
      },
      zoom: 15,
    });
    pushPin(lat, lng, map);         // ピンを立てる関数
    generateInfobox(lat, lng, map); // infoboxを生成する関数
  }

  // 現在位置の取得に失敗したの実行する関数-------------------
  // 表示の言葉以外はそのまま使うこと
  function showError(error) {
    let e = '';
    if (error.code == 1) {
      e = '位置情報が許可されてません';
    } else if (error.code == 2) {
      e = '現在位置を特定できません';
    } else if (error.code == 3) {
      e = '位置情報を取得する前にタイムアウトになりました';
    }
    alert('error:' + e);
  }

  // 位置情報を取りにいく処理------------------------
  // getCurrentPosition 実行時に現在地を取得する
  // ()内には「成功時の関数」「失敗時の関数」「オプション」の順に記述する.
  // これも変更しないで使っていくだろう
  window.onload = function () {
    navigator.geolocation.getCurrentPosition(mapsInit, showError, option);
  }
