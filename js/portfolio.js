function createPortfolioCard(item) {
    return `
        <a href="${item.link}" class="group relative block overflow-hidden shadow-md">
            <img src="${item.image}" alt="${item.alt}"
                class="w-full h-auto object-contain transition-transform duration-700" />

            <div class="absolute inset-0 bg-fuchsia-600 bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-700 flex items-center justify-center">
                <span class="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    ${item.title}
                </span>
            </div>
        </a>
    `;
}

function createPortfolioSection(sectionKey) {
    const section = portfolioConfig[sectionKey];
    const sectionElement = document.getElementById(section.id);

    if (sectionElement) {
        const cardsHtml = section.items.map(createPortfolioCard).join("");

        sectionElement.innerHTML = `
            <h3 class="text-2xl font-semibold mb-5">${section.title}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                ${cardsHtml}
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Object.keys(portfolioConfig).forEach(createPortfolioSection);

    if (window.tailwind && typeof window.tailwind.refresh === "function") {
        window.tailwind.refresh();
    }
});
