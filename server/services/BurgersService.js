import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { fakeDb } from "../db/FakeDb.js"


class BurgersService {
    getBurgers() {
        return fakeDb.burgers
    }

    createBurger(rawBurgerData) {
        if (!rawBurgerData.name || !rawBurgerData.toppings) {
            throw new BadRequest('Either Name or Toppings list missing')
        }

        rawBurgerData.id = Math.floor((Math.random() * 10000) + '_ab_' + (Math.random() * 10000))

        fakeDb.burgers.push(rawBurgerData)
        return rawBurgerData
    }

    getBurgerById(burgerId) {
        const burger = fakeDb.burgers.find(b => b.id == burgerId)
        if (!burger) {
            throw new BadRequest('Invalid Burger Id')
        }

        return burger
    }

    editBurgerById(burgerId, burgerData) {
        let foundBurger = fakeDb.burgers.find(b => b.id == burgerId)

        if (!foundBurger) {
            throw new BadRequest('Invalid Burger Id')
        }

        if (!burgerData.name || !burgerData.toppings) {
            throw new BadRequest('Invalid Entry')
        }

        foundBurger.name = burgerData.name
        foundBurger.toppings = burgerData.toppings

        return foundBurger
    }
}

export const burgersService = new BurgersService()