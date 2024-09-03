type Status = 'pending' | 'approved' | 'returned' | 'canceled' | 'expired' | 'overdue'

export type Reservation = {
    id: number
    book_id: string
    user_id: number
    from: string
    to: string
    status: Status
}
function getDate(plusDays: number = 0) {
    const today = new Date()
    today.setDate(today.getDate() + plusDays);

    const realMonth = 1 + today.getMonth();

    const completeZeroInLeftMonth = realMonth.toString().padStart(2, '0');
    const completeZeroInLeftDay = today.getDate().toString().padStart(2, '0');

    return  `${today.getFullYear()}-${completeZeroInLeftMonth}-${completeZeroInLeftDay}`;
}

export const emptyReservation: Reservation = {
    id: 0,
    book_id: '0',
    user_id: 0,
    from: getDate(1),
    to:  getDate(2),
    status: 'pending'
};

export const reservationsMock: Reservation[] = [
    {
        id: 1,
        book_id: '1',
        user_id: 201,
        from: '2024-09-01',
        to: '2024-09-10',
        status: 'approved'
    },
    {
        id: 2,
        book_id: '2',
        user_id: 202,
        from: '2024-09-05',
        to: '2024-09-15',
        status: 'pending'
    },
    {
        id: 3,
        book_id: '3',
        user_id: 203,
        from: '2024-09-10',
        to: '2024-09-20',
        status: 'canceled'
    }
];

