export default async function () {
  const module = await import(
    "@medusajs/medusa/dist/api/routes/admin/products/index"
  );
  Object.assign(module, {
    ...module,
    defaultAdminProductRelations: [
      ...module.defaultAdminProductRelations,
      "videoEmbeds",
    ],
  });
}
