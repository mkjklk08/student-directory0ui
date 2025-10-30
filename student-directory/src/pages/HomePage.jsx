import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchBar } from '../components/StudentBar';
import { StudentList } from '../components/StudentList';
import { deleteStudent, getStudents, updateStudent } from '../services/api';
import './HomePage.css';
import { filterStudents } from '../utils/search-filter';
import { paginateStudents } from '../utils/pagination';
import { handleScrollDebounced } from '../utils/scroll-handler';

export function HomePage() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate(); 

  const scrollerRef = useRef(null);
  const scrollDebounceRef = useRef(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        if (active) setStudents(data);
      } catch (e) {
        console.log(e);
        if (active) setError('Failed to load students');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const filteredStudents = useMemo(() => {
    filterStudents(students, query)
  }, [students, query]);

  useEffect(() => {
    setCurrentPage(0);
    if (scrollerRef.current) scrollerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  }, [filteredStudents.length]);

  const pages = useMemo(() => {
    paginateStudents(filteredStudents)
  }, [filteredStudents]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollTo({ left: currentPage * width, behavior: 'smooth' });
  }, [currentPage]);

  function handleScroll(e) {
    handleScrollDebounced(e, currentPage, setCurrentPage, scrollDebounceRef)
  }

  function handleAdd() {
    navigate('/form');
  }

  async function handleEdit(student) {
    const name = prompt('Update name', student.name);
    if (!name) return;

    const className = prompt('Update class (optional)', student.className || '') || undefined;

    try {
      const updated = await updateStudent(student.id, { name, className });
      setStudents((prev) => prev.map((s) => (s.id === student.id ? updated : s)));
    } catch (e) {
      console.log(e);
      setError('Failed to update student');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this student?')) return;

    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.log(e);
      setError('Failed to delete student');
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        <div className="toolbar">
          <SearchBar query={query} onChange={setQuery} />
          <button className="btn" onClick={handleAdd}>Add Student</button>
        </div>

        {loading && <div className="info">Loading…</div>}
        {error && <div className="error" role="alert">{error}</div>}

        {!loading && pages.length === 0 && (
          <div className="empty">No students found.</div>
        )}

        {!loading && pages.length > 0 && (
          <>
            <div ref={scrollerRef} className="scroller" onScroll={handleScroll}>
              {pages.map((pageStudents, idx) => (
                <section key={idx} className="page">
                  <StudentList
                    students={pageStudents}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={setSelected}
                  />
                </section>
              ))}
            </div>

            <div className="pager">
              <button
                className="pager__btn"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
              >
                Prev
              </button>

              {pages.map((_, i) => (
                <button
                  key={i}
                  className={`pager__dot${i === currentPage ? ' is-active' : ''}`}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}

              <button
                className="pager__btn"
                onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
                disabled={currentPage >= pages.length - 1}
              >
                Next
              </button>
            </div>
          </>
        )}

        {selected && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal__backdrop" onClick={() => setSelected(null)} />
            <div className="modal__content">
              <button className="modal__close" onClick={() => setSelected(null)}>×</button>
              <div className="modal__header">
                <img
                  className="modal__avatar"
                  src={selected.avatar || `https://i.pravatar.cc/96?u=${selected.id}`}
                  alt={selected.name || 'Student avatar'}
                />
                <div className="modal__title">
                  <div className="modal__name">{selected.name}</div>
                  <div className="modal__subtitle">ID: {selected.id}</div>
                </div>
              </div>
              <div className="modal__body">
                {Object.entries(selected).map(([key, value]) => (
                  <div key={key} className="modal__row">
                    <div className="modal__label">{key}</div>
                    <div className="modal__value">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
