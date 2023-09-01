import { useRef, SetStateAction } from 'react';
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { api } from '../../../api/api';
import { useAuth } from '../../../contexts/auth/AuthContext';
import handleAPIError from '../../../utils/functions/handleAPIError';
import FormDialog from '../../form/dialog/FormDialog';
import MTInputText from '../../form/input/InputText';
import MTPassword from '../../form/password/Password';

interface ISignUpProps {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
}

export default function SignUp({ visible, setVisible }: ISignUpProps) {
  const toast = useRef<Toast>(null);

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const { control, handleSubmit, getValues } = useForm();

  async function onSubmit(formData: FieldValues) {
    if (getValues('password') === getValues('cpassword')) {
      try {
        const params = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.cpassword,
        };
        const resp = await api.post('/register', params);

        if (resp.status === 200) {
          setUser(resp.data.user);
          navigate('tasks');
        }
      } catch (error) {
        handleAPIError(error, toast);
      }
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'Password Error',
        detail: 'Password and confirmation must be equal.',
        life: 5000,
      });
    }
  }

  const passwordRules:
    | Omit<
        RegisterOptions<FieldValues, 'inputText'>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined = {
    minLength: 8,
    validate: (v: string) => {
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;

      return uppercaseRegex.test(v) && lowercaseRegex.test(v);
    },
  };

  function Footer() {
    return (
      <div>
        <Button
          name="confirm"
          type="submit"
          label="Confirm"
          icon="pi pi-check"
          form="signupForm"
        />
      </div>
    );
  }

  return (
    <>
      <Toast ref={toast} />

      <FormDialog
        visible={visible}
        setVisible={setVisible}
        className="w-6"
        label="Sign Up"
        iconLabel="pi pi-user-plus"
        form="signupForm"
        onSubmit={handleSubmit(onSubmit)}
        footer={<Footer />}
      >
        <MTInputText name="name" label="Name" control={control} required />
        <MTInputText name="email" label="E-mail" control={control} required />
        <MTPassword
          control={control}
          name="password"
          label="Password"
          rules={passwordRules}
          required
        />
        <MTPassword
          control={control}
          name="cpassword"
          label="Confirm Password"
          rules={passwordRules}
          required
        />
      </FormDialog>
    </>
  );
}
