"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// data
var arrOfRoutes = []; // consts

var enterKeyCode = 13; // in pixels

var lineHeight = 2;
var pointElementHalf = 5; // elements

var map = document.querySelector(".map");
var routesListElement = document.querySelector(".routes__list");
var routeTemplate = document.querySelector(".route-template").content;
var pointTemplate = document.querySelector(".point-template").content;
var lineTemplate = document.querySelector(".line-template").content;
var routesAddElement = document.querySelector(".routes__add");
routesAddElement.addEventListener("keydown", function (evt) {
  return addRoute(evt);
}); // utils

var getElementWidth = function getElementWidth(element) {
  return element.clientWidth;
};

var getElementHeight = function getElementHeight(element) {
  return element.clientHeight;
};

var getArrLength = function getArrLength(arr) {
  return arr.length;
};

var clearInput = function clearInput(inputElement) {
  return inputElement.value = "";
};

var clearRoutesList = function clearRoutesList(routesListElement) {
  return routesListElement.textContent = "";
};

var clearMap = function clearMap(mapContainer) {
  return mapContainer.textContent = "";
};

var isEnterPressed = function isEnterPressed(evt) {
  return evt.keyCode === enterKeyCode ? true : false;
};

var isNamePassed = function isNamePassed(evt) {
  return evt.target.value !== "" ? true : false;
};

var isNotEnough = function isNotEnough(arr) {
  return _typeof(arr) === "object" && arr.length < 2 ? true : false;
};

var sqrt = function sqrt(num) {
  return Math.sqrt(num);
};

var square = function square(num) {
  return num * num;
};

var sumOfSquares = function sumOfSquares(num1, num2) {
  return square(num1) + square(num2);
};

var minus = function minus(num1, num2) {
  return num2 - num1;
};

var getAngle = function getAngle(a, b) {
  return Math.atan2(a, b) * (180 / Math.PI);
};

var getCenterPosition = function getCenterPosition(container, element) {
  return container / 2 - element;
}; // creating route with coordinates in center of map


var createRoute = function createRoute(name) {
  var centeredXcoordinate = getCenterPosition(getElementWidth(map), pointElementHalf);
  var centeredYcoordinate = getCenterPosition(getElementHeight(map), pointElementHalf);
  return {
    x: centeredXcoordinate,
    y: centeredYcoordinate,
    name: name
  };
};

var addRouteToList = function addRouteToList(list, route) {
  list.push(route);
  route.order = getArrLength(list);
  return list;
};

var addRoute = function addRoute(evt) {
  var routeName = evt.target.value;

  if (isEnterPressed(evt) && isNamePassed(evt)) {
    var newRoute = createRoute(routeName);
    addRouteToList(arrOfRoutes, newRoute);
    clearInput(routesAddElement);
    renderRoutesList(routesListElement, arrOfRoutes);
    addCloseFunction();
    renderMap(map, arrOfRoutes);
  }
};

var addCloseFunction = function addCloseFunction() {
  var routesClosedButtons = document.querySelectorAll(".route__delete");
  routesClosedButtons.forEach(function (button) {
    button.removeEventListener("click", function (evt) {
      return deleteRoute(evt);
    });
    button.addEventListener("click", function (evt) {
      return deleteRoute(evt);
    });
  });
}; // list rendering
// createRouteElement => createRoutes => renderRoutesList


var createRouteElement = function createRouteElement(route) {
  var routeElement = routeTemplate.cloneNode(true);
  routeElement.querySelector(".route__name").innerText = route.name;
  return routeElement;
};

var createRoutes = function createRoutes(arrOfRoutes) {
  var fragment = document.createDocumentFragment();
  arrOfRoutes.forEach(function (route) {
    var newRoute = createRouteElement(route);
    fragment.appendChild(newRoute);
  });
  return fragment;
};

var renderRoutesList = function renderRoutesList(container, arrOfRoutes) {
  clearRoutesList(container);
  var routes = createRoutes(arrOfRoutes);
  container.appendChild(routes);
};

var deleteRoute = function deleteRoute(evt) {
  var currentName = evt.target.parentElement.innerText;
  var afterDeletion = arrOfRoutes.filter(function (route) {
    return route.name !== currentName;
  });
  arrOfRoutes = afterDeletion;
  renderRoutesList(routesListElement, arrOfRoutes);
  addCloseFunction();
  renderMap(map, arrOfRoutes);
}; // map rendering
// composeLines => createLineElement => createLines }
//                                                  } => renderMap
//                  createDotElement => createDots  }


var renderMap = function renderMap(container, arrOfRoutes) {
  clearMap(container);
  var dots = createDots(arrOfRoutes);
  var lines = createLines(arrOfRoutes);
  container.appendChild(dots);
  container.appendChild(lines);
};

var composeLines = function composeLines(routes) {
  var lines = [];

  if (isNotEnough(routes)) {
    return "";
  }

  for (var i = 0; i < routes.length - 1; i++) {
    var firstPoint = routes[i];
    var secondPoint = routes[i + 1];
    var line = {};
    line.x1 = firstPoint.x;
    line.y1 = firstPoint.y;
    line.x2 = secondPoint.x;
    line.y2 = secondPoint.y;
    lines.push(line);
  }

  return lines;
};

var createLineElement = function createLineElement(point) {
  var line = lineTemplate.cloneNode(true).querySelector(".line");
  line.style.left = point.x1 + pointElementHalf + "px";
  line.style.top = point.y1 + pointElementHalf + "px";
  var deltaX = minus(point.x1, point.x2);
  var deltaY = minus(point.y1, point.y2);
  var hypothenuse = sqrt(sumOfSquares(deltaX, deltaY));
  var angle = getAngle(deltaY, deltaX);
  line.style.width = hypothenuse + "px";
  line.style.height = lineHeight + "px";
  line.style.transform = "rotate(".concat(angle, "deg)");
  return line;
};

var createLines = function createLines(arrOfRoutes) {
  var fragment = document.createDocumentFragment();
  var linesArray = composeLines(arrOfRoutes);

  if (linesArray.length > 0) {
    linesArray.forEach(function (route) {
      var newLine = createLineElement(route);
      fragment.appendChild(newLine);
    });
  }

  return fragment;
};

var createDotElement = function createDotElement(point) {
  var dot = pointTemplate.cloneNode(true).querySelector(".point");
  var dotModal = dot.querySelector(".point__modal");
  dotModal.innerText = point.name;
  dot.style.top = point.y + "px";
  dot.style.left = point.x + "px";
  dot.setAttribute("data-name", point.name);
  dot.addEventListener("mousedown", function (evtDown) {
    var modalWindow = evtDown.target.children[0];
    modalWindow.style.display = "block";
    var startCoordinates = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var onMouseMove = function onMouseMove(evtMove) {
      modalWindow.style.display = "block";
      var delta = {
        x: startCoordinates.x - evtMove.clientX,
        y: startCoordinates.y - evtMove.clientY
      };
      startCoordinates = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
      var dotY = dot.offsetTop - delta.y;
      var dotX = dot.offsetLeft - delta.x;

      if (dotY >= 0 && dotY <= getElementHeight(map) - pointElementHalf) {
        dot.style.top = dotY + "px";
        point.y = dotY;
      }

      if (dotX >= 0 && dotX <= getElementWidth(map) - pointElementHalf) {
        dot.style.left = dotX + "px";
        point.x = dotX;
      }
    };

    var onMouseUp = function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      renderMap(map, arrOfRoutes);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
  return dot;
};

var createDots = function createDots(arrOfRoutes) {
  var fragment = document.createDocumentFragment();
  arrOfRoutes.forEach(function (route) {
    var dot = createDotElement(route);
    fragment.appendChild(dot);
  });
  return fragment;
};