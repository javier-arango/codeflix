'use client'

import styles from '@styles/Tabs.module.scss'
import React, { useState } from 'react'

type Props = {
  children: JSX.Element[]
  labels: string[]
}

export default function Tabs({ children, labels }: Props) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div id={styles.tab}>
      <div id={styles.tabHeader}>
        <ul id={styles.tabOptions}>
          {React.Children.map(children, (child, index: number) => (
            <li
              className={`${styles.tabOption} ${
                index === activeTab && styles.active
              }`}
              onClick={() => handleTabClick(index)}
            >
              {labels[index]}
            </li>
          ))}
        </ul>
      </div>
      <div>{children[activeTab]}</div>
    </div>
  )
}