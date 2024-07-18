# Proyecto NodeJS para pinApp.

Este proyecto es una aplicación construida con Node.js  que incluye una API con 3 endpoints disponibles.

## Características 
Endpoint POST /creacliente: 
 - El endpoint crea un cliente en un cluster de MongoAtlas, como ODM utilizo Mongoose.
                      
Endpoint GET /kpideclientes.
- Permite obtener del total de los clientes almacenados en la base de datos, la edad promedio y la desviacion estandar entre las edades de los mismos.

Endpoint GET /listclientes.
- Devuelve la lista de todos los clientes con la informacion completa de cada uno sumada la fecha estimada de muerte ( tome como referencia el promedio 80 años segun datos recopilados de la web ).

## Requisitos

- Node.js (versión 16 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/TomasVitale/ChallengePinApp.git
    ```

2. Instalar dependencias:

    ```bash
    npm install
    ```
3. Correr el proyecto:

    ```bash
    npm run start
    ```
    




## Informacion Importante:
- Esta Api esta alojada en AWS en una instancia de EC2. Por favor les dejo la informacion en el email detallando la IP Publica y la url completa para el swagger para que puedan realizar pruebas
configure el archivo yml para que pueda ser utilizado el swagger desde la nube, si lo prueban en local no va a funcionar a menos que cambien la url en el yml y el swaggerConfig.






