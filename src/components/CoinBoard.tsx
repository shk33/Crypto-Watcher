import { Coin } from "../entities/Coin"
import { Droppable } from "react-beautiful-dnd";
import CoinCard from "components/CoinCard";

const grid = 8;

interface CoinBoardProps {
    droppableId: string;
    coins: Coin[];
    name: string;
}
  
const CoinBoard = ({ droppableId, coins, name }: CoinBoardProps) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                    background: snapshot.isDraggingOver ? "aquamarine" : "white",
                    padding: grid,
                    width: 250,
                }}
                >
                <p style={{ padding: grid }}>{ name }</p>
                {coins.map((item, index) => {
                    return <CoinCard key={item.id} item={item} index={index} />;
                })}
                {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default CoinBoard;
