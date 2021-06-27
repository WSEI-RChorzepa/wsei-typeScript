import * as yup from 'yup';

export default yup.object().shape({
  date: yup.date().required(),
  from: yup.number().required(),
  to: yup.number().required(),
});
