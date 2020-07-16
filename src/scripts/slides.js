document.getElementById('openNotes').addEventListener('click', () => {
  window._currentSlide = 0
  const noteWindow = window.open('/notes')

  noteWindow.addEventListener('slidecontrol', () => {
    console.log('Event emitted by note window')
  })

  noteWindow.addEventListener('gotoslide', (e) => {
    const slideSlug = e.detail
    const slideSection = document.querySelector(
      `[data-slide-slug="${slideSlug}"]`
    )
    if (slideSection) {
      slideSection.scrollIntoView({
        behavior: 'smooth',
      })
    }
  })
})

// intersection observer options
const options = {
  threshold: 0.5,
}

// intersection observer callback
function onIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > options.threshold) {
      window.dispatchEvent(
        new CustomEvent('slidescroll', {
          detail: entry.target.dataset.slideSlug,
        })
      )
    }
  })
}

const observer = new IntersectionObserver(onIntersection, options)

// observe every slides (and the intro header)
const slides = document.querySelectorAll('[data-slide-slug]')
slides.forEach((slide) => {
  observer.observe(slide)
})
