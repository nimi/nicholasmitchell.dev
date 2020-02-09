import React from 'react'
import styled from 'styled-components'

export interface ModalProps {
  children: React.ReactNode
  open?: boolean
  backdropColor?: string
  className?: string
  withCloseButton?: boolean
  onClose?(event: React.MouseEvent): void
}

export interface BackdropProps {
  backdropColor?: string
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  backdropColor,
  children,
  onClose = () => {},
  open,
  withCloseButton,
}: ModalProps) => {
  if (!open) return null

  return (
    <>
      <Backdrop backdropColor={backdropColor} onClick={onClose} />
      <ModalWrapper>
        {withCloseButton && (
          <CloseButton onClick={onClose} title="Close">
            <ModalCloseIcon />
          </CloseButton>
        )}
        {children}
      </ModalWrapper>
    </>
  )
}

Modal.defaultProps = {
  withCloseButton: true,
  open: false,
}

const ModalCloseIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="20" height="20">
      <polyline fill="none" stroke="currentColor" points="1 1,6.5 6.5,12 1" />
      <polyline fill="none" stroke="currentColor" points="1 12,6.5 6.5,12 12" />
    </svg>
  )
}

const ModalWrapper = styled.div`
  background-color: transparent;

  border-radius: 3px;

  overflow: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  height: 100vh;
  width: 100%;
  min-width: 490px;
`

const Backdrop = styled.div<BackdropProps>`
  background-color: rgba(0, 0, 0, 0.45);

  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;

  height: 100vh;
  width: 100%;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  outline: 0;
  cursor: pointer;
  position: absolute;
  right: 4px;
  top: 20px;
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`
