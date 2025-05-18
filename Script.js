const products = [
    {
        name: "Minuta de Fresa",
        category: "minutas",
        image: "/img/Minuta_Fresa.png",
        description: "Disponible en tamaño pequeño y grande.",
        price: "$ 1.50"
    },
    {
        name: "Minuta de Tamarindo",
        category: "minutas",
        image: "/img/Minuta_Tamarindo.png",
        description: "Ideal para los amantes de lo ácido.",
        price: "$ 1.25"
    },
    {
        name: "Minuta de mango",
        category: "minutas",
        image: "/img/Minuta_Mango.png",
        description: "Ideal para los amantes de lo ácido/dulce.",
        price: "$ 1.25"
    },
    {
        name: "Minuta de coco",
        category: "minutas",
        image: "/img/Minuta_Coco.png",
        description: "Ideal para los amantes de lo fresco.",
        price: "$ 1.50"
    },
    {
        name: "Fresas con Crema",
        category: "fresas",
        image: "/img/Fresa_Crema.png",
        description: "Fresas frescas con crema dulce casera.",
        price: "$ 2.25"
    },
    {
        name: "Fresas con Crema y chispas",
        category: "fresas",
        image: "/img/Fresa_Toping.png",
        description: "Fresas frescas con chispas y toppings a tu gusto.",
        price: "$ 2.50"
    },
    {
        name: "Fresas con Crema y chocolate",
        category: "fresas",
        image: "/img/Fresa_Chocolate.png",
        description: "Fresas frescas con chispas y toppings a tu gusto.",
        price: "$ 3.00"
    },
    {
        name: "Churros preparados",
        category: "snacks",
        image: "/img/Churros.jpeg",
        description: "Ricos churros preparados a tu gusto.",
        price: "$ 0.50"
    },
    {
        name: "Charamuscas",
        category: "snacks",
        image: "/img/Charamusca.png",
        description: "Te helan el paladar con sus distintos sabores frutales.",
        price: "$ 0.25"
    }
];

// Crear tarjeta de producto
function createProductCard(product) {
    return `
        <div class="card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='img/default-image.png'">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <h2>${product.price}</h2>
        </div>
    `;
}

// Mostrar productos filtrados
function displayProducts(filtered = 'todos') {
    const catalog = document.getElementById("catalogo");
    if (!catalog) return;

    catalog.innerHTML = ''; // Limpiar contenido anterior

    const grouped = {};
    const categoriasPermitidas = ["minutas", "fresas", "snacks"];

    products.forEach(product => {
        if ((filtered === 'todos' && categoriasPermitidas.includes(product.category)) || 
            (filtered !== 'todos' && product.category === filtered)) {
            if (!grouped[product.category]) {
                grouped[product.category] = [];
            }
            grouped[product.category].push(product);
        }
    });

    if (Object.keys(grouped).length === 0) {
        catalog.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
        return;
    }

    for (const category in grouped) {
        const titulo = document.createElement('h2');
        titulo.className = 'titulo-categoria';
        titulo.textContent = category.charAt(0).toUpperCase() + category.slice(1);

        catalog.appendChild(titulo);

        const container = document.createElement('div');
        container.className = 'card-container';

        grouped[category].forEach(product => {
            container.innerHTML += createProductCard(product);
        });

        catalog.appendChild(container);
    }
}

// Filtrar productos y controlar visibilidad de secciones con scroll automático
function filterProducts(category) {
    event.preventDefault(); // Evita recargar la página

    const homeSection = document.getElementById("home");
    const aboutSection = document.getElementById("about");
    const catalogSection = document.getElementById("catalogo"); // Sección de productos

    if (["todos", "minutas", "fresas", "snacks"].includes(category)) {
        displayProducts(category);

        if (homeSection) {
            homeSection.style.visibility = "hidden";
            homeSection.style.position = "absolute"; // Mueve fuera de la vista
            homeSection.style.top = "-9999px";
        }
        if (aboutSection) {
            aboutSection.style.visibility = "hidden";
            aboutSection.style.position = "absolute";
            aboutSection.style.top = "-9999px";
        }

        if (catalogSection) catalogSection.scrollIntoView({ behavior: "smooth" });

    } else if (category === "inicio") {
        displayProducts(); // Mostrar todos los productos

        if (homeSection) {
            homeSection.style.visibility = "visible";
            homeSection.style.position = "relative"; // Restaura la posición
            homeSection.style.top = "0";
        }
        if (aboutSection) {
            aboutSection.style.visibility = "visible";
            aboutSection.style.position = "relative";
            aboutSection.style.top = "0";
        }

        if (homeSection) homeSection.scrollIntoView({ behavior: "smooth" });

    } else if (category === "about") {
        displayProducts(); // Mostrar todos los productos

        if (homeSection) {
            homeSection.style.visibility = "visible";
            homeSection.style.position = "relative";
            homeSection.style.top = "0";
        }
        if (aboutSection) {
            aboutSection.style.visibility = "visible";
            aboutSection.style.position = "relative";
            aboutSection.style.top = "0";
        }

        if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });

    } else {
        displayProducts(category);

        if (homeSection) {
            homeSection.style.visibility = "visible";
            homeSection.style.position = "relative";
            homeSection.style.top = "0";
        }
        if (aboutSection) {
            aboutSection.style.visibility = "visible";
            aboutSection.style.position = "relative";
            aboutSection.style.top = "0";
        }
    }
}

 let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");

    if (slides.length === 0) {
        console.error("No se encontraron elementos con la clase 'slide'. Verifica el HTML.");
        return;
    }

    slides.forEach(slide => slide.style.display = "none");

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 10000); // Cambia cada 5 segundos
}

// 🟢 Corrección: Ejecutar `showSlides()` de inmediato
document.addEventListener("DOMContentLoaded", function () {
    console.log("Iniciando el Slider...");
    showSlides();
});

function toggleMenu() {
    let menu = document.querySelector("#navbar ul");
    menu.classList.toggle("show"); // 🔹 Alterna la clase "show"
}

// 🔹 Cierra el menú al hacer clic en cualquier opción
document.querySelectorAll("#navbar ul li a").forEach(link => {
    link.addEventListener("click", () => {
        let menu = document.querySelector("#navbar ul");
        menu.classList.remove("show"); // 🔹 Oculta el menú
    });
});


// Mostrar todos los productos al cargar
window.onload = () => displayProducts();
