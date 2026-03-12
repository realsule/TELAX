import './KnowledgeVault.css'

const experiences = [
  {
    id: 1,
    title: 'Silanga Form 2: Raising 40 Layers in 12 m²',
    student: 'Science Club • Silanga',
    image:
      'https://images.pexels.com/photos/4588453/pexels-photo-4588453.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Makina: Drip Irrigation for Sukuma Wiki',
    student: 'Agri-Tech Squad • Makina',
    image:
      'https://images.pexels.com/photos/6168123/pexels-photo-6168123.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Lindi: Tilapia Tank Build With Recycled Drums',
    student: 'Blue Circle • Lindi',
    image:
      'https://images.pexels.com/photos/5531540/pexels-photo-5531540.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Soweto West: Compost Lab for Poultry Manure',
    student: 'Eco Leaders • Soweto West',
    image:
      'https://images.pexels.com/photos/6690133/pexels-photo-6690133.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

export function KnowledgeVault() {
  return (
    <div className="vault-grid">
      {experiences.map((exp) => (
        <article key={exp.id} className="vault-card">
          <div className="vault-card__image-wrap">
            <img src={exp.image} alt={exp.title} className="vault-card__image" loading="lazy" />
          </div>
          <div className="vault-card__body">
            <h3 className="vault-card__title">{exp.title}</h3>
            <p className="vault-card__meta">{exp.student}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

