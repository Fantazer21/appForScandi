import {Query, client} from '@tilework/opus'
// ADD types for data
export const query = async (newQuery: Query<string, boolean>)=> {
  client.setEndpoint('http://localhost:4000/graphql')
  return await client.post(newQuery)
}