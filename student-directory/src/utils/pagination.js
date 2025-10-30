export function paginateStudents(students, size = 9) {
  const chunks = [];
  for (let i = 0; i < students.length; i += size) {
    chunks.push(students.slice(i, i + size));
  }
  return chunks;
}