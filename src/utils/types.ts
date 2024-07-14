export type Event = {
    eventImage: string
    createdBy: string
    eventName: string
    venue: string
    eventDate: string
    timeFrame: string
    ticketTypes: Array<Ticket>
    mapUrl: string
    mapEmbeddedUrl: string
    eventThemes: string
    about: string
    eventReference: string
    status: string
    city: string
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
}