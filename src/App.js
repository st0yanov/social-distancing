import './App.css';
import TransmissionSketch from './simulations/sketches/TransmissionSketch';
import ImmunitySketch from './simulations/sketches/ImmunitySketch';
import MortalitySketch from './simulations/sketches/MortalitySketch';
import NoRestrictionsSketch from './simulations/sketches/NoRestrictionsSketch';
import StayHomeSketch from './simulations/sketches/StayHomeSketch';

function App() {
  return (
    <div className="App">
      <h1>Симулации за социално дистанциране</h1>

      <blockquote>
        Симулациите на тази страница са вдъхновени от статията:<br></br>
        <a href="https://www.washingtonpost.com/graphics/2020/world/corona-simulator/" target="_blank" rel="noreferrer">Why outbreaks like coronavirus spread exponentially, and how to "flatten the curve"</a>.
      </blockquote>

      <h2>Демо {'--->'} <a href="https://coronavirus-bulgaria.org/социално-дистанциране/" target="_blank" rel="noreferrer">https://coronavirus-bulgaria.org/социално-дистанциране/</a></h2>

      <h2>Заразяване</h2>
      <TransmissionSketch />

      <h2>Имунитет</h2>
      <ImmunitySketch />

      <h2>Леталитет</h2>
      <MortalitySketch />

      <h2>Без мерки</h2>
      <NoRestrictionsSketch />

      <h2>Умерено социално дистанциране (50% контактуваща популация)</h2>
      <StayHomeSketch stayHomePercentage={0.5} />

      <h2>Локдаун (20% контактуваща популация)</h2>
      <StayHomeSketch stayHomePercentage={0.8} />
    </div>
  );
}

export default App;
