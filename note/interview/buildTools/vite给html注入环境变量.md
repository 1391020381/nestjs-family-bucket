
```
import { createHtmlPlugin } from 'vite-plugin-html';

createHtmlPlugin({
        minify: false,
        inject: {
          data: {
            mode,
            DEFAULT_PAGE_ID: env.VITE_DEFAULT_PAGE_ID,
            DEFAULT_CHANNEL_ID: env.VITE_DEFAULT_CHANNEL_ID,
          },
        },
      })

// index.html

// 默认保底页面ID
      const DEFAULT_PAGE_ID = '<%-DEFAULT_PAGE_ID%>';
      // 默认保底渠道码
      const DEFAULT_CHANNEL_ID = '<%-DEFAULT_CHANNEL_ID%>';


```