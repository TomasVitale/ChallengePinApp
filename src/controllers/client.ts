import express from 'express';
import { getClient, createClient } from '../db/clientSchema';

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - edad
 *         - fechaNacimiento
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         edad:
 *           type: integer
 *         fechaNacimiento:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Operaciones relacionadas con los clientes
 */

/**
 * @swagger
 * /creacliente:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       '201':
 *         description: Éxito, cliente creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       '400':
 *         description: Error en la solicitud, datos de cliente inválidos
 *       '500':
 *         description: Error interno del servidor
 */
export const create = async (req: express.Request, res: express.Response) => {
    try {
        const { nombre, apellido, edad, fechaNacimiento } = req.body;

        if (!nombre || !apellido || !edad || !fechaNacimiento || !isValidDate(fechaNacimiento)) {
            return res.status(400).json({ message: "Invalid Payload" });
        }

        const client = await createClient({
            nombre,
            apellido,
            edad,
            fechaNacimiento,
        });

        return res.status(201).json(client);

    } catch (error) {
        console.error("Error in create client:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Función para validar el formato de fecha (YYYY-MM-DD)
 * @param {string} dateString - Cadena de texto que representa la fecha
 * @returns {boolean} Verdadero si el formato es válido, falso en caso contrario
 */
function isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

/**
 * @swagger
 * /kpideclientes:
 *   get:
 *     summary: Obtener estadísticas de los clientes
 *     tags: [Clients]
 *     responses:
 *       '200':
 *         description: Éxito, estadísticas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 promedioEdad:
 *                   type: number
 *                 desviacionEstandar:
 *                   type: number
 *       '500':
 *         description: Error interno del servidor
 */
export const getAll = async (req: express.Request, res: express.Response) => {
    try {
        const clients = await getClient();

        const totalClientes = clients.length;
        const sumaEdades = clients.reduce((acc, client) => acc + client.edad, 0);
        const promedioEdad = sumaEdades / totalClientes;

        const sumatoriaCuadrados = clients.reduce((acc, client) => acc + Math.pow(client.edad - promedioEdad, 2), 0);
        const desviacionEstandar = Math.sqrt(sumatoriaCuadrados / totalClientes);

        const response = {
            promedioEdad,
            desviacionEstandar
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error("Error in getAll clients:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * @swagger
 * /listclientes:
 *   get:
 *     summary: Obtener lista de clientes con fecha probable de muerte
 *     tags: [Clients]
 *     responses:
 *       '200':
 *         description: Éxito, lista de clientes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       '500':
 *         description: Error interno del servidor
 */
export const getAllWithDeathDate = async (req: express.Request, res: express.Response) => {
    try {
        const clients = await getClient();

        const clientsWithDeathDate = clients.map(client => {
            const fechaNacimiento = new Date(client.fechaNacimiento);
            const esperanzaVidaPromedio = 80; // Esperanza de vida promedio en años
            const fechaProbableMuerte = new Date(fechaNacimiento);
            fechaProbableMuerte.setFullYear(fechaNacimiento.getFullYear() + esperanzaVidaPromedio);
            return {
                ...client.toObject(),
                fechaProbableMuerte
            };
        });

        return res.status(200).json(clientsWithDeathDate);

    } catch (error) {
        console.error("Error in getAllWithDeathDate:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
