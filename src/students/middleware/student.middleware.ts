import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { json } from 'stream/consumers';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.path === '/student/block'){
      console.log('Request...',req.path);
      res.status(404).json({
        message:'http error url',
        path:req.path,
      })
    }
    else{ next();}

  }
}


@Injectable()
export class ShowMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.path === '/student'){
      next();
    }
    else{ next();}
  }
}