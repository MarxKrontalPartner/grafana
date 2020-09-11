import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';

export const cardStyle = stylesFactory((theme: GrafanaTheme, complete: boolean) => {
  // Bartsch: changed to MKP color
  const completeGradient = 'linear-gradient(to right, #12a5e2 0%, #004972 100%)';
  const darkThemeGradients = complete ? completeGradient : 'linear-gradient(to right, #004972 0%, #42c0eb 100%)';
  const lightThemeGradients = complete ? completeGradient : 'linear-gradient(to right, #42c0eb 0%, #004972 100%)';

  const borderGradient = theme.isDark ? darkThemeGradients : lightThemeGradients;

  return `
      background-color: ${theme.colors.bg1};
      margin-right: ${theme.spacing.xl};
      border: 1px solid ${theme.colors.border1};
      border-bottom-left-radius: ${theme.border.radius.md};
      border-bottom-right-radius: ${theme.border.radius.md};
      position: relative;
      max-height: 230px;

      @media only screen and (max-width: ${theme.breakpoints.xxl}) {
        margin-right: ${theme.spacing.md};
      }
      &::before {
        display: block;
        content: ' ';
        position: absolute;
        left: 0;
        right: 0;
        height: 2px;
        top: 0;
        background-image: ${borderGradient};
      }
`;
});

export const iconStyle = stylesFactory(
  (theme: GrafanaTheme, complete: boolean) => css`
    color: ${complete ? theme.palette.blue95 : theme.colors.textWeak};

    @media only screen and (max-width: ${theme.breakpoints.sm}) {
      display: none;
    }
  `
);

export const cardContent = css`
  padding: 24px 16px;
`;
