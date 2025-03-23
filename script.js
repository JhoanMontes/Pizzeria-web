// SECTION MAIN

let enlacePizza = document.querySelector('#enlace-pizza');
let enlaceRefresco = document.querySelector('#enlace-refresco');
let enlacePostre = document.querySelector('#enlace-postre');

let contentPizza = document.querySelector('.content-pizza');
let contentRefresco = document.querySelector('.content-refresco');
let contentPostre = document.querySelector('.content-postre');

// ARRAY PARA PEDIDO (cargamos si hay en LocalStorage)
let pedido = JSON.parse(localStorage.getItem('pedido')) || [];

// FUNCIONES PARA LOCALSTORAGE
function guardarPedido() {
    localStorage.setItem('pedido', JSON.stringify(pedido));
}

// FUNCION PARA RENDERIZAR PEDIDO
function renderizarPedido() {
    const listaPedido = document.querySelector('#lista-pedido');
    const totalPrecio = document.querySelector('#total-precio');
    listaPedido.innerHTML = '';

    let total = 0;

    pedido.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        li.innerHTML = `
            <span>${item.nombre} x${item.cantidad}</span>
            <div>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                <button class="btn btn-sm btn-danger ms-2 eliminar" data-index="${index}">&times;</button>
            </div>
        `;

        listaPedido.appendChild(li);
        total += item.precio * item.cantidad;
    });

    totalPrecio.textContent = `$${total.toFixed(2)}`;

    // Botones para eliminar
    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            pedido.splice(index, 1); // Eliminar del array
            guardarPedido();
            renderizarPedido();
        });
    });
}

// FETCH Y CREACION DE MENU
fetch("./assets/json/menu.json")
    .then(respuesta => respuesta.json())
    .then(menu => {

        Object.keys(menu).forEach(categoria => {

            menu[categoria].forEach(alimento => {

                // Crear enlaces
                const li = document.createElement("li");
                li.classList.add("mb-2");

                const link = document.createElement("a");
                link.href = `#${alimento.nombre.replace(/\s+/g, "-")}`;
                link.classList.add("text-decoration-none", "text-muted");
                link.textContent = alimento.nombre;

                li.appendChild(link);

                // Crear contenido principal
                const divContenido = document.createElement("div");
                divContenido.classList.add("col-lg-6", "mb-4", "d-flex");
                divContenido.id = alimento.nombre.replace(/\s+/g, "-");

                const divImg = document.createElement("div");
                divImg.classList.add("me-3", "position-relative");

                const img = document.createElement("img");
                img.classList.add("img-producto");
                img.src = alimento.imagen;
                img.alt = `${alimento.nombre}`;

                const btnAgregar = document.createElement("button");
                btnAgregar.classList.add("btn", "btn-primary", "position-absolute", "top-0", "end-0", "btn-add");
                btnAgregar.id = alimento.nombre.replace(/\s+/g, "-");

                const imgBtn = document.createElement("img");
                imgBtn.src = "./assets/media/menu/button-add.svg";
                imgBtn.alt = "Añadir al pedido";
                imgBtn.classList.add("icon-add");

                btnAgregar.appendChild(imgBtn);

                divImg.appendChild(img);
                divImg.appendChild(btnAgregar);

                const divTitulo = document.createElement("div");
                divTitulo.classList.add("d-flex", "align-items-center", "position-relative");

                const titulo = document.createElement("span");
                titulo.classList.add("fs-1-3");
                titulo.textContent = alimento.nombre;

                const precio = document.createElement("div");
                precio.classList.add("precio");
                precio.textContent = `$${alimento.precio}`;

                divTitulo.appendChild(titulo);
                divTitulo.appendChild(precio);

                divContenido.appendChild(divImg);
                divContenido.appendChild(divTitulo);

                // Insertar en la categoría correspondiente
                if (categoria === "pizzas") {
                    enlacePizza.appendChild(li);
                    contentPizza.appendChild(divContenido);
                }

                if (categoria === "refrescos") {
                    enlaceRefresco.appendChild(li);
                    contentRefresco.appendChild(divContenido);
                }

                if (categoria === "postres") {
                    enlacePostre.appendChild(li);
                    contentPostre.appendChild(divContenido);
                }

                // Mostrar precio y botón al pasar el mouse
                divContenido.addEventListener("mouseenter", () => {
                    precio.classList.add("visible");
                    btnAgregar.classList.add("visible");
                });

                divContenido.addEventListener("mouseleave", () => {
                    precio.classList.remove("visible");
                    btnAgregar.classList.remove("visible");
                });

                // EVENTO: Añadir al pedido
                btnAgregar.addEventListener('click', () => {
                    const productoExistente = pedido.find(p => p.nombre === alimento.nombre);
                    
                    if (productoExistente) {
                        productoExistente.cantidad += 1;
                    } else {
                        pedido.push({
                            nombre: alimento.nombre,
                            precio: alimento.precio,
                            cantidad: 1
                        });
                    }

                    guardarPedido();
                    renderizarPedido();
                });

            });

        });

    });

// SIDEBAR MI PEDIDO
let miPedido = document.querySelector('#mi-pedido');
let sidebarPedido = document.querySelector('#sidebar-pedido');
let btnCerrar = document.querySelector('#btn-cerrar');

miPedido.addEventListener('click', () => {
    sidebarPedido.style.visibility = "visible";
    sidebarPedido.style.transform = 'translateX(0px)';
});

btnCerrar.addEventListener("click", () => {
    sidebarPedido.style.transform = 'translateX(100%)';
    setTimeout(() => {
        sidebarPedido.style.visibility = 'hidden';
    }, 300);
});

// Al cargar, mostrar pedido existente
renderizarPedido();
