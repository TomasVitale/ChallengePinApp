import express from 'express';
import movies from './client';


const router = express.Router();

export default (): express.Router => {
    movies(router);
    return router;
}

