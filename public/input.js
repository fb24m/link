const inputs = document.querySelectorAll('nl-input')

inputs.forEach((input) => {
	const attrs = input.getAttributeNames()
		.map((attr) => `${attr}="${input.getAttribute(attr)}"`)

	console.log()

	input.innerHTML = `<nl-input-wrapper><input ${attrs.join(' ')}></nl-input-wrapper>`
})