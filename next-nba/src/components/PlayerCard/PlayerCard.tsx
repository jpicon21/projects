import { url } from "inspector";
import { PlayerCardProps } from "./PlayerCard.types";

export default function PlayerCard({props}: PlayerCardProps) {
  return(
    <div className="card mx-5 my-5 rounded-[2px]">
      <div className="card-upper relative flex flex-row columns-3 bg-no-repeat bg-left" style={{borderBottom: `8px solid ${props.color}`, backgroundImage: `linear-gradient(white,white), url(${props.logo})`, }}>
        <img className="relative w-2/5 ml-1" src={props.headshot} />
        <div className="relative w-1/3 flex flex-col flex-wrap flex-start mt-5 ml-2 content-center">
          <div className=" flex-row text-lg md:text-sm lg:text-xs num-pos">
            <span>#{props.num} | {props.pos}</span>
          </div>
          <div className="text-2xl md:text-base lg:text-sm">
            <p className="font-bold align-text-left">{props.fn}</p>
            <p className="font-bold">{props.ln}</p>
          </div>
        </div>
        <img className="absolute top-0 right-0 h-10 mr-1" src={props.logo} />
      </div>
      <div className="flex flex-row columns-3 divide-x-2 leading-5 z-10">
        <div className="w-1/3 align-baseline text-center py-1 text-2xl md:text-base lg:text-sm">
          <p className="font-semi-bold">PPG</p>
          <p className="font-bold">{props.pts}</p>
        </div>
        <div className="w-1/3 align-baseline text-center py-1 text-2xl md:text-base lg:text-sm">
          <p className="font-semi-bold">RPG</p>
          <p className="font-bold">{props.reb}</p>
        </div>
        <div className="w-1/3 align-baseline text-center py-1 text-2xl md:text-base lg:text-sm">
          <p className="font-semi-bold">APG</p>
          <p className="font-bold">{props.ast}</p>
        </div>
      </div>
    </div>
  );
}

