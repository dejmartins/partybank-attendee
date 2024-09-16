const Api = () => {
  const BASE_URL = 'https://rave.onrender.com'
  const BASE_URL_PAYMENT = 'https://partybank-29cd4a45490f.herokuapp.com'

  const SUBSCRIBE = `${BASE_URL_PAYMENT}/api/v1/subscribe`
  const PAY = `${BASE_URL_PAYMENT}/api/v1/payment`
  const SEARCH_TICKET = `${BASE_URL_PAYMENT}/api/v1/search`
  const VALIDATE_TICKET = `${BASE_URL_PAYMENT}/api/v1/validate`
  const GET_PURCHASED_TICKETS = `${BASE_URL_PAYMENT}/api/v1/tickets`
  
  const AUTH = `${BASE_URL}/auth/login/attendee`
  const DISCOVER_EVENTS = `${BASE_URL}/api/v1/event/discover`
  const GET_EVENT_BY_REFERENCE = `${BASE_URL}/api/v1/event/reference`

  return {
    SUBSCRIBE,
    PAY, SEARCH_TICKET, VALIDATE_TICKET,
    GET_PURCHASED_TICKETS,
    DISCOVER_EVENTS,
    GET_EVENT_BY_REFERENCE,
    AUTH
  }
}

export default Api
