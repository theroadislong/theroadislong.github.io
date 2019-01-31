"use strict";

(function () {
  var table = document.querySelector(".main__table");
  var searchInput = document.querySelector(".search__input");
  var searchSelect = document.querySelector(".search__select");
  var sortInput = document.querySelector(".sort__input");
  var sortSelect = document.querySelector(".sort__select");
  var selectedSearchSelect = "name";
  var selectedSortSelect = "none";

  var searchSelectHandler = function searchSelectHandler(evt) {
    selectedSearchSelect = evt.target.value;
  };

  var sortSelectHandler = function sortSelectHandler(evt) {
    selectedSortSelect = evt.target.value;
  }; // здесь происходит фильтрация по совпадению и больше/меньше


  var searchHandler = function searchHandler() {
    var searchValue = searchInput.value.toLowerCase();
    var sortValue = sortInput.value || "";

    var filterFunction = function filterFunction(object) {
      return searchValue === "" ? object : object[selectedSearchSelect].toString().toLowerCase().indexOf(searchValue) !== -1;
    };

    var sortBig = function sortBig(object) {
      return sortValue === "" ? object : object[selectedSearchSelect] > sortValue;
    };

    var sortSmall = function sortSmall(object) {
      return sortValue === "" ? object : object[selectedSearchSelect] < sortValue;
    };

    var filteredBySearchObjects = window.data.objects.map(window.utils.prettify).filter(function (object) {
      if (selectedSortSelect === "none") {
        return filterFunction(object);
      }

      if (selectedSortSelect === "big") {
        return filterFunction(object) && sortBig(object);
      }

      if (selectedSortSelect === "small") {
        return filterFunction(object) && sortSmall(object);
      }
    }); // удаляем все строки и рендерим отфильтрованные

    window.utils.deleteRows();
    window.render.renderRows(filteredBySearchObjects, table);
  }; // рендерим первоначальные данные


  window.render.renderRows(window.data.objects.map(window.utils.prettify), table);
  searchInput.addEventListener("input", function (event) {
    return searchHandler(event);
  });
  searchSelect.addEventListener("change", function (event) {
    return searchSelectHandler(event);
  });
  sortInput.addEventListener("input", function (event) {
    return searchHandler(event);
  });
  sortSelect.addEventListener("change", function (event) {
    return sortSelectHandler(event);
  });
})();