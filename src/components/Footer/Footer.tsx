import { useWindowResize } from '@/hooks'
import { useState } from 'react'
import { FooterSection } from './FooterSection'
import { FooterLink } from './FooterLink'

export const Footer = () => {
  const [customersSectionOpen, setCustomersSectionOpen] = useState(false)
  const [partnersSectionOpen, setPartnersSectionOpen] = useState(false)
  const [companySectionOpen, setCompanySectionOpen] = useState(false)

  const { width } = useWindowResize()
  const isMobile = width && width < 1024

  const customerLinks = (
    <ul>
      <FooterLink href="#">Как сделать заказ</FooterLink>
      <FooterLink href="#">Способы оплаты</FooterLink>
      <FooterLink href="#">Доставка</FooterLink>
      <FooterLink href="#">Возврат товара</FooterLink>
      <FooterLink href="#">Возврат денежных средств</FooterLink>
    </ul>
  )

  const partnerLinks = (
    <ul>
      <FooterLink href="#">Продавайте на Zoo market</FooterLink>
      <FooterLink href="#">Водителем</FooterLink>
    </ul>
  )

  const companyLinks = (
    <ul>
      <FooterLink href="#">О нас</FooterLink>
      <FooterLink href="#">Реквизиты</FooterLink>
    </ul>
  )

  return (
    <footer className="w-full bg-accent-200 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-2">
        {isMobile ? (
          <div className="flex flex-col">
            <FooterSection
              title="Покупателям"
              isOpen={customersSectionOpen}
              onToggle={() => setCustomersSectionOpen(!customersSectionOpen)}
              isMobile
            >
              {customerLinks}
            </FooterSection>

            <FooterSection
              title="Партнерам"
              isOpen={partnersSectionOpen}
              onToggle={() => setPartnersSectionOpen(!partnersSectionOpen)}
              isMobile
            >
              {partnerLinks}
            </FooterSection>

            <FooterSection
              title="Компания"
              isOpen={companySectionOpen}
              onToggle={() => setCompanySectionOpen(!companySectionOpen)}
              isMobile
            >
              {companyLinks}
            </FooterSection>
          </div>
        ) : (
          <div className="flex justify-between">
            <FooterSection title="Покупателям">{customerLinks}</FooterSection>
            <FooterSection title="Партнерам">{partnerLinks}</FooterSection>
            <FooterSection title="Компания">{companyLinks}</FooterSection>
          </div>
        )}

        {/* Нижняя часть футера */}
        <div className="mt-8 text-border-primary text-sm">
          <p>
            2024-2025 © Zoo market — модный интернет-магазин одежды, обуви и аксессуаров для
            животных. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
