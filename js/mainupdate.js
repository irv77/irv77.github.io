var buildLogSection = function(log) {
    var $section = document.createElement("section");
    $section.classList.add("changelog-entry");
    var $version = buildLogVer(log);
    var $date = buildLogTitle(log);
    var $list = buildLogList(log);
    $section.appendChild($version);
    $section.appendChild($date);
    $section.appendChild($list);
    return $section;
  };

  const buildLogVer = (log) => {
    const $ver = document.createElement("h3");
    const v = log.version;
    $ver.innerText = "v" + v;
    return $ver;
  }

  var buildLogTitle = function(log) {
    var $title = document.createElement("h2");
    var date = log.date;
    $title.innerText = date;
    return $title;
  };

  var buildLogList = function(log) {
    var $ul = document.createElement("ul");
    var list = log.list || [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var $li = buildLogItem(item);
      $ul.appendChild($li);
    }
    return $ul;
  };

  var buildLogItem = function(item) {
    var $li = document.createElement("li");

    item.label.forEach(function(label) {
      $li.classList.add(label.toLowerCase());
    });

    $li.innerHTML = item.detail;


    return $li;
  };

  const logwrapper = document.querySelector(".log-wrapper");

  for (var i = 0; i < logArr.length; i++) {
    var $section = buildLogSection(logArr[i]);
    logwrapper.appendChild($section);
  }