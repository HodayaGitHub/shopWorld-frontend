import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys } from '../store/actions/toy.actions'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)


    useEffect(() => {
        loadToys()
            .catch(() => {
                showErrorMsg('Cannot show toys')
            })
    }, [])

    // function onRemoveToy(toyId) {
    //     removeToyOptimistic(toyId)
    //         .then(() => {
    //             showSuccessMsg('toy removed')
    //         })
    //         .catch(err => {
    //             console.log('Cannot remove toy', err)
    //             showErrorMsg('Cannot remove toy')
    //         })
    // }

    // function onAddCar() {
    //     const carToSave = carService.getEmptyCar()
    //     saveCar(carToSave)
    //         .then((savedCar) => {
    //             console.log('savedCar:', savedCar)
    //             showSuccessMsg(`Car added (vendor: ${savedCar.vendor})`)
    //             // dispatch({ type: ADD_CAR, car: savedCar })
    //         })
    //         .catch(err => {
    //             console.log('Cannot add car', err)
    //             showErrorMsg('Cannot add car')
    //         })
    // }

    // function onEditCar(car) {
    //     const price = +prompt('New price?')
    //     const carToSave = { ...car, price }

    //     saveCar(carToSave)
    //         .then((savedCar) => {
    //             // dispatch({ type: UPDATE_CAR, car: savedCar })
    //             showSuccessMsg(`Car updated to price: $${savedCar.price}`)
    //         })

    //         .catch(err => {
    //             console.log('Cannot update car', err)
    //             showErrorMsg('Cannot update car')
    //         })
    // }

    // function onSetFilter(filterBy) {
    //     console.log('filterBy:', filterBy)
    //     // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    //     setFilterBy(filterBy)
    // }

    // function addToCart(car) {
    //     console.log('car:', car)
    //     console.log(`Adding ${car.vendor} to Cart`)
    //     dispatch({ type: ADD_CAR_TO_CART, car })
    //     showSuccessMsg('Added to Cart')
    // }


    return (
        <div>
            <h3>Toys App</h3>
            <main>
                {/* {!isLoading && <ToyList
                    toys={toys}
                    onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}              
                />}
                {isLoading && <div>Loading...</div>} */}
            </main>
        </div>
    )

}