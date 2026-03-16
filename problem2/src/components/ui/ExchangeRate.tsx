import { useMemo } from "react";
import type { FormValues } from "../../types/types";

interface ExchangeRateProps {
    value: FormValues;
    swapResult: number;
    variant: 'from' | 'to';
}
const ExchangeRate = (props: ExchangeRateProps) => {
    const { value, swapResult, variant } = props;
    const exchangeRate = useMemo(() => {
        if (value.from && value.to && swapResult) {
            const from = swapResult / value.amount;
            const to = 1 / from;
            return {
                from: `~1 ${value.from} = ${Number(from.toFixed(2))} ${value.to}`,
                to: `~1 ${value.to} = ${Number(to.toFixed(2))} ${value.from}`
            };
        }
        return {
            from: '',
            to: ''
        };
    }, [swapResult, value.amount, value.from, value.to]);
    return (
        <div>
            {variant === 'from' && (
                <span className="block text-white text-sm font-semibold">{exchangeRate.from}</span>
            )}
            {variant === 'to' && (
                <span className="block text-white text-sm font-semibold">{exchangeRate.to}</span>
            )}
        </div>
    );
};

export default ExchangeRate;