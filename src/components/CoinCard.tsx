import { Coin } from "../entities/Coin"
import { Draggable } from "react-beautiful-dnd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const grid = 8;

interface CoinCardProps {
    item: Coin;
    index: number;
}
  
const CoinCard = ({ item, index }: CoinCardProps) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => {
            return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                userSelect: "none",
                padding: grid * 0.25,
                margin: `0 0 ${grid}px 0`,
                ...provided.draggableProps.style,
                }}
            >
                <Card 
                    variant="outlined" raised={snapshot.isDragging}
                    sx={{
                        background: snapshot.isDragging ? "#FF7F50" : "white",
                    }}
                >
                    <CardContent>
                        <div>
                            <div
                                style={{
                                display: "flex",
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                }}
                            >
                                <img alt={item.name} src={item.icon} style={{ height: 24, width: 24 }} />
                                <p style={{ paddingLeft: 16 }}>{item.name}</p>
                            </div>
                            <p>{item.symbol}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            );
        }}
        </Draggable>
    );
};

export default CoinCard;
