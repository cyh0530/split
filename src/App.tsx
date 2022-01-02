import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

function App() {
    const tipsInDollarRef = useRef<HTMLInputElement>(null);
    const tipsInPercentageRef = useRef<HTMLInputElement>(null);
    const totalWithTipsRef = useRef<HTMLInputElement>(null);
    const [tax, setTax] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [tipsRate, setTipsRate] = useState(0);
    const [tips, setTips] = useState(0);
    const [totalWithoutTax, setTotalWithoutTax] = useState(0);
    const [totalWithoutTips, setTotalWithoutTips] = useState(0);
    const [stuffPrice, setStuffPrice] = useState(0);
    const [userPrice, setUserPrice] = useState(0);

    const updateSubtotal = (e: any) => {
        const value = parseFloat(e.target.value) || 0;
        setTotalWithoutTax(value);
        setTotalWithoutTips(value + tax);
    };

    const updateTax = (e: any) => {
        const value = parseFloat(e.target.value) || 0;
        setTax(value);
        setTotalWithoutTips(totalWithoutTax + value);
        if (value !== 0) {
            setTaxRate((value / totalWithoutTax) * 100);
        } else {
            setTaxRate(0);
        }
    };

    const updateTips = (
        type: "dollar" | "percentage" | "total",
        amount: string
    ) => {
        const value = parseFloat(amount) || 0;
        if (value === 0) {
            setTips(0);
            setTipsRate(0);
        } else if (type === "dollar") {
            setTips(value);
            setTipsRate((value / totalWithoutTax) * 100);
            clearTipsInPercentage();
            clearTotalWithTips();
            updateUserPrice(stuffPrice);
        } else if (type === "percentage") {
            setTips(totalWithoutTax * value * 0.01);
            setTipsRate(value);
            clearTipsInDollar();
            clearTotalWithTips();
            updateUserPrice(stuffPrice);
        } else {
            // total
            const tempTips = value - totalWithoutTips;
            setTips(tempTips);
            setTipsRate((tempTips / totalWithoutTax) * 100);
            clearTipsInDollar();
            clearTipsInPercentage();
            updateUserPrice(stuffPrice);
        }
    };

    const onStuffPriceChange = (e: any) => {
        const value = parseFloat(e.target.value) || 0;
        setStuffPrice(value);
        updateUserPrice(value);
    };

    const updateUserPrice = (userPrice: number) => {
        setUserPrice(userPrice * (1 + (taxRate + tipsRate) * 0.01));
    };

    const clearTipsInDollar = () => {
        if (tipsInDollarRef.current) {
            tipsInDollarRef.current.value = "";
        }
    };

    const clearTipsInPercentage = () => {
        if (tipsInPercentageRef.current) {
            tipsInPercentageRef.current.value = "";
        }
    };

    const clearTotalWithTips = () => {
        if (totalWithTipsRef.current) {
            totalWithTipsRef.current.value = "";
        }
    };

    return (
        <div>
            <Typography variant="h5" align="center" sx={{ margin: "10px 0" }}>
                How Much Should I Pay
            </Typography>
            <Typography variant="h6">Step 1: Fill in the following</Typography>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Subtotal"
                    id="subtotal"
                    required
                    onChange={updateSubtotal}
                />
                <TextField label="Tax" id="tax" required onChange={updateTax} />
            </Box>
            <Typography>
                Subtotal = ${totalWithoutTax.toFixed(2) || ""}
            </Typography>
            <Typography>
                Tax = ${tax.toFixed(2) || ""} ({taxRate.toFixed(2)}%)
            </Typography>
            <Typography>
                Total Without Tips = ${(totalWithoutTax + tax).toFixed(2) || ""}
            </Typography>
            <Divider sx={{ margin: "10px 0" }} />
            <Typography variant="h6">Step 2: Pick one to fill in</Typography>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Tips in $"
                    id="tipsDollar"
                    inputRef={tipsInDollarRef}
                    onChange={(e) => {
                        updateTips("dollar", e.target.value);
                    }}
                />
                <TextField
                    label="Tips in %"
                    id="tipsPercentage"
                    inputRef={tipsInPercentageRef}
                    onChange={(e) => {
                        updateTips("percentage", e.target.value);
                    }}
                />
                <TextField
                    label="Total With Tips"
                    id="totalWithTips"
                    inputRef={totalWithTipsRef}
                    onChange={(e) => {
                        updateTips("total", e.target.value);
                    }}
                />
            </Box>
            <Typography>
                Tips = {tips.toFixed(2)} ({tipsRate.toFixed(2)}%)
            </Typography>
            <Typography>
                Total = {totalWithoutTips.toFixed(2)} + {tips.toFixed(2)} ={" "}
                {(totalWithoutTips + tips).toFixed(2)}{" "}
            </Typography>
            <Divider sx={{ margin: "10px 0" }} />
            <Typography variant="h6">Step 3: Price for you</Typography>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Your price"
                    id="stuffPrice"
                    onChange={onStuffPriceChange}
                />
                <Typography>
                    You should pay {stuffPrice.toFixed(2)} * (
                    {taxRate.toFixed(2)} + {tipsRate.toFixed(2)})% =
                </Typography>
                <Typography variant="h5" align="center">
                    ${userPrice.toFixed(2)}
                </Typography>
            </Box>
        </div>
    );
}

export default App;
