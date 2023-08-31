export default function Card({data, onCardClick}){
    if(data){
        return(
            <>
                <img 
                    className="transition duration-150 hover:scale-110"
                    src={data.image} 
                    alt={`${data.value} of ${data.suit}`} 
                    onClick={() => onCardClick(data)}
                />
            </>
        );
    }
}