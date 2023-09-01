export default {
  name: 'page',
  type: 'document',
	title: 'Page',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      }
    },
    {
      title: 'Content', 
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ]
    },
  ]
}
