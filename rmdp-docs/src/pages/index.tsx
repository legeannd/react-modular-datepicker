import type { ReactNode } from 'react'
import { useState } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import * as DatePicker from '../../../src/main'
import type { SingleSelection } from '../../../src/main'
import '../../../src/styles/main.css'

import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const [selectedDate, setSelectedDate] = useState<SingleSelection>(null)

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className='container'>
        <Heading
          as='h1'
          className={styles.title}
        >
          {siteConfig.title}
        </Heading>
        <p className={styles.subtitle}>{siteConfig.tagline}</p>

        {/* Live Demo */}
        <div className={styles.demoContainer}>
          <DatePicker.Provider
            type='single'
            value={selectedDate}
            onSelectionChange={setSelectedDate}
          >
            <DatePicker.Header>
              <DatePicker.Button type='previous'>←</DatePicker.Button>
              <DatePicker.Label />
              <DatePicker.Button type='next'>→</DatePicker.Button>
            </DatePicker.Header>
            <DatePicker.Calendar />
          </DatePicker.Provider>
          {selectedDate && (
            <p className={styles.selectedDate}>
              Selected: {new Date(selectedDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className={styles.buttons}>
          <Link
            className='button button--primary button--lg'
            to='/docs/guide/what-is-rmdp'
          >
            Get Started →
          </Link>
          <Link
            className='button button--secondary button--lg'
            to='https://github.com/legeannd/react-modular-datepicker'
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  )
}

function Feature({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <Heading
          as='h2'
          className={styles.sectionTitle}
        >
          Why Choose React Modular DatePicker?
        </Heading>
        <div className={styles.featureGrid}>
          <Feature
            icon='🧩'
            title='Fully Composable'
            description='Build your datepicker with modular components. Mix and match to create exactly what you need.'
          />
          <Feature
            icon='🎨'
            title='Highly Customizable'
            description='Style with Tailwind, CSS Modules, or any CSS-in-JS solution. Full control over appearance.'
          />
          <Feature
            icon='🌍'
            title='i18n Support'
            description='Built-in internationalization with Day.js. Support for multiple languages and date formats.'
          />
          <Feature
            icon='♿'
            title='Accessible'
            description='WCAG compliant with keyboard navigation, ARIA labels, and screen reader support.'
          />
          <Feature
            icon='📦'
            title='Lightweight'
            description='Small bundle size with tree-shaking support. Only import what you use.'
          />
          <Feature
            icon='🌙'
            title='Dark Mode Ready'
            description='Built-in dark mode support that works seamlessly with your theme system.'
          />
        </div>
      </div>
    </section>
  )
}

function CodeExample() {
  return (
    <section className={styles.codeSection}>
      <div className='container'>
        <Heading
          as='h2'
          className={styles.sectionTitle}
        >
          Simple to Use
        </Heading>
        <div className={styles.codeExample}>
          <pre>
            <code>{`import * as DatePicker from '@legeannd/react-modular-datepicker'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DatePicker.Provider
      type='single'
      value={date}
      onSelectionChange={setDate}
    >
      <DatePicker.Header>
        <DatePicker.Button type='previous'>←</DatePicker.Button>
        <DatePicker.Label />
        <DatePicker.Button type='next'>→</DatePicker.Button>
      </DatePicker.Header>
      <DatePicker.Calendar />
    </DatePicker.Provider>
  )
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title}`}
      description='A modern, composable datepicker library for React applications'
    >
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <CodeExample />
      </main>
    </Layout>
  )
}
