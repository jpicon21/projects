import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import PlayerCard from "../components/PlayerCard/PlayerCard";


const CardPage = () => {
  const [playerData, setPlayers] = useState([]);
  const [teamData, setTeams] = useState([]);
  const [cardData, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try{
      const resPlayer = await fetch('/api/players');
      const resTeams = await fetch('/api/teams');

      if(!resPlayer.ok || !resTeams.ok){
        throw new Error('Failed to Load');
      }

      const playerRes = await resPlayer.json();
      const teamRes = await resTeams.json();

      setPlayers(playerRes);
      setTeams(teamRes);

      const cardArray = playerData.map(x => ({
        ...teamData.find((item) => (item.ta === x.ta)),
        ...x   
      }));

      setCard(cardArray);
    }
    catch(error){
      setError(error.message)
    }
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [cardData]);

  return(
    <>
      {!isLoading ? <Loading/> : 
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((data) => {
            return(
              <PlayerCard props={data} key={`nba-card-${data.pid}`} />
            )
          })}
        </div>
      }
    </>
  );
}

export default CardPage
