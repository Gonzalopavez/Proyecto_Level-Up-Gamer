const listaProductos = [
  // --- Tarjetas Gráficas ---
  {
    id: "prod-01",
    nombre: "Tarjeta Gráfica RTX 4090",
    precio: 1899990,
    imagen: "img/productos/rtx.jpg",
    descripcion: `Experimenta un rendimiento sin precedentes en juegos y creación de contenido con la GPU más potente del mercado.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Arquitectura de última generación NVIDIA Ada Lovelace.</li>
            <li>24 GB de memoria GDDR6X.</li>
            <li>Ray Tracing de 3ª generación y DLSS 3.</li>
            <li>Ideal para gaming en 4K y realidad virtual.</li>
        </ul>
    `
  },
  {
    id: "prod-02",
    nombre: "Tarjeta Gráfica RTX 4070 Super",
    precio: 749990,
    imagen: "img/productos/rtxsuper.jpg",
    descripcion: `El punto ideal entre precio y rendimiento. Juega los últimos títulos en 1440p con altas tasas de refresco y tecnologías de IA.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Arquitectura NVIDIA Ada Lovelace.</li>
            <li>12 GB de memoria GDDR6X.</li>
            <li>Rendimiento superior a la RTX 3080 con menor consumo.</li>
            <li>Perfecta para gaming en QHD (1440p).</li>
        </ul>
    `
  },
  {
    id: "prod-03",
    nombre: "Tarjeta Gráfica AMD RX 7800 XT",
    precio: 629990,
    imagen: "img/productos/rx.jpg",
    descripcion: `La competencia directa de AMD que ofrece un rendimiento excepcional en rasterización y una gran cantidad de VRAM para texturas de alta resolución.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Arquitectura RDNA 3 de AMD.</li>
            <li>16 GB de memoria GDDR6.</li>
            <li>Tecnología AMD FidelityFX™ Super Resolution (FSR).</li>
            <li>Excelente rendimiento por peso en gaming a 1440p.</li>
        </ul>
    `
  },
  // --- Procesadores ---
  {
    id: "prod-04",
    nombre: "Procesador AMD Ryzen 9 7950X",
    precio: 549990,
    imagen: "img/productos/ryzen.jpg",
    descripcion: `Alcanza un rendimiento extremo en juegos y tareas de creación con la potencia de la arquitectura más avanzada de AMD.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>16 núcleos y 32 hilos para multitarea sin límites.</li>
            <li>Frecuencia base de 4,5 GHz, con boost hasta 5,7 GHz.</li>
            <li>Compatible con memoria DDR5 de alta velocidad.</li>
            <li>Ideal para gaming, edición de video y streaming profesional.</li>
        </ul>
    `
  },
  {
    id: "prod-05",
    nombre: "Procesador Intel Core i7-14700K",
    precio: 489990,
    imagen: "img/productos/intel.webp",
    descripcion: `Una bestia para el gaming y la productividad, con una combinación de núcleos de rendimiento y eficiencia para manejar cualquier tarea.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>20 núcleos (8 de rendimiento + 12 de eficiencia) y 28 hilos.</li>
            <li>Frecuencia turbo de hasta 5,6 GHz.</li>
            <li>Compatible con memorias DDR4 y DDR5.</li>
            <li>Excelente para gaming de alta frecuencia y software de diseño.</li>
        </ul>
    `
  },
  // --- Periféricos ---
  {
    id: "prod-06",
    nombre: "Monitor Gamer Curvo 32\" QHD Samsung",
    precio: 349990,
    imagen: "img/productos/monitor.webp",
    descripcion: `Sumérgete en la acción con una pantalla curva inmersiva y una tasa de refresco ultra rápida que te dará la ventaja competitiva.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Resolución QHD (2560x1440).</li>
            <li>Tasa de refresco de 144Hz.</li>
            <li>Tiempo de respuesta de 1ms.</li>
            <li>Panel VA para colores vibrantes y negros profundos.</li>
        </ul>
    `
  },
  {
    id: "prod-07",
    nombre: "Teclado Mecánico Custom RGB",
    precio: 129990,
    imagen: "img/productos/teclado-custom.jpg",
    descripcion: `Construido para entusiastas, este teclado 65% te permite intercambiar switches y keycaps para una experiencia de escritura única.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Formato compacto 65%.</li>
            <li>Switches Gateron Red (Hot-swappable).</li>
            <li>Cuerpo de aluminio y keycaps de PBT.</li>
            <li>Iluminación RGB por tecla totalmente personalizable.</li>
        </ul>
    `
  },
  {
    id: "prod-08",
    nombre: "Mouse Gamer Ultraligero",
    precio: 64990,
    imagen: "img/productos/mouse-gamer.jpg",
    descripcion: `Movimientos rápidos y precisos con este mouse inalámbrico de solo 60 gramos. Diseñado para largas sesiones de juego sin fatiga.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Sensor óptico de 26,000 DPI.</li>
            <li>Diseño ergonómico y peso de 60g.</li>
            <li>Conectividad inalámbrica de 2.4GHz de baja latencia.</li>
            <li>Batería de hasta 80 horas de duración.</li>
        </ul>
    `
  },
  {
    id: "prod-09",
    nombre: "Audífonos Gamer Inalámbricos 7.1 Logitech G935",
    precio: 99990,
    imagen: "img/productos/audifonoslogi.webp",
    descripcion: `Escucha cada paso y cada detalle con sonido envolvente 7.1. Su micrófono con cancelación de ruido asegura una comunicación clara.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Sonido Surround 7.1 virtual.</li>
            <li>Micrófono desmontable con certificación Discord.</li>
            <li>Almohadillas de espuma viscoelástica.</li>
            <li>Compatibilidad multiplataforma (PC, PS5, Switch).</li>
        </ul>
    `
  },
  {
    id: "prod-10",
    nombre: "Webcam Streaming 4K",
    precio: 159990,
    imagen: "img/productos/webcam.jpg",
    descripcion: `Lleva tus streams al siguiente nivel con calidad de video 4K Ultra HD. Sensor de alta calidad para una imagen nítida incluso con poca luz.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Resolución 4K a 30fps o 1080p a 60fps.</li>
            <li>Enfoque automático y corrección de luz inteligente.</li>
            <li>Campo de visión ajustable.</li>
            <li>Micrófonos estéreo integrados.</li>
        </ul>
    `
  },
  // --- Almacenamiento y Componentes ---
  {
    id: "prod-11",
    nombre: "SSD NVMe M.2 2TB Gen4",
    precio: 119990,
    imagen: "img/productos/ssd.jpg",
    descripcion: `Elimina los tiempos de carga. Con velocidades de lectura de hasta 7,000 MB/s, tu sistema operativo y juegos cargarán en un instante.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Capacidad: 2 TB.</li>
            <li>Interfaz: PCIe 4.0 NVMe.</li>
            <li>Velocidad de lectura secuencial: 7,000 MB/s.</li>
            <li>Velocidad de escritura secuencial: 6,500 MB/s.</li>
        </ul>
    `
  },
  {
    id: "prod-12",
    nombre: "Placa Madre B650 AM5",
    precio: 219990,
    imagen: "img/productos/placa.png",
    descripcion: `La base perfecta para tu procesador Ryzen 7000. Equipada con las últimas tecnologías para exprimir al máximo tu PC.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Socket AM5 para procesadores AMD Ryzen 7000.</li>
            <li>Soporte para memoria RAM DDR5.</li>
            <li>Múltiples puertos M.2 para SSDs NVMe Gen4/Gen5.</li>
            <li>VRM robusto para overclocking estable.</li>
        </ul>
    `
  },
  {
    id: "prod-13",
    nombre: "Silla Gamer Ergonómica Trust Gxt 707 Resto red Pro Gaming",
    precio: 189990,
    imagen: "img/productos/silla.jpg",
    descripcion: `Juega por horas con la máxima comodidad. Diseño ergonómico con soporte lumbar y cervical ajustable para cuidar tu postura.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Material de cuero sintético transpirable rojo y negro.</li>
            <li>Cojines lumbar y cervical ajustables.</li>
            <li>Reposabrazos 4D y reclinación de hasta 180°.</li>
            <li>Base de acero reforzado.</li>
        </ul>
    `
  },
  // --- Videojuegos ---
  {
    id: "prod-14",
    nombre: "Elden Ring: Shadow of the Erdtree",
    precio: 44990,
    imagen: "img/productos/elden-ring.jpg",
    descripcion: `La esperada expansión del galardonado juego del año. Viaja a la Tierra Sombría y desvela un nuevo misterio en el universo de FromSoftware.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Una nueva y masiva área para explorar.</li>
            <li>Nuevos jefes, armas y hechizos.</li>
            <li>Requiere el juego base Elden Ring.</li>
            <li>Género: Acción RPG de mundo abierto.</li>
        </ul>
    `
  },
  {
    id: "prod-15",
    nombre: "Helldivers 2",
    precio: 39990,
    imagen: "img/productos/helldivers2.jpg",
    descripcion: `Únete a la lucha por la Supertierra en este shooter cooperativo. ¡Llama a tus amigos, elige tu equipamiento y esparce la democracia controlada!
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Shooter en tercera persona.</li>
            <li>Enfocado en el juego cooperativo para 4 jugadores.</li>
            <li>Sistema de estratagemas para solicitar apoyo aéreo y armas.</li>
            <li>Fuego amigo siempre activado para un caos garantizado.</li>
        </ul>
    `
  },
  {
    id: "prod-16",
    nombre: "Cyberpunk 2077: Ultimate Edition",
    precio: 59990,
    imagen: "img/productos/cyberpunk2077.jpg",
    descripcion: `Vive la experiencia completa de Night City. Incluye el juego base aclamado por la crítica y su expansión de thriller de espionaje, Phantom Liberty.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Mundo abierto masivo y detallado.</li>
            <li>Profunda personalización de personaje y estilo de juego.</li>
            <li>Incluye la expansión Phantom Liberty y todas las actualizaciones.</li>
            <li>Gráficos de última generación con Ray Tracing.</li>
        </ul>
    `
  },
  {
    id: "prod-17",
    nombre: "Baldur's Gate 3",
    precio: 49990,
    imagen: "img/productos/baldurs-gate3.jpg",
    descripcion: `Reúne a tu grupo y regresa a los Reinos Olvidados en una historia de compañerismo y traición. El RPG definitivo, ganador de múltiples premios.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Basado en el universo de Dungeons & Dragons.</li>
            <li>Libertad sin precedentes para explorar y tomar decisiones.</li>
            <li>Modo cooperativo online y local.</li>
            <li>Cientos de horas de contenido.</li>
        </ul>
    `
  },
  {
    id: "prod-18",
    nombre: "Starfield: Premium Edition",
    precio: 79990,
    imagen: "img/productos/starfield.jpg",
    descripcion: `El primer universo nuevo en 25 años de Bethesda Game Studios. Crea cualquier personaje que desees y explora con una libertad sin igual.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Explora más de 1000 planetas.</li>
            <li>Personalización profunda de naves y bases.</li>
            <li>Incluye la expansión "Espacio Quebrantado".</li>
            <li>Género: RPG de ciencia ficción.</li>
        </ul>
    `
  },
  {
    id: "prod-19",
    nombre: "Monitor 4K OLED 27\"",
    precio: 899990,
    imagen: "img/productos/monitor-oled.jpg",
    descripcion: `Experimenta una calidad de imagen sin igual. Con negros perfectos y colores increíblemente precisos, es el monitor definitivo para creadores y gamers.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Resolución 4K (3840x2160).</li>
            <li>Panel OLED para contraste infinito.</li>
            <li>Tasa de refresco de 120Hz, ideal para consolas de nueva gen.</li>
            <li>Cobertura del 99% del espacio de color DCI-P3.</li>
        </ul>
    `
  },
  {
    id: "prod-20",
    nombre: "Kit de Refrigeración Líquida 360mm",
    precio: 139990,
    imagen: "img/productos/liquid-cooling.jpg",
    descripcion: `Mantén tu procesador a temperaturas bajas incluso en las sesiones de juego más intensas. Con iluminación ARGB para un look espectacular.
        <br><br> <strong>Características Principales:</strong>
        <ul>
            <li>Radiador de 360mm con 3 ventiladores ARGB.</li>
            <li>Bomba de alto rendimiento y bajo ruido.</li>
            <li>Compatible con los últimos sockets de Intel y AMD.</li>
            <li>Software para personalizar la iluminación y velocidad.</li>
        </ul>
    `
  }
];