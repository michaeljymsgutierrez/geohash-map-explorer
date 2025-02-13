'use client'

import './styles.scss'
import Link from 'next/link'
import { Divider, List } from 'antd'

const HomePage = () => {
  const data = [
    {
      title: 'Monitoring',
      href: '/dashboard/monitoring?active-nav-button=attendance',
    },
    {
      title: 'Geohash Markers',
      href: '/dashboard/geohash-markers?string=wdw4f5qzb7q3',
    },
    {
      title: 'Geohash Explorer',
      href: '/dashboard/geohash-explorer',
    },
    {
      title: 'Nutrition Facts',
      href: '/dashboard/nutrition-facts',
    },
  ]

  return (
    <div className="home-page">
      <div className="demo-list">
        <Divider orientation="center">Demo</Divider>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Link href={item.href}>{item.title}</Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default HomePage
