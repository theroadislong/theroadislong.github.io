"use strict";

var modalOpenButtons = document.querySelectorAll(".card__button");
var modal = document.querySelector(".modal");
var modalCloseButton = document.querySelector(".modal__close");
var escKeyCode = 27;
modalOpenButtons.forEach(function (element) {
  return element.addEventListener("click", function () {
    return modalOpen();
  });
});

var modalOpen = function modalOpen() {
  modal.classList.add("modal--opened");
  modal.addEventListener("keydown", function (event) {
    return modalEscClose(event);
  });
  modalCloseButton.addEventListener("click", function () {
    return modalClose();
  });
};

var modalClose = function modalClose() {
  modal.classList.remove("modal--opened");
};

var modalEscClose = function modalEscClose(event) {
  if (event.keyCode === escKeyCode) {
    modal.classList.remove("modal--opened");
  }
};