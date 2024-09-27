import { defineConfig, isDev } from 'sanity'

import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

import { colorInput } from '@sanity/color-input'
import { UsersIcon } from '@sanity/icons'
import { visionTool } from '@sanity/vision'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import Navbar from './components/studio/Navbar'
import { customDocumentActions } from './plugins/customDocumentActions'


const devOnlyPlugins = [visionTool()]

export default defineConfig(
  {
  name: 'Aboio',
  projectId: 'dz7lk2fk',
  dataset: 'production',
  basePath: '/revista',
  title: 'Aboio',
  subtitle: 'Conteúdo da Aboio',
  icon: UsersIcon,
  plugins: [
    structureTool({structure}),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],
  schema: {
    types: schemaTypes,
  },
  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },

  studio: {
    components: {
      navbar: Navbar,
    },
  },
}
)