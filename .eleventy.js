const matter = require('gray-matter')
const markdown = require('markdown-it')({
	html: true
})

module.exports = function (config) {
	config.addNunjucksShortcode('matter', content => {
		return matter(content)
	})

	config.addFilter('upperCase', value => {
		return value.toUpperCase()
	})

	config.addFilter('markdown', value => {
		return markdown.render(value)
	})

	config.addCollection('slides', collection => {
		const unorderedSlides = collection.getFilteredByGlob('./src/slides/*.md')

		// If some slides don't have the `order` key.
		const slidesWithoutOrder = unorderedSlides.filter(s => !s.data.order)

		if (slidesWithoutOrder.length) {
			slidesWithoutOrder.forEach(s => {
				console.log(`❌ Slide ${s.fileSlug} has no order`)
			})
			return unorderedSlides
		}

		// If some slides have the same `order` key
		const orders = unorderedSlides.map(s => s.data.order)
		const uniqueOrders = [...new Set(orders)]

		if (orders.length != uniqueOrders.length) {
			console.log(`❌ Some slides have a duplicate order!`)
			return unorderedSlides
		}

		const orderedSlides = unorderedSlides.sort((a, b) => {
			return a.data.order > b.data.order ? 1 : -1
		})
		return orderedSlides
	})

	config.addPassthroughCopy('src/styles')

	return {
		passthroughFileCopy: true,
		dir: {
			input: 'src',
			output: 'dist'
		}
	}
}
