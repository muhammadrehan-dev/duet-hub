import { useState, useMemo } from 'react'
import { BUS_POINTS, SCHEDULE_INFO } from '@/data/busPointsData'
import {
  Bus,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Search,
  ShieldAlert,
  Navigation,
  Users,
  CheckCircle2,
  Share2,
  Camera,
} from 'lucide-react'
import styles from './BusPointsPage.module.css'

export default function BusPointsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPointId, setSelectedPointId] = useState('ALL')
  const [copiedId, setCopiedId] = useState(null)

  const filteredPoints = useMemo(() => {
    return BUS_POINTS.filter((point) => {
      const matchesPointFilter =
        selectedPointId === 'ALL' || point.id === selectedPointId

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesPointFilter

      const matchesNo = point.pointNo.toLowerCase().includes(query)
      const matchesReg = point.regNo.toLowerCase().includes(query)
      const matchesDriver = point.drivers.some(
        (d) =>
          d.name.toLowerCase().includes(query) || d.phone.includes(query)
      )
      const matchesStops = point.stops.some((s) =>
        s.name.toLowerCase().includes(query)
      )

      return matchesPointFilter && (matchesNo || matchesReg || matchesDriver || matchesStops)
    })
  }, [searchQuery, selectedPointId])

  const handleShare = (pointNo, stops) => {
    const text = `DUET Point Route — ${pointNo}\nStops: ${stops
      .map((s) => s.name)
      .join(' → ')}\nCheck DUET Hub: ${window.location.href}`
    if (navigator.share) {
      navigator.share({ title: `DUET Transport ${pointNo}`, text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text)
      setCopiedId(pointNo)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <div className="page">
      {/* Hero Banner */}
      <div
        className={styles.heroBanner}
        style={{
          backgroundImage: `url("/points hero banner.png")`,
        }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>TRANSPORT SECTION — DUET KARACHI</p>
          <h1 className={styles.heroTitle}>BUS POINTS &amp; ROUTES</h1>
          <p className={styles.heroDescription}>
            Official transport routes, driver contact numbers, stop distances, and WhatsApp community groups (w.e.f {SCHEDULE_INFO.effectiveDate}).
          </p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className={styles.controlsSection}>
        <div className={styles.searchBarWrap}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by stop name (e.g. Sakhi Hassan, Landhi, Safora), driver, or point number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.pointTabs}>
          <button
            className={`${styles.tabBtn} ${selectedPointId === 'ALL' ? styles.activeTab : ''}`}
            onClick={() => setSelectedPointId('ALL')}
          >
            All Points ({BUS_POINTS.length})
          </button>
          {BUS_POINTS.map((pt) => (
            <button
              key={pt.id}
              className={`${styles.tabBtn} ${selectedPointId === pt.id ? styles.activeTab : ''}`}
              onClick={() => setSelectedPointId(pt.id)}
            >
              {pt.pointNo}
            </button>
          ))}
        </div>
      </div>

      {/* Points Container */}
      <div className={styles.pointsContainer}>
        {filteredPoints.length === 0 ? (
          <div className={styles.emptyState}>
            <Bus size={48} color="var(--text-muted)" />
            <h3 className={styles.emptyStateTitle}>No Bus Routes Found</h3>
            <p>No transport point or stop matched "{searchQuery}". Try searching for another location.</p>
          </div>
        ) : (
          filteredPoints.map((point) => {
            const queryLower = searchQuery.trim().toLowerCase()

            return (
              <div key={point.id} className={styles.pointCard} id={point.id}>
                {/* Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.headerMain}>
                    <div
                      className={styles.pointBadge}
                      style={{ backgroundColor: point.badgeColor }}
                    >
                      <Bus size={20} />
                      <span>{point.pointNo}</span>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h2 className={styles.headerTitle}>{point.pointNo}</h2>
                        <span className={styles.busRegPill}>
                          REG: {point.regNo}
                        </span>
                      </div>
                      <p className={styles.headerSub}>
                        <Navigation size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        Terminus: <strong>{point.endPoint}</strong>
                      </p>
                    </div>
                  </div>

                  <div className={styles.actionsGroup}>
                    {point.whatsappUrl ? (
                      <a
                        href={point.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.whatsappBtn}
                        title="Join WhatsApp Group for Live Updates"
                      >
                        <MessageCircle size={18} />
                        <span>Join WhatsApp Group</span>
                      </a>
                    ) : (
                      <span className={`${styles.whatsappBtn} ${styles.whatsappBtnDisabled}`}>
                        <MessageCircle size={18} />
                        <span>WhatsApp (Contact Driver)</span>
                      </span>
                    )}

                    <button
                      className={styles.tabBtn}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      onClick={() => handleShare(point.pointNo, point.stops)}
                    >
                      <Share2 size={15} />
                      <span>{copiedId === point.pointNo ? 'Copied!' : 'Share'}</span>
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className={styles.cardBody}>
                  {/* Drivers Section */}
                  <div className={styles.driverSection}>
                    <div className={styles.driverTitle}>
                      <Users size={14} />
                      <span>Route Driver Details</span>
                    </div>
                    <div className={styles.driversList}>
                      {point.drivers.map((driver, idx) => (
                        <div key={idx} className={styles.driverCard}>
                          <div className={styles.driverAvatar}>
                            {driver.name.charAt(0)}
                          </div>
                          <div>
                            <div className={styles.driverName}>{driver.name}</div>
                            <a
                              href={`tel:${driver.phone.replace(/[^0-9+]/g, '')}`}
                              className={styles.driverPhoneLink}
                            >
                              <Phone size={13} />
                              <span>{driver.phone}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stops Section */}
                  <div>
                    <div className={styles.routeHeader}>
                      <div className={styles.routeTitle}>
                        <MapPin size={16} color="var(--accent)" />
                        <span>Route Stops &amp; Distances from Campus</span>
                      </div>
                      <span className={styles.stopCount}>
                        {point.stops.length} Stops
                      </span>
                    </div>

                    <div className={styles.stopsGrid}>
                      {point.stops.map((stop, index) => {
                        const isMatch =
                          queryLower &&
                          stop.name.toLowerCase().includes(queryLower)
                        const isDestination =
                          stop.distance === 'Destination' ||
                          stop.distance === 'Campus'

                        return (
                          <div
                            key={index}
                            className={`${styles.stopItem} ${
                              isMatch ? styles.stopItemHighlighted : ''
                            }`}
                          >
                            <div className={styles.stopLeft}>
                              <span className={styles.stopIndex}>{index + 1}</span>
                              <span className={styles.stopName}>{stop.name}</span>
                            </div>
                            <div className={styles.stopRight}>
                              <span
                                className={`${styles.stopDistance} ${
                                  isDestination ? styles.stopDistanceDest : ''
                                }`}
                              >
                                {stop.distance}
                              </span>
                              {stop.morningTime && (
                                <span className={styles.stopTimeBadge}>
                                  <Clock size={11} /> {stop.morningTime}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Official Transport Notice Box */}
      <div className={styles.noticeBox}>
        <ShieldAlert size={26} className={styles.noticeIcon} />
        <div>
          <h4 className={styles.noticeTitle}>Official Transport Guidelines</h4>
          <ul className={styles.noticeList}>
            <li>
              All students are strongly advised to contact their concerned route driver for exact morning pickup timings at specific stops.
            </li>
            <li>
              Points arrival time is <strong>08:30 AM</strong> at Main Campus and departure time is strictly <strong>05:00 PM</strong> from Main Campus.
            </li>
            <li>
              Schedule is issued by the <strong>Transport Section, DUET Karachi</strong> (effective 24-08-2026 &amp; onwards).
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
