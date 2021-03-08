/* eslint-disable camelcase */
import * as Yup from 'yup';

interface SignUpFormData {
  name: string;
  birthdate: string;
  project: string;
  job_role: string;
  admission_date: string;
  url: string;
}

export const validationNaverYupForm = async (data: SignUpFormData) => {
  const reg = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);

  const schema = Yup.object().shape({
    name: Yup.string().required('Informe o nome'),
    birthdate: Yup.string()
      .required('Informe sua data de nascimento')
      .matches(reg, 'Informe o formato correto(dd/mm/yyyy)'),
    project: Yup.string().required('Informe os projetos'),
    job_role: Yup.string().required('Informe o trabalho'),
    admission_date: Yup.string()
      .required('Informe a data de admissao')
      .matches(reg, 'Informe o formato correto(dd/mm/yyyy)'),
    url: Yup.string()
      .required('Insira uma url de uma foto')
      .min(4, 'minimo 4 characteres'),
  });

  await schema.validate(data, {
    abortEarly: false,
  });
};
