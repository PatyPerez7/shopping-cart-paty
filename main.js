document.addEventListener('DOMContentLoaded', () => {
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Mantequilla',
            precio: 10,
             imagen: 'imgs/mantequilla.jpg'
        },
        {
            id: 2,
            nombre: 'Coca de vidrio',
            precio: 30,
            imagen: 'imgs/coca.svg'
        },
        {
            id: 3,
            nombre: 'Cheetos',
            precio: 15,
            imagen: 'imgs/cheetos.jpg'
        },
        {
            id: 4,
            nombre: 'Aguita',
            precio: 8,
            imagen: 'imgs/aguita.jpg'
        },
    ]
    let carrito = []
    const divisa = ' $'
    const DOMitems = document.querySelector('#items')
    const DOMcarrito = document.querySelector('#carrito')
    const DOMtotal = document.querySelector('#total')

    //funcionalidades

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {

            //estructura del card
            const miNodo = document.createElement('div')
            miNodo.classList.add('card', 'col-sm-4')

            //contenido
            const miNodoCardBody = document.createElement('div')

            //titulo
            const miNodoTitle = document.createElement('h5')
            miNodoTitle.classList.add('card-title')
            miNodoTitle.textContent = info.nombre

            //imagen
            const miNodoImagen = document.createElement('img')
            miNodoImagen.classList.add('card-img-top')
            miNodoImagen.setAttribute('src', info.imagen)

            //precio
            const miNodoPrecio = document.createElement('p')
            miNodoPrecio.classList.add('card-text')
            miNodoPrecio.textContent = divisa + '' + info.precio

            //boton
            const miNodoBoton = document.createElement('button')
            miNodoBoton.classList.add('btn', 'btn-primary')
            miNodoBoton.textContent = '+'
            miNodoBoton.setAttribute('marcador', info.id)
            miNodoBoton.addEventListener('click', anadirProductosCarrito)

            //armar nuestra tarjetita de producto
            miNodoCardBody.appendChild(miNodoImagen)
            miNodoCardBody.appendChild(miNodoTitle)
            miNodoCardBody.appendChild(miNodoPrecio)
            miNodoCardBody.appendChild(miNodoBoton)
            miNodo.appendChild(miNodoCardBody)
            DOMitems.appendChild(miNodo)

        })

    }

    function calcularTotalPorProducto(idProducto) {
        // Obtener cantidad de veces que el producto está en el carrito
        const numeroDeUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === idProducto.toString() ? total + 1 : total;
        }, 0);

        // Obtener precio del producto
        const producto = baseDeDatos.find((producto) => producto.id === idProducto);

        // Calcular total por producto
        return numeroDeUnidadesItem * producto.precio;
    }

    function renderizarCarrito() {
        // Limpiar carrito
        DOMcarrito.textContent = '';
        // Se quitan los duplicados del carrito
        const carritoSinDuplicados = [...new Set(carrito)]
        //Se generan los elementos para mostrar a partir del carrito
        carritoSinDuplicados.forEach((item) => {
            // Funcion de alto orden
            const miItem = baseDeDatos.filter((itemBaseDeDatos) => {
                // Verificar si coincide el id en la base de datos
                return itemBaseDeDatos.id === parseInt(item)
            })
            // Contar el numero de veces
            const numeroDeUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total // if
            }, 0)

            // Calcular total por tipo producto
            const totalPorProducto = calcularTotalPorProducto(parseInt(item));

            // Se crea el nodo del item del carrito
            const miNodo = document.createElement('li')
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2')
            //miNodo.textContent = `${numeroDeUnidadesItem} x ${miItem[0].nombre} -> ${miItem[0].precio}${divisa}`
            miNodo.textContent = `${numeroDeUnidadesItem} x ${miItem[0].nombre} -> ${divisa}${miItem[0].precio} (Total: ${divisa}${totalPorProducto})`;

            //Boton eliminar elementos carrito
            //

            //Se agregan al carrito los nodos
            DOMcarrito.appendChild(miNodo)
            
            //Funcion para mostrar el total del carrito
            DOMtotal.textContent = calcularTotal()
            // --------------------------------

        })

    }
    function anadirProductosCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito()
    }
 
    //!NO HACE LA FUNCION
    function calcularTotal() {
        return carrito.reduce((total, producto) => {
            const miProducto = baseDeDatos.filter((itemBaseDeDatos) => {
            return itemBaseDeDatos.id === parseInt(producto)
            })
            // console.log(miProducto)
            return total + miProducto[0].precio
        }, 0).toFixed(2) // Limitar los decimales (a 2 en este caso)
    }

    renderizarProductos()
})