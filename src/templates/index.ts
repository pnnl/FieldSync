import { MDXProps } from 'mdx/types'
import React from 'react'

import Playground from './playground.mdx'

import {
    type BaseData,
    type BaseMetadata,
    type Project,
} from '../types/database.types'

export interface TemplateProps {
    project?: PouchDB.Core.Document<Project> & PouchDB.Core.GetMeta
    data: BaseData
    metadata: BaseMetadata
}

export interface TemplateConfiguration {
    title: string
    subtitle: {
        singularTitleCase: string // Singular title case (e.g., "Installation")
        singularLowerCase: string // Singular lowercase (e.g., "installation")
        pluralTitleCase: string // Plural title case (e.g., "Installations")
        pluralLowerCase: string // Plural lowercase (e.g., "installations")
    }
    template: React.FC<MDXProps & TemplateProps>
}

const TEMPLATES: Record<string, TemplateConfiguration> = {
    playground: {
        title: 'Playground',
        subtitle: {
            singularTitleCase: 'Playground',
            singularLowerCase: 'playground',
            pluralTitleCase: 'Playgrounds',
            pluralLowerCase: 'playgrounds',
        },
        template: Playground,
    },
}

const RESERVED_TEMPLATE_KEYS: string[] = ['workflows']

const RE_TEMPLATE_KEY = /^(?!_)(?!.*_$)[a-z0-9_]{1,64}$/i

Object.keys(TEMPLATES).forEach(key => {
    if (RESERVED_TEMPLATE_KEYS.includes(key) || !RE_TEMPLATE_KEY.test(key)) {
        throw new Error(`Invalid template key: ${JSON.stringify(key)}`)
    }
})

export default TEMPLATES
