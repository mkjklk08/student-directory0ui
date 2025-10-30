export function filterStudents(students, query) {
  const q = query.trim().toLowerCase();
  if (!q) return students;

  return students.filter((s) => {
    const name = (s.name || '').toLowerCase();
    const cls = (s.className || '').toLowerCase();
    const id = String(s.id || '').toLowerCase();
    return name.includes(q) || cls.includes(q) || id.includes(q);
  });
}