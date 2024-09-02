import React, { Fragment } from 'react'

type Props = {
  expr: any | (() => boolean)
  children: React.ReactNode
}

export function When({ expr, children }: Props) {
  if (typeof expr === 'function' && !expr()) return <Fragment />
  if (!expr) return <Fragment />

  return children
}