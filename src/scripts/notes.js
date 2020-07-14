let currentSlideIndex

function updateSlideIndex(index) {
	currentSlideIndex = index
	const slideContent = document.querySelector('#current-slide')
	slideContent.innerHTML = currentSlideIndex
}

updateSlideIndex(0)

window.opener.addEventListener('slidescroll', e => {
	updateSlideIndex(e.detail)
})

document.getElementById('control-next').addEventListener('click', () => {
	window.dispatchEvent(new CustomEvent('slidecontrol'))
})
