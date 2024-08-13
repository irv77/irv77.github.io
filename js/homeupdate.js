var buildLogSection = function(log) {
  var $section = document.createElement("section");
  $section.classList.add("changelog-entry");
  var $title = document.createElement("div");
  $title.classList.add("changelog-title");
  var $utitle = document.createElement("div");
  $utitle.classList.add("changelog-utitle");
  var $version = buildLogVer(log);
  var $date = buildLogTitle(log);
  var $list = buildLogList(log);
  var $stitle = buildTitle(log);
  $utitle.appendChild($version);
  $utitle.appendChild($date);
  $title.appendChild($stitle);
  $title.appendChild($utitle);
  $section.appendChild($title);
  $section.appendChild($list);
  return $section;
};

var buildTitle = function(log) {
  var $stitle = document.createElement("h1");
  var title = "Latest Update";
  $stitle.innerText = title;
  return $stitle;
};

const buildLogVer = (log) => {
  const $ver = document.createElement("h3");
  const v = log.version;
  $ver.innerText = "v" + v;
  return $ver;
}

var buildLogTitle = function(log) {
  var $utitle = document.createElement("h2");
  var date = log.date;
  $utitle.innerText = date;
  return $utitle;
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

const $section = buildLogSection(logArr[0]);
document.querySelector(".recent-upd-container").appendChild($section);