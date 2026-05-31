"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export function MeshBackground() {
  return (
    <>
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#FF5B14", "#FFBA08", "#1a0500", "#E8185C"]}
        speed={0.3}
        backgroundColor="#000000"
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-35"
        colors={["#000000", "#ffffff", "#FF5B14", "#FFBA08"]}
        speed={0.2}
        wireframe="true"
        backgroundColor="transparent"
      />
    </>
  )
}
