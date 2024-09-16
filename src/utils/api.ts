const Api = () => {
  const BASE_URL = 'https://rave.onrender.com'
  const BASE_URL_PAYMENT = 'https://partybank-payment-service-46298192f2dc.herokuapp.com'

  const SUBSCRIBE = `${BASE_URL_PAYMENT}/api/v1/subscribe`
  const PAY = `${BASE_URL_PAYMENT}/api/v1/payment`
  const SEARCH_TICKET = `${BASE_URL_PAYMENT}/api/v1/search`
  const VALIDATE_TICKET = `${BASE_URL_PAYMENT}/api/v1/validate`
  const GET_PURCHASED_TICKETS = `${BASE_URL_PAYMENT}/api/v1/tickets`
  const RESERVE_TICKET = `${BASE_URL_PAYMENT}/api/v1/reserve`
  
  const AUTH = `${BASE_URL}/auth/login/attendee`
  const GOOGLE_AUTH = `${BASE_URL}/auth/google/login`
  const DISCOVER_EVENTS = `${BASE_URL}/api/v1/event/discover`
  const GET_EVENT_BY_REFERENCE = `${BASE_URL}/api/v1/event/reference`

  return {
    SUBSCRIBE,
    PAY, SEARCH_TICKET, VALIDATE_TICKET,
    GET_PURCHASED_TICKETS,
    DISCOVER_EVENTS,
    GET_EVENT_BY_REFERENCE,
    AUTH, GOOGLE_AUTH,
    RESERVE_TICKET
  }
}

export default Api
