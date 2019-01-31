"use strict";

// functions
var prettifyDate = function prettifyDate(date) {
  if (date.split(".").length === 3) {
    return date;
  }

  if (date.split("/").length === 3) {
    return date.split("/").join(".");
  }

  if (date.split(" ").length === 3) {
    var day = date.split(" ")[0];
    var month = getMonthNumber(date.split(" ")[1]);
    var year = date.split(" ")[2];
    return "".concat(day, ".").concat(month, ".").concat(year);
  }
};

var getMonthNumber = function getMonthNumber(str) {
  switch (true) {
    case str.indexOf("янв") !== -1:
      return "01";
      break;

    case str.indexOf("фев") !== -1:
      return "02";
      break;

    case str.indexOf("мар") !== -1:
      return "03";
      break;

    case str.indexOf("апр") !== -1:
      return "04";
      break;

    case str.indexOf("май") !== -1:
      return "05";
      break;

    case str.indexOf("июн") !== -1:
      return "06";
      break;

    case str.indexOf("июл") !== -1:
      return "07";
      break;

    case str.indexOf("авг") !== -1:
      return "08";
      break;

    case str.indexOf("сен") !== -1:
      return "09";
      break;

    case str.indexOf("окт") !== -1:
      return "10";
      break;

    case str.indexOf("ноя") !== -1:
      return "11";
      break;

    case str.indexOf("дек") !== -1:
      return "12";
      break;

    default:
      return undefined;
  }
};

var prettify = function prettify(element) {
  var result = {};
  result.id = element.id;
  result.name = element.name;
  result.date = prettifyDate(element.date);
  result.count = element.count;
  return result;
};

var deleteRows = function deleteRows() {
  var rows = document.querySelectorAll(".table__row");
  rows.forEach(function (row) {
    return row.remove();
  });
};

var renderRow = function renderRow(object) {
  var newRow = rowTemplate.cloneNode(true);
  newRow.querySelector(".row__id").textContent = object.id;
  newRow.querySelector(".row__name").textContent = object.name;
  newRow.querySelector(".row__date").textContent = object.date;
  newRow.querySelector(".row__count").textContent = object.count;
  return newRow;
};

var render = function render(objects, destination) {
  var fragment = document.createDocumentFragment();
  objects.forEach(function (object) {
    return fragment.appendChild(renderRow(object));
  });
  destination.appendChild(fragment);
}; // data


var objects = [{
  id: 1,
  name: "Вася",
  date: "15.06.2018",
  count: 11
}, {
  id: 2,
  name: "Петя",
  date: "23.11.2018",
  count: 23
}, {
  id: 3,
  name: "Иван",
  date: "12 марта 2017",
  count: 3
}, {
  id: 4,
  name: "Александр",
  date: "20/12/2010",
  count: 1
}, {
  id: 5,
  name: "Евгений",
  date: "12.09.2018",
  count: 112
}, {
  id: 6,
  name: "Мария",
  date: "1.08.2016",
  count: 122
}, {
  id: 7,
  name: "Анастасия",
  date: "20.11.2018",
  count: 34
}, {
  id: 8,
  name: "Степан",
  date: "12.11.2019",
  count: 30
}, {
  id: 88,
  name: "Анастасия",
  date: "20.11.2018",
  count: 34
}, {
  id: 8,
  name: "Степан",
  date: "12.11.2019",
  count: 20
}, {
  id: 11,
  name: "Анастасия",
  date: "20.11.2018",
  count: 34
}, {
  id: 111,
  name: "Степан",
  date: "12.11.2019",
  count: 100
}]; // html elements

var table = document.querySelector(".main__table");
var rowTemplate = document.querySelector(".row-template").content;
var searchInput = document.querySelector(".search__input");
var searchSelect = document.querySelector(".search__select");
var sortInput = document.querySelector(".sort__input");
var sortSelect = document.querySelector(".sort__select");
var selectedSearchSelect = "name";
var selectedSortSelect = "none"; // main functions

var searchSelectHandler = function searchSelectHandler(evt) {
  selectedSearchSelect = evt.target.value;
};

var searchHandler = function searchHandler() {
  var searchValue = searchInput.value.toLowerCase();
  var sortValue = sortInput.value || "";

  var filterFunction = function filterFunction(object) {
    return searchValue === "" ? object : object[selectedSearchSelect].toString().toLowerCase().indexOf(searchValue) !== -1;
  };

  var sortBig = function sortBig(object) {
    return searchValue === "" ? object : object[selectedSearchSelect] > sortValue;
  };

  var sortSmall = function sortSmall(object) {
    return searchValue === "" ? object : object[selectedSearchSelect] < sortValue;
  }; // убираем все строки перед каждой генерацией


  deleteRows();
  var filteredBySearchObjects = objects.map(prettify).filter(function (object) {
    if (selectedSortSelect === "none") {
      return filterFunction(object);
    }

    if (selectedSortSelect === "big") {
      return filterFunction(object) && sortBig(object);
    }

    if (selectedSortSelect === "small") {
      return filterFunction(object) && sortSmall(object);
    }
  }); //рендерим строки по совпадению

  render(filteredBySearchObjects, table);
}; // сначала рендерим первоначальные данные


render(objects.map(prettify), table);
searchInput.addEventListener("input", function (event) {
  return searchHandler(event);
});
searchSelect.addEventListener("change", function (event) {
  return searchSelectHandler(event);
}); // больше / меньше

var sortSelectHandler = function sortSelectHandler(evt) {
  selectedSortSelect = evt.target.value;
};

sortInput.addEventListener("input", function (event) {
  return searchHandler(event);
});
sortSelect.addEventListener("change", function (event) {
  return sortSelectHandler(event);
});