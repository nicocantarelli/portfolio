import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Nico Cantarelli - Frontend Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#fdfdfc',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            marginBottom: 40,
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect
              x="4"
              y="4"
              width="24"
              height="24"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              fill="none"
            />
            <line
              x1="4"
              y1="4"
              x2="28"
              y2="28"
              stroke="#1a1a1a"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#1a1a1a',
            marginBottom: 16,
          }}
        >
          Nico Cantarelli
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(26, 26, 26, 0.6)',
            marginBottom: 40,
          }}
        >
          Frontend Developer
        </div>

        {/* Skills */}
        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          {['Shopify', 'WordPress', 'React', 'Next.js'].map((skill) => (
            <div
              key={skill}
              style={{
                padding: '12px 24px',
                background: 'rgba(26, 26, 26, 0.05)',
                borderRadius: 8,
                fontSize: 20,
                color: 'rgba(26, 26, 26, 0.8)',
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
