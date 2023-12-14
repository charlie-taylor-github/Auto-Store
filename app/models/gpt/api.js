async function getProductData(prompt) {
    try {
        const data = {
            title: `Generated Product Title | ${Math.floor(Math.random() * 100)}`,
            description: `Generated product description using: ${prompt.description}`
        };
        return { data };
    } catch (error) {
        return { error: error.message };
    }
}

export default { getProductData };
