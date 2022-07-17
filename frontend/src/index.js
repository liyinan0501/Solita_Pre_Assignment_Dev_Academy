import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
import App from './App'
import 'antd/dist/antd.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
=======
import 'antd/dist/antd.min.css'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
>>>>>>> frontend
