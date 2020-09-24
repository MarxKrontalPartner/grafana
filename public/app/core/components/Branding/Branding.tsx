import React, { FC } from 'react';
import { css, cx } from 'emotion';
import { useTheme } from '@grafana/ui';

export interface BrandComponentProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

const LoginLogo: FC<BrandComponentProps> = ({ className }) => {
  return <img className={className} src="public/img/grafana_icon.svg" alt="expertControl" />;
};

const LoginBackground: FC<BrandComponentProps> = ({ className, children }) => {
  const theme = useTheme();
  const background = css`
    background: url(public/img/login_background_${theme.isDark ? 'dark' : 'light'}.svg);
    background-size: cover;
  `;

  return <div className={cx(background, className)}>{children}</div>;
};

const MenuLogo: FC<BrandComponentProps> = ({ className }) => {
  return <img className={className} src="public/img/grafana_icon.svg" alt="expertControl" />;
};

const LoginBoxBackground = () => {
  const theme = useTheme();
  return css`
    background: ${theme.isLight ? 'rgba(7, 64, 87, 0.6)' : 'rgba(0, 73, 114, 1)'};
    background-size: cover;
  `;
};

export class Branding {
  static LoginLogo = LoginLogo;
  static LoginBackground = LoginBackground;
  static MenuLogo = MenuLogo;
  static LoginBoxBackground = LoginBoxBackground;
  static AppTitle = 'expertControl';
  static LoginTitle = 'Welcome to expertControl';
  static GetLoginSubTitle = () => {
    const slogans = ['Keep in touch', 'Keep in touch with your data'];
    const count = slogans.length;
    return slogans[Math.floor(Math.random() * count)];
  };
}
