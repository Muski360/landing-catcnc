import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Icon } from './Icon.jsx'
import { useSmoothScroll } from './useSmoothScroll.js'
import './styles.css'

const media = `${import.meta.env.BASE_URL}media/`

const contact = {
  whatsapp: 'https://wa.me/message/F5DWUBCL43I5B1',
  email: 'contato@catcnc.com.br',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Giovana+Pontello+Pinese%2C+249%2C+Americana%2C+SP',
}

const navigation = [
  ['Serviços', '#servicos'],
  ['Na oficina', '#oficina'],
  ['A CAT CNC', '#empresa'],
]

const manufacturers = [
  ['FANUC', 'fanuc', 90],
  ['Siemens', 'siemens', 64],
  ['Yaskawa', 'yaskawa', 74],
  ['Fagor', 'fagor', 126],
  ['Romi', 'romi', 127],
]

const services = [
  {
    title: 'Assistência técnica',
    description: 'Manutenção preventiva e corretiva de máquinas CNC, com intervenção em sistemas mecânicos e elétricos.',
    details: 'Spindles, pré-carga de fusos, caixas de engrenagens e torres automáticas.',
    image: 'assistencia.webp',
    alt: 'Técnico da CAT CNC trabalhando no painel elétrico de uma máquina',
    caption: 'Intervenção em painel elétrico',
  },
  {
    title: 'Laboratório eletrônico',
    description: 'Diagnóstico e reparo em laboratório próprio de placas CNC, drives, inversores, servoamplificadores, fontes e módulos.',
    details: 'Atendimento a equipamentos Fanuc, Siemens, Yaskawa, Fagor e outras marcas.',
    image: 'laboratorio.webp',
    alt: 'Mãos de um técnico soldando uma placa eletrônica na bancada',
    caption: 'Reparo em placa eletrônica',
  },
  {
    title: 'Reforma de máquinas',
    description: 'Recuperação de máquinas CNC com revisão mecânica, elétrica e eletrônica.',
    details: 'Restauração de estruturas, guias e fusos, revisão de sistemas e pintura.',
    image: 'reforma.webp',
    alt: 'Profissional com equipamento de proteção pintando uma peça industrial',
    caption: 'Pintura de componente industrial',
  },
]

const gallery = [
  {
    image: 'bancada.webp',
    alt: 'Técnico usando instrumentos de medição em um equipamento eletrônico na bancada da CAT CNC',
    title: 'Diagnóstico em bancada',
    text: 'Medições e testes em componentes eletrônicos industriais.',
  },
  {
    image: 'enrolamento.webp',
    alt: 'Mão de um técnico junto à carcaça azul e ao enrolamento de cobre de um motor',
    title: 'Motores em manutenção',
    text: 'Inspeção de um motor com acesso ao enrolamento de cobre.',
  },
  {
    image: 'bancada-equipe.webp',
    alt: 'Técnico operando o painel de controle de uma máquina CNC',
    title: 'Testes no comando CNC',
    text: 'Intervenção no painel de comando de uma máquina CNC.',
  },
  {
    image: 'circuitos.webp',
    alt: 'Placa eletrônica manuseada com luva preta sob luz verde',
    title: 'Componentes eletrônicos',
    text: 'Placa de circuito impresso em bancada.',
  },
]

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Grupo CAT CNC, início">
      <img src={`${media}simbolo.webp`} alt="" width="42" height="42" />
      <span className="brand-name" aria-hidden="true"><small>Grupo</small>CAT<span>CNC</span></span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)

  function onKeyDown(event) {
    if (event.key === 'Escape' && open) {
      setOpen(false)
      menuButton.current?.focus()
    }
  }

  return (
    <header className="header" onKeyDown={onKeyDown}>
      <div className="header-inner wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([label, target]) => <a key={target} href={target}>{label}</a>)}
        </nav>
        <a className="button button-outline header-cta" href="#contato">Contato</a>
        <button
          className="menu-toggle"
          type="button"
          ref={menuButton}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Fechar' : 'Menu'} <span className="menu-icon" aria-hidden="true" />
        </button>
        <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação principal" hidden={!open}>
          {[...navigation, ['Contato', '#contato']].map(([label, target]) => (
            <a key={target} href={target} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function WhatsAppLink({ className, label, children }) {
  return (
    <a className={`button ${className}`} href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label={label}>
      <Icon name="whatsapp" /> {children}
    </a>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-stage">
        <div className="hero-copy">
          <p className="eyebrow hero-location"><Icon name="pin" /> Americana, SP</p>
          <h1 id="hero-title">
            <span className="hero-line"><span>Manutenção</span></span>{' '}
            <span className="hero-line"><span>industrial <em>CNC.</em></span></span>
          </h1>
          <p className="hero-intro">Assistência técnica, reforma de máquinas e reparo de drives, placas e servomotores.</p>
          <div className="hero-actions">
            <WhatsAppLink className="button-accent" label="Pedir orçamento pelo WhatsApp">Pedir orçamento</WhatsAppLink>
            <a className="hero-services" href="#servicos"><Icon name="arrowDown" /> Ver serviços</a>
          </div>
        </div>
        <figure className="hero-media">
          <div className="hero-image">
            <img
              src={`${media}hero-stator.webp`}
              srcSet={`${media}hero-stator-small.webp 700w, ${media}hero-stator.webp 1280w`}
              sizes="(max-width: 760px) 90vw, (max-width: 1660px) 60vw, 1000px"
              alt="Limpeza de um estator azul, com o enrolamento de cobre exposto"
              width="1280"
              height="1706"
              fetchPriority="high"
            />
          </div>
          <figcaption className="hero-caption"><span>Limpeza de estator</span><span>Oficina CAT CNC</span></figcaption>
        </figure>
      </div>
    </section>
  )
}

function ManufacturerBand() {
  return (
    <div className="manufacturer-band">
      <p id="manufacturer-title" className="eyebrow">Marcas atendidas</p>
      <div className="brand-reel">
        <div className="brand-track">
          {[false, true].map(duplicate => (
            <ul key={String(duplicate)} className="brand-group" aria-hidden={duplicate || undefined} aria-labelledby={duplicate ? undefined : 'manufacturer-title'}>
              {manufacturers.map(([name, slug, height]) => (
                <li key={slug}>
                  <img src={`${media}marcas/${slug}.webp`} alt={duplicate ? '' : name} width="380" height={height} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="servicos" className="services section-light" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-heading services-heading" data-reveal>
          <div>
            <p className="eyebrow">Serviços</p>
            <h2 id="services-title">Da placa à máquina.</h2>
          </div>
          <p>Três especialidades para cuidar do equipamento no chão de fábrica e na bancada.</p>
        </div>
        <div className="services-layout">
          <div className="service-list">
            {services.map((service, index) => {
              const expanded = active === index
              return (
                <div className="service" key={service.title}>
                  <h3>
                    <button
                      type="button"
                      id={`service-button-${index}`}
                      aria-expanded={expanded}
                      aria-controls={`service-panel-${index}`}
                      onClick={() => setActive(expanded ? null : index)}
                    >
                      <span>{service.title}</span>
                      <span className="service-mark" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="service-panel" id={`service-panel-${index}`} hidden={!expanded}>
                    <p>{service.description}</p>
                    <p className="service-details">{service.details}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <figure className="service-figure" aria-label="Registro do serviço selecionado">
            <div className="service-window">
              {services.map((service, index) => (
                <img
                  key={service.image}
                  src={`${media}${service.image}`}
                  alt={service.alt}
                  aria-hidden={(active ?? 0) !== index}
                  className={(active ?? 0) === index ? 'is-selected' : ''}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <figcaption>{services[active ?? 0].caption}</figcaption>
          </figure>
        </div>
        <ManufacturerBand />
      </div>
    </section>
  )
}

function Workshop() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const frame = useRef(null)
  const rotationLabel = isPlaying ? 'Pausar apresentação de fotos' : 'Retomar apresentação de fotos'
  const autoAdvance = isPlaying && isVisible && !isHovered && !reducedMotion

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onPreferenceChange = event => setReducedMotion(event.matches)
    preference.addEventListener?.('change', onPreferenceChange)

    const observer = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(([entry]) => setIsVisible(entry.intersectionRatio >= 0.35), { threshold: 0.35 })
      : null
    observer?.observe(frame.current)

    return () => {
      preference.removeEventListener?.('change', onPreferenceChange)
      observer?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!autoAdvance) return

    let timer
    function syncTimer() {
      window.clearInterval(timer)
      if (!document.hidden) {
        timer = window.setInterval(() => setCurrent(index => (index + 1) % gallery.length), 5000)
      }
    }

    syncTimer()
    document.addEventListener('visibilitychange', syncTimer)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', syncTimer)
    }
  }, [autoAdvance])

  function advance(step) {
    setIsPlaying(false)
    setCurrent(index => (index + step + gallery.length) % gallery.length)
  }

  return (
    <section className="workshop" id="oficina" aria-labelledby="workshop-title">
      <div className="wrap workshop-inner">
        <div className="workshop-copy" data-reveal>
          <p className="eyebrow">Na oficina</p>
          <h2 id="workshop-title">O trabalho,<br /> de perto.</h2>
          <p>O dia a dia da CAT CNC, dos testes de bancada à intervenção na máquina.</p>
        </div>
        <figure
          className="workshop-gallery"
          onPointerEnter={event => { if (event.pointerType === 'mouse') setIsHovered(true) }}
          onPointerLeave={() => setIsHovered(false)}
          onFocus={event => { if (event.target.matches(':focus-visible')) setIsPlaying(false) }}
        >
          <div className="gallery-frame" id="workshop-slides" ref={frame}>
            {gallery.map((photo, index) => (
              <img
                key={photo.image}
                src={`${media}${photo.image}`}
                alt={photo.alt}
                className={current === index ? 'is-selected' : ''}
                aria-hidden={current !== index}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <figcaption className="gallery-caption">
            <div className="gallery-status" aria-live={isPlaying && !reducedMotion ? 'off' : 'polite'} aria-atomic="true">
              <span className="gallery-count">
                0{current + 1}<span> / 0{gallery.length}</span>
              </span>
              <div className="gallery-description">
                {gallery.map(({ title, text }, index) => (
                  <div key={title} aria-hidden={current !== index}><strong>{title}</strong><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="gallery-controls" role="group" aria-label="Controles da galeria">
              {!reducedMotion && (
                <button className="gallery-playback" type="button" aria-label={rotationLabel} title={rotationLabel} aria-controls="workshop-slides" onClick={() => {
                  setIsHovered(false)
                  setIsPlaying(value => !value)
                }}>
                  <Icon name={isPlaying ? 'pause' : 'play'} />
                </button>
              )}
              <button type="button" aria-label="Foto anterior" aria-controls="workshop-slides" onClick={() => advance(-1)}>
                <Icon name="arrowLeft" />
              </button>
              <button type="button" aria-label="Próxima foto" aria-controls="workshop-slides" onClick={() => advance(1)}>
                <Icon name="arrowRight" />
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

function Company() {
  return (
    <section className="company section-light" id="empresa" aria-labelledby="company-title">
      <div className="wrap company-layout">
        <figure className="company-figure">
          <div className="company-photo"><img src={`${media}sede.webp`} alt="Vista da sede e dos veículos da CAT CNC" width="1084" height="579" loading="lazy" decoding="async" /></div>
          <figcaption>Sede da CAT CNC em Americana, SP</figcaption>
        </figure>
        <div className="company-copy" data-reveal>
          <p className="eyebrow">A CAT CNC</p>
          <h2 id="company-title"><span>Estrutura própria.</span>{' '}<span>Equipe técnica.</span></h2>
          <p>O Grupo CAT CNC atua em manutenção industrial com equipe treinada, laboratório próprio, sede em Americana e frota para atendimento em campo.</p>
          <p>Da assistência na fábrica ao reparo na bancada, os serviços contam com garantia.</p>
          <a className="text-link" href="https://www.youtube.com/watch?v=Rm-EKdwxZ54" target="_blank" rel="noreferrer">Ver vídeo institucional</a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="wrap contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">Contato</p>
          <h2 id="contact-title">Vamos falar da<br className="contact-break" /> sua máquina?</h2>
          <p>Envie a marca, o modelo e uma descrição da falha para iniciar o atendimento.</p>
          <WhatsAppLink className="button-dark">Pedir orçamento pelo WhatsApp</WhatsAppLink>
        </div>
        <address className="contact-details">
          <div>
            <p className="eyebrow">Atendimento</p>
            <a href="tel:+551934626537"><Icon name="phone" /> (19) 3462-6537</a>
            <a href="tel:+5519992435655"><Icon name="phone" /> (19) 99243-5655</a>
            <a href={`mailto:${contact.email}`}><Icon name="mail" /> {contact.email}</a>
          </div>
          <div>
            <p className="eyebrow">Visite a CAT CNC</p>
            <a href={contact.maps} target="_blank" rel="noreferrer"><Icon name="pin" /><span>Rua Giovana Pontello Pinese, 249<br /> Jardim Terramerica · Americana, SP<br /> CEP 13468-834</span></a>
          </div>
          <div>
            <p className="eyebrow">Horário</p>
            <p className="contact-hours"><Icon name="clock" /><span>Segunda a quinta, 7h30 às 17h30<br /> Sexta, 7h30 às 16h30</span></p>
          </div>
        </address>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Brand />
        <nav aria-label="Links externos">
          <a href="https://lista.mercadolivre.com.br/_CustId_479881253" target="_blank" rel="noreferrer">Loja de peças</a>
          <a href="https://catcnc.com.br/manuais" target="_blank" rel="noreferrer">Manuais</a>
          <a href="https://www.instagram.com/grupocatcnc" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/cat-cnc-328351197/" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <a className="text-link" href="#inicio">Voltar ao topo</a>
      </div>
    </footer>
  )
}

function App() {
  useSmoothScroll()

  useEffect(() => {
    if (typeof window.IntersectionObserver !== 'function') return

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.18 })

    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div id="inicio">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Services />
        <Workshop />
        <Company />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
