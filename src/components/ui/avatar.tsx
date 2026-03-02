import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, name, size = 'md', className = '' }: AvatarProps) {
  const sizeMap: Record<string, { size: number; fontSize: string }> = {
    sm: { size: 32, fontSize: '12px' },
    md: { size: 40, fontSize: '14px' },
    lg: { size: 48, fontSize: '16px' },
    xl: { size: 64, fontSize: '20px' },
  };

  const { size: avatarSize, fontSize } = sizeMap[size];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={className}
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <div
      className={`avatar avatar-${size} ${className}`}
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--airforce-blue), var(--airforce-light))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 600,
        fontSize,
      }}
      title={name}
    >
      {name ? getInitials(name) : '?'}
    </div>
  );
}

interface AvatarGroupProps {
  avatars: { src?: string; name?: string }[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarGroup({ avatars, max = 4, size = 'md' }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const sizeMap: Record<string, number> = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const avatarSize = sizeMap[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          style={{
            marginLeft: index > 0 ? '-8px' : 0,
            border: '2px solid white',
            borderRadius: '50%',
            zIndex: visibleAvatars.length - index,
          }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: '50%',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--fg-secondary)',
            marginLeft: '-8px',
            border: '2px solid white',
            zIndex: 0,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
