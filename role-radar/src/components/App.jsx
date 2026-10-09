import React from 'react'
import Cartao from './Cartao'
import Creditos from './Creditos'
import Loading from './Loading'
import MeuPonto from './MeuPonto'
import Busca from './Busca'
import ListaLugares from './ListaLugares'
import MapaRadar from './MapaRadar'
import geoapifyClient from '../utils/geoapifyClient'

class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null,
    buscando: false,
    erroBusca: null,
    raioBuscado: null
  }

  estiloSubtitulo = {
    color: '#546e7a',
    fontSize: '1.1rem',
    marginTop: '0.25rem'
  }

  obterAno = () => new Date().getFullYear()

  obterLocalizacao = () => {
    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        this.setState({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          horarioLocalizacao: Date.now(),
          mensagemDeErro: null
        })
      },
      (erro) => {
        console.log(erro)
        this.setState({
          mensagemDeErro:
            'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
        })
      }
    )
  }

  onBuscaRealizada = async (categoria, raio) => {
    this.setState({ buscando: true, erroBusca: null, raioBuscado: raio })
    const { latitude, longitude } = this.state
    try {
      const resultado = await geoapifyClient.get('/places', {
        params: {
          categories: categoria,
          filter: `circle:${longitude},${latitude},${raio}`,
          bias: `proximity:${longitude},${latitude}`,
          limit: 20
        }
      })
      this.setState({ lugares: resultado.data.features, buscando: false })
    } catch (erro) {
      console.log(erro)
      this.setState({
        buscando: false,
        erroBusca: 'Não foi possível consultar os lugares. Tente novamente.'
      })
    }
  }

  componentDidMount() {
    this.obterLocalizacao()
  }

  renderResultado = () => {
    const { buscando, erroBusca, lugares, raioBuscado, latitude, longitude } =
      this.state
    if (buscando) return <Loading mensagem="Procurando lugares..." />
    if (erroBusca) return <p>{erroBusca}</p>
    if (lugares === null) return null
    if (lugares.length === 0) {
      return <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
    }
    const resumo =
      lugares.length === 1
        ? `1 lugar encontrado em até ${raioBuscado} m`
        : `${lugares.length} lugares encontrados em até ${raioBuscado} m`
    return (
      <div>
        <p className="font-bold">{resumo}</p>
        <Cartao cabecalho="Radar">
          <MapaRadar
            latitude={latitude}
            longitude={longitude}
            lugares={lugares}
          />
        </Cartao>
        <ListaLugares lugares={lugares} />
      </div>
    )
  }

  render() {
    return (
      <div className="p-3">
        <div className="grid">
          <div className="col-12">
            <h1 className="titulo">
              <i
                className="pi pi-map-marker mr-2"
                style={{ fontSize: '2rem' }}
              ></i>
              RolêRadar
            </h1>
            <p style={this.estiloSubtitulo}>
              Descubra o que existe perto de você
            </p>
            <Creditos />
          </div>
          {this.state.mensagemDeErro ? (
            <div className="col-12">
              <p>{this.state.mensagemDeErro}</p>
            </div>
          ) : this.state.latitude === null ? (
            <div className="col-12">
              <Loading mensagem="Aguardando permissão de localização..." />
            </div>
          ) : (
            <>
              <div className="col-12 md:col-6">
                <Cartao cabecalho="Você está aqui">
                  <MeuPonto
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    horarioLocalizacao={this.state.horarioLocalizacao}
                    onAtualizar={this.obterLocalizacao}
                  />
                </Cartao>
                <Cartao cabecalho="O que você procura?">
                  <Busca onBuscaRealizada={this.onBuscaRealizada} />
                </Cartao>
              </div>
              <div className="col-12 md:col-6">{this.renderResultado()}</div>
            </>
          )}
          <div className="col-12">
            <footer>RolêRadar © {this.obterAno()}</footer>
          </div>
        </div>
      </div>
    )
  }
}

export default App
