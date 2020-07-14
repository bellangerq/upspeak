document.getElementById('openNotes').addEventListener('click', () => {
	window._currentSlide = 0
	const noteWindow = window.open('/notes')
	noteWindow.addEventListener('slidecontrol', () => {
		console.log('Event emitted by note window')
	})
})

// intersection observer options
const options = {
	threshold: 0.5
}

// intersection observer callback
function onIntersection(entries, observer) {
	entries.forEach(entry => {
		if (entry.intersectionRatio > options.threshold) {
			window.dispatchEvent(
				new CustomEvent('slidescroll', {
					detail: parseInt(entry.target.dataset.slideIndex, 10)
				})
			)
		}
	})
}

const observer = new IntersectionObserver(onIntersection, options)

// observe every slides (and the intro header)
const slides = document.querySelectorAll('[data-slide-index]')
slides.forEach(slide => {
	observer.observe(slide)
})
