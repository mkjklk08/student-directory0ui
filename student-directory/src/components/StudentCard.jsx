import { useEffect, useState } from 'react';

export function StudentCard({ student, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal with Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const avatarUrl = student.avatar || `https://i.pravatar.cc/96?u=${student.id}`;
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="card">
      <div className="card__header">
        <img className="card__avatar" src={avatarUrl} alt={student.name || 'Student avatar'} />
        <div className="card__title">
          <div className="card__name">{student.name}</div>
          <div className="card__meta">Email: {student.email}</div>
        </div>
      </div>

      <div className="card__actions">
        <button className="btn btn--primary" onClick={openModal}>View</button>
      </div>

            {isOpen && (
        <div className="modal" role="dialog" aria-modal="true" onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}>
          <div className="modal__backdrop"></div>

          <div className="modal__content">
                    <button className="modal__close" aria-label="Close" onClick={closeModal}>×</button>

            <div className="modal__header">
              <img className="modal__avatar" src={avatarUrl} alt={student.name || 'Student avatar'} />
              <div className="modal__title">
                <div className="modal__name">{student.name || 'Student'}</div>
                <div className="modal__subtitle">ID: {student.id}</div>
              </div>
            </div>

            <div className="modal__body">
              {Object.entries(student)
                .filter(([ , value]) => value)
                .map(([key, value]) => (
                  <div key={key} className="modal__row">
                    <div className="modal__label">{key}</div>
                    <div className="modal__value">{String(value)}</div>
                  </div>
                ))}
            </div>

            <div className="modal__footer">
                <button className="btn btn--ghost animated-button" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                        <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                    <span class="text">C L O S E</span>
                    <span class="circle"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                        <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                </button>
                <button className="btn btn--ghost animated-button" onClick={() => { closeModal(); onEdit(student); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                        <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                    <span class="text">E D I T</span>
                    <span class="circle"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                        <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                </button>
                <button className="btn btn--ghost animated-button" onClick={() => { closeModal(); onDelete(student.id); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                        <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                    <span class="text">D E L E T E</span>
                    <span class="circle"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                        <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
