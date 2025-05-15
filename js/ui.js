// header white/black

let link = '';

if ($("#header-main").hasClass("header-black")) {
	link = "text-white";
} else {
	link = "text-black";
}

const $headerBlock = $(`
		<a href="index.html" class="${link} logo hover:text-fuchsia-600">Elena<br>Bubnova</a>
		<div class="flex gap-4 items-baseline">


			<div id="mailIcon" onclick="toggleMailPopup()" class="${link} hover:text-fuchsia-600">
				<i class="fa-regular fa-envelope text-[1.5rem]"></i>
			</div>


			<div id="mailPopup" class="w-[300px] rounded-full shadow-lg bg-white transition duration-200">

			<div id="chatHeader" class=""><span onclick="toggleMailPopup()" style="float:right; cursor:pointer;">
					<i class="fa fa-times fa-lg" aria-hidden="true"></i>
				</span>
			</div>

			<form id="mailForm" class="rounded-xl p-0 w-full max-w-md space-y-6" md:max-w-full novalidate>
					<p id="chatContact" class="font-bold">Contact me</p>
					<input type="hidden" name="_captcha" value="false">
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">Your Email <span class="text-red-500">*</span> </label>
						<input type="email" id="email" name="email" required pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
							placeholder="info@mail.com"
							class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500">
					</div>

					<div>
						<label for="subject" class="block text-sm font-medium text-gray-700">Subject <span class="text-red-500">*</span> </label>
						<input type="text" id="subject" name="subject" required placeholder="Hello"
							class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500">
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-gray-700">Message <span class="text-red-500">*</span> </label>
						<textarea id="message" name="message" rows="4" required placeholder="Something important"
							class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"></textarea>
					</div>

					<div id="formError" class="w-full bg-red-600 text-white py-2 px-4 rounded-lg transition hidden"></div>
					<div id="formInfo"  class="w-full text-white py-2 px-4 rounded-lg hidden"></div>

					<button type="submit"
						class="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-fuchsia-700 transition">
						Send Message
					</button>
				</form>
			</div>
			<div>
				<a href="https://www.linkedin.com/in/elenabubnova/" target="_blank"
					class="${link} data-info hover:text-fuchsia-600" aria-label="LinkedIn Profile">
					<i class="fa-brands fa-linkedin-in text-[1.8rem]" aria-hidden="false"></i>
				</a>
			</div>
		</div>
		`);

// const $headerBlock = $(`
// 	<header class="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/10 flex justify-between items-center px-6 py-4">
// 	  <a href="index.html" class="${link} logo hover:text-fuchsia-600 text-xl font-bold leading-tight">
// 		Elena<br>Bubnova
// 	  </a>
// 	  <div>
// 		<a href="https://www.linkedin.com/in/elenabubnova/" target="_blank"
// 		   class="${link} data-info hover:text-fuchsia-600"
// 		   aria-label="LinkedIn Profile">
// 		  <i class="fab fa-linkedin fa-2x" aria-hidden="true"></i>
// 		</a>
// 	  </div>
// 	</header>
//   `);

$("#header-main").append($headerBlock);

const $chatBlock = $(`
	<!-- Chat -->
	<div id="chatIcon" onclick="togglePopup()">
	  <i class="fa-solid fa-cat ${link} hover:text-fuchsia-600 text-2xl" aria-hidden="true"></i>
	</div>
  
	<!-- Chat Popup -->
	<div id="chatPopup" class="fixed bottom-24 right-4 bg-white rounded-xl shadow-lg p-4 w-full max-w-md sm:w-[400px] transition duration-200 z-50">
  
	  <div id="chatHeader" class="text-lg font-bold mb-2 flex justify-between items-center">
		Ask About Elena
		<span onclick="togglePopup()" class="cursor-pointer">
		  <i class="fa fa-times fa-lg" aria-hidden="true"></i>
		</span>
	  </div>
  
	  <div id="chat" class="mb-4"></div>
	  <div id="preprompts" class="preprompts mb-4"></div>
  
	  <!-- Input + Send -->
	  <div class="flex items-center gap-3">
		<input
		  id="userInput"
		  type="text"
		  placeholder="..."
		  class="flex-grow px-4 py-2 w-[20px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:border-transparent shadow-sm transition duration-200"
		/>
  
		<button
		  class="w-12 h-12 flex items-center justify-center bg-black hover:bg-fuchsia-600 text-white rounded-full shadow-lg transition duration-200"
		  onclick="sendMessage()"
		>
		  <i class="fa fa-paw text-lg" aria-hidden="true"></i>
		</button>
	  </div>
  
	</div>
  `);

// const $chatBlock = $(`
// 	<!-- Chat -->
// 	<div id="chatIcon" onclick="togglePopup()">
// 		<i class="fa-solid fa-cat ${link} hover:text-fuchsia-600 text-2xl" aria-hidden="true"></i>
// 	</div>

// 	<!-- Chat Popup -->
// 	<div id="chatPopup" class="rounded-full shadow-lg transition duration-200">

// 	<div id="chatHeader">Ask About Elena <span onclick="togglePopup()" style="float:right; cursor:pointer;">
// 		<i class="fa fa-times fa-lg" aria-hidden="true"></i>
// 	</span>
// 	</div>

// 	<div id="chat"></div>

// 	<!-- Preprompt buttons inside popup -->
// 	<div id="preprompts" class="preprompts"></div>

// 	<div class="flex items-center gap-3 w-full max-w-xl mx-auto">

// 		<input
// 		id="userInput"
// 		type="text"
// 		placeholder="..."
// 		class="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:border-transparent shadow-sm transition duration-200"
// 		/>
		
// 		<button
// 			class="w-12 h-12 flex items-center justify-center bg-black hover:bg-fuchsia-600 text-white rounded-full shadow-lg transition duration-200"
// 			onclick="sendMessage()"
// 		>
// 		<i class="fa fa-paw text-lg" aria-hidden="true"></i>
// 		</button>
// 	</div>
// 	</div>
// `)

$("#chat-ai").append($chatBlock);