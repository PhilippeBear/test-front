import { Vehicles } from './domains/Vehicles'

// Fix: ici, j'ai préféré rester constant sur l'utilisation des arrow functions que je trouve meilleur.
// J'ai aussi fait un early return qui est plus propre
// J'ai aussi changé l'extension en jsx vu qu'on retourne du jsx
// J'ai aussi changé la manière d'export, je trouve ça plus logique et plus lisible en générale.
// Et pour finir, la div sert pas a grand chose au final ici dont dans le contexte on pourrait retirer
// (en vrai ça dérange pas et il faudrait une div si on avait plus de layout etc par exemple donc c'est pas déconnant).
export const App = () => (
  <div className="App">
    <Vehicles />
  </div>
)
