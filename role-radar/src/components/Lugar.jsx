import Cartao from './Cartao'

export const formatarDistancia = (distancia) => {
  if (distancia < 1000) {
    return `a ${Math.round(distancia)} m`
  }
  return `a ${(distancia / 1000).toFixed(1).replace('.', ',')} km`
}

const Lugar = ({ numero, nome, endereco, distancia }) => {
  const estiloNumero = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    backgroundColor: '#1565c0',
    color: 'white',
    fontWeight: 'bold',
    flexShrink: 0
  }

  return (
    <Cartao cabecalho={formatarDistancia(distancia)}>
      <div className="flex align-items-center gap-3">
        <div style={estiloNumero}>{numero}</div>
        <div>
          <div className="font-bold">{ nome ? nome : 'Sem nome'}</div>
          <div>{endereco}</div>
        </div>
      </div>
    </Cartao>
  )
}

export default Lugar
