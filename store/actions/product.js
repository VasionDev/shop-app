export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const deleteProduct = (prodID) => {
    return {type: DELETE_PRODUCT, productID: prodID}
}