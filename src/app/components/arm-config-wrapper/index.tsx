'use client'

import React from 'react'
import ApiResourceManager from 'arm-js-library'

interface ARMConfigWrapperProps {
  children: React.ReactNode
}

const collections: string[] = ['shops']

export const ARM = new ApiResourceManager(collections)

ARM.setGlobal()

const ARMConfigWrapper = ({ children }: ARMConfigWrapperProps) => {
  return <>{children}</>
}

export default ARMConfigWrapper
