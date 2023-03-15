import { Router } from 'express';
const router = Router();

router.get('/',( req, res,next)=>{
  res.send('router is working')
})

export default router;
