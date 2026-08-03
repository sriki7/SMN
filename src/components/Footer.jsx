import { company } from '../data/content.js'
import logoWhite from '../assets/logo-mark-white.png'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact">
      <div className="fwrap">
        <div>
          <a className="brand" href="#top">
            <img src={logoWhite} alt="" />
            <div>
              <b>
                SMN <span>PHOENIX</span>
              </b>
              <small>TALENT SOURCING LLP</small>
            </div>
          </a>
          <p>
            Emerging, full-spectrum HR solutions company headquartered in Kalaburagi, Karnataka — serving clients across
            India. LLP No: {company.llp} · GST: {company.gst}
          </p>
        </div>
        <div>
          <h4>Offices</h4>
          <ul>
            <li>Head Office — {company.offices.hq}</li>
            <li>Operations — {company.offices.ops}</li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              {company.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 && ' · '}
                  <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                </span>
              ))}
            </li>
            <li>
              <a href={`https://${company.website.replace('www.', '')}`}>{company.website}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="fbot">
        <span>
          © {year} {company.name}. All rights reserved.
        </span>
        <span>{company.tagline}</span>
      </div>
    </footer>
  )
}
