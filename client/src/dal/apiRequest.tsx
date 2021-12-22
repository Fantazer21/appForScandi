import {Query, client} from '@tilework/opus'
// ADD types for data
export const query = async (newQuery: Query<string, boolean>) => {
  client.setEndpoint('http://localhost:4000/graphql')
  return await client.post(newQuery)
}


export enum request {
  getCategories = 'categories{name}',
  getCurrencies = 'currencies',
  getProducts= 'categories{products{id,name,inStock,category,brand,gallery,description,prices {currency,amount},attributes{id,name,type,items{,id,displayValue,value}}}}'
}

