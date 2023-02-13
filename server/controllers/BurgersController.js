import BaseController from "../utils/BaseController.js";
import { burgersService } from "../services/BurgersService.js";

export class BurgersController extends BaseController {
    constructor() {
        super('api/burgers')
        this.router
            .get('', this.getBurgers)
            .get('/:burgerId', this.getBurgerById)
            .post('', this.createBurger)
            .put('/:burgerId', this.editBurgerById)
    }

    getBurgers(req, res, next) {
        try {
            let burgers = burgersService.getBurgers()
            res.send(burgers)
        } catch (error) {
            next(error)
        }
    }

    getBurgerById(req, res, next) {
        try {
            let burgerId = req.params.burgerId
            const burger = burgersService.getBurgerById(burgerId)
            res.send(burger)
        } catch (error) {
            next(error)
        }
    }

    createBurger(req, res, next) {
        try {
            let rawBurgerData = req.body
            let newBurger = burgersService.createBurger(rawBurgerData)
            res.send(newBurger)
        } catch (error) {
            next(error)
        }
    }

    editBurgerById(req, res, next) {
        try {
            let burgerData = req.body
            let burgerId = req.params.burgerId
            let updatedBurger = burgersServie.editBurgerById(burgerId, burgerData)

            res.send(updatedBurger)
        } catch (error) {
            next(error)
        }
    }
}