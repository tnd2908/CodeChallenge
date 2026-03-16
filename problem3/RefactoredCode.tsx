import { useWalletBalances } from "./hooks/useWalletBalances";
import { usePrices } from "./hooks/usePrices";
import { useMemo } from "react";
import { getPriority } from "./ultils/priority";
import { classes } from "./styles";
import { WalletRow } from "./components/WalletRow";

interface WalletBalance {
    currency: string;
    blockchain: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
    usdValue: number;
}
// This function should be written in other file (ultils/priority.ts)
const getPriority = (blockchain: string): number => {
    switch (blockchain) {
        case 'Osmosis':
            return 100
        case 'Ethereum':
            return 50
        case 'Arbitrum':
            return 30
        case 'Zilliqa':
            return 20
        case 'Neo':
            return 20
        default:
            return -99
    }
}

const WalletPage: React.FC<BoxProps> = (props: Props) => {
    const { ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const filteredAndSortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            return balancePriority > -99 && balance.amount > 0;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
              } else if (rightPriority > leftPriority) {
                return 1;
            } else {
                return 0;
            }
        }).map((balance: WalletBalance): FormattedWalletBalance => {
            return {
                ...balance,
                formatted: balance.amount.toFixed(),
                usdValue: prices[balance.currency] * balance.amount
            }
        });
    }, [balances]);

    const rows = useMemo(() => {
        return filteredAndSortedBalances.map((balance: FormattedWalletBalance) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow 
                  className={classes.row}
                  key={`${balance.blockchain}-${balance.currency}`} 
                  amount={balance.amount}
                  usdValue={usdValue}
                  formattedAmount={balance.formatted}
                />
              
            )
        });
      }, [formattedBalances]);

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}

export default WalletPage;