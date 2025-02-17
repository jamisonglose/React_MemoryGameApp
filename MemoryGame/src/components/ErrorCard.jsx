import RegularButton from "./RegularButton";

export default function ErrorCard({handleClick}){
    return (
      <div className="wrapper wrapper--accent">
        <p className="p--large">Sorry, there was an error.</p>
        <p className="p--regular">Please come back later or click the button below to try restarting the game.</p>
        <RegularButton handleClick={handleClick}>Restart Game</RegularButton>
      </div>
    );
}