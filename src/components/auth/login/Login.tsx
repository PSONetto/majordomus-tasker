import { useRef, SetStateAction, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
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

export default function Login({ visible, setVisible }: ISignUpProps) {
  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const { setUser, csrfToken } = useAuth();

  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FieldValues) {
    setLoading(true);

    try {
      const body = {
        email: formData.email,
        password: formData.password,
      };

      await csrfToken();

      const { data, status } = await api.post('login', body);
      if (status === 200) {
        setUser(data.user);
        navigate('/');
        setVisible(false);
      }
    } catch (error) {
      handleAPIError(error, toast);
    } finally {
      setLoading(false);
    }
  }

  function Footer() {
    return (
      <div>
        <Button
          name="confirm"
          type="submit"
          label="Confirm"
          icon="pi pi-check"
          form="loginForm"
          loading={loading}
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
        label="Login"
        iconLabel="pi pi-sign-in"
        form="loginForm"
        onSubmit={handleSubmit(onSubmit)}
        footer={<Footer />}
      >
        <MTInputText
          name="email"
          label="E-mail"
          control={control}
          required
          loading={loading}
        />
        <MTPassword
          control={control}
          name="password"
          label="Password"
          required
          loading={loading}
        />
      </FormDialog>
    </>
  );
}
