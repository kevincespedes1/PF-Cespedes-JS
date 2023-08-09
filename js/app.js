const shopContent = document.getElementById("shopContent");

const verCarrito = document.getElementById("verCarrito");

const modalContainer = document.getElementById("modal-container");

const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const response = await fetch ("../data.json");
    const data = await response.json();

    data.forEach((product) => {
        let content = document.createElement("div");
    
        content.className = "card";
    
        content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">Precio por kg: $ ${product.precio}</p>
        `;
    
        shopContent.append(content);
    
        let comprar = document.createElement("button");
    
        comprar.innerText = "Agregar al carrito";
    
        comprar.className = "comprar";
    
        content.append(comprar);
    
        comprar.addEventListener("click", () => {
    
            const repetido = carrito.some((repetidoProduct) => repetidoProduct.id === product.id);
    
            if (repetido) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad += 1
                        Swal.fire({
                            icon: 'success',
                            title: 'Agregado al carrito',
                        })
                    }
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado al carrito',
                })
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                    
                });
            }
            guardarLocal();
            carritoCounter();
        });
    });
}
getProducts();

//local storage 
const guardarLocal = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
