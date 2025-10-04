---
name: 'page-component'
root: 'src/pages'
output: '**/*'
ignore: []
questions:
  name: 'ページコンポーネントの名前を入力:'
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import styles from './{{ inputs.name | pascal }}.module.scss'

import { use{{ inputs.name | pascal }} } from './use{{ inputs.name | pascal }}'


export const {{ inputs.name | pascal }}: FC = () => {
  use{{ inputs.name | pascal }}()

  return (
    <BaseLayout>
      <Head pageTitle="{{ inputs.name | pascal }}" />
      <div className={styles.{{ inputs.name | camel }}}>
        <main className={styles.main}>
          <p>{{ inputs.name | snake }}</p>
        </main>
      </div>
    </BaseLayout>
  )
}

```

# `{{ inputs.name | pascal }}/use{{ inputs.name | pascal }}.ts`

```typescript
export const use{{inputs.name | pascal}} = () => {
  return null
};

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.module.scss`

```scss
@use "style/_variable" as *;

.{{ inputs.name | camel }} {
  position: relative;
}

.main {
  position: relative;
}

```
