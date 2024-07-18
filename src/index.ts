import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import specs from './swaggerConfig'
import mongoose from 'mongoose';
import router from './router';

const app = express()

app.use(cors({
    credentials: true,
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', router())


const server = http.createServer(app)

server.listen(8080, () => {
    console.log("The Server is running on port 8080")
})

const MONGO_URL = "mongodb+srv://pinapp:pinapp@pinappcluster.slcnmfv.mongodb.net/"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error))