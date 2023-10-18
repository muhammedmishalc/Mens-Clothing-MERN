import { configureStore } from '@reduxjs/toolkit'
import productreducer from '../slice/productslice'
import loginreducer from '../slice/loginslice'

export const store = configureStore({
  reducer: {
    product:productreducer,
    user:loginreducer,

  },
})
