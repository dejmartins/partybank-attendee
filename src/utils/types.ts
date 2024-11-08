export type Event = {
    image_url: string
    series_logo: string | undefined
    event_name: string
    venue: string
    date: string
    time: string
    tickets: Array<Ticket>
    map_url: string
    map_embedded_url: string
    eventThemes: string
    description: string
    event_reference: string
    status: string
    location: any
    id: number
    created_by: string
}

export type Ticket = {
    name: string
    price: number
    ticket_type: string
    purchase_limit: number
    ticket_reference: string
    colour: string
    is_ticket_sale_done: boolean
    ticket_perks: string[]
    ticket_sale_end_date: string
    ticket_sales_end_time: string
    ticket_sale_start_date: string
    ticket_sale_start_time: string
    type: string
    category: string
    group_ticket_capacity: number
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


// "tickets": [
//       {
//         "ticket_type": "paid",
//         "name": "early bird",
//         "stock": "unlimited",
//         "price": 7000,
//         "purchase_limit": 5,
//         "discount_type": "string",
//         "discount_code": "string",
//         "ticket_reference": "",
//         "colour": "",
//         "is_ticket_sale_done": false,
//         "ticket_sale_end_date": "24-11-11",
//         "ticket_sales_end_time": "6:00"
//       }
//     ],
//     "publication_state": "PUBLISHED"