const noteSections = document.querySelectorAll('section[data-note-slug]')
const gotoButtons = document.querySelectorAll('.goto-button')

/**
 * Change the currently highlighted note section.
 * @param {string} slug The current slide fileslug
 */
function updateSlideIndex(slug) {
  // remove the note-current class
  noteSections.forEach(el => {
    el.classList.remove('note-current')
  })

  // set the note-current class on the newly active note
  const currentNotesSection = document.querySelector(
    `section[data-note-slug="${slug}"]`
  )
  if (currentNotesSection) {
    currentNotesSection.classList.add('note-current')
  }
}

updateSlideIndex('_intro_')

// listen to slide change from the main window
window.opener.addEventListener('slidescroll', e => {
  updateSlideIndex(e.detail)
})

// add controller buttons click handlers
gotoButtons.forEach(el => {
  const targetSlug = el.dataset.noteSlug
  el.addEventListener('click', () => {
    window.dispatchEvent(
      new CustomEvent('gotoslide', {
        detail: targetSlug
      })
    )
  })
})
