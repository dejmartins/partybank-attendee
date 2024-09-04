export type Event = {
    eventImage: string
    series_logo: string
    event_name: string
    venue: string
    date: string
    time: string
    ticketTypes: Array<Ticket>
    map_url: string
    map_embedded_url: string
    eventThemes: string
    about: string
    event_reference: string
    status: string
    location: any
    id: number
    created_by: string
}

export type Ticket = {
    name: string
    price: number
}

export type UserInfo = {
    emailAddress: string
    phoneNumber: string
    location: string
    emailValidated: boolean
    termsAndConditionsAccepted: boolean
}

export type TicketDetail = {
    ticket_type: string
    validated_count: number
    sold_count: number
    colour: string
}