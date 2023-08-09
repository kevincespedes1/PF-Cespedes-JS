const pintarCarrito = () => {
    modalContainer.innerHTML = ""

    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");

    modalHeader.className = "modal-header";

    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `

    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");

    modalButton.innerText = "x";

    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {

        modalContainer.style.display = "none";

    });

    modalHeader.append(modalButton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");

        carritoContent.className = "modal-content";

        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>$ ${product.precio}</p>
        <span class="restar"> - </span>
        <p>Cantidad: ${product.cantidad} kg </p>
        <span class="sumar"> + </span>
        <p>Total: $ ${product.cantidad * product.precio}</p>
        <span class="delete-product"> ❌ </span>
        `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad -= 1;
                pintarCarrito();
            };
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad += 1;
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProd(product.id);

        })

    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalPrecio = document.createElement("div");

    totalPrecio.className = "total-content"

    totalPrecio.innerHTML = `Total a pagar: $ ${total}`

    modalContainer.append(totalPrecio);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProd = (id) => {
    const buscarId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((productId) => {
        return productId !== buscarId;
    });
    Swal.fire({
        title: 'Estas seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalo'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Tu producto ha sido eliminado con exito.',
            'success'
          )
          carritoCounter();
          guardarLocal();
          pintarCarrito();
        }
      })
};
const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();