export default async function () {
  const module = await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  );
  Object.assign(module, {
    ...module,
    allowedStoreProductsRelations: [
      ...module.allowedStoreProductsRelations,
      "videoEmbeds",
    ],
    defaultStoreProductsRelations: [
      ...module.defaultStoreProductsRelations,
      "videoEmbeds",
    ],
  });
}
