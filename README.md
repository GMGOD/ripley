# Software Architech Test

Este es un test pensado para demostrar las habilidades de los candidatos para integrar el equipo Cross de Ripley. Esta prueba esta pensada para el puesto de Technical Architech/Leader.

## Problema Teorico

Una empresa de arriendo de automóviles ha crecido lo suficiente como para iniciar un proyecto de automatización de operaciones. Para estos fines, ha elaborado un documento de requerimientos, del cual se desprenden los siguiente datos necesarios para el diseño de la base de datos.
- Se dispone de un parque de vehículos, entre automóviles, camionetas, jeeps y station wagons.
- Cada vehículo se identifica por su patente y se conoce su marca, modelo y año.
- Se dispone de un grupo de choferes, los que pueden o no ser contratados junto con el arriendo de un automóvil.
- Existe una cierta cantidad de clientes con los que se han celebrado convenios,  Estos clientes simplemente llevan los automóviles que necesitan, pagando contra factura a fines de mes.
- Los clientes sin convenio pueden arrendar automóviles pero deben dejar una garantía monetaria.

### Modelo de datos (Modelo Relacional)

Realice un modelo relacional que utilizaría para resolver este problema con sus respectivos campos, llaves y asociaciones. Intente hacer el modelo lo más robusto posible.
El propósito de este problema es que usted sea capaz de desprender un modelo relacional de requerimientos dados por un cliente no experto en este tema, en donde las entidades no necesariamente están explicitas en el documento, esto le da la facultad de extenderse del enunciado pero no salirse del alcance.

### Diseño

Si tuviera que hacer un diseño preliminar (Pensando en el backend y el frontend), de esta solución, pensando en que en un futuro escalara bajo demanda elastica hasta el millon de clientes, y una tasa promedio de 2000 RPM (Request per minute). Proponga un diagrama de la solución utilizando tecnologia AWS y K8s, de tal manera de disponer de unb ambiente preliminar que pueda escalar en capacidad y caracteristicas.
Integre cualquier supuesto y caracteristicas extra que considere pertinente para tener una solución mas robusta y con mejores capacidades de negocio.

- Para este punto considere que la el frontend esta fabricado en tecnologia CSR.
- El backend debe estar construido bajo patrones de microservicios.

### Branching

Diseñe una estrategia para abordar con GIT el desarrollo de la solución, su versionamiento, branching y convergencia hacia la solución. Considere una integración hipotetica a CI/CD.

## Problema Practico

### Problema 1. (No tengo idea como van mis inversiones)

El señor Jose Patricio Risopatron Suniga (Cualquier parecido con la realidad es coincidencia), es un respetado empresario que ha tenido una politica de inversión durante su actividad economica. Como buen inversionista, el señor Risopatron, tiene un porcentaje no despreciable de inversiones en renta variable (Acciones de la Bolsa de Santiago). Si bien el panorama economico va perfecto y las inversiones van bien, el señor Risopatron tiene un grave problema. No tiene idea a ciencia cierta y de una forma global como van las inversiones en las operaciones dia a dia. Debido a que revisar indicador por indicador es una tarea muy costosa, el señor Risopatron debido al escaso tiempo que tiene no puede dedicarse a revisar sus opciones dia a dia, que le permitirian tomar mejores decisiones.

El señor risopatron necesita tener al alcance de su mano (Smartphone) información de rapida lectura que le permita tomar decisiones respecto a sus activos de renta variable. Usted es un reconocido arquitecto, y le han pedido desarrollar una solución MVP para Jose Patricio Risopatron Suniga, la cual ha luego de algunas reuniones exploratorias para determinar los problemas del cliente, se ha decidio que debe solución para moviles que le permita tener al señor risopatron indicadores de todas sus inversiones de renta variable.

En ese contexto, usted es parte del equipo de desarrollo en la posición de backend y debe fabricar las siguientes caracteristicas basado en los indicadores que entrega la bolsa de santiago API's Bolsa de Santiago. Se deben tener en consideración la siguientes caracteristicas identificadas por el equipo de negocios

- Feature 1 (¿Que inversiones tengo?): Obtener todas las inversiones (Instrumentos y cantidad de acciones) de la cartera del señor Risopatron.
- Feature 2 (Quiero invertir en otra cosa!): Agregar una inversión a la cartera del señor Risopatron. (Numero de acciones, Fecha de ultima actualización, Nombre, Monto de Inversión en CLP)
- Feature 3 (Quiero invertir mas): Actualizar una inversión a la cartera del señor Risopatron. (Numero de acciones, Fecha de ultima actualización, Nombre, Monto de Inversión en CLP Actualizado)
- Feature 4 (¿Como van mis inversiones en Colbun S.A?): Obtener el estado (Rentabilidad y estado de inversión) de un instrumento en particular de la cartera.
- Feature 5 (¿Como van mis inversiones, hoy estamos ganando o perdiendo?): Obtener el estado (Rentabilidad y estado de inversión) de toda la cartera.
- Feature 7 (¿Desde que comence como van mis inversiones?): Obtener el monto de ganancias/perdidas vs el dinero invertido de toda la cartera.

***(Bonus Track)***

El señor Risopatron ha indicado que su solución sera ocupada tambien por sus amigos, por lo que las inversiones y carteras deben tener usuarios. (No se pide hacer sistemas de login, solo que las carteras e inversiones puedan discriminar por usuarios).

- Feature 8: Crear nuevo usuario.
- Feature 9: Actualizar usuario.
- Feature 10: Obtener todos los usuarios disponibles.
- Feature 11: Comparar las inversiones de un usuario contra otro en terminos de ganancias/perdidas.

**P.D:** Se entiende que la tarea es ardua por lo cual, se le pide construir una API normalizada y semantica, capaz de poder abordar la tarea y pueda cumplir con los 7 endpoints, + Los bonus track de ser posible.

Ademas se le pide hacer un modelo de datos que soporte esta información, asi como implementar este modelo en una base de datos conectada a esta API.

***Requerimiento:***

- Efectue un diagrama de arquitectura de la solución considerando los patrones a utilizar, las interacciones y centrado en la escalabilidad y elasticidad. Se debe utilizar un API Gateway en la solución.

- Establesca los lineamientos bases para desarrollar esta solución.

***Tip*** Establesca una serie de puntos que sirvan como guia para los desarrolladores y los principios arquitectonicos, como desarrollar los servicios, etc (No debe ser extenso).

- Se pide implementar una interfaz de frontend basica que utilice tecnologia Angular, PWA, para abordar el problema de frontend.

- Se deben implementar los microservicios descritos en el diagrama de arquitectura propuesto.

- Se pide implementar un porcentaje de coverage adecuado en los proyectos de backend. Este coverage debe ser parte de los lineamiento descritos en la solución.

- ***Bonus Track:***
De ser posible implemente la solución en un cluster k8s en una nube a elección (Preferencia AWS), para implementar la solución propuesta. (No es prioridad, pero seria cool ver la solcuión implementada)

**Happy Coding**

## Instrucciones

- Tiempo limite: Lunes 8 - 10:00 AM.

- Debe crear un repositorio en donde la solución final debe quedar en la rama ***master***. Puedes crear todas las ramas intermedias que estimes conveniente durante el ejercicio de tal forma de respetar y seguir las buenas practicas de desarrollo en GIT y sus flujos.

- Todos los componentes de frontend y microservicios deben quedar encapsulados en contenedores docker.

- Para el desarrollo de la solución backend puede ocupar el lenguaje y framework que estime puede cumplir con la labor asignada.

- Recuerde escribir los README.md con las instrucciones para poder probar la aplicación. Si desea puede leer "Writing a Kickass README"

- Se pide utilizar practicas de GIT adecuadas, enfocadas a maximizar la legibilidad de las historias. Si desea puede ver el video en youtube. "Git en las profundidades"

- Se debe efectuar una metodología para abordar el proyecto a nivel de repositorio, y efectuar commits y push con regularidad.

- Se recomienda seguir las recomendaciones del manifiesto Twelve Factor Apps

- Se debe entregar el o los repositorios y tener acceso a estos para dar por finalizado el test.

#### Nota: 

- El uso de buenas prácticas de codificación es obligatorio.

- Avance en el desarrollo, diseñe la solución como primer paso antes de entrar al codigo.

- Toda consulta se puede realizar para aclarar de mejor manera test tecnico.

- Avance todo lo posible. El test esta pensado y diseñado pensando en ese fin.

Éxito