// любой пользователь имеет как минимум в БД типы топлива и автозапчастей
// и они равны mock данным, если нет - заменяем

const FuelType = require('../models/FuelType')
const AutoPart = require('../models/AutoPart')

const fuelTypeMock = require('../mock/fuelTypes.json')
const autoPartMock = require('../mock/autoParts.json')

module.exports = async () => {
    const fuelTypes = await FuelType.find()
    if (fuelTypes.length !== fuelTypeMock.length) {
        await createInitialEntity(FuelType, fuelTypeMock)
    }
    
    const autoParts = await AutoPart.find()
    if (autoParts.length !== autoPartMock.length) {
        await createInitialEntity(AutoPart, autoPartMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}