let currentSlideIndex;

function updateSlideIndex(slug) {
  currentSlideIndex = slug;
  const slideContent = document.getElementById("current-slide");
  slideContent.innerHTML = slug;

  document.querySelectorAll("section[data-note-slug]").forEach((el) => {
    el.classList.remove("note-current");
  });

  const currentNotesSection = document.querySelector(
    `section[data-note-slug="${slug}"]`
  );
  console.log({ currentNotesSection });
  if (currentNotesSection) {
    currentNotesSection.classList.add("note-current");
  }
}

updateSlideIndex("_intro_");

window.opener.addEventListener("slidescroll", (e) => {
  updateSlideIndex(e.detail);
});

document.querySelectorAll(".goto-button").forEach((el) => {
  const targetSlug = el.dataset.noteSlug;
  el.addEventListener("click", () => {
    window.dispatchEvent(
      new CustomEvent("gotoslide", {
        detail: targetSlug,
      })
    );
  });
});
