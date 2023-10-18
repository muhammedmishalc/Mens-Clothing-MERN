import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    products:{},
    oneproduct:{},
    addproduct:{},
    loging:{},
    loading:false,
    error:false
}
export const productslice= createSlice({
    name:'product',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchproducts.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchproducts.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload
        })
        builder.addCase(fetchproducts.rejected,(state)=>{
            state.loading=false
            state.error=true
        })
        builder.addCase(fetchoneproduct.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchoneproduct.fulfilled,(state,action)=>{
            state.loading=false
            state.oneproduct=action.payload
        })
        builder.addCase(fetchoneproduct.rejected,(state)=>{
            state.loading=false
            state.error=true
        })
        builder.addCase(fetchaddproduct.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchaddproduct.fulfilled,(state,action)=>{
            state.loading=false
            state.addproduct=action.payload
        })
        builder.addCase(fetchaddproduct.rejected,(state)=>{
            state.loading=false
            state.error=true
        })
      
    }
})

const products_url = 'http://localhost:2500/main/viewproducts'
export const fetchproducts= createAsyncThunk('fetchproducts', async()=>{
    const response = await axios.get(products_url)
    return response.data.details
})

const oneproduct_url = `http://localhost:2500/main/viewoneproduct`
export const fetchoneproduct = createAsyncThunk('fetchoneproduct',async(id)=>{
    const response = await axios.get(`${oneproduct_url}/${id}`)
    return response.data.details
})

const addproduct_url= 'http://localhost:2500/main/addproduct'
export const fetchaddproduct = createAsyncThunk('fetchaddproduct',async(formsData)=>{
    const response = await axios.post(addproduct_url,formsData)
})







export default productslice.reducer
 
