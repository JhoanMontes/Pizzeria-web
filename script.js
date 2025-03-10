let enlacePizza = document.querySelector('#enlace-pizza');
let enlaceRefresco = document.querySelector('#enlace-refresco');
let enlacePostre = document.querySelector('#enlace-postre');

let contentPizza = document.querySelector('.content-pizza');
let contentRefresco = document.querySelector('.content-refresco');
let contentPostre = document.querySelector('.content-postre');

fetch("./assets/json/menu.json")
    .then(respuesta => respuesta.json())
    .then(menu => {




        Object.keys(menu).forEach(categoria => {


            menu[categoria].forEach(alimento => {



                const li = document.createElement("li");
                li.classList.add("mb-2");

                const link = document.createElement("a");
                link.href = `#${alimento.nombre.replace(/\s+/g, "-")}`;
                link.classList.add("text-decoration-none", "text-muted");
                link.textContent = alimento.nombre;

                li.appendChild(link);



                const divContenido = document.createElement("div");
                divContenido.classList.add("col-lg-6", "mb-4", "d-flex");

                const divImg = document.createElement("div");
                divImg.classList.add("me-3");

                const img = document.createElement("img");
                img.classList.add("img-producto");


                img.src = alimento.imagen;
                img.alt = `${alimento.nombre}`;


                const divTitulo = document.createElement("div");
                divTitulo.classList.add("d-flex", "align-items-center");

                const titulo = document.createElement("span");
                titulo.classList.add("fs-1-3");

                titulo.textContent = alimento.nombre;

                divContenido.appendChild(divImg);

                divImg.appendChild(img);

                divContenido.appendChild(divTitulo);

                divTitulo.appendChild(titulo);

                divContenido.id = alimento.nombre.replace(/\s+/g, "-");

                if (categoria == "pizzas") {

                    enlacePizza.appendChild(li);
                    contentPizza.appendChild(divContenido);
                }

                if (categoria == "refrescos") {

                    enlaceRefresco.appendChild(li);
                    contentRefresco.appendChild(divContenido);
                }

                if (categoria == "postres") {

                    enlacePostre.appendChild(li);
                    contentPostre.appendChild(divContenido);
                }


                const precio = document.createElement("div");
                precio.classList.add("precio");

                precio.textContent = `$${alimento.precio}`; 
                
                
                divContenido.addEventListener("mouseenter", () => {
                    precio.classList.add("visible");
                });
                divContenido.addEventListener("mouseleave", () => {
                    precio.classList.remove("visible");
                });
                
                divTitulo.classList.add("position-relative")
                divTitulo.appendChild(precio);
            })



        })

    })