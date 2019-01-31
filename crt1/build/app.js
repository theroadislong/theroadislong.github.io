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
  modalCloseButton.addEventListener("click", function () {
    return modalClose();
  });
};

var modalClose = function modalClose() {
  modal.classList.remove("modal--opened");
};

document.addEventListener("keydown", function (evt) {
  if (modal.classList.contains("modal--opened") && event.keyCode === escKeyCode) {
    modalClose();
  }
});
document.addEventListener("click", function (evt) {
  if (evt.target === modal) {
    modalClose();
  }
});