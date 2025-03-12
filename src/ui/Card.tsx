import { css, SerializedStyles } from "@emotion/react"
import { white } from "@/styles/colors"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  cssStyle?: SerializedStyles
}

const cardStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  background: white,
  border: "1px solid rgba(118, 62, 255, 0.15)",
  paddingTop: "1.5rem",
  paddingBottom: "1.5rem",
})

const CardHeaderStyle = css({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  gap: "0.375rem",
})

const CardTitleStyle = css({
  fontWeight: "600",
  lineHeight: 1,
  fontSize: "1rem",
  letterSpacing: "-0.05em",
})

const CardDescriptionStyle = css({
  fontSize: "14px",
  color: "rgba(0, 0, 56, 0.4)",
})

const CardContentStyle = css({
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
})

const CardFooterStyle = css({
  display: "flex",
  alignItems: "center",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
})

const Card: React.FC<CardProps> = ({ cssStyle, ...props }) => (
  <div css={[cardStyle, cssStyle]} {...props} />
)

const CardHeader: React.FC<CardProps> = ({ cssStyle, ...props }) => (
  <div css={[CardHeaderStyle, cssStyle]} {...props} />
)

const CardTitle: React.FC<CardProps> = ({ cssStyle, ...props }) => (
  <div css={[CardTitleStyle, cssStyle]} {...props} />
)

const CardDescription: React.FC<CardProps> = ({ cssStyle, ...props }) => (
  <div css={[CardDescriptionStyle, cssStyle]} {...props} />
)

const CardContent: React.FC<CardProps> = ({ cssStyle, ...props }) => (
  <div css={[CardContentStyle, cssStyle]} {...props} />
)

const CardFooter: React.FC<CardProps> = ({ cssStyle, ...props }) => (
  <div css={[CardFooterStyle, cssStyle]} {...props} />
)

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
