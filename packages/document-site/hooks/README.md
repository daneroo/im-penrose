# Hooks experiment

- Had to use  `cold` from `react-hot-loader` to make HMR work.

```js
import { cold } from 'react-hot-loader'
...
cold(IndexPage)
export default IndexPage
```

## Setup

```bash
npx gatsby new hooks
cd hooks
npm i standard
# next: 16.7.0-alpha.0
npm install react@next react-dom@next

npm install d3blackbox d3
```