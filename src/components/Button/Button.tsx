import { ButtonProps } from '../../dtos/button/Button.dto'
import { ButtonContainer } from './Button.style'

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
