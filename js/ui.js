// header white/black

let link = '';

if ($("#header-main").hasClass("header-black")) {
	link = "text-white";
} else {
	link = "text-black";
}

const $headerBlock = $(`
			<a href="index.html" class="${link} logo hover:text-fuchsia-600">Elena<br>Bubnova</a>
			<div>
				<a href="https://www.linkedin.com/in/elenabubnova/" target="_blank" class="${link} data-info hover:text-fuchsia-600">
					<i class="fab fa-linkedin fa-2x" aria-hidden="false"></i>
				</a>
			</div>
		`);

$("#header-main").append($headerBlock);


const $chatBlock = $(`
	<!-- Chat -->
		<div id="chatIcon" onclick="togglePopup()">
		<i class="fa-solid fa-cat ${link} hover:text-fuchsia-600 text-2xl" aria-hidden="true"></i>
	</div>

	<!-- Chat Popup -->
	<div id="chatPopup">

	<div id="chatHeader">Ask About Elena <span onclick="togglePopup()" style="float:right; cursor:pointer;">
		<i class="fa fa-times fa-lg" aria-hidden="true"></i>
	</span>
	</div>

	<div id="chat"></div>

	<!-- Preprompt buttons inside popup -->
	<div id="preprompts" class="preprompts"></div>

	<div class="flex items-center gap-3 w-full max-w-xl mx-auto">
	<input
	id="userInput"
	type="text"
	placeholder="..."
	class="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:border-transparent shadow-sm transition duration-200"
	/>
	<button
	class="w-12 h-12 flex items-center justify-center bg-black hover:bg-fuchsia-600 text-white rounded-full shadow-lg transition duration-200"
	onclick="sendMessage()"
	>
	<i class="fa fa-paw text-lg" aria-hidden="true"></i>
	</button>
	</div>
	</div>
`)

$("#chat-ai").append($chatBlock);