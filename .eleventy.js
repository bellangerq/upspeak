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
		return collection.getFilteredByGlob('./src/slides/*.md')
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
