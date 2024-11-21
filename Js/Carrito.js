document.addEventListener('DOMContentLoaded', function () {
    // Función para actualizar el carrito
    function actualizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        const cantidadCarrito = document.getElementById('cantidad-carrito');
        if (cantidadCarrito) {
            cantidadCarrito.textContent = cantidadTotal;
        }

        // Mostrar productos en el carrito
        mostrarCarrito();
    }

    // Función para mostrar los productos en el carrito
    function mostrarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const carritoContenedor = document.getElementById('carrito-contenido');
        if (!carritoContenedor) return; // Si no existe, salir de la función

        carritoContenedor.innerHTML = ''; // Limpiar el contenido previo

        if (carrito.length === 0) {
            carritoContenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            carrito.forEach(producto => {
                const productoElemento = document.createElement('div');
                productoElemento.classList.add('producto-carrito');
                productoElemento.innerHTML = `
                    <p>${producto.nombre}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Total: $${producto.precio * producto.cantidad}</p>
                    <button class="eliminar-producto" data-nombre="${producto.nombre}">Eliminar</button>
                `;
                carritoContenedor.appendChild(productoElemento);
            });
        }

        // Mostrar total del carrito
        const totalCarrito = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
        const totalCarritoElemento = document.getElementById('total-carrito');
        if (totalCarritoElemento) {
            totalCarritoElemento.textContent = `Total: $${totalCarrito}`;
        }
    }

    // Agregar eventos a los botones de "Comprar"
    const botonesComprar = document.querySelectorAll('.boton-comprar');
    if (botonesComprar.length > 0) {
        botonesComprar.forEach(boton => {
            boton.addEventListener('click', function () {
                const nombre = this.getAttribute('data-nombre');
                const precio = parseInt(this.getAttribute('data-precio'));

                // Obtener carrito actual desde localStorage
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

                // Verificar si el producto ya está en el carrito
                const productoExistente = carrito.find(producto => producto.nombre === nombre);
                if (productoExistente) {
                    productoExistente.cantidad += 1; // Si ya está en el carrito, aumentar la cantidad
                } else {
                    // Si no está, agregarlo al carrito
                    carrito.push({ nombre, precio, cantidad: 1 });
                }

                // Guardar el carrito actualizado en localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));

                // Actualizar la interfaz
                actualizarCarrito();

                // Alerta de producto agregado
                alert(`${nombre} ha sido agregado al carrito.`);
            });
        });
    }

    // Función para eliminar productos del carrito
    const carritoContenedor = document.getElementById('carrito-contenido');
    if (carritoContenedor) {
        carritoContenedor.addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('eliminar-producto')) {
                const nombreProducto = event.target.getAttribute('data-nombre');
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                // Eliminar el producto del carrito
                carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
                localStorage.setItem('carrito', JSON.stringify(carrito));

                // Volver a mostrar el carrito actualizado
                actualizarCarrito();
            }
        });
    }

    // Función para finalizar la compra
    function finalizarCompra() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
        } else {
            // Limpiar el carrito (vaciarlo)
            localStorage.removeItem('carrito');

            // Mostrar mensaje de éxito
            alert('Compra finalizada con éxito. ¡Gracias por tu compra!');
            
            // Redirigir a la página de inicio o a otra página de agradecimiento (opcional)
            window.location.href = 'Corte_Confeccion.html';  // Cambia esto según tu flujo
        }
    }

    // Agregar evento al botón "Finalizar Compra"
    const botonFinalizarCompra = document.getElementById('finalizar-compra');
    if (botonFinalizarCompra) {
        botonFinalizarCompra.addEventListener('click', finalizarCompra);
    }

    // Llamar a la función para actualizar el carrito al cargar la página
    actualizarCarrito();
});
