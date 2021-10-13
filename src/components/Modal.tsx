import React from 'react'

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
      <div className="modal-backdrop" backdropColor={backdropColor} onClick={onClose} />
      <div className="modal-wrapper">
        {withCloseButton && (
          <button className="modal-close-button" onClick={onClose} title="Close">
            <ModalCloseIcon />
          </button>
        )}
        {children}
      </div>
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
