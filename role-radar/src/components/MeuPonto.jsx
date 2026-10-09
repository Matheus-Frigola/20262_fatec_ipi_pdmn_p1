import React from 'react'
import { Button } from 'primereact/button'
import { GEOAPIFY_KEY } from '../utils/chaves'

class MeuPonto extends React.Component {
  state = {
    agora: Date.now()
  }

  timer = null

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ agora: Date.now() })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    console.log('MeuPonto removido')
  }

  render() {
    const { latitude, longitude, horarioLocalizacao, onAtualizar } = this.props
    const url = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${longitude},${latitude}&zoom=16&marker=lonlat:${longitude},${latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`
    const segundos = Math.max(
      0,
      Math.floor((this.state.agora - horarioLocalizacao) / 1000)
    )

    return (
      <div>
        <img
          src={url}
          alt="Mapa da sua localização"
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <p>
          Latitude: {latitude.toFixed(4)} | Longitude: {longitude.toFixed(4)}
        </p>
        <p>{latitude < 0 ? 'Hemisfério Sul' : 'Hemisfério Norte'}</p>
        <p>Localização obtida há {segundos} s</p>
        <Button type="button" onClick={onAtualizar}>
          <i className="pi pi-refresh mr-2"></i>
          Atualizar localização
        </Button>
      </div>
    )
  }
}

export default MeuPonto
