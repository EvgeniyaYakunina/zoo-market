interface FooterLinkProps {
  href: string
  children: string
}

export const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <a className="text-border-primary hover:text-white" href={href}>
      {children}
    </a>
  </li>
)
