export const validateQuantity = (quantity) => {
    if (quantity < 1 || Math.floor(quantity) !== (quantity)) {
        throw new Error("err": {
            "code": "invalid_data",
            "message": "\"quantity\" must be larger than or equal to 1"
        })
    }
}
