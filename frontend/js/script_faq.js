const faqData = [
    {
        category: "Orders & Shipping",
        questions: [
            { q: "How can I track my order?", a: "Track it from My Orders section using tracking ID." },
            { q: "How long does delivery take?", a: "Usually 3-7 business days." },
            { q: "Can I change shipping address?", a: "Yes, within 1 hour of ordering." }
        ]
    },
    {
        category: "Payments",
        questions: [
            { q: "What payment methods are accepted?", a: "Cards, bank transfer, wallets, COD." },
            { q: "Is my payment secure?", a: "Yes, SSL encrypted transactions." },
            { q: "Can I get refund?", a: "Refunds take 5-10 business days." }
        ]
    },
    {
        category: "Returns",
        questions: [
            { q: "Return policy?", a: "7 days return if unused." },
            { q: "How to return?", a: "Go to My Orders and click return." }
        ]
    },
    {
        category: "Account",
        questions: [
            { q: "Reset password?", a: "Use forgot password option." },
            { q: "Delete account?", a: "Contact support." }
        ]
    }
];

let selectedCategory = "All";

const faqContainer = document.getElementById("faq");
const categoryContainer = document.getElementById("categories");
const searchInput = document.getElementById("search");

function renderCategories() {
    const cats = ["All", ...faqData.map(c => c.category)];

    categoryContainer.innerHTML = cats.map(cat =>
        `<button class="${cat === selectedCategory ? 'active' : ''}" onclick="filterCategory('${cat}')">${cat}</button>`
    ).join('');
}

function renderFAQ() {
    let search = searchInput.value.toLowerCase();

    faqContainer.innerHTML = "";

    faqData.forEach(section => {
        if (selectedCategory !== "All" && section.category !== selectedCategory) return;

        let filteredQuestions = section.questions.filter(q =>
            q.q.toLowerCase().includes(search)
        );

        if (filteredQuestions.length === 0) return;

        let sectionHTML = `<h2 style='margin:15px 0'>${section.category}</h2>`;

        filteredQuestions.forEach((item, index) => {
            sectionHTML += `
        <div class="faq-item">
          <div class="question" onclick="toggleFAQ(this)">
            ${item.q}
            <span class="toggle">+</span>
          </div>
          <div class="answer">${item.a}</div>
        </div>
      `;
        });

        faqContainer.innerHTML += sectionHTML;
    });
}

function toggleFAQ(el) {
    const item = el.parentElement;
    item.classList.toggle("active");

    const icon = el.querySelector(".toggle");
    icon.innerText = item.classList.contains("active") ? "−" : "+";
}

function filterCategory(cat) {
    selectedCategory = cat;
    renderCategories();
    renderFAQ();
}

searchInput.addEventListener("input", renderFAQ);

// Init
renderCategories();
renderFAQ();