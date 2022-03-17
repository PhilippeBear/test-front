import style from './VehicleCard.module.scss'

// Fix: aucune raison d'avoir un let sur VehicleCard, on doit avoir une constante et ça doit rester immuable
// Fix: ajout d'un early return
// Fix: destructuration des props pour plus de lisibilité, on aurait même pu destructuré encore d'un niveau mais ça reste ok.
export const VehicleCard = ({ vehicle }) => (
  <div className={style.container}>
    <div>
      #{vehicle.id} - {vehicle.make_and_model} ({vehicle.color})
    </div>
    {/* Fix: Optimisation du nombre de ligne ici */}
    <div>{`${vehicle.doors} door${vehicle.doors > 1 ? 's' : ''}`}</div>
    <div>{vehicle.mileage} miles</div>
  </div>
)
