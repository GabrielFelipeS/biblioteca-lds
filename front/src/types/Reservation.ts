type Status = 'pending' | 'approved' | 'returned' | 'canceled' | 'expired' | 'overdue'

export type Reservation = {
    id: number
    book_id: number
    user_id: number
    from: Date
    to: Date
    status: Status
}

const emptyReservation: Reservation = {
    id: 0,
    book_id: 0,
    user_id: 0,
    from: new Date(),
    to: new Date(),
    status: 'pending'
};

export const reservationsMock: Reservation[] = [
    {
        id: 1,
        book_id: 1,
        user_id: 201,
        from: new Date('2024-09-01'),
        to: new Date('2024-09-10'),
        status: 'approved'
    },
    {
        id: 2,
        book_id: 2,
        user_id: 202,
        from: new Date('2024-09-05'),
        to: new Date('2024-09-15'),
        status: 'pending'
    },
    {
        id: 3,
        book_id: 3,
        user_id: 203,
        from: new Date('2024-09-10'),
        to: new Date('2024-09-20'),
        status: 'canceled'
    }
];

