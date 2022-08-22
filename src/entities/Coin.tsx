export interface Coin {
    id: string;
    availableSupply: number;
    icon: string;
    marketCap: number;
    price: number;
    name: string;
    symbol: string;
}


interface TitleTextStyle {
    color: string
}

interface ChartHAxis {
    title: string; //"Days", 
    titleTextStyle: TitleTextStyle //{ color: "#333" }
}

interface ChartVAxis {
    minValue: number; // 0
}

interface ChartArea {
    width: string; // 50%
    height: string; // 70%
}

interface ChartOptions {
    title: string;
    hAxis: ChartHAxis,
    vAxis: ChartVAxis,
    chartArea: ChartArea,
}
export interface CoinChartData {
    coinId: string;
    id: string;
    options: ChartOptions
    series: Array<any>;
}
