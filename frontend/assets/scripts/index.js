const modalButton = document.getElementById('modal-button')

let modalCount = 0

window.onscroll = () => {
	if (document.documentElement.scrollTop > 1000 && modalCount === 0) {
		modalButton.click()

		modalCount++
	}
}
