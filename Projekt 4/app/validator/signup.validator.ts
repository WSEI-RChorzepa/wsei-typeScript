import * as Yup from 'yup';

export default Yup.object().shape({
  firstName: Yup.string().trim().min(3).required('First name is required'),
  lastName: Yup.string().trim().min(3).required(),
  email: Yup.string().trim().email().required(),
  phone: Yup.string().trim().required(),
  password: Yup.string().trim().min(5).required(),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
