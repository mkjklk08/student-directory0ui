export function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Invalid email';

  if (!values.className) errors.className = 'Class is required';
  if (values.className === 'other' && !values.classOther.trim()) errors.classOther = 'Please enter class';
  if (values.age === '') errors.age = 'Age is required';
  else {
    const n = Number(values.age);
    if (Number.isNaN(n)) errors.age = 'Age must be a number';
    else if (n < 14 || n > 25) errors.age = 'Age must be between 14 and 25';
  }

  if (values.avatar && !/^https?:\/\//i.test(values.avatar.trim())) {
    errors.avatar = 'Avatar must be a valid URL (http/https)';
  }

  return errors;
}