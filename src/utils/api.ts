const Api = () => {
  const BASE_URL = 'https://partybank-29cd4a45490f.herokuapp.com'
  const GET_ALL_EVENTS = `${BASE_URL}/api/v1/events`
  const SUBSCRIBE = `${BASE_URL}/api/v1/subscribe`
  const GET_EVENT = `${BASE_URL}/api/v1/events`
  const PAY = `${BASE_URL}/api/v1/payment`

  return {
    GET_ALL_EVENTS,
    SUBSCRIBE,
    GET_EVENT,
    PAY
  }
}

export default Api
