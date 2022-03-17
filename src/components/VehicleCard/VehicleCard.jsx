import style from './VehicleCard.module.scss'

export const VehicleCard = ({ vehicle }) => (
  <div className={style.container}>
    <div>
      #{vehicle.id} - {vehicle.make_and_model} ({vehicle.color})
    </div>
    <div>{`${vehicle.doors} door${vehicle.doors > 1 ? 's' : ''}`}</div>
    <div>{vehicle.mileage} miles</div>
  </div>
)
