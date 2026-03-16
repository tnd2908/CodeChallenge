export interface ICurrency {
    currency: string;
    date: Date;
    price: number;
}

export interface FormValues {
    from: string;
    to: string;
    amount: number;
}