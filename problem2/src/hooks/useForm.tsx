import { useState, useMemo, type ChangeEvent, useEffect, type FormEvent } from 'react';
import type { ICurrency, FormValues } from '../types/types';
import getCurrency from '../services/currency.service';
import { delay } from '../ultils/delay';

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

    const validate = (name: string, value: string | number): string => {
        switch (name) {
            case 'amount':
                {
                    const num = Number(value);
                    if (Number.isNaN(num) || num <= 0) {
                        return 'Invalid amount';
                    }
                    break;
                }
            case 'from':
            case 'to':
                if (!value) {
                    return 'Currency is required';
                }
                break;
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
    const validateForm = (): boolean => {
        const amountError = validate('amount', values.amount);
        const fromError = validate('from', values.from);
        const toError = validate('to', values.to);

        setErrors({
            ...(amountError && { amount: amountError }),
            ...(fromError && { from: fromError }),
            ...(toError && { to: toError }),
        });

        return !amountError && !fromError && !toError;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        delay(1000).then(() => {
            alert(`You will receive ${swapResult} ${values.to}`);
            setIsLoading(false);
            setValues((prev) => ({ ...prev, amount: 0 }));
        });
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
            return Number(((amount * fromCurrency.price) / toCurrency.price).toFixed(2));
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