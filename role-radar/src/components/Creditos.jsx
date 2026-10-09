const Creditos = () => {
  const estiloCreditos = {
    fontSize: '0.85rem'
  }

  return (
    <div className="flex gap-3 mb-3" style={estiloCreditos}>
      <a href="https://www.geoapify.com/" target="_blank" >
        Powered by Geoapify
      </a>
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        
      >
        © OpenStreetMap contributors
      </a>
    </div>
  )
}

export default Creditos
