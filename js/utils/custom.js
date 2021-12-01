document.addEventListener("DOMContentLoaded", (e) => {
  let modal = null;
  const slides = document.querySelectorAll(".img-slides");
  document.addEventListener("click", (e) => {
    if (e.target.classList[1] === "text-card") {
      slides.forEach((slide) => {
        if (e.target.id === slide.dataset.name) {
          slide.classList.add("slides-category-active");
        } else {
          slide.classList.remove("slides-category-active");
        }
      });
    }
  });
  modalwindowsShow();
  showCarrousel();
  carrouselReview();
  carrousel();
});

function modalwindowsShow() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".modal-btn")) {
      modal = document.getElementById(e.target.dataset.modalwindowid);
      modal.classList.add("modal-container-window-active");
      modal.children[0].classList.add("modal-container-active");
    } else if (e.target.matches(".modal-btn *")) {
      modal = document.getElementById(
        e.target.parentElement.dataset.modalwindowid
      );
      modal.classList.add("modal-container-window-active");
      modal.children[0].classList.add("modal-container-active");
    } else if (e.target.classList[0] === "modal-container-window") {
      modal.classList.remove("modal-container-window-active");
      modal.children[0].classList.remove("modal-container-active");
    }
  });
}

function showCarrousel() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".carrousel-button")) {
      const parentContainer = e.target.parentElement.parentElement;
      const buttons = parentContainer.lastElementChild.children;
      parentContainer.children.forEach((element) => {
        if (element.dataset.carrouselimg === e.target.dataset.carrouselimg) {
          buttons.forEach((button) => {
            button.classList.remove("carrousel-button-active");
          });
          parentContainer.children.forEach((element) => {
            element.classList.remove("active-img");
          });
          e.target.classList.add("carrousel-button-active");
          element.classList.add("active-img");
        }
      });
    }
  });
}

function carrouselReview() {
  const reviews = document.querySelectorAll(".carrousel-review");
  const reviewsBtn = document.querySelectorAll(".carrousel-btn");
  let i = null;
  document.addEventListener("click", (e) => {
    if (e.target.matches(".control-arrow")) {
      if (e.target.classList[2] === "control-right-arrow") {
        reviews.forEach((review, index) => {
          if (review.classList[1] === "review-active") {
            i = index;
          }
        });
        if (i < reviews.length - 1) {
          reviews[i].classList.remove("review-active");
          reviews[i + 1].classList.add("review-active");
          reviewsBtn.forEach((button) => {
            button.classList.remove("review-btn-active");
          });
          reviewsBtn[i + 1].classList.add("review-btn-active");
        } else if (i === reviews.length - 1) {
          reviews[i].classList.remove("review-active");
          reviews[0].classList.add("review-active");
          reviewsBtn.forEach((button, index) => {
            index === 0
              ? button.classList.add("review-btn-active")
              : button.classList.remove("review-btn-active");
          });
        }
      } else if (e.target.classList[2] === "control-left-arrow") {
        reviews.forEach((review, index) => {
          if (review.classList[1] === "review-active") {
            i = index;
          }
        });
        if (i > 0) {
          reviews.forEach((review, index) => {
            if (review.classList[1] === "review-active") {
              i = index;
              reviewsBtn.forEach((button) => {
                button.classList.remove("review-btn-active");
              });
            }
          });
          reviews[i].classList.remove("review-active");
          reviews[i - 1].classList.add("review-active");
          reviewsBtn[i - 1].classList.add("review-btn-active");
        } else if (i === 0) {
          reviews[i].classList.remove("review-active");
          reviews[4].classList.add("review-active");
          reviewsBtn.forEach((button, index) => {
            index === 4
              ? button.classList.add("review-btn-active")
              : button.classList.remove("review-btn-active");
          });
        }
      }
    } else if (e.target.matches(".carrousel-btn")) {
      reviewsBtn.forEach((review) => {
        review.classList.remove("review-btn-active");
      });

      e.target.classList.add("review-btn-active");
      const selectedReview = document.getElementById(
        e.target.dataset.reviewname
      );

      reviews.forEach((review) => {
        review.classList.remove("review-active");
      });

      selectedReview.classList.add("review-active");
    }
  });
}

function carrousel() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".arrow-svg-graph")) {
      const slideContainer = e.target.parentElement.children[1].children;
      const containerParent = e.target.parentElement;
      if (e.target.classList.contains("next-graph")) {
        addClass(slideContainer, "next", containerParent);
      } else if (e.target.classList.contains("previous-graph")) {
        addClass(slideContainer, "prev", containerParent);
      }
    } else if (e.target.matches(".carrousel-ctls-graph")) {
      const parentElement = e.target.parentElement;
      parentElement.children.forEach((b) => b.classList.remove("buttonActive"));
      e.target.classList.add("buttonActive");
      const slide = document.getElementById(e.target.dataset.graph);
      slide.parentElement.children.forEach((s) =>
        s.classList.remove("graph-active")
      );
      slide.classList.add("graph-active");
    }
  });

  function addClass(parentElement, direction, containerParent) {
    let i = 0;
    parentElement.forEach((slide, index) =>
      slide.classList.contains("graph-active") ? (i = index) : ""
    );
    containerParent.children[3].children[i].classList.remove("buttonActive");
    if (direction === "next") {
      parentElement.forEach((slide, index) => {
        if (slide.classList.contains("graph-active") && i === index) {
          slide.classList.remove("graph-active");
          if (parentElement.length - 1 > i) {
            parentElement[i + 1].classList.add("graph-active");
            containerParent.children[3].children[i + 1].classList.add(
              "buttonActive"
            );
          } else {
            parentElement[0].classList.add("graph-active");
            containerParent.children[3].children[0].classList.add(
              "buttonActive"
            );
          }
        }
      });
    } else if (direction === "prev") {
      parentElement.forEach((slide, index) => {
        if (slide.classList.contains("graph-active") && i === index) {
          slide.classList.remove("graph-active");
          if (0 < i) {
            parentElement[i - 1].classList.add("graph-active");
            containerParent.children[3].children[i - 1].classList.add(
              "buttonActive"
            );
          } else {
            parentElement[parentElement.length - 1].classList.add(
              "graph-active"
            );
            containerParent.children[3].children[0].classList.add(
              "buttonActive"
            );
          }
        }
      });
    }
  }
}



