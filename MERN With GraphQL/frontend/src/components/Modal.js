import React from 'react'

import './Modal.css'

const Modal = ({
    title,
    children,
    canCancel = undefined,
    canConfirm = undefined,
    isOpen = false,
    onCancel,
    onConfirm,
    cancelText = 'Cancel',
    confirmText = 'Confirm'
}) => {
    return isOpen ? (
        <React.Fragment>
            <div className="backdrop" />
            <div className="modal">
                <header className="modal__header">
                    <h1>{title}</h1>
                </header>
                <section className="modal__content">{children}</section>
                <section className="modal__actions">
                    {canCancel && (
                        <button className="btn" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    {canConfirm && (
                        <button className="btn" onClick={onConfirm}>
                            {confirmText}
                        </button>
                    )}
                </section>
            </div>
        </React.Fragment>
    ) : (
        ''
    )
}

export default Modal
