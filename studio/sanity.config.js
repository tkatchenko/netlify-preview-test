import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Netlify Test',

  projectId: 'yti7mcfz',
  dataset: 'production',

  plugins: [deskTool(
    {
      structure,
    }
  ), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
