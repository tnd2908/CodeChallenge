## ISSUE 1 - Unneeded interface Props

- The Props interface extends BoxProps without adding any new properties.
- Suggestion: Remove it and use BoxProps

---

## ISSUE 2 - Use of "any" Type

- The blockchain parameter in getPriority is typed as any -> This cause TypeScript's type safety.
- **Fix**: 
  const getPriority = (blockchain: string): number => {}
- **Suggestion**:
    - This function should be written in other file (ultils/priority.ts)
    - Use constant string and number for blockchain name (Ex: blockchain.ZILLIQUA or blockchain.NEO)
---

## ISSUE 3 - Undefined Variables

- The variable "lhsPriority" is undefined.
- **Fix**: Remove it

---

## ISSUE 4 - Interface "WalletBalance" is missing field

- Missing field "blockchain" for interface "WalletBalance"
- Suggestion: Add field "blockchain" (string) or new type "Blockchain"

---

## ISSUE 5 - Wrong Filter Logic

- **Current Code**:
```typescript
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) {
      if (balance.amount <= 0) {
          return true;
       }
  }
  return false
```
  
- **Problem**: This code is filtering out balances less than 0.
- **Fix**: 
  - Replace "lhsPriority" by "balancePriority"
  - Change `balance.amount <= 0` to `balance.amount > 0`

```typescript
const filteredBalances = balances.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  return balancePriority > -99 && balance.amount > 0;
});
```

---

## ISSUE 6 - Incorrect Dependency Array in `useMemo`

- The prices dependency is included in `useMemo` but not used inside the function
- FIX: Remove it

---

## ISSUE 7 - Poor naming and unused variable

1. `formattedBalances` is declared but its value is never read

- **Fix**: Remove it

1. Function `sortedBalances` is currently sort and filter (naming)

- **Suggestion**: 
  - Rename it to "filteredAndSortedBalances"
  - Execute "format balances" logic here (if needed)
- **Fix**:

```typescript
    const formattedBalances = useMemo(() => {
    return balances
        .filter((balance: WalletBalance) => {
            const priority = getPriority(balance.blockchain);
            return priority > -99 && balance.amount > 0;
        })
        .sort((lhs, rhs) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            return rightPriority - leftPriority;
        })
        .map((balance: WalletBalance): FormattedWalletBalance => {
            return {
                ...balance,
                formatted: balance.amount.toFixed(),
            };
        });
}, [balances, prices]);
```

---


## ISSUE 8 - Rows rendering
- Problems:
1) Conflicting types `WalletBalance` vs `FormattedWalletBalance` 
2) Unnecessary Rows Re-computations
Fix: Use `useMomo` for memoization of rows mapping
3) Using `index` as `key`
This breaks React's Reconciliation and force React to re-render and update all DOM nodes instead of simply reordering them. Also causing the wrong data to appear in the wrong row after sorting/filtering

- Code:
```typescript
const rows = useMemo(() => {
  return formattedBalances.map((balance: FormattedWalletBalance) => (
    <WalletRow 
      className={classes.row}
      key={`${balance.blockchain}-${balance.currency}`} 
      amount={balance.amount}
      usdValue={balance.usdValue}
      formattedAmount={balance.formatted}
    />
  ));
}, [formattedBalances]);
```

---


## ISSUE 9 - Missing export WalletPage
Fix: Add this
```typescript
export default WalletPage;
```
