/// <reference path="./../../typings/index.d.ts" />

import {Router, Request, Response, NextFunction} from 'express';

export class UserRoutes {
 public router: Router;
    /**
   * Initialize the UserRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

 /**
 * Take each handler, and attach to one of the Express.Router's
 * endpoints.
 */
  init(){ 
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
  }


  /**
   * GET all Users.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
     res.json({
        message: 'Eswar'
      });
  }


  /**
 * GET one user by id
 */
public getOne(req: Request, res: Response, next: NextFunction) {
  // let query = parseInt(req.params.id);
  // let hero = Heroes.find(hero => hero.id === query);
  // if (hero) {
  //   res.status(200)
  //     .send({
  //       message: 'Success',
  //       status: res.status,
  //       hero
  //     });
  // }
  // else {
  //   res.status(404)
  //     .send({
  //       message: 'No hero found with the given id.',
  //       status: res.status
  //     });
  // }
}
}

const userRoutes = new UserRoutes();
userRoutes.init();
export default userRoutes.router;