import { getProduct, getProducts } from "./services/productService";

async function init() {
    try{
        response = await getProducts('shoes')
    } catch(error){
    } finally{
        
    }

}