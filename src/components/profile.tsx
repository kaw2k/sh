import * as React from 'react'
import { Button } from './button'
import { Colors, getColor } from '../helpers/colors'

interface Props {
  text: string
  subtext?: string
  profileText?: string | number
  image?: string | null
  className?: string
  selected?: boolean
  color?: Colors
  onClick?: () => void
  disabled?: boolean
}

export const Profile: React.SFC<Props> = ({
  text,
  subtext,
  image,
  className = '',
  color = 'black' as Colors,
  profileText,
  selected,
  onClick,
  disabled,
}) => {
  const inner = (
    <div className={`profile ${className}`}>
      {profileText !== undefined ? (
        <div className="profile-placeholder">
          {profileText
            .toString()
            .trim()
            .slice(0, 2)}
        </div>
      ) : selected ? (
        <div className="profile-placeholder">&#10003;</div>
      ) : image ? (
        <img className="profile-img" src={image} />
      ) : (
        <div className="profile-placeholder">
          {text
            .trim()
            .split(' ')
            .map(word => word[0].toUpperCase())
            .join('')
            .slice(0, 2)}
        </div>
      )}
      <div className="body">
        <h3>{text}</h3>
        {subtext && <span>{subtext}</span>}
      </div>

      <style jsx>{`
        .profile {
          display: flex;
          align-items: center;
          color: ${getColor(color)};
        }

        img,
        .profile-placeholder {
          border-radius: 50%;
          height: 3rem;
          width: 3rem;
          object-fit: cover;
          line-height: 3rem;
          font-size: 1.25em;
          font-weight: 300;
          text-align: center;
          color: ${getColor(color)};
          border: 1px solid ${getColor(color)};
          flex: 0 0 auto;
        }

        span {
          display: block;
          opacity: 0.5;
          font-size: 0.75em;
          text-transform: initial;
        }

        .profile > * + * {
          margin-left: 0.5em;
        }

        h3,
        span {
          text-transform: lowercase;
        }

        h3::first-letter,
        span::first-letter {
          text-transform: uppercase;
        }

        .body {
          text-align: left;
        }
      `}</style>
    </div>
  )

  return onClick ? (
    <Button
      style={{ display: 'block', border: 'none' }}
      disabled={disabled}
      onClick={onClick}>
      {inner}
    </Button>
  ) : (
    inner
  )
}
