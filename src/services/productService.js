import { seedProducts } from '../data/appData'

const KEY='midas-shop-products'
export function getProducts(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||'null')
    if(Array.isArray(saved)){
      const valid=saved.filter(item=>item.image)
      seedProducts.forEach(seed=>{ if(!valid.some(item=>item.id===seed.id)) valid.push({...seed,uploadedByShop:true}) })
      localStorage.setItem(KEY,JSON.stringify(valid))
      return valid
    }
  }catch{}
  const initial=seedProducts.map(item=>({...item,uploadedByShop:true}))
  localStorage.setItem(KEY,JSON.stringify(initial)); return initial
}
export function saveProducts(products){ localStorage.setItem(KEY,JSON.stringify(products.filter(item=>item.image))) }
export function filterProducts(products,{query='',category='All'}={}){
  const needle=query.trim().toLowerCase()
  return products.filter(product=>(category==='All'||product.category===category)&&(!needle||`${product.name} ${product.shop} ${product.purity}`.toLowerCase().includes(needle)))
}
export function getProductById(products,id){ return products.find(product=>product.id===id)||null }
