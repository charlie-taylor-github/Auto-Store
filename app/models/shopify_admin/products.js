import api from "./api.js";

/*
PRICE
IMAGE
CHARGE TAX (set to no)
TRACK QUANTITY (set to no)
*/

// CREATE
async function createOne(graphql, data) {
    const query = `
    mutation {
        productCreate(input: {
            title: "${data.title}",
            descriptionHtml: "${data.description}",
            variants: {
                price: "100"
            },
            status: ACTIVE,
            published: true
        }) {
            userErrors {
                field
                message
            }
            product {
                id
            }
        }
    }
    `;
    const { error, response } = await api(graphql, query);
    if (error) return { error: error.message };
    if (response.productCreate.userErrors.length > 0) return { error: "CREATE_PRODUCT_ERROR" };
    const id = response.productCreate.product.id;
    return { id };
}


// READ
async function getAllIds(graphql) {
    const query = `
    query {
        products(first: 100) {
            edges {
                node {
                id
                }
            }
        }
    }
    `;
    const { error, response } = await api(graphql, query);
    if (error) return { error: error.message };
    const ids = response?.products?.edges.map(e => e.node.id);
    if (!ids) return { error: "FETCH_PRODUCTS_ERROR" };
    return { ids };
}


// DELETE
async function deleteOne(graphql, id) {
    const query = `
    mutation {
        productDelete(input: {id: "${id}"}) {
            userErrors {
                field
                message
            }
        deletedProductId
        }
    }
    `;
    const { error, response } = await api(graphql, query);
    if (error) return { error: error.message };
    if (response.productDelete.userErrors.length > 0) return { error: "DELETE_PRODUCT_ERROR" };
    return {};
}

async function deleteAll(graphql) {
    const { error: fetchProductsError, ids } = await getAllIds(graphql);
    if (fetchProductsError) return { error: fetchProductsError };
    for (const id of ids) {
        const { error: deleteError } = await deleteOne(graphql, id);
        if (deleteError) return { error: deleteError };
    }
    return {};
}

export default {
    createOne,
    getAllIds,
    deleteOne, deleteAll
};
