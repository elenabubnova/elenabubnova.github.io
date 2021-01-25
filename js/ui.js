// header white/black

let link = '';

if ($(".header").hasClass("header-black")) {
	link = "white-link";
} else {
	link = "black-link";
}

const $headerBlock = $(`
			<a href="index.html" class="${link} logo">Elena<br>Bubnova</a>
			<div>
				<a href="https://www.linkedin.com/in/elenabubnova/" target="_blank" class="${link} data-info">
					<i class="fa fa-linkedin fa-2x" aria-hidden="false"></i>
				</a>
			</div>
		`);

$(".header").append($headerBlock);


// const vid = document.getElementById("myVideo");
// vid.playbackRate = 2;
