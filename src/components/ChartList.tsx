import { Chart } from "react-google-charts";
import { CoinChartData } from "../entities/Coin"

interface ChartListProps {
  coinChartsData: CoinChartData[];
}

export default function ChartList( { coinChartsData } :ChartListProps ){
  
  return (
    <div>
      {coinChartsData.map((item) => {                
        return ( 
          <div key={item.id}>  
            <div>Name: {item.id}</div>
            <Chart
                chartType="AreaChart"
                options={item.options}
                data={item.series}
                width="600px"
                height="450px"
                legendToggle
            />
          </div>);
        })
      }
    </div>
  );
}
