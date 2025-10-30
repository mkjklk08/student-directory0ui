import { StudentCard } from "./StudentCard";

export function StudentList({ students, onEdit, onDelete, onView }) {
  if (!students.length) return <div className="empty">No students found.</div>;
  return (
    <div className="list">
      {students.map((s) => (
        <StudentCard key={s.id} student={s} onEdit={onEdit} onDelete={onDelete} onView={onView} />
      ))}
    </div>
  );
}