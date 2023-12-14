// SHOPIFY
import { authenticate } from "../shopify.server";
// REMIX / REACT
import { useActionData, useSubmit } from "@remix-run/react";
import { useState } from "react";
// COMPONENTS
import MainPage from "../components/pages/main.js";
import ProductInputPage from "../components/pages/product_input.js";
// MODELS
import products from "../models/shopify_admin/products.js";
import gpt from "../models/gpt/api.js";

export async function action({ request }) {
  const { admin: { graphql } } = await authenticate.admin(request);
  const data = await request.formData();
  const paramsString = await data.get("params");
  const action = await data.get("action");
  const params = JSON.parse(paramsString);

  if (action === "delete-products") {
    const { error } = await products.deleteAll(graphql);
    if (error) return { error };
    return { message: "Products deleted successfully" }
  }

  if (action === "create-product") {
    const { description } = params;
    const productInfo = { description };
    const { data, error: generateError } = await gpt.getProductData(productInfo);
    if (generateError) return { error: generateError };
    const { error, id } = await products.createOne(graphql, data);
    if (error) return { error };
    return { message: `Product created successfully (id: ${id})` }
  }

  return {};
}

export default function Index() {
  const submit = useSubmit();
  const actionData = useActionData();
  const [pageName, setPageName] = useState("main");
  const [inputState, setInputState] = useState({
    productDescription: ""
  });

  const pagesConfig = {
    main: {
      component: MainPage,
      props: {
        error: actionData?.error ? actionData.error : "",
        message: actionData?.message ? actionData.message : "",
        start: () => {
          setPageName("productInput");
        },
        deleteProducts: () => {
          submit(
            { action: "delete-products" },
            { method: "POST" }
          );
        }
      }
    },
    productInput: {
      component: ProductInputPage,
      props: {
        goBack: () => {
          setPageName("main");
        }
      }
    }
  }

  const CurrentPage = pagesConfig[pageName]?.component;
  const currentPageProps = pagesConfig[pageName]?.props;

  return <CurrentPage {...currentPageProps} />;
}

/*
<Layout.Section>
  <Text
    as="h1"
    variant="bodyMd"
  >
    Describe your product
  </Text>
  <TextField
    onChange={v => setInputState({
      ...inputState,
      productDescription: v
    })}
    value={inputState.productDescription}
  />
</Layout.Section>


submit(
          {
            action: "create-product",
            params: JSON.stringify({
              description: inputState.productDescription
            })
          },
          { method: "POST" }
        );
*/