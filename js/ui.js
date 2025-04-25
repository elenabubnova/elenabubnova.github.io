// header white/black

let link = '';

if ($(".header").hasClass("header-black")) {
	link = "white-link";
} else {
	link = "black-link";
}

const $headerBlock = $(`
			<a href="index.html" class="${link} logo hover:text-fuchsia-600">Elena<br>Bubnova</a>
			<div>
				<a href="https://www.linkedin.com/in/elenabubnova/" target="_blank" class="${link} data-info hover:text-fuchsia-600">
					<i class="fa fa-linkedin fa-2x" aria-hidden="false"></i>
				</a>
			</div>
		`);

$(".header").append($headerBlock);