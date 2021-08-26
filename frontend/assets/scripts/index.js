const modalButton = document.getElementById('modal-button'),
	phButton = document.getElementById('ph-button')

let modalCount = 0

window.onscroll = () => {
	if (document.documentElement.scrollTop > 1000 && modalCount === 0) {
		modalButton.click()

		phButton.classList.add('d-none')

		modalCount++
	}
}
