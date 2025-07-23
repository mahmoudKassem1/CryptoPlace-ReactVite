import { createContext, useState, useEffect } from "react";

const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({ name: "USD", symbol: "$" });

    const fetchAllCoin = async () => {
        const vsCurrency = currency.name.toLowerCase(); 

        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=100&page=1`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-KheDjJaknLLY5AXgvED9vf2W' 
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setAllCoin(res);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]); 

    const contextValue = {
        allCoin,
        currency,
        setCurrency,
        fetchAllCoin
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export { CoinContext };
export default CoinContextProvider;
