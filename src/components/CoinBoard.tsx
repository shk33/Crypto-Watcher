import { Coin } from "../entities/Coin"
import { Droppable } from "react-beautiful-dnd";
import CoinCard from "components/CoinCard";

const grid = 8;

interface CoinBoardProps {
    droppableId: string;
    coins: Coin[];
}
  
const CoinBoard = ({ droppableId, coins }: CoinBoardProps) => {
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
                <p style={{ padding: grid }}>Possible Coins</p>
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
