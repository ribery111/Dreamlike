"use client"

import type React from "react"

export function AnimatedBlobs() {
  const blobStyle = {
    "--border-radius": "115% 140% 145% 110% / 125% 140% 110% 125%",
    "--border-width": "5vmin",
    aspectRatio: "1",
    display: "block",
    gridArea: "stack",
    backgroundSize: "calc(100% + var(--border-width) * 2)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: "var(--border-width) solid transparent",
    borderRadius: "var(--border-radius)",
    maskImage: "linear-gradient(transparent, transparent), linear-gradient(black, white)",
    maskClip: "padding-box, border-box",
    maskComposite: "intersect",
    mixBlendMode: "screen" as const,
    height: "80vmin",
    filter: "blur(1vmin)",
  } as React.CSSProperties

  const blobs = [
    {
      backgroundColor: "#FF5B14",
      backgroundImage: "linear-gradient(#FF5B14, #FFBA08, #FF5B14)",
      transform: "rotate(30deg) scale(1.03)",
    },
    {
      backgroundColor: "#FFBA08",
      backgroundImage: "linear-gradient(#FFBA08, #FF5B14, #FFBA08)",
      transform: "rotate(60deg) scale(0.95)",
    },
    {
      backgroundColor: "#E8185C",
      backgroundImage: "linear-gradient(#E8185C, #FF5B14, #E8185C)",
      transform: "rotate(90deg) scale(0.97)",
    },
    {
      backgroundColor: "#FF5B14",
      backgroundImage: "linear-gradient(#FF5B14, #E8185C, #FF5B14)",
      transform: "rotate(120deg) scale(1.02)",
    },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes blobs-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <span className="absolute pointer-events-none z-10 text-center text-9xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Blobs
      </span>
      <div className="grid" style={{ gridTemplateAreas: "'stack'" }}>
        <div
          className="grid relative"
          style={{
            gridTemplateAreas: "'stack'",
            gridArea: "stack",
            animation: "blobs-spin 5s linear infinite",
          }}
        >
          {blobs.map((blob, index) => (
            <span key={index} style={{ ...blobStyle, ...blob }} />
          ))}
        </div>
      </div>
    </div>
  )
}
