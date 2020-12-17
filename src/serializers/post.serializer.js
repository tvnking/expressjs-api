export const postSerializer = (object) => ({
  id: object.id,
  title: object.title,
  description: object.description,
  body: object.body,
  createdAt: object.createdAt,
  updatedAt: object.updatedAt,
})

export const postCollectionSerializer = (objects) => objects.map((object) => postSerializer(object))
