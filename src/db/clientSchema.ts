import mongoose from 'mongoose';


const clientSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    fechaNacimiento: { type: String },
})

export const ClientModel = mongoose.model('Client', clientSchema)


export const getClient = async () => await ClientModel.find();


export const createClient = async (values: Record<string, any>) => await new ClientModel(values).save().then((client) => client.toObject())

