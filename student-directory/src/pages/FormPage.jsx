import { useState } from 'react';
import { validate } from '../utils/validation';
import { buildStudentPayload } from '../utils/payload-builder';
import './FormPage.css';
import { useNavigate } from 'react-router';
import { addStudent } from '../services/api';

const CLASS_OPTIONS = [
  { value: '', label: 'Select class' },
  { value: '1f1', label: '1F1' },
  { value: '1f2', label: '1F2' },
  { value: '1f3', label: '1F3' },
  { value: '1f4', label: '1F4' },
  { value: '1d1', label: '1D1' },
  { value: '1d2', label: '1D2' },
  { value: '2f1', label: '2F1' },
  { value: '2f2', label: '2F2' },
  { value: '2f3', label: '2F3' },
  { value: '2f4', label: '2F4' },
  { value: '2d1', label: '2D1' },
  { value: '2d2', label: '2D2' },
  { value: '3f1', label: '3F1' },
  { value: '3f2', label: '3F2' },
  { value: '3f3', label: '3F3' },
  { value: '3f4', label: '3F4' },
  { value: '3d1', label: '3D1' },
  { value: '3d2', label: '3D2' },
  { value: 'other', label: 'Other' },
];

export function FormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', className: '', classOther: '', age: '', avatar: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const payload = buildStudentPayload(form);
      await addStudent(payload);
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err)
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <main className="container formPage formPage__container">
        <h2 style={{ marginBottom: 16 }}>Add Student</h2>
        <form onSubmit={handleSubmit} className="form">
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>

          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>

          <label className="field">
            <span>Class (optional)</span>
            <select name="className" value={form.className} onChange={handleChange} required>
              {CLASS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.className && <small className="error">{errors.className}</small>}
          </label>

          {form.className === 'other' && (
            <label className="field">
              <span>Other class</span>
              <input
                name="classOther"
                type="text"
                value={form.classOther}
                onChange={handleChange}
                placeholder="Enter class name"
                required
              />
              {errors.classOther && <small className="error">{errors.classOther}</small>}
            </label>
          )}

          <label className="field">
            <span>Age (optional)</span>
            <input
              name="age"
              type="number"
              min="14"
              max="25"
              value={form.age}
              onChange={handleChange}
              placeholder="14 - 25"
              required
            />
            {errors.age && <small className="error">{errors.age}</small>}
          </label>

          <label className="field">
            <span>Avatar URL (optional)</span>
            <input
              name="avatar"
              type="url"
              value={form.avatar}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
            {errors.avatar && <small className="error">{errors.avatar}</small>}
            {form.avatar && /^https?:\/\//i.test(form.avatar) && (
              <img src={form.avatar} alt="Avatar preview" style={{ width: 64, height: 64, borderRadius: '50%', marginTop: 6, objectFit: 'cover', border: '1px solid rgba(99,102,241,0.25)' }} />
            )}
          </label>

          {submitError && <div className="error" role="alert">{submitError}</div>}

          <div className="form__actions">
            <button className="btn btn--primary" type="submit" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
            <button className="btn" type="button" onClick={() => navigate(-1)} disabled={submitting}>
              Cancel
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

