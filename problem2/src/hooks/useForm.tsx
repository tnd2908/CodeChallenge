import { useState, useMemo, type ChangeEvent, useEffect, type FormEvent } from 'react';
import type { ICurrency, FormValues } from '../types/types';
import getCurrency from '../services/currency.service';

interface UseFormReturn {
    values: FormValues;
    errors: Partial<Record<keyof FormValues, string>>;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    swapResult: number;
    handleReverse: () => void;
    currenciesData: ICurrency[];
    isLoading: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const useForm = (initialValues: FormValues): UseFormReturn => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
    const [currenciesData, setCurrenciesData] = useState<ICurrency[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const validate = (name: string, value: string): string => {
        if (name === 'amount') {
            if (!value) return 'Amount is required';
            const num = Number(value);
            if (Number.isNaN(num) || num <= 0) return 'Invalid amount';
        }
        return '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));

        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleReverse = () => {
        setValues(prev => ({
            ...prev,
            from: prev.to,
            to: prev.from
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const amountError = validate('amount', values.amount);
        const hasErrors = amountError || !values.from || !values.to;
        if (amountError) {
            setErrors(prev => ({ ...prev, amount: amountError }));
        }
        if (hasErrors) {
            return;
        }

        const fromCurrency = currenciesData?.find(c => c.currency === values.from);
        const toCurrency = currenciesData?.find(c => c.currency === values.to);
        const amount = Number(values.amount);
        const result = fromCurrency && toCurrency && amount > 0
            ? (amount * fromCurrency.price) / toCurrency.price
            : 0;
        console.log(result);
    };

    useEffect(() => {
        const fetchCurrenciesData = async () => {
            try {
                setIsLoading(true);
                const data = await getCurrency();
                setCurrenciesData(data);
            } catch (error) {
                console.error("Failed to fetch currencies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrenciesData();
    }, [])

    const swapResult = useMemo(() => {
        const fromCurrency = currenciesData?.find(c => c.currency === values.from);
        const toCurrency = currenciesData?.find(c => c.currency === values.to);
        const amount = Number(values.amount);

        if (fromCurrency && toCurrency && amount > 0) {
            return (amount * fromCurrency.price) / toCurrency.price;
        }
        return 0;
    }, [values, currenciesData]);

    return {
        values,
        errors,
        handleChange,
        swapResult,
        handleReverse,
        currenciesData,
        isLoading,
        handleSubmit,
    };
};

export default useForm;