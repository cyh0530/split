import { useState, useRef, useEffect, useCallback } from "react";
import { evaluate } from "mathjs";
import ReactGA from "react-ga";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

ReactGA.initialize("G-7RV8JZXMCF");
ReactGA.pageview(window.location.pathname + window.location.search);

function Manual() {
    const tipsInDollarRef = useRef<HTMLInputElement>(null);
    const tipsInPercentageRef = useRef<HTMLInputElement>(null);
    const totalWithTipsRef = useRef<HTMLInputElement>(null);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [tipsRate, setTipsRate] = useState(0);
    const [tips, setTips] = useState(0);
    const [fees, setFees] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [stuffPrice, setStuffPrice] = useState(0);
    const [isTipTotal, setIsTipTotal] = useState(false);
    const [totalWithTipsPrice, setTotalWithTipsPrice] = useState(0);

    const onStuffPriceChange = (e: any) => {
        const value = evaluate(e.target.value) || 0;
        setStuffPrice(value);
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

    const getTaxRate = () => {
        if (subtotal === 0) {
            return 0;
        }
        return (tax / subtotal) * 100;
    };

    const getTotalWithTax = useCallback(() => {
        return subtotal + tax;
    }, [subtotal, tax]);

    const getTotalWithDiscount = useCallback(() => {
        return getTotalWithTax() + fees - discount;
    }, [getTotalWithTax, fees, discount]);

    const getTotalWithTips = () => {
        return getTotalWithDiscount() + tips;
    };

    const getUserPrice = () => {
        if (subtotal === 0) {
            return 0;
        }
        const stuffWithTaxTips =
            stuffPrice * (1 + (getTaxRate() + tipsRate) * 0.01);
        const userFee = (stuffPrice / subtotal) * fees;
        const userDiscount = (stuffPrice / subtotal) * discount;
        return stuffWithTaxTips + userFee - userDiscount;
    };

    const updateTips = useCallback((
        type: "dollar" | "percentage" | "total",
        amount: string
    ) => {
        const value = evaluate(amount) || 0;
        console.log("hi");
        if (value === 0) {
            setTips(0);
            setTipsRate(0);
            setIsTipTotal(false);
        } else if (type === "dollar") {
            setTips(value);
            setTipsRate((value / subtotal) * 100);
            clearTipsInPercentage();
            clearTotalWithTips();
            setIsTipTotal(false);
        } else if (type === "percentage") {
            setTips(subtotal * value * 0.01);
            setTipsRate(value);
            clearTipsInDollar();
            clearTotalWithTips();
            setIsTipTotal(false);
        } else {
            // total
            const tempTips = value - getTotalWithDiscount();
            setTips(tempTips);
            setTipsRate((tempTips / subtotal) * 100);
            clearTipsInDollar();
            clearTipsInPercentage();
            setIsTipTotal(true);
            setTotalWithTipsPrice(value);
        }
    }, [subtotal, getTotalWithDiscount]);

    useEffect(() => {
        if (isTipTotal) {
            updateTips("total", totalWithTipsPrice.toString());
        }
    }, [
        subtotal,
        tax,
        fees,
        discount,
        isTipTotal,
        totalWithTipsPrice,
        updateTips,
    ]);

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
                    onChange={(e) => {
                        setSubtotal(evaluate(e.target.value) || 0);
                    }}
                />
                <TextField
                    label="Tax"
                    id="tax"
                    required
                    onChange={(e) => {
                        setTax(evaluate(e.target.value) || 0);
                    }}
                />
            </Box>
            <Typography>Subtotal = ${subtotal.toFixed(2) || ""}</Typography>
            <Typography>
                Tax = ${tax.toFixed(2) || ""} ({getTaxRate().toFixed(2)}%)
            </Typography>
            <Typography>
                Total with Tax = ${(subtotal + tax).toFixed(2) || ""}
            </Typography>
            <Divider sx={{ margin: "10px 0" }} />
            <Typography variant="h6">
                Step 2: Other Fees / Discounts (Optional)
            </Typography>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Fees"
                    id="fees"
                    inputRef={tipsInDollarRef}
                    onChange={(e) => {
                        setFees(evaluate(e.target.value) || 0);
                    }}
                />
                <TextField
                    label="Discounts"
                    id="discount"
                    inputRef={tipsInDollarRef}
                    onChange={(e) => {
                        setDiscount(evaluate(e.target.value) || 0);
                    }}
                />
                <Typography color="gray" sx={{fontSize: "0.75rem"}}>Note: You can type expression</Typography>
            </Box>
            <Typography>Fees = {fees.toFixed(2)}</Typography>
            <Typography>Discounts = {discount.toFixed(2)}</Typography>
            <Typography>
                Total + Fees - Discounts <br /> = {getTotalWithTax().toFixed(2)} +{" "}
                {fees.toFixed(2)} - {discount.toFixed(2)} ={" "}
                {getTotalWithDiscount().toFixed(2)}
            </Typography>
            <Divider sx={{ margin: "10px 0" }} />
            <Typography variant="h6">
                Step 3: Pick One to Fill In for Tips
            </Typography>
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
                Total = {getTotalWithDiscount().toFixed(2)} + {tips.toFixed(2)}{" "}
                = {getTotalWithTips().toFixed(2)}{" "}
            </Typography>
            <Divider sx={{ margin: "10px 0" }} />
            <Typography variant="h6">Step 4: Price For You</Typography>
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
                    required
                />
                <Typography color="gray" sx={{fontSize: "0.75rem"}}>Note: You can type expression</Typography>
                <Typography>
                    Your price = {stuffPrice.toFixed(2).padStart(6)} <br />
                    {fees && subtotal ? (
                        <>
                            &emsp;&emsp;&nbsp;Fees ={" "}
                            {(fees * (stuffPrice / subtotal)).toFixed(2).padStart(6)}
                            <br />
                        </>
                    ) : null}
                    {discount && subtotal ? (
                        <>
                            &nbsp;Discount = -
                            {(discount * (stuffPrice / subtotal)).toFixed(2)}
                            <br />
                        </>
                    ) : null}
                    &emsp;&emsp;&ensp;Tax ={" "}
                    {(stuffPrice * (0.01 * getTaxRate())).toFixed(2)}
                    <br />
                    &emsp;&emsp;&nbsp;Tips ={" "}
                    {(stuffPrice * (0.01 * tipsRate)).toFixed(2)}
                    <br />
                    &emsp;&emsp;Total =
                </Typography>
                <Typography variant="h5" align="center">
                    ${getUserPrice().toFixed(2)}
                </Typography>
                <div style={{height: "20px"}}></div>
            </Box>
        </div>
    );
}

export default Manual;
