export function buildStudentPayload(form) {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
    className: (() => {
      const v = form.className;
      if (v === 'other') return (form.classOther || '').trim() || undefined;
      return (v || '').trim() || undefined;
    })(),
    age: form.age === '' ? undefined : Number(form.age),
    avatar: form.avatar.trim() || undefined,
  };
}