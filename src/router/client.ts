import express from 'express';

import { getAll, create, getAllWithDeathDate } from '../controllers/client';

export default (router: express.Router) => {

    router.post('/creacliente', create)

    router.get('/kpideclientes' , getAll);

    router.get('/listclientes' , getAllWithDeathDate);
}