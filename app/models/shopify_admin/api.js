export default async function (graphql, queryString) {
    try {
        const response = await graphql(queryString);
        const responseJson = await response.json();
        const data = responseJson.data;
        console.log(data)
        return { response: data };
    } catch (error) {
        return { error };
    }
}
