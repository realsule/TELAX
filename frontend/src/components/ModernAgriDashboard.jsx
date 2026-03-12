import { ListingCard } from './ListingCard'
import { KnowledgeVault } from './KnowledgeVault'
import './ModernAgriDashboard.css'

const communityHighlights = [
  {
    id: 1,
    title: 'Soweto West Layers Collective',
    description: 'Veteran poultry keepers mentoring Form 3 students on coop hygiene and feed planning.',
    location: 'Soweto West',
  },
  {
    id: 2,
    title: 'Silanga Green Strip',
    description: 'Kales and spinach bed rotations designed with science club students.',
    location: 'Silanga',
  },
  {
    id: 3,
    title: 'Lindi Tilapia Circle',
    description: 'Urban aquaculture demos for primary school visits every Friday.',
    location: 'Lindi',
  },
]

const sampleListings = [
  {
    id: 1,
    title: 'Deep-yellow Kales (Sukuma Wiki)',
    category: 'Kales • Organic',
    price: 80,
    unit: 'bunch',
    farmerName: 'Mama Achieng',
    location: 'Soweto West',
  },
  {
    id: 2,
    title: 'Improved Kienyeji Layers',
    category: 'Poultry • Eggs',
    price: 400,
    unit: 'tray',
    farmerName: 'Baba Hassan',
    location: 'Silanga',
  },
]

export function ModernAgriDashboard() {
  return (
    <main className="agri-page">
      <section className="agri-hero">
        <div>
          <p className="agri-kicker">Teule Educational Leadership Agricultural Xperience</p>
          <h1 className="agri-title">Modern Agri Dashboard</h1>
          <p className="agri-subtitle">
            Connect Kibra&apos;s farmers, schools, and community to co-create trusted food, bold leadership, and
            project-based learning.
          </p>
        </div>
      </section>

      <section className="agri-section">
        <header className="agri-section__header">
          <h2>Community Hub</h2>
          <p>Glassmorphism cards for local circles where stories and farm wisdom flow.</p>
        </header>
        <div className="agri-community-grid">
          {communityHighlights.map((item) => (
            <article key={item.id} className="glass-card community-card">
              <div className="community-card__badge">{item.location}</div>
              <h3 className="community-card__title">{item.title}</h3>
              <p className="community-card__text">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="agri-section">
        <header className="agri-section__header">
          <h2>Kibra-Trusted Marketplace</h2>
          <p>Listings from verified poultry and kales farmers with Payment on Delivery by default.</p>
        </header>
        <div className="agri-market-grid">
          {sampleListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </section>

      <section className="agri-section">
        <header className="agri-section__header">
          <h2>Leadership Xperiences</h2>
          <p>See how students design, document, and ship farm projects back into their classrooms.</p>
        </header>
        <KnowledgeVault />
      </section>
    </main>
  )
}

