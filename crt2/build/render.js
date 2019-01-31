"use strict";

(function () {
  window.render = {};
  var rowTemplate = document.querySelector(".row-template").content;

  var createRow = function createRow(object) {
    var newRow = rowTemplate.cloneNode(true);
    newRow.querySelector(".row__id").textContent = object.id;
    newRow.querySelector(".row__name").textContent = object.name;
    newRow.querySelector(".row__date").textContent = object.date;
    newRow.querySelector(".row__count").textContent = object.count;
    return newRow;
  };

  var renderRows = function renderRows(objects, destination) {
    var fragment = document.createDocumentFragment();
    objects.forEach(function (object) {
      return fragment.appendChild(createRow(object));
    });
    destination.appendChild(fragment);
  };

  window.render.renderRows = renderRows;
})();