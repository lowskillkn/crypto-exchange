import axios from 'axios'

export const getTokensList = async (id) => {
  const response = await axios.get(`https://api.1inch.io/v5.0/${id}/tokens
  `)

  return response.data.tokens
}
