import React from 'react'

import './HébergementTemporaire.css'

class HébergementTemporaire extends React.Component {
  render () {
    return (
      <div className="HébergementTemporaire">
        <h1 className="HébergementTemporaire-title">La résidence Autonomie de l'Ourme propose un service d'hébergement temporaire de 6 places ou vous pouvez être accueilli pour une durée limitée</h1>
        <p className="HébergementTemporaire-description">
        L'hébergement temporaire est proposé en cas d'absence des proches, de sortie d'hospitalisation, de travaux dans votre logement ou plus simplement pour passer des vacances dans une environnement différent. Il peut aussi vous permettre de vérifier si la vie en communauté vous convient ou non avant de s'y installer définitivement.
        <br/>
        Même accueilli en hébergement temporaire vous pouvez continuer votre vie sociale. Les services à votre disposition sont les même que ceux de la résidence.
        <br/>
        Il faut parfois réserver longtemps à l'avance mais la formule de l'accueil temporaire n'est pas à négligé. Elle offre en effet à la personne un temps de répit</p>
      </div>
    )
  }
}

const styles = {

}

export default HébergementTemporaire;
