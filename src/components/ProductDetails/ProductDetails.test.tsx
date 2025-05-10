import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ProductDetails } from './ProductDetails'

describe('<ProductDetails />', () => {
  const defaultProps = {
    title: 'Тестовый товар',
    onCopy: jest.fn(),
    nodeId: 42,
  }

  it('отображает иконку подсказки, когда у характеристики есть description и это не артикул', () => {
    const characteristics = [
      {
        title: 'цвет',
        value: 'красный',
        description: 'Это тестовый цвет',
        additionalParams: null,
      },
    ]

    render(<ProductDetails {...defaultProps} characteristics={characteristics} />)

    // иконка должна присутствовать
    const hintIcon = screen.getByLabelText('Показать подсказку')
    expect(hintIcon).toBeInTheDocument()
  })

  it('не отображает иконку подсказки, когда description и additionalParams = null', () => {
    const characteristics = [
      {
        title: 'материал',
        value: 'хлопок',
        description: null,
        additionalParams: null,
      },
    ]

    render(<ProductDetails {...defaultProps} characteristics={characteristics} />)

    // иконки не должно быть
    expect(screen.queryByLabelText('Показать подсказку')).toBeNull()
  })

  it('никогда не показывает подсказку для артикула даже если description присутствует', () => {
    const characteristics = [
      {
        title: 'артикул',
        value: '0001',
        description: 'секретный артикул',
        additionalParams: null,
      },
    ]

    render(<ProductDetails {...defaultProps} characteristics={characteristics} />)

    expect(screen.queryByLabelText('Показать подсказку')).toBeNull()
  })
})
