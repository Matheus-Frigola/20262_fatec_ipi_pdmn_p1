import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

const categorias = [
  { rotulo: 'Cafés', chave: 'catering.cafe' },
  { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
  { rotulo: 'Parques', chave: 'leisure.park' },
  { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
  { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
  { rotulo: 'Museus', chave: 'entertainment.museum' }
]

class Busca extends React.Component {
  static defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
  }

  state = {
    categoria: null,
    raio: '1000',
    erro: null
  }

 

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="flex flex-wrap gap-2 mb-3">
          {categorias.map((c) => (
            <Button
              key={c.chave}
              type="button"
              className={this.state.categoria === c.chave ?  'btn-selecionado' : null}
              onClick={() => this.setState({ categoria: c.chave })}
            >
              {c.rotulo}
            </Button>
          ))}
        </div>
        <div className="mb-3">
          <InputText
            className="w-full"
            placeholder={this.props.dica}
            value={this.state.raio}
            onChange={(e) => this.setState({ raio: e.target.value })}
          />
        </div>
        <Button type="submit">
          <i className="pi pi-search mr-2"></i>
          Buscar
        </Button>
        {this.state.erro && (
          <p style={{ color: 'red' }}>{this.state.erro}</p>
        )}
      </form>
    )
  }
}

export default Busca
