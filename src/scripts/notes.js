/** Renders a button emitting a `gotoslide` event when clicked. */
class GotoButton extends HTMLElement {
  connectedCallback() {
    this.render()

    this.firstChild.addEventListener('click', () => {
      const slug = this.getAttribute('slide-slug')
      this.dispatchEvent(
        new CustomEvent('gotoslide', {
          detail: slug,
          bubbles: true
        })
      )
    })
  }

  render() {
    this.innerHTML = `<button type="button" class="goto-button">Go to slide</button>`
  }
}

window.customElements.define('us-goto-button', GotoButton)

const noteSections = document.querySelectorAll('section[data-note-slug]')

/**
 * Change the currently highlighter note section.
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
