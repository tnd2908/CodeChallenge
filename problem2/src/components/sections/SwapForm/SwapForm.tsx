import useForm from "../../../hooks/useForm";
import { Button, Combobox, ErrorMessages, Input, ExchangeRate } from "../../ui";

const SwapForm = () => {
    const { 
        currenciesData, 
        handleChange, 
        values, 
        handleReverse, 
        isLoading, 
        handleSubmit, 
        swapResult, 
        errors, 
    } = useForm({
        from: '',
        to: '',
        amount: 0,
    });

    return (
        <form onSubmit={handleSubmit} className="relative p-2 space-y-4 w-full rounded-lg shadow">
            <h1 className="text-2xl md:text-4xl uppercase pb-4 font-bold text-white text-center">Currency Converter</h1>
            <div className="relative grid md:grid-cols-2 gap-4">
                <div className="from-blue-400 space-y-4 md:pr-12 md:py-4 px-4 py-8 rounded-lg to-blue-500 bg-linear-to-r">
                    <Combobox placeholder="From Currency" label="From Currency" name="from" options={currenciesData} value={values.from} disabledOption={values.to} onChange={(value) => handleChange(value)} />
                    <span className="block text-white text-sm font-semibold">You Pay</span>
                    <Input value={values.amount} onChange={handleChange} className="bg-white" min={0} name="amount" type="number" placeholder="Amount" />
                    <ExchangeRate value={values} swapResult={swapResult} variant="from" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button type="button" onClick={handleReverse} className="bg-white cursor-pointer hover:rotate-180 transition-all duration-300 border-4 p-2 border-slate-900 size-14 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z"/></svg>
                    </button>
                </div>
                <div className="from-slate-700 space-y-4 md:pl-12 md:py-4 px-4 py-8 rounded-lg to-slate-800 bg-linear-to-r">
                    <Combobox placeholder="To Currency" label="To Currency" name="to" options={currenciesData} value={values.to} disabledOption={values.from} onChange={(value) => handleChange(value)} />
                    <span className="block text-white text-sm font-semibold">You Receive</span>
                    <Input disabled value={swapResult} className="bg-white" min={0} name="amount" type="number" placeholder="You Receive" />
                    <ExchangeRate value={values} swapResult={swapResult} variant="to" />
                </div>
            </div>
            <ErrorMessages errors={errors} />
            <Button type="submit" isLoading={isLoading}>Send Money Now</Button>
        </form>
    )
}

export default SwapForm