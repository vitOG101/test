import '@/components/modal/styles.css';

function Modal({ children, setIsOpen, className }) {
    return (
        <div className={`modal ${className || ''}`}>
            <button className='modal__close' onClick={() => setIsOpen(false)}>X</button>
            {children}
        </div>
    )
}

export default Modal;
