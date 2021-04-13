async function getAllProductsName (name) {
    const [rows] = await conn.execute(`StoreManager.products.find(name: ${name})`)
    return rows;
}