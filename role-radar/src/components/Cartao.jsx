const Cartao = ({ cabecalho, children }) => {
  return (
    <div className="border-1 border-round-xl surface-border surface-card p-3 mb-3 shadow-1">
      <div className="text-sm text-color-secondary mb-2">{cabecalho}</div>
      <hr className="border-none border-top-1 surface-border my-2" />
      <div>{children}</div>
    </div>
  )
}

export default Cartao
